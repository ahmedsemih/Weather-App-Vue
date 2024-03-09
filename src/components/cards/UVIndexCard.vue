<script setup>
import { computed } from "vue";

const props = defineProps({
  uvIndex: {
    type: Number,
    required: true,
  },
});

const uvProps = computed(() => {
  if (props.uvIndex <= 2)
    return {
      color: "#8EC641",
      width: "20%",
      message: "Safe",
    };

  if (props.uvIndex <= 5)
    return {
      color: "#FFCC33",
      width: "40%",
      message: "Protection required",
    };

  if (props.uvIndex <= 7)
    return {
      color: "#F7941D",
      width: "60%",
      message: "Protection essential",
    };

  if (props.uvIndex <= 10)
    return {
      color: "#E03E27",
      width: "80%",
      message: "Need shade",
    };

  return {
    color: "#8B52BD",
    width: "100%",
    message: "Don't go outside",
  };
});
</script>

<template>
  <div class="card">
    <h4 class="card-title">UV Index</h4>
    <div class="uv-bar">
      <div
        class="uv-bar-data"
        :style="{ backgroundColor: uvProps.color, width: uvProps.width}"
      ></div>
    </div>

    <p class="message">{{ uvProps.message }} ({{ uvIndex }})</p>
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
  text-transform: capitalize;
}

.uv-bar {
  width: 100%;
  height: 2rem;
  border-radius: 2rem;
  border: 2px solid var(--text-color-soft);
  margin-bottom: 2.5rem;
  position: relative;
  overflow: hidden;
}

.uv-bar-data {
  position: absolute;
  height: 100%;
  border-radius: 2rem;
}

.message {
    font-size: 1.2rem;
}
</style>
