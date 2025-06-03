import type { Option } from "../ui.form-listbox/types.ts";

export function getCurrentOption(
  options: Option[],
  selectedValue: string | number | Option,
  valueKey: string,
  groupValueKey?: string,
) {
  const value = typeof selectedValue === "object" ? selectedValue?.[valueKey] : selectedValue;

  const currentOption = groupValueKey
    ? getGroupOption(options, selectedValue, valueKey, groupValueKey)
    : options.find((option) => option[valueKey] === value);

  return currentOption || ({} as Option);
}

function getGroupOption(
  options: Option[],
  selectedValue: string | number | Option,
  valueKey: string,
  groupValueKey: string,
) {
  const group = options.find((option) => {
    return Array.isArray(option[groupValueKey])
      ? option[groupValueKey].find((value) => value[valueKey] === selectedValue)
      : false;
  });

  const groupValues = group?.[groupValueKey] || [];

  return Array.isArray(groupValues)
    ? groupValues.find((value) => value[valueKey] === selectedValue)
    : undefined;
}
