import { inject } from "vue";
import { defineStore } from "pinia";

export const useBookmarkStore = defineStore("bookmark", {
  state: () => {
    const $cookies = inject("$cookies");
    return {
      $cookies: $cookies,
      bookmarks: $cookies?.get("bookmarks") || [],
    };
  },
  actions: {
    addBookmark(bookmark) {
      this.bookmarks = [...this.bookmarks, bookmark];
      this.$cookies.set("bookmarks", this.bookmarks);
    },
    removeBookmark(bookmark) {
      this.bookmarks = this.bookmarks.filter((b) => b !== bookmark);
      this.$cookies.set("bookmarks", this.bookmarks);
    },
    clearBookmarks() {
      this.bookmarks = [];
      this.$cookies.remove("bookmarks");
    }
  },
  getters: {
    isBookmarked: (state) => (bookmark) => {
      return state.bookmarks.includes(bookmark);
    },
  },
});
