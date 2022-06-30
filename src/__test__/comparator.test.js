import Comparator from "../lib/components/Comparator.svelte"
import { render, screen } from "@testing-library/svelte";
import { describe, it, expect, afterAll, afterEach, beforeAll } from "vitest"
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const blockchainResponse = rest.get('https://a6oywywsoj.execute-api.us-east-1.amazonaws.com/beta/aggregator/blockchains', (req, res, ctx)  => {
    return res(ctx.json({blockchains: ["harmony", "polygon"]}))
})

const handlers = [blockchainResponse]

const server = setupServer(...handlers);

beforeAll(() => { server.listen() })
afterEach(() => { server.resetHandlers() })
afterAll(() => { server.close() })

describe("Testing comparator page",() => {
    const component = render(Comparator)
    it("should render correctly", () => {
        expect(screen.getByText("Sell")).toBeTruthy()
        expect(screen.getByText("Buy")).toBeTruthy()
        expect(screen.getByText("Search")).toBeTruthy()
    })

    it("should fetch data", async () => {
        const selectBlockchain = component.getByText("select blockchain")
        expect(selectBlockchain).toHaveProperty("value", "harmony")
    })
})