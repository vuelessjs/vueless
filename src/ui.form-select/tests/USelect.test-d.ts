import { describe, it, expectTypeOf } from "vitest";

import type {
  Props,
  SelectOption,
  SelectedSlotOption,
  SelectedOptionsBinding,
  USelectSlots,
} from "../types";
import type { SlotOption } from "../../ui.form-listbox/types";

interface UserOption {
  label: string;
  value: string;
  qty: number;
}

type OptionSlot = NonNullable<USelectSlots<UserOption>["option"]>;
type OptionProps = Parameters<OptionSlot>[0];

type SelectedOptionProps = Parameters<NonNullable<USelectSlots<UserOption>["selected-option"]>>[0];

describe("USelect types", () => {
  it("infers the caller's option shape in a forwarded option slot", () => {
    expectTypeOf<OptionProps["option"]["label"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<OptionProps["option"]["qty"]>().toEqualTypeOf<number | undefined>();
    expectTypeOf<OptionProps["index"]>().toEqualTypeOf<number>();
  });

  it("does not expose undeclared option properties to a slot", () => {
    type HasIndexSignature = string extends keyof OptionProps["option"] ? true : false;

    expectTypeOf<HasIndexSignature>().toEqualTypeOf<false>();
    expectTypeOf<keyof OptionProps["option"]>().not.toEqualTypeOf<string>();
  });

  it("reuses UListbox's SlotOption rather than a second dialect", () => {
    /* Stage 3 must not invent its own option-slot shape. */
    expectTypeOf<OptionProps["option"]>().toEqualTypeOf<SlotOption<UserOption>>();
    expectTypeOf<SelectedSlotOption<UserOption>>().toEqualTypeOf<SlotOption<UserOption>>();
  });

  it("promises nothing on a selected option, because {} reaches it at runtime", () => {
    /* `getCurrentOption` returns `{} as Option` when no option matches `modelValue`
     * (`utilSelect.ts:15`). A runtime probe records that bare `{}` at `selected-option` in all
     * three `multiple` variants, and at `left` / `right` in single mode. */
    expectTypeOf<SelectedOptionProps["option"]["label"]>().toEqualTypeOf<string | undefined>();
    expectTypeOf<SelectedOptionProps["option"]["qty"]>().toEqualTypeOf<number | undefined>();

    /* The empty object the runtime actually delivers must be assignable. */
    expectTypeOf<Record<string, never>>().toExtend<SelectedOptionProps["option"]>();
  });

  it("types left / right / selected-options as the option-or-array binding", () => {
    type LeftProps = Parameters<NonNullable<USelectSlots<UserOption>["left"]>>[0];
    type RightProps = Parameters<NonNullable<USelectSlots<UserOption>["right"]>>[0];
    type SelectedOptionsProps = Parameters<
      NonNullable<USelectSlots<UserOption>["selected-options"]>
    >[0];

    /* All three bind `multiple ? selectedOptions.full : selectedOption`. */
    expectTypeOf<LeftProps["options"]>().toEqualTypeOf<SelectedOptionsBinding<UserOption>>();
    expectTypeOf<RightProps["options"]>().toEqualTypeOf<SelectedOptionsBinding<UserOption>>();
    expectTypeOf<SelectedOptionsProps["options"]>().toEqualTypeOf<
      SelectedOptionsBinding<UserOption>
    >();

    /* In `multiple` mode a non-matching `modelValue` entry contributes a `{}` element. */
    expectTypeOf<Record<string, never>[]>().toExtend<SelectedOptionsBinding<UserOption>>();
  });

  it("resolves Props with no type argument", () => {
    expectTypeOf<Props>().toEqualTypeOf<Props<SelectOption>>();
    expectTypeOf<Props<UserOption>["options"]>().toEqualTypeOf<UserOption[] | undefined>();
  });
});
