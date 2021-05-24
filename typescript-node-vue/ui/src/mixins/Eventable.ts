export interface Eventable {
  events: EventTarget;

  emit(event: string): void;

  on(event: string, handler: () => void): void;

  off(event: string, handler: () => void): void;
}

export function EventableMixin(cls: any) {
  const Proto = cls.prototype;
  Proto.events = new EventTarget();
  Proto.emit = function(event: string) {
    this.events.dispatchEvent(new Event(event));
  };
  Proto.on = function(event: string, handler: () => void) {
    this.events.addEventListener(event, handler);
  };
  Proto.off = function(event: string, handler: () => void): void {
    this.events.removeEventListener(event, handler);
  };
}
