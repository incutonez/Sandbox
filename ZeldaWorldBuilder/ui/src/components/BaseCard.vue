<template>
  <section
    class="base-card"
    :class="layout"
  >
    <div class="base-card-title-wrapper">
      <slot
        v-if="!!title"
        name="title"
      >
        <BaseLabel
          :value="title"
          separator=""
          class="base-card-title"
        />
      </slot>
      <BaseIcon
        :icon="Icon.PickerDown"
        class="cursor-pointer"
        @click="onClickCollapse"
      />
    </div>
    <div
      v-show="isExpanded"
      class="base-card-body"
    >
      <slot />
    </div>
  </section>
</template>

<script>
import { BaseLabel, BaseIcon } from "@incutonez/core-ui";
import { ref } from "vue";

export default {
  name: "BaseCard",
  components: {
    BaseLabel,
    BaseIcon,
  },
  props: {
    title: {
      type: String,
      default: "",
    },
    layout: {
      type: String,
      default: "horizontal",
    },
    collapsible: {
      type: Boolean,
      default: false,
    },
  },
  setup() {
    const isExpanded = ref(true);
    function onClickCollapse() {
      isExpanded.value = !isExpanded.value;
    }

    return {
      onClickCollapse,
      isExpanded,
    };
  },
};
</script>

<style lang="scss" scoped>
.base-card {
  @apply flex flex-col border ;
}

.base-card-body {
  @apply flex border-t border-gray-300 p-2;
}

.horizontal > .base-card-body {
  @apply space-x-2;
}

.vertical > .base-card-body {
  @apply flex-col space-y-2;
}

.base-card-title {
  @apply text-gray-900 flex-1 leading-6;
}

.base-card-title-wrapper {
  @apply flex bg-gray-100 p-2;
}
</style>
