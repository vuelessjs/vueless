import { describe, it, expectTypeOf } from "vitest";

import type { Props, UTabsOption, UTabsSlots } from "../types";

interface CountedTab {
  value: string;
  label: string;
  count: number;
}

type LabelProps = Parameters<NonNullable<UTabsSlots<CountedTab>["label"]>>[0];

describe("UTabs types", () => {
  it("infers the caller's option shape in a slot", () => {
    expectTypeOf<LabelProps["item"]>().toEqualTypeOf<CountedTab>();
    expectTypeOf<LabelProps["item"]["count"]>().toEqualTypeOf<number>();
    expectTypeOf<LabelProps["index"]>().toEqualTypeOf<number>();
    expectTypeOf<LabelProps["label"]>().toEqualTypeOf<string>();
    expectTypeOf<LabelProps["active"]>().toEqualTypeOf<boolean>();
  });

  it("promises the caller's members — options reach slots untransformed", () => {
    /* Unlike UTable, `UTabs` iterates `props.options` directly: no flattening, filtering
     * or synthetic entries, so the members are guaranteed rather than optional. */
    expectTypeOf<LabelProps["item"]["label"]>().toEqualTypeOf<string>();
    expectTypeOf<undefined>().not.toExtend<LabelProps["item"]["count"]>();
  });

  it("does not expose undeclared option properties to a slot", () => {
    type HasIndexSignature = string extends keyof LabelProps["item"] ? true : false;

    expectTypeOf<HasIndexSignature>().toEqualTypeOf<false>();
    expectTypeOf<keyof LabelProps["item"]>().not.toEqualTypeOf<string>();
  });

  it("types the remaining slots", () => {
    type Left = Parameters<NonNullable<UTabsSlots<CountedTab>["left"]>>[0];
    type Right = Parameters<NonNullable<UTabsSlots<CountedTab>["right"]>>[0];
    type Prev = Parameters<NonNullable<UTabsSlots["prev"]>>[0];

    expectTypeOf<Left["item"]>().toEqualTypeOf<CountedTab>();
    expectTypeOf<Right["item"]>().toEqualTypeOf<CountedTab>();
    expectTypeOf<Prev["iconName"]>().toEqualTypeOf<string>();
  });

  it("resolves Props with no type argument", () => {
    expectTypeOf<Props>().toEqualTypeOf<Props<UTabsOption>>();
    expectTypeOf<Props<CountedTab>["options"]>().toEqualTypeOf<CountedTab[] | undefined>();
  });
});
