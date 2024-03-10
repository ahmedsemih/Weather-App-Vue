import { render, screen } from "@testing-library/vue";
import { describe, expect, it } from "vitest";
import HourlyCard from "../HourlyCard.vue";
import "@testing-library/jest-dom";
import { createTestingPinia } from "@pinia/testing";
import { useUnitStore } from "@/stores/unit";

function setup(isCurrent, unit = "celsius") {
    const pinia = createTestingPinia();
    const unitStore = useUnitStore(pinia);
    unitStore.unit = unit;

    render(HourlyCard, {
        props: {
            hour: '2024-03-02 05:00',
            icon : 'test.png',
            temp: {
                c: 10,
                f: 50
            },
            feelslike: {
                c: 9,
                f: 48
            },
            isCurrent
        },
        global: {
            plugins: [pinia]
        }
    });
}

describe("HourlyCard", () => {
    it('should render data properly', () => {
        setup(false);

        const title = screen.getByText(/5:00/);
        const icon = screen.getByAltText('weather-icon');
        const temp = screen.getByText(/10 °C/);
        const feelslike = screen.getByText(/9 °C/);

        expect(title).toBeInTheDocument();
        expect(icon).toBeInTheDocument();
        expect(temp).toBeInTheDocument();
        expect(feelslike).toBeInTheDocument();
    });

    it('should add current class if isCurrent is true', () => {
        setup(true);

        const card = screen.getByTestId('card');
        expect(card).toHaveClass('current');
    });

    it('should render celsius value if unit is celsius', () => {
        setup(false, 'celsius');

        const tempCelsius = screen.getByText(/10 °C/);
        const feelslikeCelsius = screen.getByText(/9 °C/);
        const tempFahrenheit = screen.queryByText(/50 °F/);
        const feelslikeFahrenheit = screen.queryByText(/48 °F/);

        expect(tempCelsius).toBeInTheDocument();
        expect(feelslikeCelsius).toBeInTheDocument();
        expect(tempFahrenheit).not.toBeInTheDocument();
        expect(feelslikeFahrenheit).not.toBeInTheDocument();

    });

    it('should render fahrenheit value if unit is fahrenheit', () => {
        setup(false, 'fahrenheit');

        const tempCelsius = screen.queryByText(/10 °C/);
        const feelslikeCelsius = screen.queryByText(/9 °C/);
        const tempFahrenheit = screen.getByText(/50 °F/);
        const feelslikeFahrenheit = screen.getByText(/48 °F/);

        expect(tempFahrenheit).toBeInTheDocument();
        expect(feelslikeFahrenheit).toBeInTheDocument();
        expect(tempCelsius).not.toBeInTheDocument();
        expect(feelslikeCelsius).not.toBeInTheDocument();
    });
});