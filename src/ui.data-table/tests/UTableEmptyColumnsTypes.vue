<!-- Type-level fixture: checked by `npm run ts:check`, never mounted.
     Regression guard for an inline empty `columns` array, which infers `TCol` as `never`.
     `never` means "not statically known", not "no keys allowed", so every `cell-*` / `header-*`
     slot must still compile. This shipped broken once and rejected every slot.

     It needs its own file: next to other `#cell-*` call sites (as in `UTableTypes.vue`) Vue
     reuses a widened instantiation, and the guard stops proving anything. -->
<template>
  <UTable :columns="[]" :rows="rows">
    <template #cell-name="{ row }">{{ expectOptionalString(row.name) }}</template>
    <template #header-name="{ column }">{{ expectString(column.key) }}</template>
  </UTable>
</template>

<script setup lang="ts">
import UTable from "../UTable.vue";

const rows = [{ id: 1, name: "a", qty: 2 }];

function expectString(value: string) {
  return value;
}

function expectOptionalString(value: string | undefined) {
  return value;
}
</script>
