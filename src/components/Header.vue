<script setup>
import { ref } from 'vue'

//const awesome = ref(true)
//const list1items = ref(false)

/*
function toggle() {
  console.log('toogle!')
  var checkList = document.getElementById('list1items');
  //awesome.value = !awesome.value
  //x.style.display = 'block';
  if (checkList.classList.contains('visible')) {
    checkList.classList.remove('visible');
  }
  else {
    checkList.classList.add('visible');
  }
}
*/

function toggle () {
  this.active = !this.active
}
</script>


<!--<template>
  <div id="header">
    <button @click="toggle">Toggle</button>
    <div ref="thediv" v-if="active">
      Menu
    </div>
  </div>
</template>-->

<template>
  <div id="header">
    <button @click="toggle">toggle</button>
    <span class="anchor">Select Fruits</span>
    <div id="list1" class="dropdown-check-list" tabindex="100">
      <ul id="list1items" class="items">
        <li><input type="checkbox" />Apple </li>
        <li><input type="checkbox" />Orange</li>
        <li><input type="checkbox" />Grapes </li>
        <li><input type="checkbox" />Berry </li>
        <li><input type="checkbox" />Mango </li>
        <li><input type="checkbox" />Banana </li>
        <li><input type="checkbox" />Tomato</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
#header {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  font-size: 50px;
}
.dropdown-check-list {
  display: inline-block;
}

.dropdown-check-list .anchor {
  position: relative;
  cursor: pointer;
  display: inline-block;
  padding: 5px 50px 5px 10px;
  border: 1px solid #ccc;
}

.dropdown-check-list .anchor:after {
  position: absolute;
  content: "";
  border-left: 2px solid black;
  border-top: 2px solid black;
  padding: 5px;
  right: 10px;
  top: 20%;
  -moz-transform: rotate(-135deg);
  -ms-transform: rotate(-135deg);
  -o-transform: rotate(-135deg);
  -webkit-transform: rotate(-135deg);
  transform: rotate(-135deg);
}

.dropdown-check-list .anchor:active:after {
  right: 8px;
  top: 21%;
}

.dropdown-check-list ul.items {
  padding: 2px;
  display: none;
  margin: 0;
  border: 1px solid #ccc;
  border-top: none;
}

.dropdown-check-list ul.items li {
  list-style: none;
}

.dropdown-check-list.visible .anchor {
  color: #0094ff;
}

.dropdown-check-list.visible .items {
  display: block;
}
</style>