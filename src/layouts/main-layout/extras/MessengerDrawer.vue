<template>
  <div
    id="kt_drawer_chat"
    class="bg-body"
    data-kt-drawer="true"
    data-kt-drawer-name="chat"
    data-kt-drawer-activate="true"
    data-kt-drawer-overlay="true"
    data-kt-drawer-width="{default:'300px', 'md': '500px'}"
    data-kt-drawer-direction="end"
    data-kt-drawer-toggle="#kt_drawer_chat_toggle"
    data-kt-drawer-close="#kt_drawer_chat_close"
  >
    <div class="card w-100" id="kt_drawer_chat_messenger">
      <div class="card-header pe-5" id="kt_drawer_chat_messenger_header">
        <div class="card-title">
          <div class="d-flex justify-content-center flex-column me-3">
            <a href="#" class="fs-4 fw-bold text-gray-900 text-hover-primary me-1 mb-2 lh-1">{{
              $t("notification")
            }}</a>
          </div>
        </div>

        <!--begin::Card toolbar-->
        <div class="card-toolbar">
          <div
            class="btn btn-sm btn-icon btn-active-icon-primary"
            id="kt_drawer_chat_close"
            @click="store.newNotification = false"
          >
            <KTIcon icon-name="cross" icon-class="fs-2x" />
          </div>
        </div>
        <!--end::Card toolbar-->
      </div>

      <div class="card-body" id="kt_drawer_chat_messenger_body">
        <div
          class="scroll-y me-n5 pe-5"
          data-kt-element="messages"
          data-kt-scroll="true"
          data-kt-scroll-activate="true"
          data-kt-scroll-height="auto"
          data-kt-scroll-dependencies="#kt_drawer_chat_messenger_header, #kt_drawer_chat_messenger_footer"
          data-kt-scroll-wrappers="#kt_drawer_chat_messenger_body"
          data-kt-scroll-offset="0px"
        >
          <template v-for="(item, index) in messages" :key="index">
            <MessageIn
              :name="item.name"
              :shortname="item.shortname"
              :style="item.style"
              :time="item.time"
              :text="item.text"
            ></MessageIn>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MessageIn from "@/components/messenger-parts/MessageIn.vue";
import ApiService from "@/core/services/ApiService";
import { useAuthStore } from "@/stores/auth";
import { useOptionsStore } from "@/stores/options";
import { onMounted, ref, watch } from "vue";

interface IMessage {
  name: string;
  shortname: string;
  time: string;
  text: string;
  style: string;
}

const store = useOptionsStore();
const authStore = useAuthStore();

const messages = ref<Array<IMessage>>([]);

async function fetchMessages() {
  ApiService.query("/notifications", {
    params: {
      // branchId: authStore.user?.selectedBranchId || 0,
    },
  })
    .then((response) => {
      messages.value = response.data.data.records.map((item: any) => ({
        text: item.content,
        name: item.sender.name,
        shortname: item.sender.shortname,
        style: item.sender.cssStyles,
        time: item.createTime.formatShort,
      }));
    })
    .catch((error) => {
      console.log(error);
    });
}

onMounted(async () => {
  // await fetchMessages();
});
</script>
