<!-- Type-level fixture: checked by `npm run ts:check`, never mounted.
     Proves slot props infer from the `options` prop at a real call site. -->
<template>
  <USelect :options="options">
    <!-- Forwarded verbatim to `UListbox`, so they inherit its group flattening — a flattened
         member need not carry the parent's members, hence the optional types. -->
    <template #before-option="{ option, index }">
      {{ expectOptionalString(option.label) }}
      {{ expectOptionalNumber(option.qty) }}
      {{ expectNumber(index) }}
    </template>

    <template #option="{ option, index }">
      {{ expectOptionalString(option.label) }}
      {{ expectNumber(index) }}
    </template>

    <template #after-option="{ option, selected, index }">
      {{ expectOptionalString(option.label) }}
      {{ expectBoolean(selected) }}
      {{ expectNumber(index) }}
    </template>

    <template #empty>empty</template>
  </USelect>

  <!-- Options from a non-literal source still expose the declared option shape. -->
  <USelect :options="typedOptions">
    <template #option="{ option }">{{ expectOptionalString(option.label) }}</template>
  </USelect>

  <USelect :options="options">
    <template #option="{ option }">
      <!-- @vue-expect-error `nonExistent` is not a key of the inferred option. -->
      {{ option.nonExistent }}
    </template>
  </USelect>

  <!-- Regression guard: `getCurrentOption` returns `{} as Option` when no option matches
       `modelValue` (`utilSelect.ts:15`). A runtime probe records that bare `{}` arriving at
       `selected-option`, `left` and `right`, and as an array element in `multiple` mode. -->
  <USelect :options="options" model-value="no-such-value">
    <template #selected-option="{ option }">
      <!-- @vue-expect-error the `{}` fallback need not carry `label`. -->
      {{ expectString(option.label) }}
    </template>

    <template #left="{ options: selected }">
      <!-- @vue-expect-error the binding is `option | option[]`, never an array alone. -->
      {{ expectArray(selected) }}
    </template>

    <template #right="{ options: selected }">
      {{ expectSelectedBinding(selected) }}
    </template>

    <template #selected-options="{ options: selected }">
      {{ expectSelectedBinding(selected) }}
    </template>
  </USelect>

  <USelect :options="options" :model-value="['a']" multiple>
    <template #selected-options="{ options: selected }">
      <!-- @vue-expect-error in `multiple` mode an element may be the `{}` fallback. -->
      {{ Array.isArray(selected) ? expectString(selected[0].label) : "" }}
    </template>
  </USelect>
</template>

<script setup lang="ts">
import { ref } from "vue";

import USelect from "../USelect.vue";

import type { SelectedOptionsBinding } from "../types";

interface UserOption {
  label: string;
  value: string;
  qty: number;
}

const options = [{ label: "a", value: "a", qty: 1 }];
const typedOptions = ref<UserOption[]>([]);

function expectString(value: string) {
  return value;
}

function expectNumber(value: number) {
  return value;
}

function expectBoolean(value: boolean) {
  return value;
}

function expectOptionalString(value: string | undefined) {
  return value;
}

function expectOptionalNumber(value: number | undefined) {
  return value;
}

function expectArray(value: unknown[]) {
  return value;
}

function expectSelectedBinding(value: SelectedOptionsBinding<UserOption>) {
  return value;
}
</script>
