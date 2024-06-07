<script setup lang="ts">
import ApiService from "@/core/services/ApiService";
import type { EventInput } from "@fullcalendar/core";

const props = defineProps<{
  event: EventInput;
}>();

const emit = defineEmits(["close", "edit", "refresh"]);

function getDateString(date: string | number | Date) {
  return new Date(date).toLocaleDateString("cs-CZ", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });
}

async function deleteEvent() {
  if (!props.event.id) return;
  try {
    await ApiService.delete(`/orders/calendar/${props.event.id}`);
    emit("refresh");
    emit("close");
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div class="modal d-block fade show">
    <div class="modal-dialog modal-dialog-centered mw-650px">
      <div class="modal-content">
        <div class="modal-header border-0 justify-content-end">
          <div
            class="btn btn-icon btn-sm btn-color-gray-500 btn-active-icon-danger me-2"
            @click="deleteEvent"
          >
          </div>

          <div
            class="btn btn-icon btn-sm btn-color-gray-500 btn-active-icon-primary"
            @click="$emit('close')"
          >
            <i class="ki-duotone ki-cross fs-2x"
              ><span class="path1"></span><span class="path2"></span
            ></i>
          </div>
        </div>


        <template v-if="event?.extendedProps?.eventType === 'zakázka'">
          <div class="modal-body pt-0 pb-20 px-lg-17">
            <div class="d-flex">
              <i class="ki-duotone ki-calendar-8 fs-1 text-muted me-5"
                ><span class="path1"></span><span class="path2"></span><span class="path3"></span
                ><span class="path4"></span><span class="path5"></span><span class="path6"></span
              ></i>

              <div class="mb-9">
                <div class="d-flex align-items-center mb-2">
                  <span class="fs-3 fw-bold me-3">{{ event?.title }}</span>
                </div>

                <div class="fs-6">
                  {{ event?.extendedProps?.carTitle }}
                </div>

                <div class="fs-6">
                  {{ event?.extendedProps?.contactName }}
                </div>

                <div class="fs-6">
                  {{ event?.extendedProps?.contactPhone }}
                </div>

                <div class="row d-flex align-items-center mt-5">
                  <!-- <i class="col-auto ki-duotone ki-geolocation fs-1 text-muted me-5"
                    ><span class="path1"></span><span class="path2"></span
                  ></i> -->

                  <div class="fs-6 col-auto"><strong></strong> {{ event?.extendedProps?.workPlace?.type }} zakázka - {{ event?.extendedProps?.workPlace?.address }}</div>
                </div>

                  </div>
                </div>

            <div class="d-flex align-items-center mb-2">
              <span class="bullet bullet-dot h-10px w-10px bg-success ms-2 me-7"></span>

              <div class="fs-6">
                <span class="fw-bold">{{ $t("start") + " " }} </span>
                <span>{{ getDateString(event.start as Date) }}</span>
              </div>
            </div>

            <div v-if="event.end" class="d-flex align-items-center mb-9">
              <span class="bullet bullet-dot h-10px w-10px bg-danger ms-2 me-7"></span>

              <div v-if="event.end" class="fs-6">
                <span class="fw-bold">{{ $t("end") + " " }} </span>
                <span>{{ getDateString(event.end as Date) }}</span>
              </div>
            </div>

            <div class="row d-flex align-items-center mt-5">
              <div class="fs-6 col-auto"><strong>Popis:</strong></div>
              <div class="fs-6 col-12" v-html="event?.extendedProps?.description"></div>
            </div>

            <div class="row d-flex align-items-center mt-5">
              <div class="fs-6 col-auto"><strong>Poznámky:</strong></div>
              <div class="fs-6 col-12" v-html="event?.extendedProps?.note"></div>
            </div>

            <router-link
                :to="event?.extendedProps?.orderLink"
                target="_blank"
                class="fs-5 d-block text-center"
              >
                <i class="fs-2"></i>
                Do zakázky
              </router-link>
          </div>
        </template>
        <template v-else-if="event?.extendedProps?.eventType === 'úkol'">
          <div class="modal-body pt-0 pb-20 px-lg-17">
            <div class="d-flex">
              <i class="ki-duotone ki-calendar-8 fs-1 text-muted me-5"
                ><span class="path1"></span><span class="path2"></span><span class="path3"></span
                ><span class="path4"></span><span class="path5"></span><span class="path6"></span
              ></i>

              <div class="mb-9">
                <div class="d-flex align-items-center mb-2">
                  <span class="fs-3 fw-bold me-3">{{ event?.title }}</span>
                </div>
              </div>
            </div>

            <div class="d-flex align-items-center mb-2">
              <span class="bullet bullet-dot h-10px w-10px bg-success ms-2 me-7"></span>

              <div class="fs-6">
                <span class="fw-bold">{{ $t("start") + " " }} </span>
                <span>{{ getDateString(event.start as Date) }}</span>
              </div>
            </div>

            <div v-if="event.end" class="d-flex align-items-center mb-9">
              <span class="bullet bullet-dot h-10px w-10px bg-danger ms-2 me-7"></span>

              <div v-if="event.end" class="fs-6">
                <span class="fw-bold">{{ $t("end") + " " }} </span>
                <span>{{ getDateString(event.end as Date) }}</span>
              </div>
            </div>

            <div class="row d-flex align-items-center mt-5">
              <div class="fs-6 col-auto"><strong>Poznámky:</strong></div>
              <div class="fs-6 col-12" v-html="event?.extendedProps?.note"></div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
