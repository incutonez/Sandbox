<template>
  <component :is="cmp"
             :class="cls"
             :style="style">
    <slot />
  </component>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {FlexAlignments, FlexDirections, TextAlignments} from '@/statics/Flex';
import utilities from '@/utilities';

/**
 * This acts as an individual item within a FlexContainer.  It doesn't make sense to use it outside of that... it might
 * be best if this was mixed into each component by default, so we could specify layouts and such that way.  This class
 * is essentially the base component... similar to Ext.Component.
 */
export default defineComponent({
  name: 'FlexItem',
  props: {
    cmp: {
      type: String,
      default: 'div'
    },
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
    /**
     *  If direction is ROW, then your basis is width
     *  If direction is COLUMN, then your basis is height
     */
    basis: {
      type: [String, Number],
      default: 0
    },
    align: {
      type: String as PropType<FlexAlignments>,
      default: FlexAlignments.AUTO
    },
    pack: {
      type: String as PropType<TextAlignments>,
      default: TextAlignments.LEFT
    },
    /**
     * The string version of this can look like "t r b l" or "t b" to mean only top and bottom get the border
     */
    border: {
      type: [Boolean, String],
      default: false
    },
    extraStyle: {
      type: String,
      default: ''
    },
    direction: {
      type: String as PropType<FlexDirections>,
      default: FlexDirections.ROW
    },
    width: {
      type: [Number, String],
      default: 0
    },
    height: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    cls(): string {
      const cls = ['flex-item'];
      const border = this.border;
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
      const extraStyle = this.extraStyle ? `${this.extraStyle}; ` : '';
      let grow = this.grow;
      let shrink = this.shrink;
      let basis = this.basis;
      let oppositeAxis = '';
      const width = this.width;
      const height = this.height;
      const isRowLayout = [FlexDirections.ROW, FlexDirections.ROW_REVERSE].indexOf(this.direction) !== -1;
      /**
       * This bit of code is tricky... if our parent is a row layout, and we have a width specified, then
       * what we really want to do is change the basis... as the basis in a row layout refers to the width.
       *
       * Otherwise, if we're in a column layout, and we've specified the width, then we actually want to
       * set the width.
       */
      if (isRowLayout) {
        if (width) {
          grow = 0;
          shrink = 0;
          basis = utilities.convertToPx(width);
        }
        if (height) {
          oppositeAxis = `height: ${utilities.convertToPx(height)}`;
          basis = basis || 'auto';
        }
      }
      else {
        if (height) {
          grow = 0;
          shrink = 0;
          basis = utilities.convertToPx(height);
        }
        if (width) {
          oppositeAxis = `width: ${utilities.convertToPx(width)}`;
          basis = basis || 'auto';
        }
      }
      return `${oppositeAxis}${extraStyle}flex: ${grow} ${shrink} ${basis}; order: ${this.order}; align-self: ${this.align}; text-align: ${this.pack};`;
    }
  }
});
</script>
