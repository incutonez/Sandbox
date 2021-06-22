<template>
  <button :type="type"
          :disabled="isDisabled"
          :class="cls"
          :style="style"
          @click="onClickButton">
    <Icon class="jef-button-icon"
          :icon-name="icon" />
    {{ text }}
  </button>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import utilities from '@/utilities';
import Icon from '@/components/Icon.vue';
import Hideable from '@/mixins/Hideable';

export default defineComponent({
  name: 'JefButton',
  components: {
    Icon
  },
  mixins: [
    Hideable
  ],
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: null
    },
    type: {
      type: String,
      default: 'button'
    },
    margin: {
      type: [Number, String],
      default: ''
    },
    iconOnly: {
      type: Boolean,
      default: false
    },
    handler: {
      type: Function,
      default: null
    }
  },
  emits: [
    'click'
  ],
  computed: {
    style(): string {
      const hidden = this.hiddenStyle;
      if (hidden) {
        return hidden;
      }
      let margin = this.margin;
      if (margin) {
        margin = `margin: ${utilities.convertToPx(margin)};`;
      }
      return `${margin}`;
    },
    cls() {
      const cls = ['jef-button'];
      if (this.iconOnly) {
        cls.push('jef-button-icon-only');
      }
      return cls.join(' ');
    },
    isDisabled(): boolean {
      return this.disabled;
    }
  },
  methods: {
    onClickButton(event: KeyboardEvent) {
      this.$emit('click', this, event);
    }
  }
});
</script>

<style scoped
       lang="scss">
.jef-button {
  font-size: $button-font-size;
  height: $button-height;
  padding: $button-padding;

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  &:not(.jef-button-icon-only) {
    border: $button-border;
    border-radius: $button-border-radius;
    background-color: $button-background-color;

    &:not(:disabled) {
      &:hover {
        background-color: $button-background-color-hover;
      }

      &:active {
        background-color: $button-background-color-pressed;
      }
    }
  }

  .jef-button-icon {
    color: $color-blue-light;

    // TODO: Better way of doing this?
    @at-root .jef-button {
      &:hover .jef-button-icon {
        color: darken($color-blue-light, 10%);
      }

      &:active .jef-button-icon {
        color: darken($color-blue-light, 20%);
      }
    }
  }

  &.jef-button-icon-only {
    background-color: transparent;
    border: none;

    .jef-title & .jef-button-icon {
      color: $color-blue-lightest;

      &:hover {
        color: darken($color-blue-lightest, 15%);
      }

      &:active {
        color: darken($color-blue-lightest, 35%);
      }
    }
  }

  &:focus {
    border-color: Highlight;
  }

  &:focus-visible {
    outline: none;
  }
}
</style>
