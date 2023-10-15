<script setup>
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'
import { ref, watch, inject, onMounted, watchEffect } from 'vue'

const emitter = inject('emitter');
const store = useCounterStore()
const {
  plants,
  mapStyle,
  firstFrostLayers,
} = storeToRefs(store)

const props = defineProps({
  msg: {
    type: String,
    required: false
  },
  sources: {
    type: Array,
    required: false
  },
  mapStyle: {
    required: false,
    //default: 'mapbox://styles/mapbox/outdoors-v12'
  }
})

let map = ref(null)
let loaded = false
let currentLayers = {}
let currentSources = {}

function initialize() {
  mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN
  map = new mapboxgl.Map({
    container: 'map', // container ID
    // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
    style: 'mapbox://styles/mapbox/' + mapStyle.value,
    //center: [-68.137343, 45.137451], // starting position
    center: [-122.99375, 50.09776],
    zoom: 5 // starting zoom
  });
}

function addSource(id, source) {
  map.addSource(id, {"type": "geojson", "data": source})
}

function removeSource(id) {
  map.removeSource(id)
}

function addLayer(options) {
  currentLayers[options.id] = options
  map.addLayer(options)
}

function removeLayer(layerId, permanently = true) {
  map.removeLayer(layerId)
  if (permanently) {
    delete currentLayers[layerId]
  }
}

function setStyle(styleId) {
  map.setStyle('mapbox://styles/mapbox/' + styleId)
}

async function fetchLayers() {
  //await store.fetchFirstFrost()
  //await store.fetchPlants()
  await store.fetchAll()
}

emitter.on('draw-layer', (options) => {
  console.log(options)
  console.log('map drawing layer')
  addLayer(options)
})

emitter.on('remove-layer', (layerId) => {
  console.log('remove-layer event received')
  removeLayer(layerId)
})

onMounted(() => {
  console.log('Map.vue mounted!');
  initialize()

  map.on('load', () => {
    loaded = true
    fetchLayers()
    console.log('map loaded')
  })

})

watch(mapStyle, async (current, previous) => {
  /*
  ** Hacky way to switch map styles without losing drawn layers
  ** for more info see issue
  ** https://github.com/mapbox/mapbox-gl-js/issues/2058#issuecomment-633203130
  */
  // new map style selected
  // remove all layers
  Object.keys(currentLayers).map((layerId) => {
    removeLayer(layerId, false)
  })
  // remove all sources
  firstFrostLayers.value.map((layer) => {
    //let layerId = 'ff' + layer.name.replace(' ', '').toLowerCase()
    removeSource(layer.id)
  })
  // set new map style
  setStyle(current)
  setTimeout(() => {
    // add back sources
    firstFrostLayers.value.map((layer) => {
      //let layerId = 'ff' + layer.name.replace(' ', '').toLowerCase()
      addSource(layer.id, layer)
    })
    // add back layers
    Object.keys(currentLayers).map((layerId) => {
      addLayer(currentLayers[layerId])
    })
  }, 250);
})

watch(firstFrostLayers, async (current, previous) => {
  if (previous.length > 0) {
    // update existing
    // maybe diff the two arrays here to see if there are additions/deletions
    current.map(
      (layer) => {
        //var id = 'ff'+layer.name.replace(' ', '').toLowerCase()
        map.getSource(layer.id).setData(layer)
        //addSource()
      }
    )
  }
  else {
    //console.log('no previous')
    // add current
    current.map(
      (layer) => {
        
        //var id = 'ff'+layer.name.replace(' ', '').toLowerCase()
        //console.log(layer)
        //console.log(`id: ${id}`)
        //console.log('addSource')
        addSource(layer.id, layer)
      }
    )
  }
})

watch(plants, async (current, previous) => {
  current.map(
    (layer) => {
      //var id = 'p' + layer.name.replace(' ', '').toLowerCase()
      //console.log(layer)
      //console.log(`id: ${id}`)
      //console.log('addSource')
      addSource(layer.id, layer)
    }
  )
})

</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

#map {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 100%;
}
</style>
