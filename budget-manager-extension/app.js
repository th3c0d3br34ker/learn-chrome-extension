$(function () {
  chrome.storage.sync.get(["total", "limit"], function (budget) {
    $("#total").text(budget.total);
    $("#limit").text(budget.limit);
  });

  $("#spendAmount").click(function () {
    chrome.storage.sync.get(["total", "limit"], function (budget) {
      let newTotal = 0;
      if (budget.total) {
        newTotal += parseInt(budget.total);
      }

      const amount = $("#amount").val();
      if (amount) {
        newTotal += parseInt(amount);
      }

      chrome.storage.sync.set({ total: newTotal }, function () {
        if (amount && newTotal >= budget.limit) {
          const notificationOptions = {
            type: "notification",
            options: {
              type: "basic",
              iconUrl: "icon48.png",
              title: "Limit reached!",
              message: "Uh oh, look's like you've reached your alloted limit.",
            },
          };

          chrome.runtime.sendMessage("limitNotif", notificationOptions);
        }
      });
      $("#total").text(newTotal);
      $("#amount").val("");
    });
  });
});
