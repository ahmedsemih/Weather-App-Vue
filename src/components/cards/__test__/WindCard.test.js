import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";

import WindCard from "../WindCard.vue";

describe("WindCard", () => {
  it("should render data properly", () => {
    render(WindCard, {
      props: {
        speed: 5,
        degree: 180,
        direction: "S",
      },
    });

    const title = screen.getByRole("heading", { name: /wind status/i });
    const speed = screen.getByText("5 km/h");
    const info = screen.getByText("180° S");
    const icon = document.getElementsByClassName("icon")[0];

    expect(title).toBeInTheDocument();
    expect(speed).toBeInTheDocument();
    expect(info).toBeInTheDocument();
    expect(icon).toBeInTheDocument();
  });

  it("should rotate icon by degree value", () => {
    render(WindCard, {
      props: {
        speed: 5,
        degree: 180,
        direction: "S",
      },
    });

    const icon = document.getElementsByClassName("icon")[0];

    expect(icon.style.transform).toBe(`rotate(${180 - 45}deg)`);
  });
});
