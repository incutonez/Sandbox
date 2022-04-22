import { Component, defineComponent } from "vue";
import utilities from "ui/utilities";

/**
 * This class is used when you need to provide registering child components on this component.  The child
 * must be using RegisterInjector as a mixin.
 */
export default defineComponent({
  provide() {
    return {
      register: (field: Component) => {
        this.children.push(field);
      },
      unregister: (field: Component) => {
        utilities.remove(this.children, field);
      },
    };
  },
  data() {
    return {
      children: [] as Component[],
    };
  },
});
