document.getElementById('login_button').addEventListener('click', login);

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

is_user_signed_in()
    .then((res) => {
      console.log(res);
      if (res.userStatus) 
        window.location.replace("./popup-welcome.html");
      
    })
    .catch((err) => console.log(err));


  function login(){
    let payload_data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };
    
    console.log(payload_data);
    
    if (email && password) {
      // send message to background script with email and password
      chrome.runtime.sendMessage(
        { message: "login", payload: payload_data },
        function (response) {
          if (response === "success")
            window.location.replace("./popup-welcome.html");
        }
      );
    } else {
    }
  }
  




//...
