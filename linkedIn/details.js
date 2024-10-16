browser.contextMenus.create({
  id: "details-copy",
  title: "Copy Job Details",
  onclick() {
    browser.tabs.executeScript({
      // This must be a separate file, so we can access the HTML on the current page... background page's can't access the HTML
      // https://stackoverflow.com/a/20419249/1253609
      file: 'details2.js'
    });
  }
});