import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";

import { useUnitStore } from "@/stores/unit";
import DailyForecastCard from "../DailyForecastCard.vue";

const dailyForecast = {
  date: "2024-03-02",
  day: {
    maxtemp_c: 20,
    maxtemp_f: 68,
    mintemp_c: 10,
    mintemp_f: 50,
    avghumidity: 80,
    condition: {
      icon: "test-icon.png",
    },
  },
};

function setup(isToday, unit) {
  const pinia = createTestingPinia();
  const unitStore = useUnitStore(pinia);
  unitStore.unit = unit;

  render(DailyForecastCard, {
    props: {
      isToday,
      dailyForecast,
    },
    global: {
      plugins: [pinia],
    },
  });
}

describe("DailyForecastCard", () => {
  it("should display 'Today' when isToday prop is true", () => {
    setup(true, "celsius");

    expect(screen.getByText("Today")).toBeInTheDocument();
  });

  it("should display the name of day when isToday prop is false", () => {
    setup(false, "celsius");

    expect(screen.getByText("Saturday")).toBeInTheDocument();
  });

  it("should display temperature in celsius when unit is 'celsius'", () => {
    setup(false, "celsius");

    const units = screen.getAllByText("°C");
    const maxTemp = screen.getByText("20");
    const minTemp = screen.getByText("10");

    expect(units).toHaveLength(2);
    expect(maxTemp).toBeInTheDocument();
    expect(minTemp).toBeInTheDocument();
  });

  it("should display temperature in Fahrenheit when unit is 'fahrenheit'", () => {
    setup(false, "fahrenheit");

    const units = screen.getAllByText("°F");
    const maxTemp = screen.getByText("68");
    const minTemp = screen.getByText("50");

    expect(units).toHaveLength(2);
    expect(maxTemp).toBeInTheDocument();
    expect(minTemp).toBeInTheDocument();
  });

  it("should display the average humidity", () => {
    render(DailyForecastCard, {
      props: {
        isToday: true,
        dailyForecast,
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const unit = screen.getByText("%");
    const humidity = screen.getByText("80");

    expect(unit).toBeInTheDocument();
    expect(humidity).toBeInTheDocument();
  });
});
