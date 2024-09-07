/**
 * In order to use this, go to about:debugging#/runtime/this-firefox and load the manifest.json file as the Temporary Add-on
 */
const MatchRegex = /Viewed|Applied/;
const CompaniesRegex = /SideRamp|DataAnnotation|Veeva Systems|Aha!|HireMeFast|Team Remotely|Recruiting from Scratch|myGwork|Jerry|RemoteWorker|ClickJobs\.io|Varsity Tutors|Ascendion/i;
const Today = new Date();
const OneWeek = 604800000;
const HoursAgoRegex = /(\d+) hours ago/;
const MinutesAgoRegex = /minutes ago/;
const HoursToCheck = undefined;

setInterval(removeJobs, 100);

function removeJobs() {
	document.querySelectorAll(".job-card-container__footer-item").forEach((el) => {
		if (el.innerHTML.match(MatchRegex)) {
			el.closest(".jobs-search-results__list-item").remove();
		}
	});
	document.querySelectorAll(".job-card-container__primary-description").forEach((el) => {
		if (el.innerHTML.match(CompaniesRegex)) {
			el.closest(".jobs-search-results__list-item").remove();
		}
	});
	if (HoursToCheck) {
		document.querySelectorAll(".job-card-container__footer-item time").forEach((el) => {
			const text = el.innerText;
			if (Today - new Date(el.getAttribute("datetime")) > OneWeek) {
				el.closest(".jobs-search-results__list-item").remove();
			}
			else if (!MinutesAgoRegex.test(text)) {
				const match = text?.match(HoursAgoRegex)?.[1];
				if (!match || +match > HoursToCheck) {
					el.closest(".jobs-search-results__list-item").remove();
				}
			}
		});
	}
}
