<script setup>
import { ref, watch } from "vue";
import { useQuery } from "vue-query";

import Searchbar from "./SearchBar.vue";
import WeatherInfo from "./WeatherInfo.vue";
import LocationInfo from "./LocationInfo.vue";
import { useSearchStore } from "@/stores/search";
import WeatherForecast from "./WeatherForecast.vue";
import LoaderComponent from "./LoaderComponent.vue";
import { getForecastWeather } from "@/services/weatherService";

const searchStore = useSearchStore();
const enabled = ref(false);

const { isIdle, isLoading, isError, data, refetch } = useQuery(
  "forecast",
  () => getForecastWeather(searchStore.search),
  {
    enabled,
    cacheTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
    onSuccess: (data) => {
      searchStore.addToHistory(data.location.name);
    },
  }
);

watch(() => searchStore.search, (newSearch) => {
    enabled.value = newSearch !== "";
    refetch.value();
  }
);
</script>

<template>
  <aside>
    <Searchbar />
    <p class="message" v-if="isIdle" aria-label="idle message">
      Please search for the location where you want to know the weather.
    </p>
    <div v-else-if="isLoading" class="loading">
      <LoaderComponent />
    </div>
    <p v-else-if="isError" class="message" aria-label="error message">
      Somethings went wrong. Please try again.
    </p>
    <div v-else-if="!data.forecast">
      <p class="message" aria-label="not found message">
        The location "{{ searchStore.search }}" was not found.
      </p>
      <div v-if="searchStore.history.length > 0">
        <span class="message">You can try these:</span>
        <div class="suggestions">
          <button
            @click="searchStore.setSearch(historyItem)"
            v-for="historyItem in searchStore.history"
            :key="historyItem"
          >
            {{ historyItem }}
          </button>
        </div>
      </div>
    </div>
    <div v-else>
      <LocationInfo :location="data?.location" :refetch="refetch" />
      <WeatherInfo :current="data?.current" />
      <WeatherForecast :daily-forecasts="data?.forecast.forecastday" />
    </div>
  </aside>
</template>

<style scoped>
aside {
  width: 100%;
  background-color: var(--bg-color-secondary);
  border-top-left-radius: 2rem;
  border-bottom-left-radius: 2rem;
  padding: 2rem;
}

.message {
  margin-block: 2rem 1rem;
  margin-left: 0.5rem;
  font-size: 1rem;
}

.loading {
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.suggestions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

.suggestions > button {
  padding: 0.5rem 1rem;
  border-radius: 1rem;
  background-color: var(--bg-color-secondary);
  color: var(--text-color);
  border: 1px solid var(--text-color-soft);
  cursor: pointer;
  transition: all 200ms;
  font-size: 1rem;
}

.suggestions > button:hover {
  background-color: var(--primary-color);
  color: var(--bg-color);
}

@media (max-width: 500px) {
  aside {
    padding: 1rem;
    border-radius: 0;
  }
}
</style>
