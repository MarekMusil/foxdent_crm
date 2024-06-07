<template>
  <div class="card card-flush h-xl-100">
    <div class="card-header pt-5">
      <div class="card-title d-flex flex-column">
        <div class="d-flex align-items-center">
          <!-- <span class="fs-4 fw-semibold text-gray-400 me-1 align-self-start">Kč</span> -->

          <span class="fs-2hx fw-bold text-dark me-2 lh-1 ls-n2">{{ title }}</span>

          <!-- <span class="badge badge-light-success fs-base">
            <KTIcon icon-name="arrow-up" icon-class="fs-5 text-success ms-n1" />
            2.2%
          </span> -->
        </div>

        <span class="text-gray-400 pt-1 fw-semibold fs-6">69,700</span>
      </div>
    </div>

    <div class="card-body pt-2 pb-4 d-flex flex-wrap align-items-center" v-if="chartData">
      <apexchart
        type="donut"
        :options="chartOptions"
        :series="series"
        :height="height"
        style="width: 100%"
      ></apexchart>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getCSSVariableValue } from "@/assets/ts/_utils";
import type { ApexOptions } from "apexcharts";
import { ref, watch } from "vue";

const title = "Počty zakázek 2024";

const props = withDefaults(
  defineProps<{
    chartData: Record<string, any> | null;
    height?: string;
  }>(),
  {
    chartData: null,
    height: "250px",
  }
);

const series = ref<ApexAxisChartSeries>([]);
const chartOptions: ApexOptions = {
  chart: {
    type: "donut",
    height: props.height,
  },
  colors: [
    getCSSVariableValue("--bs-primary"),
    getCSSVariableValue("--bs-warning"),
    getCSSVariableValue("--bs-info"),
  ],
  labels: ["Opravy", "Výměny", "Ostatní"],
  plotOptions: {
    pie: {
      donut: {
        labels: {
          show: true,
          name: {
            show: true,
          },
          total: {
            show: true,
            label: "Celkem",
          },
        },
      },
    },
  },
};

watch(
  () => props.chartData,
  (newValue) => {
    if (newValue) {
      series.value = [
        newValue.invoices.issued.repairs.count,
        newValue.invoices.issued.replacements.count,
        newValue.invoices.issued.others.count,
      ];
    }
  }
);
</script>
