<script setup lang="ts">
import IconEmail from "@/assets/IconEmail.vue";
import IconGitHub from "@/assets/IconGitHub.vue";
import IconLinkedIn from "@/assets/IconLinkedIn.vue";
import IconPhone from "@/assets/IconPhone.vue";
import IconPin from "@/assets/IconPin.vue";
import SectionJobDescription from "@/components/SectionJobDescription.vue";

const QADTasks = [
	"Led biweekly web forum discussions on technical decisions, roadblocks, and features",
	"Maintained NestJS BFF endpoints, e2e tests, data mappers, and OpenAPI spec",
	"Introduced components for common page layouts, inputs, and data tables",
	"Architected provide/inject concept for local state in lieu of Pinia",
	"Increased velocity for getting MVP production ready",
];
const IntrinsiQTasks = ["Tailored core components from scratch and by wrapping Kendo UI components", "Implemented micro front-end architecture for shared modules", "Migrated core components to NPM package for reusability", "Completed patient search tool MVP in 3 months"];
const PureTasks = ["Acted as primary lead on financial reporting team and co-led another team", "Documented engineering guidelines for more efficient on-boarding process", "Designed core components NPM package for offshore team", "Mentored junior developers"];
const WideOrbitTasks = [
	"Wrote technical design documents for Jira epics",
	"Created wiki documents for best practices, pull request rules, and UI architecture",
	"Reported over 200 issues on the Sencha Support portal",
	"Patched over 100 framework bugs and quirks",
	"Implemented complex nested routing across applications",
];
</script>

<template>
	<main class="mx-auto flex overflow-auto bg-white md:h-letter md:w-letter">
		<section class="flex flex-1 flex-col">
			<article class="flex justify-between bg-blue-resume p-4 text-white">
				<section class="flex flex-col">
					<h1 class="text-3xl font-semibold">
						Jef Harkay
					</h1>
					<h2 class="text-xl">
						Senior Software Engineer
					</h2>
				</section>
				<ul>
					<li class="flex items-center space-x-2">
						<IconEmail class="size-5" />
						<a
							href="mailto:jefharkay@gmail.com"
							class="underline"
							target="_blank"
						>jefharkay@gmail.com</a>
					</li>
					<li class="flex items-center space-x-2">
						<IconPhone class="size-5" />
						<span>
							720-252-1193
						</span>
					</li>
					<li class="flex items-center space-x-2">
						<IconPin class="size-5" />
						<span>
							Fairfax, VA
						</span>
					</li>
				</ul>
				<ul>
					<li class="flex items-center space-x-2">
						<IconLinkedIn class="size-5" />
						<a
							href="https://www.linkedin.com/in/jefharkay"
							class="underline"
							target="_blank"
						>linkedin.com/in/jefharkay</a>
					</li>
					<li class="flex items-center space-x-2">
						<IconGitHub class="size-5" />
						<a
							href="https://github.com/incutonez"
							class="underline"
							target="_blank"
						>github.com/incutonez</a>
					</li>
				</ul>
			</article>
			<article class="flex space-x-8 bg-white px-4 pt-2">
				<section class="flex-1 space-y-4">
					<article>
						<h1 class="section-title">
							Summary
						</h1>
						<p class="text-sm">
							Meticulous Senior Software Engineer with a big personality looking for an even bigger project to wrangle.  Loves long walks on the beach with Vue but has a curiosity for learning React or Angular.  Mentors engineers of all ages, ranks, and walks of life.  Jira champion, enthusiastic debugger, defensive programmer, effective communicator, and a loud advocator for best practices.
						</p>
					</article>

					<article class="flex flex-col">
						<h1 class="section-title">
							Experience
						</h1>
						<section class="flex flex-col space-y-3">
							<SectionJobDescription
								date-start="Mar 2023"
								project="Vue 3, TypeScript 5.x, Tailwind, Pinia, NestJS, OpenAPI"
								company="QAD Redzone"
								location="Remote"
								industry="Manufacturing Tech"
								position="Senior Web Engineer"
								date-end="Feb 2024"
								:tasks="QADTasks"
							/>
							<SectionJobDescription
								date-start="May 2022"
								project="Vue 3, TypeScript, Tailwind, C#"
								company="IntrinsiQ"
								location="Remote"
								industry="Health Tech"
								position="Software Developer (contractor)"
								date-end="Dec 2022"
								:tasks="IntrinsiQTasks"
							/>
							<SectionJobDescription
								date-start="Aug 2021"
								project="Vue 3, TypeScript, GraphQL, Node.js"
								company="PURE Property Management"
								location="Remote"
								industry="Property Tech"
								position="SSE/Tech Lead"
								date-end="Apr 2022"
								:tasks="PureTasks"
							/>
							<SectionJobDescription
								date-start="Apr 2018"
								project="Ext JS, C#"
								company="WideOrbit"
								location="Remote"
								industry="Advertising Tech"
								position="Senior Software Engineer"
								date-end="Apr 2021"
								:tasks="WideOrbitTasks"
							/>
							<SectionJobDescription
								date-start="May 2017"
								project="Ext JS, GraphQL, ColdFusion"
								company="VitalWare"
								location="Remote"
								industry="Health Tech"
								position="Web Developer"
								date-end="Mar 2018"
							/>
							<SectionJobDescription
								date-start="Apr 2015"
								project="Ext JS, C#"
								company="WideOrbit"
								location="Lynnwood, WA"
								industry="Advertising Tech"
								position="UI Developer (contractor)"
								date-end="Feb 2017"
							/>
							<SectionJobDescription
								date-start="Aug 2013"
								project="Ext JS, Node.js, Ruby"
								company="Time Warner Cable"
								location="Broomfield, CO"
								industry="Communications Tech"
								position="UI Developer (contractor)"
								date-end="Mar 2015"
							/>
							<SectionJobDescription
								date-start="Jun 2010"
								project="Ext JS, jQuery, Perl, AngularJS"
								company="Dept. of Defense"
								location="Fort Meade, MD"
								industry="Classified Tech"
								position="Cryptologic Computer Scientist"
								date-end="Jul 2013"
								multiple-projects
							/>
						</section>
					</article>
				</section>
				<section class="relative flex max-w-56 flex-col space-y-4">
					<article class="space-y-4">
						<section>
							<h2 class="section-title">
								Front-End Skills
							</h2>
							<ul class="flex flex-wrap gap-x-2 gap-y-1">
								<li>Vue.js</li>
								<li>Ext JS</li>
								<li>TypeScript</li>
								<li>JSON</li>
								<li>ECMAScript 6+</li>
								<li>Tailwind CSS</li>
								<li>SCSS</li>
								<li>PrimeVue</li>
								<li>Phaser</li>
								<li>HTML</li>
							</ul>
						</section>
						<section>
							<h2 class="section-title">
								Back-End Skills
							</h2>
							<ul class="flex flex-wrap gap-x-2 gap-y-1">
								<li>Node.js</li>
								<li>NestJS</li>
								<li>C#</li>
								<li>CRUD</li>
								<li>TypeORM</li>
								<li>GraphQL</li>
								<li>SQL</li>
							</ul>
						</section>
						<section>
							<h2 class="section-title">
								Misc Skills
							</h2>
							<ul class="flex flex-wrap gap-x-2 gap-y-1">
								<li>Data Modeling</li>
								<li>OOP</li>
								<li>OpenAPI</li>
								<li>REST</li>
								<li>Web Sockets</li>
							</ul>
						</section>
					</article>
					<article>
						<h1 class="section-title">
							Education
						</h1>
						<section>
							<div class="font-semibold">
								Bachelor of Computer Science
							</div>
							<div>
								Penn State
							</div>
							<div>
								Aug 2006 - May 2010
							</div>
						</section>
						<section class="mt-4">
							<div class="font-semibold">
								4 Postgraduate Classes
							</div>
							<div>
								UMBC
							</div>
							<div>
								Aug 2010 - May 2012
							</div>
						</section>
					</article>
					<section class="absolute bottom-2 w-full text-center">
						<a
							target="_blank"
							class="underline"
							title="https://incutonez.github.io/Sandbox/resume/"
							href="https://incutonez.github.io/Sandbox/resume/"
						>Created with ❤️ and Vue</a>
					</section>
				</section>
			</article>
		</section>
	</main>
</template>
