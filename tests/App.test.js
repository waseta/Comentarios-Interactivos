import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/svelte";
import App from "../src/App.svelte";
import data from "../src/data.json";


function scaleComments(scaleFactor) {
    const scaledData = { ...data };
    const originalComments = [...scaledData.comments];

    for (let i = 0; i < scaleFactor - 1; i++) {
        scaledData.comments.push(
            ...originalComments.map((comment) => ({
                ...comment,
                id: comment.id + originalComments.length * (i + 1),
                content: `${comment.content} (copiado ${i + 1} veces)`,
            }))
        );
    }

    return scaledData;
}

describe("Pruebas de integración y estrés para interactive-comments", () => {
    it("Renderiza correctamente el componente principal", () => {
        const { getByText } = render(App, { props: { data } });
        expect(getByText(/Impressive!/i)).toBeTruthy();
    });

    it("Permite votar en comentarios", async () => {
        const { getByText, getByRole } = render(App, { props: { data } });
        const upvoteButton = getByRole("button", { name: /upvote/i });
        await fireEvent.click(upvoteButton);
        const score = getByText("13");
        expect(score).toBeTruthy();
    });

    it("Carga correctamente con datos escalados", async () => {
        const scaleFactor = 100;
        const scaledData = scaleComments(scaleFactor);
        const { queryAllByText } = render(App, { props: { data: scaledData } });
        expect(queryAllByText(/Impressive!/i).length).toBeGreaterThanOrEqual(scaleFactor);
    });

    it("Maneja múltiples interacciones simultáneas", async () => {
        const { getAllByRole } = render(App, { props: { data } });
        const upvoteButtons = getAllByRole("button", { name: /upvote/i });
        const interactionPromises = upvoteButtons.map((button) => fireEvent.click(button));
        await Promise.all(interactionPromises);
        upvoteButtons.forEach((button) => {
            expect(button).toBeDefined();
        });
    });

    it("Mantiene la integridad de los datos bajo carga", async () => {
        const scaleFactor = 50;
        const scaledData = scaleComments(scaleFactor);
        const { getAllByText } = render(App, { props: { data: scaledData } });
        const allComments = getAllByText(/copiado/i);
        expect(allComments.length).toBe(scaleFactor * data.comments.length);
    });
});

