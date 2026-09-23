<!-- Type-level fixture: checked by `npm run ts:check`, never mounted.
     Proves slot props infer from the `options` prop at a real call site. -->
<template>
  <UListbox :options="options">
    <!-- With `groupValueKey` set, `filterGroups` flattens group members into the same list the
         slots iterate, and a member need not carry the parent's members — so they are optional. -->
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
  </UListbox>

  <!-- Options from a non-literal source still expose the declared option shape. -->
  <UListbox :options="typedOptions">
    <template #option="{ option }">{{ expectOptionalString(option.label) }}</template>
  </UListbox>

  <UListbox :options="options">
    <template #option="{ option }">
      <!-- @vue-expect-error `nonExistent` is not a key of the inferred option. -->
      {{ option.nonExistent }}
    </template>
  </UListbox>

  <!-- Regression guard: an option slot must never promise the caller's members as present.
       `filterGroups` concats the `groupValueKey` array into the flat list, and those members are
       typed `Option`, not `TOption` — a runtime probe confirms the slots receive them verbatim. -->
  <UListbox
    :options="groupedOptions"
    group-label-key="groupName"
    group-value-key="children"
    label-key="label"
  >
    <template #option="{ option }">
      <!-- @vue-expect-error a flattened group member need not carry `label`. -->
      {{ expectString(option.label) }}
    </template>
    <template #before-option="{ option }">
      <!-- @vue-expect-error a flattened group member need not carry `qty`. -->
      {{ expectNumber(option.qty) }}
    </template>
    <template #after-option="{ option }">
      <!-- @vue-expect-error a flattened group member need not carry `groupName`. -->
      {{ expectString(option.groupName) }}
    </template>
  </UListbox>
</template>

<script setup lang="ts">
import { ref } from "vue";

import UListbox from "../UListbox.vue";

interface UserOption {
  label: string;
  value: string;
  qty: number;
}

const options = [{ label: "a", value: "a", qty: 1 }];
const typedOptions = ref<UserOption[]>([]);

/* A group whose members lack the parent's members — exactly what `filterGroups` flattens.
   The parent declares `label`/`qty`/`groupName`; the flattened child carries none of them. */
const groupedOptions = [
  {
    groupName: "Group A",
    label: "Group A",
    qty: 1,
    children: [{ value: "c1", title: "Child" }],
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
