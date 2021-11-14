<template>
  <div class="h-full w-full flex flex-col items-center">
    <div class="flex">
      <button class="core-button mr-2"
              @click="onClickPreviousButton">
        Previous Task
      </button>
      <button class="core-button"
              @click="onClickNextButton">
        Next Task
      </button>
    </div>
    <div class="w-full text-center flex flex-1 flex-col">
      <div class="text-8xl mb-16">
        <span class="title-color">Legend of Zelda: </span>
        <span class="quest-color">{{ currentQuest }} Quest</span>
      </div>
      <div class="text-7xl text-gray-400">Current Task:</div>
      <div class="text-8xl"
           :style="taskColor">{{ currentTask.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "App",
  data() {
    return {
      selectedTask: 0,
      tasks: [
        {
          name: "Candle, Blue Ring, White Sword"
        },
        {
          name: "Level 1: the Eagle",
          color: "008088"
        },
        {
          name: "Level 2: the Moon",
          color: "2038ec"
        },
        {
          name: "Level 3: the Manji",
          color: "009038"
        },
        {
          name: "Crooked Sword"
        },
        {
          name: "Level 4: the Snake",
          color: "887000"
        },
        {
          name: "Arrows, Ham"
        },
        {
          name: "Level 5: the Lizard",
          color: "00a800"
        },
        {
          name: "Level 6: the Dragon",
          color: "887000"
        },
        {
          name: "Level 7: the Demon",
          color: "00a800"
        },
        {
          name: "Level 8: the Lion",
          color: "bcbcbc"
        },
        {
          name: "Level 9: Death Mountain",
          color: "848484"
        },
        {
          name: "Candle, Blue Ring"
        },
        {
          name: "Level 1",
          color: "008088"
        },
        {
          name: "White Sword"
        },
        {
          name: "Level 2",
          color: "009038"
        },
        {
          name: "Arrows, Ham"
        },
        {
          name: "Level 3",
          color: "2038ec"
        },
        {
          name: "Level 4",
          color: "00a800"
        },
        {
          name: "Level 5",
          color: "887000"
        },
        {
          name: "Crooked Sword??"
        },
        {
          name: "Level 6",
          color: "887000"
        },
        {
          name: "Level 7",
          color: "bcbcbc"
        },
        {
          name: "Level 8",
          color: "00a800"
        },
        {
          name: "Level 9",
          color: "bdbdbd"
        }
      ]
    };
  },
  computed: {
    currentQuest() {
      return this.selectedTask > 11 ? "2nd" : "1st";
    },
    currentTask() {
      return this.tasks[this.selectedTask];
    },
    taskColor() {
      const color = this.currentTask.color;
      return color ? {
        color: `#${color}`
      } : null;
    },
  },
  methods: {
    onClickPreviousButton() {
      if (this.selectedTask === 0) {
        return;
      }
      this.selectedTask--;
    },
    onClickNextButton() {
      if (this.selectedTask >= this.tasks.length - 1) {
        return;
      }
      this.selectedTask++;
    },
  }
});
</script>

<style>
html, body, #app {
  @apply h-full bg-black text-white;
}

.title-color {
  color: #e30e12;
}

.quest-color {
  color: #bb9554;
}

.core-button {
  @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
}
</style>