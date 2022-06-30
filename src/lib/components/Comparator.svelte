<div class="component">
    <div class=left>
    <div class="label">
        <span>Select Blockchain</span>
        <select name="blockchain" data-testid="blockchain" on:change={handleBlockchainChange}>
            <option value={""} selected disabled>select</option>
            {#each blockchains as value}
                <option value={value}>{value}</option>
            {/each}
        </select>
    </div>
    <div class="label">
    <span>Select Coins</span>
    {#if tx_type=="sell"}
        <form on:submit|preventDefault={handleSearch} class="comparator-container" data-testid="sell-form">
            <label class="switchBtn">
                <input type="checkbox" on:change={handleTxChange}>
                <div class="slide"></div>
            </label>
        <div class="label">
            <label for="">Sell</label>
            <div>
            <input name="sellInput" type="number" data-testid="sell-input">
            <select name="sell" id="" data-testid="sell-select">
                <option value="" selected disabled>select</option>
                {#each tokens as value}
                    <option value={value}>{value}</option>
                {/each}
            </select>
            </div>
        </div>

        <div class="label-sell">
            <label for="">Buy</label>
            <select name="buy" id="" data-testid="buy-select">
                <option value="" selected disabled>select</option>
                {#each tokens as value}
                    <option value={value}>{value}</option>
                {/each}
            </select>
        </div>
        <button type="submit" data-testid="sell-search">Search</button>
        </form>
    {/if}

    {#if tx_type=="buy"}
        <form on:submit|preventDefault={handleSearch} class="comparator-container">
            <label class="switchBtn">
                <input type="checkbox" on:change={handleTxChange} checked>
                <div class="slide"></div>
            </label>

            <div class="label-sell">
                <label for="">Sell</label>
                <select name="sell" id="">
                    <option value="" selected disabled>select</option>
                    {#each tokens as value}
                        <option value={value}>{value}</option>
                    {/each}
                </select>
            </div>
            <div class="label">
                <label for="">Buy</label>
                <div>
                <input name="buyInput" type="number">
                <select name="buy" id="">
                    <option value="" selected disabled>select</option>
                    {#each tokens as value}
                        <option value={value}>{value}</option>
                    {/each}
                </select>
                </div>
            </div>
        <button type="submit">Search</button>
        </form>
    {/if}
    </div>
    </div>
    <div class="right">
    <span>Results:</span>
    <div class="results">
        {#each results as result}
            <div >
                <div class="result">
            
                    <span>{Object.keys(result)[0]}</span>
                    {#if Object.values(result)[0]=="Can't find a valid path"}
                        <span>"Can't find a valid path"</span>
                    {/if}
                    {#if Object.values(result)[0]!="Can't find a valid path"}
                        <span>{parseFloat(Object.values(result)[0].input.amount)} {Object.values(result)[0].input.name} </span>
                        <span>{parseFloat(Object.values(result)[0].output.amount)} {Object.values(result)[0].output.name}</span>
                    {/if}
                </div>
            </div>
        {/each}
    </div>
    </div>
</div>

<script lang="ts">
    import axios from "axios";
    import { onMount } from "svelte";

    let tokens: String[] = [];
    let results: Object[] = [];
    let blockchains: String[] = [];
    let current_blockchain: String = "";
    let tx_type: String = "sell";

    onMount(async () => {
        fetchBlockchains()
	});

    function handleTxChange(e: Event): void {
        if (!e.target) return;
        const target = e.target as HTMLInputElement;
        if (target.checked) {
            tx_type = "buy"
        } else {
            tx_type = "sell"
        }
    }

    function handleBlockchainChange(e: Event): void {
        if (!e.target) return;
        const target = e.target as HTMLSelectElement;
        current_blockchain = target.value
        fetchTokens(current_blockchain)
    }

    async function handleSearch(e: SubmitEvent): Promise<void> {
        e.preventDefault
        if (!e.target) return;
        const target = e.target as HTMLFormElement;
        if (tx_type  == "sell") {
            await fetchInputSwaps(target.sell.value, target.sellInput.value, target.buy.value, current_blockchain)
        } else {
            await fetchOutputSwaps(target.sell.value, target.buyInput.value, target.buy.value, current_blockchain)
        }

    }

    async function fetchInputSwaps(inputToken: String, inputAmount: Number, outputToken: String, blockchain: String): Promise<void> {
        const config = {params: {inputToken, inputAmount, outputToken, blockchain}}
        results = ( await axios.get('https://a6oywywsoj.execute-api.us-east-1.amazonaws.com/beta/aggregator/swap/input', config)).data.results
    }
    async function fetchOutputSwaps(inputToken: String, outputAmount: Number, outputToken: String, blockchain: String): Promise<void> {
        const config = {params: {inputToken, outputAmount, outputToken, blockchain}}
        results = ( await axios.get('https://a6oywywsoj.execute-api.us-east-1.amazonaws.com/beta/aggregator/swap/output', config)).data.results
    }

    async function fetchTokens(blockchain: String): Promise<void> {
        const config = {params: {blockchain}}
        tokens = ( await axios.get('https://a6oywywsoj.execute-api.us-east-1.amazonaws.com/beta/aggregator/tokens', config)).data.tokens
    }

    async function fetchBlockchains() : Promise<void> {
        blockchains = ( await axios.get('https://a6oywywsoj.execute-api.us-east-1.amazonaws.com/beta/aggregator/blockchains') ).data.blockchains

    }

</script>

<style>
    .component {
        display: flex;
        flex-direction: row;
        gap: 2em;
    }
    .left {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .right {
        display: flex;
        flex-direction: column;
        gap: 1em;
    }
    .comparator-container {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        border-radius: 10px;
        padding: 1em;
        gap: 1em;
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
    .switchBtn input {display:none;}
    .slide {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        width: 50px;
        height: 20px;
        border-radius: 12px;
        cursor: pointer;
        background-color: #ccc;
        -webkit-transition: .4s;
        transition: .4s;
        color: #fff;
        padding: 2px 5px;
    }
    .slide:before {
        position: absolute;
        content: "";
        height: 15px;
        width: 15px;
        background-color: white;
        -webkit-transition: .4s;
        transition: .4s;
        border-radius: 50%;
    }

    input:checked + .slide {
        justify-content: flex-end;
        background-color: #8CE196;
    }




</style>