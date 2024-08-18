<script setup lang="ts">
import IconEmail from "@/assets/IconEmail.vue";
import IconGitHub from "@/assets/IconGitHub.vue";
import IconLinkedIn from "@/assets/IconLinkedIn.vue";
import IconPhone from "@/assets/IconPhone.vue";
import IconPin from "@/assets/IconPin.vue";
</script>

<template>
	<table>
		<tr>
			<td>
				<IconEmail class="size-5" />
			</td>
			<td class="pl-3">
				<a
					href="mailto:jefharkay@gmail.com"
					class="underline"
				>jefharkay@gmail.com</a>
			</td>
		</tr>
		<tr>
			<td>
				<IconPhone class="size-5" />
			</td>
			<td class="pl-3">
				720-252-1193
			</td>
		</tr>
		<tr>
			<td>
				<IconPin class="size-5" />
			</td>
			<td class="pl-3">
				Sterling, VA
			</td>
		</tr>
		<tr>
			<td>
				<IconLinkedIn class="size-5" />
			</td>
			<td class="max-w-36 truncate pl-3 md:max-w-full">
				<a
					href="https://www.linkedin.com/in/jefharkay"
					class="text-xs underline"
					target="_blank"
				>https://www.linkedin.com/in/jefharkay</a>
			</td>
		</tr>
		<tr>
			<td>
				<IconGitHub class="size-5" />
			</td>
			<td class="max-w-36 truncate pl-3 md:max-w-full">
				<a
					href="https://github.com/incutonez/Sandbox"
					class="text-xs underline"
					target="_blank"
				>https://github.com/incutonez/Sandbox</a>
			</td>
		</tr>
	</table>
</template>
