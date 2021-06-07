<template>
  <div :class="cls"
       :style="style">
    <slot />
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {FlexAlignments, TextAlignments} from '@/statics/Flex';

/**
 * This acts as an individual item within a FlexContainer.  It doesn't make sense to use it outside of that... it might
 * be best if this was mixed into each component by default, so we could specify layouts and such that way.  This class
 * is essentially the base component... similar to Ext.Component.
 */
export default defineComponent({
  name: 'FlexItem',
  props: {
    order: {
      type: Number,
      default: 0
    },
    grow: {
      type: Number,
      default: 1
    },
    shrink: {
      type: Number,
      default: 1
    },
    basis: {
      type: String,
      default: 'auto'
    },
    align: {
      type: String as PropType<FlexAlignments>,
      default: FlexAlignments.AUTO
    },
    pack: {
      type: String as PropType<TextAlignments>,
      default: TextAlignments.LEFT
    },
    extraCls: {
      type: String,
      default: ''
    },
    extraStyle: {
      type: String,
      default: ''
    }
  },
  computed: {
    cls(): string {
      return `${this.extraCls} flex-item`;
    },
    style(): string {
      const extraStyle = this.extraStyle ? `${this.extraStyle}; ` : '';
      return `${extraStyle}flex: ${this.grow} ${this.shrink} ${this.basis}; order: ${this.order}; align-self: ${this.align}; text-align: ${this.pack};`;
    }
  }
});
</script>
