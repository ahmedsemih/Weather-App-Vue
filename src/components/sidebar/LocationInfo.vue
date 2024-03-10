<script setup>
import moment from "moment";
import { useBookmarkStore } from "@/stores/bookmark";

defineProps({
  location: {
    type: Object,
    required: true,
  },
  refetch: {
    type: Function,
    required: true,
  },
});

const bookmarkStore = useBookmarkStore();
const { addBookmark, removeBookmark, isBookmarked } = bookmarkStore;
</script>

<template>
  <div class="location-info">
    <div>
      <h1 class="name">{{ location.name }}</h1>
      <p class="local-time">
        Local Time: {{ moment(location.localtime).format("D MMM - hh:mm A") }}
      </p>
    </div>
    <div class="buttons">
      <button @click="refetch" title="Refresh" aria-label="refresh">
        <v-icon name="md-refresh" />
      </button>
      <button
        v-if="isBookmarked(location.name)"
        @click="removeBookmark(location.name)"
        title="Remove Bookmark"
        aria-label="remove bookmark"
      >
        <v-icon name="fa-bookmark" />
      </button>
      <button
        v-else
        @click="addBookmark(location.name)"
        title="Add to Bookmarks"
        aria-label="add to bookmarks"
      >
        <v-icon name="fa-regular-bookmark" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.location-info {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-block: 1rem;
  padding: 1rem 0.5rem;
}

.name {
  font-size: 1.5rem;
  font-weight: 600;
}

.local-time {
  font-size: 1rem;
  opacity: 0.5;
}

.buttons {
  display: flex;
  align-items: start;
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
</style>
