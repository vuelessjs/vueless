import { describe, it, expectTypeOf } from "vitest";

import type {
  Props,
  RowId,
  SelectedSlotRow,
  SlotRow,
  TableRow,
  UTableDynamicSlots,
  UTableSlots,
} from "../types";

interface UserRow {
  id: number;
  name: string;
  qty: number;
}

type CellSlot = NonNullable<UTableSlots<UserRow>["cell-name"]>;
type CellProps = Parameters<CellSlot>[0];

/* The caller's own row members must all stay optional — see `SlotRow`. */
type RequiredKeys<T> = {
  [K in keyof T]-?: object extends Pick<T, K> ? never : K;
}[keyof T];

describe("UTable types", () => {
  it("infers the caller's row shape in a cell slot", () => {
    expectTypeOf<CellProps["row"]["name"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<CellProps["row"]["qty"]>().toEqualTypeOf<number | undefined>();
    expectTypeOf<CellProps["index"]>().toEqualTypeOf<number>();
    expectTypeOf<CellProps["cellIndex"]>().toEqualTypeOf<number>();
  });

  it("does not expose undeclared row properties to a cell slot", () => {
    /* An index signature would make any key legal, so `row.nonExistent` must not resolve. */
    type HasIndexSignature = string extends keyof CellProps["row"] ? true : false;

    expectTypeOf<HasIndexSignature>().toEqualTypeOf<false>();
    expectTypeOf<keyof CellProps["row"]>().not.toEqualTypeOf<string>();
  });

  it("keeps the row flattening metadata available", () => {
    expectTypeOf<CellProps["row"]>().toHaveProperty("nestedLevel");
    expectTypeOf<SlotRow<UserRow>["nestedLevel"]>().toEqualTypeOf<number>();
  });

  it("types the static slots", () => {
    type SelectedRows = Parameters<NonNullable<UTableSlots<UserRow>["header-actions"]>>[0];

    expectTypeOf<SelectedRows["selectedRows"]>().toEqualTypeOf<SelectedSlotRow<UserRow>[]>();

    type Expand = NonNullable<UTableSlots<UserRow>["expand"]>;

    expectTypeOf<Parameters<Expand>[0]["expanded"]>().toEqualTypeOf<boolean>();
  });

  it("does not promise the caller's members on selected rows", () => {
    /* Select-all flattens nested children into the selection, and those need not carry
     * `TRow`'s members — so the slot must not type them as guaranteed. */
    expectTypeOf<SelectedSlotRow<UserRow>["name"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<SelectedSlotRow<UserRow>["qty"]>().toEqualTypeOf<number | undefined>();

    /* A nested child, as `getFlatRows` actually produces it, must be assignable. */
    expectTypeOf<{
      id: number;
      nestedLevel: number;
      parentRowId: number;
    }>().toExtend<SelectedSlotRow<UserRow>>();

    /* Flattening metadata stays guaranteed. */
    expectTypeOf<SelectedSlotRow<UserRow>["nestedLevel"]>().toEqualTypeOf<number>();
  });

  it("does not promise the caller's members on any row slot", () => {
    /* `getFlatRows` recurses into `row.row`, and a nested child is typed `TableRow`, not `TRow`.
     * Every row slot receives those children verbatim; `nested-row` receives nothing else. */
    type Expand = Parameters<NonNullable<UTableSlots<UserRow>["expand"]>>[0];
    type NestedRow = Parameters<NonNullable<UTableSlots<UserRow>["nested-row"]>>[0];

    expectTypeOf<CellProps["row"]["name"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<Expand["row"]["name"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<NestedRow["row"]["name"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<NestedRow["row"]["qty"]>().toEqualTypeOf<number | undefined>();

    /* The real nested-child shape recorded at these slots must be assignable to all of them. */
    type NestedChild = {
      id: number;
      label: string;
      nestedLevel: number;
      parentRowId: number;
    };

    expectTypeOf<NestedChild>().toExtend<CellProps["row"]>();
    expectTypeOf<NestedChild>().toExtend<Expand["row"]>();
    expectTypeOf<NestedChild>().toExtend<NestedRow["row"]>();

    /* Flattening metadata is always set by `getFlatRows`, so it stays guaranteed. */
    expectTypeOf<Expand["row"]["nestedLevel"]>().toEqualTypeOf<number>();
    expectTypeOf<NestedRow["row"]["nestedLevel"]>().toEqualTypeOf<number>();
    expectTypeOf<NestedRow["row"]["id"]>().toExtend<RowId>();
    expectTypeOf<undefined>().not.toExtend<NestedRow["row"]["id"]>();
  });

  it("resolves Props with no type argument", () => {
    expectTypeOf<Props>().toEqualTypeOf<Props<TableRow>>();
    expectTypeOf<Props<UserRow>["rows"]>().toEqualTypeOf<UserRow[]>();
  });

  it("narrows the dynamic slot keys to the known column keys", () => {
    type Narrowed = keyof UTableDynamicSlots<UserRow, "name" | "qty">;

    expectTypeOf<"cell-name">().toExtend<Narrowed>();
    expectTypeOf<"header-qty">().toExtend<Narrowed>();
    expectTypeOf<"cell-typo">().not.toExtend<Narrowed>();
    expectTypeOf<"header-typo">().not.toExtend<Narrowed>();
  });

  it("accepts every dynamic slot key when the columns are not statically known", () => {
    /* Columns from a `ref`, an API, or a plain `string[]` widen `TCol` to `string`. Erroring on
     * a valid slot there would break existing callers, so the keys must stay open. */
    type Loose = keyof UTableDynamicSlots<UserRow>;

    expectTypeOf<"cell-name">().toExtend<Loose>();
    expectTypeOf<"cell-anything-at-all">().toExtend<Loose>();
    expectTypeOf<"header-whatever">().toExtend<Loose>();

    expectTypeOf<UTableDynamicSlots<UserRow>>().toEqualTypeOf<
      UTableDynamicSlots<UserRow, string>
    >();
  });

  it("accepts every dynamic slot key when the columns are empty", () => {
    /* An empty `columns` array infers `TCol` as `never`, which means "not statically known",
     * not "no keys allowed". Without the `[TCol]` tuple guard the mapped type collapses to `{}`
     * and every slot is rejected — the "columns load async, start empty" pattern breaks. */
    type Empty = keyof UTableDynamicSlots<UserRow, never>;

    /* `toEqualTypeOf`, not `toExtend`: the bug made `Empty` collapse to `never`, and `never`
     * satisfies every `toExtend` assertion vacuously. */
    expectTypeOf<Empty>().toEqualTypeOf<`cell-${string}` | `header-${string}`>();
    expectTypeOf<Empty>().not.toEqualTypeOf<never>();

    expectTypeOf<UTableDynamicSlots<UserRow, never>>().toEqualTypeOf<
      UTableDynamicSlots<UserRow, string>
    >();
  });

  it("keeps the row shape intact when the keys are narrowed", () => {
    type NarrowCell = Parameters<NonNullable<UTableSlots<UserRow, "name" | "qty">["cell-name"]>>[0];

    expectTypeOf<NarrowCell["row"]["name"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<NarrowCell["row"]["nestedLevel"]>().toEqualTypeOf<number>();
  });

  it("keeps the slot payloads identical however the keys resolve", () => {
    /* Narrowing must only change which keys exist, never what a slot receives. */
    type WideCell = Parameters<NonNullable<UTableSlots<UserRow>["cell-name"]>>[0];
    type NarrowCell = Parameters<NonNullable<UTableSlots<UserRow, "name" | "qty">["cell-name"]>>[0];
    type EmptyCell = Parameters<NonNullable<UTableSlots<UserRow, never>["cell-name"]>>[0];

    expectTypeOf<NarrowCell>().toEqualTypeOf<WideCell>();
    expectTypeOf<EmptyCell>().toEqualTypeOf<WideCell>();

    type WideHeader = Parameters<NonNullable<UTableSlots<UserRow>["header-name"]>>[0];
    type EmptyHeader = Parameters<NonNullable<UTableSlots<UserRow, never>["header-name"]>>[0];

    expectTypeOf<EmptyHeader>().toEqualTypeOf<WideHeader>();

    /* No row slot may promise the caller's members, whatever `TCol` is. Only the flattening
     * metadata stays required; `name`/`qty` must never appear among the required keys. */
    expectTypeOf<RequiredKeys<EmptyCell["row"]>>().toEqualTypeOf<RequiredKeys<WideCell["row"]>>();
    expectTypeOf<RequiredKeys<NarrowCell["row"]>>().toEqualTypeOf<RequiredKeys<WideCell["row"]>>();

    type CallerKeys = Extract<RequiredKeys<SlotRow<UserRow>>, "name" | "qty">;

    expectTypeOf<CallerKeys>().toEqualTypeOf<never>();
  });
});
