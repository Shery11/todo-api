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

  body = _.pick(body,'completed', 'description')
  
  if( ! _.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0){
	  return res.status(400).send()
  }

  body.id = todoNextId++;
  // triming the description
  body.description = body.description.trim();

  
  todo.push(body);
  res.json(body);

});


app.delete('/todo/:id',function(req,res){
  
  var todoId =  parseInt(req.params.id,10);
   console.log(todoId);
  var matchedTodo = _.findWhere(todo,{ id : todoId}); 
  
  if(matchedTodo){
      todo = _.without(todo,matchedTodo);
      res.json(todo);
    }else{
      res.status(404).send();
    }

});


app.put('/todo/:id',function(req,res){
  
  var body = req.body;
  var todoId = parseInt(req.params.id,10);
  var matchedTodo = _.findWhere(todo,{ id : todoId}); 
  body = _.pick(body,'completed', 'description')
  var validAttributes = {};

  if(!matchedTodo){
    return res.status(404).send();
  }


  if(body.hasOwnProperty('completed') && _.isBoolean(body.completed)){
     
     validAttributes.completed = body.completed;
  }else if(body.hasOwnProperty('completed')){
        return res.status(400).send
  }else{

  }
   

  if(body.hasOwnProperty('description') && _.isString(body.description) && body.description.trim().length > 0){
     validAttributes.description = body.description;
  }else if(body.hasOwnProperty('description')){
        return res.status(400).send
  }



  _.extend(matchedTodo,validAttributes);

  res.json(matchedTodo);

    


})


app.listen(PORT,function(){
	console.log('Express listening on port '+ PORT + '!');
})

