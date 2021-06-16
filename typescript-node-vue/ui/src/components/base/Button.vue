<template>
  <button :type="type"
          :disabled="isDisabled"
          :class="cls"
          :style="style"
          @click="onClickButton">
    {{ text }}
  </button>
</template>

<script>
import {defineComponent} from 'vue';
import utilities from '@/utilities';

export default defineComponent({
  name: 'JefButton',
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'button'
    },
    margin: {
      type: [Number, String],
      default: ''
    },
    hidden: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'click'
  ],
  computed: {
    style() {
      if (this.hidden) {
        return 'display: none;';
      }
      let margin = this.margin;
      if (margin) {
        margin = `margin: ${utilities.convertToPx(margin)};`;
      }
      return `${margin}`;
    },
    cls() {
      return 'jef-button';
    },
    isDisabled() {
      return this.disabled || null;
    }
  },
  methods: {
    onClickButton(event) {
      this.$emit('click', this, event);
    }
  }
});
</script>

<style scoped
       lang="scss">
.jef-button {
  border: $button-border;
  font-size: $button-font-size;
  height: $button-height;
  padding: $button-padding;
  background-color: $button-background-color;
  border-radius: $button-border-radius;

  &:hover {
    background-color: $button-background-color-hover;
  }

  &:focus {
    border-color: Highlight;
  }

  &:focus-visible {
    outline: none;
  }

  &:active {
    background-color: $button-background-color-pressed;
  }
}
</style>
