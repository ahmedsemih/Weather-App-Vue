<script setup>
import { useUnitStore } from "@/stores/unit";
import PropCard from "../cards/PropCard.vue";

const unitStore = useUnitStore();
defineProps({
  current: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="weather-info">
    <div class="current-weather">
      <div class="temp-area">
        <h2 class="condition">{{ current.condition.text }}</h2>
        <div class="temps">
          <div class="temp">
            <p class="temp-value" aria-label="current temperature">
              {{
                unitStore.unit === "celsius"
                  ? `${Math.round(current.temp_c)}`
                  : `${Math.round(current.temp_f)}`
              }}
              <span class="temp-unit">{{
                unitStore.unit === "celsius" ? "°C" : "°F"
              }}</span>
            </p>
            <p class="temp-name">Temperature</p>
          </div>
          <div class="temp">
            <p class="temp-value" aria-label="current feels like">
              {{
                unitStore.unit === "celsius"
                  ? `${Math.round(current.feelslike_c)}`
                  : `${Math.round(current.feelslike_f)}`
              }}
              <span class="temp-unit">{{
                unitStore.unit === "celsius" ? "°C" : "°F"
              }}</span>
            </p>
            <p class="temp-name">Feels Like</p>
          </div>
        </div>
      </div>
    </div>
    <div class="other-props">
      <PropCard name="Humidity" :value="current.humidity" unit="%" />
      <PropCard name="Wind Speed" :value="current.wind_kph" unit="km/h" />
      <PropCard name="Pressure" :value="current.pressure_mb" unit="mb" />
    </div>
  </div>
</template>

<style scoped>
.weather-info {
  padding-block: 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  height: 100%;
}

.top-area {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding-inline: 0.5rem;
}

.buttons {
  display: flex;
  gap: 1rem;
}

.buttons > button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  transition: all 200ms;
  scale: 1.2;
}

.buttons > button:hover {
  color: var(--primary-color);
  background-color: none;
}

.current-weather {
  display: flex;
  gap: 1rem;
  align-items: center;
  width: 100%;
}

.title {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.temp-area {
  width: 100%;
  padding-inline: 0.5rem;
}

.condition {
  text-transform: capitalize;
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.temps {
  display: flex;
  width: 100%;
  gap: 1rem;
  justify-content: space-between;
}

.temp {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.temp-value {
  font-size: 5rem;
  display: flex;
  align-items: start;
  gap: 0.2rem;
}

.temp-name {
  font-size: 1rem;
}

.temp-unit {
  font-size: 1.5rem;
  font-weight: 500;
  padding-top: 0.5rem;
}

.other-props {
  display: flex;
  gap: 1rem;
  justify-content: space-between;
  padding-inline: 0.5rem 0.5rem;
}
</style>
