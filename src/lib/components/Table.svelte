<script lang="ts" generics="T">
    import type { Snippet } from 'svelte';

    interface Props {
        rows: T[];
        filterFn?: (row: T, query: string) => boolean;
        headers: Snippet;
        row: Snippet<[T]>;
        title?: string;
    }

    let { rows, filterFn, headers, row, title }: Props = $props();
    let query = $state('');

    const visibleRows = $derived(
        query && filterFn
            ? rows.filter(r => filterFn(r, query.toLowerCase()))
            : rows
    );
</script>

{#if title || filterFn}
<div class="mb-4 flex items-center {title ? 'justify-between' : 'justify-end'}">
    {#if title}
        <h3 class="font-heading text-lg font-medium text-text-heading">{title}</h3>
    {/if}
    {#if filterFn}
        <input
            type="search"
            bind:value={query}
            placeholder="Search..."
            class="rounded border border-border bg-bg-card px-3 py-1 text-sm text-text-heading placeholder:text-text focus:outline-none"
        />
    {/if}
</div>
{/if}
<div class="overflow-x-auto rounded-xl border border-border">
    <table class="w-full text-left text-sm">
        <thead>
            <tr class="border-b border-border bg-bg-card text-xs uppercase tracking-wide text-text">
                {@render headers()}
            </tr>
        </thead>
        <tbody>
            {#each visibleRows as r}
            <tr class="border-b border-border last:border-none hover:bg-bg-card/50">
                {@render row(r)}
            </tr>
            {/each}
        </tbody>
    </table>
</div>
