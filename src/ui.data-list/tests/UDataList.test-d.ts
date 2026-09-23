import { describe, it, expectTypeOf } from "vitest";

import type { Props, DataListItem, SlotItem, UDataListSlots } from "../types";

interface UserItem {
  value: number;
  label: string;
  owner: string;
}

type LabelSlot = NonNullable<UDataListSlots<UserItem>["label"]>;
type LabelProps = Parameters<LabelSlot>[0];

describe("UDataList types", () => {
  it("infers the caller's item shape in the label slot", () => {
    expectTypeOf<LabelProps["item"]["label"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<LabelProps["item"]["owner"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<LabelProps["crossed"]>().toEqualTypeOf<boolean>();
  });

  it("does not expose undeclared item properties to a slot", () => {
    /* An index signature would make any key legal, so `item.nonExistent` must not resolve. */
    type HasIndexSignature = string extends keyof LabelProps["item"] ? true : false;

    expectTypeOf<HasIndexSignature>().toEqualTypeOf<false>();
    expectTypeOf<keyof LabelProps["item"]>().not.toEqualTypeOf<string>();
  });

  it("keeps the reserved item keys available", () => {
    expectTypeOf<SlotItem<UserItem>["crossed"]>().toEqualTypeOf<boolean | undefined>();
    expectTypeOf<SlotItem<UserItem>["actions"]>().toEqualTypeOf<boolean | undefined>();
    expectTypeOf<SlotItem<UserItem>["children"]>().toEqualTypeOf<DataListItem[] | undefined>();
  });

  it("types the drag and actions slots", () => {
    type DragProps = Parameters<NonNullable<UDataListSlots<UserItem>["drag"]>>[0];
    type ActionsProps = Parameters<NonNullable<UDataListSlots<UserItem>["actions"]>>[0];

    expectTypeOf<DragProps["iconName"]>().toEqualTypeOf<string>();
    expectTypeOf<DragProps["item"]["label"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<ActionsProps["item"]["owner"]>().toEqualTypeOf<string | undefined>();
  });

  it("types the empty slot", () => {
    type EmptyProps = Parameters<NonNullable<UDataListSlots<UserItem>["empty"]>>[0];

    expectTypeOf<EmptyProps["emptyTitle"]>().toEqualTypeOf<string>();
    expectTypeOf<EmptyProps["emptyDescription"]>().toEqualTypeOf<string>();
  });

  it("does not promise the caller's members at depth >= 1", () => {
    /* The component renders itself with `:list="element.children"`, and `children` is
     * `DataListItem[]`, not `TItem[]` — so a nested child need not carry the parent's members.
     * A runtime probe over 3 levels confirmed the grandchild arrives without `owner`. */
    expectTypeOf<SlotItem<UserItem>["owner"]>().toEqualTypeOf<string | undefined>();

    /* The grandchild shape the probe actually observed must be assignable to every item slot. */
    type Grandchild = { value: number; label: string; extraOnly: boolean };

    type DragProps = Parameters<NonNullable<UDataListSlots<UserItem>["drag"]>>[0];
    type ActionsProps = Parameters<NonNullable<UDataListSlots<UserItem>["actions"]>>[0];

    expectTypeOf<Grandchild>().toExtend<LabelProps["item"]>();
    expectTypeOf<Grandchild>().toExtend<DragProps["item"]>();
    expectTypeOf<Grandchild>().toExtend<ActionsProps["item"]>();

    /* `nestedKey` can open a nested list from a source `children` does not constrain, so even
     * an item carrying none of the caller's members must be admitted. */
    expectTypeOf<{ value: number }>().toExtend<LabelProps["item"]>();
  });

  it("resolves Props with no type argument", () => {
    expectTypeOf<Props>().toEqualTypeOf<Props<DataListItem>>();
    expectTypeOf<Props<UserItem>["list"]>().toEqualTypeOf<UserItem[] | undefined>();
  });
});
