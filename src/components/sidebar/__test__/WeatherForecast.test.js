import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { createTestingPinia } from "@pinia/testing";
import { render, screen } from "@testing-library/vue";

import WeatherForecast from "../WeatherForecast.vue";

describe("WeatherForecast", () => {
  it("should render cards if forecasts available", () => {
    render(WeatherForecast, {
      props: {
        dailyForecasts: [
          {
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
          },
        ],
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const title = screen.getByText(/1 day forecast/i);
    const cards = screen.getAllByRole("img", { name: /weather-image/i });
    const emptyTitle = screen.queryByRole("heading", { name: /forecasts/i });
    const emptyMessage = screen.queryByText(/no forecast/i);

    expect(title).toBeInTheDocument();
    expect(cards).toHaveLength(1);
    expect(emptyTitle).not.toBeInTheDocument();
    expect(emptyMessage).not.toBeInTheDocument();
  });

  it("should render empty message if forecast is not available", () => {
    render(WeatherForecast, {
      props: {
        dailyForecasts: [],
      },
      global: {
        plugins: [createTestingPinia()],
      },
    });

    const emptyTitle = screen.getByRole("heading", { name: /forecasts/i });
    const emptyMessage = screen.getByText(/no forecast/i);
    const title = screen.queryByText(/1 day forecast/i);
    const cards = screen.queryAllByRole("img", { name: /weather-image/i });

    expect(emptyTitle).toBeInTheDocument();
    expect(emptyMessage).toBeInTheDocument();
    expect(title).not.toBeInTheDocument();
    expect(cards).toHaveLength(0);
  });
});
