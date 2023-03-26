document.getElementById("logout_button").addEventListener("click", logout);

function logout() {
  chrome.runtime.sendMessage({ message: "logout" }, function (response) {
    if (response === "success") window.location.replace("./popup-login.html");
  });
}
