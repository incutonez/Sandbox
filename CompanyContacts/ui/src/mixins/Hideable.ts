import { defineComponent } from "vue";

export default defineComponent({
  props: {
    hidden: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    hiddenStyle(): string {
      return this.hidden ? "display: none;" : "";
    },
  },
});
