<script setup>
import moment from "moment";
import { useUnitStore } from "@/stores/unit";

const unitStore = useUnitStore();

defineProps({
  hour: {
    type: String,
    required: true,
  },
  temp: {
    type: Object,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
  feelslike: {
    type: Object,
    required: true,
  },
  isCurrent: {
    type: Boolean,
    required: true,
  },
});
</script>

<template>
  <div data-testid="card" class="hourly-card" :class="{ current: isCurrent }">
    <p class="card-title">{{ moment(hour).format("hh:mm A") }}</p>
    <div class="card-body">
      <img
        class="card-image"
        :src="icon"
        alt="weather-icon"
        width="64px"
        height="64px"
      />
      <div>
        <p class="temp">
          {{
            unitStore.unit === "celsius"
              ? `${Math.round(temp.c)} °C`
              : `${Math.round(temp.f)} °F`
          }}
        </p>
        <p class="feels-like">
          {{
            unitStore.unit === "celsius"
              ? `${Math.round(feelslike.c)} °C`
              : `${Math.round(feelslike.f)} °F`
          }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.current {
  background-color: var(--secondary-color) !important;
}

.hourly-card {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  border-radius: 1rem;
  background-color: var(--bg-color-secondary);
  padding: 1rem;
}

.card-image {
  margin-bottom: 0.5rem;
}

.temp {
  font-weight: 500;
  font-size: 1.2rem;
}

.feels-like {
  opacity: 0.5;
  font-size: 1rem;
}
</style>
