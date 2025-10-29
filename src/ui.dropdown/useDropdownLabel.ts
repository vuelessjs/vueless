import { computed } from "vue";

import type { Option } from "../ui.form-listbox/types";

interface UseDropdownLabelOptions {
  label: string;
  labelDisplayCount?: number;
  labelKey: string;
  selectedOptions: Option[];
}

export function useDropdownLabel(options: UseDropdownLabelOptions) {
  const displayLabel = computed(() => {
    if (!options.labelDisplayCount || !options.selectedOptions.length) {
      return options.label;
    }

    const selectedLabels = options.selectedOptions
      .slice(0, options.labelDisplayCount)
      .map((option) => option[options.labelKey]);
    const restLabelCount = options.selectedOptions.length - options.labelDisplayCount;

    if (restLabelCount > 0) {
      selectedLabels.push(`+${restLabelCount}`);
    }

    return selectedLabels.join(", ");
  });

  return {
    displayLabel,
  };
}
