<template>
  <div class="header_main_div">
    <div class="header_logo_div">
      <p>{{ props.inputVal ? props.inputVal : "New Delhi, IN" }}</p>
    </div>

    <div class="input_div">
      <input @input="debounceInput" placeholder="Search City ..." />
      <div v-show="showSuggestions">
        <div v-if="suggestions.length >= 1" class="city_list">
          <ul>
            <li v-for="city in suggestions" :key="city">
              <span v-on:click="() => handleSuggestionClick(city)">{{
                city
              }}</span>
            </li>
          </ul>
        </div>
        <div v-else class="city_list">
          <ul>
            <li>
              <span>City not found</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, ref } from "vue";
import "./../css/header.css";

const props = defineProps(["inputVal", "apiKey"]);
const emit = defineEmits(["update:inputVal"]);
const timeout = ref(null);
const suggestions = ref([]);
const showSuggestions = ref(false);

const fetchCitySuggestions = async (query) => {
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${props.apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const cities = data.map(
      (city) => `${city.name}, ${city.country}`
    );
    suggestions.value = cities;
    showSuggestions.value = true;
  } catch (error) {
    console.error("Error fetching city suggestions:", error);
  }
};

const debounceInput = (event) => {
  clearTimeout(timeout.value);
  timeout.value = setTimeout(() => {
    if (event.target.value.length >= 3) {
      fetchCitySuggestions(event.target.value);
    }
  }, 1000);
};

const handleSuggestionClick = (suggestions) => {
  emit("update:inputVal", suggestions);
  showSuggestions.value = false;
};
</script>
