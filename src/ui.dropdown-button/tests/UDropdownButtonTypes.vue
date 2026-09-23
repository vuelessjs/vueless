<!-- Type-level fixture: checked by `npm run ts:check`, never mounted.
     Proves slot props infer from the `options` prop at a real call site. -->
<template>
  <UDropdownButton :options="options">
    <!-- Forwarded through `UDropdown` to `UListbox`, so they inherit its group flattening — a
         flattened member need not carry the parent's members, hence the optional types. -->
    <template #before-option="{ option, index }">
      {{ expectOptionalString(option.label) }}
      {{ expectOptionalNumber(option.qty) }}
      {{ expectNumber(index) }}
    </template>

    <template #option="{ option, index }">
      {{ expectOptionalString(option.label) }}
      {{ expectNumber(index) }}
    </template>

    <template #after-option="{ option, index }">
      {{ expectOptionalString(option.label) }}
      {{ expectNumber(index) }}
    </template>

    <template #empty>empty</template>
  </UDropdownButton>

  <!-- Options from a non-literal source still expose the declared option shape. -->
  <UDropdownButton :options="typedOptions">
    <template #option="{ option }">{{ expectOptionalString(option.label) }}</template>
  </UDropdownButton>

  <UDropdownButton :options="options">
    <template #option="{ option }">
      <!-- @vue-expect-error `nonExistent` is not a key of the inferred option. -->
      {{ option.nonExistent }}
    </template>
  </UDropdownButton>

  <!-- `label` is `UDropdown`'s `displayLabel`, a join of `option[labelKey]` lookups. -->
  <UDropdownButton :options="options">
    <template #default="{ label }">
      <!-- @vue-expect-error the label is `undefined` when it cannot be resolved. -->
      {{ expectString(label) }}
    </template>
  </UDropdownButton>

  <!-- Regression guard: an option slot must never promise the caller's members as present. -->
  <UDropdownButton
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
  </UDropdownButton>
</template>

<script setup lang="ts">
import { ref } from "vue";

import UDropdownButton from "../UDropdownButton.vue";

interface UserOption {
  label: string;
  value: string;
  qty: number;
}

const options = [{ label: "a", value: "a", qty: 1 }];
const typedOptions = ref<UserOption[]>([]);

/* A group whose members lack the parent's members — exactly what `filterGroups` flattens. */
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

function expectOptionalString(value: string | undefined) {
  return value;
}

function expectOptionalNumber(value: number | undefined) {
  return value;
}
</script>
