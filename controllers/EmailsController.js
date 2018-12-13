const Email = require("../models").Email;
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port : 465,
    auth: {
        user: 'apikey',
        pass: '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'
    }
});

exports.create = (req, res) => {
    const email = new Email(req.body);

    if (email) {

        var mailOptions = {
            from: 'message@ufl.edu',
            to: email.to,
            subject: email.subject,
            text: email.body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                res.status(500).send(error);

            } else {
                res.status(200).send(info.response);
            }
        });


    }
};
