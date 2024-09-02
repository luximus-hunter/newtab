<script lang="ts">
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';

	import Sun from 'lucide-svelte/icons/sun';
	import Moon from 'lucide-svelte/icons/moon';
	import Cpu from 'lucide-svelte/icons/cpu';

	import { resetMode, setMode } from 'mode-watcher';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
</script>

<ModeWatcher />

<DropdownMenu.Root>
	<DropdownMenu.Trigger asChild let:builder>
		<Button builders={[builder]} variant="outline" size="icon" class="fixed right-4 top-4">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content align="end">
		<DropdownMenu.Item on:click={() => setMode('light')}>
			<Sun class="mr-2" />Light
		</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => setMode('dark')}>
			<Moon class="mr-2" /> Dark
		</DropdownMenu.Item>
		<DropdownMenu.Item on:click={() => resetMode()}>
			<Cpu class="mr-2" /> System
		</DropdownMenu.Item>
	</DropdownMenu.Content>
</DropdownMenu.Root>

<slot />
