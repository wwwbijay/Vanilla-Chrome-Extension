chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === "login") {
    flip_user_status(true, request.payload)
      .then((res) => sendResponse(res))
      .catch((err) => console.log(err));
    return true;
  } else if (request.message === "logout") {
    flip_user_status(false, null)
      .then((res) => sendResponse(res))
      .catch((err) => console.log(err));
    return true;
  } else if (request.message === "screenshot") {
    sendResponse(screenCapture());
  }
  return true;
});

async function screenCapture() {
  chrome.tabs.captureVisibleTab(function (screenshotUrl) {
    console.log(screenshotUrl);
    return screenshotUrl;
  });
}

async function flip_user_status(signIn, user_info) {
  if (signIn) {
    try {
      const res = await fetch(
        "https://apitest.boomconcole.com/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user_info),
        }
      );

      return await new Promise((resolve) => {
        if (res.status !== 200) resolve("fail");

        chrome.storage.local.set(
          { userStatus: signIn, user_info },
          function (response) {
            if (chrome.runtime.lastError) resolve("fail");

            // is_user_signed_in = signIn;
            resolve("success");
          }
        );
      });
    } catch (err) {
      return console.log(err);
    }
  } else if (!signIn) {
    // fetch the localhost:3000/logout route
    console.log(1);
    return new Promise((resolve) => {
      chrome.storage.local.get(
        ["userStatus", "user_info"],
        function (response) {
          if (chrome.runtime.lastError) resolve("fail");

          if (response.userStatus === undefined) resolve("fail");

          chrome.storage.local.set(
            { userStatus: signIn, user_info: {} },
            function () {
              console.log(is_user_signed_in());
              if (chrome.runtime.lastError) resolve("fail");
              if (is_user_signed_in() == signIn) resolve("success");
            }
          );
        }
      );
    });
  } else if (request.message === "userStatus") {
    is_user_signed_in()
      .then((res) => {
        sendResponse({
          message: "success",
          userStatus: { user_info: res.user_info.email },
        });
      })
      .catch((err) => console.log(err));
    return true;
  }
}

function is_user_signed_in() {
  return new Promise((resolve) => {
    chrome.storage.local.get(["userStatus", "user_info"], function (response) {
      if (chrome.runtime.lastError)
        resolve({ userStatus: false, user_info: {} });

      resolve(
        response.userStatus === undefined
          ? { userStatus: false, user_info: {} }
          : { userStatus: response.userStatus, user_info: response.user_info }
      );
    });
  });
}

chrome.action.onClicked.addListener((tab) => {
  console.log(tab);
  is_user_signed_in()
    .then((res) => {
      console.log(res);
      if (res.userStatus) {
        chrome.action.setPopup({
          tabId: tab.tabId,
          popup: "./popup/popup-welcome.html",
        });
      } else {
        chrome.action.setPopup({
          popup: "./popup/popup-login.html",
        });
      }
    })
    .catch((err) => console.log(err));
});
