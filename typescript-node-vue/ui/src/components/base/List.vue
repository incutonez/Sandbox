<template>
  <ul class="list-box"
      :style="styleFm"
      v-if="expanded">
    <li v-for="(record, index) in store"
        :key="index"
        :class="getItemCls(record)"
        :data-record-index="index"
        @click="onClickListItem">
      {{ record[displayKey] }}
    </li>
  </ul>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import IStore from '@/interfaces/IStore';
import IModel from '@/interfaces/IModel';
import {IEventMouse} from '@/interfaces/Components';
import utilities from '@/utilities';

export default defineComponent({
  name: 'JefList',
  emits: [
    'select',
    'collapse'
  ],
  props: {
    align: {
      type: String,
      default: 'b'
    },
    alignTarget: {
      type: Object as PropType<HTMLElement>,
      default: null
    },
    displayKey: {
      type: String,
      default: 'Description'
    },
    valueKey: {
      type: String,
      default: 'Value'
    },
    store: {
      type: Object as PropType<IStore<IModel>>,
      default: null
    },
    expanded: {
      type: Boolean,
      default: false
    },
    selectedRecords: {
      type: Object as PropType<IModel[]>,
      default: null
    }
  },

  computed: {
    styleFm(): string {
      const style: string[] = [];
      const target = this.alignTarget;
      if (target) {
        const height = target.clientHeight;
        const width = target.clientWidth;
        const splits = this.align.split('');
        splits.forEach((alignment) => {
          switch (alignment) {
            case 'b':
              style.push(`top: ${utilities.convertToPx(height)}`);
              break;
            case 't':
              style.push(`bottom: ${utilities.convertToPx(height)}`);
              break;
            case 'r':
              style.push(`left: ${utilities.convertToPx(width)}`);
              break;
            case 'l':
              style.push(`right: ${utilities.convertToPx(width)}`);
              break;
            // Centered
            default:
              break;
          }
        });
      }
      return style.join('; ');
    }
  },

  methods: {
    getItemCls(record: IModel): string {
      const cls = ['list-item'];
      if (utilities.contains(this.selectedRecords, record)) {
        cls.push('highlight');
      }
      return cls.join(' ');
    },
    onClickListItem(event: IEventMouse) {
      const el = event.target as HTMLElement;
      const index = el && el.getAttribute('data-record-index');
      if (index) {
        const record = this.store[parseInt(index)];
        this.$emit('select', this, record);
      }
    }
  }
});
</script>

<style scoped
       lang="scss">
.list-box {
  margin: 0;
  padding: 0;
  height: 200px;
  width: 100%;
  border: $field-input-border;
  overflow: auto;
  position: absolute;
  background-color: #FFFFFF;
  list-style: none;
  z-index: 1;
  color: #000000;
  box-shadow: $window-box-shadow;

  .highlight {
    background-color: lightblue;
  }

  .list-item {
    padding: 4px 5px;
    font-size: $field-input-font-size;

    &:hover {
      background-color: lightblue;
      cursor: pointer;
    }
  }
}
</style>
