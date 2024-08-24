<script lang="ts">
	import { Button } from '../ui/button/index';
	import Icon from './Icon.svelte';

	export let url: string = '';
</script>

<Button variant="outline" href={url} class="w-full">
	<Icon {url} />
	<span class="ml-4 flex-1 text-center"><slot /></span>
</Button>
