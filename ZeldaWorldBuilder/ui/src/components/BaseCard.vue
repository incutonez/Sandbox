<template>
  <section
    ref="rootEl"
    class="base-card"
  >
    <div
      ref="titleRoot"
      class="base-card-title-wrapper"
    >
      <slot
        v-if="hasTitle"
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
        class="picker-icon"
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
import {
  ref,
  computed,
  watch,
  onMounted,
} from "vue";

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
    collapsible: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const rootEl = ref(null);
    const titleRoot = ref(null);
    const isExpanded = ref(props.expanded);
    const hasTitle = computed(() => !!props.title || !!slots.title);
    function onClickCollapse() {
      isExpanded.value = !isExpanded.value;
    }
    function updateExpanded(value) {
      if (value) {
        rootEl.value.classList.add("expanded");
      }
      else {
        rootEl.value.classList.remove("expanded");
      }
    }
    onMounted(() => updateExpanded(isExpanded.value));
    watch(isExpanded, (value) => updateExpanded(value));

    return {
      onClickCollapse,
      isExpanded,
      hasTitle,
      rootEl,
      titleRoot,
    };
  },
};
</script>

<style lang="scss" scoped>
.base-card {
  @apply flex flex-col border;
}

.picker-icon {
  @apply cursor-pointer;
}

.expanded > .base-card-title-wrapper > .picker-icon  {
  @apply rotate-180;
}

.bp-2 > .base-card-body {
  @apply p-2;
}

.base-card-body {
  @apply flex border-t border-gray-300;
}

.horizontal > .base-card-body {
  @apply space-x-2;
}

.vertical > .base-card-body {
  @apply flex-col space-y-2;
}

.base-card-title-wrapper {
  @apply flex bg-gray-100 p-2;
}

.base-card-title {
  @apply flex-1;
}
</style>
