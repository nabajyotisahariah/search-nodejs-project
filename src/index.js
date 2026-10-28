const express = require('express');
const routes = require('./route');

const app = express();
const port = process.env.PORT || 3000;

app.use(routes);
app.use("/api/search", routes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});