import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";

import TodaysHighlights from "../TodaysHighlights.vue";

describe("TodaysHighlights", () => {
  it("should render components properly", () => {
    render(TodaysHighlights, {
      props: {
        humidity: 30,
        visibility: 10,
        wind: { degree: 90, speed: 10, direction: "E" },
        astro: { sunrise: "6:00 AM", sunset: "6:00 PM" },
        chanceOfRain: 30,
        uvIndex: 5,
      },
    });

    const title = screen.getByRole("heading", { name: "Today's Highlists" });
    const humidityCard = screen.getByRole("heading", { name: /humidity/i });
    const rainChanceCard = screen.getByRole("heading", { name: /chance of rain/i });
    const uvIndexCard = screen.getByRole("heading", { name: /uv index/i });
    const visibilityCard = screen.getByRole("heading", { name: /visibility/i });
    const windCard = screen.getByRole("heading", { name: /wind status/i });
    const sunCard = screen.getByRole("heading", { name: /sun/i });

    expect(title).toBeInTheDocument();
    expect(humidityCard).toBeInTheDocument();
    expect(rainChanceCard).toBeInTheDocument();
    expect(uvIndexCard).toBeInTheDocument();
    expect(visibilityCard).toBeInTheDocument();
    expect(windCard).toBeInTheDocument();
    expect(sunCard).toBeInTheDocument();
  });
});
