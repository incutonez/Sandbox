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
      default: 0
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
    /**
     * If direction = horizontal, then items will be packed horizontally.
     * If direction = vertical, then items will be packed vertically.
     */
    pack: {
      type: String as PropType<FlexJustifications>,
      default: FlexJustifications.NORMAL
    },
    /**
     * If direction = horizontal, then items will be aligned vertically.
     * If direction = vertical, then items will be aligned horizontally.
     */
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
      default: null
    },
    backgroundColor: {
      type: [String, Boolean],
      default: '#FFFFFF'
    },
    alignSelf: {
      type: String as PropType<FlexAlignments>,
      default: FlexAlignments.AUTO
    },
    padding: {
      type: [Number, String],
      default: 0
    },
    hidden: {
      type: Boolean,
      default: false
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
      if (this.hidden) {
        return 'display: none;';
      }
      let direction = this.direction;
      let grow = this.grow;
      let shrink = this.shrink;
      let basis = this.basis;
      let opposite = '';
      const width = this.width;
      const height = this.height;
      direction = direction === FlexDirections.FIT ? FlexDirections.ROW : direction;
      // Horizontal layout
      // TODO: Rework so it's not so confusing?
      if ([FlexDirections.ROW, FlexDirections.ROW_REVERSE].indexOf(direction) === -1) {
        if (width) {
          grow = 0;
          shrink = 0;
          basis = utilities.convertToPx(width);
        }
        if (height) {
          opposite = `height: ${utilities.convertToPx(height)};`;
          basis = basis || 'auto';
        }
      }
      // Vertical layout
      else {
        if (height) {
          grow = 0;
          shrink = 0;
          basis = utilities.convertToPx(height);
        }
        if (width) {
          opposite = `width: ${utilities.convertToPx(width)};`;
          basis = basis || 'auto';
        }
      }
      const extraStyle = this.extraStyle ? `${this.extraStyle}; ` : '';
      let margin = '';
      let bgColor = '';
      let padding = '';
      if (this.margin !== null) {
        margin = `margin: ${utilities.convertToPx(this.margin)};`;
      }
      if (this.padding) {
        padding = `padding: ${utilities.convertToPx(this.padding)};`;
      }
      if (this.backgroundColor) {
        bgColor = `background-color: ${this.backgroundColor};`;
      }
      return `${padding}${opposite}${bgColor}${margin}${extraStyle}flex: ${grow} ${shrink} ${basis}; display: flex; flex-flow: ${direction} ${this.wrap}; justify-content: ${this.pack}; align-items: ${this.align}; align-self: ${this.alignSelf}; align-content: ${this.contentAlign};`;
    }
  }
});
</script>

<style lang="scss">
.flex-container {
  min-width: 0;
  position: relative;
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
