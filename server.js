const express = require("express");
const bodyParser = require("body-parser");
// Route
const rootRoute = require("./routes/rootRoute");
const registerRoute = require("./routes/registerRoute");
const loginRoute = require("./routes/loginRoute");

const addItemsRoute = require("./routes/items/addItems");
const getItemsRoute = require("./routes/items/getItems");
const addTransactionsRoute = require("./routes/transactions/addTransactions");
const getTransactionsRoute = require("./routes/transactions/getTransactions");

const app = express();
app.use(bodyParser.json());

app.use(rootRoute);
app.use(registerRoute);
app.use(loginRoute);

app.use(addItemsRoute);
app.use(getItemsRoute);
app.use(addTransactionsRoute);
app.use(getTransactionsRoute);

const port = 3000;
app.listen(port, () => {
  console.log(`Backend app is running in http://localhost:${port}`);
});
