import {defineComponent} from 'vue';

const Grid = defineComponent({
  name: 'Grid',
  props: {
    columns: Object
  },
  data() {
    console.log(this.columns);
  }
});

export default Grid;
