<script setup>
import { ref, inject } from 'vue'
import { storeToRefs } from 'pinia'
import { useCounterStore } from '@/stores/counter'

const emitter = inject('emitter');
const store = useCounterStore()
//const count = ref(0)
//const { alert } = storeToRefs(alertStore);
const { count } = storeToRefs(store)

function emitMyEvent() {
  emitter.emit('my-event', {'eventContent': 'String changed'})
}
</script>

<template>
  <!--<button @click="store.increment()">You clicked me {{ count }} times.</button>-->
  <button v-on:click="emitMyEvent">You clicked me {{ count }} times</button>
</template>
