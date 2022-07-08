sap.ui.controller("calendarevents.first", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf calendarevents.first
*/
	onInit: function() {
		var page = sap.ui.view({id:"idsecond", viewName:"calendarevents.second", type:sap.ui.core.mvc.ViewType.JS});
		app.addPage(page);
		
//		var oData={
//				users:[
//					    {
//					      "name": "Alexander Hanoi",
//					      "email": "ht@gmail.com",
//					      "password": "pass",
//						  "events": [],
//					      "id": 1
//					    },
//					    {
//					      "name": "Hash",
//					      "email": "h@gmail.com",
//					      "password": "12345",
//					      "events": [],
//					      "id": 2
//					    },
//					    {
//					      "name": "Andrei Grigor",
//					      "email": "ag@gmail.com",
//					      "password": "12345",
//					      "events": [],
//					      "id": 3
//					    },
//					    {
//					      "name": "Mihai Posdarescu",
//					      "email": "m@gmail.com",
//					      "password": "12345",
//					      "events": [
//						        {
//						          "name": "wtbwb",
//						          "from": "09:00",
//						          "to": "12:00",
//						          "reccurence": true,
//						          "day": "2022-05-23",
//						          "id": 1653296849897,
//						          "description": "Dress Code"
//						        },
//						        {
//						          "name": "Appointment 2",
//						          "from": "09:00",
//						          "to": "13:00",
//						          "reccurence": false,
//						          "day": "2022-05-01",
//						          "id": 1653307369001,
//						          "description": "Poate tine mai mult decat timpul estimat"
//						        }
//					      ],
//					      "id": 4
//					    },
//					    {
//					      "name": "Doru Aleatoru",
//					      "email": "do@gmail.com",
//					      "password": "12345",
//					      "events": [
//						        {
//						          "name": "Ceva",
//						          "from": "11:00",
//						          "to": "12:00",
//						          "reccurence": true,
//						          "id": 1652635305993,
//						          "description": ""
//						        }
//					      ],
//					      "id": 5
//					    },
//					    {
//					      "name": "Test",
//					      "email": "test@gmail.com",
//					      "password": "12345",
//					      "events": [],
//					      "id": 6
//					    },
//					    {
//					      "name": "Ion Ionul",
//					      "email": "ion@gmail.com",
//					      "password": "12345",
//					      "events": [
//						        {
//						          "name": "Teems Meeting",
//						          "from": "09:00",
//						          "to": "14:00",
//						          "reccurence": false,
//						          "day": "2022-05-22",
//						          "id": 1653215394767,
//						          "description": "Dress Code"
//						        }
//					      ],
//					      "id": 7
//					    }
//					  ]
//				}
//	
		var oModel = new sap.ui.model.json.JSONModel();
		sap.ui.getCore().setModel(oModel,"dateTabel");
		
		var oNewModel = new sap.ui.model.json.JSONModel();
		var oNewData ={
				"meet":[],
				"logInDataUser":{
					"name": "",
				    "email": "",
				    "password": "",
				    "events": [],
				    "id":""			
				},
				"selectedItemData":{},
				"bVisibleDefaultImg" :true,
				"bVisibleDetailsFields":false,
				"bVisibleShowDetaliiEveniment":false,
				"bVisibleCreateEvents":false
		};
		oNewModel.setData(oNewData);
		sap.ui.getCore().setModel(oNewModel,"listaEvenimente");	

		this.readUsersData();
		
		var oModelLogInAndSignUp = new sap.ui.model.json.JSONModel({
			SignUpData:{
				nume:"",
				email:"",
				parola:"",
				reintroduparola:"",
				valueStateNume:"None",
				valueStateEmail:"None",
				valueStateParola:"None",
				valueStateReintroduParola:"None"
			},
			LogInData:{
				nume:"",
				parola:"",
				valueStateNume:"None",
				valueStateParola:"None"
			}
		
		});
		sap.ui.getCore().setModel(oModelLogInAndSignUp,"ModelInregistrare");
		
		
		
		
		var oModelCraeteEvents = new sap.ui.model.json.JSONModel({
				CreatEvents:{
							numeEveniment:"",
							dataStart:"",
							dataEnd:"",
							dataEvt:"",
							descriere:""
							}
					});
		
		sap.ui.getCore().setModel(oModelCraeteEvents, "ModelCreateNewEvents");
	},
	
		
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf calendarevents.first
*/
	onBeforeRendering: function() {
		
		
	
	},	
	
	onPressLogIn:function(oEvt){
		
		var oModel = sap.ui.getCore().getModel("dateTabel");
		var oData = oModel.getData();
		
		
		var oModel2 = sap.ui.getCore().getModel("listaEvenimente");
		var oData2 = oModel2.getData();
		
		var oRegisterModel = sap.ui.getCore().getModel("ModelInregistrare");
		var oLogInSingUpData = oRegisterModel.getData();
		var oLogInData = oLogInSingUpData.LogInData;
	
//verificam in LogIn daca exista userul si daca parola este corecta 	
		var existaUser;	
		for (var i=0;i<oData.users.length; i++){
			if(oLogInData.nume  ===  oData.users[i].name ){
				existaUser=true;
				oLogInData.valueStateNume="None";
				var lungime = oData.users[i].events['length'];

				 oModel2.setProperty("/meet", oData.users[i].events);
				 oModel2.setProperty("/logInDataUser", oData.users[i]);				 
				break;
			}
			else{		
				existaUser = false;
			}
		};

//verificam in LogIn daca parola este corecta 
		var parolaCorecta;
		
		for (var i=0;i<oData.users['length'];i++){
			if(oLogInData.parola  ===  oData.users[i].password ){
				parolaCorecta=true;
				oLogInData.valueStateParola="None";
				break;
			}
			else{		
				
				parolaCorecta = false;
			}
		};
	
//verificam in LogIn daca campurile sunt goale si daca sunt corecte datele
		if(oLogInData.nume !=="" && oLogInData.parola !=="" ){
			
			if(existaUser !== true ){
				oLogInData.valueStateNume="Error";
			
				 oRegisterModel.refresh();
		
				alert("Userul NU exista!");
//				 var oDialogError = sap.ui.getCore().byId("idDialogError");
//				 oDialogError.open();
				
				}
			
			else if(parolaCorecta !== true){
				oLogInData.valueStateParola="Error";
				alert("Parola incorecta");		
				oRegisterModel.refresh();
				}
			else{
				var oTitle = sap.ui.getCore().byId("idTitleSecondPage");
				oTitle.setText(oLogInData.nume);
						
				app.to("idsecond");	
				this.setCalendarSpecialDays();
				
							
			}
		}else{
			alert("Campurile sunt goale");
			oLogInData.valueStateNume="Error";
			oLogInData.valueStateParola="Error";
			oRegisterModel.refresh();
		}		
},
	

//creare cont Nou si verificam daca campurile sunt goale si daca parolele sunt la fel
	creazaCont:function(oEvt){		
		var oRegisterModel = sap.ui.getCore().getModel("ModelInregistrare");
		var oLogInSingUpData = oRegisterModel.getData();
		var oSignUpData = oLogInSingUpData.SignUpData;
		
		
		var oModel = sap.ui.getCore().getModel("dateTabel");
		var oData= oModel.getData();
		
		var oModelListaEvenimente = sap.ui.getCore().getModel("listaEvenimente");
	
		
		var parolaOk = false;
		
		if(oSignUpData.nume !=="" && oSignUpData.email !=="" && oSignUpData.parola !=="" ){
			if(oSignUpData.parola === oSignUpData.reintroduparola){
				parolaOk = true;
				
				oSignUpData.valueStateParola="None";
				oSignUpData.valueStateReintroduParola = "None";	
				
			}
			else{
				alert("Parolele sunt diferite");
				oSignUpData.valueStateParola="Error";
				oSignUpData.valueStateReintroduParola="Error";
				oRegisterModel.refresh();
				}
			}else{
			alert("Campurile sunt goale");
			oSignUpData.valueStateNume="Error";
			oSignUpData.valueStateParola = "Error";
			oSignUpData.valueStateEmail="Error";	
			oSignUpData.valueStateReintroduParola="Error";	
			oRegisterModel.refresh();	
			
		}
		
		var idValue = 8;
		var oModel = sap.ui.getCore().getModel("dateTabel");
		var oData= oModel.getData();
		var bContOk=true;
		
		oDataLength =oData.users.length;
		if(parolaOk === true){
			for(var i=0; i<oDataLength; i++){
				if(oData.users[i].email === oSignUpData.email){	
					bContOk = false;
					alert("Mail existent. Reintrodu alt mail.");
					oSignUpData.valueStateEmail="Error";
					oRegisterModel.refresh();	
					break;
				}
			}
			if( bContOk === true){
				var oNewUserData ={
					"name": oSignUpData.nume,
				    "email": oSignUpData.email,
				    "password": oSignUpData.parola,
				    "events": JSON.stringify([]),
				}
				
				this.createUser(oNewUserData);						
				
			}	
		}
		
		
	},
	
	
	
	
	pageContNou: function (oEvt){
		
		oFormAutentificare = sap.ui.getCore().byId("ohalfPage");
		oFormAutentificare.removeAllItems();
		oSignUp = sap.ui.getCore().byId("formSignUp");

		oFormAutentificare.addItem(oSignUp);
	},
	
	inapoiLaLogIn:function(oEvt){
		oFormAutentificare = sap.ui.getCore().byId("ohalfPage");
		oFormAutentificare.removeAllItems();
		oLogIn = sap.ui.getCore().byId("formLogIn");
		oFormAutentificare.addItem(oLogIn);
	},
	
		
	
	readUsersData : function(){
		var i;
		var sUrl = "http://localhost:5000/users";
		var oModel = sap.ui.getCore().getModel("dateTabel");
		jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: sUrl,
			dataType: "json",
			async: false,
			success: function(aResults) {
				// Success
				
				for (i = 0; i < aResults.length; i++) {
					if (typeof(aResults[i].events) === "string") {
						aResults[i].events = JSON.parse(aResults[i].events);
					}
				}
				var oModelData = {
						users:aResults
				}
				oModel.setData(oModelData);
				console.log(aResults);
			},
			error: function () {
				// Error
				// Afisare eroare
				console.log("Error");
			}
		});
	},
	
	
	
	createUser:function(oDataToSave){
		
			var sUrl = "http://localhost:5000/users";
			var oModelListaEvenimente = sap.ui.getCore().getModel("listaEvenimente");
			jQuery.ajax({
				type: "POST",
				url: sUrl,
				data: $.param(oDataToSave),
      			contentType: 'application/x-www-form-urlencoded',
				success: function(oResult) {
					this.readUsersData();
					if (typeof(oResult.events) === "string") {
						oResult.events = JSON.parse(oResult.events);
					}
					
					oModelListaEvenimente.setProperty("/meet", oResult.events);
					oModelListaEvenimente.setProperty("/logInDataUser", oResult);	
					app.to("idsecond");		
					var oTitle = sap.ui.getCore().byId("idTitleSecondPage");
					oTitle.setText(oModelListaEvenimente.getData().logInDataUser.name);
					this.setCalendarSpecialDays();
					
					console.log("POST SUCCESS");
				}.bind(this),
				error: function (oError) {
					console.log("ERROR POST");
				}
			});
	},
	
	
	
	setCalendarSpecialDays : function(){
		
		var oModel = sap.ui.getCore().getModel("listaEvenimente");
		var aEvenimente = oModel.oData.meet;
		var oNrOfEventsPerDay = {};
		var oEventDate;
		var oCalendar = sap.ui.getCore().byId("idCalendar");

		for (i=0; i < aEvenimente.length; i++) {
			oEventDate = aEvenimente[i].day;
			
			if (oNrOfEventsPerDay[oEventDate]) {
				oNrOfEventsPerDay[oEventDate]++;
			} else {
				oNrOfEventsPerDay[oEventDate] = 1;
			}
		}

		

		var iNrOfEventsPerDay, sType;

		Object.keys(oNrOfEventsPerDay).forEach(function (sDate) {
			iNrOfEventsPerDay = oNrOfEventsPerDay[sDate]; 
			if (iNrOfEventsPerDay > 0 && iNrOfEventsPerDay <= 3) {
				sType = "Type09";
			} else if (iNrOfEventsPerDay > 3 && iNrOfEventsPerDay <= 5) {
				sType = "Type01";
			} else if (iNrOfEventsPerDay > 5) {
				sType = "Type10";
			};
			oCalendar.addSpecialDate(
				new sap.ui.unified.DateTypeRange({
					startDate: new Date(sDate),
					type: sType
					})
				)                   
		});
	},
	
	removeCalendarSpecialDays : function(){
		var oModel = sap.ui.getCore().getModel("listaEvenimente");
		var aEvenimente = oModel.oData.meet;
		var oNrOfEventsPerDay = {};
		var oEventDate;
		var oCalendar = sap.ui.getCore().byId("idCalendar");

		for (i=0; i < aEvenimente.length; i++) {
			oEventDate = aEvenimente[i].day;
			
			if (oNrOfEventsPerDay[oEventDate]) {
				oNrOfEventsPerDay[oEventDate]++;
			} else {
				oNrOfEventsPerDay[oEventDate] = 1;
			}
		}

		

		var iNrOfEventsPerDay, sType;

		Object.keys(oNrOfEventsPerDay).forEach(function (sDate) {
			iNrOfEventsPerDay = oNrOfEventsPerDay[sDate]; 
			if (iNrOfEventsPerDay > 0 && iNrOfEventsPerDay <= 3) {
				sType = "Type09";
			} else if (iNrOfEventsPerDay > 3 && iNrOfEventsPerDay <= 5) {
				sType = "Type01";
			} else if (iNrOfEventsPerDay > 5) {
				sType = "Type10";
			};
			                 
		});
	},
	
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf calendarevents.first
*/
	onAfterRendering: function() {

		 
	},
	


/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf calendarevents.first
*/
	onExit: function() {

	}

});