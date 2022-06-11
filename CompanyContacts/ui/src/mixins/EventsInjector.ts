import { defineComponent } from "vue";
import { TinyEmitter } from "tiny-emitter";

export interface IEventsInjector {
  eventBus?: TinyEmitter;
}

export default defineComponent({
  inject: {
    eventBus: {
      default: null,
    },
  },
  data(): IEventsInjector {
    return {};
  },
});
