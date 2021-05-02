"use strict";

const core = {
  email: sessionStorage.getItem("email"),
  fetch: function(method, path, data = {}, sendCredentials = false) {
    return new Promise(function(resolve, err) {
      if (sendCredentials) { data.email = core.email, data.password = sessionStorage.getItem("password") }
      const xhr = new XMLHttpRequest();
      xhr.open(method, path);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
          resolve(xhr.response);
        } else err(xhr);
      };
      xhr.onerror = function() { err(xhr); };
      xhr.send(JSON.stringify(data));
    });
  }
};
var currentmail = core.email
if (core.email) {
  document.getElementById("nav-login").remove();
  document.getElementById("nav-register").remove();
  
  document.getElementById("nav-loggedintext").innerHTML = "Signed in as <b>" + core.email + "</b>";
  document.getElementById("nav-loggedin").style.display = null;
  document.getElementById("nav-logout").style.display = null;
  
  document.getElementById("nav-logout-button").addEventListener("click", function() {
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("password");
  });
} else {
  document.getElementById("nav-login").style.display = null;
  document.getElementById("nav-register").style.display = null;
  
  document.getElementById("nav-loggedin").remove();
  document.getElementById("nav-logout").remove();
};