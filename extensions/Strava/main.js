const observer = new MutationObserver(mutations => {
  let found = false;
  for (let mutation of mutations) {
    for (let addedNode of mutation.addedNodes) {
      if (addedNode.className?.includes("feed-mfe")) {
				docReady(changeLinks);
        found = true;
        break;
      }
    }
    if (found) {
      break;
    }
  }
});
observer.observe(document, {
  childList: true,
  subtree: true
});

function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === "complete" || document.readyState === "interactive") {
    // call on next available tick
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
}

function changeLinks() {
	console.log('changeLinks', document.querySelectorAll("[data-testid='activity_name']"));
  document.querySelectorAll("[data-testid='activity_name']").forEach((activity) => {
    activity.href += "/edit";
  });
}

docReady(changeLinks);
