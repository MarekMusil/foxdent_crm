import objectPath from "object-path";

export function setMultipleErrors(object, values) {
  for (const [path, value] of Object.entries(values)) {
    objectPath.set(object, path, value);
  }
}

export function clearAllErrors(arr: Array<Record<string, any>>) {
  for (const obj of arr) {
    for (const key in obj.errors) {
      delete obj.errors[key];
    }
  }
}
