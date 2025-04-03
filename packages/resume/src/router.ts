import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import JefHarkayCoverLetter from "@/components/JefHarkayCoverLetter.vue";
import JefHarkayResume from "@/components/JefHarkayResume.vue";

export const duration = 3000;

export const ResumeRoute = "resume";

export const SummaryRoute = "summary";

export const SkillsRoute = "skills";

export const ExperienceRoute = "experience";

export const EducationRoute = "education";

export const CoverLetterRoute = "coverLetter";

export const routes: RouteRecordRaw[] = [{
	path: "/",
	redirect: {
		name: SummaryRoute,
	},
}, {
	path: "/resume",
	name: ResumeRoute,
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
	scrollBehavior(to, from) {
		const { name = "" } = to;
		let timeout = duration;
		/**
		 * If we're coming from the root route (usually initial page load), or we're transitioning to the cover letter,
		 * or we're on the Resume page, we want to disable the delay for the router to perform scrolling.
		 */
		if (from.fullPath === "/" || name === CoverLetterRoute || to.matched[0]?.name === ResumeRoute && from.matched[0]?.name === ResumeRoute) {
			timeout = 0;
		}
		return new Promise((resolve) => {
			setTimeout(() => {
				if (name === CoverLetterRoute || name === SummaryRoute) {
					resolve({
						top: 0,
						left: 0,
						behavior: "smooth",
					});
				}
				return resolve({
					el: `#${name.toString()}`,
					top: 104,
					behavior: "smooth",
				});
			}, timeout);
		});
	},
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
