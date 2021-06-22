<template>
  <FlexContainer v-bind="$props"
                 class="jef-title"
                 :align="FlexAlignments.CENTER"
                 v-if="showTitle || showTools"
                 :background-color="false">
    <template v-if="showTitle">
      <span class="jef-title-text">
        {{ title }}
      </span>
    </template>
    <template v-if="titleFlex">
      <JefSpacer :grow="titleFlex" />
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

<script lang="ts">
import {defineComponent} from 'vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import JefButton from '@/components/base/Button.vue';
import Hideable from '@/mixins/Hideable';
import JefSpacer from '@/components/base/Spacer.vue';

export default defineComponent({
  name: 'JefTitle',
  components: {
    JefSpacer,
    JefButton,
    FlexContainer
  },
  mixins: [
    Hideable
  ],
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
    showTitle(): boolean {
      return !!this.title;
    },
    showTools(): boolean {
      return this.closable || !!this.$slots.tools;
    }
  },
  methods: {
    onClickCloseButton(event: KeyboardEvent) {
      this.$emit('close', this, event);
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
