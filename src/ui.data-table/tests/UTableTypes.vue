<!-- Type-level fixture: checked by `npm run ts:check`, never mounted.
     Proves slot props infer from the `rows` prop at a real call site. -->
<template>
  <UTable :columns="columns" :rows="rows">
    <!-- A flattened nested child may lack the parent's members, so they are optional;
         the flattening metadata (`id`, `nestedLevel`) is always set and stays guaranteed. -->
    <template #cell-name="{ row, value, index, cellIndex }">
      {{ expectOptionalString(row.name) }}
      {{ expectOptionalNumber(row.qty) }}
      {{ expectNumber(row.id) }}
      {{ expectNumber(row.nestedLevel) }}
      {{ expectNumber(index) }}
      {{ expectNumber(cellIndex) }}
      {{ value }}
    </template>

    <template #expand="{ row, expanded, index }">
      {{ expectOptionalString(row.name) }}
      {{ expectNumber(row.nestedLevel) }}
      {{ expectBoolean(expanded) }}
      {{ expectNumber(index) }}
    </template>

    <template #nested-row="{ row, nestedLevel }">
      {{ expectOptionalString(row.name) }}
      {{ expectNumber(row.nestedLevel) }}
      {{ expectNumber(nestedLevel) }}
    </template>

    <template #header-actions="{ selectedRows }">
      {{ expectNumber(selectedRows.length) }}
    </template>

    <template #header-name="{ column, index }">
      {{ expectString(column.key) }}
      {{ expectNumber(index) }}
    </template>

    <template #header-counter="{ total }">{{ expectNumber(total) }}</template>
    <template #footer="{ colsCount }">{{ expectNumber(colsCount) }}</template>

    <template #cell-qty="{ row }">
      <!-- @vue-expect-error `nonExistent` is not a key of the inferred row. -->
      {{ row.nonExistent }}
    </template>

    <!-- @vue-expect-error `typo` is not one of the literal column keys. -->
    <template #cell-typo>{{ "" }}</template>

    <!-- @vue-expect-error `typo` is not one of the literal column keys. -->
    <template #header-typo>{{ "" }}</template>
  </UTable>

  <!-- Literal object columns narrow the slot keys the same way as literal strings. -->
  <UTable :columns="objectColumns" :rows="rows">
    <template #cell-name="{ row }">{{ expectOptionalString(row.name) }}</template>
    <template #header-qty="{ column }">{{ expectString(column.key) }}</template>

    <!-- @vue-expect-error `typo` is not one of the literal column keys. -->
    <template #cell-typo>{{ "" }}</template>
  </UTable>

  <!-- Rows from a non-literal source still expose the declared row shape. -->
  <UTable :columns="columns" :rows="typedRows">
    <template #cell-name="{ row }">{{ expectOptionalString(row.name) }}</template>
  </UTable>

  <!-- Graceful degradation: columns from a `ref<Column[]>` cannot be narrowed, so EVERY
       `cell-*` / `header-*` slot must still compile. A false error here would break
       existing users, so it matters more than catching a typo. -->
  <UTable :columns="dynamicColumns" :rows="rows">
    <template #cell-name="{ row, index }">
      {{ expectOptionalString(row.name) }}{{ expectNumber(index) }}
    </template>
    <template #cell-anything-at-all="{ row }">{{ expectOptionalNumber(row.qty) }}</template>
    <template #header-name="{ column }">{{ expectString(column.key) }}</template>
    <template #header-whatever="{ index }">{{ expectNumber(index) }}</template>
  </UTable>

  <!-- Same degradation for a plain `string[]` with no literal types. -->
  <UTable :columns="looseColumns" :rows="rows">
    <template #cell-name="{ row }">{{ expectOptionalString(row.name) }}</template>
    <template #cell-unknown-key="{ row }">{{ expectOptionalNumber(row.qty) }}</template>
  </UTable>

  <!-- A `const` array without `as const` widens to `string[]`, so it degrades too. Narrowing
       is opt-in via `as const`; it must never cost a false error on the plain form. -->
  <UTable :columns="widenedColumns" :rows="rows">
    <template #cell-name="{ row }">{{ expectOptionalString(row.name) }}</template>
    <template #cell-not-a-column="{ row }">{{ expectOptionalNumber(row.qty) }}</template>
  </UTable>

  <!-- Regression guard: an EMPTY `columns` array infers `TCol` as `never`. That is "not statically
       known", not "no keys allowed" — every `cell-*` / `header-*` slot must still compile.
       "columns load async, start empty" is the common real-world pattern; this shipped broken once. -->
  <UTable :columns="emptyRefColumns" :rows="rows">
    <template #cell-name="{ row }">{{ expectOptionalString(row.name) }}</template>
    <template #header-name="{ column }">{{ expectString(column.key) }}</template>
  </UTable>

  <UTable :columns="emptyInferredRefColumns" :rows="rows">
    <template #cell-name="{ row }">{{ expectOptionalString(row.name) }}</template>
    <template #header-name="{ column }">{{ expectString(column.key) }}</template>
  </UTable>

  <UTable :columns="emptyComputedColumns" :rows="rows">
    <template #cell-name="{ row }">{{ expectOptionalString(row.name) }}</template>
    <template #header-name="{ column }">{{ expectString(column.key) }}</template>
  </UTable>

  <UTable :columns="emptyConstColumns" :rows="rows">
    <template #cell-name="{ row }">{{ expectOptionalString(row.name) }}</template>
    <template #header-name="{ column }">{{ expectString(column.key) }}</template>
  </UTable>

  <!-- Regression guard: a row slot must never promise the caller's members as present.
       `getFlatRows` recurses into `row.row`, and a nested child is typed `TableRow`, not `TRow` —
       `#nested-row` in particular fires ONLY for such children. -->
  <UTable :columns="columns" :rows="nestedRows">
    <template #nested-row="{ row }">
      <!-- @vue-expect-error a flattened nested child need not carry `name`. -->
      {{ expectString(row.name) }}
    </template>
    <template #expand="{ row }">
      <!-- @vue-expect-error a flattened nested child need not carry `qty`. -->
      {{ expectNumber(row.qty) }}
    </template>
    <template #cell-name="{ row }">
      <!-- @vue-expect-error a flattened nested child need not carry `name`. -->
      {{ expectString(row.name) }}
    </template>
    <template #header-actions="{ selectedRows }">
      <!-- @vue-expect-error select-all flattens nested children into the selection. -->
      {{ expectString(selectedRows[0].name) }}
    </template>
  </UTable>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

import UTable from "../UTable.vue";

import type { Column } from "../types";

interface UserRow {
  id: number;
  name: string;
  qty: number;
}

const columns = ["name", "qty"] as const;
const objectColumns = [{ key: "name" }, { key: "qty" }] as const;

/* Non-literal column sources — slot keys must degrade to `cell-${string}`. */
const dynamicColumns = ref<Column[]>([]);
const looseColumns: string[] = ["name", "qty"];
const widenedColumns = ["name", "qty"];

/* Empty column sources — `TCol` infers as `never` and must degrade, not collapse.
   The inline `:columns="[]"` form lives in `UTableEmptyColumnsTypes.vue`: alongside other
   `#cell-*` call sites here, Vue reuses a widened instantiation and the guard goes vacuous. */
const emptyRefColumns = ref<Column[]>([]);
const emptyInferredRefColumns = ref([]);
const emptyComputedColumns = computed(() => []);
const emptyConstColumns = [] as const;

const rows = [{ id: 1, name: "a", qty: 2 }];
const typedRows = ref<UserRow[]>([]);

/* A parent whose child lacks the parent's members — exactly what `getFlatRows` emits. */
const nestedRows = [{ id: 1, name: "parent", qty: 2, row: [{ id: 2, label: "child" }] }];

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
