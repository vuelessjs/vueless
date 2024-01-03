import { isProxy, isReactive, isRef, toRaw } from "vue";

export default class DataServiceDefault {
  compareValues(key, order = "asc") {
    return function innerSort(a, b) {
      const isPropExistInObjA = Object.prototype.hasOwnProperty.call(a, key);
      const isPropExistInObjB = Object.prototype.hasOwnProperty.call(b, key);

      if (!isPropExistInObjA || !isPropExistInObjB) {
        return 0;
      }

      const varA = typeof a[key] === "string" ? a[key].toUpperCase() : a[key];
      const varB = typeof b[key] === "string" ? b[key].toUpperCase() : b[key];
      let comparison = 0;

      if (!varA) return 1;

      if (!varB) return -1;

      if (varA > varB) {
        comparison = 1;
      }

      if (varA < varB) {
        comparison = -1;
      }

      return order === "desc" ? comparison * -1 : comparison;
    };
  }

  createFormData(form = {}) {
    const formData = new FormData();

    for (let key in form) {
      if (Array.isArray(form[key])) {
        form[key].forEach((item, index) => formData.append(`${key}[${index}]`, item));
      } else if (typeof form[key] === "boolean") {
        formData.append(key, Number(form[key]));
      } else {
        formData.append(key, form[key]);
      }
    }

    return formData;
  }

  updateArray(oldArray, newArray) {
    newArray = new Map(newArray.map((item) => [item.id, item]));

    const updatedArray = oldArray.map((item) => {
      if (newArray.has(item.id)) {
        item = newArray.get(item.id);
        newArray.delete(item.id);
      }

      return item;
    });

    return [...updatedArray, ...newArray.values()];
  }

  getRawValue = (value) => {
    if (Array.isArray(value)) {
      return value.map((item) => this.getRawValue(item));
    }

    if (isRef(value) || isReactive(value) || isProxy(value)) {
      return this.getRawValue(toRaw(value));
    }

    return value;
  };
}
