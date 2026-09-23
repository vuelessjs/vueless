<!-- Type-level fixture: checked by `npm run ts:check`, never mounted.
     Proves slot props infer from the `options` prop at a real call site. -->
<template>
  <!-- `UTabs` iterates `options` verbatim, so the caller's shape is guaranteed, not optional. -->
  <UTabs :options="options">
    <template #left="{ item, index, active, iconName }">
      {{ expectString(item.label) }}
      {{ expectString(item.badge) }}
      {{ expectNumber(index) }}
      {{ expectBoolean(active) }}
      {{ expectOptionalString(iconName) }}
    </template>

    <template #label="{ item, index, label, active }">
      {{ expectString(item.badge) }}
      {{ expectString(label) }}
      {{ expectNumber(index) }}
      {{ expectBoolean(active) }}
    </template>

    <template #right="{ item }">
      <!-- @vue-expect-error `nonExistent` is not a key of the inferred option. -->
      {{ item.nonExistent }}
    </template>

    <template #prev="{ iconName }">{{ expectString(iconName) }}</template>
    <template #next="{ iconName }">{{ expectString(iconName) }}</template>
  </UTabs>

  <!-- Options from a non-literal source still expose the declared option shape. -->
  <UTabs :options="typedOptions">
    <template #label="{ item }">{{ expectNumber(item.count) }}</template>
  </UTabs>
</template>

<script setup lang="ts">
import { ref } from "vue";

import UTabs from "../UTabs.vue";

interface CountedTab {
  value: string;
  label: string;
  count: number;
}

const options = [{ value: "1", label: "Dashboard", badge: "new" }];
const typedOptions = ref<CountedTab[]>([]);

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
</script>
