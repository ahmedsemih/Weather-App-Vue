<script setup>
import { ref, watch } from "vue";
import { useQuery } from "vue-query";

import capitalize from "@/utils/capitalize";
import { useSearchStore } from "@/stores/search";
import { getForecastWeather } from "@/services/weatherService";
import HourlyForecast from "@/components/details/HourlyForecast.vue";
import LoaderComponent from "@/components/sidebar/LoaderComponent.vue";
import TodaysHighlights from "@/components/details/TodaysHighlights.vue";

const searchStore = useSearchStore();
const enabled = ref(false);

const { isIdle, isLoading, isError, data, refetch } = useQuery(
  [`forecast-${capitalize(searchStore.search)}`],
  () => getForecastWeather(searchStore.search),
  {
    enabled,
    cacheTime: 1000 * 60 * 15,
    refetchOnWindowFocus: false,
  }
);

watch(
  () => searchStore.search,
  (newSearch) => {
    enabled.value = newSearch !== "";
    refetch.value();
  }
);
</script>

<template>
  <div class="wrapper" v-if="isIdle && !searchStore.locationWaiting">
    <v-icon scale="10" name="wi-day-cloudy-windy" />
    <p class="message" aria-label="idle message">
      Please search a location to see weather forecasts.
    </p>
  </div>
  <div v-else-if="isLoading || searchStore.locationWaiting" class="wrapper">
    <LoaderComponent />
  </div>
  <div v-else-if="isError" class="error wrapper">
    <p class="message" aria-label="error message">
      Somethings went wrong. Please try again.
    </p>
    <button class="refresh-btn" @click="refetch()" >
      <v-icon name="md-refresh" />  
      Refresh
    </button>
  </div>
  <div class="wrapper" v-else-if="!data.forecast" >
    <v-icon scale="10" name="wi-day-fog" />
    <p class="message" aria-label="not found message">
      "{{ searchStore.search }}" was not found. Please search another location.
    </p>
  </div>
  <div v-else>
    <HourlyForecast :hourly-forecasts="data.forecast.forecastday[0].hour" />
    <TodaysHighlights
      :astro="data.forecast.forecastday[0].astro"
      :chance-of-rain="data.forecast.forecastday[0].day.daily_chance_of_rain"
      :humidity="data.forecast.forecastday[0].day.avghumidity"
      :wind="{
        degree: data.current.wind_degree,
        speed: data.current.wind_kph,
        direction: data.current.wind_dir,
      }"
      :visibility="data.forecast.forecastday[0].day.avgvis_km"
      :uv-index="data.forecast.forecastday[0].day.uv"
    />
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 90%;
  width: 100%;
  align-items: center;
  justify-content: center;
}

.error {
  gap: 1rem;
}

.refresh-btn {
  padding: 1rem 2rem;
  background-color: var(--primary-color);
  color: var(--bg-color-secondary);
  border-radius: 2rem;
  font-size: 1.2rem;
  cursor: pointer;
  border: none;
  display: flex;
  align-items: center;
  gap: .5rem;
}

.message {
  margin-block: 1rem;
  font-size: 1.5rem;
  text-align: center;
}

@media screen and (max-width: 1440px){
  .wrapper {
    padding-top: 2rem;
  }
}
</style>
