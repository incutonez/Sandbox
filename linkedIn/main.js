/**
 * In order to use this, go to about:debugging#/runtime/this-firefox and load the manifest.json file as the Temporary Add-on
 */
const MatchRegex = /Viewed|Applied|Promoted/;
const CompaniesRegex = /SproutsAI|Bluelight|GrabCareers|TieTalent|Pearson|Data Revolution|Understanding Recruitment|Umicas|Canonical|B4Corp|Wesley Finance|Phoenix Recruitment|Globe Life|Childhood Cancer Society|Mobius Ventures|Breezy Talent|Find Next Hire|Timely Find|Finding Candidate|Jobs via Dice|Geico|Novum Global|Pragmatike|Energy Jobline|JTek Software Solutions|Software Technology Inc|Get It|Actalent|Patterned Learning|G2i|SideRamp|DataAnnotation|Veeva Systems|Aha!|HireMeFast|Team Remotely|Recruiting from Scratch|myGwork|Jerry|RemoteWorker|ClickJobs\.io|Varsity Tutors|Ascendion|Capital One/i;
const Today = new Date();
const OneWeek = 604800000;
const HoursAgoRegex = /(\d+) hours ago/;
const MinutesAgoRegex = /minutes ago/;
const RemoteOrLocalRegex = /, (va|md|dc)|\(remote\)/i;
const HoursToCheck = undefined;
const cardClass = ".ember-view.scaffold-layout__list-item";
const LocationClass = ".artdeco-entity-lockup__caption";

setInterval(removeJobs, 100);

function removeJobs() {
	document.querySelectorAll(LocationClass).forEach((el) => {
		if (!el.innerText.match(RemoteOrLocalRegex)) {
			el.closest(cardClass).remove();
		}
	});
	document.querySelectorAll(".job-card-container__footer-item").forEach((el) => {
		if (el.innerHTML.match(MatchRegex)) {
			el.closest(cardClass).remove();
		}
	});
	document.querySelectorAll(".artdeco-entity-lockup__subtitle").forEach((el) => {
		if (el.innerHTML.match(CompaniesRegex)) {
			el.closest(cardClass).remove();
		}
	});
	document.querySelectorAll(".job-card-container__footer-item time").forEach((el) => {
		const text = el.innerText;
		if (Today - new Date(el.getAttribute("datetime")) > OneWeek) {
			el.closest(cardClass).remove();
		}
		else if (HoursToCheck && !MinutesAgoRegex.test(text)) {
			const match = text?.match(HoursAgoRegex)?.[1];
			if (!match || +match > HoursToCheck) {
				el.closest(cardClass).remove();
			}
		}
	});
}