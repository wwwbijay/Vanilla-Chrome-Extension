// let button = document.getElementsByTagName('button')[0];
// button.addEventListener("click", () => {
//   chrome.runtime.sendMessage({ message: "logout" }, function (response) {
//     if (response === "success") {
//       window.location.replace("./popup-login.html")
//     };
//   });
// });
let loader = false;
let save_btn = document.getElementById("save_button");
// Set event listeners for the start and stop buttons
save_btn.addEventListener(
  "click",
  (evt) => {
    chrome.runtime.sendMessage({ message: "screenshot" }, function (response) {
      console.log(response);
    });
  },
  false
);

async function startCapture() {
  // chrome.desktopCapture.chooseDesktopMedia(
  //   ["screen", "window", "tab"],
  //   tab,
  //   (streamId) => {
  //     //check whether the user canceled the request or not
  //     if (streamId && streamId.length) {
  //     }
  //   }
  // );
}

is_user_signed_in()
  .then((res) => {
    console.log(res);
    if (!res.userStatus) window.location.replace("./popup-login.html");
  })
  .catch((err) => console.log(err));
