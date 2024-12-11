import type { Group } from "./types.ts";
import type { UnknownObject } from "../types.ts";

export function filterOptions(
  options: UnknownObject[],
  search: string,
  label: string,
): UnknownObject[] {
  if (!search) return options;

  const interpolateLabel = (option: UnknownObject, label: string): string => {
    return label ? (option[label] as string) || "" : String(option);
  };

  return options
    .filter((option) =>
      interpolateLabel(option, label).toLowerCase().includes(search.toLowerCase()),
    )
    .sort(
      (a, b) =>
        interpolateLabel(a, label).indexOf(search) - interpolateLabel(b, label).indexOf(search),
    );
}

export function filterGroups(
  options: UnknownObject[],
  search: string,
  label: string,
  valuesKey: string,
  groupLabelKey: string,
): UnknownObject[] {
  const filteredGroups = options.map((group) => {
    if (!group[valuesKey]) {
      // eslint-disable-next-line no-console
      console.warn("Options passed to select do not contain groups, despite the config.");

      return null;
    }

    const groupOptions = filterOptions(group[valuesKey] as UnknownObject[], search, label);

    return groupOptions.length
      ? {
          [groupLabelKey]: group[groupLabelKey],
          [valuesKey]: groupOptions,
        }
      : null;
  });

  return filteredGroups.filter((group) => group !== null) as Group[];
}

export function flattenOptions(
  options: Group[],
  valuesKey: string,
  groupLabelKey: string,
): UnknownObject[] {
  return options.reduce<UnknownObject[]>((result, group) => {
    if (group[valuesKey] && (group[valuesKey] as UnknownObject[]).length) {
      result.push({ groupLabel: group[groupLabelKey] });

      return result.concat(group[valuesKey] as UnknownObject[]);
    }

    return result;
  }, []);
}

export function isEmptyValue(value: unknown): boolean {
  if (value === 0) return false;
  if (Array.isArray(value) && value.length === 0) return true;

  return !value;
}

export function removeEmptyGroups(options: Group[], groupValueKey: string): Group[] {
  return options.filter((group) =>
    Boolean(
      (group[groupValueKey] as UnknownObject[] | undefined)?.filter((item) => !item.isSubGroup)
        .length,
    ),
  );
}

export function removeSelectedValues(
  options: Group[],
  groupValueKey: string | null,
  valueKey: string,
  modelValue: (string | number)[],
): Group[] {
  if (!groupValueKey) {
    return options.filter((option) => !modelValue.includes(option[valueKey] as string | number));
  }

  const availableValues = options.map((group) => ({
    ...group,
    [groupValueKey]: (group[groupValueKey] as UnknownObject[] | undefined)?.filter(
      (item) => !modelValue.includes(item[valueKey] as string | number),
    ),
  }));

  return removeEmptyGroups(availableValues, groupValueKey);
}

export function interpolateLabel(option: UnknownObject, label: string): string {
  if (isEmptyValue(option)) return "";

  return label ? (option[label] as string) || "" : String(option);
}

export function getGroupOption(
  item: string | number,
  options: Group[],
  groupValueKey: string,
  valueKey: string,
): UnknownObject | undefined {
  const group = options.find((group) =>
    (group[groupValueKey] as UnknownObject[] | undefined)?.find(
      (value) => value[valueKey] === item,
    ),
  );

  return Array.isArray(group?.[groupValueKey])
    ? (group[groupValueKey] as UnknownObject[]).find(
        (value) => (value as UnknownObject)[valueKey] === item,
      )
    : undefined;
}

export function getCurrentOption(
  item: UnknownObject | string | number,
  options: UnknownObject[] | Group[],
  groupValueKey: string | null,
  valueKey: string,
): UnknownObject | undefined {
  if (groupValueKey) {
    return getGroupOption(item as string | number, options as Group[], groupValueKey, valueKey);
  }

  const value = (item && (item as UnknownObject)[valueKey]) || item;

  return (options as UnknownObject[]).find((option) => option[valueKey] === value);
}
