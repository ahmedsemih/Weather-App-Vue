import "@testing-library/jest-dom";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/vue";

import VisibilityCard from "../VisibilityCard.vue";


describe("VisibilityCard", () => {
    it('should render data properly', () => {
        render(VisibilityCard, {
            props: {
                visibility: 5
            }
        });

        const title = screen.getByRole('heading', { name: 'Visibility' });
        const visibility = screen.getByText('5 km');
        const message = screen.getByText("Haze");
        const eyeIcon = document.getElementsByClassName('eye-icon')[0];
        const fogIcon = document.getElementsByClassName('fog-icon')[0];

        expect(title).toBeInTheDocument();
        expect(visibility).toBeInTheDocument();
        expect(message).toBeInTheDocument();
        expect(eyeIcon).toBeInTheDocument();
        expect(fogIcon).toBeInTheDocument();
    })

    it('should render icon opacities by visibility value', () => {
        render(VisibilityCard, {
            props: {
                visibility: 5
            }
        });

        const eyeIcon = document.getElementsByClassName('eye-icon')[0];
        const fogIcon = document.getElementsByClassName('fog-icon')[0];

        expect(eyeIcon.style.opacity).toBe("0.6");
        expect(fogIcon.style.opacity).toBe("0.4");
    });
});
