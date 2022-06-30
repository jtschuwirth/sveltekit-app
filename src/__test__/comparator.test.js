import Comparator from "../lib/components/Comparator.svelte"
import { render, screen, waitFor, fireEvent, act } from "@testing-library/svelte";
import { describe, it, expect } from "vitest"




describe("Testing comparator page",() => {
    const component = render(Comparator)
    it("should render correctly", () => {
        expect(screen.getByText("Sell")).toBeTruthy()
        expect(screen.getByText("Buy")).toBeTruthy()
        expect(screen.getByText("Search")).toBeTruthy()
    })

    it("should fetch blockchains", async () => {
        await waitFor(() => component.getByText("harmony"));
        await waitFor(() => component.getByText("polygon"));
    })

    it("should fetch tokens", async () => {
        await act(() => fireEvent.change(component.getByTestId("blockchain"), {target: { value: "harmony"}}))
        await waitFor(() => component.getAllByText("eth"));
        await waitFor(() => component.getAllByText("usdc"));
    })

    it("can select the tokens and blockchain", async () => {
        await act(() => fireEvent.change(component.getByTestId("blockchain"), {target: { value: "polygon" }}))
        expect(component.getByTestId("blockchain")).toHaveProperty("value", "polygon");

        await act(() => fireEvent.select(component.getByTestId("sell-select"), {target: { value: "eth" }}))
        expect(component.getByTestId("sell-select")).toHaveProperty("value", "eth");

        await act(() => fireEvent.select(component.getByTestId("buy-select"), {target: { value: "usdc" }}))
        expect(component.getByTestId("buy-select")).toHaveProperty("value", "usdc");

        await act(() => fireEvent.input(component.getByTestId("sell-input"), {target: { value: 1 }}))
        expect(component.getByTestId("sell-input")).toHaveProperty("value", "1");
    })

    it("should fetch swap results", async () => {
        await act(() => fireEvent.change(component.getByTestId("blockchain"), {target: { value: "polygon" }}))
        fireEvent.change(component.getByTestId("sell-form"), {target: {
            sell: { value: "eth"},
            buy: { value: "usdc"},
            sellInput: { value: "1"}
        }})
        expect(component.getByTestId("sell-form")).toHaveProperty("sell.value", "eth");
        expect(component.getByTestId("sell-form")).toHaveProperty("buy.value", "usdc");
        expect(component.getByTestId("sell-form")).toHaveProperty("sellInput.value", "1");
        await act(() => fireEvent.click(component.getByTestId("sell-search")))

        //await waitFor(() => component.getByText("Sushiswap"));

    })
})