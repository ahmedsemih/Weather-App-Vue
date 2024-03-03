<script setup>
import DailyForecastCard from "../cards/DailyForecastCard.vue";

defineProps({
  dailyForecasts: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div v-if="dailyForecasts?.length > 0" class="forecast">
    <h2 class="forecast-title">{{ dailyForecasts?.length }} Day Forecast</h2>
    <div v-for="(day, index) in dailyForecasts" :key="day.date">
      <DailyForecastCard :daily-forecast="day" :is-today="index === 0" />
    </div>
  </div>
  <div v-else class="forecast">
    <h2 class="forecast-title">Forecasts</h2>
    <p class="forecast-error">No forecast available. Please try again later.</p>
  </div>
</template>

<style scoped>
.forecast {
  display: flex;
  gap: 1rem;
  flex-direction: column;
  margin-top: 1rem;
}

.forecast-title {
  margin-left: 0.5rem;
  font-size: 1.2rem;
}

.forecast-error {
  margin-left: 0.5rem;
}
</style>
