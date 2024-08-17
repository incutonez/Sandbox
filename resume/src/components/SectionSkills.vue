<script setup lang="ts">
import RowSkill from "@/components/RowSkill.vue";
</script>

<template>
	<article class="space-y-4">
		<h1 class="section-title">
			Skills
		</h1>
		<section class="!mt-1">
			<h2 class="font-semibold underline">
				Front-End
			</h2>
			<table class="w-full">
				<RowSkill
					skill="Vue.js"
					:rating="5"
				/>
				<RowSkill
					skill="JSON"
					:rating="5"
				/>
				<RowSkill
					skill="TypeScript"
					:rating="4"
				/>
				<RowSkill
					skill="ECMAScript 6+"
					:rating="4"
				/>
				<RowSkill
					skill="Tailwind CSS"
					:rating="4"
				/>
				<RowSkill
					skill="HTML"
					:rating="4"
				/>
				<RowSkill
					skill="PrimeVue"
					:rating="3"
				/>
				<RowSkill
					skill="SCSS"
					:rating="3"
				/>
			</table>
		</section>
		<section>
			<h2 class="font-semibold underline">
				Back-End
			</h2>
			<table class="w-full">
				<RowSkill
					skill="Node.js"
					:rating="3"
				/>
				<RowSkill
					skill="NestJS"
					:rating="3"
				/>
				<RowSkill
					skill="TypeORM"
					:rating="2"
				/>
				<RowSkill
					skill="C#"
					:rating="2"
				/>
				<RowSkill
					skill="GraphQL"
					:rating="2"
				/>
				<RowSkill
					skill="SQL"
					:rating="2"
				/>
			</table>
		</section>
		<section>
			<h2 class="font-semibold underline">
				Misc
			</h2>
			<table class="w-full">
				<RowSkill
					skill="Data Modeling"
					:rating="4"
				/>
				<RowSkill
					skill="OOP"
					:rating="4"
				/>
				<RowSkill
					skill="OpenAPI"
					:rating="4"
				/>
				<RowSkill
					skill="REST"
					:rating="4"
				/>
				<RowSkill
					skill="Web Sockets"
					:rating="3"
				/>
			</table>
		</section>
	</article>
</template>

<style scoped lang="scss">

</style>
