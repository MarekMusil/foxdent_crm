type GenericObject = { [key: string]: any };

// Helper function to capitalize the first letter of a string
function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function setProperties(
  source: GenericObject,
  target: GenericObject,
  prefix: string = ""
): void {
  Object.keys(source).forEach((key) => {
    const value = source[key];
    // If the key is 'value' or 'format', set it directly on the target with the current prefix
    if (key === "value" || key === "format") {
      target[prefix] = value;
    } else {
      // For any other key, capitalize and append the current key to the prefix
      const newKey = `${prefix}${capitalizeFirstLetter(key)}`;
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        // Recursively call the function for nested objects
        setProperties(value, target, newKey);
      } else {
        // Assign the value to the target object with the new key
        target[newKey] = value;
      }
    }
  });
  // if prefix is empty, lowercase first letter of all keys in target
  if (prefix === "") {
    Object.keys(target).forEach((key) => {
      const newKey = `${key.charAt(0).toLowerCase()}${key.slice(1)}`;
      if (newKey !== key) {
        target[newKey] = target[key];
        delete target[key];
      }
    });
  }
}

export function valuesForUpdate(source: GenericObject, prefix: string = ""): GenericObject {
  const target: GenericObject = {};
  setProperties(source, target, prefix);
  return target;
}
