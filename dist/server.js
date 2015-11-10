var express = require('express');
var app = express();
var isProduction = process.env.NODE_ENV === 'production';
var port = isProduction ? process.env.PORT : 3000;

app.use(express.static(__dirname));

app.listen(port, function () {
    console.log('Fremoverlent demo lytter på port ' + port);
});