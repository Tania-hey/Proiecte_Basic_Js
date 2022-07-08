sap.ui.controller("calendarevents.second", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf calendarevents.second
*/
	onInit: function() {
		
		this.sPath = null;	
},

	pressLogOut:function (oEvt){
		var oModel = sap.ui.getCore().getModel("listaEvenimente");
		var oRegisterModel = sap.ui.getCore().getModel("ModelInregistrare");
		var oLogInSingUpData = oRegisterModel.getData();
		var oLogInData = oLogInSingUpData.LogInData;
		var oSignUpData = oLogInSingUpData.SignUpData;
		
		oLogInData.nume = "";
		oLogInData.parola = "";
		oLogInData.valueStateNume="None";
		oLogInData.valueStateParola="None";
		
		oSignUpData.nume="";
		oSignUpData.email="";
		oSignUpData.parola="";
		oSignUpData.reintroduparola="";
		oSignUpData.valueStateNume="None";
		oSignUpData.valueStateParola="None";
		oSignUpData.valueStateEmail="None";
		oSignUpData.valueStateReintroduParola="None";
				
		oRegisterModel.refresh();
		
		oFormAutentificare = sap.ui.getCore().byId("ohalfPage");
		oFormAutentificare.removeAllItems();
		oLogIn = sap.ui.getCore().byId("formLogIn");
		oFormAutentificare.addItem(oLogIn);
		
		
		var oModelEvenimente = sap.ui.getCore().getModel("listaEvenimente");
		var oDataEvenimente = oModelEvenimente.getData();
	
		
		oDataEvenimente.bVisibleDefaultImg = true;
		oDataEvenimente.bVisibleDetailsFields = false;
		oDataEvenimente.bVisibleShowDetaliiEveniment = false;
		oDataEvenimente.bVisibleCreateEvents = false;
		oModelEvenimente.refresh(true);
		
		this.readUsersData();
		this.removeCalendarSpecialDays();
		oModel.refresh();
		app.to("idfirst1");
		
	},
	
	
	showDetaliiEveniment: function(oEvt){	

		this.sPath = oEvt.getParameter("listItem").getBindingContext("listaEvenimente").sPath;
		var oModel = sap.ui.getCore().getModel("listaEvenimente");
		var oSelectedItemData = oModel.getProperty(this.sPath);
		
		oModel.setProperty("/selectedItemData", oSelectedItemData);
		
		
		var oModelEvenimente = sap.ui.getCore().getModel("listaEvenimente");	

		oDetailFields = sap.ui.getCore().byId("idDetailFields");
		oDefaultImg = sap.ui.getCore().byId("idDetaliiListaDefault");
		oShowDetaliiFields = sap.ui.getCore().byId("idShowDetaliiEveniment");
		oCreateNewEvents = sap.ui.getCore().byId("idCreateNewEvents");
		
		oDefaultImg.setVisible(false);
		oDetailFields.setVisible(false);
		oCreateNewEvents.setVisible(false);
		oShowDetaliiFields.setVisible(true);

		
		oModelEvenimente.refresh();		
	},

	
	iconEditPress:function(oEvt){
	
		oDetailFields = sap.ui.getCore().byId("idDetailFields");
		oDefaultImg = sap.ui.getCore().byId("idDetaliiListaDefault");
		oShowDetaliiFields = sap.ui.getCore().byId("idShowDetaliiEveniment");
		oCreateNewEvents = sap.ui.getCore().byId("idCreateNewEvents");
		
		
		oDefaultImg.setVisible(false);
		oDetailFields.setVisible(true);
		oShowDetaliiFields.setVisible(false);
		oCreateNewEvents.setVisible(false);		
	},
	
	
	
	onPressDeleteEvents:function(oEvt){
		
	var confirmQuestion = confirm("Sigur doriți să ștergeți evenmentul?");
		
		if(confirmQuestion){
			var oList = sap.ui.getCore().byId("idListaEvenimente");
			var aPath = oList.getSelectedContextPaths();
			aPath =aPath.sort();


			var oModel = sap.ui.getCore().getModel("listaEvenimente");
			var oEvenimenteArray = oModel.oData.meet;
			
			var idIndexEvents;
			
			for(var i=0;i<aPath.length;i++){
				idIndexEvents = parseInt(aPath[i].split("/")[2]);
				oEvenimenteArray.splice(idIndexEvents-i,1);
			}		
		
			var oModelEvenimente = sap.ui.getCore().getModel("listaEvenimente");
				oModelEvenimente.refresh();
				
				var oModelUserLogIn = sap.ui.getCore().getModel("listaEvenimente");
				var odataUserLogIn = oModelUserLogIn.getProperty("/logInDataUser");
				var oIdUserLogIn = odataUserLogIn.id;
				
				var oDataToUpdate = {
						"name": odataUserLogIn.name,
					      "email": odataUserLogIn.email,
					      "password": odataUserLogIn.password,
					      "events":JSON.stringify(oEvenimenteArray),
					      "id": odataUserLogIn.id
				}
						
				
				
				var sUrl = "http://localhost:5000/users/" + oIdUserLogIn;
			
				jQuery.ajax({
					type: "PUT", //update
					url: sUrl,
					data: $.param(oDataToUpdate),
	      			contentType: 'application/x-www-form-urlencoded',
					success: function() {
						console.log("POST SUCCESS");
						
						this.readUserData(oIdUserLogIn);
						this.removeCalendarSpecialDays();
						this.setCalendarSpecialDays();
						oModelUserLogIn.refresh();
						
					
						
//						alert("Eveniment șters cu succes.");

						var oDialogSuccessStergere = sap.ui.getCore().byId("idDialogSuccesStergere");
						oDialogSuccessStergere.open();
						
						sap.ui.getCore().byId("idNameCreateEvt").setValue("");
						sap.ui.getCore().byId("idStartDateCreateEvt").setValue("");
						sap.ui.getCore().byId("idEndDateCreateEvts").setValue("");
						sap.ui.getCore().byId("idDetailsCreateEvents").setValue("");
						
							
						var oModelEvenimente = sap.ui.getCore().getModel("listaEvenimente");
						var oDataEvenimente = oModelEvenimente.getData();
							oDataEvenimente.bVisibleDefaultImg = true;
							oDataEvenimente.bVisibleDetailsFields = false;
							oDataEvenimente.bVisibleShowDetaliiEveniment = false;
							oDataEvenimente.bVisibleCreateEvents = false;
							oModelEvenimente.refresh();	
						
					}.bind(this),
					error: function () {
						console.log("ERROR POST");
					}
				});
				
			
		}else{
			console.log("Evenimentul nu este sters.");
			
		}
		
		

		
	},	
	
	onPressCreateEvents: function(oEvt){
				
		oDetailFields = sap.ui.getCore().byId("idDetailFields");
		oDefaultImg = sap.ui.getCore().byId("idDetaliiListaDefault");
		oShowDetaliiFields = sap.ui.getCore().byId("idShowDetaliiEveniment");
		oCreateNewEvents = sap.ui.getCore().byId("idCreateNewEvents");
			
		oDefaultImg.setVisible(false);
		oDetailFields.setVisible(false);
		oShowDetaliiFields.setVisible(false);
		oCreateNewEvents.setVisible(true);
	
	},
	
	
	onPressSalvareNewEvent: function(oEvt){
			
		oCreateEventsName = sap.ui.getCore().byId("idNameCreateEvt").getValue();
		oStartTimeEvt = sap.ui.getCore().byId("idStartDateCreateEvt").getValue();
		oEndTimeEvt = sap.ui.getCore().byId("idEndDateCreateEvts").getValue();
		oDetaliiEvt = sap.ui.getCore().byId("idDetailsCreateEvents").getValue();
		oDataEvt = sap.ui.getCore().byId("idDataPicker").getValue();
		
		
		var oModelUserLogIn = sap.ui.getCore().getModel("listaEvenimente");
		var odataUserLogIn = oModelUserLogIn.getProperty("/logInDataUser");
		
		var oModel = sap.ui.getCore().getModel("listaEvenimente");
		var oEvenimenteArray = oModel.oData.meet;
		
		var oIdUserLogIn = odataUserLogIn.id;
		var id=100;
		
		var oNewEvent = {
				"name": oCreateEventsName,
		        "from": oStartTimeEvt,
		        "to": oEndTimeEvt,
		        "reccurence": false,
		        "day": oDataEvt,
		        "id": id,
		        "description": oDetaliiEvt
		}
	
		oEvenimenteArray.push(oNewEvent);
		var oDataToUpdate = {
			      "name":odataUserLogIn.name,
			      "email": odataUserLogIn.email,
			      "password":odataUserLogIn.password,
			      "events": JSON.stringify(oEvenimenteArray),
			      "id": odataUserLogIn.id
			    }	
		
		var sUrl = "http://localhost:5000/users/" + oIdUserLogIn;
		jQuery.ajax({
			type: "PUT", //update
			url: sUrl,
			data: $.param(oDataToUpdate),
  			contentType: 'application/x-www-form-urlencoded',
			success: function() {
				console.log("POST SUCCESS");
//				alert("Eveniment creat cu succes");
				
				var oDialogCreareEvtCuSucces = sap.ui.getCore().byId("idDialogCreareEvtSucces");
				oDialogCreareEvtCuSucces.open();
				
				this.readUserData(oIdUserLogIn);
				
				this.removeCalendarSpecialDays();
				this.setCalendarSpecialDays();
				
				this.readUsersData();
				oModel.refresh();
				
				sap.ui.getCore().byId("idNameCreateEvt").setValue("");
				sap.ui.getCore().byId("idStartDateCreateEvt").setValue("");
				sap.ui.getCore().byId("idEndDateCreateEvts").setValue("");
				sap.ui.getCore().byId("idDetailsCreateEvents").setValue("");
				
					
				var oModelEvenimente = sap.ui.getCore().getModel("listaEvenimente");
				var oDataEvenimente = oModelEvenimente.getData();
					oDataEvenimente.bVisibleDefaultImg = true;
					oDataEvenimente.bVisibleDetailsFields = false;
					oDataEvenimente.bVisibleShowDetaliiEveniment = false;
					oDataEvenimente.bVisibleCreateEvents = false;
					oModelEvenimente.refresh();	
					
			}.bind(this),
			error: function () {
				console.log("ERROR POST");
			}
		});		
	},
	
	
	onPressSaveEditDetails: function(){
		
		var sUserId, oDataToSave, iIndexEvents;
		var oModel = sap.ui.getCore().getModel("listaEvenimente");
		oDataToSave = oModel.getProperty("/logInDataUser");
		
		sUserId = oDataToSave.id;
		var sUserName = oDataToSave.name;
		var sUserEmail = oDataToSave.email;
		var sUserPass = oDataToSave.password;
		
		iIndexEvents = parseInt(this.sPath.split("/")[2]);
		var oNewFromName =  sap.ui.getCore().byId("idInputNameEdit").getValue();
		var oNewFromStartData =  sap.ui.getCore().byId("idInputStartHourEdit").getValue();
		var oNewFromEndData =  sap.ui.getCore().byId("idInputEndHourEdit").getValue();
		var oNewFromDescription =  sap.ui.getCore().byId("idInputDescriptionEdit").getValue();
		var oNewFromData =  sap.ui.getCore().byId("idInputDataEdit").getValue();
		
		oDataToSave.events[iIndexEvents].name=oNewFromName;
		oDataToSave.events[iIndexEvents].from = oNewFromStartData;
		oDataToSave.events[iIndexEvents].to = oNewFromEndData;
		oDataToSave.events[iIndexEvents].day = oNewFromData;
		oDataToSave.events[iIndexEvents].description = oNewFromDescription;
		oDataToSave = JSON.stringify(oDataToSave.events);
			 	
		var oDataToUpdate = {
			      "name":sUserName,
			      "email": sUserEmail,
			      "password":sUserPass,
			      "events": oDataToSave,
			      "id": sUserId
			    }
		
		this.saveDetailEditEvtData(sUserId,oDataToUpdate);	
		
	},
		

	saveDetailEditEvtData : function(sUserId,oDataToUpdate){
		var i;
		var sUrl = "http://localhost:5000/users/" + sUserId;
				
		jQuery.ajax({
			type: "PUT",
			url: sUrl,
			data: $.param(oDataToUpdate),
			contentType: 'application/x-www-form-urlencoded',
			success: function() {
				// Success
				this.readUserData(sUserId);
				sap.ui.getCore().byId("idNameCreateEvt").setValue("");
				sap.ui.getCore().byId("idStartDateCreateEvt").setValue("");
				sap.ui.getCore().byId("idEndDateCreateEvts").setValue("");
				sap.ui.getCore().byId("idDetailsCreateEvents").setValue("");

				var oModelEvenimente = sap.ui.getCore().getModel("listaEvenimente");
				var oDataEvenimente = oModelEvenimente.getData();
					oDataEvenimente.bVisibleDefaultImg = true;
					oDataEvenimente.bVisibleDetailsFields = false;
					oDataEvenimente.bVisibleShowDetaliiEveniment = false;
					oDataEvenimente.bVisibleCreateEvents = false;
					oModelEvenimente.refresh();	
					this.readUsersData();
					
					this.removeCalendarSpecialDays();
					this.setCalendarSpecialDays();
					
					oModel.refresh();
			}.bind(this),
			error: function () {
				// Error
				// Afisare eroare
				console.log("Error");
			}
		});
	},
	
	
	readUserData : function(oIdUserLogIn){
		var oModelUserLogIn = sap.ui.getCore().getModel("listaEvenimente");
		var odataUserLogIn = oModelUserLogIn.getProperty("/logInDataUser");
		oModelUserLogIn.refresh();
		
		var i;
		var sUrl = "http://localhost:5000/users/" + oIdUserLogIn ;
		
		jQuery.ajax({
			type: "GET",
			contentType: "application/json",
			url: sUrl,
			dataType: "json",
			async: false,
			success: function(oResults) {
				// Success
			
					if (typeof(oResults.events) === "string") {
						oResults.events = JSON.parse(oResults.events);
					}				
				
				oModelUserLogIn.setProperty("/logInDataUser",oResults);
				oModelUserLogIn.setProperty("/meet",oResults.events);
				oModelUserLogIn.refresh(true);
				this.setCalendarSpecialDays();
			}.bind(this),
			error: function () {
				// Error
				// Afisare eroare
				console.log("Error");
			}
		});		
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
//				this.setCalendarSpecialDays();
			},
			error: function () {
				// Error
				// Afisare eroare
				console.log("Error");
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
			}
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
			if (iNrOfEventsPerDay == 0) {
				sType = "None";
			};
			oCalendar.destroySpecialDates();
			                 
		});
	},
	
	
	
	
/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf calendarevents.second
*/
//	onBeforeRendering: function() {
//
//	},

/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf calendarevents.second
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf calendarevents.second
*/
//	onExit: function() {
//
//	}

});