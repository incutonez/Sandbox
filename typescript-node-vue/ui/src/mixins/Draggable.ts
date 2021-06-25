import {defineComponent} from 'vue';
import {IEventMouse} from '@/interfaces/Components';

// General idea taken from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
export default defineComponent({
  props: {
    dragTarget: {
      type: String,
      // Idea taken from https://stackoverflow.com/a/17206138/1253609
      default: ':scope > .jef-title'
    },
    dragConstrain: {
      type: Boolean,
      default: false
    }
  },

  data(): {
    position: {
      x: number;
      y: number;
      xMin: number;
      xMax: number;
      yMin: number;
      yMax: number;
      targetEl?: HTMLElement;
    }
  } {
    return {
      position: {
        x: 0,
        y: 0,
        xMin: 0,
        xMax: 0,
        yMin: 0,
        yMax: 0
      }
    };
  },

  watch: {
    dragTarget: {
      handler(value) {
        this.changeTargetEl(value);
      }
    }
  },

  mounted() {
    this.changeTargetEl(this.dragTarget);
  },

  unmounted() {
    this.changeTargetEl();
  },

  methods: {
    changeTargetEl(selector?: string) {
      const position = this.position;
      const oldTarget = position.targetEl;
      const newTarget = selector && this.$el.querySelector(selector);
      if (newTarget) {
        const parentRect = this.$el.getBoundingClientRect();
        const rect = newTarget.getBoundingClientRect();
        newTarget.onmousedown = this._dragStart;
        newTarget.style.cursor = 'move';
        position.targetEl = newTarget;
        position.xMin = parentRect.left - rect.left;
        position.xMax = innerWidth + parentRect.right - rect.right - parentRect.width;
        position.yMin = parentRect.top - rect.top;
        position.yMax = innerHeight + parentRect.bottom - rect.bottom - parentRect.height;
      }
      if (oldTarget) {
        oldTarget.onmousedown = null;
        oldTarget.style.cursor = '';
      }
    },

    _dragStart(event: IEventMouse) {
      const position = this.position;
      event.preventDefault();
      position.x = event.clientX;
      position.y = event.clientY;
      document.onmousemove = this._drag;
      document.onmouseup = this._dragEnd;
    },

    _drag(event: IEventMouse) {
      event.preventDefault();
      const pos = this.position;
      const parentEl = this.$el;
      let top = parentEl.offsetTop;
      let left = parentEl.offsetLeft;
      let nextY = pos.y - event.clientY;
      let nextX = pos.x - event.clientX;
      if (this.dragConstrain) {
        /* It's possible that our el is not the same as the targetEl, and we need to use that as our
         * origin for if we're in bounds... but we need to still use the el when we're changing its position, as
         * that's the parent's position */
        const el = pos.targetEl || parentEl;
        const rect = el.getBoundingClientRect();
        const nextTop = rect.top - nextY;
        const nextLeft = rect.left - nextX;
        if (nextTop < 0) {
          nextY = 0;
          // Make sure we go flush against the top
          top = pos.yMin;
        }
        else if (rect.height + nextTop > innerHeight) {
          nextY = innerHeight;
          // Make sure we go flush against the bottom
          top = pos.yMax;
        }
        else {
          top -= nextY;
        }
        if (nextLeft < 0) {
          nextX = 0;
          // Make sure we go flush against the left
          left = pos.xMin;
        }
        else if (rect.width + nextLeft > innerWidth) {
          nextX = innerWidth;
          // Make sure we go flush against the right
          left = pos.xMax;
        }
        else {
          left -= nextX;
        }
      }
      else {
        top -= nextY;
        left -= nextX;
      }
      parentEl.style.top = `${top}px`;
      parentEl.style.left = `${left}px`;
      pos.y = event.clientY;
      pos.x = event.clientX;
    },

    _dragEnd() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
});
