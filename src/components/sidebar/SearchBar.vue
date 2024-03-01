<script setup>
import { ref, watch } from "vue";
import { useSearchStore } from "@/stores/search";

const searchStore = useSearchStore();

const search = ref("");
const isHistoryOpen = ref(false);
const history = ref(searchStore.history || []);

const handleSubmit = () => {
  if (!search.value) return;
  searchStore.setSearch(search.value);
  isHistoryOpen.value = false;
};

const handleClickLocation = () => {
  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      searchStore.setSearch(`${latitude},${longitude}`);
    },
    () => alert("Please allow access to location for use this feature.")
  );
};

const handleClickHistory = (value) => {
  search.value = value;
  searchStore.setSearch(value);
  isHistoryOpen.value = false;
};

watch(
  () => search.value,
  (newSearch) => {
    isHistoryOpen.value = true;
    history.value = searchStore.history.filter((historyItem) =>
      historyItem.toLowerCase().includes(newSearch.toLowerCase())
    );
  }
);
</script>

<template>
  <div class="searchbar">
    <button
      class="location-btn"
      type="button"
      @click="handleClickLocation"
      title="Search by Location"
    >
      <v-icon scale="1.5" name="hi-location-marker" />
    </button>
    <form
      @mouseleave="isHistoryOpen = false"
      role="form"
      class="search-form"
      @submit.prevent="handleSubmit"
    >
      <input
        @focus="isHistoryOpen = true"
        v-model="search"
        type="text"
        placeholder="Search location"
      />
      <button class="search-btn" title="Search">
        <v-icon scale="1.5" name="io-search" />
      </button>
      <ul
        :style="{
          display: isHistoryOpen && history.length > 0 ? 'block' : 'none',
        }"
        class="search-history"
      >
        <li
          role="button"
          @click="handleClickHistory(historyItem)"
          class="history-item"
          v-for="(historyItem, index) in history"
          :key="index"
        >
          {{ historyItem }}
        </li>
      </ul>
    </form>
  </div>
</template>

<style scoped>
.searchbar {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 0.5rem;
}

.search-form > input {
  font-size: 1.5rem;
  width: 100%;
  border: none;
  padding-inline: 0.5rem;
  background-color: #f6f6f8;
  border-radius: 2rem;
  outline: none;
  text-indent: 0.5rem;
}

.search-form {
  display: flex;
  align-items: center;
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 2rem;
  background-color: var(--bg-color);
  position: relative;
}

.search-btn,
.location-btn {
  cursor: pointer;
  padding: 0.4rem;
  border-radius: 100%;
  border: none;
  transition: all 200ms;
}

.location-btn {
  background-color: var(--primary-color);
  color: var(--bg-color);
}
.location-btn:hover {
  opacity: 0.8;
}

.search-btn {
  background-color: var(--border-color);
}

.search-btn:hover {
  background-color: var(--text-color-soft);
  opacity: 0.8;
}

.search-history {
  position: absolute;
  top: 100%;
  right: 50%;
  width: 90%;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 0 0 1rem 1rem;
  padding: 0.5rem;
  z-index: 100;
  transform: translateX(50%);
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
  list-style: none;
}

.history-item {
  padding: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 200ms;
  font-size: 1.2rem;
  width: 100%;
}

.history-item:hover {
  background-color: var(--border-color) !important;
}
</style>
