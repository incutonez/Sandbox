<template>
  <FlexContainer v-bind="$props"
                 :border="true"
                 :direction="FlexDirections.COLUMN"
                 cmp="form">
    <JefTitle v-if="title"
              :title="title" />
    <FlexContainer v-if="showDefaultSlot"
                   :padding="bodyPadding"
                   :grow="1"
                   :direction="FlexDirections.COLUMN">
      <slot name="default" />
    </FlexContainer>
    <FlexContainer border="t"
                   :padding="5"
                   :pack="FlexAlignments.END"
                   :hidden="hideBottomToolbar">
      <JefButton text="Reset"
                 :hidden="hideResetBtn"
                 :margin="hideSearchBtn && hideClearBtn ? 0 : '0 5px 0 0'"
                 @click="onClickResetButton" />
      <JefButton text="Clear"
                 :hidden="hideClearBtn"
                 :margin="hideSearchBtn ? 0 : '0 5px 0 0'"
                 @click="onClickClearButton" />
      <JefButton text="Search"
                 :hidden="hideSearchBtn"
                 @click="onClickSearchButton" />
    </FlexContainer>
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {FlexAlignments, FlexDirections} from '@/statics/Flex';
import JefButton from '@/components/base/Button.vue';
import EventsProvider from '@/mixins/EventsProvider';
import RegisterProvider from '@/mixins/RegisterProvider';
import JefTitle from '@/components/base/Title.vue';
import {IField} from '@/interfaces/Components';

export default defineComponent({
  name: 'SearchForm',
  components: {
    JefTitle,
    JefButton,
    FlexContainer
  },
  extends: FlexContainer,
  mixins: [
    EventsProvider,
    RegisterProvider
  ],
  props: {
    bodyPadding: {
      type: [Number, String],
      default: '5px 10px 0'
    },
    title: {
      type: [Boolean, String],
      default: false
    },
    hideSearchBtn: {
      type: Boolean,
      default: true
    },
    hideClearBtn: {
      type: Boolean,
      default: true
    },
    hideResetBtn: {
      type: Boolean,
      default: true
    }
  },
  emits: [
    'search'
  ],
  data() {
    return {
      FlexAlignments: FlexAlignments,
      FlexDirections: FlexDirections
    };
  },
  computed: {
    showDefaultSlot(): boolean {
      return !!this.$slots.default;
    },
    hideBottomToolbar(): boolean {
      return this.hideSearchBtn && this.hideClearBtn && this.hideResetBtn;
    }
  },
  mounted() {
    this.on('press:enter', this.onKeyUpSearchField);
  },
  unmounted() {
    this.off('press:enter', this.onKeyUpSearchField);
  },
  methods: {
    onClickClearButton() {
      const fields = this.children as IField[];
      fields.forEach((field) => {
        field.clear();
      });
    },
    onClickResetButton() {
      const fields = this.children as IField[];
      fields.forEach((field) => {
        field.reset();
      });
    },
    onKeyUpSearchField() {
      this.$emit('search');
    },
    onClickSearchButton() {
      this.$emit('search');
    }
  }
});
</script>

<style scoped>

</style>
