import { setLocale } from "yup";
import i18n from "./i18n";
const { t } = i18n.global;

export function initYup() {
  setLocale({
    mixed: {
      required: t("validation.mixed.required"),
      notNull: t("validation.mixed.notNull"),
      notType: ({ type }) => t("validation.mixed.notType", { type }),
    },
    number: {
      min: ({ min }) => t("validation.number.min", { min }),
      max: ({ max }) => t("validation.number.max", { max }),
      moreThan: ({ more }) => t("validation.number.more", { more }),
      lessThan: ({ less }) => t("validation.number.less", { less }),
      integer: t("validation.number.integer"),
    },
    string: {
      min: ({ min }) => t("validation.string.min", { min }),
      max: ({ max }) => t("validation.string.max", { max }),
      length: ({ length }) => t("validation.string.length", { length }),
      email: t("validation.string.email"),
      url: t("validation.string.url"),
      lowercase: t("validation.string.lowercase"),
      uppercase: t("validation.string.uppercase"),
    },
    array: {
      min: () => t("validation.array.min"),
    },
  });
}
