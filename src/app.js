const fs = require("fs");
const nodemailer = require("nodemailer");

/* Add html file as message stream */
var htmlstream = fs.createReadStream("../dist/index.html");

/* Add credentials for sender */
const sender = "sender@mail.com";
const password = "password";

/* Add recipient email address */
var recipient = "recipient@mail.com";

/* Frame message */
var message = {
	from: sender,
	to: recipient,
	subject: "Subject",
	text: "Text",
	html: htmlstream,
	attachments: [{
		filename: "image.png",
		path: "/img",
		cid: "update" //Add an image as cid
	}],
	dsn: {
		id: "Test Message",
		return: "headers",
		notify: ["failure", "delay","success"],
		recipient: sender
	} 
};

/* Create transporter */
let transporter = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secure: false, // should be true for 465, false for other ports
	auth: {
		user: sender, 
		pass: password
	},
	ignoreTLS: false,
	debug: false,
	tls: { 
		rejectUnauthorized: false 
	}
});
/* Verify transporter */
transporter.verify(function(error) {
	if (error) {
		console.log(error);
	} else {
		console.log("Server is ready to take our messages");
	}
});


// send mail
transporter.sendMail(message, (error, info) => {
	if (error) {
		return console.log(error);
	}
	console.log("Message sent: %s", info.messageId);
	transporter.close();
});