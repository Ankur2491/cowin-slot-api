const Cors = require('cors');
const axios = require('axios');
const express = require("express");
const app = express();
app.use(Cors())
let port = process.env.PORT || 3005;

app.options("/fetchSlots/:pin/:date", function (req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.end();
});
app.get("/fetchSlots/:pin/:date", (req, res) => {
  const options = {
    headers: { 'Accept': 'application/json' }
  }
  let pin = req.params.pin
  let selectedDate = req.params.date
  axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=${pin}&date=${selectedDate}`, options).then(response => {
    res.send(response.data)
  })
});

app.listen(port, () => {
  console.log(`Example app is listening on port http://localhost:${port}`)
});
