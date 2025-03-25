<template>
  <div class="header_main_div">
    <div class="header_logo_div">
      <p> {{props.inputVal ? props.inputVal : 'New Delhi, IN'}}</p>
    </div>

    <div class="input_div">
      <input
        @input="debounceInput"
        placeholder="Search City ..."
      />
      <div v-show="showSuggestions">
        <div v-if="suggestions.length >= 1" class="city_list">
          <ul>
            <li v-for="suggestions in suggestions" :key="suggestions">
              <span v-on:click="() => handleSuggestionClick(suggestions)">{{
                suggestions
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
import { defineProps, defineEmits, watch, onMounted } from "vue";
import { ref } from "vue";

const props = defineProps(["inputVal", "apiKey"]);
const emit = defineEmits(["update:inputVal"]);
const timeout = ref(null);
const suggestions = ref([]);
const showSuggestions = ref(false);

const fetchCitySuggestions = async (query) => {
  if (query.length > 2) {
    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=10&appid=${props.apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
      
      const cities = data.map((city) => `${city.name}, ${city.state}, ${city.country}`);
      suggestions.value = cities;
      showSuggestions.value = true;
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
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

<style scoped>
.header_main_div {
  width: 100%;
  height: 50px;
  background-color: rgb(31, 31, 31);
  position: sticky;
  top: 0;
  margin-bottom: 30px;
  padding: 0 50px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}

.header_logo_div > p {
  color: rgb(222, 112, 28);
  font-size: 24px;
}

.input_div {
  position: relative;
}

.input_div > input {
  padding: 6px 10px;
  border: 1px solid rgb(222, 112, 28);
  background-color: rgb(228, 234, 242);
  border-radius: 4px;
  outline: none;
  color: black;
}

.city_list {
  width: 180px;
  position: absolute;
  background-color: #fff;
  margin-top: 6px;
  padding: 6px 0;
  border-radius: 4px;
}

.city_list > ul > li {
  list-style: none;
  padding: 4px 6px;
  border-bottom: 1px solid #ddd;
  color: gray;
  cursor: pointer;
}

.city_list > ul > li:hover {
  color: rgb(222, 112, 28);
}

.city_list > ul > li:last-child {
  border: none;
}
</style>
