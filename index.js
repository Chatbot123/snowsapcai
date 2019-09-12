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
		requestify.request(query,{
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
          /*  for(var i = 0; i<count; i++)
            {

                 if(result.results[i].AMOUNT_SOLD)
                {
                    var sale_amount = result.results[i].AMOUNT_SOLD;
                    distext = distext + 'We recorded sales worth of $' + sale_amount;
                }
                 if(result.results[i].MARGIN)
                {
                    var profit_amount = result.results[i].MARGIN;
                    distext = distext + 'We recorded profit worth of $' + profit_amount;
                }

                  if(result.results[i].QUANTITY_SOLD)
                {
                    var qty_sold = result.results[i].QUANTITY_SOLD;
                    distext = distext +'# Units Sold = '+ qty_sold;
                }
                if(result.results[i].STATE)
                {
                    var v_state = result.results[i].STATE;
                    distext = distext + ' in state of ' + v_state;
                }
                if(result.results[i].CITY)
                {
                    var v_city = result.results[i].CITY;
                    distext = distext + ' for city ' + v_city;
                }
                if(result.results[i].SHOP_NAME)
                {
                    var v_shop = result.results[i].SHOP_NAME;
                    distext = distext + ', For shop : ' + v_shop;
                }
                 if(result.results[i].FAMILY_NAME)
                {
                    var v_family = result.results[i].FAMILY_NAME;
                    distext = distext + ', For product family : ' + v_family;
                } 
				if(result.results[i].YR || result.results[i].QTR || result.results[i].MTH)
				{
					distext = distext + ', Time Frame : ';
					  if(result.results[i].YR)
					{
						var v_yr = result.results[i].YR;
						distext = distext +' '+ v_yr;
					} 

					  if(result.results[i].QTR)
					{
						var v_qtr = result.results[i].QTR;
						distext = distext + ' Q' + v_qtr;
					} 

						if(result.results[i].MTH)
					{
						var v_mth = result.results[i].MTH;
						distext = distext + ' MTH ' + v_mth;
					} 
				}
				distext = distext + "\r\n";*/
	    }		 
					
			
			
			
			
			//----------------------------------------------
					var reply = [{
						type: 'text',
						content: result
					}];

						res.status(200).json({
						replies: reply
						
					});
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
				}	
			);
			
			
		/*  	var reply = [{
						type: 'text',
						content: distext
					}];

						res.status(200).json({
						replies: reply
						
						
					});*/
		  
		  
		
			   

});

app.post('/drillDown', (req, res) => 
{
	//console.log(req.body);
		  //obj.hasOwnProperty('foo')
		  //chk for measure value entity
//xsjs_url = xsjs_url+"COMMAND=getmeasure";
		  if(req.body.nlp.entities.hasOwnProperty('ent_measure'))
		  {
			var ent_measure = req.body.nlp.entities.ent_measure[0].raw;
			ent_measure=ent_measure.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_MEASURE=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&ENT_MEASURE=' +ent_measure+"&";  
			  
		  }
		  //-------------------------------------------------------------
		  //chk for state value entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_state_value'))
		  {
			var ent_state_value = req.body.nlp.entities.ent_state_value[0].raw;
			ent_state_value=ent_state_value.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&STATE=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&STATE=' +ent_state_value+"&"; 
		  }
		  //chk for state entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_state'))
		  {
			var ent_state = req.body.nlp.entities.ent_state[0].raw;
			ent_state=ent_state.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_STATE=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&ENT_STATE=' +ent_state+"&"; 
		  }
		  //-------------------------------------------------------------
		   //chk for city value entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_city_value'))
		  {
			var ent_city_value = req.body.nlp.entities.ent_city_value[0].raw;
			ent_city_value=ent_city_value.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&CITY=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&CITY=' +ent_city_value+"&";
		  }
		  //chk for city entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_city'))
		  {
			var ent_city = req.body.nlp.entities.ent_city[0].raw;
			ent_city=ent_city.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_CITY=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&ENT_CITY=' +ent_city+"&";
		  }
		  //-------------------------------------------------------------
		   //-------------------------------------------------------------
		   //chk for shop value entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_shop_value'))
		  {
			var ent_shop_value = req.body.nlp.entities.ent_shop_value[0].raw;
			ent_shop_value=ent_shop_value.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&SHOP=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&SHOP=' +ent_shop_value+"&";
		  }
		  //chk for shop entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_shop'))
		  {
			var ent_shop = req.body.nlp.entities.ent_shop[0].raw;
			ent_shop=ent_shop.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_SHOP=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&ENT_SHOP=' +ent_shop+"&";
		  }
		  //-------------------------------------------------------------
		   //-------------------------------------------------------------
		   //chk for family value entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_family_value'))
		  {
			var ent_family_value = req.body.nlp.entities.ent_family_value[0].raw;
			ent_family_value=ent_family_value.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&FAMILY=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&FAMILY=' +ent_family_value+"&";
		  }
		  //chk for family entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_family'))
		  {
			var ent_family = req.body.nlp.entities.ent_family[0].raw;
			ent_family=ent_family.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_FAM=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&ENT_FAM=' +ent_family+"&";
		  }
		  //-------------------------------------------------------------
		   //-------------------------------------------------------------
		   //chk for city value entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_mth_value'))
		  {
			var ent_mth_value = req.body.nlp.entities.ent_mth_value[0].raw;
			ent_mth_value=ent_mth_value.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&MTH=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&MTH=' +ent_mth_value+"&";
		  }
		  //chk for month entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_mth'))
		  {
			var ent_mth = req.body.nlp.entities.ent_mth[0].raw;
			ent_mth=ent_mth.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_MTH=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&ENT_MTH=' +ent_mth+"&";
		  }
		  //-------------------------------------------------------------
		   //-------------------------------------------------------------
		   //chk for quarter value entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_qtr_value'))
		  {
			var ent_qtr_value = req.body.nlp.entities.ent_qtr_value[0].raw;
			ent_qtr_value=ent_qtr_value.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&QTR=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&QTR=' +ent_qtr_value+"&";
		  }
		  //chk for quarter entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_qtr'))
		  {
			var ent_qtr = req.body.nlp.entities.ent_qtr[0].raw;
			ent_qtr=ent_qtr.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_QTR=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&ENT_QTR=' +ent_qtr+"&";
		  }
		  //-------------------------------------------------------------
		   //-------------------------------------------------------------
		   //chk for year value entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_yr_value'))
		  {
			var ent_yr_value = req.body.nlp.entities.ent_yr_value[0].raw;
			ent_yr_value=ent_yr_value.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&YR=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&YR=' +ent_yr_value+"&";
		  }
		  //chk for year entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_yr'))
		  {
			var ent_yr = req.body.nlp.entities.ent_yr[0].raw;
			ent_yr=ent_yr.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_YR=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&ENT_YR=' +ent_yr+"&";
		  }

	//EXECUTING XSJS
	var distext='';
	requestify.request(xsjs_url,{
				method: 'GET',
				headers : {
					 	 'Content-Type': 'application/json'
						
					},
				auth: {
					username: 'SANYAM_K',
					password: 'Welcome@2345'
					},
				dataType: 'json'
		}).then(function(response)
		{
		
            var result = JSON.parse(response.body);
            var count = Object.keys(result.results).length;
                      
			console.log(result);
            for(var i = 0; i<count; i++)
            {

                 if(result.results[i].AMOUNT_SOLD)
                {
                    var sale_amount = result.results[i].AMOUNT_SOLD;
                    distext = distext + 'We recorded sales worth of $' + sale_amount;
                }
                 if(result.results[i].MARGIN)
                {
                    var profit_amount = result.results[i].MARGIN;
                    distext = distext + 'We recorded profit worth of $' + profit_amount;
                }

                  if(result.results[i].QUANTITY_SOLD)
                {
                    var qty_sold = result.results[i].QUANTITY_SOLD;
                    distext = distext +'# Units Sold = '+ qty_sold;
                }
                if(result.results[i].STATE)
                {
                    var v_state = result.results[i].STATE;
                    distext = distext + ' in state of ' + v_state;
                }
                if(result.results[i].CITY)
                {
                    var v_city = result.results[i].CITY;
                    distext = distext + ' for city ' + v_city;
                }
                if(result.results[i].SHOP_NAME)
                {
                    var v_shop = result.results[i].SHOP_NAME;
                    distext = distext + ', For shop : ' + v_shop;
                }
                 if(result.results[i].FAMILY_NAME)
                {
                    var v_family = result.results[i].FAMILY_NAME;
                    distext = distext + ', For product family : ' + v_family;
                } 
				if(result.results[i].YR || result.results[i].QTR || result.results[i].MTH)
				{
					distext = distext + ', Time Frame : ';
					  if(result.results[i].YR)
					{
						var v_yr = result.results[i].YR;
						distext = distext +' '+ v_yr;
					} 

					  if(result.results[i].QTR)
					{
						var v_qtr = result.results[i].QTR;
						distext = distext + ' Q' + v_qtr;
					} 

						if(result.results[i].MTH)
					{
						var v_mth = result.results[i].MTH;
						distext = distext + ' MTH ' + v_mth;
					} 
				}
				distext = distext + "\r\n";
	    }		 
					
			
			
			
			
			//----------------------------------------------
					var reply = [{
						type: 'text',
						content: distext
					}];

						res.status(200).json({
						replies: reply
						
					});
				}, function(error) 
				{
						var errorMessage = "GET to XSJS service failed";
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
				}	
			);
	
	/*var distext='';
	distext = distext + xsjs_url;
		var reply = [{
						type: 'text',
						content: distext
					}];

						res.status(200).json({
						replies: reply
						
						
					});*/
					
					
/*//sample code to set memory
res.status(200).json({
							replies: reply,
							conversation: {
								memory: { 	ent_measure: ent_measure,
											ent_state_value : ent_state_value,
											ent_state : ent_state
								}
							}
						});			*/				
});


app.post('/drillup', (req, res) => 
{
		 // xsjs_url = xsjs_url+"COMMAND=getmeasure";
		  //chk for measure value entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_measure'))
		  {
			var ent_measure = req.body.nlp.entities.ent_measure[0].raw;
			ent_measure=ent_measure.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_MEASURE=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + '&ENT_MEASURE=' + ent_measure+"&";
			
			  
		  }
		  //-------------------------------------------------------------
		 
		  //chk for state entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_state'))
		  {
			var ent_state = req.body.nlp.entities.ent_state[0].raw;
			ent_state=ent_state.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_STATE=)(.+?)(?=&)/,"");
			xsjs_url = xsjs_url.replace(/(&STATE=)(.+?)(?=&)/,"");
			
		  }
		  //-------------------------------------------------------------
		  //chk for city entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_city'))
		  {
			var ent_city = req.body.nlp.entities.ent_city[0].raw;
			ent_city=ent_city.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_CITY=)(.+?)(?=&)/,"");
			xsjs_url = xsjs_url.replace(/(&CITY=)(.+?)(?=&)/,"");
			
		  }
		  //-------------------------------------------------------------
		   //-------------------------------------------------------------
		  
		  //chk for shop entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_shop'))
		  {
			var ent_shop = req.body.nlp.entities.ent_shop[0].raw;
			ent_shop=ent_shop.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_SHOP=)(.+?)(?=&)/,"");
			xsjs_url = xsjs_url.replace(/(&SHOP=)(.+?)(?=&)/,"");
			
		  }
		  //-------------------------------------------------------------
		   //-------------------------------------------------------------
		
		  //chk for family entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_family'))
		  {
			var ent_family = req.body.nlp.entities.ent_family[0].raw;
			ent_family=ent_family.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_FAM=)(.+?)(?=&)/,"");
			xsjs_url = xsjs_url.replace(/(&FAMILY=)(.+?)(?=&)/,"");
			
		  }
		  //-------------------------------------------------------------
		   //-------------------------------------------------------------
		 
		  //chk for month entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_mth'))
		  {
			var ent_mth = req.body.nlp.entities.ent_mth[0].raw;
			ent_mth=ent_mth.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_MTH=)(.+?)(?=&)/,"");
			xsjs_url = xsjs_url.replace(/(&MTH=)(.+?)(?=&)/,"");
			
		  }
		  //-------------------------------------------------------------
		   //-------------------------------------------------------------
		 
		  //chk for quarter entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_qtr'))
		  {
			var ent_qtr = req.body.nlp.entities.ent_qtr[0].raw;
			ent_qtr=ent_qtr.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_QTR=)(.+?)(?=&)/,"");
			xsjs_url = xsjs_url.replace(/(&QTR=)(.+?)(?=&)/,"");
			
		  }
		  //-------------------------------------------------------------
		   //-------------------------------------------------------------
		 
		  //chk for year entity
		  if(req.body.nlp.entities.hasOwnProperty('ent_yr'))
		  {
			var ent_yr = req.body.nlp.entities.ent_yr[0].raw;
			ent_yr=ent_yr.split(" ").join("");
			xsjs_url = xsjs_url.replace(/(&ENT_YR=)(.+?)(?=&)/,"");
			xsjs_url = xsjs_url.replace(/(&YR=)(.+?)(?=&)/,"");
			
		  }

	//EXECUTING XSJS
	var distext='';
	requestify.request(xsjs_url,{
				method: 'GET',
				headers : {
					 	 'Content-Type': 'application/json'
						
					},
				auth: {
					username: 'SANYAM_K',
					password: 'Sanyam@1234'
					},
				dataType: 'json'
		}).then(function(response)
		{
		
            var result = JSON.parse(response.body);
            var count = Object.keys(result.results).length;
                      
			console.log(result);
            for(var i = 0; i<count; i++)
            {

                 if(result.results[i].AMOUNT_SOLD)
                {
                    var sale_amount = result.results[i].AMOUNT_SOLD;
                    distext = distext + 'We recorded sales worth of $' + sale_amount;
                }
                 if(result.results[i].MARGIN)
                {
                    var profit_amount = result.results[i].MARGIN;
                    distext = distext + 'We recorded profit worth of $' + profit_amount;
                }

                  if(result.results[i].QUANTITY_SOLD)
                {
                    var qty_sold = result.results[i].QUANTITY_SOLD;
                    distext = distext +'# Units Sold = '+ qty_sold;
                }
                if(result.results[i].STATE)
                {
                    var v_state = result.results[i].STATE;
                    distext = distext + ' in state of ' + v_state;
                }
                if(result.results[i].CITY)
                {
                    var v_city = result.results[i].CITY;
                    distext = distext + ' for city ' + v_city;
                }
                if(result.results[i].SHOP_NAME)
                {
                    var v_shop = result.results[i].SHOP_NAME;
                    distext = distext + ', For shop : ' + v_shop;
                }
                 if(result.results[i].FAMILY_NAME)
                {
                    var v_family = result.results[i].FAMILY_NAME;
                    distext = distext + ', For product family : ' + v_family;
                } 
				if(result.results[i].YR || result.results[i].QTR || result.results[i].MTH)
				{
					distext = distext + ', Time Frame : ';
					  if(result.results[i].YR)
					{
						var v_yr = result.results[i].YR;
						distext = distext +' '+ v_yr;
					} 

					  if(result.results[i].QTR)
					{
						var v_qtr = result.results[i].QTR;
						distext = distext + ' Q' + v_qtr;
					} 

						if(result.results[i].MTH)
					{
						var v_mth = result.results[i].MTH;
						distext = distext + ' MTH ' + v_mth;
					} 
				}
				distext = distext + "\r\n";
	    }		 
					
			
			
			
			
			//----------------------------------------------
					var reply = [{
						type: 'text',
						content: distext
					}];

						res.status(200).json({
						replies: reply
						
					});
				}, function(error) 
				{
						var errorMessage = "GET to XSJS service failed";
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
				}	
			);
	
	/*var distext='';
	distext = distext + xsjs_url;
		var reply = [{
						type: 'text',
						content: distext
					}];

						res.status(200).json({
						replies: reply
						
						
					});*/
					
					
/*//sample code to set memory
res.status(200).json({
							replies: reply,
							conversation: {
								memory: { 	ent_measure: ent_measure,
											ent_state_value : ent_state_value,
											ent_state : ent_state
								}
							}
						});			*/				
});

app.post('/errors', (req, res) => {
  console.log(req.body) 
  res.send() 
}) 
/*
//-----------------------------------
app.post('/liststate', (req, res) => 
{
		 xsjs_url = xsjs_url.replace(/(&COMMAND=)(.+?)(?=&)/,"");
			xsjs_url= xsjs_url + "&COMMAND=liststates&";
		  //chk for measure value entity
	
	//EXECUTING XSJS
	var distext='';
	requestify.request(xsjs_url,{
				method: 'GET',
				headers : {
					 	 'Content-Type': 'application/json'
						
					},
				auth: {
					username: 'SANYAM_K',
					password: 'Welcome@2345'
					},
				dataType: 'json'
		}).then(function(response)
		{
		
            var result = JSON.parse(response.body);
            var count = Object.keys(result.results).length;
             distext="We have data for following states\r\n";         
			console.log(result);
            for(var i = 0; i<count; i++)
            {

               

                if(result.results[i].STATE)
                {
                    var v_state = result.results[i].STATE;
					var v_shortstate = result.results[i].SHORT_STATE;
                    distext = distext + v_state + "-> " + v_shortstate;
                }
               
				distext = distext + "\r\n";
	    }		 
					
			distext = distext + "Which would you prefer?\r\n";
			
			
			
			//----------------------------------------------
					var reply = [{
						type: 'text',
						content: distext
					}];

						res.status(200).json({
						replies: reply
						
					});
				}, function(error) 
				{
						var errorMessage = "GET to XSJS service failed";
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
				}	
			);
	
	/*var distext='';
	distext = distext + xsjs_url;
		var reply = [{
						type: 'text',
						content: distext
					}];

						res.status(200).json({
						replies: reply
						
						
					});*/
					
					
/*//sample code to set memory
res.status(200).json({
							replies: reply,
							conversation: {
								memory: { 	ent_measure: ent_measure,
											ent_state_value : ent_state_value,
											ent_state : ent_state
								}
							}
						});						
});
*/
