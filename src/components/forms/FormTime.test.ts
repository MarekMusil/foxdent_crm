import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import FormTime from "./FormTime.vue";

/**
 * @vitest-environment happy-dom
 */

describe("FormTime", () => {
  it("it should render", () => {
    const wrapper = mount(FormTime);
    expect(wrapper.find("input[max='5']").exists()).toBe(true);
  });

  it("it should render with props", () => {
    const wrapper = mount(FormTime, {
      props: {
        modelValue: "12:35",
      },
    });
    expect(wrapper.find("input").element.value).toBe("12:35");
  });

  it("it should emit input event", async () => {
    const wrapper = mount(FormTime);
    await wrapper.find("input").setValue("12:35");
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["12:35"]);
  });

  it("it should add colon after 2 digits", async () => {
    const wrapper = mount(FormTime);
    await wrapper.find("input").setValue("12");
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["12"]);
    await wrapper.setProps({ modelValue: "12" });
    // this is valid because the component will add the colon in watcher for modelValue
    expect(wrapper.emitted()["update:modelValue"][1]).toEqual(["12:"]);
  });

  it("it should not add colon after 2 digits when erasing back", async () => {
    const wrapper = mount(FormTime, {
      props: {
        modelValue: "12:",
      },
    });
    await wrapper.find("input").trigger("keydown.backspace"); // This actually do nothing
    await wrapper.find("input").setValue("12");
    expect(wrapper.emitted()).toHaveProperty("update:modelValue");
    expect(wrapper.emitted()["update:modelValue"][0]).toEqual(["12"]);
    expect(wrapper.find("input").element.value).toBe("12"); // This is the expected value
  });
});
