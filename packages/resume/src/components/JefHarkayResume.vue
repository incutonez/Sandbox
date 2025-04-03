<script setup lang="ts">
import SectionJobDescription from "@/components/SectionJobDescription.vue";
import { EducationRoute, ExperienceRoute, SkillsRoute, SummaryRoute } from "@/router";

const PersonalTasks = [
	"Created sample e-commerce app using React 19, NestJS API, and SQLite DB",
	"Deployed Core UI package to GitHub for consumption in personal Vue projects",
	"Designed micro architecture scaffolding script to increase initial app productivity",
	"Experimented with OOP based UI View Models that encapsulate API calls",
	"Prototyped Legend of Zelda clone using Phaser 3 and TypeScript",
	"Contemplated ways on starting own business to clean up the Internet",
];
const QADTasks = [
	"Increased customer velocity by adding multi-upload area for managing entities",
	"Increased developer velocity by creating common page layouts, inputs, and data tables",
	"Designed provide/inject concept for local state in lieu of Pinia",
	"Led biweekly web forum discussions on technical decisions, roadblocks, and features",
	"Maintained NestJS BFF endpoints, e2e tests, data mappers, and OpenAPI spec",
];
const IntrinsiQTasks = [
	"Added virtual scrolling functionality in non-performant data tables",
	"Tailored core components from scratch and by wrapping Kendo UI components",
	"Designed micro front-end architecture for shared modules",
	"Migrated core components to NPM package for reusability",
	"Completed patient search tool MVP in 3 months, well ahead of schedule",
];
const PureTasks = [
	"Acted as primary lead on financial reporting team and co-led another team",
	"Documented engineering guidelines for more efficient on-boarding process",
	"Designed core components NPM package for offshore team",
	"Collaborated with and provided feedback to product team on mockups for upcoming features",
	"Mentored junior and offshore developers through code reviews and ad hoc meetings",
];
const WideOrbitTasks = [
	"Wrote technical design documents based on product one-pagers",
	"Created wiki documents for best practices, pull request rules, and UI architecture",
	"Designed and shared core components built in Ext JS across multiple teams",
	"Reported over 200 issues on the Sencha Support portal",
	"Patched over 100 framework bugs and quirks",
];
const VitalWareTasks = ["Organized and led UI/UX architecture team", "Prototyped new product based on urgent requirements from CEO and clients", "Designed mock-ups for product managers", "Interviewed candidates for developer positions"];
const WideOrbit2Tasks = ["Optimized Ext JS Grid component for thousands of rows and hundreds of columns", "Held UI/UX meetings with designers, product managers, and other developers", "Led UI development on sell-side platform"];
const TimeWarnerTasks = ["Unified device owners from shared Excel spreadsheet to online web app", "Maintained and developed Ruby API for listing company property", "Migrated from Ruby on Rails UI to Ext JS 4 for improved performance and richer features"];
const DoDTasks = ["Rotated offices every 6-8 months, contributing to several different missions within DoD", "Passed 4 post-graduate level courses at UMBC per development program requirement"];
</script>

<template>
	<article class="space-y-2 bg-white">
		<section :id="SummaryRoute">
			<h2 class="section-title !mb-1 w-full">
				Summary
			</h2>
			<p>
				Meticulous Senior Software Engineer with a big personality looking for an even bigger project to wrangle.  Loves long walks on the beach with Vue but loves learning and trying out new frameworks.  Mentors engineers of all ages, ranks, and walks of life.  Jira champion, world-class organizer, enthusiastic debugger, defensive programmer, effective communicator, and a loud advocator for best practices.
			</p>
		</section>
		<article
			:id="SkillsRoute"
			class="gap-4 flex"
		>
			<section class="flex-3">
				<h2 class="skill-title">
					Front-End Skills
				</h2>
				<ul class="skill-list">
					<li>Vue</li>
					<li>React</li>
					<li>TypeScript</li>
					<li>Ext JS</li>
					<li>JSON</li>
					<li>Phaser</li>
					<li>ECMAScript 6+</li>
					<li>SCSS</li>
					<li>Tailwind</li>
					<li>PrimeVue</li>
					<li>HTML</li>
				</ul>
			</section>
			<section class="flex-2">
				<h2 class="skill-title">
					Back-End Skills
				</h2>
				<ul class="skill-list">
					<li>Node.js</li>
					<li>NestJS</li>
					<li>C#</li>
					<li>TypeORM</li>
					<li>GraphQL</li>
					<li>SQL</li>
					<li>REST</li>
					<li>CRUD</li>
				</ul>
			</section>
			<section class="flex-2">
				<h2 class="skill-title">
					Misc Skills
				</h2>
				<ul class="skill-list">
					<li>Data Modeling</li>
					<li>AWS</li>
					<li>Rapid Prototyping</li>
					<li>OOP</li>
					<li>Web Sockets</li>
					<li>OpenAPI</li>
				</ul>
			</section>
		</article>
		<article
			:id="ExperienceRoute"
			class="flex flex-col"
		>
			<h1 class="section-title">
				Experience
			</h1>
			<section class="flex flex-col space-y-3">
				<SectionJobDescription
					date-start="Mar 2024"
					project="Vue 3, React 19, TypeScript, TailwindCSS 4, NestJS, OpenAPI"
					company="Personal Growth"
					location="Remote"
					industry="Personal Tech"
					position="Senior Web Engineer"
					date-end="Present"
					:tasks="PersonalTasks"
				/>
				<SectionJobDescription
					date-start="Mar 2023"
					project="Vue 3, TypeScript, Tailwind, Pinia, NestJS, OpenAPI"
					company="QAD Redzone"
					location="Remote"
					industry="Manufacturing Tech"
					position="Senior Web Engineer"
					date-end="Feb 2024"
					:tasks="QADTasks"
				/>
				<!-- Add a page break after this element because the print would cut it off improperly, and it just looks unprofessional -->
				<SectionJobDescription
					date-start="May 2022"
					project="Vue 3, TypeScript, Tailwind, C#"
					company="IntrinsiQ"
					location="Remote"
					industry="Health Tech"
					position="Software Developer (contractor)"
					date-end="Dec 2022"
					class="print:break-after-page"
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
					class="print:pt-4"
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
					:tasks="VitalWareTasks"
				/>
				<SectionJobDescription
					date-start="Apr 2015"
					project="Ext JS, C#"
					company="WideOrbit"
					location="Lynnwood, WA"
					industry="Advertising Tech"
					position="UI Developer (contractor)"
					date-end="Feb 2017"
					:tasks="WideOrbit2Tasks"
				/>
				<SectionJobDescription
					date-start="Aug 2013"
					project="Ext JS, Node.js, Ruby, Web Sockets"
					company="Time Warner Cable"
					location="Broomfield, CO"
					industry="Communications Tech"
					position="UI Developer (contractor)"
					date-end="Mar 2015"
					:tasks="TimeWarnerTasks"
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
					:tasks="DoDTasks"
				/>
			</section>
		</article>
		<article :id="EducationRoute">
			<h1 class="section-title">
				Education
			</h1>
			<section class="flex gap-x-8">
				<section>
					<div class="font-semibold">
						Bachelor of Computer Science
					</div>
					<div>
						Pennsylvania State University
					</div>
					<div>
						Aug 2006 - May 2010
					</div>
				</section>
				<section>
					<div class="font-semibold">
						4 Postgraduate Classes
					</div>
					<div>
						University of Maryland, Baltimore County
					</div>
					<div>
						Aug 2010 - May 2012
					</div>
				</section>
			</section>
		</article>
		<section class="mt-5 flex">
			<!-- Because this only shows in print preview, AND we have a print page break in JefHarkayResume, we can't
        -- use mt-auto, as the position of this element gets altered from the calculated mt-auto that would be
        -- correct if we didn't have the print page break -->
			<a
				target="_blank"
				class="hidden print:inline underline mx-auto"
				title="https://incutonez.github.io/Sandbox/resume/"
				href="https://incutonez.github.io/Sandbox/resume/"
			>Created with ❤️ and Vue</a>
		</section>
	</article>
</template>
