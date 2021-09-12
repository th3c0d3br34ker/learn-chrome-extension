$(function () {
  chrome.storage.sync.get("limit", function (budget) {
    $("#limit").val(budget.limit);
  });

  $("#saveLimit").click(function () {
    const limit = $("#limit").val();
    if (limit) {
      chrome.storage.sync.set({ limit: limit }, function () {
        close();
      });
    }
  });

  $("#resetTotal").click(function () {
    chrome.storage.sync.set({ total: 0 }, function () {
      const notificationOptions = {
        type: "notification",
        options: {
          type: "basic",
          iconUrl: "icon48.png",
          title: "Resetting Total",
          message: "Total has been reset to 0.",
        },
      };

      chrome.runtime.sendMessage("resetNotif", notificationOptions);
    });
  });
});
