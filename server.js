var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

// no database connected all the data is stored in this variable
var todo = [
	{
		id : 1,
		description :'Do lunch',
		completed : false
	},
	{
		id : 2,
		description :'Do lunch',
		completed : false
	},
	{
		id : 3,
		description :'Do lunch',
		completed : true
	}
];

app.get('/',function(req,res){
	res.send('To do api route');
});


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

app.listen(PORT,function(){
	console.log('Express listening on port '+ PORT + '!');
})

