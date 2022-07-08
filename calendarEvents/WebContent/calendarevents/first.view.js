sap.ui.jsview("calendarevents.first", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf calendarevents.first
	*/ 
	getControllerName : function() {
		return "calendarevents.first";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf calendarevents.first
	*/ 
	createContent : function(oController) {

		var oLableInput= new sap.m.Label({
			text:"Utilizator:",
			required:true,
			labelFor: oInputNumeLogIn
		});
		
		var oLableIName= new sap.m.Label({
			text:"Nume:",
			required:true,
			labelFor:oInputNumeSignUp
		});
		
		var oInputNumeLogIn = new sap.m.Input ("idName",{
			value:"{ModelInregistrare>/LogInData/nume}",
			valueState:"{ModelInregistrare>/LogInData/valueStateNume}",
			width:'350px'
		});
		
		var oInputNumeSignUp = new sap.m.Input ("idName2",{		
			width:'350px',
			value:"{ModelInregistrare>/SignUpData/nume}",
			valueState:"{ModelInregistrare>/SignUpData/valueStateNume}",
		});
		
		var oLableIEmail= new sap.m.Label({
			required:true,
			labelFor: oEmail,
			text:"Email:"
		});
		
		
		var oEmail = new sap.m.Input ("idEmail",{
			required:true,
			value:"{ModelInregistrare>/SignUpData/email}",
			valueState:"{ModelInregistrare>/SignUpData/valueStateEmail}",
			width:'350px'
		});
		
		var oLablePass= new sap.m.Label("idLabel",{
			required:true,
			labelFor:oPass,
			text:"Parola:"
		});
		
		var oPass = new sap.m.Input ("idPass",{
			value:"{ModelInregistrare>/LogInData/parola}",
			valueState:"{ModelInregistrare>/LogInData/valueStateParola}",
			width:'350px',
			visible:true,
			type:"Password"
		});
		
		var oLablePass1= new sap.m.Label("idLabel1",{
			required:true,
			
			labelFor:oPass1,
			text:"Parola:"
		});
		
		var oPass1 = new sap.m.Input ("idPass1",{
			required:true,
			value:"{ModelInregistrare>/SignUpData/parola}",
			valueState:"{ModelInregistrare>/SignUpData/valueStateParola}",
			width:'350px',
			type:"Password"
		});
		
		var oLablePass2= new sap.m.Label("idLabel2",{
			required:true,
			labelFor:oPass2,
			text:"Reintrodu Parola:",
			
		});
		
		var oPass2 = new sap.m.Input ("idPass2",{
			required:true,
			width:'350px',
			type:"Password",
			value:"{ModelInregistrare>/SignUpData/reintroduparola}",
			valueState:"{ModelInregistrare>/SignUpData/valueStateReintroduParola}",
		});
			
		var oTitluFormSignUp = new sap.m.Title({
			titleStyle:"H3",
			text:"Crează un cont nou"
		}).addStyleClass("margin");
		
		var oTitluFormLogIn = new sap.m.Title({
			titleStyle:"H3",
			text:"Autentificare."
		}).addStyleClass("margin");
		
		var oBtnLogIn = new sap.m.Button("LogInBtn",{
			text:"LogIn",
			type:"Accept",
			press:[oController.onPressLogIn,oController]
		});
		
		var oDialogSucces = new sap.m.Dialog({
		title:"Eveniment sters cu succes",
		type:"Message",
	});
		
//		var dialog = new sap.m.Dialog("idDialogError",{
//    		
//			title: "Warning",
//			state: sap.ui.core.ValueState.Warning,
//			content:[
//			         new sap.m.Label({ text: "Ruling the world is a time-consuming task. You don't have an account here" }),
//             new sap.m.Button({
//        type: sap.m.ButtonType.Emphasized,
//		text: "OK",
//       	press: function () {
//	     dialog.close();}})]
//    });
    	
	


		
		var oBtnSignUp = new sap.m.Button({
			text:"Inregistrează-mă",
			type:"Accept",
			press:[oController.creazaCont,oController]
		});
		
		var oImg = new sap.m.Image({
			width:"505px",
			src:"img/1.jpg",
		});
		
		var oLabel = new sap.m.Label({
			text:"Nu ai cont?  ",
			design:"Bold",
		});
		
		var oLink = new sap.m.Link({
			text: " Crează cont.",
			press:[oController.pageContNou,oController]
		});
		
		var oSignUp = new sap.m.HBox({
			items:[
			       oLabel,
			       oLink
			       ]	
		}).addStyleClass("margin");
				
		var oLink2 = new sap.m.Link({
			text: " Autentificare",
			press:[oController.inapoiLaLogIn, oController]
		});
		
		var oLogIn = new sap.m.HBox({
			items:[
			       
			       oLink2
			       ],
		}).addStyleClass("margin");
		
		
		
		var oImgFirstPage = new sap.m.VBox({
			items:[ oImg ]	
		});

		var oFormSignUp = new sap.m.VBox("formSignUp",{
			
			items:[
			       oTitluFormSignUp,
			       oLableIName,
			       oInputNumeSignUp,
					oLableIEmail,
					oEmail,
					oLablePass1,
					oPass1,
					oLablePass2,
					oPass2,
					oBtnSignUp,
					oLogIn
					]	
		}).addStyleClass("color");
		
		
		var oFormLogIn = new sap.m.VBox("formLogIn",{
			items:[
		oTitluFormLogIn,
			       oLableInput,
			       oInputNumeLogIn,
					oLablePass,
					oPass,
					oBtnLogIn,
					oSignUp
					]	
		}).addStyleClass("color");
		
		
		
		
		var ohalfPage = new sap.m.VBox("ohalfPage",{
			height:"557px",
			width:"805px",
			alignItems:"Center",
			justifyContent:"Center",
			items:[
			       oFormLogIn
					]	
		});
		
		var oContainer = new sap.m.HBox({
			alignItems:"Center",
			justifyContent:"Start",
			items:[
			       oImgFirstPage,
			       ohalfPage      	
			       ]	
		});

		
 		var oPage =  new sap.m.Page({
			title: "First Page",
			content: [
	          oContainer		         			          
			]
		});
 		return oPage;
	}

});