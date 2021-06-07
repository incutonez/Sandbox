<template>
  <FlexContainer v-bind="$props">
    <template v-if="showTitle">
      <FlexItem extra-cls="jef-title">
        {{ title }}
      </FlexItem>
    </template>
    <template v-if="showTools">
      <slot name="tools" />
    </template>
  </FlexContainer>
</template>

<script>
import {defineComponent} from 'vue';
import FlexItem from '@/components/base/FlexItem';
import FlexContainer from '@/components/base/FlexContainer';

export default defineComponent({
  name: 'JefTitle',
  components: {FlexContainer, FlexItem},
  extends: FlexContainer,
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    showTitle() {
      return !!this.title;
    },
    showTools() {
      return !!this.$slots.tools;
    }
  }
});
</script>
