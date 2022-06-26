<div >
    <span>Select Coins</span>
    <form on:submit|preventDefault={handleSearch} class="comparator-container">
    <div class="label">
    <label for="">SEll</label>
    <div>
    <input name="sellInput" type="number">
    <select name="sell" id="">
        <option value="" selected disabled>select</option>
        {#each tokens as value}
            <option value={value}>{value}</option>
        {/each}
    </select>
    </div>
    </div>

    <div class="label-sell">
    <label for="">BUY</label>
    <select name="buy" id="">
        <option value="" selected disabled>select</option>
        {#each tokens as value}
            <option value={value}>{value}</option>
        {/each}
    </select>
    </div>
    <button type="submit">Search</button>
    </form>
    <span>Results:</span>
    <div class="results">
        {#each results as result}
            <div >
                <div class="result">
                    <span>{Object.keys(result)[0]}</span>
                    <span>{Object.values(result)[0]}</span>
                </div>
            </div>
        {/each}
    </div>
</div>

<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";

    let tokens: String[] = [];
    let results: Object[] = [];

    onMount(async () => {
		fetchTokens()
	});

    function handleSearch(e: SubmitEvent): void {
        if (!e.target) return;
        const target = e.target as HTMLFormElement;
        fetchInputSwaps(target.sell.value, target.sellInput.value, target.buy.value)
    }

    async function fetchInputSwaps(inputToken: String, inputAmount: Number, outputToken: String): Promise<void> {
        const config = {params: {inputToken, inputAmount, outputToken}}
        const inputSwaps = ( await axios.get('https://a6oywywsoj.execute-api.us-east-1.amazonaws.com/beta/aggregator/swap/input', config)).data.results
        results = inputSwaps
    }

    async function fetchTokens(): Promise<void> {
            let tokenQuery = ( await axios.get('https://a6oywywsoj.execute-api.us-east-1.amazonaws.com/beta/aggregator/tokens') ).data.tokens
            tokens = tokenQuery
        }

</script>

<style>
    .comparator-container {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        border-radius: 10px;
        padding: 1em;
        gap: 1em;
        margin: 0.5em 0em;
    }

    .label {
        display: flex;
        flex-direction: column;
    }

    .label-sell {
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
    }
    .results {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .result {
        display: flex;
        flex-direction: column;
    }
</style>