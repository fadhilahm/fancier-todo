const axios = require("axios");

module.exports = {
  sendEmail(payload, email) {
    axios({
      method: "POST",
      url: "https://fancytodo-2089.restdb.io/mail",
      data: {
        to: email,
        subject: "You have created a new Todo!",
        html: `
        <h1>Todo Details :</h1>
        <hr>
        <h2>Title : ${payload.title}</h2>
        <h2>Description : ${payload.description}</h2>
        <h2>due_date: ${payload.due_date}</h2>
        <h2>status : ${payload.status}</h2>
        <hr>
        <h1>Remember to do it alrite :)</h1>
        `,
        company: "fadhilahm's fancier todo",
        sendername: "fadhilahm's fancier todo support"
      },
      headers: {
        "x-apikey": process.env.REST_DB_KEY
      }
    });
  }
};
