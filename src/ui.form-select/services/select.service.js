export default class SelectService {
  static filterOptions(options, search, label) {
    return search
      ? options
          .filter((option) => this.interpolateLabel(option, label).includes(search))
          .sort((a, b) => {
            return (
              this.interpolateLabel(a, label).indexOf(search) -
              this.interpolateLabel(b, label).indexOf(search)
            );
          })
      : options;
  }

  static filterGroups(options, search, label, values, groupLabelKey) {
    return options.map((group) => {
      if (!group[values]) {
        // eslint-disable-next-line no-console
        console.warn("Options passed to select do not contain groups, despite the config.");

        return [];
      }

      const groupOptions = this.filterOptions(group[values], search, label);

      return groupOptions.length
        ? {
            [groupLabelKey]: group[groupLabelKey],
            [values]: groupOptions,
          }
        : [];
    });
  }

  static flattenOptions(options, values, groupLabelKey) {
    return options.reduce((prev, curr) => {
      if (curr[values] && curr[values].length) {
        prev.push({ groupLabel: curr[groupLabelKey] });

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

  static removeEmptyGroups(options, groupValueKey) {
    return options.filter((group) => {
      return Boolean(group[groupValueKey].filter((item) => !item.isSubGroup).length);
    });
  }

  static removeSelectedValues(options, groupValueKey, valueKey, modelValue) {
    if (!groupValueKey) {
      return options.filter((option) => !modelValue.includes(option[valueKey]));
    }

    const availableValues = options.map((group) => {
      return {
        ...group,
        [groupValueKey]: group[groupValueKey].filter(
          (item) => !modelValue.includes(item[valueKey]),
        ),
      };
    });

    return this.removeEmptyGroups(availableValues, groupValueKey);
  }

  static interpolateLabel(option, label) {
    if (this.isEmpty(option)) return "";

    return label ? option[label] : option;
  }

  static getGroupOption(item, options, groupValueKey, valueKey) {
    const groupOptions = options.find((option) =>
      option[groupValueKey]?.find((value) => value[valueKey] === item),
    );

    return groupOptions?.[groupValueKey].find((value) => value[valueKey] === item);
  }

  static getCurrentOption(item, options, groupValueKey, valueKey) {
    if (groupValueKey) {
      return this.getGroupOption(item, options, groupValueKey, valueKey);
    }

    const value = item[valueKey] || item;

    return options.find((option) => option[valueKey] === value);
  }
}
