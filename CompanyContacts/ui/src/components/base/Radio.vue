<template>
  <JefCheckbox v-bind="$props" />
</template>

<script>
import { defineComponent } from "vue";
import JefCheckbox from "./Checkbox.vue";

export default defineComponent({
  name: "JefRadio",
  components: {
    JefCheckbox,
  },
  extends: JefCheckbox,
  props: {
    fieldCls: {
      type: String,
      default: "field-radio",
    },
    type: {
      type: String,
      default: "radio",
    },
  },
});
</script>

<style lang="scss">
.field-checkbox.field-radio {
  border-radius: $radio-border-radius;
}

.field-input-checkbox:checked ~ .field-checkbox.field-radio::before {
  content: "";
  width: $radio-icon-size;
  height: $radio-icon-size;
  background-color: $checkbox-color-checked;
  border-color: $checkbox-color-checked;
  border-radius: $radio-border-radius-icon;
  left: $radio-icon-left;
  top: $radio-icon-left;
}
</style>
