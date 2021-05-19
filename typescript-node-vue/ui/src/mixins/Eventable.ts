/**
 * Per the docs, the below GConstructor is what we should be using, but I get a compile error
 * from eslint, so I disable the rule.  I started a thread https://stackoverflow.com/questions/67593721
 * on the Alternative Pattern, but I have yet to get a response.
 * To circumvent this from throwing an eslint error, I turned the rule off for {} in estlintrc.js
 */
type GConstructor<T = {}> = new (...args: any[]) => T;

export default function <T extends GConstructor>(base: T) {
  return class extends base {
    events = new EventTarget();

    emit(event: string): void {
      this.events.dispatchEvent(new Event(event));
    }

    on(event: string, handler: () => void): void {
      this.events.addEventListener(event, handler);
    }

    off(event: string, handler: () => void): void {
      this.events.removeEventListener(event, handler);
    }
  };
}
