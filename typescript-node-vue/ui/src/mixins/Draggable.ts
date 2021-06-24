import {defineComponent} from 'vue';
import {IEventMouse} from '@/interfaces/Components';

// Taken from https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_draggable
export default defineComponent({
  data() {
    return {
      position: {
        currentX: 0,
        currentY: 0,
        nextX: 0,
        nextY: 0,
        // Idea taken from https://stackoverflow.com/a/17206138/1253609
        target: ':scope > .jef-title'
      }
    };
  },

  computed: {
    targetEl(): HTMLElement {
      return this.$el.querySelector(this.position.target);
    }
  },

  mounted() {
    const el = this.targetEl;
    if (el) {
      el.onmousedown = this.dragMouseDown;
    }
  },

  unmounted() {
    const el = this.targetEl;
    if (el) {
      el.onmousedown = null;
    }
  },

  methods: {
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
