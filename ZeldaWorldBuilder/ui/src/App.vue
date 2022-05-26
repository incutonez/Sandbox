<template>
  <div class="flex">
    <div class="flex flex-col">
      <FieldComboBox
        v-model="selectedId"
        v-model:selected="selectedScreen"
        :options="overworldRecords"
        label-align="top"
        label="Screens"
        id-field="Name"
        display-field="Name"
      />
      <BaseButton
        text="New"
        class="self-start mt-1 rounded default"
        @click="onClickNewButton"
      />
    </div>
    <BaseGrid
      v-model:selected-cell="selectedCell"
      :cells="selectedScreen?.cells"
      :total-columns="gridRecord.totalColumns"
      :total-rows="gridRecord.totalRows"
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
      <BaseCard
        title="Screen Coordinates"
        class="bp-2 horizontal"
      >
        <FieldInteger
          v-model="gridRecord.X"
          label="X"
          label-width="auto"
          input-width="w-12"
          width="w-28"
        />
        <FieldInteger
          v-model="gridRecord.Y"
          label="Y"
          label-width="auto"
          input-width="w-12"
          width="w-28"
        />
        <BaseField
          v-model="gridRecord.Name"
          label="Name"
        />
      </BaseCard>
      <BaseCard
        title="Colors"
        class="bp-2 horizontal"
      >
        <FieldComboBox
          v-model="gridRecord.GroundColor"
          label="Ground"
          label-width="auto"
          class="bp-2"
          :options="WorldColors"
          width="w-28"
        />
        <FieldComboBox
          v-model="gridRecord.AccentColor"
          label="Accent"
          label-width="auto"
          :options="WorldColors"
          width="w-28"
        />
      </BaseCard>
      <BaseCard
        v-if="selectedCell"
        :key="selectedCell.id"
        title="Cell"
        class="vertical"
      >
        <BaseCard
          class="vertical bp-2"
          title="Tile"
        >
          <div class="flex justify-between">
            <FieldComboBox
              v-model="selectedTile.Type"
              :options="Tiles"
              label="Type"
              label-width="auto"
            />
            <div
              v-show="showColors"
              class="w-16 h-16 bg-blue-100"
            >
              <img
                v-if="selectedTile.src"
                :src="selectedTile.src"
                class="w-full h-full"
                alt="Tile Image"
              >
            </div>
          </div>
          <BaseCard
            v-show="showColors"
            title="Replace Colors"
            class="vertical bp-2"
          >
            <FieldComboBox
              v-for="tileColor in selectedTile.Colors"
              :key="tileColor.id"
              v-model="tileColor.Value"
              :label="WorldColors.getKey(tileColor.Target)"
              :options="WorldColors"
              @update:model-value="onUpdateTileColor"
            />
          </BaseCard>
          <BaseCard
            v-if="isTransition"
            title="Transition Properties"
            class="vertical bp-2"
          >
            <FieldInteger
              v-model="selectedTile.Transition.X"
              label="X Offset"
              width="w-24"
            />
            <FieldInteger
              v-model="selectedTile.Transition.Y"
              label="Y Offset"
              width="w-24"
            />
            <BaseField
              v-if="selectedTile.isDoor"
              v-model="selectedTile.Transition.Name"
              label="Name"
            />
            <FieldComboBox
              v-if="selectedTile.isDoor"
              v-model="selectedTile.Transition.Template"
              label="Template"
              required
              id-field="value"
              :options="ScreenTemplates"
            />
            <FieldCheckBox
              v-model="selectedTile.Transition.IsFloating"
              label="Floating"
            />
          </BaseCard>
        </BaseCard>
        <BaseCard
          title="Item"
          :expanded="false"
          class="vertical bp-2"
        >
          <div class="flex justify-between">
            <FieldComboBox
              v-model="selectedItem.Type"
              :options="Items"
              label="Type"
              label-width="auto"
            />
            <div class="flex justify-center w-16 h-16 bg-blue-100">
              <img
                v-if="selectedItem.src"
                :src="selectedItem.src"
                class="h-full"
                alt="Item Image"
              >
            </div>
          </div>
        </BaseCard>
        <BaseCard
          title="Enemy"
          :expanded="false"
          class="vertical bp-2"
        >
          <div class="flex justify-between">
            <div class="flex flex-col justify-between">
              <FieldComboBox
                v-model="selectedEnemy.Type"
                :options="Enemies"
                label="Type"
                label-width="w-12"
              />
              <FieldNumber
                v-model="selectedEnemy.Speed"
                label="Speed"
                label-width="w-12"
              />
            </div>
            <div class="flex justify-center w-16 h-16 bg-blue-100">
              <img
                v-if="selectedEnemy.src"
                :src="selectedEnemy.src"
                class="h-full"
                alt="Item Image"
              >
            </div>
          </div>
          <BaseCard
            v-show="selectedEnemy.hasImage()"
            title="Replace Colors"
            class="vertical bp-2"
          >
            <FieldComboBox
              v-for="tileColor in selectedEnemy.Colors"
              :key="tileColor.id"
              v-model="tileColor.Value"
              :label="WorldColors.getKey(tileColor.Target)"
              :options="WorldColors"
              @update:model-value="onUpdateEnemyColor"
            />
          </BaseCard>
          <BaseCard
            title="Health"
            class="horizontal bp-2"
          >
            <FieldNumber
              v-model="selectedEnemy.Health"
              label="Health"
            />
            <FieldNumber
              v-model="selectedEnemy.HealthModifier"
              label="Modifier"
            />
          </BaseCard>
          <BaseCard
            title="Damage"
            class="horizontal bp-2"
          >
            <FieldNumber
              v-model="selectedEnemy.TouchDamage"
              label="Touch"
            />
            <FieldNumber
              v-model="selectedEnemy.WeaponDamage"
              label="Weapon"
            />
          </BaseCard>
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
  watch,
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
  FieldNumber,
  BaseLabel,
} from "@incutonez/core-ui";
import BaseCard from "ui/components/BaseCard.vue";
import { Items } from "ui/classes/enums/Items.js";
import { Enemies } from "ui/classes/enums/NPCs.js";

/**
 * TODOJEF:
 * - I think I need to rework the JSON output... it should output the entire world in a single JSON, and load it that way...
 * -- This is because I think it'll eventually get shoved into a DB
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
    BaseLabel,
    FieldNumber,
  },
  setup() {
    const fileInputEl = ref(null);
    const contextMenu = ref(null);
    const selectedCell = ref(null);
    const selectedScreen = ref(null);
    const showGridLines = ref(true);
    const overworldRecords = reactive([]);
    const gridRecord = ref(addGridRecord());
    const selectedId = ref(gridRecord.value.Name);
    const isTransition = computed(() => selectedCell.value?.tile.isTransition);
    const selectedTile = computed(() => selectedCell.value?.tile);
    const selectedItem = computed(() => selectedCell.value?.item);
    const selectedEnemy = computed(() => selectedCell.value?.enemy);
    const showColors = computed(() => !isTransition.value && selectedTile.value.hasImage());
    provide("pressedKeys", useKeyboardMouseProvider());

    watch(selectedId, () => {
      selectedCell.value = null;
      gridRecord.value = overworldRecords.find(({ Name }) => Name === selectedId.value);
    });

    function addGridRecord(config = {}) {
      const record = new Grid({
        totalRows: 11,
        totalColumns: 16,
        ...config,
      });
      overworldRecords.push(record);
      return record;
    }

    function getCellColor() {
      return WorldColors.findRecord(gridRecord.value.GroundColor)?.backgroundStyle;
    }

    function onUpdateTileColor() {
      selectedTile.value.updateImage();
    }

    function onUpdateEnemyColor() {
      selectedEnemy.value.updateImage();
    }

    function onReplaceCell({ indices, replacement }) {
      if (!isArray(indices)) {
        indices = [indices];
        // Make sure we update the selection with the replacement
        selectedCell.value = replacement;
      }
      indices.forEach((idx) => {
        const record = gridRecord.value.cells[idx];
        const clone = replacement.clone({
          exclude: ["grid", "Coordinates"],
        });
        clone.set({
          Coordinates: record.Coordinates,
          grid: record.grid,
        });
        // TODO: Consider figuring out how the clone be added to the cell property without having to manually set it
        clone.tile.cell = clone;
        clone.item.cell = clone;
        clone.enemy.cell = clone;
        gridRecord.value.cells[idx] = clone;
      });
    }

    function onClickLoadBtn() {
      fileInputEl.value.click();
    }

    function onChangeLoadFile() {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        gridRecord.value.loadFileData(JSON.parse(reader.result));
      });
      const [file] = fileInputEl.value.files;
      if (file) {
        reader.readAsText(file);
      }
    }

    function onClickSaveBtn() {
      // TODO: Move this logic to a utility function
      const contents = new Blob([JSON.stringify(gridRecord.value.getConfig())], {
        type: "application/json",
      });
      const tempEl = document.createElement("a");
      tempEl.download = `${gridRecord.value.X}${gridRecord.value.Y}.json`;
      tempEl.href = window.URL.createObjectURL(contents);
      tempEl.click();
    }

    function onClickNewButton() {
      addGridRecord({
        Name: "TEMPORARY NAME",
      });
    }

    return {
      gridRecord,
      overworldRecords,
      showGridLines,
      selectedId,
      selectedScreen,
      fileInputEl,
      isTransition,
      contextMenu,
      selectedTile,
      selectedItem,
      selectedEnemy,
      selectedCell,
      showColors,
      getCellColor,
      WorldColors,
      ScreenTemplates,
      Tiles,
      Items,
      Enemies,
      onClickNewButton,
      onReplaceCell,
      onClickSaveBtn,
      onClickLoadBtn,
      onChangeLoadFile,
      onUpdateTileColor,
      onUpdateEnemyColor,
    };
  },
};
</script>
