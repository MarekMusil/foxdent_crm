<script lang="ts" setup>
import ApiService from "@/core/services/ApiService";
import { useOptionsStore } from "@/stores/options";
import PrimeFileUpload, { type FileUploadSelectEvent } from "primevue/fileupload";
import { onMounted, ref } from "vue";

const store = useOptionsStore();

const props = defineProps<{
  fileTypeCategory: "forInvoice" | "forOrder";
  modelValue: Array<File>;
  uploadPath: string; // if component is used in detail view
  initialFiles?: {
    id: number;
    url: string;
    name: string;
    clientName: string;
    type: {
      id: number;
    };
  }[];
}>();

const emit = defineEmits(["update:modelValue"]);

defineExpose({
  uploadFiles,
});

// state

const initialFiles = ref<
  {
    id: number;
    url: string;
    name: string;
    clientName: string;
    type: {
      id: number;
    };
  }[]
>([]);

const fileTypes = ref<(number | "")[]>([]);

// methods

function selectFile(e: FileUploadSelectEvent) {
  if (e.files.length < props.modelValue.length) return; // removing files are handled separately
  // push fileTypes only for new files
  e.files.slice(fileTypes.value.length).forEach((file) => {
    fileTypes.value.push("");
  });

  emit("update:modelValue", Array.isArray(e.files) ? e.files : [e.files]);
}

// upload

async function uploadFiles() {
  const formData = new FormData();
  for (let file of props.modelValue) {
    formData.append("files[]", file);
  }
  formData.append("data", JSON.stringify({ fileTypesId: fileTypes.value }));
  try {
    const response = await ApiService.post(props.uploadPath, formData);
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading files");
  }
}

// remove

async function removeInitFile(id: number) {
  try {
    await ApiService.delete(`/files/${id}`);
    delete fileTypes.value[id];
    initialFiles.value = initialFiles.value.filter((file) => file.id !== id);
  } catch (error) {
    console.error(error);
  }
}

function removeFile(idx: number, file: File) {
  fileTypes.value.splice(idx, 1);
  emit(
    "update:modelValue",
    props.modelValue.filter((f) => f !== file)
  );
}

function clear() {
  fileTypes.value = [];
  emit("update:modelValue", []);
}

onMounted(() => {
  for (let file of props.initialFiles ?? []) {
    initialFiles.value.push({
      id: file.id,
      name: file.name,
      url: file.url,
      type: file.type,
      clientName: file.clientName,
    });
  }
});
</script>

<template>
  <PrimeFileUpload
    name="files[]"
    :multiple="true"
    :maxFileSize="100000000"
    :showUploadButton="false"
    @select="selectFile"
    @clear="clear"
  >
    <template #content="{ files, removeFileCallback }">
      <div class="flex flex-wrap p-0 sm:p-5 gap-5">
        <div v-for="(file, index) of initialFiles" :key="index" class="p-fileupload-file">
          <div class="p-fileupload-file-details" data-pc-section="details">
            <div class="p-fileupload-file-name" data-pc-section="filename">
              <a :href="file.url" target="_blank">{{ file.clientName }}</a>
            </div>
            <!-- <span class="p-fileupload-file-size" data-pc-section="filesize">{{ file.size }}</span> -->
          </div>
          <div class="p-fileupload-file-actions">
            <select
              class="form-select d-inline-block w-auto mx-1 my-auto"
              :value="file.type.id"
              disabled
            >
              <option value="" disabled>{{ $t("choose_option") }}</option>
              <option
                v-for="fileType in store.options.fileTypes[fileTypeCategory]"
                :key="fileType.id"
                :value="fileType.id"
              >
                {{ fileType.name }}
              </option>
            </select>
            <button
              class="btn btn-outline btn-outline-danger"
              type="button"
              @click="removeInitFile(file.id)"
            >
              <i class="fs-2 bi bi-trash"></i>
            </button>
          </div>
        </div>

        <div
          v-for="(file, index) of files"
          :key="file.name + file.type + file.size"
          class="p-fileupload-file"
        >
          <div class="p-fileupload-file-details" data-pc-section="details">
            <div class="p-fileupload-file-name" data-pc-section="filename">
              {{ file.name }}
            </div>
            <!-- <span class="p-fileupload-file-size" data-pc-section="filesize">{{ file.size }}</span> -->
          </div>
          <div class="p-fileupload-file-actions">
            <select
              class="form-select d-inline-block w-auto mx-1 my-auto"
              v-model="fileTypes[index]"
            >
              <option value="" disabled>{{ $t("choose_option") }}</option>
              <option
                v-for="fileType in store.options.fileTypes[fileTypeCategory]"
                :key="fileType.id"
                :value="fileType.id"
              >
                {{ fileType.name }}
              </option>
            </select>
            <button
              class="btn btn-outline btn-outline-danger"
              type="button"
              @click="removeFileCallback(index), removeFile(index, file)"
            >
              <i class="fs-2 bi bi-x"></i>
            </button>
          </div>
        </div>
      </div>
    </template>
    <template #empty>
      <p class="mt-4 mb-0 fs-4 text-center">{{ $t("help_files_drag_drop") }}</p>
    </template>
  </PrimeFileUpload>
</template>
