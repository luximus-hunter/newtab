<script lang="ts">
	import { faviconUrl } from '$lib/data';
	export let url: string;
</script>

<img src={faviconUrl(url)} class="h-4 w-4 scale-150" alt={`favicon for ${url}`} />
