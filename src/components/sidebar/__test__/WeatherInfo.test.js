import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";

import WeatherInfo from "../WeatherInfo.vue";
import { useUnitStore } from "@/stores/unit";

const props = {
  current: {
    feelslike_c: 20,
    feelslike_f: 68,
    temp_c: 20,
    temp_f: 68,
    wind_kph: 10,
    pressure_mb: 1015,
    humidity: 60,
    condition: {
      text: "Partly Cloudy",
    },
  },
};

describe("WeatherInfo", () => {
  it("should render elements properly", () => {
    render(WeatherInfo, {
      props,
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const condition = screen.getByRole("heading", /partly cloudy/i);
    const feelsLike = screen.getByLabelText(/feels like/i);
    const temperature = screen.getByLabelText(/temperature/i);
    const wind = screen.getByText(10);
    const pressure = screen.getByText(1015);
    const humidity = screen.getByText(60);

    expect(condition).toBeInTheDocument();
    expect(feelsLike).toBeInTheDocument();
    expect(temperature).toBeInTheDocument();
    expect(wind).toBeInTheDocument();
    expect(pressure).toBeInTheDocument();
    expect(humidity).toBeInTheDocument();
  });

  it("should render celsius values if unit is celsius", () => {
    const pinia = createTestingPinia();
    const unitStore = useUnitStore(pinia);
    unitStore.unit = "celsius";

    render(WeatherInfo, {
      props,
      global: {
        plugins: [pinia],
      },
    });

    const celsiusUnits = screen.getAllByText("°C");
    const celsiusValues = screen.getAllByText(20);
    const fahrenheitUnits = screen.queryAllByText("°F");
    const fahrenheitValues = screen.queryAllByText(68);

    expect(celsiusUnits.length).toBe(2);
    expect(celsiusValues.length).toBe(2);
    expect(fahrenheitUnits.length).toBe(0);
    expect(fahrenheitValues.length).toBe(0);
  });

  it("should render fahrenheit values if unit is fahrenheit", () => {
    const pinia = createTestingPinia();
    const unitStore = useUnitStore(pinia);
    unitStore.unit = "fahrenheit";

    render(WeatherInfo, {
      props,
      global: {
        plugins: [pinia],
      },
    });

    const fahrenheitUnits = screen.getAllByText("°F");
    const fahrenheitValues = screen.getAllByText(68);
    const celsiusUnits = screen.queryAllByText("°C");
    const celsiusValues = screen.queryAllByText(20);

    expect(fahrenheitUnits.length).toBe(2);
    expect(fahrenheitValues.length).toBe(2);
    expect(celsiusUnits.length).toBe(0);
    expect(celsiusValues.length).toBe(0);
  });
});
