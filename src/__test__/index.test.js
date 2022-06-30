import Index from "../routes/index.svelte"
import { render, screen } from "@testing-library/svelte";
import { describe, it, expect } from "vitest"

describe("Testing index page",() => {
    it("should render", () => {
        render(Index)
        expect(screen.getByText("About me:")).toBeTruthy()
        expect(screen.getByText("About Me")).toBeTruthy()
        expect(screen.getByText("Defi Comparator")).toBeTruthy()
    })
})


