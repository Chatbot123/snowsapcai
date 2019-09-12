//const request = new recastai.request('f6f1cfd675c26656fef9a2367f62c4a4');
//global.xsjs_url = "http://74.201.240.43:8000/ChatBot/Sample_chatbot/Efashion_azure.xsjs?";
//var request = require('request-promise-native');
//var sapcai = require('sapcai').default
//var request = new sapcai.request('f6f1cfd675c26656fef9a2367f62c4a4', 'en')
//const recastai = require('recastai').default;


const express = require('express');
const bodyParser = require('body-parser');
const requestify = require('requestify');
const app = express() 

app.use(bodyParser.json()) 

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`));


app.post('/raiseticket', (req, res) => 
{
		  console.log(req.body);
		  		  
		  
		  
		  //chk for person name entity
		  if(req.body.nlp.entities.hasOwnProperty('person'))
		  {
			var name = req.body.nlp.entities.person[0].raw;
		  }
		  //-------------------------------------------------------------
		  //chk for issue value entity
		  if(req.body.nlp.entities.hasOwnProperty('issue'))
		  {
			var issue = req.body.nlp.entities.issue[0].raw;
		  }
		
		var instance = "dev75823";
	//	var username = "admin";
		//var password = "Ctli1234";
		var table = "incident";
		query = "https://"+instance+".service-now.com/"+table+".do?JSONv2&sysparm_action=insert";
		  //-------------------------------------------------------------
		  var distext = '';
		  
		
		  
		var myJSONObject = {'short_description' : issue };
//----------------------------------------------------------------------------------------
//executing servicenow query
//--------------------------------------------------------------------------------------
		requestify.request(query,
		{
				method: 'POST',
				headers : {
					 	 'Content-Type': 'application/json'
						
					},
				auth: {
					username: 'admin',
					password: 'Ctli1234'
					},
				body : myJSONObject,
				dataType: 'json'
		}).then(function(response)
		{
		
            var result = JSON.parse(response.body);
            var count = Object.keys(result.results).length;
                      
			console.log(result);
          
	    		 
					
			
			
			
			
			//----------------------------------------------
			var reply = [{
				type: 'text',
				content: result
				}];

			res.status(200).json({
					replies: reply });
		}, function(error) 
		{
						var errorMessage = "POST request failed";
						if(error.code && error.body) {
							errorMessage += " - " + error.code + ": " + error.body
						}
						console.log("Something went wrong with the call");
						console.log(errorMessage);
						console.log(error.body);
						
						//Try to provide a proper error response
						
						var reply = [{
							type: 'text',
							content: "I'm sorry! Something went wrong with the call to the XSJS query. Try asking a different question."
						}];

						res.status(200).json({
							replies: reply
							
						});			
		});
			
			
});


app.post('/errors', (req, res) => {
  console.log(req.body) 
  res.send() 
}) 
