"use strict";

if (core.email) location.href = location.origin;

document.getElementById("login-email").addEventListener("input", function() {
  document.getElementById("login-email").value = document.getElementById("login-email").value.replace(" ", ".").replace(/[^a-z0-9@\.-]/gi,"").substring(0,128).toLowerCase();
});

document.getElementById("login-password").addEventListener("input", function() {
  document.getElementById("login-password").value = document.getElementById("login-password").value.substring(0,128);
});

document.getElementById("login-form").addEventListener("submit", async function() {
  if (document.getElementById("login-email").value === "") return alert("You did not fill out email!");
  if (document.getElementById("login-password").value === "") return alert("You did not fill out password!");
  if (!document.getElementById("login-email").value.includes("@")) document.getElementById("login-email").value += "@hub.hrp";
  document.body.style.cursor = "progress";
  const result = await core.fetch("POST", location.origin + "/account/auth", { email: document.getElementById("login-email").value, password: document.getElementById("login-password").value });
  document.body.style.cursor = null;
  if (result === "denied") return alert("The email or password is incorrect!");
  sessionStorage.setItem("email", result);
  sessionStorage.setItem("password", document.getElementById("login-password").value);
  location.href = location.origin;
});