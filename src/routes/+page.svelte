<script lang="ts">
	import { tempSettings } from '$lib/data';
	import { onMount } from 'svelte';
	import LinkButton from '$lib/components/custom/LinkButton.svelte';
	import Group from '$lib/components/custom/Group.svelte';

	let settings: any = null;
	let search = 'you';

	onMount(async () => {
		settings = await tempSettings();
		console.log(settings);
	});
</script>

<div class="p4 grid grid-cols-5 gap-4 p-4">
	{#if settings}
		{#each settings as s}
			<Group title={s.title}>
				{#each s.links as item}
					<LinkButton url={item.url}>{item.title}</LinkButton>
				{/each}
			</Group>
		{/each}
	{/if}
</div>
