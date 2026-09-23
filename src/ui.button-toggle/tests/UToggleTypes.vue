<!-- Type-level fixture: checked by `npm run ts:check`, never mounted.
     Proves slot props infer from the `options` prop at a real call site. -->
<template>
  <!-- `UToggle` iterates `options` verbatim, so the caller's shape is guaranteed, not optional. -->
  <UToggle name="fixture" :options="options">
    <template #left="{ option, index, iconName }">
      {{ expectString(option.color) }}
      {{ expectNumber(index) }}
      {{ expectOptionalString(iconName) }}
    </template>

    <template #option="{ option, label, index }">
      {{ expectString(option.color) }}
      {{ expectString(label) }}
      {{ expectNumber(index) }}
    </template>

    <template #right="{ option }">
      <!-- @vue-expect-error `nonExistent` is not a key of the inferred option. -->
      {{ option.nonExistent }}
    </template>
  </UToggle>

  <!-- Options from a non-literal source still expose the declared option shape. -->
  <UToggle name="typed" :options="typedOptions">
    <template #option="{ option }">{{ expectNumber(option.count) }}</template>
  </UToggle>
</template>

<script setup lang="ts">
import { ref } from "vue";

import UToggle from "../UToggle.vue";

interface CountedOption {
  value: string;
  label: string;
  count: number;
}

const options = [{ value: "1", label: "Success", color: "success" }];
const typedOptions = ref<CountedOption[]>([]);

function expectString(value: string) {
  return value;
}

function expectNumber(value: number) {
  return value;
}

function expectOptionalString(value: string | undefined) {
  return value;
}
</script>
