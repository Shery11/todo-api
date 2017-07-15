var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var _ = require('underscore');

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
   
	var matchedTodo = _.findWhere(todo,{ id : todoId}); 
	
	if(matchedTodo){
      res.json(matchedTodo);
    }else{
    	res.status(404).send();
    }

});

// POST /todos/:id

app.post('/todo',function(req,res){
  var body = req.body;
  
  if( ! _.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
	  return res.status(400).send()
  }

  body.id = todoNextId++;
  todo.push(body);
  res.json(body);

});


app.listen(PORT,function(){
	console.log('Express listening on port '+ PORT + '!');
})

