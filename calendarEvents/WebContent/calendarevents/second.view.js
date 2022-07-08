sap.ui.jsview("calendarevents.second", {

	/** Specifies the Controller belonging to this View. 
	* In the case that it is not implemented, or that "null" is returned, this View does not have a Controller.
	* @memberOf calendarevents.second
	*/ 
	getControllerName : function() {
		return "calendarevents.second";
	},

	/** Is initially called once after the Controller has been instantiated. It is the place where the UI is constructed. 
	* Since the Controller is given to this method, its event handlers can be attached right away. 
	* @memberOf calendarevents.second
	*/ 
	createContent : function(oController) {
	
		var oTitle1 = new sap.m.Title({
			text:"Bună_ "
		});
		
		var oTitle2 = new sap.m.Title("idTitleSecondPage",{
			text:"nume"
		});
		
		var oTitle = new sap.m.HBox({
			items:[oTitle1,
			       oTitle2,
			       
			       ]	
		}).addStyleClass("marginStangaDreapta");


//		var oVariabilaPass = new sap.m.Label("idPassSecondPage",{
//			text:"Pass"
//		});
		
		var oButton = new sap.m.Button({
			icon:"sap-icon://log", 
			press:[oController.pressLogOut,oController],			
		});
		
		var oBtnLogOut = new sap.m.HBox({
			justifyContent:"SpaceBetween",
			items:[oTitle,
			       	oButton
			       ]	
		}).addStyleClass("marginStangaDreapta");
		
		var oCalendar = new sap.ui.unified.Calendar("idCalendar",{
			showCurrentDateButton:true,
//			specialDates:[new sap.ui.unified.DateTypeRange({
////				color:"#ff0000",
//				startDate:new Date(),
//				type:"Type02"
//			}),
//			new sap.ui.unified.DateTypeRange({
////				color:"#0044ff",
//				startDate:new Date("2022","05","29"),
//				type:"Type03"
//			}),
//			new sap.ui.unified.DateTypeRange({
////				color:"#0044ff",
//				startDate:new Date("2022","05","30"),
//				type:"Type04"
//			}),
//			    ]
		
		});
		
		
		
		var oListaEvenimenteUsers = new sap.m.List("idListaEvenimente",{
			mode:"MultiSelect",
			itemPress : [oController.showDetaliiEveniment, oController]
			
		});
		
		var oTitleListEvents = new sap.m.Title({
			text:"Listă de evenimente"
		}).addStyleClass("marginStangaDreapta");
		
		var oBtnDeleteEvents = new sap.m.Button({
			icon:"sap-icon://delete",
			type:"Reject",
			press:[oController.onPressDeleteEvents, oController]
		});
		
		var oBtnCreateEvents = new sap.m.Button({
			icon:"sap-icon://add-activity-2",
				type:"Default",
				press:[oController.onPressCreateEvents, oController]
		}).addStyleClass("btnCreate");
		
		var oBtnCreateAndDelete = new sap.m.HBox({
			alignItems:"End",
			justifyContent:"End",
			items:[
			       oBtnCreateEvents,
			       oBtnDeleteEvents			       
			      ]	
		});
		
		var oHeaderList = new sap.m.HBox({
			alignItems:"End",
			justifyContent:"SpaceBetween",
			items:[
			       oTitleListEvents,	
			       oBtnCreateAndDelete     
			      ]	
		});
		
		var oLista1 = new sap.m.VBox({
			
			items:[oHeaderList,
			       oListaEvenimenteUsers
			       
			      ]	
		});
			
		oListaEvenimenteUsers.bindAggregation(
				"items",
				"listaEvenimente>/meet",
				function(sId,oContext){
					
					var sValue= oContext.getProperty("name");
					var sTimeStart= oContext.getProperty("from");
					var sTimeEnd= oContext.getProperty("to");
					var sEvent = oContext.getProperty("events")
				
					var sDec1 = "Citește mai mult... ";
					
					
					return new sap.m.StandardListItem({
						title:sValue,
						icon:"sap-icon://activity-items",
						type: sap.m.ListType.Navigation,
						info:sTimeStart+"-"+sTimeEnd,
						description: sDec1,
						iconInset:false,					
						wrapping:"true",
												
					})
					
				}
				
		)
		
		
//creerea imputurilor pentru editarea evenimentului	
		var LabelDetalii1 = new sap.m.Label({
			text:"De la:"
		});
		var InputDetalii1 = new sap.m.Input("idInputStartHourEdit",{
			value:"{listaEvenimente>/selectedItemData/from}"
		});
		var LabelDetalii2 = new sap.m.Label({
			text:"Până la:"
		});
		var InputDetalii2 = new sap.m.Input("idInputEndHourEdit",{
			value:"{listaEvenimente>/selectedItemData/to}",
			
		});
		var LabelDetalii3 = new sap.m.Label({
			text:"Detalii eveniment:"
		});
		var InputDetalii3 = new sap.m.Input("idInputDescriptionEdit",{
			value:"{listaEvenimente>/selectedItemData/description}"
		});
		var LabelDetalii4 = new sap.m.Label({
			text:"Data eveniment:"
		});
		var InputDetalii4 = new sap.m.Input("idInputDataEdit",{
			value:"{listaEvenimente>/selectedItemData/day}"
		});
		var LabelDetalii5 = new sap.m.Label({
			text:"Numele evenimentului:"
		});
		var InputDetalii5 = new sap.m.Input("idInputNameEdit",{
			value:"{listaEvenimente>/selectedItemData/name}"
		});
		
		
		
//creem imputurile pentru crearea evenimentului
		var oTitleFormCreateEvent = new sap.m.Title({
			text:"Crează un nou eveniment "
		}).addStyleClass("marginSusJos");
		
		var LabelNameCreateEvt = new sap.m.Label({
			text:"Numele evenimentului:"
		});
		var InputNameCreateEvt = new sap.m.Input("idNameCreateEvt",{
			value:"{ModelCreateNewEvents/CreatEvents/numeEveniment}"
		});
		var LabelStartDateCreateEvt = new sap.m.Label({
			text:"Ora de început a evenimentului:"
		});
		
		var InputStartDateCreateEvt = new sap.m.TimePicker("idStartDateCreateEvt",{
			displayFormat: "HH:mm",
			value:"{ModelCreateNewEvents/CreatEvents/dataStart}",			
		});
		var oTimeStartEvt = new sap.m.VBox({
			
			items:[LabelStartDateCreateEvt,
			       InputStartDateCreateEvt,
			     ]	
		});
		var LabelEndDateCreateEvt = new sap.m.Label({
			text:"Ora de final a evenimentului:"
		});
		var InputEndDateCreateEvt = new sap.m.TimePicker("idEndDateCreateEvts",{
			displayFormat: "HH:mm",
			value:"{ModelCreateNewEvents/CreatEvents/dataEnd}",
		});
		
		var oTimeEndEvt = new sap.m.VBox({
			
			items:[LabelEndDateCreateEvt,
			       InputEndDateCreateEvt,
			     ]	
		});
		
		var oTimeEvt = new sap.m.HBox({
			
			items:[oTimeStartEvt,
			       oTimeEndEvt,
			     ]	
		});
		
		var LabelData = new sap.m.Label({
			text:"Data evenimentului:"
		});
		var InputDataEvt = new sap.m.DatePicker("idDataPicker",{
			valueFormat:"yyyy-MM-dd",
			value:"{ModelCreateNewEvents/CreatEvents/dataEvt}",
			
		});
		
		
			
		var LabelDetailsCreateEvents = new sap.m.Label({
			text:"Detalii despre eveniment:"
		});
		var InputDetailsCreateEvents = new sap.m.Input("idDetailsCreateEvents",{
			value:"{ModelCreateNewEvents/CreatEvents/descriere}"
		});
		
		

//creem vizualizarea detaliilor din lista
		
		var oLabelShowDetaliisName = new sap.m.Text({
			textAlign:"Center",
			width:"250px",
			text:"{listaEvenimente>/selectedItemData/name}",
			
		});
		
		var oLabelShowDetaliisStartDate = new sap.m.Text({
			text:"De la: {listaEvenimente>/selectedItemData/from}",
			
		});
		
		var oLabelShowDetaliisEndDate = new sap.m.Text({
			text:"Până la: {listaEvenimente>/selectedItemData/to}"
		});
		var oLabelShowDataEvt = new sap.m.Text({
			text:"Data: {listaEvenimente>/selectedItemData/day}"
		});
		
		var oLabelShowDetaliisEvt = new sap.m.Text({
			text:"Detalii: {listaEvenimente>/selectedItemData/description}"
		});
		
		var oEditButton = new sap.m.Button({
			text:"Edit",
			icon:"sap-icon://edit",
			press:[oController.iconEditPress, oController]
		});
		
		
		var oBoxDetaliiOra1 = new sap.m.HBox({
			alignItems:"Center",
			justifyContent:"Center",
			items:[LabelDetalii1,
			       InputDetalii1,
			      ]	
		});
		
		var oBoxDetaliiOra2 = new sap.m.HBox({
			alignItems:"Center",
			justifyContent:"Center",
			items:[LabelDetalii2,
			       InputDetalii2
			      ]	
		});
		var oBoxDataEvtEdit = new sap.m.HBox({
			alignItems:"Center",
			justifyContent:"Center",
			items:[LabelDetalii4,
			       InputDetalii4
			      ]	
		});
		
		var oBoxNameEvt = new sap.m.HBox({
			alignItems:"Center",
			justifyContent:"Center",
			items:[LabelDetalii5,
			       InputDetalii5,
			      ]	
		});
		
		var oBoxDetaliiDescriere = new sap.m.HBox({
			alignItems:"Center",
			justifyContent:"Center",
			items:[LabelDetalii3,
			       InputDetalii3,
			      ]	
		});
		
		var oBtnSaveEdit = new sap.m.Button({
			text:"Salvare",
			press:[oController.onPressSaveEditDetails,oController]
		});
		
		var oButtonSaveVBox = new sap.m.VBox({
			alignItems:"End",
			justifyContent:"End",
			items:[oBtnSaveEdit ]
		});
		


				
		var oLegend = new sap.ui.unified.CalendarLegend({
			columnWidth:"800px",
			items:[
			       new sap.ui.unified.CalendarLegendItem({
			    	   type:"Type09",
			    	   text:"Între 1 - 3 evenimente"
			       }),
			       new sap.ui.unified.CalendarLegendItem({
			    	   type:"Type01",
			    	   text:"Între 3 - 5 evenimente"
			       }),
			       new sap.ui.unified.CalendarLegendItem({
			    	   type:"Type10",
			    	   text:"Mai mult de 5 evenimente"
			       }),
			       
			       ]
		});
		
		var oImg = new sap.m.Image("idImgDefault",{
			width:"300px",
			src:"img/list2.png",
		});
		
		var oTextDetalii = new sap.m.Label({
			text:"Apasa pe un eveniment pentru mai multe detalii..."
		});
		
		
		var oDetaliiListaDefault = new sap.m.VBox("idDetaliiListaDefault",{
			visible:"{listaEvenimente>/bVisibleDefaultImg}",
			items:[oImg,
			      oTextDetalii,
			      ]	
		});
		
		
		var oLabelDetalii = new sap.m.Label({
			text:"Detaliile evenimentului"
		});
		
		var oShowDetaliiEveniment = new sap.m.VBox("idShowDetaliiEveniment",{
			visible:"{listaEvenimente>/bVisibleShowDetaliiEveniment}",
			items:[
			       oLabelShowDetaliisName,
			       oLabelShowDetaliisStartDate,
			       oLabelShowDetaliisEndDate,
			       oLabelShowDataEvt,
			       oLabelShowDetaliisEvt,
			       oEditButton
			       ],
		}).addStyleClass("bgPage2");
		
	
		var	oBtnSaveNewEvents = new sap.m.Button({
			text:"Salvare",
			press:[oController.onPressSalvareNewEvent, oController]
		});

		
//mesaj de stergere cu  succes 
	var dialogSuccesStergere = new sap.m.Dialog("idDialogSuccesStergere",{
	    		
				title: "Success",
				state: sap.ui.core.ValueState.Success,
				content:[
				         new sap.m.Label({ text: "Sters cu succes." }),
	             new sap.m.Button({
	        type: sap.m.ButtonType.Emphasized,
			text: "OK",
	       	press: function () {
	       		dialogSuccesStergere.close();}}).addStyleClass("btnSuccessDialog")]
	    });
	
	
	
//mesaj creare cu succes
	var dialogCreareEvtSucces = new sap.m.Dialog("idDialogCreareEvtSucces",{
		
		title: "Success",
		state: sap.ui.core.ValueState.Success,
		content:[
		         new sap.m.Label({ text: "Eveniment creat cu succes." }),
         new sap.m.Button({
    type: sap.m.ButtonType.Emphasized,
	text: "OK",
   	press: function () {
   		dialogCreareEvtSucces.close();}}).addStyleClass("btnSuccessDialog")]
});
		
//box-xul pentru crearea unu nou eveniment	
		
		var oCreateNewEvents = new sap.m.VBox("idCreateNewEvents",{	
			height:"470px",
			width:"570px",
			visible:"{listaEvenimente>/bVisibleCreateEvents}",
			items:[
			       oTitleFormCreateEvent,
			       LabelNameCreateEvt,
			       InputNameCreateEvt,
			       oTimeEvt,
			       LabelData,
			       InputDataEvt,
			       LabelDetailsCreateEvents,
			       InputDetailsCreateEvents	,
			       
			       oBtnSaveNewEvents
			       ],
		}).addStyleClass("bgPage2");

//box-ul pentru edit		
		var oBoxDetalii = new sap.m.VBox("idDetailFields",{
			height:"370px",
			width:"470px",
			visible:"{listaEvenimente>/bVisibleDetailsFields}",
			items:[
			       oBoxNameEvt,
			       oBoxDetaliiOra1,
			       oBoxDetaliiOra2,
			       oBoxDataEvtEdit,
			       oBoxDetaliiDescriere,
			       oButtonSaveVBox
			       ]
			
		}).addStyleClass("bgPage2");
	
		
		var oVBoxForDetailsEvenimentDefault = new sap.m.VBox("oDetaliiBox",{
			height:"490px",
			width:"560px",
			alignItems:"Center",
			justifyContent:"Start",
			items:[oDetaliiListaDefault,
			       oBoxDetalii,
			       oShowDetaliiEveniment,
			       oCreateNewEvents
			       ]
			
		}).addStyleClass("detaliipage2");

		
		
		
		var oContainer = new sap.ui.layout.Splitter({
			height:"300px",
			contentAreas:[
			              oLista1,
			              oVBoxForDetailsEvenimentDefault
			              ]
		}).addStyleClass("marginAll");
		
		var oCalendarWithLegend = new sap.m.HBox({
			alignItems:"End",
			justifyContent:"SpaceBetween",
			items:[
			       	oCalendar,
			      	oLegend			  
			      ]
		}).addStyleClass("marginStangaDreapta");
		
		var oContainerFinal = new sap.m.VBox({
			
			items:[
   			      	oCalendarWithLegend,
			      	oContainer
			      ]
		}).addStyleClass("maginiStanga");
		
	
		
		
 		var oPage = new sap.m.Page({
 			
			title: "Privat Page",
			content: [
			          oBtnLogOut,
			          oContainerFinal		          
			]
		});
 		return oPage;
	}

});