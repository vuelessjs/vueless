export default class SelectService {
  static filterOptions(options, search, label) {
    return search
      ? options
          .filter((option) => this.interpolateLabel(option, label).includes(search))
          .sort((a, b) => {
            return this.interpolateLabel(a, label).length - this.interpolateLabel(b, label).length;
          })
      : options;
  }

  static filterGroups(options, search, label, values, groupLabel) {
    return options.map((group) => {
      if (!group[values]) {
        // eslint-disable-next-line no-console
        console.warn("Options passed to select do not contain groups, despite the config.");

        return [];
      }

      const groupOptions = this.filterOptions(group[values], search, label);

      return groupOptions.length
        ? {
            [groupLabel]: group[groupLabel],
            [values]: groupOptions,
          }
        : [];
    });
  }

  static flattenOptions(options, values, label) {
    return options.reduce((prev, curr) => {
      if (curr[values] && curr[values].length) {
        prev.push({
          $groupLabel: curr[label],
          $isLabel: true,
        });

        return prev.concat(curr[values]);
      }

      return prev;
    }, []);
  }

  static isEmpty(opt) {
    if (opt === 0) return false;
    if (Array.isArray(opt) && opt.length === 0) return true;

    return !opt;
  }

  static removeEmptyGroups(options, groupValues) {
    return options.filter((group) => {
      return Boolean(group[groupValues].filter((item) => !item.isSubGroup).length);
    });
  }

  static removeSelectedValues(options, groupValues, valueKey, modelValue) {
    if (!groupValues) {
      return options.filter((option) => !modelValue.includes(option[valueKey]));
    }

    const availableValues = options.map((group) => {
      return {
        ...group,
        [groupValues]: group[groupValues].filter((item) => !modelValue.includes(item[valueKey])),
      };
    });

    return this.removeEmptyGroups(availableValues, groupValues);
  }

  static interpolateLabel(option, label) {
    if (this.isEmpty(option)) return "";

    return label ? option[label] : option;
  }

  static getGroupOption(item, options, groupValues, valueKey) {
    const groupOptions = options.find((option) =>
      option[groupValues]?.find((value) => value[valueKey] === item),
    );

    return groupOptions?.[groupValues].find((value) => value[valueKey] === item);
  }

  static getCurrentOption(item, options, groupValues, valueKey) {
    if (groupValues) {
      return this.getGroupOption(item, options, groupValues, valueKey);
    }

    const value = item[valueKey] || item;

    return options.find((option) => option[valueKey] === value);
  }
}
