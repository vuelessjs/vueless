import { describe, it, expectTypeOf } from "vitest";

import type { Props, UDropdownSlots } from "../types";
import type { ListboxOption, SlotOption } from "../../ui.form-listbox/types";

interface UserOption {
  label: string;
  value: string;
  qty: number;
}

type OptionProps = Parameters<NonNullable<UDropdownSlots<UserOption>["option"]>>[0];
type DefaultProps = Parameters<NonNullable<UDropdownSlots<UserOption>["default"]>>[0];

describe("UDropdown types", () => {
  it("infers the caller's option shape in a forwarded option slot", () => {
    expectTypeOf<OptionProps["option"]["label"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<OptionProps["option"]["qty"]>().toEqualTypeOf<number | undefined>();
    expectTypeOf<OptionProps["index"]>().toEqualTypeOf<number>();
  });

  it("does not expose undeclared option properties to a slot", () => {
    type HasIndexSignature = string extends keyof OptionProps["option"] ? true : false;

    expectTypeOf<HasIndexSignature>().toEqualTypeOf<false>();
  });

  it("reuses UListbox's SlotOption rather than a second dialect", () => {
    expectTypeOf<OptionProps["option"]>().toEqualTypeOf<SlotOption<UserOption>>();
  });

  it("does not promise the caller's members on any option slot", () => {
    /* The option slots are forwarded to `UListbox`, whose `filterGroups` concats nested group
     * members into the flat list — a member need not carry the parent's members. */
    type BeforeProps = Parameters<NonNullable<UDropdownSlots<UserOption>["before-option"]>>[0];
    type AfterProps = Parameters<NonNullable<UDropdownSlots<UserOption>["after-option"]>>[0];

    type GroupMember = { value: string; title: string };

    expectTypeOf<GroupMember>().toExtend<BeforeProps["option"]>();
    expectTypeOf<GroupMember>().toExtend<OptionProps["option"]>();
    expectTypeOf<GroupMember>().toExtend<AfterProps["option"]>();
  });

  it("keeps the full guarantee on selectedOptions, which is a plain subset", () => {
    /* `selectedOptions` filters `props.options` and injects nothing (`UDropdown.vue:93`), so
     * unlike the option slots it is NOT Partial. */
    expectTypeOf<DefaultProps["selectedOptions"]>().toEqualTypeOf<UserOption[]>();
    expectTypeOf<DefaultProps["selectedOptions"][number]["label"]>().toEqualTypeOf<string>();
  });

  it("types displayLabel as possibly undefined", () => {
    /* It joins `option[labelKey]` lookups, which are `undefined` for an option without that key. */
    expectTypeOf<DefaultProps["displayLabel"]>().toEqualTypeOf<string | undefined>();
  });

  it("resolves Props with no type argument", () => {
    expectTypeOf<Props>().toEqualTypeOf<Props<ListboxOption>>();
    expectTypeOf<Props<UserOption>["options"]>().toEqualTypeOf<UserOption[] | undefined>();
  });
});
