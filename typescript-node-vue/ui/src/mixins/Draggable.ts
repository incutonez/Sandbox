import {defineComponent} from 'vue';
import {IEventMouse} from '@/interfaces/Components';

// General idea taken from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
export default defineComponent({
  props: {
    dragTarget: {
      type: String,
      // Idea taken from https://stackoverflow.com/a/17206138/1253609
      default: ':scope > .jef-title'
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
        newTarget.onmousedown = this.dragMouseDown;
        newTarget.style.cursor = 'move';
        this.position.targetEl = newTarget;
      }
      if (oldTarget) {
        oldTarget.onmousedown = null;
        oldTarget.style.cursor = '';
      }
    },

    dragMouseDown(event: IEventMouse) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      this.position.currentX = event.clientX;
      this.position.currentY = event.clientY;
      document.onmouseup = this.closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = this.elementDrag;
    },

    elementDrag(event: IEventMouse) {
      const pos = this.position;
      const el = this.$el;
      event = event || window.event;
      event.preventDefault();
      // calculate the new cursor position:
      pos.nextX = pos.currentX - event.clientX;
      pos.nextY = pos.currentY - event.clientY;
      pos.currentX = event.clientX;
      pos.currentY = event.clientY;
      // set the element's new position:
      el.style.left = (el.offsetLeft - pos.nextX) + 'px';
      el.style.top = (el.offsetTop - pos.nextY) + 'px';
    },

    closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
});
