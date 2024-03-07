import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";

import SunCard from "../SunCard.vue";

describe("SunCard", () => {
  it("should render data properly", () => {
    render(SunCard, {
      props: {
        sunrise: "06:00",
        sunset: "18:30",
      },
    });

    const title = screen.getByRole("heading", { name: "Sunrise & Sunset" });
    const sunrise = screen.getByText("06:00");
    const sunset = screen.getByText("18:30");

    expect(title).toBeInTheDocument();
    expect(sunrise).toBeInTheDocument();
    expect(sunset).toBeInTheDocument();
  });
});
