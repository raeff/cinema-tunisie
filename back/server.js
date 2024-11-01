//require express framework
function main() {
  const cors = require("cors");

  const multer = require("multer");

  const nodemailer = require("nodemailer");

  const details = require("./details.json");
  var express = require("express"),
    app = express(),
    //to execute on port 3000
    port = process.env.PORT || 3000,
    mongoose = require("mongoose"),
    bodyParser = require("body-parser");

  // mongoose instance connection url connection
  mongoose.Promise = global.Promise;
  //connecting to DB using mongoose
  //Database with name bookmymovie-db will create automatically

  mongoose.connect(
    "mongodb+srv://thesparklers:The_Sparklers@1@bookmymoviecluster-9bnce.mongodb.net/bookmymovie-db?retryWrites=true",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
    }
  );

  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      callBack(null, "../front/src/assets/Images");
    },
    filename: (req, file, callBack) => {
      callBack(null, `${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage });

  //let upload = multer({ dest: 'uploads/' })

  app.post("/file", upload.single("file"), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error("No File");
      error.httpStatusCode = 400;
      return next(error);
    }
    res.send(file);
  });

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());

  //importing contact routes

  app.use(cors());
  var routes = require("./api/routes/Routes");
  routes(app); //register the route
  app.listen(port);
  console.log("API server started on: " + port);

  app.post("/sendmail", (req, res) => {
    console.log("request came");
    let user = req.body;
    sendMail(user, (info) => {
      console.log(`The mail has beed send 😃 and the id is ${info.messageId}`);
      res.send(info);
    });
  });

  async function sendMail(user, callback) {
    // create reusable transporter object using the default SMTP transport
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = "0";
    let testAccount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });

    // send mail with defined transport object

    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <raeffekih777@gmail.com>', // sender address
      to: user.email, // list of receivers
      subject: "Hello ✔", // Subject line
      text: "Hello world?", // plain text body
      html: "<b>Hello world?</b>", // html body
    });

    callback(info);
  }
}

main();
