/**
 * Per the docs, the below GConstructor is what we should be using, but I get a compile error
 * from eslint, so I disable the rule.  I started a thread https://stackoverflow.com/questions/67593721
 * on the Alternative Pattern, but I have yet to get a response.
 * To circumvent this from throwing an eslint error, I turned the rule off for {} in estlintrc.js
 */
import {ClassEvents, EventableMixin} from '@/mixins/ClassEvents';

type GConstructor<T = {}> = new (...args: any[]) => T;

export default function <T extends GConstructor>(base: T, mixins?: string[]) {
  class Base extends base {
    logInfo(msg: string) {
      console.log(msg);
    }

    logWarning(msg: string) {
      console.warn(msg);
    }

    logError(msg: string) {
      console.error(msg);
    }

    logException(msg: string) {
      throw msg;
    }
  }

  if (mixins) {
    mixins.forEach((mixin) => {
      if (mixin === 'Eventable') {
        EventableMixin(Base);
      }
    });
  }

  // Merge interface/class with actual mixin contract
  interface Base extends ClassEvents {
  }

  return Base;
}
