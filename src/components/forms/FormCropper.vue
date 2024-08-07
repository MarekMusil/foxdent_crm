<script lang="ts" setup>
import ApiService from "@/core/services/ApiService";
import { useOptionsStore } from "@/stores/options";
import { compressImageToFile } from "@/utils/compression";
import PrimeFileUpload, { type FileUploadSelectEvent } from "primevue/fileupload";
import { Cropper } from "vue-advanced-cropper";
import { onMounted, ref } from "vue";

const store = useOptionsStore();

const props = withDefaults(defineProps<{
  uploadPath: string;
  aspectRatio?: number;
  imgWidth?: number;
}>(), {
  aspectRatio: 5 / 6,
});

defineExpose({
  uploadFiles,
});

const file = ref<File | null>(null);
const fileUrl = ref<string | null>(null);

const photoCropperRef = ref<InstanceType<typeof Cropper> | null>(null);

const maxWidth = ref(1000);
const maxHeight = ref(1000);

const emit = defineEmits(['upload-success']);

function selectFile(e: FileUploadSelectEvent) {
  const newFile = e.files[0] as File;
  file.value = newFile;
  fileUrl.value = URL.createObjectURL(newFile);
}

function clear() {
  if (fileUrl.value) {
    URL.revokeObjectURL(fileUrl.value);
  }
  fileUrl.value = null;
  file.value = null;
}

async function uploadFiles() {
  if (!photoCropperRef.value) return;
  const { canvas } = photoCropperRef.value.getResult();
  if (!canvas || !file.value || !file.value.type.startsWith("image/")) return;

  const imageBlob = await new Promise<Blob | null>((resolve) => {
    canvas.toBlob((blob) => resolve(blob));
  });

  if (!imageBlob) return;

  const formData = new FormData();

  try {
    file.value = await compressImageToFile(imageBlob, props.imgWidth);
  } catch (error) {
    console.error(error);
    // Handle or throw error
  }

  formData.append("file", file.value);
  try {
    const response = await ApiService.post(props.uploadPath, formData);
    emit('upload-success', response); // Emit the event with response data
    return response;
  } catch (error) {
    console.error(error);
    throw new Error("Error uploading files");
  }
}

onMounted(() => {
  // get max width from the other column in row - cropperWidthTemplate
  // there is problem with setting maxWidth as 100% to cropper
  const cropperWidthTemplate = document.querySelector<HTMLDivElement>("#cropperWidthTemplate");
  if (cropperWidthTemplate) {
    const width = cropperWidthTemplate.clientWidth - 20;
    maxWidth.value = width;
    maxHeight.value = width * 0.6;
  }
});
</script>

<template>
  <div class="d-grid gap-2">
    <PrimeFileUpload
      class="mb-10"
      name="files"
      mode="basic"
      accept="image/*"
      :multiple="false"
      :maxFileSize="100000000"
      @select="selectFile"
      @clear="clear"
    />
    <Cropper
      class="cropper"
      ref="photoCropperRef"
      :src="fileUrl"
      :stencilProps="{
        aspectRatio: props.aspectRatio,
      }"
      :style="{
        maxWidth: `${maxWidth}px`,
        maxHeight: `${maxHeight}px`,
      }"
    />
  </div>
</template>
