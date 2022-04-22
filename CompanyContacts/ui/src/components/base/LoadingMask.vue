<template>
  <FlexContainer
    v-bind="$props"
    class="loading-mask"
    :align="FlexAlignments.CENTER"
    :pack="FlexJustifications.CENTER"
    :background-color="false"
    :direction="FlexDirections.COLUMN"
  >
    <FlexContainer
      :align="FlexAlignments.AUTO"
      basis="auto"
      :background-color="false"
    >
      <Icon
        v-for="index in iconCount"
        :key="index"
        :icon-name="icon"
        class="loading-mask-icon"
      />
    </FlexContainer>
    <div
      v-if="message"
      class="loading-mask-message"
    >
      {{ message }}
    </div>
  </FlexContainer>
</template>

<script>
import Icon from "ui/components/Icon.vue";
import { defineComponent } from "vue";
import Icons from "ui/statics/Icons";
import FlexContainer from "ui/components/base/FlexContainer.vue";

export default defineComponent({
  name: "LoadingMask",
  components: {
    FlexContainer,
    Icon,
  },
  extends: FlexContainer,
  props: {
    message: {
      type: String,
      default: "Loading...",
    },
    icon: {
      type: String,
      default: Icons.SQUARE,
    },
    iconCount: {
      type: Number,
      default: 6,
    },
  },
});
</script>

<style scoped
       lang="scss">
.loading-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba($app-loading-mask-background-color, 0.6);

  .loading-mask-message {
    font-size: 14px;
  }

  @keyframes loading-mask-icon {
    0% {
      opacity: 1;
    }
    20% {
      opacity: 0.8;
    }
    40% {
      opacity: 0.6;
    }
    60% {
      opacity: 0.4;
    }
    80% {
      opacity: 0.2;
    }
    100% {
      opacity: 0.1;
    }
  }

  .loading-mask-icon:nth-child(1) {
    animation-delay: -0.6s;
  }

  .loading-mask-icon:nth-child(2) {
    animation-delay: -0.5s;
  }

  .loading-mask-icon:nth-child(3) {
    animation-delay: -0.4s;
  }

  .loading-mask-icon:nth-child(4) {
    animation-delay: -0.3s;
  }

  .loading-mask-icon:nth-child(5) {
    animation-delay: -0.2s;
  }

  .loading-mask-icon:nth-child(6) {
    animation-delay: -0.1s;
  }

  .loading-mask-icon {
    color: $panel-title-background-color;
    margin-right: 2px;
    font-size: 16px;
    animation: loading-mask-icon 0.7s linear infinite;
  }
}
</style>
