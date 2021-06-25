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
      currentX: number;
      currentY: number;
      nextX: number;
      nextY: number;
      targetEl?: HTMLElement;
    }
  } {
    return {
      position: {
        currentX: 0,
        currentY: 0,
        nextX: 0,
        nextY: 0
      }
    };
  },

  watch: {
    dragTarget: {
      handler(value, oldValue) {
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
      const oldTarget = this.position.targetEl;
      const newTarget = selector && this.$el.querySelector(selector);
      if (newTarget) {
        newTarget.onmousedown = this._dragStart;
        newTarget.style.cursor = 'move';
        this.position.targetEl = newTarget;
      }
      if (oldTarget) {
        oldTarget.onmousedown = null;
        oldTarget.style.cursor = '';
      }
    },

    _dragStart(event: IEventMouse) {
      event.preventDefault();
      this.position.currentX = event.clientX;
      this.position.currentY = event.clientY;
      this.$el.onmousemove = this._drag;
      this.$el.onmouseup = this._dragEnd;
    },

    _drag(event: IEventMouse) {
      event.preventDefault();
      const pos = this.position;
      const parentEl = this.$el;
      const top = parentEl.offsetTop;
      const left = parentEl.offsetLeft;
      const nextY = pos.currentY - event.clientY;
      const nextX = pos.currentX - event.clientX;
      let inBoundsX = true;
      let inBoundsY = true;
      if (this.dragConstrain) {
        /* It's possible that our el is not the same as the targetEl, and we need to use that as our
         * origin for if we're in bounds... but we need to still use the el when we're changing its position, as
         * that's the parent's position */
        const el = pos.targetEl || parentEl;
        const rect = el.getBoundingClientRect();
        const nextTop = rect.top - nextY;
        const nextLeft = rect.left - nextX;
        inBoundsY = nextTop > 0 && rect.height + nextTop < innerHeight;
        inBoundsX = nextLeft > 0 && rect.width + nextLeft < innerWidth;
      }
      if (inBoundsY) {
        pos.nextY = nextY;
        parentEl.style.top = top - nextY + 'px';
      }
      if (inBoundsX) {
        pos.nextX = nextX;
        parentEl.style.left = left - nextX + 'px';
      }
      pos.currentY = event.clientY;
      pos.currentX = event.clientX;
    },

    _dragEnd() {
      this.$el.onmouseup = null;
      this.$el.onmousemove = null;
    }
  }
});
