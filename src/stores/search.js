import { inject } from "vue";
import { defineStore } from "pinia";

export const useSearchStore = defineStore("search", {
    state: () => {
      const $cookies = inject("$cookies");

      return {
        search: "",
        locationWaiting: false,
        $cookies,
        history: $cookies?.get("history") || [],
      };
    },
    actions: {
      setSearch(search) {
        this.search = search;
      },
      clearSearch() {
        this.search = "";
      },
      setLocationWaiting(status) {
        this.locationWaiting = status;
      },
      addToHistory(search) {
        const history = this.history;
        const filteredHistory = history.filter((item) => item !== search);
        this.history = [search, ...filteredHistory].slice(0, 5);
        this.$cookies.set("history", this.history, "1y");
      },
      clearHistory() {
        this.history = [];
        this.$cookies.remove("history");
      },
    },
  });
