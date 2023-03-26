document.getElementById('login_button').addEventListener('click', login);

  function login(){
    let payload_data = {
      email: document.getElementById("email").value,
      password: document.getElementById("password").value
    };
    
    console.log(email && password);
    
    if (email && password) {
      // send message to background script with email and password
      chrome.runtime.sendMessage(
        { message: "login", payload: payload_data },
        function (response) {
          if (response === "success")
            window.location.replace("./popup-signout.html");
        }
      );
    } else {
    }
  }
  




//...
