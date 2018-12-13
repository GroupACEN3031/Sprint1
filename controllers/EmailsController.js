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
