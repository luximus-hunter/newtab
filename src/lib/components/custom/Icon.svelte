<script lang="ts">
	import getFaviconLinkFromUrl from '$lib/images';
	export let url: string;
</script>

<img src={getFaviconLinkFromUrl(url)} class="h-4 w-4" alt={`favicon for ${url}`} />
