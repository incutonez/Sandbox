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
      <BaseCard
        title="Screen Coordinates"
        class="bp-2 horizontal"
      >
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
      <BaseCard
        title="Colors"
        class="bp-2 horizontal"
      >
        <FieldComboBox
          v-model="record.GroundColor"
          label="Ground"
          label-width="auto"
          class="bp-2"
          :options="WorldColors"
          width="w-28"
        />
        <FieldComboBox
          v-model="record.AccentColor"
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
  FieldNumber,
  BaseLabel,
} from "@incutonez/core-ui";
import BaseCard from "ui/components/BaseCard.vue";
import { Items } from "ui/classes/enums/Items.js";
import { Enemies } from "ui/classes/enums/NPCs.js";

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
    BaseLabel,
    FieldNumber,
  },
  setup() {
    const fileInputEl = ref(null);
    const contextMenu = ref(null);
    const theDialog = ref(null);
    const selectedCell = ref(null);
    const grid = ref(null);
    const isTransition = computed(() => selectedCell.value?.tile.isTransition);
    const selectedTile = computed(() => selectedCell.value?.tile);
    const selectedItem = computed(() => selectedCell.value?.item);
    const selectedEnemy = computed(() => selectedCell.value?.enemy);
    const showColors = computed(() => !isTransition.value && selectedCell.value.tile.hasImage());
    const state = reactive({
      showGridLines: true,
      record: Grid.initialize(11, 16),
    });
    provide("pressedKeys", useKeyboardMouseProvider());

    function getCellColor() {
      return WorldColors.findRecord(state.record.GroundColor)?.backgroundStyle;
    }

    function onUpdateTileColor() {
      selectedTile.value.updateImage();
    }

    function onUpdateEnemyColor() {
      selectedEnemy.value.updateImage();
    }

    // We have to have this because we do cell replacements, which requires us doing some deep copying here
    // TODO: Is there a better way of doing this?
    // TODO: Make this an actual store?
    const store = computed(() => [...state.record.cells]);

    function onReplaceCell({ indices, replacement }) {
      if (!isArray(indices)) {
        indices = [indices];
        // Make sure we update the selection with the replacement
        selectedCell.value = replacement;
      }
      indices.forEach((idx) => {
        const record = state.record.cells[idx];
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
        state.record.cells[idx] = clone;
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
      // TODO: Move this logic to a utility function
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
      selectedTile,
      selectedItem,
      selectedEnemy,
      store,
      selectedCell,
      showColors,
      getCellColor,
      WorldColors,
      ScreenTemplates,
      Tiles,
      Items,
      Enemies,
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
