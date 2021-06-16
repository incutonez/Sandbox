<template>
  <div class="app-main">
    <Navigation />
    <FlexContainer class="main-content"
                   :border="false"
                   :margin="10"
                   :direction="FlexDirections.FIT">
      <RouterView />
    </FlexContainer>
    <div class="footer"
         style="text-align: center;">Footer
    </div>
  </div>
</template>

<script lang="ts">
// Shadowing this Fiddle https://fiddle.sencha.com/#view/editor&fiddle/3e5m
import '@fontsource/open-sans';
import {defineComponent} from 'vue';
import Navigation from '@/components/Navigation.vue';
import {RouterView} from 'vue-router';
import FlexContainer from '@/components/base/FlexContainer.vue';

export default defineComponent({
  name: 'App',
  components: {
    FlexContainer,
    Navigation,
    RouterView
  }
});
</script>

<style lang="scss">
// Had to set path https://github.com/vuejs-templates/webpack/issues/1313
$fa-font-path: "~@fortawesome/fontawesome-free/webfonts";

@import "~bootstrap/scss/bootstrap";
@import "~@fortawesome/fontawesome-free/scss/fontawesome";
@import "~@fortawesome/fontawesome-free/scss/solid";
@import "~@fortawesome/fontawesome-free/scss/regular";
@import "~@fortawesome/fontawesome-free/scss/brands";

#app {
  font-family: "Open Sans", Avenir, Helvetica, Arial, sans-serif;
  color: $font-color;
  height: 100%;
  width: 100%;
}

html, body {
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
}

.app-main {
  height: 100%;
  display: grid;
  grid-template-areas:
    "t t"
    "m m"
    "b b";
  grid-template-columns: 1fr 2fr;
  grid-template-rows: auto 1fr auto;
  background-color: $app-background-color;

  .main-content {
    grid-area: m;

    > * {
      background-color: $app-background-color !important;
    }
  }

  .footer {
    grid-area: b;
  }
}
</style>
