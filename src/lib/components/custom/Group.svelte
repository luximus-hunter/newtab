<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	export let title: string = 'Untitled';
</script>

<Card.Root>
	<Card.Header>
		<Card.Title>{title}</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-col gap-2">
		<slot />
	</Card.Content>
</Card.Root>
