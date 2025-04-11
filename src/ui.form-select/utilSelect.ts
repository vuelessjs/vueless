import type { Option } from "../ui.form-listbox/types.ts";

export function filterOptions(options: Option[], search: string, labelKey: string) {
  if (!search) return options;

  return options
    .filter((option) => {
      return interpolateLabel(option, labelKey).toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      const aOptionIndex = interpolateLabel(a, labelKey).indexOf(search);
      const bOptionIndex = interpolateLabel(b, labelKey).indexOf(search);

      return aOptionIndex - bOptionIndex;
    });
}

export function filterGroups(
  options: Option[],
  search: string,
  label: string,
  groupValueKey: string,
  groupLabelKey: string,
): Option[] {
  return options
    .map((option) => {
      const group = option[groupValueKey];

      if (Array.isArray(group)) {
        return {
          [groupLabelKey]: option[groupLabelKey],
          [groupValueKey]: filterOptions(group, search, label),
        };
      }
    })
    .reduce((accumulator: Option[], group) => {
      if (!group) return accumulator;

      const groupValues = group[groupValueKey];

      if (Array.isArray(groupValues) && groupValues.length) {
        accumulator.push({ groupLabel: String(group[groupLabelKey] || "") });

        return accumulator.concat(groupValues);
      }

      return accumulator;
    }, []);
}

export function removeSelectedValues(
  options: Option[],
  selectedValues: (string | number)[],
  valueKey: string,
  groupValueKey?: string,
): Option[] {
  if (!groupValueKey) {
    return options.filter((option) => {
      const value = option[valueKey];

      return typeof value === "string" || typeof value === "number"
        ? !selectedValues.includes(value)
        : false;
    });
  }

  return options
    .map((option) => {
      if (!Array.isArray(option[groupValueKey])) return;

      const filteredGroup = option[groupValueKey].filter((item) => {
        const value = item[valueKey];

        return typeof value === "string" || typeof value === "number"
          ? !selectedValues.includes(value) && !item.isSubGroup
          : false;
      });

      return filteredGroup.length ? { ...option, [groupValueKey]: filteredGroup } : null;
    })
    .filter((option): option is Option => !!option);
}

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

function interpolateLabel(option: Option, label: string) {
  const interpolatedLabel = label ? option[label] : option;

  return interpolatedLabel !== "object" ? String(interpolatedLabel) : "";
}
