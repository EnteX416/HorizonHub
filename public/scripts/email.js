"use strict";

var category = "Inbox";
var selected = null;

const favicon = new Favico({ animation: "none" });

const refresh = async function(silent) {
  if (!silent) {
    document.getElementById("email-info-shown").style.display = "none";
    document.getElementById("email-compose").style.display = "none";
    document.getElementById("email-info-hidden").style.display = "flex";
    selected = null;
  }
  
  document.getElementById("email-info-temporary").innerText = "Working...";
  const result = await core.fetch("POST", location.origin + "/email/get", { category: category }, true);
  if (result === "denied") { sessionStorage.removeItem("email"); sessionStorage.removeItem("password"); return location.href = location.origin + "/login.html"; }
  
  document.getElementById("email-list").innerHTML = `<item style="will-change:transform;position:sticky;top:0;font-weight:bold;border-bottom:1px solid rgba(255,255,255,0.2);background:rgba(60,60,60,0.8);backdrop-filter:blur(10px);"><itemcell>${category === "Sent" ? "To" : "Author"}</itemcell><itemcell>Subject</itemcell></item>`;
  const emails = JSON.parse(result);
  
  emails.forEach((email, index) => {
    const item = document.createElement("item");
    item.tabIndex = "0";
    
    const date = new Date(email.timestamp);
    
    if (!email.read && !email.target) item.classList.add("unread");
    
    item.onclick = async function(event) {
      document.getElementById("email-compose").style.display = "none";
      if (selected) { selected.classList.remove("selected"); } else { document.getElementById("email-info-shown").style.display = null; document.getElementById("email-info-hidden").style.display = "none"; }; selected = item;
      if (!email.read) core.fetch("POST", location.origin + "/email/update", { action: "read", id: index, category: category }, true);
      email.read = true;
      item.classList.add("selected");
      item.classList.remove("unread");
      if (email.authorName) { document.getElementById("email-info-author").innerHTML = `From <b style="color:black">${email.authorName}</b> <inline style="color:black;user-select:all;">${email.author}</inline>`; } else document.getElementById("email-info-author").innerHTML = `From <b style="color:black;user-select:all;">${email.author}</b>`;
      if (email.target) { document.getElementById("email-info-author").innerHTML = `To <b style="color:black;user-select:all;">${email.target}</b>`; };
      document.getElementById("email-info-subject").innerText = email.subject;
      document.getElementById("email-info-timestamp").innerText = date.toLocaleString("en-En", { month: "short", day: "numeric" }) + " | " + date.toLocaleString("en-En", { timeStyle: "short", hour12: true });
      document.getElementById("email-info-body").innerHTML = email.body;
      
      document.getElementById("email-info-temporary").innerText = "Retrieved " + emails.length + " emails. " + (category === "Sent" ? "" : emails.filter(email => !email.read).length + " unread.");
      
      if (category !== "Sent") favicon.badge(emails.filter(email => !email.read).length);
    };
    
    const authorCell = document.createElement("itemcell");
    authorCell.style = "font-weight:bold";
    authorCell.innerText = email.authorName ? email.authorName: email.author;
    authorCell.title = email.author;
    if (email.target) authorCell.innerText = email.target === core.email ? "Yourself" : email.target;
    const subjectCell = document.createElement("itemcell");
    subjectCell.innerText = subjectCell.title = email.subject;

    item.appendChild(authorCell);
    item.appendChild(subjectCell);
    document.getElementById("email-list").appendChild(item);
  });
  
  document.getElementById("email-info-temporary").innerText = "Retrieved " + emails.length + " emails. " + (category === "Sent" ? "" : emails.filter(email => !email.read).length + " unread.");
  
  if (category !== "Sent") favicon.badge(emails.filter(email => !email.read).length); else favicon.badge(0);
}; refresh();
document.getElementById("email-topbar-refresh").onclick = function() { refresh(); };

document.getElementById("email-categories-Inbox").onclick = function() {
  document.getElementById("email-categories-" + category).classList.remove("selected");
  document.getElementById("email-categories-Inbox").classList.add("selected");
  category = "Inbox";
  refresh();
};
document.getElementById("email-categories-Sent").onclick = function() {
  document.getElementById("email-categories-" + category).classList.remove("selected");
  document.getElementById("email-categories-Sent").classList.add("selected");
  category = "Sent";
  refresh();
};
document.getElementById("email-categories-Starred").onclick = function() {
  document.getElementById("email-categories-" + category).classList.remove("selected");
  document.getElementById("email-categories-Starred").classList.add("selected");
  category = "Starred";
  refresh();
};

document.getElementById("email-compose-to").addEventListener("input", function() {
  document.getElementById("email-compose-to").value = document.getElementById("email-compose-to").value.replace(" ", ".").replace(/[^a-z0-9@\.-]/gi,"").substring(0,128).toLowerCase();
});
document.getElementById("email-compose-subject").addEventListener("input", function() {
  document.getElementById("email-compose-subject").value = document.getElementById("email-compose-subject").value.substring(0,128);
});

document.getElementById("email-topbar-compose").onclick = function() {
  if (selected) selected.classList.remove("selected"); selected = null;
  document.getElementById("email-info-shown").style.display = "none";
  document.getElementById("email-info-hidden").style.display = "none";
  document.getElementById("email-compose").style.display = null;
};

document.getElementById("email-compose-send").onclick = async function() {
  document.getElementById("email-compose-send").disabled = "disabled";
  document.getElementById("email-info-temporary").innerText = "Sending...";
  if (!document.getElementById("email-compose-to").value.includes("@")) document.getElementById("email-compose-to").value += "@hub.hrp";
  const result = await core.fetch("POST", location.origin + "/email/send", { target: document.getElementById("email-compose-to").value, subject: document.getElementById("email-compose-subject").value, body: document.getElementById("email-compose-body").value }, true);
  if (result === "denied") { document.getElementById("email-compose-send").disabled = null; alert("Error when sending. Did you fill out the body and address?"); return document.getElementById("email-info-temporary").innerText = "Error while sending."; };
  refresh();
  document.getElementById("email-compose-send").disabled = null;
};

const socket = io({ transports: ["websocket"] });

socket.on("connect", () => {
  socket.emit("email-register-for-rtrefresh", core.email);
});

socket.on("email-refresh", () => refresh(true));