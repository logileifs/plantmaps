<script setup>
import { storeToRefs } from 'pinia'
import { ref, watch, onMounted } from 'vue'
import { useCounterStore } from '@/stores/counter'

import LayerList from './LayerList.vue'

const store = useCounterStore()
const { firstFrostLayers, lastFrostLayers, plants, mapStyle } = storeToRefs(store)
const props = defineProps({})

onMounted(async () => {
  console.log('firstFrost: ' + props.firstFrost)
})

watch(firstFrostLayers, async (current, previous) => {
  console.log('firstFrostLayers updated')
})

let fakeLastFrost = [
  {"name": "Fake zone 1"},
  {"name": "Fake zone 2"},
]
</script>

<template>
  <div id="sidebar">
    <div class="divider">
      <h1>Map Styles</h1>
      <input type="radio" id="satellite" value="satellite-streets-v12" v-model="mapStyle">
      <label for="satellite">Satellite</label><br>
      <input type="radio" id="outdoors" value="outdoors-v12" v-model="mapStyle">
      <label for="outdoors">Outdoors</label><br>
    </div>
    <div class="divider">
      <h1>Layers</h1>
      <span class="anchor">First Frost</span>
      <LayerList :layers="firstFrostLayers" :start-checked="true"></LayerList>
      <span class="anchor">Last Frost</span>
      <LayerList :layers="fakeLastFrost"></LayerList>
      <span class="anchor">Plants</span>
      <LayerList :layers="plants"></LayerList>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: 1.5em;
}
#sidebar {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 10%;
  z-index: 1;
  /*font-size: 50px;*/
  background-color: rgba(0, 0, 0, 0.5);
  overflow: auto;
}

.divider {
  padding-bottom: 4px;
  border-bottom-style: outset;
  border-bottom-width: 1px;
}

@media only screen and (max-device-width: 1440px){
  #sidebar {
    width: 15%;
  }
}

@media only screen and (max-device-width: 1000px){
  #sidebar {
    width: 25%;
  }
}
</style>
