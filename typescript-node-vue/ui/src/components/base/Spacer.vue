<template>
  <FlexContainer v-bind="$props" />
</template>

<script>
import {defineComponent} from 'vue';
import FlexContainer from './FlexContainer';

export default defineComponent({
  name: 'JefSpacer',
  components: {FlexContainer},
  extends: FlexContainer,
  props: {
    grow: {
      type: Number,
      default: 1
    },
    border: {
      type: [Boolean, String],
      default: false
    }
  }
});
</script>

<style scoped>

</style>
