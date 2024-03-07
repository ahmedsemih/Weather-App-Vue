import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";

import PercentageCard from "../PercentageCard.vue";

function setup(data) {
  render(PercentageCard, {
    props: {
      title: "Chance of Rain",
      data,
      messages: { low: "Unlikely", medium: "Possible", high: "Likely" },
    },
  });
}

describe("PercentageCard", () => {
  it("should render low state", () => {
    const data = 20;
    setup(data);

    const title = screen.getByText("Chance of Rain");
    const percentage = screen.getByText("20%");
    const message = screen.getByText("Unlikely");
    const percentageBar = document.getElementsByClassName('percentage-bar')[0];

    expect(title).toBeInTheDocument();
    expect(percentage).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(percentageBar.style.height).toBe(data * 2 + '%')
  });

  it("should render medium state", async () => {
    const data = 50;
    setup(data);

    const title = screen.getByText("Chance of Rain");
    const percentage = screen.getByText("50%");
    const message = screen.getByText("Possible");
    const percentageBar = document.getElementsByClassName('percentage-bar')[0];

    expect(title).toBeInTheDocument();
    expect(percentage).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(percentageBar.style.height).toBe(data * 2 + '%')
  });

  it("should render high state", async () => {
    const data = 80;
    setup(data);

    const title = screen.getByText("Chance of Rain");
    const percentage = screen.getByText("80%");
    const message = screen.getByText("Likely");
    const percentageBar = document.getElementsByClassName('percentage-bar')[0];

    expect(title).toBeInTheDocument();
    expect(percentage).toBeInTheDocument();
    expect(message).toBeInTheDocument();
    expect(percentageBar.style.height).toBe(data * 2 + '%')
  });
});
