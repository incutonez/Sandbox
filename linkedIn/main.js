/**
 * In order to use this, go to about:debugging#/runtime/this-firefox and load the manifest.json file as the Temporary Add-on
 */
const MatchRegex = /Viewed|Applied|Promoted/;
const CompaniesRegex = /DataAnnotation|Veeva Systems|Aha!|HireMeFast|Team Remotely|Recruiting from Scratch|myGwork|Jerry/i;
const Today = new Date();

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
	document.querySelectorAll(".job-card-container__footer-item time").forEach((el) => {
		if (Today - new Date(el.getAttribute("datetime")) > 604800000) {
			el.closest(".jobs-search-results__list-item").remove();
		}
	});
}
