<template>
  <GridLayout
    class="action-bar"
    verticalAlignment="middle"
    height="56"
    width="100%"
    columns="*, 48"
  >
    <Label
      col="0"
      class="action-bar_title"
      verticalAlignment="middle"
      :text="$t('lang.components.actionBar.title')"
    />
    <Icon
      col="1"
      class="action-bar_search-button m-r-64"
      :name="searchBarIcon"
      :rippleDuration="300"
      :rippleOpacity="0.2"
      :iconColor="searchBarColor"
      @on-tap="onSearchLocations"
    />
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'
import { getVisibility, toggleVisibility } from '@/composables/useComponent'

import Icon from '@/components/UI/Icon.vue'

export default Vue.extend({
  name: 'MainActionBar',
  components: {
    Icon,
  },

  data() {
    return {
      searchBarIcon: 'res://ic_search_white_24dp',
      enabledColor: 'white',
      disabledColor: '#03dfcc',
    }
  },

  computed: {
    isVisibleSearchBar() {
      return getVisibility('searchBar')
    },

    searchBarColor(): string {
      return this.isVisibleSearchBar ? this.disabledColor : this.enabledColor
    },
  },

  methods: {
    onSearchLocations(): void {
      toggleVisibility('searchBar')
    },
  },
})
</script>

<style lang="scss" scoped>
@import '../../app-variables';

.action-bar_menu-button {
  margin-left: 4;
}

.action-bar_title {
  margin-left: 20;
  font-weight: 700;
  font-size: $font-sz-l;
  background-color: $primary-variant;
  color: $onPrimary;
}

.action-bar_overflowMenu-button {
  margin-right: 4;
}
</style>
