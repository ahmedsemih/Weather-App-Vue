<script setup>
import moment from "moment";
import PropCard from "./PropCard.vue";
import { useUnitStore } from "@/stores/unit";

const unitStore = useUnitStore();

defineProps({
  isToday: {
    type: Boolean,
    required: true,
  },
  dailyForecast: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="card">
    <h4 class="day-name">
      {{ isToday ? "Today" : moment(dailyForecast.date).format("dddd") }}
    </h4>
    <div class="card-body">
      <img
        :src="dailyForecast.day.condition.icon"
        alt="weather-image"
        width="64"
        height="64"
      />
      <PropCard
        name="max temp"
        :unit="unitStore.unit === 'celsius' ? '°C' : '°F'"
        :value="
          unitStore.unit === 'celsius'
            ? Math.round(dailyForecast.day.maxtemp_c)
            : Math.round(dailyForecast.day.maxtemp_f)
        "
      />
      <PropCard
        name="min temp"
        :unit="unitStore.unit === 'celsius' ? '°C' : '°F'"
        :value="
          unitStore.unit === 'celsius'
            ? Math.round(dailyForecast.day.mintemp_c)
            : Math.round(dailyForecast.day.mintemp_f)
        "
      />
      <PropCard
        name="humidity"
        unit="%"
        :value="dailyForecast.day.avghumidity"
      />
    </div>
  </div>
</template>

<style scoped>
.day-name {
  margin-bottom: 0.5rem;
  margin-left: 1rem;
  font-weight: 500;
}

.card {
  background-color: var(--bg-color);
  padding: 0.5rem;
  border-radius: 1rem;
}

.card-body {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-inline: 0.5rem;
  gap: 0.5rem;
}

.prop {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.prop-value {
  font-size: 1.5rem;
  font-weight: 500;
}
.prop-name {
  font-size: 0.7rem;
}

.unit {
  font-size: 1rem;
  font-weight: 500;
}
</style>
