<template>
  <FlexContainer :direction="FlexDirections.COLUMN"
                 background-color="#FFFFFF"
                 :class="cls"
                 :style="mainStyle"
                 @keyup.esc="onEscapeKey">
    <JefTitle :title="title"
              :title-flex="titleFlex"
              :closable="closable"
              @close="onClickCloseButton">
      <template #tools
                v-if="showTools">
        <slot name="tools" />
      </template>
    </JefTitle>
    <FlexContainer :grow="1"
                   :align="FlexAlignments.STRETCH"
                   :padding="bodyPadding">
      <slot name="body" />
    </FlexContainer>
    <slot name="toolbar" />
    <LoadingMask :hidden="!viewLoading" />
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import utilities from '@/utilities';
import FlexContainer from '@/components/base/FlexContainer.vue';
import JefTitle from '@/components/base/Title.vue';
import {IEventKeyboard, ITitle} from '@/interfaces/Components';
import LoadingMask from '@/components/base/LoadingMask.vue';
import Draggable from '@/mixins/Draggable';

export default defineComponent({
  name: 'JefWindow',
  components: {
    LoadingMask,
    JefTitle,
    FlexContainer
  },
  mixins: [
    Draggable
  ],
  props: {
    draggable: {
      type: Boolean,
      default: true
    },
    // TODO: Use composition API, so we don't have to dupe this?
    title: {
      type: [String, Boolean],
      default: ''
    },
    titleFlex: {
      type: Number,
      default: 1
    },
    closable: {
      type: Boolean,
      default: true
    },
    bodyPadding: {
      type: [String, Number],
      default: 10
    },
    width: {
      type: [String, Number],
      default: '80%'
    },
    height: {
      type: [String, Number],
      default: '80%'
    },
    viewLoading: {
      type: Boolean,
      default: false
    }
  },
  emits: [
    'close'
  ],
  computed: {
    cls(): string {
      const cls = ['jef-window'];
      if (this.draggable) {
        cls.push('jef-window-draggable');
      }
      return cls.join(' ');
    },
    mainStyle(): string {
      const height = utilities.convertToPx(this.height);
      const width = utilities.convertToPx(this.width);
      const extra = this.center();
      return `${extra}background-color: #FFFFFF; height: ${height}; width: ${width};`;
    },
    showTools(): boolean {
      return this.closable || !!this.$slots.tools;
    }
  },
  methods: {
    center() {
      let result = '';
      const top = `calc((${innerHeight}px - ${utilities.convertToPx(this.height)}) / 2 + ${pageYOffset}px)`;
      const left = `calc((${innerWidth}px - ${utilities.convertToPx(this.width)}) / 2 + ${pageXOffset}px)`;
      const el = this.$el;
      const style = el && el.style;
      if (style) {
        style.top = top;
        style.left = left;
      }
      else {
        /* When we call center from computed the very first time, $el is not set, as the view hasn't
         * been rendered in the DOM, so we opt for returning the actual style instead */
        result = `top: ${top}; left: ${left};`;
      }
      return result;
    },
    onClickCloseButton(title: ITitle, event: IEventKeyboard) {
      this.$emit('close', this, event);
    },
    onEscapeKey(event: IEventKeyboard) {
      if (event.key === 'Escape' || event.key === 'Esc') {
        this.$emit('close', this, event);
      }
    }
  },

  mounted() {
    document.addEventListener('keyup', this.onEscapeKey);
  },

  unmounted() {
    document.removeEventListener('keyup', this.onEscapeKey);
  }
});
</script>

<style scoped
       lang="scss">
.jef-window {
  z-index: 999;
  position: fixed;
  box-shadow: $window-box-shadow;
}
</style>
