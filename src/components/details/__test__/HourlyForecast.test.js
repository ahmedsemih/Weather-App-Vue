import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import HourlyForecast from "../HourlyForecast.vue";
import "@testing-library/jest-dom";

const mockForecasts = [
  {
    time: "12:00",
    condition: { icon: "sunny" },
    feelslike_c: 20,
    feelslike_f: 68,
    temp_c: 22,
    temp_f: 72,
  },
  {
    time: "13:00",
    condition: { icon: "cloudy" },
    feelslike_c: 21,
    feelslike_f: 70,
    temp_c: 23,
    temp_f: 73,
  },
];

function setup() {
  render(HourlyForecast, {
    global: {
      stubs: {
        HourlyCard: true,
      },
    },
    props: {
      hourlyForecasts: mockForecasts,
    },
  });
}

describe("HourlyForecast", () => {
  it("should render elements properly", async () => {
    setup();

    const title = screen.getByText(/hourly forecast/i);
    const hourlyCards = screen.getAllByTestId('hourly-card');

    expect(title).toBeInTheDocument();
    expect(hourlyCards.length).toBe(2);
  });
});
