import { describe, expect, it, vi } from "vitest";
import { createPinia, setActivePinia } from "pinia";

import { useUnitStore } from "../unit";

function setup() {
  setActivePinia(createPinia());
  const unitStore = useUnitStore();
  unitStore.$cookies = { get: vi.fn(), set: vi.fn() };

  return { unitStore };
}

describe("Unit Store", () => {
    it("should have celsius as default", () => {
      const { unitStore } = setup();

      expect(unitStore.unit).toBe("celsius");
    });

    it("should change unit", () => {
        const { unitStore } = setup();
    
        unitStore.setUnit("fahrenheit");
        expect(unitStore.unit).toBe("fahrenheit");
    });
});
