<template>
  <FlexContainer v-bind="$props"
                 :direction="layout"
                 :class="fieldContainerCls">
    <span v-if="showLabel"
          class="field-label"
          :style="labelStyle">
      {{ label }}{{ labelSeparator }}
    </span>
    <FlexContainer :direction="FlexDirections.COLUMN"
                   :grow="1"
                   class="field-input-container">
      <ul class="field-combo-tags">
        <template v-if="multiselect">
          <li v-for="(record, index) in records"
              :key="index"
              class="field-combo-tag">
          <span class="field-combo-tag-text">
            {{ record[displayKey] }}
          </span>
            <JefButton :icon="Icons.CROSS"
                       :icon-only="true"
                       :data-record-index="index"
                       height="100%"
                       @click="onClickRemoveTag" />
          </li>
        </template>
        <li>
          <input v-model="displayValue"
                 ref="input"
                 :class="fieldInputCls"
                 :type="type"
                 :required="isRequired"
                 :disabled="isDisabled"
                 :readonly="isReadOnly"
                 :style="fieldInputStyle"
                 :min="min"
                 :max="max"
                 @keyup.enter="onKeyUpField">
        </li>
      </ul>
      <Icon class="field-picker"
            :icon-name="Icons.CHEVRON_DOWN"
            @click="onClickPicker" />
      <JefList :store="store"
               :display-key="displayKey"
               :value-key="valueKey"
               :expanded="isExpanded"
               :align-target="alignTarget"
               :selected-records="records"
               @select="onSelectRecord" />
    </FlexContainer>
  </FlexContainer>
</template>

<script lang="ts">
import {defineComponent, PropType} from 'vue';
import FlexContainer from '@/components/base/FlexContainer.vue';
import {IRegisterInjector} from '@/mixins/RegisterInjector';
import {IEventsInjector} from '@/mixins/EventsInjector';
import Field from '@/components/base/Field.vue';
import IStore from '@/interfaces/IStore';
import IModel from '@/interfaces/IModel';
import Icon from '@/components/Icon.vue';
import JefList from '@/components/base/List.vue';
import {IButton, IEventMouse, IFieldValue, IJefList} from '@/interfaces/Components';
import utilities from '@/utilities';
import JefButton from '@/components/base/Button.vue';

interface IData extends IEventsInjector, IRegisterInjector {
  isField: boolean;
  originalValue: string | number | boolean;
  valid: boolean;
}

export default defineComponent({
  name: 'ComboBox',
  components: {
    JefButton,
    JefList,
    Icon,
    FlexContainer
  },
  extends: Field,
  props: {
    multiselect: {
      type: Boolean,
      default: false
    },
    associationKey: {
      type: String,
      default: ''
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
    }
  },

  data(): {
    isExpanded: boolean;
    alignTarget: HTMLElement | null;
  } {
    return {
      isExpanded: false,
      alignTarget: null
    };
  },

  computed: {
    records(): IModel[] {
      const records: IModel[] = [];
      const store = this.store;
      let modelValue = this.modelValue;
      if (store && !utilities.isEmpty(modelValue)) {
        const associationKey = this.associationKey;
        if (associationKey) {
          modelValue = (modelValue as IStore<IModel>).collect(associationKey);
        }
        else if (!utilities.isArray(modelValue)) {
          modelValue = [modelValue];
        }
        (modelValue as IFieldValue[]).forEach((value) => {
          const found = store.findRecord(this.valueKey, value);
          if (found) {
            records.push(found);
          }
        });
      }
      return records;
    },
    displayValue(): IFieldValue {
      const records = this.records;
      const firstRecord = records && records[0];
      return this.multiselect ? '' : firstRecord && firstRecord.get(this.displayKey);
    },
    value: {
      get(): IFieldValue | IFieldValue[] {
        const value = [] as IFieldValue[];
        const records = this.records;
        records.forEach((record) => {
          value.push(record.get(this.valueKey));
        });
        return value;
      },
      set(value: IFieldValue | IFieldValue[]) {
        this.isValid();
        const associationKey = this.associationKey;
        if (associationKey) {
          const valueStore = this.modelValue as IStore<IModel>;
          valueStore.clear();
          const idKey = this.valueKey;
          if (!utilities.isArray(value)) {
            value = [value];
          }
          /* This will only add in a record with the Id set... it won't have any other properties...
           * maybe allow for other properties to be set as a config in the combo? */
          (value as Array<any>).forEach((item) => {
            valueStore.add(new valueStore.type({
              [idKey]: item
            }));
          });
          value = valueStore;
        }
        else if (utilities.isEmpty(value) && this.emptyValueAsNull) {
          value = null;
        }
        else if (this.multiselect) {
          if (!utilities.isArray(value)) {
            value = [value];
          }
        }
        this.$emit('update:modelValue', value);
      }
    }
  },

  methods: {
    updateValue(record: IModel) {
      const originalValue = record.get(this.valueKey);
      let value = originalValue;
      const records = this.records;
      // Unset the value if user is unselecting the record
      if (utilities.contains(records, record)) {
        value = null;
        console.log('unsetting');
      }
      if (this.multiselect) {
        let values = this.value as IFieldValue[];
        if (utilities.isEmpty(value)) {
          values = utilities.remove(values, originalValue);
        }
        else {
          values.push(value);
        }
        value = values;
      }
      this.value = value;
    },
    onClickPicker(event: IEventMouse) {
      this.isExpanded = !this.isExpanded;
    },
    onClickRemoveTag(button: IButton, event: IEventMouse) {
      const records = this.records;
      const el = button.$el;
      const index = el && el.getAttribute('data-record-index');
      if (index) {
        this.updateValue(records[parseInt(index)]);
      }
    },
    onSelectRecord(list: IJefList, record: IModel) {
      this.updateValue(record);
      this.isExpanded = false;
    },
    onClickDocument(event: MouseEvent) {
      if (this.isExpanded && !this.$el.contains(event.target)) {
        this.isExpanded = false;
      }
    }
  },

  mounted() {
    this.alignTarget = this.$refs.input as HTMLElement;
    /* Let's listen for any document clicks, as we'll need to collapse if user clicks on something
     * outside of this class */
    document.addEventListener('click', this.onClickDocument);
  },

  unmounted() {
    document.removeEventListener('click', this.onClickDocument);
  }
});
</script>

<style scoped
       lang="scss">
.field-container {
  input {
    border: none !important;
  }

  .field-input-container {
    border: $field-input-border;
    height: auto !important;
  }

  .field-combo-tags {
    list-style: none;
    margin: 0;
    padding: 0 20px 0 0;
    width: 100%;
    line-height: 1;

    .field-combo-tag {
      font-size: $field-input-font-size - 1;
      line-height: $field-input-font-size - 1;
      color: $field-input-font-color;
      padding: 0 0 0 2px;
      display: inline-block;
      background-color: #DEDEDE;
      margin: 2px 0 0 2px;
    }
  }

  .jef-button {
    font-size: $field-input-font-size;
  }

  .highlighted {
    background-color: lightblue;
  }

  .field-picker {
    position: absolute;
    right: 5px;
    font-size: 14px;
    line-height: $field-height;

    &:hover {
      cursor: pointer;
      color: Highlight;
    }
  }
}
</style>
