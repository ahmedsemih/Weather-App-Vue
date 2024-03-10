<script setup>
import "vue3-carousel/dist/carousel.css";
import { computed, onMounted, ref } from "vue";
import { Carousel, Slide, Navigation } from "vue3-carousel";

import HourlyCard from "@/components/cards/HourlyCard.vue";

defineProps({
  hourlyForecasts: {
    type: Array,
    required: true,
  },
});

const titleRef = ref(null);
const width = ref(0);

const currentHour = new Date().getHours();

const itemsToShow = computed(() => {
  const roundedItemCount = Math.round(width.value / 100);
  return roundedItemCount % 2 === 0 ? roundedItemCount - 1 : roundedItemCount - 2;
});

onMounted(() => {
  width.value = titleRef.value.offsetWidth;
});
</script>

<template>
  <section>
    <h3 ref="titleRef" class="title">Hourly Forecasts</h3>
    <Carousel
      :items-to-show="itemsToShow"
      :items-to-scroll="Math.round(itemsToShow / 3)"
      :model-value="currentHour"
      :style="{ width: width + 'px' }"
    >
      <Slide v-for="(forecast, index) in hourlyForecasts" :key="forecast.time">
        <HourlyCard
          data-testid="hourly-card"
          :hour="forecast.time"
          :icon="forecast.condition.icon"
          :feelslike="{ c: forecast.feelslike_c, f: forecast.feelslike_f }"
          :temp="{ c: forecast.temp_c, f: forecast.temp_f }"
          :isCurrent="currentHour === index"
        />
      </Slide>
      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </section>
</template>

<style scoped>
section {
  margin-block: 0.9rem 2.6rem;
}

.title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}
</style>
