import { defineStore } from "pinia";
import { inject } from "vue";

export const useUnitStore = defineStore("unit", {
  state: () => {
    const $cookies = inject("$cookies");
    return {
      $cookies: $cookies,
      unit: $cookies?.get("unit") || "celsius",
    };
  },
  actions: {
    setUnit(unit) {
      this.unit = unit;
      this.$cookies.set("unit", unit);
    },
  },
});
