<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import type { TSettings } from '$lib/types/settings';
	import { getGroups, getLinks, setGroups, setLinks } from '$lib/data';

	let settingsFileUpload: HTMLInputElement;
	let message = '';

	const showMessage = (msg: string) => {
		message = msg;
		setTimeout(() => {
			message = '';
		}, 5000);
	};

	const exportSettings = () => {
		const settings: TSettings = {
			groups: getGroups(),
			links: getLinks()
		};

		const data = JSON.stringify(settings);
		const blob = new Blob([data], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		a.href = url;

		a.download = 'newtab-settings.json';
		document.body.appendChild(a);

		a.click();

		URL.revokeObjectURL(url);
		document.body.removeChild(a);
	};

	const importSettings = () => {
		settingsFileUpload.click();
		settingsFileUpload.onchange = async () => {
			const files = settingsFileUpload.files;
			if (!files) return;
			const file = files[0];
			if (!file) return;

			const reader = new FileReader();

			reader.onload = async () => {
				const data = reader.result as string;
				const settings = JSON.parse(data) as TSettings;

				console.log(settings);

				setGroups(settings.groups);
				setLinks(settings.links);

				showMessage('Settings imported successfully');
			};

			reader.readAsText(file);
		};
	};
</script>

<div class="grid h-dvh w-full grid-cols-1 place-items-center p-4">
	<Card.Root class="h- h-full w-[600px] max-w-full sm:h-auto">
		<Card.Header class="text-center">
			<Card.Title class="mb-4 scroll-m-20 text-4xl font-extrabold lg:text-6xl">Settings</Card.Title>
			<Card.Description>
				<Alert.Root>
					<Alert.Title>Heads up!</Alert.Title>
					<Alert.Description>
						The settings page is still being worked on. For now editing the JSON is the only way to
						edit settings. THERE IS NO VALIDATION. Make sure you know what you are doing.
					</Alert.Description>
				</Alert.Root>
				{#if message.length > 0}
					<Alert.Root class="mt-4">
						<Alert.Title>Success</Alert.Title>
						<Alert.Description>
							{message}
						</Alert.Description>
					</Alert.Root>
				{/if}
			</Card.Description>
		</Card.Header>
		<Card.Content>
			<Button on:click={exportSettings}>Export</Button>
			<input type="file" accept=".json" bind:this={settingsFileUpload} class="hidden" />
			<Button on:click={importSettings}>Import</Button>
			<Button href="/">Back</Button>
		</Card.Content>
	</Card.Root>
</div>
