<template>
  <div class="forecast_Data_div">
    <div v-if="isloading"  class="skeleton_loader">
        <div v-for="n in 3" :key="n" class="skeleton today_data_table_skeleton">
    </div>
    </div>

    <ul class="forecast_data_ul" v-else>
        <p class="forecast_data_heading">5 - Day Weather Forecast</p>
      <li v-for="forecast of forecastData" :key="forecast.name">
        <div class="forecast_data_inner_div">
          <div class="forecast_data_weather_div">
            <div class="forecast_data_weather_left_div">
              <div>
                <p>{{ getWeekday(forecast.dt) }}</p>
                <p>{{ formatDate(forecast.dt_txt) }}</p>
              </div>
              <div class="forecast_data_weather_img_div">
                <img
                  :src="`https://openweathermap.org/img/wn/${forecast.weather?.[0]?.icon}@4x.png`"
                  alt="Weather Icon"
                />
              </div>
              <p class="forecast_data_weather_left_main_temp">
                {{
                  tempUnit === "Cel"
                    ? forecast.main.temp.toFixed(0)
                    : celsiusToFahrenheit(forecast.main.temp).toFixed(0)
                }}°
              </p>
            </div>
            <div class="forecast_data_weather_right_div">
              <p><i class="fas fa-tint"></i> {{ forecast.main.humidity }}%</p>
            </div>
          </div>
          <p class="forecast_data_main_description">
            {{ forecast.weather[0].description }}
          </p>

          <div class="forecast_data_table_div">
            <table>
              <tr>
                <td><i class="fas fa-wind"></i> Wind Gusts:</td>
                <td>
                  {{ getWindDirection(forecast.wind.deg) }}
                  {{ forecast.wind.speed }} km/h
                </td>
              </tr>

              <tr>
                <td><i class="fas fa-eye"></i> Visibility:</td>
                <td>{{ forecast.visibility / 1000 }} km</td>
              </tr>
            </table>

            <table>
              <tr>
                <td><i class="fas fa-temperature-high"></i> Max temp:</td>
                <td>{{
                    tempUnit === "Cel"
                      ? forecast.main.temp_max.toFixed(0)
                      : celsiusToFahrenheit(forecast.main.temp_max).toFixed(0)
                  }}°</td>
              </tr>
              <tr>
                <td><i class="fas fa-temperature-low"></i> Min temp:</td>
                <td>{{
                    tempUnit === "Cel"
                      ? forecast.main.temp_min.toFixed(0)
                      : celsiusToFahrenheit(forecast.main.temp_min).toFixed(0)
                  }}°</td>
              </tr>
            </table>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref, watch } from "vue";
import "./../css/ForecastWeather.css";

import {
  convertTimestamp,
  getWindDirection,
  formatDate,
  getWeekday,
  celsiusToFahrenheit,
} from "@/utils";

const props = defineProps(["inputVal", "apiKey", "tempUnit"]);
const emit = defineEmits(["update:tempUnit"]);
const isloading = ref(true);
const forecastData = ref([]);

const fetchWeatherData = async () => {
  isloading.value = true;
  try {
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${props.inputVal}&units=metric&appid=${props.apiKey}`;
    const response = await fetch(url);
    const data = await response.json();

    const dailyData = [];
    const dayCount = {};
    data.list.forEach((item) => {
      const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
        weekday: "short",
        day: "numeric",
      });
      if (!dayCount[date]) {
        dayCount[date] = true;
        dailyData.push(item);
      }
    });

    forecastData.value = dailyData.slice(1, 6);
  } catch (err) {
    console.error("Fetch error:", err);
  } finally {
    isloading.value = false;
  }
};

watch(() => props.inputVal, fetchWeatherData, { immediate: true });
</script>
