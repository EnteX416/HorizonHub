"use strict";

if (core.email) location.href = location.origin;

document.getElementById("register-email").addEventListener("input", function() {
  document.getElementById("register-email").value = document.getElementById("register-email").value.replace(" ", ".").replace(/[^a-z0-9\.-]/gi,"").substring(0,32).toLowerCase();
});

document.getElementById("register-password").addEventListener("input", function() {
  document.getElementById("register-password").value = document.getElementById("register-password").value.substring(0,128);
});

document.getElementById("register-form").addEventListener("submit", async function() {
  if (document.getElementById("register-email").value === "") return alert("You did not fill out email!");
  if (document.getElementById("register-password").value === "") return alert("You did not fill out password!");
  document.body.style.cursor = "progress";
  const result = await core.fetch("POST", location.origin + "/account/register", { email: document.getElementById("register-email").value, password: document.getElementById("register-password").value });
  document.body.style.cursor = null;
  if (result === "exists") return alert("The email you are trying to register already exists.");
  sessionStorage.setItem("email", result);
  sessionStorage.setItem("password", document.getElementById("register-password").value);
  location.href = location.origin;
});