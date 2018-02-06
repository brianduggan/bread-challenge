const express = require('express');
const app = express();

app.use(express.static('.'));

app.get('/', function(req,res){
  res.render('index');
});

var port = 4000;
app.listen(port, () => console.log('Example app listening on port ' + port))
