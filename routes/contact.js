var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('contact', {
		title: 'Contact'
	});
});

router.post('/send', function(req, res, next) {
	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: 'khoa002@gmail.com',
			pass: ''
		}
	});

	var mailOptions = {
		from: 'Khoa Nguyen <khoa002@gmail.com>',
		to: 'khoa002@gmail.com',
		subject: 'Website Submission',
		text: 'You have a new submission with the following details...\n\tName: ' + req.body.name + '\n\tEmail: ' + req.body.email + '\n\tMessage: ' + req.body.message,
		html: '<p>You have a new submission with the following details...</p><blockquote>Name: ' + req.body.name + '<br/>Email: ' + req.body.email + '<br/>Message: ' + req.body.message + '</blocquote>'
	};

	transporter.sendMail(mailOptions, function(error, info) {
		if (error) {
			console.log(error);
			res.redirect('/');
		} else {
			console.log('Message sent: ' + info.response);
			res.redirect('/');
		}
	});
});

module.exports = router;