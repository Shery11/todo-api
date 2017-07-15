var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;

// no database connected all the data is stored in this variable
var todo = [];

var todoNextId = 1;

app.get('/',function(req,res){
	res.send('To do api route');
});


app.use(bodyParser.json());


app.get('/todos',function(req,res){
    res.json(todo);
});

app.get('/todos/:id',function(req,res){
	// req.params.id is always a string
	var todoId =  parseInt(req.params.id,10);
    var matched; 
    todo.forEach(function(todo){
    	
       if(todo.id === todoId){
       	 matched = todo;
       	}
    });

    if(matched){
      res.json(matched);
    }else{
    	res.status(404).send();
    }

});

// POST /todos/:id

app.post('/todo',function(req,res){
  var body = req.body;

  body.id = todoNextId++;
   
  
   todo.push(body);



  res.json(body);
});


app.listen(PORT,function(){
	console.log('Express listening on port '+ PORT + '!');
})

