<template>
  <component :is="cmp"
             :class="cls"
             :style="style">
    <slot />
  </component>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import {FlexAlignments, TextAlignments} from '@/statics/Flex';
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
    basis: {
      type: String,
      default: '0'
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
    }
  },
  computed: {
    cls(): string {
      const cls = [this.extraCls, 'flex-item'];
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
      return `${extraStyle}flex: ${this.grow} ${this.shrink} ${this.basis}; order: ${this.order}; align-self: ${this.align}; text-align: ${this.pack};`;
    }
  }
});
</script>
