<template>
  <div class="flex">
    <BaseGrid
      ref="grid"
      v-model:selected-cell="selectedCell"
      :cells="store"
      :total-columns="record.totalColumns"
      :total-rows="record.totalRows"
      :show-grid-lines="showGridLines"
      :get-cell-color="getCellColor"
      @replace-cell="onReplaceCell"
    />
    <div class="p-4 space-y-2">
      <div class="flex justify-between">
        <FieldCheckBox
          v-model="showGridLines"
          label="Grid Lines"
        />
        <div>
          <BaseButton
            text="Save"
            class="mr-2 rounded default"
            @click="onClickSaveBtn"
          />
          <BaseButton
            text="Load"
            class="rounded default"
            @click="onClickLoadBtn"
          />
          <input
            v-show="false"
            ref="fileInputEl"
            type="file"
            @change="onChangeLoadFile"
          >
        </div>
      </div>
      <BaseCard title="Screen Coordinates">
        <FieldInteger
          v-model="record.X"
          label="X"
          label-width="auto"
          input-width="w-12"
          width="w-28"
        />
        <FieldInteger
          v-model="record.Y"
          label="Y"
          label-width="auto"
          input-width="w-12"
          width="w-28"
        />
        <BaseField
          v-model="record.Name"
          label="Name"
        />
      </BaseCard>
      <BaseCard title="Colors">
        <FieldComboBox
          v-model="record.GroundColor"
          label="Ground"
          label-width="auto"
          :options="groundColorsStore"
          width="w-28"
        />
        <FieldComboBox
          v-model="record.AccentColor"
          label="Accent"
          label-width="auto"
          :options="accentColorsStore"
          width="w-28"
        />
      </BaseCard>
      <BaseCard
        v-if="selectedCell"
        :key="selectedCell.id"
        title="Cell"
        layout="vertical"
      >
        <div class="flex justify-between space-x-4">
          <FieldComboBox
            v-model="selectedCell.Type"
            label="Tile"
            label-width="auto"
            :options="tilesStore"
          />
          <div
            v-show="showColors"
            class="w-16 h-16 bg-blue-100"
          >
            <img
              v-if="selectedCell.tileSrc"
              :src="selectedCell.tileSrc"
              class="w-full h-full"
            >
          </div>
        </div>
        <BaseCard
          v-show="showColors"
          title="Replace Colors"
          layout="vertical"
        >
          <FieldComboBox
            v-for="targetColor in selectedCell.TargetColors"
            :key="targetColor.id"
            v-model="targetColor.Value"
            :label="WorldColors.getKey(targetColor.Target)"
            :options="accentColorsStore"
            @update:model-value="onUpdateTargetValue"
          />
        </BaseCard>
        <BaseCard
          v-if="isTransition"
          title="Transition Properties"
          layout="vertical"
        >
          <FieldInteger
            v-model="selectedCell.Transition.X"
            label="X Offset"
            width="w-24"
          />
          <FieldInteger
            v-model="selectedCell.Transition.Y"
            label="Y Offset"
            width="w-24"
          />
          <BaseField
            v-if="selectedCell.isDoor()"
            v-model="selectedCell.Transition.Name"
            label="Name"
          />
          <FieldComboBox
            v-if="selectedCell.isDoor()"
            v-model="selectedCell.Transition.Template"
            label="Template"
            required
            id-field="value"
            :options="screenTemplatesStore"
          />
          <FieldCheckBox
            v-model="selectedCell.Transition.IsFloating"
            label="Floating"
          />
        </BaseCard>
      </BaseCard>
    </div>
  </div>
</template>

<script>
import { WorldColors } from "ui/classes/enums/WorldColors.js";
import { Tiles } from "ui/classes/enums/Tiles.js";
import {
  computed,
  provide,
  reactive,
  ref,
  toRefs,
} from "vue";
import { Grid } from "ui/classes/models/Grid.js";
import BaseGrid from "ui/components/BaseGrid.vue";
import { useKeyboardMouseProvider } from "ui/composables/useKeyboardMouseProvider.js";
import { ScreenTemplates } from "ui/classes/enums/ScreenTemplates.js";
import { isArray } from "@incutonez/shared";
import {
  BaseButton,
  BaseField,
  FieldCheckBox,
  FieldComboBox,
  FieldInteger,
} from "@incutonez/core-ui";
import BaseCard from "ui/components/BaseCard.vue";
/**
 * TODOJEF:
 * - Add special properties for Transitions
 * - Should rename Door to ShopDoor, as it's a little special
 * - Optimize the export... right now, it does all individual cells... should be able to group by type
 * - Load into Unity game to see it working
 * - Finish other TODOJEFs
 * - Add special properties to Tiles... will need to wire this up in Unity code
 * -- Like CanBreak, CanBurn, CanBomb
 */
export default {
  name: "App",
  components: {
    BaseCard,
    FieldInteger,
    BaseButton,
    BaseGrid,
    FieldComboBox,
    BaseField,
    FieldCheckBox,
  },
  setup() {
    const fileInputEl = ref(null);
    const contextMenu = ref(null);
    const theDialog = ref(null);
    const selectedCell = ref(null);
    const grid = ref(null);
    const isTransition = computed(() => selectedCell.value?.isTransition());
    const showColors = computed(() => !isTransition.value && selectedCell.value.Tile !== Tiles.None);
    const state = reactive({
      groundColorsStore: WorldColors,
      accentColorsStore: WorldColors,
      screenTemplatesStore: ScreenTemplates,
      tilesStore: Tiles,
      showGridLines: true,
      record: Grid.initialize(11, 16),
    });
    provide("pressedKeys", useKeyboardMouseProvider());

    function getCellColor() {
      return state.accentColorsStore.findRecord(state.record.GroundColor)?.backgroundStyle;
    }

    function onUpdateTargetValue() {
      selectedCell.value.updateTileImage();
    }

    // We have to have this because we do cell replacements, which requires us doing some deep copying here
    // TODOJEF: Is there a better way of doing this?
    // TODOJEF: Make this an actual store?
    const store = computed(() => [...state.record.cells]);

    function onReplaceCell({ indices, replacement }) {
      if (!isArray(indices)) {
        indices = [indices];
        // Make sure we update the selection with the replacement
        selectedCell.value = replacement;
      }
      indices.forEach((idx) => {
        let record = state.record.cells[idx];
        record = state.record.cells[idx] = replacement.clone({
          Coordinates: record.Coordinates,
          id: record.id,
          Type: replacement.Type,
        });
        record.grid = replacement.grid;
      });
    }

    function onClickLoadBtn() {
      fileInputEl.value.click();
    }

    function onChangeLoadFile() {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        state.record.loadFileData(JSON.parse(reader.result));
      });
      const [file] = fileInputEl.value.files;
      if (file) {
        reader.readAsText(file);
      }
    }

    function onClickSaveBtn() {
      // TODOJEF: Move this logic to a utility function
      const contents = new Blob([JSON.stringify(state.record.getConfig())], {
        type: "application/json",
      });
      const tempEl = document.createElement("a");
      tempEl.download = `${state.record.X}${state.record.Y}.json`;
      tempEl.href = window.URL.createObjectURL(contents);
      tempEl.click();
    }

    return {
      ...toRefs(state),
      fileInputEl,
      isTransition,
      contextMenu,
      theDialog,
      grid,
      store,
      selectedCell,
      showColors,
      getCellColor,
      WorldColors,
      onReplaceCell,
      onClickSaveBtn,
      onClickLoadBtn,
      onChangeLoadFile,
      onUpdateTargetValue,
    };
  },
};
</script>
