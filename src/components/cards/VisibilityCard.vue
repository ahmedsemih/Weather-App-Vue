<script setup>
import { computed } from "vue";

const props = defineProps({
  visibility: {
    type: Number,
    required: true,
  },
});

const status = computed(() => {
  const visibleKm = Number(props.visibility);

  if (visibleKm <= 0.3)
    return {
      message: "Thick Fog",
      opacity: 0.8,
    };
  if (visibleKm <= 1)
    return {
      message: "Moderate Fog",
      opacity: 0.7,
    };
  if (visibleKm <= 2)
    return {
      message: "Thin Fog",
      opacity: 0.6,
    };
  if (visibleKm <= 5)
    return {
      message: "Haze",
      opacity: 0.4,
    };
  if (visibleKm <= 10)
    return {
      message: "Light Haze",
      opacity: 0.2,
    };
  if (visibleKm <= 20)
    return {
      message: "Clear",
      opacity: 0.1,
    };

  return {
    message: "Very Clear",
    opacity: 0,
  };
});
</script>

<template>
  <div class="card">
    <h4 class="card-title">Visibility</h4>
    <div class="content">
      <div class="left">
        <p class="data">{{ visibility }} km</p>
        <p class="message">{{ status.message }}</p>
      </div>
      <div class="icon-area">
        <v-icon
          class="eye-icon"
          :style="{ opacity: 1 - status.opacity }"
          scale="3"
          name="md-removeredeye-round"
        />
        <v-icon
          class="fog-icon"
          :style="{ opacity: status.opacity }"
          scale="4"
          name="gi-fog"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.card {
  padding: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  background-color: var(--bg-color-secondary);
  width: 100%;
}

.card-title {
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
}

.content {
  display: flex;
  align-items: start;
  justify-content: space-between;
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-block: 0.5rem;
  height: 100px;
}

.data {
  font-size: 2.5rem;
}

.message {
  font-size: 1.2rem;
}

.icon-area {
  position: relative;
}

.eye-icon {
  color: var(--primary-color);
}

.fog-icon {
  position: absolute;
  bottom: -0.5rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  color: var(--text-color-soft);
}
</style>
