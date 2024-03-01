import "@testing-library/jest-dom";
import { createTestingPinia } from "@pinia/testing";
import { describe, expect, it, test, vi } from "vitest";
import { userEvent } from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/vue";

import { useUnitStore } from "@/stores/unit";
import UnitSelector from "../UnitSelector.vue";

function setup() {
  render(UnitSelector, { global: { plugins: [createTestingPinia()] } });

  const unitStore = useUnitStore();
  unitStore.$cookies = { get: vi.fn(), set: vi.fn() };

  const celsius = screen.getByTitle("Celsius");
  const fahrenheit = screen.getByTitle("Fahrenheit");

  return { celsius, fahrenheit, unitStore };
}

describe("UnitSelector", () => {
  it("should render elements properly", () => {
    const { celsius, fahrenheit } = setup();

    expect(celsius).toBeInTheDocument();
    expect(fahrenheit).toBeInTheDocument();
  });

  it("should change unit when clicked", async () => {
    const { celsius, fahrenheit, unitStore } = setup();
    const user = userEvent.setup();

    await user.click(celsius);
    waitFor(() => expect(unitStore.unit).toBe("celsius"));

    await user.click(fahrenheit);
    waitFor(() => expect(unitStore.unit).toBe("fahrenheit"));
  });

  describe("when unit is celsius", () => {
    test("celsius should have active class", () => {
      const { celsius, unitStore } = setup();

      unitStore.unit = "celsius";
      waitFor(() => expect(celsius.classList).toContain("active"));
    });
    test("fahrenheit should not have active class", () => {
      const { fahrenheit, unitStore } = setup();
      unitStore.unit = "celsius";

      waitFor(() => expect(fahrenheit.classList).not.toContain("active"));
    });
  });

  describe("when unit is fahrenheit", () => {
    test("fahrenheit should have active class", () => {
      const { celsius, unitStore } = setup();
      unitStore.unit = "fahrenheit";

      waitFor(() => expect(celsius.classList).not.toContain("active"));
    });
    test("celsius should not have active class", () => {
      const { fahrenheit, unitStore } = setup();
      unitStore.unit = "fahrenheit";

      waitFor(() => expect(fahrenheit.classList).toContain("active"));
    });
  });
});
