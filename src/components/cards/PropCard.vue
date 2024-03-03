<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="prop">
    <div class="value">
      {{ value }}
      <span class="unit">
        {{ unit }}
      </span>
    </div>
    <p class="name">{{ name }}</p>
  </div>
</template>

<style scoped>
.prop {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.value {
  font-size: 1.5rem;
  font-weight: 500;
}
.name {
  font-size: 0.7rem;
  text-transform: capitalize;
}

.unit {
  font-size: 1rem;
  font-weight: 500;
}
</style>
