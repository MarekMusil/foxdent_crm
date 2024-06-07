import { beforeEach, describe, expect, it } from "vitest";
import { VueWrapper, mount } from "@vue/test-utils";
import FormDate from "./FormDate.vue";
import PrimeVue from "primevue/config";
import primeVueLocale from "@/assets/localization/primevue.json";
import PrimeCalendar from "primevue/calendar";

/**
 * @vitest-environment happy-dom
 */

describe("FormDate", () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    wrapper = mount(FormDate, {
      global: {
        plugins: [PrimeVue],
        provide: {
          PrimeVue: {
            config: {
              locale: primeVueLocale,
            },
          },
        },
      },
    });
  });

  it("it should render", () => {
    const calendar = wrapper.findComponent(PrimeCalendar);
    expect(calendar.exists()).toBe(true);
    expect(wrapper.find(".p-calendar").exists()).toBe(true);
    expect(wrapper.find(".p-inputtext").exists()).toBe(true);
  });

  it("it should render with props", async () => {
    await wrapper.setProps({ modelValue: new Date("2021-10-10") });
    expect(wrapper.find("input").element.value).toBe("10.10.2021");
  });

  it("it should emit update:modelValue", async () => {
    await wrapper.find("input").setValue("25.10.2021");
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual([new Date("2021-10-25")]);
  });

  // The propagation of the input event has been stopped
  // This is because it made undesired effects with vee-validate Field
  it("it should not emit input", async () => {
    await wrapper.find("input").setValue("10.10.2021");
    expect(wrapper.emitted()).not.toHaveProperty("input");
  });
});
