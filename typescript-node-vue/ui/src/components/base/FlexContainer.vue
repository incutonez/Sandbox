<template>
  <component :is="cmp"
             :class="cls"
             :style="style">
    <slot :parent-align="align" />
  </component>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {FlexAlignments, FlexContentAlignments, FlexDirections, FlexJustifications, FlexWraps} from '@/statics/Flex';
import utilities from '@/utilities';

/**
 * This component acts as both a container and layout for nested items.  It essentially wraps the CSS Flexbox properties
 * into reusable components that can nest other complex layouts... it might be best if this was mixed into each
 * component by default, so we could specify layouts and such that way.
 */
export default defineComponent({
  name: 'FlexContainer',
  props: {
    cmp: {
      type: String,
      default: 'div'
    },
    /**
     * The string version of this can look like "t r b l" or "t b" to mean only top and bottom get the border
     */
    border: {
      type: [Boolean, String],
      default: true
    },
    height: {
      type: [String, Number],
      default: 'auto'
    },
    width: {
      type: [String, Number],
      default: 0
    },
    /**
     * @property
     * Default value is row
     */
    direction: {
      type: String as PropType<FlexDirections>,
      default: FlexDirections.ROW
    },
    wrap: {
      type: String as PropType<FlexWraps>,
      default: FlexWraps.NO_WRAP
    },
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
      default: 0
    },
    basis: {
      type: [String, Number],
      default: 0
    },
    extraCls: {
      type: String,
      default: ''
    },
    extraStyle: {
      type: String,
      default: ''
    },
    margin: {
      type: [Number, String],
      default: 0
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    }
  },
  computed: {
    cls(): string {
      const cls = ['flex-container'];
      const border = this.border;
      if (this.direction === FlexDirections.FIT) {
        cls.push('flex-container-fit');
      }
      if (this.align === FlexAlignments.STRETCH) {
        cls.push('flex-container-stretch-children');
      }
      if (this.extraCls) {
        cls.push(this.extraCls);
      }
      if (border) {
        if (border === true) {
          cls.push('panel-border');
        }
        else if (utilities.isString(border)) {
          border.split('').forEach((split) => {
            switch (split) {
              case 't':
                cls.push('panel-border-top');
                break;
              case 'r':
                cls.push('panel-border-right');
                break;
              case 'b':
                cls.push('panel-border-bottom');
                break;
              case 'l':
                cls.push('panel-border-left');
                break;
            }
          });
        }
      }
      return cls.join(' ');
    },
    style(): string {
      let grow = this.grow;
      let shrink = this.shrink;
      let basis = this.basis;
      const width = this.width;
      if (width) {
        grow = 0;
        shrink = 0;
        basis = utilities.convertToPx(width);
      }
      const extraStyle = this.extraStyle ? `${this.extraStyle}; ` : '';
      let direction = this.direction;
      let margin = '';
      let bgColor = '';
      if (this.margin) {
        margin = `margin: ${this.margin};`;
      }
      if (this.backgroundColor) {
        bgColor = `background-color: ${this.backgroundColor};`;
      }
      direction = direction === FlexDirections.FIT ? FlexDirections.ROW : direction;
      return `${bgColor}${margin}${extraStyle}flex: ${grow} ${shrink} ${basis}; display: flex; flex-flow: ${direction} ${this.wrap}; justify-content: ${this.pack}; align-items: ${this.align}; align-content: ${this.contentAlign}; height: ${this.height};`;
    }
  }
});
</script>

<style lang="scss">
.flex-container {
  min-width: 0;
}

.flex-container-fit {
  display: flex;
  align-items: stretch;

  > * {
    flex: 1;
  }
}

.flex-container-stretch-children > div.flex-item {
  display: flex;
  align-items: stretch;
}
</style>
