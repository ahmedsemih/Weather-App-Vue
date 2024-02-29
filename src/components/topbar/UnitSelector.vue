<script setup>
import { ref } from "vue";
import { useUnitStore } from "@/stores/unit";

const unitStore = useUnitStore();
const currentUnit = ref(unitStore.unit);

const handleClickUnit = (unit) => {
  currentUnit.value = unit;
  unitStore.setUnit(unit);
};
</script>

<template>
  <div data-testid="unitSelector" class="selector">
    <button
      id="celsius"
      title="Celsius"
      :class="{ active: currentUnit === 'celsius' }"
      @click="handleClickUnit('celsius')"
    >
      <v-icon scale="1.5" name="ri-celsius-line" />
    </button>
    <button
      id="fahrenheit"
      title="Fahrenheit"
      :class="{ active: currentUnit === 'fahrenheit' }"
      @click="handleClickUnit('fahrenheit')"
    >
      <v-icon scale="1.5" name="ri-fahrenheit-line" />
    </button>
    <div class="selection"></div>
  </div>
</template>

<style scoped>
.selector {
  display: flex;
  gap: 0.5rem;
  position: relative;
}

.selector button {
  background-color: transparent;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 100%;
  transition: all 200ms;
  position: relative;
  z-index: 100;
}

#celsius.active ~ .selection {
  animation-name: move-left;
}

#fahrenheit.active ~ .selection {
  animation-name: move-right;
}

.selection {
  top: 0px;
  position: absolute;
  background-color: var(--primary-color);
  width: 44.8px;
  height: 44.8px;
  border-radius: 100%;
  animation: move-left 300ms forwards;
}

.active {
  color: var(--bg-color);
  animation: change-color 300ms forwards;
}

@keyframes move-right {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(115%);
  }
}

@keyframes move-left {
  0% {
    transform: translateX(115%);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes change-color {
  0%,
  40% {
    color: var(--text-color);
  }
  41%,
  100% {
    color: var(--bg-color);
  }
}
</style>
