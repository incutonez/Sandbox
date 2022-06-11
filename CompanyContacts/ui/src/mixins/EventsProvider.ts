import { TinyEmitter } from "tiny-emitter";
import { defineComponent } from "vue";

// Just use defineComponent for mixins https://stackoverflow.com/a/67229107/1253609
export default defineComponent({
  methods: {
    on(event: string, handler: () => void) {
      this.eventBus.on(event, handler);
    },
    once(event: string, handler: () => void) {
      this.eventBus.once(event, handler);
    },
    off(event: string, handler: () => void) {
      this.eventBus.off(event, handler);
    },
    emit(event: string, params: any) {
      this.eventBus.emit(event, ...params);
    },
  },
  provide() {
    return {
      eventBus: this.eventBus,
    };
  },
  data() {
    return {
      eventBus: new TinyEmitter(),
    };
  },
});
