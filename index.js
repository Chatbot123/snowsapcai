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

//code for creating servicenow incident
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
		var table = "incident";
		query = "https://"+instance+".service-now.com/"+table+".do?JSONv2&sysparm_action=insert";
		  	
		var myJSONObject = {'short_description' : issue };
		console.log(myJSONObject);
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
           	var incident_no =  result.records[0].number;
		var sys_id = result.records[0].sys_id;
		var speech = "Incident Created Successfully for issue "+issue+" and your incident number is "+incident_no;
		speech = speech+" Sys_id is "+sys_id+"\r\n";
			
		speech = speech+" Thanks for contacting us."
                      
				//----------------------------------------------
			var reply = [{
				type: 'text',
				content: speech
				}];

			res.status(200).json({
					replies: reply });
		}, function(error) 
		{
						var errorMessage = "POST request failed";
						if(error.code && error.body) {
							errorMessage += " - " + error.code + ": " + error.body
						}
						
						
								
		});
			
			
});
////code for creating servicenow incident ends here

//code to get servicenow incident status

app.post('/ticketstatus', (req, res) => 
{
		  console.log(req.body);
		  	  
		  
		  //chk for person name entity
		  if(req.body.nlp.entities.hasOwnProperty('ticketno'))
		  {
			var ticketno = req.body.nlp.entities.ticketno[0].raw;
		  }
		  //-------------------------------------------------------------
		ticketno=ticketno.padStart(7, '0');
		
		var instance = "dev75823";
		var table = "incident";
		query = "https://"+instance+".service-now.com/"+table+".do?JSONv2&sysparm_action=getRecords&sysparm_query=numberENDSWITH"+ticketno;
		  //-------------------------------------------------------------
		  console.log(query);
		
		  
		
		//console.log(myJSONObject);
		//----------------------------------------------------------------------------------------
		//executing servicenow query
		//--------------------------------------------------------------------------------------
		requestify.request(query,
		{
				method: 'GET',
				headers : {
					 	 'Content-Type': 'application/json'
						
					},
				auth: {
					username: 'admin',
					password: 'Ctli1234'
					},
				
				dataType: 'json'
		}).then(function(response)
		{
		
            		var result = JSON.parse(response.body);
		if(result.records[0].length == 0)
				speech = "Sorry given incident number does not exist. Please provide a valid number";
		else
		{
			assigned_to =  result.records[0].assigned_to;
				//console.log(assigned_to);
			number =  result.records[0].number;
				//console.log(number);
			state =  result.records[0].state;
				//console.log(state);
			sys_updated_by = result.records[0].sys_updated_by;
			sys_updated_on = result.records[0].sys_updated_on;
			short_description = result.records[0].short_description;


			if(assigned_to=="")
			{
				assigned_to = "Nobody";
			}

			switch(state){
			    case '1':
				dis_state = "New";
				break;
			    case '2':
				dis_state = "In Progress";
				break;
			    case '3':
				dis_state = "On Hold";
				break;
			    case '7':
				dis_state = "Closed";
				break;

			}
				console.log(dis_state);
			speech = "Incident "+number+" is currently assigned to "+assigned_to+". Current status of  the incident is "+dis_state+" . This incident was last updated by "+sys_updated_by+" on "+sys_updated_on;
			speech = speech + " The incident was raised for the issue "+short_description+"\r\n";

			speech = speech+" Thanks for contacting us."
				
		}
                     console.log(speech); 
				//----------------------------------------------
			var reply = [{
				type: 'text',
				content: speech
				}];

			res.status(200).json({
					replies: reply });
		}, function(error) 
		{
						var errorMessage = "GET request failed";
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
