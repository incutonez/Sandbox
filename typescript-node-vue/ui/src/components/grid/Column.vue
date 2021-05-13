<template>
  <th :class="`mdc-data-table__header-cell ${clsFm}`"
      role="columnheader"
      scope="col">
    {{ text }}
  </th>
</template>

<script lang="ts">
import Column from '@/components/grid/Column';

export default Column;
</script>

<style scoped
       lang="scss">
@import "Column";
</style>
