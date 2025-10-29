import { computed, type MaybeRefOrGetter, toValue } from "vue";

import type { Option } from "../ui.form-listbox/types";

interface UseDropdownLabelOptions {
  label: MaybeRefOrGetter<string>;
  labelDisplayCount?: MaybeRefOrGetter<number | undefined>;
  labelKey: MaybeRefOrGetter<string>;
  selectedOptions: MaybeRefOrGetter<Option[]>;
}

export function useDropdownLabel(options: UseDropdownLabelOptions) {
  const displayLabel = computed(() => {
    const label = toValue(options.label);
    const labelDisplayCount = toValue(options.labelDisplayCount);
    const labelKey = toValue(options.labelKey);
    const selectedOptions = toValue(options.selectedOptions);

    if (!labelDisplayCount || !selectedOptions.length) {
      return label;
    }

    const selectedLabels = selectedOptions
      .slice(0, labelDisplayCount)
      .map((option) => option[labelKey]);
    const restLabelCount = selectedOptions.length - labelDisplayCount;

    if (restLabelCount > 0) {
      selectedLabels.push(`+${restLabelCount}`);
    }

    return selectedLabels.join(", ");
  });

  return {
    displayLabel,
  };
}
