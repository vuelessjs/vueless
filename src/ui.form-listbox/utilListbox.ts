import type { Option } from "./types.ts";

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

function interpolateLabel(option: Option, label: string) {
  const interpolatedLabel = label ? option[label] : option;

  return interpolatedLabel !== "object" ? String(interpolatedLabel) : "";
}
