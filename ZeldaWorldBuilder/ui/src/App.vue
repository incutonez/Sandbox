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
    <div class="p-4">
      <div class="flex">
        <FieldCheckBox
          v-model="showGridLines"
          label="Grid Lines"
        />
        <BaseButton
          text="Save"
          class="self-end"
          @click="onClickSaveBtn"
        />
      </div>
      <div class="flex space-x-2">
        <FieldInteger
          v-model="record.X"
          label="Overworld X"
          width="w-28"
        />
        <FieldInteger
          v-model="record.Y"
          label="Overworld Y"
          width="w-28"
        />
      </div>
      <div class="flex space-x-2">
        <FieldComboBox
          v-model="record.GroundColor"
          label="Ground Color"
          :options="groundColorsStore"
          width="w-28"
        />
        <FieldComboBox
          v-model="record.AccentColor"
          label="World Color"
          :options="accentColorsStore"
          width="w-28"
        />
      </div>
      <div
        v-if="selectedCell"
        :key="selectedCell.id"
        class="mt-8"
      >
        <div class="flex space-x-2">
          <FieldComboBox
            v-model="selectedCell.Tile"
            label="Cell Tile"
            :options="tilesStore"
          />
          <div class="w-16 h-16 bg-blue-100">
            <img
              v-if="selectedCell.tileSrc"
              :src="selectedCell.tileSrc"
              class="w-full h-full"
            >
          </div>
        </div>
        <FieldComboBox
          v-for="targetColor in selectedCell.TargetColors"
          :key="targetColor.id"
          v-model="targetColor.Value"
          :label="`Replace ${WorldColors.getKey(targetColor.Target)}`"
          :options="accentColorsStore"
        />
        <div v-if="selectedCell.isTransition()">
          <div class="flex space-x-2">
            <FieldInteger
              v-model="selectedCell.Transition.X"
              label="X Change"
              width="w-24"
            />
            <FieldInteger
              v-model="selectedCell.Transition.Y"
              label="Y Change"
              width="w-24"
            />
          </div>
          <FieldComboBox
            v-model="selectedCell.Transition.TileType"
            label="Tile"
            :options="tilesStore"
          />
          <FieldComboBox
            v-model="selectedCell.Transition.Template"
            label="Template"
            :options="screenTemplatesStore"
          />
          <FieldCheckBox
            v-model="selectedCell.Transition.IsFloating"
            label="Floating"
          />
        </div>
      </div>
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
import { isArray } from "ui/utilities.js";
import { useKeyboardMouseProvider } from "ui/composables/useKeyboardMouseProvider.js";
import { ScreenTemplates } from "ui/classes/enums/ScreenTemplates.js";
import { FieldCheckBox, FieldInteger, BaseButton, FieldComboBox } from "@incutonez/core-ui";

/**
 * TODOJEF:
 * - Add special properties for Transitions
 * - Should rename Door to ShopDoor, as it's a little special
 * - Optimize the export... right now, it does all individual cells... should be able to group by type
 * - Actually save to file system
 * - Load into Unity game to see it working
 * - Finish other TODOJEFs
 * - Add special properties to Tiles... will need to wire this up in Unity code
 * -- Like CanBreak, CanBurn, CanBomb
 */
export default {
  name: "App",
  components: {
    FieldInteger,
    BaseButton,
    BaseGrid,
    FieldComboBox,
    FieldCheckBox,
  },
  setup() {
    const contextMenu = ref(null);
    const theDialog = ref(null);
    const selectedCell = ref(null);
    const grid = ref(null);
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
        });
        record.grid = replacement.grid;
      });
    }

    function onClickSaveBtn() {
      console.log(state.record.getConfig());
    }

    return {
      ...toRefs(state),
      contextMenu,
      theDialog,
      grid,
      store,
      selectedCell,
      getCellColor,
      WorldColors,
      onReplaceCell,
      onClickSaveBtn,
    };
  },
};
</script>
