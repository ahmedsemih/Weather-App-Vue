import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";

import PropCard from "../PropCard.vue";

describe("PropCard", () => {
    it('should render props properly', () => {
        render(PropCard, {
            props: {
                value: 85,
                name: 'Humidity',
                unit: '%'
            }
        });

        const value = screen.getByText(85);
        const humidity = screen.getByText(/humidity/i);
        const unit = screen.getByText('%');

        expect(value).toBeInTheDocument();
        expect(humidity).toBeInTheDocument();
        expect(unit).toBeInTheDocument();
    });
});