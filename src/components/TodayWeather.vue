<template>
  <div class="todayData_div">
    <div v-if="isloading" class="skeleton_loader">
      <div class="skeleton today_data_header_skeleton"></div>
      <div class="skeleton today_data_weather_skeleton"></div>
      <div class="skeleton today_data_table_skeleton"></div>
    </div>

    <div v-else class="todaydata_inner_div">
      <div class="today_data_header_div">
        <p>
          Current weather (<b>{{ todayData.name }}</b
          >)
        </p>
        <p>{{ convertTimestamp(todayData.dt) }}</p>
      </div>

      <div class="today_data_weather_div">
        <div class="today_data_weather_left_div">
          <div class="today_data_weather_img_div">
            <img
              :src="`https://openweathermap.org/img/wn/${todayData.weather?.[0]?.icon}@4x.png`"
              alt="Weather Icon"
            />
          </div>
          <p class="today_data_weather_left_main_temp">
            {{
              tempUnit === "Cel"
                ? todayData.main.temp.toFixed(0)
                : celsiusToFahrenheit(todayData.main.temp).toFixed(0)
            }}°
          </p>
          <div class="today_data_weather_temp_unit_div">
            <p
              v-on:click="$emit('update:tempUnit', 'Cel')"
              :class="
                props.tempUnit === 'Cel'
                  ? 'today_data_weather_temp_unit_active'
                  : 'today_data_weather_temp_unit_inactive'
              "
            >
              C
            </p>
            <p
              v-on:click="$emit('update:tempUnit', 'Fah')"
              :class="
                props.tempUnit === 'Fah'
                  ? 'today_data_weather_temp_unit_active'
                  : 'today_data_weather_temp_unit_inactive'
              "
            >
              F
            </p>
          </div>
        </div>
        <div class="today_data_weather_right_div">
          <p>Real Feel: {{ todayData.main.feels_like.toFixed(0) }}°</p>
          <p>{{ todayData.weather[0].description }}</p>
        </div>
      </div>
      <p class="today_data_main_description">{{ todayData.weather[0].main }}</p>

      <div class="today_data_table_div">
        <table class="today_data_table">
          <tr>
            <td><i class="fas fa-temperature-high"></i> Max temp:</td>
            <td>{{ todayData.main.temp_max }}°</td>
          </tr>
          <tr>
            <td><i class="fas fa-temperature-low"></i> Min temp:</td>
            <td>{{ todayData.main.temp_min }}°</td>
          </tr>
          <tr>
            <td><i class="fas fa-wind"></i> Wind Gusts:</td>
            <td>
              {{ getWindDirection(todayData.wind.deg) }}
              {{ todayData.wind.speed }} km/h
            </td>
          </tr>
          <tr>
            <td><i class="fas fa-tint"></i> Humidity:</td>
            <td>{{ todayData.main.humidity }}%</td>
          </tr>
          <tr>
            <td><i class="fas fa-eye"></i> Visibility:</td>
            <td>{{ todayData.visibility / 1000 }} km</td>
          </tr>
        </table>

        <table class="today_data_table">
          <tr>
            <td><i class="fas fa-flag"></i> Country:</td>
            <td>{{ todayData.sys.country }}</td>
          </tr>
          <tr>
            <td><i class="fas fa-sun"></i> Sunrise:</td>
            <td>{{ convertTimestamp(todayData.sys.sunrise) }}</td>
          </tr>
          <tr>
            <td><i class="fas fa-moon"></i> Sunset:</td>
            <td>{{ convertTimestamp(todayData.sys.sunset) }}</td>
          </tr>
          <tr>
            <td><i class="fas fa-globe"></i> Latitude:</td>
            <td>{{ todayData.coord.lat }}</td>
          </tr>
          <tr>
            <td><i class="fas fa-map-marker-alt"></i> Longitude:</td>
            <td>{{ todayData.coord.lon }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import "./../css/TodayWeather.css";

import {
  convertTimestamp,
  getWindDirection,
  celsiusToFahrenheit,
} from "@/utils";

const props = defineProps(["inputVal", "apiKey", "tempUnit"]);
const emit = defineEmits(["update:tempUnit"]);
const isloading = ref(true);
const todayData = ref({});

const fetchWeatherData = async () => {
  isloading.value = true;
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${props.inputVal}&units=metric&appid=${props.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      todayData.value = data;
    } else {
      console.error("Error fetching data:", data.message);
    }
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    isloading.value = false;
  }
};

watch(() => props.inputVal, fetchWeatherData, { immediate: true });
</script>
