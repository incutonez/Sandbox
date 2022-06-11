import { Component, defineComponent } from "vue";

export interface IRegisterInjector {
  register?(child: Component): void;

  unregister?(child: Component): void;
}

/**
 * This class is used when you need to inject registering a component on its parent.  The parent must be
 * using RegisterProvider as a mixin.
 */
export default defineComponent({
  inject: {
    register: {
      default: null,
    },
    unregister: {
      default: null,
    },
  },
  data(): IRegisterInjector {
    return {};
  },
  mounted() {
    if (this.register) {
      this.register(this);
    }
  },
  unmounted() {
    if (this.unregister) {
      this.unregister(this);
    }
  },
});
