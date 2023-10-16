<script setup>
import { ref, inject, onMounted, watchEffect } from 'vue'

const emitter = inject('emitter');
const props = defineProps({
  layer: Object,
  startChecked: {
    default: false
  }
})
const input = ref(null)
let itemColor = ref('rgb(255, 0, 0)')  // maybe select a random color here???

function drawItem() {
  //let color = props.layer.color ? props.layer.color : 'rgb(255,0,0)'
  // layer is selected and should be drawn
  emitter.emit('draw-layer', {
    'id': props.layer.id,
    'type': 'fill',
    'source': props.layer.id,
    'layout': {},
    'paint': {
      'fill-color': itemColor.value,
      'fill-opacity': 0.5
    }
  })
}

onMounted(async () => {
  if (props.layer.color) {
    itemColor.value = props.layer.color
  }
  console.log(`itemColor: ${itemColor}`)
  console.log(props.layer)
  console.log('LayerListItem.vue mounted')
  if (props.startChecked) {
    drawItem()
    input.value.checked = true
  }
})

watchEffect(async () => {})

function emitMyEvent() {
  if (input.value.checked) {
    drawItem()
    console.log('draw-layer event fired')
  }
  else {
    // layer is deselected and should be removed
    emitter.emit('remove-layer', props.layer.id)
    console.log('remove-layer event fired')
  }
}
</script>

<template>
  <li class="layer-list-item" :id="'li'+props.layer.id">
    <label class="container">
      <span class="main-text">{{ layer.name }}</span>
      <span class="details">{{ props.layer.details }}</span>
      <input ref="input" v-on:click="emitMyEvent" type="checkbox">
      <span v-if="props.layer.details" class="checkmark"></span>
    </label>
  </li>
</template>

<style scoped>
/*.layer-list-item {
  background-color: v-bind(props.layer.color);
}*/

/*label:hover {
  text-decoration: underline;
  opacity: 25%;
  cursor: pointer;
}*/

span {
  display: flex;
}

.main-text {
  width: 100%;
}

.details {
  width: 100%;
  font-size: 10px;
}

/* Customize the label (the container) */
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  padding-left: 24%;
  margin-bottom: 0;
  cursor: pointer;
  font-size: 14px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  /*top: 0;*/
  left: 0;
  height: 20px;
  width: 20px;
  background-color: v-bind(itemColor);
}

/* On mouse-over, add a grey background color */
.container:hover input ~ .checkmark {
  background-color: v-bind(itemColor);
}

/* When the checkbox is checked, add a blue background */
.container input:checked ~ .checkmark {
  background-color: v-bind(itemColor);
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 35%;
  top: 20%;
  width: 30%;
  height: 50%;
  border: solid gray;
  border-width: 0 3px 3px 0;
  border-color: black;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
  /*box-shadow: 0px 0px 1px white;*/
}
</style>