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
      <JefButton v-if="closable"
                 :icon="Icons.CROSS"
                 :icon-only="true"
                 @click="onClickCloseButton" />
    </template>
  </FlexContainer>
</template>

<script>
import {defineComponent} from 'vue';
import FlexContainer from '@/components/base/FlexContainer';
import JefButton from '@/components/base/Button';

export default defineComponent({
  name: 'JefTitle',
  components: {
    JefButton,
    FlexContainer
  },
  extends: FlexContainer,
  props: {
    title: {
      type: String,
      default: ''
    },
    titleFlex: {
      type: Number,
      default: 1
    },
    closable: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'close'
  ],
  computed: {
    showTitle() {
      return !!this.title;
    },
    showTools() {
      return this.closable || !!this.$slots.tools;
    }
  },
  methods: {
    onClickCloseButton() {
      this.$emit('close', this);
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
