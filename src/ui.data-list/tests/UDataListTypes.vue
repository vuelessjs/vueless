<!-- Type-level fixture: checked by `npm run ts:check`, never mounted.
     Proves slot props infer from the `list` prop at a real call site. -->
<template>
  <UDataList :list="list">
    <!-- A nested child may lack the parent's members, so they are optional;
         the reserved keys (`crossed`, `actions`, `children`) are optional already. -->
    <template #label="{ item, crossed }">
      {{ expectOptionalString(item.label) }}
      {{ expectOptionalString(item.owner) }}
      {{ expectOptionalNumber(item.value) }}
      {{ expectBoolean(crossed) }}
    </template>

    <template #drag="{ item, iconName }">
      {{ expectOptionalString(item.label) }}
      {{ expectString(iconName) }}
    </template>

    <template #actions="{ item }">
      {{ expectOptionalString(item.owner) }}
    </template>

    <template #empty="{ emptyTitle, emptyDescription }">
      {{ expectString(emptyTitle) }}
      {{ expectString(emptyDescription) }}
    </template>
  </UDataList>

  <!-- A list from a non-literal source still exposes the declared item shape. -->
  <UDataList :list="typedList">
    <template #label="{ item }">{{ expectOptionalString(item.label) }}</template>
  </UDataList>

  <UDataList :list="list">
    <template #label="{ item }">
      <!-- @vue-expect-error `nonExistent` is not a key of the inferred item. -->
      {{ item.nonExistent }}
    </template>
  </UDataList>

  <!-- Regression guard: an item slot must never promise the caller's members as present.
       The component renders ITSELF with `:list="element.children"`, and `children` is
       `DataListItem[]`, not `TItem[]` — a runtime probe over 3 levels observed the
       grandchild arriving with `{ value, label, extraOnly }` and NO `owner`. -->
  <UDataList :list="deepList">
    <template #label="{ item }">
      <!-- @vue-expect-error a grandchild at depth 2 need not carry `owner`. -->
      {{ expectString(item.owner) }}
    </template>
    <template #drag="{ item }">
      <!-- @vue-expect-error a nested child need not carry `label`. -->
      {{ expectString(item.label) }}
    </template>
    <template #actions="{ item }">
      <!-- @vue-expect-error a nested child need not carry `value`. -->
      {{ expectNumber(item.value) }}
    </template>
  </UDataList>
</template>

<script setup lang="ts">
import { ref } from "vue";

import UDataList from "../UDataList.vue";

interface UserItem {
  value: number;
  label: string;
  owner: string;
}

const list = [{ value: 1, label: "a", owner: "alice" }];
const typedList = ref<UserItem[]>([]);

/* A parent whose grandchild lacks the parent's members — exactly what the probe observed. */
const deepList = [
  {
    value: 1,
    label: "Parent",
    owner: "alice",
    children: [
      {
        value: 11,
        label: "Child",
        children: [{ value: 111, label: "Grandchild", extraOnly: true }],
      },
    ],
  },
];

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
</script>
