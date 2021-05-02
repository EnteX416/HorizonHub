"use strict";

document.getElementById("delete-account-email").addEventListener("input", function() {
  document.getElementById("delete-account-email").value = document.getElementById("delete-account-email").value.replace(" ", ".").replace(/[^@a-z0-9\.-]/gi,"").substring(0, 32).toLowerCase();
});

document.getElementById("delete-account").addEventListener("submit", async function() {
  if (document.getElementById("delete-account-email").value === "") return alert("You did not specify which account you wanted to delete! Error: delete-account-email. No value");
  
  const verification = prompt(`Are you sure you want to delete: ${document.getElementById("delete-account-email").value}? Type "yes" to confirm.`);
  if (verification !== "yes") return alert("Canceled.");
  
  document.body.style.cursor = "progress";
  const result = await core.fetch("POST", location.origin + "/admin-panel/delete-account", { deleteAccountEmail: document.getElementById("delete-account-email").value }, true);
  document.body.style.cursor = null;
  
  if (result === "fulfilled") return alert(`Account: ${document.getElementById("delete-account-email").value} has been deleted.`);
  if (result === "denied") return alert("Denied.");
});

/* document.getElementById("change-name").addEventListener("submit", async function() {
  if (document.getElementById("change-account-email").value === "") return alert("You did not specify which account you wanted to change! Error: change-account-email. No value");
  if (document.getElementById("change-name-email").value === "") return alert("You did not specify what should be the new name! Error: change-name-email. No value");
  
  const verification = prompt(`Are you sure you want to change: ${document.getElementById("change-account-email").value}? Type "yes" to confirm.`);
  if (verification !== "yes") return alert("Canceled.");
  
  document.body.style.cursor = "progress";
  const result = await core.fetch("POST", location.origin + "/admin-panel/change-account", { changeAccountEmail: document.getElementById("change-account-email").value }, true);
  document.body.style.cursor = null;
  
  if (result === "fulfilled") return alert(`Account: ${document.getElementById("changed-account-email").value} has been changed.`);
  if (result === "denied") return alert("Denied.");
});


Change account name WiP
*/