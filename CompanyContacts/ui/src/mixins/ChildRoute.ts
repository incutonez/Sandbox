import { defineComponent } from "vue";
import utilities from "ui/utilities";

export default defineComponent({
  data() {
    return {
      /* If this is specified, then we'll ignore it as a child route... otherwise, anything not specified
       * will be considered as part of the children */
      baseRoutes: [],
    };
  },

  computed: {
    hasChildRoute(): boolean {
      return this.$route.matched.some(({ name }) => {
        return !utilities.contains(this.baseRoutes, name);
      });
    },
    mainCls(): string {
      return this.hasChildRoute ? "route-enabled" : "";
    },
  },

  methods: {
    determineRouteCls() {
      if (this.hasChildRoute) {
        this.$el.classList.add("route-enabled");
      }
      else {
        this.$el.classList.remove("route-enabled");
      }
    },
  },

  watch: {
    hasChildRoute: {
      handler() {
        this.determineRouteCls();
      },
    },
  },

  mounted() {
    this.determineRouteCls();
  },
});
