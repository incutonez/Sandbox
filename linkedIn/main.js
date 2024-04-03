/**
 * In order to use this, go to about:debugging#/runtime/this-firefox and load the manifest.json file as the Temporary Add-on
 */
const MatchRegex = /Promoted|Viewed|Applied/;
const CompaniesRegex = /DataAnnotation|Veeva Systems|Aha!/;

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
}
