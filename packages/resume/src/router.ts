import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import JefHarkayCoverLetter from "@/components/JefHarkayCoverLetter.vue";
import JefHarkayResume from "@/components/JefHarkayResume.vue";

const SummaryRoute = "summary";
const SkillsRoute = "skills";
const ExperienceRoute = "experience";
const EducationRoute = "education";
const CoverLetterRoute = "coverLetter";

export const routes: RouteRecordRaw[] = [{
	path: "/resume",
	children: [{
		path: "summary",
		name: SummaryRoute,
		components: {
			JefHarkayResume,
		},
	}, {
		path: "skills",
		name: SkillsRoute,
		components: {
			JefHarkayResume,
		},
	}, {
		path: "experience",
		name: ExperienceRoute,
		components: {
			JefHarkayResume,
		},
	}, {
		path: "education",
		name: EducationRoute,
		components: {
			JefHarkayResume,
		},
	}],
}, {
	path: "/cover-letter",
	name: CoverLetterRoute,
	components: {
		JefHarkayCoverLetter,
	},
}];

export const router = createRouter({
	routes,
	history: createWebHashHistory(),
});

export function viewResumeSummary() {
	return router.push({
		name: SummaryRoute,
	});
}

export function viewResumeSkills() {
	return router.push({
		name: SkillsRoute,
	});
}

export function viewResumeExperience() {
	return router.push({
		name: ExperienceRoute,
	});
}

export function viewResumeEducation() {
	return router.push({
		name: EducationRoute,
	});
}

export function viewCoverLetter() {
	return router.push({
		name: CoverLetterRoute,
	});
}
