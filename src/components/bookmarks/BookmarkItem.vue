<script setup>
import { useQuery } from "vue-query";

import LocationInfo from "../sidebar/LocationInfo.vue";
import LoaderComponent from "../sidebar/LoaderComponent.vue";
import DailyForecastCard from "../cards/DailyForecastCard.vue";
import { getForecastWeather } from "@/services/weatherService";

const { locationName } = defineProps({
  locationName: String,
});

const { data, isLoading, refetch } = useQuery(
  `forecast-${locationName}`,
  () => getForecastWeather(locationName),
  { cacheTime: 1000 * 60 * 15, refetchOnWindowFocus: false }
);
</script>

<template>
  <div class="loading" v-if="isLoading">
    <LoaderComponent />
  </div>
  <div class="bookmark-item" v-else-if="data">
    <LocationInfo
      :location="data?.location"
      :refetch="refetch"
      :style="{ paddingInline: '0px !important' }"
    />
    <div class="forecasts">
      <DailyForecastCard
        v-for="(dailyForecast, index) in data?.forecast.forecastday"
        :key="index"
        :daily-forecast="dailyForecast"
        :is-today="index === 0"
        :style="{ width: '100%', backgroundColor: 'var(--bg-color-secondary)' }"
      />
    </div>
  </div>
</template>

<style scoped>
.loading {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.forecasts {
  display: flex;
  gap: 0.5rem;
}

@media (max-width: 1440px) {
  .forecasts {
    flex-wrap: wrap;
  }
}

@media (max-width: 768px) {
  .forecasts {
    flex-direction: column;
  }
}
</style>
