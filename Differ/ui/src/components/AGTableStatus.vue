<template>
  <div
    class="h-5 w-5 rounded-full"
    :class="cls"
    :title="text"
  />
</template>

<script setup lang="ts">
import { ChangeStatus } from "shared-differ";
import { computed } from "vue";

interface IPropsAGTableStatus {
  params: {
    status: ChangeStatus
  };
}

const props = defineProps<IPropsAGTableStatus>();

const cls = computed(() => {
  let value = "";
  switch (props.params.status) {
    case ChangeStatus.Created:
      value = "bg-blue-400";
      break;
    case ChangeStatus.Updated:
      value = "bg-orange-400";
      break;
    case ChangeStatus.Deleted:
      value = "bg-red-400";
      break;
    case ChangeStatus.Unchanged:
    default:
      value = "bg-gray-400";
      break;
  }
  return value;
});

const text = computed(() => {
  let value = "";
  switch (props.params.status) {
    case ChangeStatus.Created:
      value = "Created";
      break;
    case ChangeStatus.Updated:
      value = "Updated";
      break;
    case ChangeStatus.Deleted:
      value = "Deleted";
      break;
    case ChangeStatus.Unchanged:
    default:
      value = "Unchanged";
      break;
  }
  return value;
});
</script>
