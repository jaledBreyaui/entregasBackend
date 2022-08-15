const express = require('express');
const app = express()
port = 4000

app.listen(4000, err => {
    if (err) throw new Error(err)
    console.log(`Listening on port ${port}`);
})