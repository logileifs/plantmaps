<script setup>
import { ref, onMounted, watchEffect } from 'vue'

import LayerListItem from './LayerListItem.vue'

//defineProps(['title'])
const props = defineProps({
  layers: Object,
  startChecked: {
    default:false 
  }
})

onMounted(async () => {
  console.log('LayerList mounted')
})

watchEffect(async () => {})
</script>

<template>
  <ul v-if="layers" class="layer-list">
    <LayerListItem
        v-for="layer in layers"
        :layer="layer"
        :key="layer.name"
        :title="layer.name"
        :start-checked="props.startChecked"
      ></LayerListItem>
  </ul>
</template>

<style scoped>
.layer-list {
  list-style-type: none;
  padding-inline-start: 5%;
}
</style>