<template>
  <div :class="cls"
       :style="style">
    <slot :parent-align="align" />
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {FlexAlignments, FlexContentAlignments, FlexDirections, FlexJustifications, FlexWraps} from '@/statics/Flex';

/**
 * This component acts as both a container and layout for nested items.  It essentially wraps the CSS Flexbox properties
 * into reusable components that can nest other complex layouts... it might be best if this was mixed into each
 * component by default, so we could specify layouts and such that way.
 */
export default defineComponent({
  name: 'FlexContainer',
  props: {
    height: {
      type: [String, Number],
      default: 'auto'
    },
    width: {
      type: [String, Number],
      default: 'auto'
    },
    direction: {
      type: String as PropType<FlexDirections>,
      default: FlexDirections.ROW
    },
    wrap: {
      type: String as PropType<FlexWraps>,
      default: FlexWraps.NO_WRAP
    },
    /**
     *
     */
    // This is for the main axis... if horizontal, then items will be packed on the horizontal axis, and vice versa
    pack: {
      type: String as PropType<FlexJustifications>,
      default: FlexJustifications.NORMAL
    },
    align: {
      type: String as PropType<FlexAlignments>,
      default: FlexAlignments.STRETCH
    },
    contentAlign: {
      type: String as PropType<FlexContentAlignments>,
      default: FlexContentAlignments.NORMAL
    },
    grow: {
      type: Number,
      default: 0
    },
    shrink: {
      type: Number,
      default: 1
    },
    basis: {
      type: String,
      default: '0'
    }
  },
  computed: {
    cls(): string {
      const cls = ['flex-container'];
      if (this.direction === FlexDirections.FIT) {
        cls.push('flex-container-fit');
      }
      if (this.align === FlexAlignments.STRETCH) {
        cls.push('flex-container-stretch-children');
      }
      return cls.join(' ');
    },
    style(): string {
      const flexGrow = this.grow ? `flex: ${this.grow} ${this.shrink} ${this.basis}` : '';
      let direction = this.direction;
      direction = direction === FlexDirections.FIT ? FlexDirections.ROW : direction;
      return `${flexGrow}; display: flex; flex-flow: ${direction} ${this.wrap}; justify-content: ${this.pack}; align-items: ${this.align}; align-content: ${this.contentAlign}; height: ${this.height}; width: ${this.width};`;
    }
  }
});
</script>

<style lang="scss">
.flex-container-fit {
  display: flex;
  align-items: stretch;

  > * {
    flex: 1;
  }
}

.flex-container-stretch-children > .flex-item {
  display: flex;
  align-items: stretch;

  > * {
    flex: 1;
  }
}
</style>
