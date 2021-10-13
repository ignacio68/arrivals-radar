<template>
  <GridLayout
    id="searchBar"
    ref="searchBar"
    columns="56, *, 56"
    height="56"
    :backgroundColor="searchBarBackGroundColor"
    :elevation="searchBarElevation"
  >
    <Image
      class="search-icon"
      col="0"
      width="24"
      height="24"
      :tintColor="iconColor"
      src="res://ic_search_white_24dp"
    />
    <TextField
      ref="textfield"
      v-model="searchedString"
      class="search-text"
      col="1"
      :width="textFieldWidth"
      verticalAlignment="center"
      :backgroundColor="searchBarBackGroundColor"
      :color="textColor"
      :fontSize="textFontSize"
      :isEnabled="true"
      :editable="true"
      keyboardType="url"
      returnKeyType="search"
      :hint="hint"
      :maxLength="maxLengthText"
      :text="searchedString"
      :autocorrect="false"
      @returnPress="onSubmit"
      @textChange="onTextChange"
      @focus="onFocus"
    />
    <Image
      class="remove-icon"
      width="24"
      height="24"
      col="2"
      :tintColor="iconColor"
      src="res://ic_clear_white_24dp"
      @tap="onClear"
    />
  </GridLayout>
</template>

<script lang="ts">
import Vue from 'nativescript-vue'

import { Elevation } from '@/types'

export default Vue.extend({
  name: 'CustomSearchBar',
  props: {
    borderRadius: {
      type: [String, Number],
      default: 0,
    },
    searchBarBackGroundColor: {
      type: String,
      default: 'transparent',
    },
    searchBarBorderColor: {
      type: String,
      default: 'red',
    },
    searchBarBorderWidth: {
      type: [String, Number],
      default: 1,
    },
    iconColor: {
      type: String,
      default: 'black',
    },
    textFieldWidth: {
      type: Number,
      default: 200,
    },
    textColor: {
      type: String,
      default: 'black',
    },
    textFontSize: {
      type: Number,
      default: 16,
    },
    hint: {
      type: String,
      default: 'Search...',
    },
    maxLengthText: {
      type: Number,
      default: 200,
    },
  },
  data() {
    return {
      searchedString: '',
      searchBarElevation: Elevation.SEARCH_BAR_RESTING,
    }
  },

  watch: {},

  methods: {
    onTextChange() {
      console.log(`CustomSearchBar.vue::onTextChange: ${this.searchedString}`)
      this.$emit('on-text-change', this.searchedString)
    },

    onSubmit() {
      console.log(`CustomSearchBar.vue::onSubmit: ${this.searchedString}`)
      this.$emit('on-submit', this.searchingString)
    },

    onClear() {
      console.log('CustomSearchBar.vue::onClear()')
      this.searchedString = ''
      this.$emit('on-clear')
    },

    onFocus() {
      console.log('CustomSearchBar.vue::onFocus()')
    },
  },
})
</script>

<style lang="scss" scoped>
// @import '../../app-variables';

// .searchBar {
//   border-color: $primary-light;
//   &[text] {
//     padding-left: 8;
//     color: $primary-variant;
//     vertical-align: center;
//     font-size: $font-sz-l;
//   }
// }
.search-icon .remove-icon {
  margin: 16;
  width: 24;
  height: 24;
}

.search-text {
  margin: {
    top: 8;
    bottom: 8;
    left: 0;
    right: 0;
  }
}
</style>
