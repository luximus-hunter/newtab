<script lang="ts">
	import { getGroups } from '$lib/data';
	import greet from '$lib/greeting';
	import SearchBox from '$lib/components/custom/SearchBox.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	let groups = getGroups();
</script>

<div class="grid h-dvh w-full grid-cols-1 place-items-center p-4">
	<Card.Root class="h- h-full w-[600px] max-w-full sm:h-auto">
		<Card.Header class="text-center">
			<Card.Title class="scroll-m-20 text-4xl font-extrabold lg:text-6xl">NewTab</Card.Title>
			<Card.Description class="text-xl">{greet()}</Card.Description>
		</Card.Header>
		<Card.Content>
			<SearchBox {groups} />
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<div class="flex gap-4">
				<Button variant="ghost" href="/settings">Settings</Button>
				<Button variant="ghost" href="https://github.com/luximus-hunter/newtab" target="_blank">
					Source Code
				</Button>
			</div>
		</Card.Footer>
	</Card.Root>
</div>
