let companyName;
let jobTitle;
let url;
let appliedDate = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric'
}).format(new Date());
if (location.hostname === "www.indeed.com") {
  const parent = document.querySelector("[data-testid='inlineHeader-companyName']") ?? document.querySelector('.jobsearch-JobInfoHeader-companyNameLink');
  companyName = parent.getElementsByTagName("a")[0]?.innerText || parent.innerText;
  jobTitle = (document.querySelector("[data-testid='jobsearch-JobInfoHeader-title'") ?? document.querySelector("[data-testid='simpler-jobTitle']")).innerText;
  url = location.href.split('?')[0] + `?jk=${Object.fromEntries(new URLSearchParams(location.search)).jk}`;
}
else {
  const parent = document.getElementsByClassName('job-details-jobs-unified-top-card__company-name')[0];
  companyName = parent.getElementsByTagName("a")[0]?.innerText || parent.innerText;
  jobTitle = document.getElementsByClassName('t-24 t-bold inline')[0].innerText;
  url = location.href.split('?')[0];
}
navigator.clipboard.writeText(`${companyName};${jobTitle};${appliedDate};${url}`);
