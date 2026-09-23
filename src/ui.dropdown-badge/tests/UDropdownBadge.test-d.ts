import { describe, it, expectTypeOf } from "vitest";

import type { Props, UDropdownBadgeSlots } from "../types";
import type { ListboxOption, SlotOption } from "../../ui.form-listbox/types";

interface UserOption {
  label: string;
  value: string;
  qty: number;
}

type OptionProps = Parameters<NonNullable<UDropdownBadgeSlots<UserOption>["option"]>>[0];

describe("UDropdownBadge types", () => {
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
    /* Forwarded through `UDropdown` to `UListbox`, whose `filterGroups` concats nested group
     * members into the flat list — a member need not carry the parent's members. */
    type BeforeProps = Parameters<NonNullable<UDropdownBadgeSlots<UserOption>["before-option"]>>[0];
    type AfterProps = Parameters<NonNullable<UDropdownBadgeSlots<UserOption>["after-option"]>>[0];

    type GroupMember = { value: string; title: string };

    expectTypeOf<GroupMember>().toExtend<BeforeProps["option"]>();
    expectTypeOf<GroupMember>().toExtend<OptionProps["option"]>();
    expectTypeOf<GroupMember>().toExtend<AfterProps["option"]>();
  });

  it("types the default slot label as possibly undefined", () => {
    /* It is `UDropdown`'s `displayLabel`, a join of `option[labelKey]` lookups. */
    type DefaultProps = Parameters<NonNullable<UDropdownBadgeSlots<UserOption>["default"]>>[0];

    expectTypeOf<DefaultProps["label"]>().toEqualTypeOf<string | undefined>();
  });

  it("resolves Props with no type argument", () => {
    expectTypeOf<Props>().toEqualTypeOf<Props<ListboxOption>>();
    expectTypeOf<Props<UserOption>["options"]>().toEqualTypeOf<UserOption[] | undefined>();
  });
});
