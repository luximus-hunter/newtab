<script lang="ts">
	import * as Command from '$lib/components/ui/command';
	import * as Card from '$lib/components/ui/card';
	import Icon from './Icon.svelte';
	import { getGroupLinks, getLink } from '$lib/data';
	import type { TGroup } from '$lib/types/group';

	export let groups: TGroup[];

	let value: string;
	let search: string;

	const searchUrl = (query: string) => 'https://duckduckgo.com/?q=' + query;

	const filter = (value: string, search: string) =>
		value.toLowerCase().includes(search.toLowerCase()) ? 1 : 0;

	const onSelect = (value: string) => {
		const link = getLink(value);
		if (!link) return;
		window.location.href = link.url;
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (e.key !== 'Enter') return;
		const query = search.trim();
		window.location.href = searchUrl(query);
	};
</script>

<Card.Root>
	<Card.Content class="p-0">
		<Command.Root bind:value {filter}>
			<Command.Input placeholder="Start searching..." {onKeydown} bind:value={search} />
			<Command.List>
				<Command.Empty>
					<div class="flex items-center justify-center">
						<Icon url="https://duckduckgo.com" />
						<span class="ml-2">Search online for {search}</span>
					</div>
				</Command.Empty>
				{#each groups as group}
					<Command.Group heading={group.title}>
						{#each getGroupLinks(group.id) as link}
							<Command.Item onSelect={() => onSelect(link.id)}>
								<Icon url={link.url} />
								<span class="ml-2">{link.title}</span>
								<span class="hidden">{link.id}</span>
							</Command.Item>
						{/each}
					</Command.Group>
				{/each}
			</Command.List>
		</Command.Root>
	</Card.Content>
</Card.Root>
