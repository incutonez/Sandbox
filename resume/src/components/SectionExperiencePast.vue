<script setup lang="ts">
import SectionJobDescription from "@/components/SectionJobDescription.vue";
</script>

<template>
	<article class="flex flex-col">
		<h1 class="section-title">
			Past Experience
		</h1>
		<section class="flex flex-col space-y-4">
			<SectionJobDescription
				date-start="Apr 2018"
				project="Ext JS, C#"
				company="WideOrbit"
				location="Remote"
				industry="Advertising Tech"
				position="Senior Software Engineer"
				date-end="Apr 2021"
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
</template>
