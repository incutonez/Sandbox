import { TinyEmitter } from "tiny-emitter";

export interface ClassEvents {
  events: EventTarget;

  emit(event: string, params?: any): void;

  on(event: string, handler: () => void): void;

  off(event: string, handler: () => void): void;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function EventableMixin(cls: any) {
  const Proto = cls.prototype;
  Proto.eventBus = new TinyEmitter();

  Proto.emit = function(event: string, params: any) {
    this.eventBus.emit(event, params);
  };

  Proto.on = function(event: string, handler: () => void) {
    this.eventBus.on(event, handler);
  };

  Proto.off = function(event: string, handler: () => void): void {
    this.eventBus.off(event, handler);
  };
}
