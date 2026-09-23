import { describe, it, expectTypeOf } from "vitest";

import type { Props, UToggleOption, UToggleSlots } from "../types";

interface CountedOption {
  value: string;
  label: string;
  count: number;
}

type OptionProps = Parameters<NonNullable<UToggleSlots<CountedOption>["option"]>>[0];

describe("UToggle types", () => {
  it("infers the caller's option shape in a slot", () => {
    expectTypeOf<OptionProps["option"]>().toEqualTypeOf<CountedOption>();
    expectTypeOf<OptionProps["option"]["count"]>().toEqualTypeOf<number>();
    expectTypeOf<OptionProps["index"]>().toEqualTypeOf<number>();
    expectTypeOf<OptionProps["label"]>().toEqualTypeOf<string>();
  });

  it("promises the caller's members — options reach slots untransformed", () => {
    /* Unlike UTable, `UToggle` iterates `props.options` directly: no flattening, filtering
     * or synthetic entries, so the members are guaranteed rather than optional. */
    expectTypeOf<OptionProps["option"]["label"]>().toEqualTypeOf<string>();
    expectTypeOf<undefined>().not.toExtend<OptionProps["option"]["count"]>();
  });

  it("does not expose undeclared option properties to a slot", () => {
    type HasIndexSignature = string extends keyof OptionProps["option"] ? true : false;

    expectTypeOf<HasIndexSignature>().toEqualTypeOf<false>();
    expectTypeOf<keyof OptionProps["option"]>().not.toEqualTypeOf<string>();
  });

  it("types the remaining slots", () => {
    type Left = Parameters<NonNullable<UToggleSlots<CountedOption>["left"]>>[0];
    type Right = Parameters<NonNullable<UToggleSlots<CountedOption>["right"]>>[0];

    expectTypeOf<Left["option"]>().toEqualTypeOf<CountedOption>();
    expectTypeOf<Right["option"]>().toEqualTypeOf<CountedOption>();
    expectTypeOf<Left["iconName"]>().toEqualTypeOf<string | undefined>();
  });

  it("resolves Props with no type argument", () => {
    expectTypeOf<Props>().toEqualTypeOf<Props<UToggleOption>>();
    expectTypeOf<Props<CountedOption>["options"]>().toEqualTypeOf<CountedOption[] | undefined>();
  });
});
