const express = require('express');
const app = express();

app.use(express.static(__dirname));
app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/assets'));

app.listen(process.env.PORT || 8080, () => {
    console.log('working...');
});