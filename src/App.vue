<template>
  <div class="app_div">
     <Header :inputVal="inputVal" :apiKey="apiKey" v-model:inputVal="inputVal"/>
     <TodayWeather :inputVal="inputVal" :apiKey="apiKey" :tempUnit="tempUnit" v-model:tempUnit="tempUnit" />
     <ForecastWeather :inputVal="inputVal" :apiKey="apiKey" :tempUnit="tempUnit" v-model:tempUnit="tempUnit" />
  </div>
</template>

<script setup>
 import { ref } from 'vue';
import Header from './components/Header.vue';
 import TodayWeather from './components/TodayWeather.vue';
 import ForecastWeather from './components/ForecastWeather.vue';

 const inputVal = ref("New Delhi");
 const apiKey = ref("f5438d5fbd64d400f92db90c211e8a17");
 const tempUnit = ref("Cel");

</script>

<style scoped>
.app_div {
  width: 100%;
  min-height: 100vh;
    display: flex;
    align-items: center;
    flex-direction: column;
    background-color: rgb(228, 234, 242);
    font-family: Arial, sans-serif;
    padding-bottom: 50px;
}
</style>