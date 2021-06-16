<template>
  <FlexContainer v-bind="$props"
                 class="jef-title"
                 :align="FlexAlignments.CENTER"
                 :background-color="false">
    <template v-if="showTitle">
      <FlexContainer :background-color="false"
                     :border="false"
                     :grow="titleFlex"
                     :basis="!titleFlex ? 'auto' : 0"
                     cmp="span">
        {{ title }}
      </FlexContainer>
    </template>
    <template v-if="showTools">
      <slot name="tools" />
    </template>
  </FlexContainer>
</template>

<script>
import {defineComponent} from 'vue';
import FlexContainer from '@/components/base/FlexContainer';

export default defineComponent({
  name: 'JefTitle',
  components: {FlexContainer},
  extends: FlexContainer,
  props: {
    title: {
      type: String,
      default: ''
    },
    titleFlex: {
      type: Number,
      default: 1
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

<style scoped
       lang="scss">
.jef-title {
  padding: $panel-title-padding;
  background-color: $panel-title-background-color;
  color: $panel-title-text-color;
}
</style>
