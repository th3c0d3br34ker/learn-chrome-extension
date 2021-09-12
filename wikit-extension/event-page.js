var menuItem = {
  id: "Wikit",
  title: "Wikit",
  contexts: ["selection"],
};

chrome.contextMenus.create(menuItem);

function fixedEncodeURI(str) {
  return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}

chrome.contextMenus.onClicked.addListener(function (clickData) {
  if (clickData.menuItemId == "Wikit" && clickData.selectionText) {
    const wikiUrl =
      "https://en.wikipedia.org/wiki/" +
      fixedEncodeURI(clickData.selectionText);

    const createData = {
      url: wikiUrl,
      type: "popup",
      top: 5,
      left: 50,
      width: 800,
      height: 500,
    };

    chrome.windows.create(createData, function () {});
  }
});
