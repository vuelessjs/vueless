import { describe, it, expectTypeOf } from "vitest";

import type { ListboxOption, Props, SlotOption, UListboxSlots } from "../types";

interface UserOption {
  label: string;
  value: string;
  qty: number;
}

type OptionSlot = NonNullable<UListboxSlots<UserOption>["option"]>;
type OptionProps = Parameters<OptionSlot>[0];

describe("UListbox types", () => {
  it("infers the caller's option shape in an option slot", () => {
    expectTypeOf<OptionProps["option"]["label"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<OptionProps["option"]["qty"]>().toEqualTypeOf<number | undefined>();
    expectTypeOf<OptionProps["index"]>().toEqualTypeOf<number>();
  });

  it("does not expose undeclared option properties to a slot", () => {
    /* An index signature would make any key legal, so `option.nonExistent` must not resolve. */
    type HasIndexSignature = string extends keyof OptionProps["option"] ? true : false;

    expectTypeOf<HasIndexSignature>().toEqualTypeOf<false>();
    expectTypeOf<keyof OptionProps["option"]>().not.toEqualTypeOf<string>();
  });

  it("keeps the reserved option keys available", () => {
    expectTypeOf<OptionProps["option"]>().toHaveProperty("groupLabel");
    expectTypeOf<OptionProps["option"]>().toHaveProperty("isSubGroup");
    expectTypeOf<OptionProps["option"]>().toHaveProperty("level");
  });

  it("does not promise the caller's members on any option slot", () => {
    /* `filterGroups` concats the `groupValueKey` array into the flat list the slots iterate, and
     * those members are typed `Option`, not `TOption`. A runtime probe with grouped options whose
     * members lack the parent's members confirms all three slots receive them verbatim. */
    type BeforeOption = Parameters<NonNullable<UListboxSlots<UserOption>["before-option"]>>[0];
    type AfterOption = Parameters<NonNullable<UListboxSlots<UserOption>["after-option"]>>[0];

    expectTypeOf<BeforeOption["option"]["label"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<OptionProps["option"]["label"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<AfterOption["option"]["label"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<AfterOption["selected"]>().toEqualTypeOf<boolean>();

    /* The real flattened-member shape recorded at these slots must be assignable to all of them. */
    type GroupMember = { label: string; value: string };

    expectTypeOf<GroupMember>().toExtend<BeforeOption["option"]>();
    expectTypeOf<GroupMember>().toExtend<OptionProps["option"]>();
    expectTypeOf<GroupMember>().toExtend<AfterOption["option"]>();
  });

  it("resolves Props with no type argument", () => {
    expectTypeOf<Props>().toEqualTypeOf<Props<ListboxOption>>();
    expectTypeOf<Props<UserOption>["options"]>().toEqualTypeOf<UserOption[] | undefined>();
  });

  it("exposes SlotOption as the shared slot option shape", () => {
    expectTypeOf<SlotOption<UserOption>>().toEqualTypeOf<OptionProps["option"]>();
  });
});
