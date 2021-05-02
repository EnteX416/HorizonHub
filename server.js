"use strict";

const port = 3000;

const express = require("express");
//const fs = require("fs");
//const mime = require("mime/lite");
const bodyParser = require("body-parser");
const compression = require("compression");
//const rimraf = require("rimraf");
const db = require("quick.db");
const sanitizeHtml = require("sanitize-html");

const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server, { perMessageDeflate: false });

app.use(compression());
app.use(express.static("public"));
app.use(bodyParser.json());

/*db.set("users.turnip@hub.hrp.emails.Inbox", new Array(2048).fill({
  authorName: "Cloud System",
  author: "Not Applicable",
  subject: "Email System Stress Test",
  body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Suspendisse in est ante in nibh mauris cursus. Feugiat scelerisque varius morbi enim nunc faucibus a pellentesque sit. Eu scelerisque felis imperdiet proin. Cras pulvinar mattis nunc sed blandit. At erat pellentesque adipiscing commodo elit at. Tincidunt eget nullam non nisi est. Eget nunc lobortis mattis aliquam faucibus purus in. Aliquet risus feugiat in ante metus. Sed lectus vestibulum mattis ullamcorper velit sed ullamcorper. Ipsum dolor sit amet consectetur adipiscing elit. Ultricies mi quis hendrerit dolor magna eget. Non sodales neque sodales ut. Lectus quam id leo in vitae turpis massa sed. Mattis enim ut tellus elementum sagittis. Gravida cum sociis natoque penatibus et magnis. Massa vitae tortor condimentum lacinia quis. Sagittis vitae et leo duis ut diam quam nulla. Nec feugiat in fermentum posuere urna. Faucibus in ornare quam viverra orci. Tristique magna sit amet purus gravida quis blandit. Vel pharetra vel turpis nunc eget lorem dolor sed. Sit amet est placerat in egestas erat imperdiet sed. Placerat duis ultricies lacus sed turpis tincidunt id aliquet risus. Eu ultrices vitae auctor eu. Dictum at tempor commodo ullamcorper a lacus. Enim blandit volutpat maecenas volutpat. Pellentesque id nibh tortor id aliquet lectus proin nibh. Non sodales neque sodales ut etiam sit. Donec et odio pellentesque diam volutpat commodo sed egestas. Dignissim enim sit amet venenatis. Pretium lectus quam id leo. Morbi leo urna molestie at elementum eu. Mauris nunc congue nisi vitae suscipit tellus mauris a diam. Pharetra vel turpis nunc eget lorem. Feugiat sed lectus vestibulum mattis. Tortor at auctor urna nunc id cursus metus aliquam. Vestibulum sed arcu non odio. Eget lorem dolor sed viverra. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris. Orci nulla pellentesque dignissim enim sit amet venenatis. Tellus molestie nunc non blandit massa enim nec dui. Cras sed felis eget velit aliquet sagittis id. Aliquam malesuada bibendum arcu vitae. Eleifend donec pretium vulputate sapien nec sagittis. Id aliquet risus feugiat in ante metus dictum at. Integer eget aliquet nibh praesent. Ipsum dolor sit amet consectetur adipiscing elit duis. Natoque penatibus et magnis dis parturient montes nascetur ridiculus. Suspendisse in est ante in nibh. Semper risus in hendrerit gravida rutrum quisque non tellus. Enim tortor at auctor urna nunc id cursus metus aliquam. A cras semper auctor neque vitae tempus quam pellentesque. Pharetra pharetra massa massa ultricies mi quis hendrerit. Proin sagittis nisl rhoncus mattis rhoncus urna. Feugiat sed lectus vestibulum mattis ullamcorper velit. Nunc consequat interdum varius sit amet. Nunc sed id semper risus in hendrerit gravida rutrum quisque. Eu consequat ac felis donec et. Viverra orci sagittis eu volutpat. Tortor at auctor urna nunc id cursus metus. Amet nisl suscipit adipiscing bibendum est ultricies integer quis auctor. Scelerisque eleifend donec pretium vulputate sapien nec sagittis. Sapien et ligula ullamcorper malesuada proin libero nunc. A iaculis at erat pellentesque adipiscing commodo elit at imperdiet. Mattis vulputate enim nulla aliquet porttitor lacus. Libero justo laoreet sit amet cursus sit. Nulla facilisi etiam dignissim diam quis. Sit amet nulla facilisi morbi. Dolor sit amet consectetur adipiscing elit ut aliquam purus. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Sit amet massa vitae tortor condimentum lacinia quis vel eros. Neque gravida in fermentum et sollicitudin. Vel risus commodo viverra maecenas accumsan lacus vel facilisis. Rutrum quisque non tellus orci ac auctor augue mauris augue. Ac tortor dignissim convallis aenean et tortor at risus viverra. Orci phasellus egestas tellus rutrum tellus pellentesque eu. Pellentesque habitant morbi tristique senectus et netus et. Mi eget mauris pharetra et ultrices neque ornare aenean. Nibh nisl condimentum id venenatis a. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh. Est ante in nibh mauris cursus mattis molestie. Nisi est sit amet facilisis. Viverra suspendisse potenti nullam ac tortor vitae purus faucibus. Sociis natoque penatibus et magnis dis parturient montes. In fermentum posuere urna nec tincidunt praesent semper feugiat. Eget dolor morbi non arcu risus quis varius. Velit sed ullamcorper morbi tincidunt ornare massa eget egestas. Odio tempor orci dapibus ultrices in iaculis nunc sed. Sed egestas egestas fringilla phasellus. Eget dolor morbi non arcu risus. Ultrices mi tempus imperdiet nulla malesuada pellentesque. Quis eleifend quam adipiscing vitae. Sed felis eget velit aliquet sagittis. Euismod nisi porta lorem mollis aliquam ut porttitor leo. Vel pharetra vel turpis nunc. Tristique nulla aliquet enim tortor at auctor urna nunc. In egestas erat imperdiet sed euismod nisi porta. Elementum nisi quis eleifend quam adipiscing vitae proin. Urna cursus eget nunc scelerisque. Viverra justo nec ultrices dui sapien eget mi proin sed. A cras semper auctor neque vitae tempus quam pellentesque nec. Lorem dolor sed viverra ipsum nunc aliquet bibendum. Id nibh tortor id aliquet lectus proin nibh. Non tellus orci ac auctor augue mauris augue neque. Consectetur adipiscing elit ut aliquam purus sit amet luctus. Curabitur gravida arcu ac tortor dignissim convallis aenean. Suspendisse in est ante in. Bibendum at varius vel pharetra vel turpis nunc eget. Ultrices eros in cursus turpis massa tincidunt dui ut ornare. Vel pretium lectus quam id leo in. At augue eget arcu dictum varius duis at. Faucibus et molestie ac feugiat sed lectus vestibulum. Non enim praesent elementum facilisis leo. Aliquet nibh praesent tristique magna sit amet purus gravida quis. Aliquet nec ullamcorper sit amet risus nullam eget. Ac tortor vitae purus faucibus ornare suspendisse sed nisi lacus. Sed vulputate odio ut enim blandit volutpat maecenas volutpat blandit. Scelerisque felis imperdiet proin fermentum leo vel orci porta non. Ut tristique et egestas quis ipsum. Suscipit adipiscing bibendum est ultricies integer quis auctor elit. Habitant morbi tristique senectus et netus. Commodo elit at imperdiet dui accumsan sit amet nulla facilisi. Amet massa vitae tortor condimentum lacinia quis. Ultricies mi quis hendrerit dolor magna eget est lorem. Sed arcu non odio euismod. Ornare suspendisse sed nisi lacus sed viverra tellus in. Bibendum at varius vel pharetra vel turpis nunc eget. Ut lectus arcu bibendum at varius vel pharetra vel. Sit amet tellus cras adipiscing enim eu turpis egestas pretium. Vitae auctor eu augue ut lectus arcu bibendum. Purus viverra accumsan in nisl nisi scelerisque eu ultrices. Id ornare arcu odio ut. Odio tempor orci dapibus ultrices in iaculis nunc sed. Tristique sollicitudin nibh sit amet commodo nulla facilisi nullam. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque viverra. Blandit libero volutpat sed cras ornare arcu dui. Enim neque volutpat ac tincidunt. Vitae aliquet nec ullamcorper sit amet risus nullam. Sem nulla pharetra diam sit amet nisl. Iaculis eu non diam phasellus vestibulum lorem sed risus. Magnis dis parturient montes nascetur ridiculus mus. Enim eu turpis egestas pretium aenean. Augue ut lectus arcu bibendum at varius. Augue ut lectus arcu bibendum at varius vel pharetra vel. Duis ultricies lacus sed turpis tincidunt id. Diam phasellus vestibulum lorem sed. Facilisis mauris sit amet massa vitae tortor condimentum lacinia quis. Phasellus faucibus scelerisque eleifend donec pretium vulputate sapien nec. Vel pretium lectus quam id leo in vitae turpis massa. Dolor sit amet consectetur adipiscing elit. Quis auctor elit sed vulputate mi sit amet mauris. Neque vitae tempus quam pellentesque nec nam aliquam. Ultrices dui sapien eget mi proin sed. Orci sagittis eu volutpat odio facilisis. Semper eget duis at tellus. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Potenti nullam ac tortor vitae purus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames.",
  timestamp: Date.now()
}));*/

// Auth

const authenticate = function(email, password) {
  if (!email || !password || !db.has(`users.${email}.password`)) return false;
  return db.get(`users.${email}.password`) === password;
};

app.post("/account/register", function(req, res) {
  if (!req.body.email || !req.body.password) return res.send("denied");
  req.body.email =
    req.body.email
      .replace(/[^a-z0-9\.-]/gi, "")
      .substring(0, 32)
      .toLowerCase() + "@hub.hrp";
  if (db.has(`users.${req.body.email}.password`)) return res.send("exists");
  req.body.password = req.body.password.substring(0, 128);
  db.set(`users.${req.body.email}.password`, req.body.password);
  db.set(`users.${req.body.email}.emails`, {
    Inbox: [],
    Starred: [],
    Sent: []
  });
  return res.send(req.body.email);
});

app.post("/account/auth", function(req, res) {
  return res.send(
    authenticate(req.body.email, req.body.password) ? req.body.email : "denied"
  );
});

// Email

app.post("/email/get", function(req, res) {
  if (!authenticate(req.body.email, req.body.password) || !req.body.category) return res.send("denied");
  return res.send(
    db.get(`users.${req.body.email}.emails.${req.body.category}`)
  );
});

app.post("/email/send", function(req, res) {
  if (
    !authenticate(req.body.email, req.body.password) ||
    !req.body.target ||
    !req.body.body
  )
    return res.send("denied");

  req.body.subject = req.body.subject
    ? req.body.subject.substring(0, 128)
    : "No subject";
  req.body.body = sanitizeHtml(req.body.body);

  const sentEmails = db.get(`users.${req.body.email}.emails.Sent`);
  sentEmails.unshift({
    timestamp: Date.now(),
    target: req.body.target,
    subject: req.body.subject,
    body: req.body.body
  });
  db.set(`users.${req.body.email}.emails.Sent`, sentEmails);

  if (!db.has(`users.${req.body.target}.password`)) {
    const sentEmails = db.get("users.mailer-daemon@hub.hrp.emails.Sent");
    sentEmails.unshift({
      timestamp: Date.now(),
      target: req.body.email,
      subject: "Email was not delivered",
      body: `<span style="color:red;text-align:center;display:block;">Only trust official Cloud System emails that come from <b>mailer-daemon@hub.hrp.</b></span><br><div style="padding:5px 15px;display:inline-block;border-radius:5px;border:1px solid darkgray;"><h1 style="margin-top:15px">Address not found</h1> The target account <div style="display:inline-block;border:1px solid darkgray;border-radius:16px;margin:0 5px;font-weight:bold;padding:5px 10px;user-select:all;">${req.body.target}</div> does not exist.</div>`
    });
    db.set("users.mailer-daemon@hub.hrp.emails.Sent", sentEmails);

    const emails = db.get(`users.${req.body.email}.emails.Inbox`);
    emails.unshift({
      timestamp: Date.now(),
      authorName: "Cloud System",
      author: "mailer-daemon@hub.hrp",
      subject: "Email was not delivered",
      body: `<span style="color:red;text-align:center;display:block;">Only trust official Cloud System emails that come from <b>mailer-daemon@hub.hrp.</b></span><br><div style="padding:5px 15px;display:inline-block;border-radius:5px;border:1px solid darkgray;"><h1 style="margin-top:15px">Address not found</h1> The target account <div style="display:inline-block;border:1px solid darkgray;border-radius:16px;margin:0 5px;font-weight:bold;padding:5px 10px;user-select:all;">${req.body.target}</div> does not exist.</div>`
    });
    db.set(`users.${req.body.email}.emails.Inbox`, emails);

    return res.send("fulfilled");
  }

  const emails = db.get(`users.${req.body.target}.emails.Inbox`);
  const email = {
    timestamp: Date.now(),
    author: req.body.email,
    subject: req.body.subject,
    body: req.body.body
  };
  if (req.body.email === req.body.target) email.authorName = "You";
  emails.unshift(email);
  db.set(`users.${req.body.target}.emails.Inbox`, emails);

  io.to(req.body.target).emit("email-refresh");
  return res.send("fulfilled");
});

app.post("/email/update", function(req, res) {
  if (
    !authenticate(req.body.email, req.body.password) ||
    !req.body.action ||
    !req.body.category ||
    !db.has(`users.${req.body.email}.emails.${req.body.category}`)
  )
    return res.send("denied");
  const emails = db.get(`users.${req.body.email}.emails.${req.body.category}`);
  if (!emails[req.body.id]) return res.send("denied");
  switch (req.body.action) {
    case "read":
      emails[req.body.id].read = true;
      break;
    case "unread":
      emails[req.body.id].read = false;
      break;
    case "delete":
      emails.splice(req.body.id, 1);
      break;
    default:
      return res.send("denied");
  }
  db.set(`users.${req.body.email}.emails.${req.body.category}`, emails);
  return res.send("fulfilled");
});

/*

req: is an object representing data
req.body: data
req.body.email: the email account of the client posting to the endpoint
req.body.password:  the password of the client posting to the endpoint

*/

// Admin Panel

const allowedEmails = [ // emails with access to admin panel
  "horizon.hub@hub.hrp",
  "wcente@hub.hrp",
  "turnip@hub.hrp"
];

/*
req.body.deleteAccountEmail: account to delete based on email
*/
app.post("/admin-panel/delete-account", function(req, res) {
  if (!authenticate(req.body.email, req.body.password) || !allowedEmails.includes(req.body.email)) return res.send("denied");
  
  if (!db.get(`users.${req.body.deleteAccountEmail}`)) return res.send("denied");
  
  const accounts = db.get("users");
  const success = delete accounts[req.body.deleteAccountEmail.substring(0, req.body.deleteAccountEmail.indexOf("."))];
  if (success) {
    db.set("users", accounts);
    return res.send("fulfilled");
  } else return res.send("fulfilled");
});

// Misc

app.get("/index/get-number-of-registered-users", function(req, res) { res.send(Object.keys(db.get("users")).length.toString()); });

server.listen(port, () => console.log(`Online. Port ${port}`));

// Email RT Update

io.on("connect", socket =>
  socket.on("email-register-for-rtrefresh", email => socket.join(email))
);