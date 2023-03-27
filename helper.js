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