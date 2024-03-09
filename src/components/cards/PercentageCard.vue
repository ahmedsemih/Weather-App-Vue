<script setup>
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  data: {
    type: Number,
    required: true,
  },
  messages: {
    type: Object,
    required: true,
  },
});

const message = computed(() => {
  if (props.data <= 30) return props.messages.low;
  if (props.data <= 70) return props.messages.medium;

  return props.messages.high;
});
</script>

<template>
  <div class="card">
    <h4 class="card-title">{{ title }}</h4>
    <div class="content">
      <div class="left">
        <p>{{ data }}%</p>
        <p class="message">{{ message }}</p>
      </div>
      <div class="percentage">
        <div class="percentage-bar" :style="{ height: data * 2 + '%' }"></div>
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
  align-items: center;
  font-size: 2.5rem;
  justify-content: space-between;
}

.left {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding-block: 0.5rem;
}

.percentage {
  width: 2rem;
  height: 100px;
  border: 2px solid var(--text-color-soft);
  border-radius: 2rem;
  overflow: hidden;
}

.percentage-bar {
  width: calc(2rem - 4px);
  background: var(--primary-color);
  border-radius: 2rem;
  position: relative;
  transform: translateY(-50%);
  top: 100%;
}

.message {
  font-size: 1.2rem;
  text-transform: capitalize;
}
</style>
