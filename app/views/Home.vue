<template>
  <Page
    actionBarHidden="true"
    backgroundSpanUnderStatusBar="true"
    androidStatusBarBackground="#00251e"
  >
    <!-- <ActionBar :title="$t('lang.components.actionBar.title')" flat="true" /> -->
    <GridLayout rows="auto, *">
      <MainActionBar row="0" class="action-bar" width="100%" />
      <MapWrapper row="1" height="100%" width="100%" />
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'
import MainActionBar from '@/components/UI/MainActionBar.vue'
import MapWrapper from '@/components/Map/MapWrapper.vue'
export default Vue.extend({
  name: 'Map',

  components: { MainActionBar, MapWrapper },

  data() {
    return {}
  },
})
</script>

<style scoped>
.home-panel {
  vertical-align: center;
  font-size: 20;
  margin: 15;
}

.description-label {
  margin-bottom: 15;
}
</style>
