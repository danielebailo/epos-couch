//if the user is logged in and we have a username, the game begins!
$("#welcome").couchLogin({
	loggedIn:function(userCtx){   //  ALL THE PAGE IS WITHIN THESE BRACKETS
	var userName=userCtx.name;
	var userRoles=userCtx.roles; //it's a list
	var userKey=userCtx.key;
	//~ if($.inArray('admin',userRoles)==0) console.log("dajekikko");
	
	//appends short message
	//~ $("#welcome").append("<br><span>Edit <img src='img/edit.jpg' alt='edit' />, Delete <img src='img/delete.jpg' alt='edit' /> or Add <img src='img/add-ri.png' alt='AddRI' /> a Research Infrastructure. <span>");

	//~ //initialize the tooltip for the fields' help
	//~ $('span.normalTip').aToolTip({
            //~ fixed:false,
            //~ inSpeed: 100,
    		//~ outSpeed: 100
        //~ });

	
	if (navigator.appName!="Microsoft Internet Explorer"){
		// LOGGING ACTIONS
		//INSERT AN appLog.trigger('log', {user:userName,date:(new Date()), action:"YOURACTION"});
		//where you want events to be logged
		var appLog = {};
		_.extend(appLog, Backbone.Events);
		
		appLog.on("log", function(event) {
			$.couch.db(logDB).saveDoc(event,{
				success:function(resp){
					},
				error:function(resp){
					alert("log error: ",resp);
					}
				});
			});
		}
	
	
	//GLOBAL VAR:  dbName... must explain what it is?
	var dbName="epos-couch";
	var rideUsersDBname="ride-users";


    //Visual Search object
	//~ var visualSearch = VS.init({
          //~ container  : $('#search_box_container'),
          //~ query      : 'country:click-to-select  ',
          //~ unquotable : [
            //~ 'text',
            //~ 'account',
            //~ 'filter',
            //~ 'access'
          //~ ],
          //~ callbacks  : {
            //~ search : function(query, searchCollection) {
              //~ var $query = $('#search_query');
              //~ var count  = searchCollection.size();
              //~ $query.stop().animate({opacity : 1}, {duration: 300, queue: false});
             // $query.html('<span class="raquo">&raquo;</span> You searched for: ' +
              //            '<b>' + (query || '<i>nothing</i>') + '</b>. ' +
              //            '(' + count + ' filter' + (count==1 ? '' : 's') + ')');
              //~ clearTimeout(window.queryHideDelay);
              //~ window.queryHideDelay = setTimeout(function() {
                //~ $query.animate({
                  //~ opacity : 0
                //~ }, {
                  //~ duration: 1000,
                  //~ queue: false
                //~ });
              //~ }, 2000);
            //~ },
            //~ facetMatches : function(callback) {
              //~ callback(RUfacets);
            //~ },
            //~ valueMatches : function(facet, searchTerm, callback) {
				//~ for(RUfacet in RUfacets){
					//~ if (RUfacets[RUfacet] == 'wg'){
						//~ callback([
						  //~ { value: '1', label: 'WG1 - Seismological Observatories and Research Infrastructures' },
						  //~ { value: '2',   label: 'WG2 - Volcano Observations' },
						  //~ { value: '3',   label: 'WG3 - Geological and Surface Dynamics data' },
						  //~ { value: '4', label: 'WG4 - GNSS data and other Geodetic data;' },
						  //~ { value: '5', label: 'WG5 -Other Geosciences data' },
						  //~ { value: '6',  label: 'WG6 - Analytical and Experimental Laboratories' },
						  //~ { value: '7',  label: 'WG7 - e-infrastructures and virtual community (HPC and Grid)' },
						  //~ { value: '8',  label: 'WG8 - Satellite information data' }
						//~ ]);
						//~ }
					//~ else if(RUfacets[RUfacet] == facet){
						//~ callback(RUvalueMatches[facet][0]);
						//~ break;
						//~ }
					//~ }
            //~ }
          //~ }
        //~ 
        //~ });
//~ 



	
	//~ 
	//~ HERE I BEGIN WITH THE BACKBONE
	//~ 


	//MODEL (attributes are text, order, done)
	window.ResearchUnit = Backbone.Model.extend({
		defaults: function(){
			return {
				ri_name: 		"blank name",
				type_of_ri:		"generic type"
				}
			},
		initialize: function(){
			},
		        recursiveGet: function(searchKey, Obj){ //cerca attraverso un oggetto JSON in tutta la gerarchia se c'è la chiave desiderata e ne restituisce una lista di valori di ri_name
            var self=this;
            var retVal = [];
            for (var key in  Obj){

                //passo n: array
                if(_.isArray(Obj[key])){
                    for (var Elem in Obj[key]){
						if ( _.isString(Obj[key][Elem]) ){//passo base per array
							if (searchKey == key){
								retVal=_.union(retVal,[Obj[key][Elem]]);
								}
							}
						else {
							var myvalue = self.recursiveGet(searchKey, Obj[key][Elem]);
							retVal=_.union(retVal,myvalue);
							}
							//~ var myvalue = self.recursiveGet(searchKey, Obj[key][Elem]);
							//~ retVal=_.union(retVal,myvalue);
							//~ 
						}
					}
                
                //passo n: oggetto 
                else if(_.isObject(Obj[key])){
                    var myvalue = self.recursiveGet(searchKey, Obj[key]);
                    retVal=_.union(retVal,myvalue);
                    }

                //passo base (semplice coppia kay/val
                else if ( !_.isObject(Obj[key]) && !_.isArray (Obj[key])){
                    if (!_.isUndefined(Obj[key])){
                        if (searchKey == key){
                            retVal.push(Obj[key]);
                            }
                        }
                    }
                }

            return retVal;
            }
		});

	//COLLECTION
	window.RUList= Backbone.Collection.extend({
		model: ResearchUnit,
		url:function(){
			return "_list/only_vals2/allfields";
			//~ if (userName=='admin' || userName=='epos-couch' || $.inArray('admin',userRoles)==0){//the two admins
				//~ return "_list/only_vals2/allfields";
				//~ }
			//~ if ($.inArray('national_contact_point',userRoles)==0){ // login for national contact points who can see only their nation ris
				//~ return ('_list/only_vals2/allfields_countryaskey?key="'+userName+'"');
				//~ }
			//~ if ($.inArray('wg_chair',userRoles)==0){// login for wg chairs  who can see only their wg ris
				//~ return ('_list/only_vals2/allfields_wgaskey?key="'+userName.substring(2)+'"');
				//~ } 

			},
		parse: function(response){
			if (userName=='admin' || userName=='epos-couch' || $.inArray('admin',userRoles)==0){
				return _(response.rows).map(function(row) {  //so t works on local :-)))
					return row;
					});
				}
				
			//connect to ride users DB and retrieve the filters array
			var $rideUsrDb = $.couch.db(rideUsersDBname);
			var stringa=RIDEusersGetUsers+'?key="'+userName+'"';
			var userFilters=getJSONData(stringa);
			
			//if the user is not active returns with an error message
			if (userFilters.rows.length!=0){
				//~ console.log(userFilters.rows[0]);
				//if the user is not active returns with an error message
				if (userFilters.rows[0]['value'][1]!=true){
					alert("You credentials are no longer active. Please contact daniele.bailo@ingv.it for support. You'll be redirected to RIDE main page in a few seconds.");
					$.couch.logout({success: function() {
										setTimeout("window.location.href = 'index.html'; ",2500);
										}
									});
					return;
					}
				userFilters=userFilters.rows[0]['value'][0];
				}
			else{ //filter length==0 means no filters, which means the role is 'admin'
				userFilters=[];
				}
			
			var mappedList=_(response.rows).map(function(row) {
				var validRow=true;
				if (!_.isEmpty(userFilters)){
					_.each(userFilters, function(value, key){//user "filters" field of user object to output proper RIs
						//if the rew[key] is an array, it checks if the filteer is a value within the array
						//~ console.log(row[key], value);
						if (_.isArray(row[key]) ){
							if (row[key].indexOf(value.toString())==-1){
								validRow=false;
								}
							}
						else{
							if (row[key]!=value){
								validRow=false;
								}
							}
						});
					}
				if (validRow==true){
					return row;
					}
				 });
			return _(mappedList).filter(function(element){
							if(!_.isUndefined(element)){
								return element;
							}
				});
			},
		initialize:function(){
		    selfino=this;
		    this.fetch({
			success: function(){
			    selfino.serverData=new Backbone.Collection;
			    selfino.serverData.reset(selfino.models);
			    },
			error: function(){
			    }
			});
			},
		comparator: function(item){
			return - item.get('ri_name');
			},
		orderBy: function(param){
			this.comparator=function(item){
				return  (item.get(param));
				}
			this.sort({silent:true});
			if (this.ascending==true){
				this.ascending=false;
				}
			else{
				this.models.reverse();
				this.ascending=true;
				}
			this.trigger('reset',this,{});
			
			},
		filter_results: function(){
		    //~ console.log(this.serverData);
		    //~ var myRUlist=this.serverData.models;
		    //~ var facets = visualSearch.searchQuery.models;
		    //~ if (facets.length >0){
			//~ _.each(facets,function(facet){
			    //~ myRUlist=myRUlist.filter(function(item){
				    //~ return item.get(facet.get('category')) == facet.get('value');
				    //~ });
			    //~ });
			//~ }
		    //~ this.reset(myRUlist);
		    //filter the list according to facets
			var myRUlist=this.serverData.models;
			var facets = [];// visualSearch.searchQuery.models;
			var returnList=myRUlist;
			
			var categroyFct= _.find(facets, function(faccetta){	
								return faccetta.get('category')=='searchType'});
			
			//~ console.log(categroyFct);
			if (facets.length >0){
				if ( !$.isEmptyObject(categroyFct) && (categroyFct.get('value'))=='OR'){
					
					//********logical operator is OR 

                    //~ ******************+NEEDS TO BE IMPLEMENTED!!!!!!!!!!1
                    //do OR search   ******************+NEEDS TO BE IMPLEMENTED!!!!!!!!!!1
					if(facets.length >1){ //OR it is not the only facet in the searchstring
						returnList=[];
						_.each(facets,function(facet){
							returnList=_.union(returnList,myRUlist.filter(function(item){
								return item.get(facet.get('category')) == facet.get('value');
							}));
						});
					}
				}
				else{								
					//*******logical operator is AND ( default)
					_.each(facets,function(facet){
						if (facet.get('value')!='AND'){
							myRUlist=myRUlist.filter(function(item){
                                //~ console.log(item.recursiveGet(facet.get('category'), item.attributes));
								return _.any(item.recursiveGet(facet.get('category'), item.attributes), function(listElement){
                                    return listElement==facet.get('value');
                                    });
								});
							}
						});
					returnList=myRUlist;
				}
			}
			this.reset(returnList);
		    }
		});
		
	window.ListOfRU = new RUList();
	
	// VIEWS
	//view per il form delle RI
	window.RIform = Backbone.Form.extend({
		data: { id: 123, name: 'Rod Kimble', password: 'cool beans' }, //Data to populate the form with
		schema: {
			wg:         { type: 'Number' },
			ri_name:       {}
		}
	});
	//~ per recuperare i dati: var data = form.getValue(); //Returns object with new form values
	

	    
	// ** view della singola ru nella lista
	window.RUView = Backbone.View.extend({
		tagName: 'li',
		events:{
		    "click #edit" : 		"updateRI",
		    "click #delete" : 		"deleteRI"
		    },
		initialize: function(){
		    _.bindAll(this, "updateRI","renderIMG","addIMGlnk","deleteRI","purgeJSONkeys","saveRI");
		    this.formArray=new Array();
		    },
		JSONri:{}, //a json object representing the RI with all its items. See the list connected to the global var "JSONriDescription" to understand how is it done
		RIrow:0,//var to store the row of the RI, so later focus is on RI label
		formArray:null, //this array contains the forms (one for each doc) to be saved when updating an RI
		render: function(){
			//~ *** MODIFY IF YOU HAVE LIST PROBLEMS *** uncomment the console.log
		    //~ $(this.el).id=this.model.get('_id');
		    //~ console.log(this.model.attributes.ri_name,this.model.attributes.doctype, this.model.attributes );
		    $(this.el).append("<span class=ri-item doc-id="+this.model.get('_id')+">"+this.renderIMG()+this.model.get('ri_name')+" - WG"+this.model.get('wg')+"   "+this.addIMGlnk("edit.gif", "Edit RI", "edit")+"   "+this.addIMGlnk("delete.gif", "Delete RI", "delete")+"</span>");
		    //~ console.log(this.model.get('ri_name'), this.model.attributes);
		    return this;
		    },
		addIMGlnk:function(imgName, text, imgId){
		    return ('<a href="javascript:"> <img src="img/'+imgName+'" style="display:inline;vertical-align:middle;float:right;margin-right:5px;" alt="'+text+'" id="'+imgId+'">  </a>');
		    },
		renderIMG: function(){
		    return ('<img src="img/'+this.model.get('country')+'_flag.gif" width="25px">  ');
		    },
		    
		saveRI:function(){
		    //remember: dbName is a global
		    self=this;
		    
		    //get the ri_name in case it has been modified. ouputs an error if there is no ri item (doctype=ri)
		    var riName = 'error';
		    var riCountry='none';
		    for (var itemForm in  this.formArray){
			if (this.formArray[itemForm].data.doctype=='ri'){
			    riName=this.formArray[itemForm].getValue().ri_name;
			    }
			if (this.formArray[itemForm].data.country!=null){
			    riCountry=this.formArray[itemForm].getValue().country;
			    }
			}
		    
		    //if not ri_name, then error
		    if(riName == 'error'){
			window.alert('uhu..? Error in SaveRI function. Report it at daniele.bailo@ingv.it');
			return;
			}
		    
		    //**saves the docs (one each form), but first updates the RIname foreach doc.
		    for(itemForm in  this.formArray){
				docToSave= this.formArray[itemForm].getValue();
				docToSave['ri_name']=riName;
				
				//if it is a newly created documents, remove _rev field which creeates problems. It exist because backbone-forms insert it automatically
				if (docToSave._rev=='')
					delete docToSave._rev;
				
				var numberOfSavedDocs=0;
				self=this;

				$.couch.db(dbName).saveDoc(docToSave,{
					success:function(){
					numberOfSavedDocs=numberOfSavedDocs+1;
						if (numberOfSavedDocs==self.formArray.length){
							if(self.model.set({"ri_name":riName, "country":riCountry})){
								self.updateRI();
								appLog.trigger('log', {user:userName,date:(new Date()), action:"Save",ri_name:riName});
								};
							$('#updatebtn').append('<div id="savemsg" style="color:green;top:130px; position:relative;"/>');
							$('#savemsg').append('<b> UPDATE SUCCESFULL</b>').fadeOut(1000);
							
							
							}
						},
					error:function(resp){
						window.alert("Uh..got an error when saving.. NOtify it to  daniele.bailo@ingv.it and report 'ERROR CODE: updateDBerror'. Thanks --  ERROR:"+resp);
						}
						});
					}
			
		    },

		
		updateRI:function(){
		    //get items with the same riname
			this.JSONri = getJSONData(JSONriDescription+'?key="'+this.model.get('ri_name')+'"');

		    //creates popup
		    this.createPopUp();
		    },
		
		deleteRI:function(){
		    //get items with the same riname
		    itemsToDelete = getJSONData(JSONriDescription+'?key="'+this.model.get('ri_name')+'"');
		    
		    var deletedDocs=0;
		    //confirm message
		    if (confirm ("Are you sure you want to delete this Research infrastructure?\n YOU WILL NOT BE ABLE TO RECOVER IT!'")){
			if(confirm("REALLY SURE?\n:-)")){
			    for (itemListLabel in itemsToDelete){
				for(var item in itemsToDelete[itemListLabel]){
				    //deletes from DB
				    var myid=itemsToDelete[itemListLabel][item]._id;
				    var myrev=itemsToDelete[itemListLabel][item]._rev;
				    var mydoc={_id:myid, _rev:myrev};
				    $.couch.db(dbName).removeDoc(mydoc,{
					success:function(){
					    deletedDocs=deletedDocs+1;
					    appLog.trigger('log', {user:userName,date:(new Date()), action:"delete", ri_name:itemsToDelete[itemListLabel][item]['ri_name']});
					    }
					});
				    }
				}
			    
			    }
			}
		    ListOfRU.fetch({
			success:function(){
			    ListOfRU.serverData.reset(ListOfRU.models);
			    ListOfRU.filter_results();
			    }
			});
		    this.waitUpdate();
		    },
		
		waitUpdate:function(){
		    $(document.body).append('<div id="loadimage"> <img  src="img/loading/updating-animated.gif" ></div>');
		    $('#loadimage').css('position','fixed').css('top','30%').css('left','40%').css('border-style','solid').css('border-width','1px');
				window.setTimeout("$('#loadimage').remove()",2000);
		    },
		
		popUpHTML:function(){ //create html to feed to colorbox, from a JSONri obj which representing the RI (all items in an object)
		    var json_infos= this.JSONri;
		    var self=this;
		    var backboneFormEditorName='';
		    //~ ACCORDION CREATION
		    //it uses two blocks: 
		    //the first is the label block, h3 elements appended to  <div class="demo-show-labelcol" />
		    //the seond is the contenct nlock, div elements appended to <div class="demo-show-contentcol" />
		    var accordionHTML= $('<div class="demo-show" />');
		    $(accordionHTML).prepend("<div class=RUitem style='margin-bottom:10px;text-align:center;font-size:14px;font-weight:bold;color:red;'> Do not waste your efforts: SAVE ALL CHANGES before closing this popup.</div>")
		    $(accordionHTML).prepend("<div class=RUitem style='margin-bottom:10px;text-align:center;font-size:16px;font-weight:bold;'>"+this.renderIMG()+this.model.get('ri_name')+"</div>");
		    var labelCol=$('<div class="demo-show-labelcol" />');
		    var contentCol=$('<div class="demo-show-contentcol" />');
		    
		    this.formArray.length=0;
		    var counter=0;
		    this.RIrow=0;//var to store the row of the RI, so later focus is on RI label
		    for (itemListLabel in json_infos){
			for(var item in json_infos[itemListLabel]){
			//for each item in itemListLabel(which is a list of items with
			//~ the same doctype) , creates a demo-show-labelcol (left label)
			// and a demo-show-contentcol (right content)

			    //LABEL
			    switch(itemListLabel){// itemlist label is given in lowercase by the list function! itemlistlabel is the name of the object in the json backbone scheme in app_vars_and_helpers.js
				case "ri":
				    $(labelCol).prepend('<h3 class="row'+counter+'"   id="'+json_infos[itemListLabel][item]._id+'">RI General Info</h3>');
				    this.RIrow=counter;
				    backboneFormEditorName='ri';
				    break;
				case "facility":
				    if (json_infos[itemListLabel][item].facility_type=='laboratory'){
					$(labelCol).append('<h3 class="row'+counter+'">'+json_infos[itemListLabel][item].facility_type.toUpperCase().replace(/_/g," ")+' - '+json_infos[itemListLabel][item].laboratory_name+'</h3>');
					}
					else if (json_infos[itemListLabel][item].facility_type=='volcanological_facility'){
						
						//tab already existing
						if (json_infos[itemListLabel][item].volc_fac_type){
							$(labelCol).append('<h3 class="row'+counter+'">'+json_infos[itemListLabel][item].volc_fac_type.toUpperCase().replace(/_/g," ")+'</h3>');
							
							}
						//tab created for the 1st time
						else {
							$(labelCol).append('<h3 class="row'+counter+'"> OTHER FACILITY</h3>');
							}
						
						}
					else if (json_infos[itemListLabel][item].facility_type=='gnss_net'){
							//tab already existing
							$(labelCol).append('<h3 class="row'+counter+'"> GNSS NET:'+json_infos[itemListLabel][item].gnss_net_name.toUpperCase().replace(/_/g," ")+'</h3>');

						}
					else if (json_infos[itemListLabel][item].facility_type=='seismic_net'){
							$(labelCol).append('<h3 class="row'+counter+'"> SEISMIC NET: '+json_infos[itemListLabel][item].network_code.toUpperCase().replace(/_/g," ")+'</h3>');
						}

				    else{
						//~ console.log(json_infos[itemListLabel][item]);

						//sometimes the facility_type fields is empty...
						if(	json_infos[itemListLabel][item].hasOwnProperty('facility_type')){
							$(labelCol).append('<h3 class="row'+counter+'"   id="'+json_infos[itemListLabel][item]._id+'">'+json_infos[itemListLabel][item].facility_type.toUpperCase().replace(/_/g," ")+'</h3>');
							}
							else{
								$(labelCol).append('<h3 class="row'+counter+'">'+"UNKNOWN FACILITY"+'</h3>');
								
								}
					}

				    backboneFormEditorName=json_infos[itemListLabel][item].facility_type;
				    if (!backboneJSONform.hasOwnProperty(backboneFormEditorName)){
					backboneFormEditorName='generic_facility';
					}
				    
				    break;
				case "datacentre": 
					$(labelCol).append('<h3 class="row'+counter+'">'+json_infos[itemListLabel][item].doctype.toUpperCase().replace(/_/g," ")+':'+json_infos[itemListLabel][item].data_centre_type+'</h3>');
					

				    backboneFormEditorName=itemListLabel;
				    //~ console.log(backboneFormEditorName);
				    if (!backboneJSONform.hasOwnProperty(backboneFormEditorName)){
					backboneFormEditorName='generic_facility';
					}
					break;

					
				case "dataarchive": 
					$(labelCol).append('<h3 class="row'+counter+'">'+json_infos[itemListLabel][item].doctype.toUpperCase().replace(/_/g," ")+':'+json_infos[itemListLabel][item].data_archive_name+'</h3>');
					

				    backboneFormEditorName=itemListLabel;
				    //~ console.log(backboneFormEditorName);
				    if (!backboneJSONform.hasOwnProperty(backboneFormEditorName)){
					backboneFormEditorName='generic_facility';
					}
					break;
				default:
				    $(labelCol).append('<h3 class="row'+counter+'"  id="'+json_infos[itemListLabel][item]._id+'">'+itemListLabel.toUpperCase().replace(/_/g," ")+'</h3>');
				    backboneFormEditorName=itemListLabel;
				    break;
				}
				//~ console.log(json_infos[itemListLabel][item]);
				
			    //CONTENT
			    this.formArray[counter]=new Backbone.Form({
					data: (json_infos[itemListLabel][item]), //Data to populate the form with
					schema:backboneJSONform[backboneFormEditorName]
					}).render();
					//~ schema: (this.getSchema(itemListLabel,json_infos[itemListLabel][item]))
					
			    var contentRow= $('<div class="content row'+counter+'" />');
			    var contentForm=$(this.formArray[counter].el);
				
				//~ temporarily do not render the financial forms
				//~ if(itemListLabel!='financial' ){
					$(contentCol).append(contentRow);
					$(contentRow).append(contentForm);
					//~ }
					
			    //add legend for financial item
			    if(itemListLabel=='financial' ){
				//~ $(contentRow).prepend('<span style="display:block;color: red; font-weight:bold;maring:auto;text-align: center;">All the figures are displayed in thousand euros</span>');
				$(contentRow).prepend('<span style="display:block;color: red; font-weight:bold;maring:auto;text-align: center;">Financial Information are under revision.</span>');
				}
				
			    //add 'remove form' button to any item-form except 'ri'
			    if(itemListLabel!='ri' ){
				var removeItemForm = $('<span id="remove-item" name="'+json_infos[itemListLabel][item]._id+'"style="display:block; font-weight:bold;text-align: right; margin-right:10px;margin bottom:30px;color:grey;cursor:pointer;"></span>');
				$(removeItemForm).append('Remove  <img src="img/icon-close.gif" />');
				$(removeItemForm).click(function(){
				    self.removeItem($(this).attr('name'));
				    });

				$(contentRow).prepend($(removeItemForm));
				}
			    counter=counter+1;
			    }
			
			
				$(accordionHTML).append($(labelCol));
				$(accordionHTML).append($(contentCol));
			}
		    
            
		    //creates a button-menu for item insertion. Help at http://qrayg.com/experiment/cssmenus/   deformation_pot_field_monitoring
		    var additem = $('<ul id=\"item-nav\">\
			<li>ADD ITEM \
			  <ul>\
				<li><span style="font-size:10px"><b style="font-weight:bold; font-size:12px;">WG1</b> Seismological Observatories</span>\
					<ul>\
						<li><span class=\"addSeismicNet\">Seismic Network</span></li>\
						<li><span class=\"addDC\"> Seismic DataCentre</span></li>\
						<li><span class=\"addDB\">Data Archive</span></li>\
						<li style= "background-color: #CECFBD"><span  class=\"addFinancial\">Financial</span></li>\
						<li style= "background-color: #CECFBD"><span   class=\"addComments\">Comments</span></li>\
					</ul>\
				</li>\
				<li><span style="font-size:10px"><b style="font-weight:bold; font-size:12px;">WG2</b> Volcano Observations</span>\
					<ul>\
						<li><span class=\"addSeismicNet\">Seismic Network</span></li>\
						<li><span class=\"addGNSSnet\">GNSS Network</span></li>\
						<li><span class=\"addDataProc\">GNSS Data Process fac.</span></li>\
						<li><span class=\"addGNSSDC\"> GNSS DataCentre</span></li>\
						<li><span class=\"addDC\">DataCentre</span></li>\
						<li><span class=\"addLab\">Laboratory</span></li>\
						<li><span class=\"addVolcRemSens\">Remote Sensing</span></li>\
						<!--<li><span class=\"addBenchmarks\">Benchmarks List</span></li>\
						<li><span class=\"addPotFieldMon\">Potential Field Monitoring</span></li>\
						<li><span class=\"addGeoDefMon\" style="font-size:13px;">Geodetic and Deform. Monit.</span></li>\
						<li><span class=\"addTempInstrPool\">Temporary Instr. Pool</span></li>\
						<li><span class=\"addGeoMonNet\">Geochemical Monitoring Network</span></li>-->\
						<li><span class=\"addVolcFac\" style="font-size:13px;">Other Volc. Facility</span></li>\
						<li><span class=\"addDB\">Data Archive</span></li>\
						<li style= "background-color: #CECFBD"><span  class=\"addFinancial\">Financial</span></li>\
						<li style= "background-color: #CECFBD"><span   class=\"addComments\">Comments</span></li>\
					</ul>\
				</li>\
				<li><span style="font-size:10px"><b style="font-weight:bold; font-size:12px;">WG4</b> GNSS data and other Geodetic data</span>\
					<ul>\
						<li><span class=\"addGNSSnet\">GNSS Network</span></li>\
						<li><span class=\"addDataProc\">Data Process facility</span></li>\
						<li><span class=\"addGNSSDC\"> GNSS DataCentre</span></li>\
						<li><span class=\"addDB\">Data Archive</span></li>\
						<li><span class=\"addVolcFac\" style="font-size:13px;">Other Facility</span></li>\
						<li style= "background-color: #CECFBD"><span  class=\"addFinancial\">Financial</span></li>\
						<li style= "background-color: #CECFBD"><span   class=\"addComments\">Comments</span></li>\
					</ul>\
				</li>\
				<li><span style="font-size:10px"><b style="font-weight:bold; font-size:12px;">WG6</b> Analytical and Experim. Labs</span>\
										<ul>\
						<li><span class=\"addLab\">Laboratory</span></li>\
						<li><span class=\"addDB\">Data Archive</span></li>\
						<li style= "background-color: #CECFBD"><span  class=\"addFinancial\">Financial</span></li>\
						<li style= "background-color: #CECFBD"><span   class=\"addComments\">Comments</span></li>\
					</ul>\
				</li>\
				<li><span style="font-size:10px"><b style="font-weight:bold; font-size:12px;">WG9</b> Geomagnetic Laboratory</span>\
					<ul>\
						<li><span class=\"addGeomagneticPerm\">Geomagnetic Perm. Fac.</span></li>\
						<li><span class=\"addGeomagneticTemp\">Geomagnetic Temp. Fac.</span></li>\
						<li><span class=\"addGeomagneticRepStat\">Geomagnetic Repeat. St.</span></li>\
						<li><span class=\"addDC\">DataCentre</span></li>\
						<li><span class=\"addDB\">Data Archive</span></li>\
						<li style= "background-color: #CECFBD"><span  class=\"addFinancial\">Financial</span></li>\
						<li style= "background-color: #CECFBD"><span   class=\"addComments\">Comments</span></li>\
					</ul>\
				</li>\
				<li><span style="font-size:10px"><b style="font-weight:bold; font-size:12px;">WG10</b>Infrastructures for Georesources</span>\
					<ul>\
						<li><span class=\"addSeismicNet\">Seismic Network</span></li>\
						<li><span class=\"addDC\">DataCentre</span></li>\
						<li style= "background-color: #CECFBD"><span  class=\"addFinancial\">Financial</span></li>\
						<li style= "background-color: #CECFBD"><span   class=\"addComments\">Comments</span></li>\
					</ul>\
				</li>\
			  </ul>\
			</li>\
		    </ul>');
		    
		    //add buttons
		    

		    var buttons= $("<div id='buttons' />");

		    $(buttons).css('display','block');
		    $(buttons).append('<div id="updatebtn">SAVE ALL</div> ').delegate('#updatebtn','click', this.saveRI);
		    
		    $(buttons).append($(additem));//this event is handled inside the $.colorbox here below
			
			$(buttons).append('<div id="discard">EXIT</div> ');
			//~ $(accordionHTML).append('<div id="updatebtn">SAVE ALL</div> ').delegate('#updatebtn','click', this.saveRI);
			
			
		    //create discard button
		    //~ $(accordionHTML).append('<div id="discard">EXIT</div> ');//this event is handled INSIDE the $.colorbox 
			
			
			$(labelCol).append($(buttons));
			
			
		    return accordionHTML;
		    },
		    
		createPopUp:function(){ //pops upd the colorbox popup. It can be used also to re-render the active popup
		    var self=this;
		    //popup box
		    $.colorbox({
			    html:self.popUpHTML(),//use the rendering function
			    transition: "elastic",
			    speed:400,
			    scrolling: true,
			    width: "850px",
			    height: "700px",
			    onClosed:function(){
				$(document.body).append('<div id="loadimage"> <img  src="img/loading/updating-animated.gif" ></div>');
				$('#loadimage').css('position','fixed').css('top','30%').css('left','40%').css('border-style','solid').css('border-width','1px');
				window.setTimeout("$('#loadimage').remove()",2000);
				ListOfRU.fetch({
				    success:function(){
					ListOfRU.serverData.reset(ListOfRU.models);
					ListOfRU.filter_results();
					}
				    });
				},
			    onComplete:function(){
				//ACCORDION CODE
			       //~ thanks to http://www.learningjquery.com/2007/02/more-showing-more-hiding
			      var bgColor=$('.demo-show-contentcol').css('background-color');//'#F1F1F1';
			      var fgColor=$('.demo-show h3').css('background-color');//'#BBC7E3';
			      
			      $('div.demo-show div.content').hide();
			      $('div.demo-show div.row'+self.RIrow).show();
			      $('h3.row'+self.RIrow).css('background-color',bgColor);
			      var previousClass='row'+self.RIrow;
			      
			       //hover handler
			       $('div.demo-show h3').hover(
				    function(){
					if ($(this).attr("class") != previousClass){
					    $(this).css( 'background-color',bgColor);
					    $(this).css( 'cursor','pointer');
					    }
					}, 
				    function(){
					if ($(this).attr("class") != previousClass){
					     $(this).css('background-color',fgColor);
					     $(this).css( 'cursor','default');
					     }
					});
			       
			       //click handler: hide unwantend contents, show selected content
			      $('div.demo-show h3').click(function() {
				    $('h3.'+previousClass).css('background-color',fgColor); 
				    var classStringShow= 'div.demo-show div.'+$(this).attr("class");
				    var classStringH3='div.demo-show h3.'+$(this).attr("class");
				    $(classStringH3).css('background-color',bgColor);
				    $('div.demo-show div.content').hide();
				    $(classStringShow).fadeToggle('700','linear');
				    previousClass=$(this).attr("class");
				    self.refreshForms();
			      });
			      

			      //exit button handler
			      $('#discard').click(function(){
				  $.colorbox.close();
				  });
				  
				//additem button handler
			      $('#item-nav').hover(
				function() { $(this).addClass("iehover");},
				function() { $(this).removeClass("iehover"); }
				);
				
			      //addSeismicNet (facility)button handler
			      $('.addSeismicNet').click(function(){
				    self.refreshForms(); //it refreshes the JSONri object, so that changes in existing forms are not lost when adding a new form
				    self.addFacility('seismic_net');//name of backbone-editor object (in app_vars_and_helpers.js file)
				    self.createPopUp();
				  });
				  
				//addGPSnet (facility)button handler
			      $('.addGNSSnet').click(function(){
				  self.refreshForms();
				    self.addFacility('gnss_net');
				    self.createPopUp();
				  });
				  
				//addLab (facility)button handler
			      $('.addLab').click(function(){
				    self.refreshForms();
				    self.addFacility('laboratory');
				    self.createPopUp();
				  });
                  
                  //addDataProc (facility)button handler
			      $('.addDataProc').click(function(){
				    self.refreshForms();
				    self.addFacility('data_processing_facility');
				    self.createPopUp();
				  });
				  
				  //~ add geochemical_monitoring_network
				  //addGeoMonNet (facility)button handler
			      $('.addGeoMonNet').click(function(){
				    self.refreshForms();
				    self.addFacility('geochemical_monitoring_network');
				    self.createPopUp();
				  });
				  
				   
				   //~ add geomagnetic_permanent_facility
				  //addGeoNet (facility)button handler
			      $('.addGeomagneticPerm').click(function(){
				    self.refreshForms();
				    self.addFacility('geomagnetic_permanent');
				    self.createPopUp();
				  });
				  
				  
				   //~ add geomagnetic_permanent_facility
				  //addGeoNet (facility)button handler
			      $('.addGeomagneticTemp').click(function(){
				    self.refreshForms();
				    self.addFacility('geomagnetic_temporary');
				    self.createPopUp();
				  });
				  
				  
				  //~ add geomagnetic_permanent_facility
				  //addGeoNet (facility)button handler
			      $('.addGeomagneticRepStat').click(function(){
				    self.refreshForms();
				    self.addFacility('geomagnetic_repeat_stations');
				    self.createPopUp();
				  });
				  
				  
				   
				   
				  //addVolcRemSens (facility)button handler
			      $('.addVolcRemSens').click(function(){
				    self.refreshForms();
				    self.addFacility('volcano_remote_sensing');
				    self.createPopUp();
				  });
				  

				  //addPotFieldMon (facility)button handler
			      $('.addBenchmarks').click(function(){
				    self.refreshForms();
				    self.addFacility('benchmarks_list');
				    self.createPopUp();
				  });
				  
				  //addVolcFac (facility)button handler
			      $('.addVolcFac').click(function(){
				    self.refreshForms();
				    self.addFacility('volcanological_facility');
				    self.createPopUp();
				  });
				  
				  //addPotFieldMon (facility)button handler
			      $('.addPotFieldMon').click(function(){
				    self.refreshForms();
				    self.addFacility('potential_field_monitoring');
				    self.createPopUp();
				  });
				  
				  //addTempInstrPool (facility)button handler
				  $('.addTempInstrPool').click(function(){
				    self.refreshForms();
				    self.addFacility('temporary_instrument_pool');
				    self.createPopUp();
				  });
                  
                  //addDefPotNetMon (facility)button handler
				  $('.addGeoDefMon').click(function(){
				    self.refreshForms();
				    self.addFacility('geodetic_and_deformation_monitoring');
				    self.createPopUp();
				  });
                  
			      //addDC  seismic button handler
			      $('.addDC').click(function(){
				    self.refreshForms();
				    self.addDC();
				    self.createPopUp();
				  });
                  
                  //addGNSSDC  seismic button handler
			      $('.addGNSSDC').click(function(){
				    self.refreshForms();
				    self.addGNSSDC();
				    self.createPopUp();
				  });
			      
			      //addDB  button handler
			      $('.addDB').click(function(){
				    self.refreshForms();
				    self.addDB();
				    self.createPopUp();
				  });
			      
			      //addFinancial  button handler
			      $('.addFinancial').click(function(){
				    self.refreshForms();
				    self.addFinancial();
				    self.createPopUp();
				  });
				
                
                //addComments  button handler
			      $('.addComments').click(function(){
				    self.refreshForms();
				    self.addComments();
				    self.createPopUp();
				  });

			     }
			});
		    
		    },
		    
		    
		addFacility:function(facilityType){ //similar to addRI func
		    if (this.JSONri.hasOwnProperty( "facility") ==false){//does the item exist?
			this.JSONri.facility=[];
			}
		    var facilityJSON=this.backboneFormEditor2JSON(backboneJSONform[facilityType]);
		    facilityJSON.facility_type=facilityType;
		    facilityJSON._id=randomHashString();
		    facilityJSON.doctype='facility';
		    facilityJSON.facility_type=facilityType;//this must be the same identifier of the backbone editor
		    facilityJSON.ri_name=this.model.get('ri_name');
		    delete facilityJSON._rev; 
		    this.JSONri.facility.push(facilityJSON);
		    appLog.trigger('log', {user:userName,date:(new Date()), action:"addFacility", ri_name:this.model.get('ri_name')});
		    },

		addDC:function(){//similar to addRI func
		    if (this.JSONri.hasOwnProperty( "datacentre") ==false){//does the item exist?
                this.JSONri.datacentre=[];
			}
		    var DC=this.backboneFormEditor2JSON(backboneJSONform.datacentre);
		    DC._id=randomHashString();
		    DC.doctype='datacentre';
		    DC.ri_name=this.model.get('ri_name');
		    delete DC._rev;
		    this.JSONri.datacentre.push(DC);
		    appLog.trigger('log', {user:userName,date:(new Date()), action:"addDC", ri_name:this.model.get('ri_name')});
		    },
            
        addGNSSDC:function(){//similar to addRI func
		    if (this.JSONri.hasOwnProperty( "gnss_datacentre") ==false){//does the item exist?
			this.JSONri.gnss_datacentre=[];
			}
		    var DC=this.backboneFormEditor2JSON(backboneJSONform.gnss_datacentre);
		    DC._id=randomHashString();
		    DC.doctype='gnss_datacentre';
		    DC.ri_name=this.model.get('ri_name');
		    delete DC._rev;
		    this.JSONri.gnss_datacentre.push(DC);
		    appLog.trigger('log', {user:userName,date:(new Date()), action:"addGNSSDC", ri_name:this.model.get('ri_name')});
		    },
		    
		addDB:function(){//similar to addRI func
		    if (this.JSONri.hasOwnProperty( "dataarchive") ==false){//does the item exist?
			this.JSONri.dataarchive=[];
			}
		    var DB=this.backboneFormEditor2JSON(backboneJSONform.dataarchive);
		    DB._id=randomHashString();
		    DB.doctype='dataarchive';
		    DB.ri_name=this.model.get('ri_name');
		    delete DB._rev;
		    this.JSONri.dataarchive.push(DB);
		    appLog.trigger('log', {user:userName,date:(new Date()), action:"addDB", ri_name:this.model.get('ri_name')});
		    },
		
		addFinancial:function(){//similar to addRI func
		    if (this.JSONri.hasOwnProperty( "financial") ==false){//does the item exist?
			this.JSONri.financial=[];
			}
		    var myFinancial=this.backboneFormEditor2JSON(backboneJSONform.financial);
		    myFinancial._id=randomHashString();
		    myFinancial.doctype='financial';
		    myFinancial.ri_name=this.model.get('ri_name');
		    delete myFinancial._rev;
		    this.JSONri.financial.push(myFinancial);
		    appLog.trigger('log', {user:userName,date:(new Date()), action:"addFinancial", ri_name:this.model.get('ri_name')});
		    },
		    
        addComments:function(){//similar to addRI func
		    if (this.JSONri.hasOwnProperty( "comment_form") ==false){//does the item exist?
			this.JSONri.comment_form=[];
			}
		    var myComments=this.backboneFormEditor2JSON(backboneJSONform.comment_form);
		    myComments._id=randomHashString();
		    myComments.doctype='comment_form';
		    myComments.ri_name=this.model.get('ri_name');
		    delete myComments._rev;
		    this.JSONri.comment_form.push(myComments);
		    appLog.trigger('log', {user:userName,date:(new Date()), action:"addComments", ri_name:this.model.get('ri_name')});
		    },

		removeItem:function(idToRemove){
		 //~ removes an item from this.JSONri JSON object
		 //~ removes doc from db and 
		 //~ re-render the popup
		 var self=this;
		    for (itemListLabel in this.JSONri){
			for(var item in this.JSONri[itemListLabel]){
			    if(this.JSONri[itemListLabel][item]._id==idToRemove &&  confirm ("Are you sure you want to delete this item?\n You'll not be able to recover it.'")){
				//~ console.log('remove: ',this.JSONri[itemListLabel][item].doctype, this.JSONri[itemListLabel][item]._id);
				//deletes from DB
				var myid=this.JSONri[itemListLabel][item]._id;
				var myrev=this.JSONri[itemListLabel][item]._rev;
				var mydoc={_id:myid, _rev:myrev};
				$.couch.db(dbName).removeDoc(mydoc,{
				    success:function(){
					$('#updatebtn').append('<div id="savemsg" style="color:green;top:130px; position:relative;"/>');
					$('#savemsg').append('<b> UPDATE SUCCESFULL</b>').fadeOut(3000);
					//~ appLog.trigger('log', {user:userName,date:(new Date()), action:"remove form",ri_name:self.JSONri[itemListLabel][item]['ri_name']});
					}
				    });
				    
				//removes from JSONri
				delete this.JSONri[itemListLabel][item];
				
				}
			    }
			}
		    this.createPopUp();
		    return;
		    },
		    
		backboneFormEditor2JSON:function(editor){ //transforms the backbone-form editor to a json object
		    var returnJSON={};
		    //editor is a json obj
		    for (var key in editor){
			returnJSON[key]='';''
			}
		    return returnJSON;
		    },

		
		refreshForms:function(){//take form input, translate it into a JSONri object and put it into the this.JSONri object
		    var jsonRiInfo=new Object();
		    var tempForm=new Object();
		    for(itemForm in  this.formArray){
                tempForm=this.formArray[itemForm].getValue();
                if (jsonRiInfo[tempForm['doctype']]==undefined){//creates an array foreach possible object. i.e. ri, facility, datacentre, database.. and others 
                    jsonRiInfo[tempForm['doctype']]=new Array()
                    }
                jsonRiInfo[tempForm['doctype']].push(tempForm);
                }
		    delete this.JSONri;
		    this.JSONri=jsonRiInfo;
		    },

		purgeJSONkeys:function(JSONobj, delFieldArr){
		    //remove from JSONobj all the keys specified in delFieldArr
		    _.each(delFieldArr, function(elm){
			    delete JSONobj[elm];
			    });
		    return JSONobj;
		    }
		});
		
	// ** view per la lista di RIs
	window.itemList = Backbone.View.extend({
		el:$("#ri-list"),
		events:{
			},
		initialize:function(){
		    _.bindAll(this,  'addAll','addOne');
		    //when lists resets, it triggers the auto fill in
		    ListOfRU.bind('reset', this.addAll);
		    $("#addRiBtn span").on('click',this.addRI);
			},
			
		addOne: function(ResearchUnit){
		    var view = new RUView({model: ResearchUnit});
		    $(this.el).prepend(view.render().el);
		    },
		addAll: function(){
		    $(this.el).empty();
		    ListOfRU.each(this.addOne);
		    },
		
		addRI:function(){
		    var myid=randomHashString();
		    var myModel=new ResearchUnit({_id:myid, doctype:'ri', ri_name:'Name format: Institution - RI name'});
		    var view = new RUView({model: myModel});
		    $(this.el).prepend(view.render().el);
		    
		    //usernames are added to the jsonRI because if a user saves the new created RI, he should be able to see it also after closing the popup.
		    //to do this, the parameters which makes a RI viewable must be setted. 
		    //these are 'dirty' lines, because the user can view by country OR by wg. Should be laternative...
		    view.JSONri={ri:[{_id:myid, doctype:'ri', ri_name:'Name format: Institution - RI name', country:userName, wg:0}]}; 
			
			appLog.trigger('log', {user:userName,date:(new Date()), action:"addRI"});

		    view.createPopUp();
		    }
		});


	// ** view for visualsearch box
	//~ window.VSview = Backbone.View.extend({
	    //~ initialize: function(){
		//~ _.bindAll(this, "searchOnEnter");
		//~ this.VSobject=visualSearch;
		//~ this.id=visualSearch.searchBox.id;
		//~ this.VSobject.searchQuery.bind('reset',this.searchOnEnter);
		//~ },
//~ 
	    //~ searchOnEnter:function(){
		//~ ListOfRU.filter_results();
		//~ }
	    //~ });
	//~ 
	
	
	// ** view delle informazioni statistiche relative ad EPOS
	window.floatingText = Backbone.View.extend({
		el: $("#epos-info-box"), 
		initialize: function(){
			this.updateTotal();
			},
		updateTotal: function(){
        
            var textList=[];
            textList[0]="Welcome to the RIDE Research Infrastructure Update Page!";
            textList[1]="Need help? Click on the help button above.";
			textList[2]="Tip 1: Each row is a Research Infrastructure. Icons on the right: delete/modify it.";
			textList[3]="Tip 2: to add a RI click on 'add RI' below-left the searchbar";
			textList[4]="Tip 3: filter the list of RI with the searchbar. Write 'country: YOUR-COUNTRY' and hit enter";
			
			var options = {
				duration: 3000,          // Time (ms) each blurb will remain on screen
				rearrangeDuration: 700, // Time (ms) a character takes to reach its position
				effect: 'random',        // Animation effect the characters use to appear
				centered: true           // Centers the text relative to its container
			  }
			//~ $(this.el).lettering('words');
			$(this.el).textualizer(textList, options);
			$(this.el).textualizer('start');
			}
		});
	
	//top level view
	window.AppView = Backbone.View.extend({
		el:$("#content"),
		events:{
			"change #item-orderby select"	:		"orderBy",
			"click #item-orderby img"	:			"orderBy",
			"click .login input[type='submit']"	:					"resetList",
			"click #reload"	:					"reload"
			},
		initialize:function(){
			this.listView= new itemList();
			//~ this.searchBox= new VSview();
			this.floatingHeaderText= new floatingText();
			appLog.trigger('log', {user:userName,date:(new Date()), action:"login"});
			//~ ListOfRU.bind('reset', ListOfRU.fetch());
			},
		orderBy:function(){
			ListOfRU.orderBy($(this.el).find("#item-orderby select").val());
			},
		reload:function(){
			$(document.body).append('<div id="loadimage"> <img  src="img/loading/updating-animated.gif" ></div>');
			window.location.reload();
			},
		resetList:function(){
			self=this;
			$("#welcome").couchLogin({
				loggedIn:function(userCtx){
					self.reload();
					}
			});
			}
		});
	
	window.App = new AppView();
	
	}, //END LOGGED IN CODE
	
	loggedOut : function() {
			//~ $("#welcome").append("<div style='color:red'>You are not logged in. Please login to Manage RIs.</div>")
			$("a#welcome").remove();
			$("#ri-list").remove();
	}
	
});

