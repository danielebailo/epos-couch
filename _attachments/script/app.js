$(function(){
		
	//SOME GLOBALS	
	//tooltip for filtering
	var api=$("#search-tooltip").simpletip({
		 // Configuration properties 
		 persistent:true,
		 focus:true,
		 //~ fixed: false,
		 showEffect: 'fade',
		 hideEffect: 'slide',
		 position: 'bottom',
		 showtime:600,
		 offset:[0,-50],
		}).simpletip();
    
    api.load('filter-tip.html');
		
	var parentAccordion=null;
	var nestedAccordion=null;
	var loggedIn=false; //this var is handled in the login view
	
	
	

	
	//adds the 'searchType' option to search, to perform searches with logical AND OR operators
	RUfacets.push('searchType');
	RUvalueMatches['searchType']=['AND','OR'];
	
	
	//Visual Search object
	//~ var visualSearch = VS.init({
          //~ container  : $('#search_box_container'),
          //~ query      : 'country:click-to-select  ',
          //~ unquotable : [],
          //~ callbacks  : {
            //~ search : function(query, searchCollection) {
              //~ var $query = $('#search_query');
              //~ var count  = searchCollection.size();
              //~ $query.stop().animate({opacity : 1}, {duration: 300, queue: false});
              //$query.html('<span class="raquo">&raquo;</span> You searched for: ' +
               //           '<b>' + (query || '<i>nothing</i>') + '</b>. ' +
                //          '(' + count + ' filter' + (count==1 ? '' : 's') + ')');
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
					//~ else	if(RUfacets[RUfacet] == facet){
						//~ callback(RUvalueMatches[facet][0]);
						//~ break;
						//~ }
					//~ }
            //~ }
          //~ }
        //~ 
        //~ });
//~ 



	
	//***********************************+ BACKBONE+*******
	//ok, let's start with backbonejs...
	
	//****SOME WORDS ON THE STRATEGY TO COLLECT ITEMS FROM DATABASE****
	//1. What we're trying to do is to show info about different research infrastructure (RIs)
	//2. RIs are stored inside the couchdb as documents. There can be several docs with the same ri_name because one RI can be composed by different items; for instance a seisimc network has: a general description(first doc), a datacenter (second doc), a facility (third doc), financial info(fourth doc).
	//So the idea is to aggregate all docs with the same ri_name and pu them into a single list element (i.e. into a model).
	//IMPORTANT INFO: if an element (model) has a certain item, let's say a datacenter, then among it's key/value pairs you'll find "datacenter":true. It allows the user to show, in a list, only RIs which have a certain element (datacenter, facility etc.)
	//The elements are: DATACENTER, DATABASE, FACILITY, FINANCIAL_INFO, and maybe INSTRUMENT
	
	//MODEL (attributes are text, order, done)
	window.ResearchUnit = Backbone.Model.extend({
		defaults: function(){
			return {		};
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
		
		
	//MODEL FOR FACETS
	window.FacetMdl= Backbone.Model.extend({
        defaults: {
            category:'',
            value:'ok'
        },
        initialize: function(){
            //nothing
        }
    });
    
    
    //COLLECTION FOR FACETS
    window.FacetsColl= Backbone.Collection.extend({
		model: FacetMdl,
		//~ addFirst:function(){
			//~ this.trigger('addFirst');
			//~ },
		//~ addOne:function(){
			//~ this.trigger('reset');
			//~ },
		//~ removeLast:function(){
			//~ this.trigger('reset');
			//~ }
		});
    
    window.ListOfFilters = new FacetsColl();
    
	//COLLECTION
	window.RUList= Backbone.Collection.extend({
		model: ResearchUnit,
		url:"_list/only_vals2/allfields_RIaskey",
		parse: function(response){
			return _(response.rows).map(function(row) { return row ;});
			},
		serverData:null,
		initialize:function(){
			var self=this;
			this.fetch({
				success: function(){
					self.serverData=new Backbone.Collection;
					self.serverData.reset(self.models);
					var i=0;
					for (var modello in self.models.reverse()){
						i=i+1;
						}
					},
				error: function(){
					//~ console.log("error");
					},
				});
			},

		filter_results: function(facets){
			//filter the list according to facets
			var myRUlist=this.serverData.models;
			//~ var facets = visualSearch.searchQuery.models;
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
			
			//~ this.reset(returnList, {silent: true}).deferred.then(
				//~ self.trigger('reset')
				//~ );
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
		});
		
	window.ListOfRU = new RUList();

	//VIEWS
	// ** view della singola FACET nella lista
	//~ - when enter is pressed, it updates the model for this view
	//~ - when a new filter is added, it adds it to the collection
	//~ - when '+' is clicked, triggers an event  (addFilter) listend by facetListView which adds another view
	//~ - when '-' is clicked, removes this view and the associated model
	window.facetView = Backbone.View.extend({
		tagName: 'li',
		events:{
			"click #add-filter"				:"addOne",
			"click #remove-filter"				:"removeThisFilter"
			},
		initialize:function(){
			//~ console.log(this.model);
			},
		render:function(){
			var self=this;
			var span = $("<span class='facetitem'></span>");
			var select = $("<select><option value=\"default\">--Select a filter-- </option> "+this.optionizeList(RUfacets)+"</select>");
			
			//changes optionlist
			$(select).change(function(){
				var valori=RUvalueMatches[$(select).attr('value')].sort();//.sort();
				$(input).autocomplete({
					minLength: 0,
					source: valori,
					focus:function(){
						},
					select:function(event, ui){
						
						var categoria=$(select).attr('value');
						var valore=ui.item.value;
						self.model.set({category:categoria, value:valore});
						//~ console.log(self.model);
						return true;
						}
					}).focus(function() {
				$(this).autocomplete("search", "");
					});
				});
			
			var input= $("<input type=text id='"+this.model.cid+"' placeholder='...write a search string...' >");
			$(input).on("click",function(){
				if (($(select).attr('value')) == "default"){
					var tt=$('<div id="tt">Please Select a Filter On The Left Dropdown Menu</div>');
					$('body').append($(tt));
					toolTip('Please Select a Filter On The Left Dropdown Menu', 200, 30);
					setTimeout("toolTip()",1500);
					setTimeout("$(tt).remove()",2000);
					}
				});
				
			//remove text input content
			$(select).change(function() {
				$(input).attr('value','');
				});
				
			var imgs= $(" <img id='add-filter' src='img/add_one.png' alt='click here to add a filter'style='cursor:pointer;vertical-align: middle;' onmouseover='toolTip(\"Click to ADD a filter\",100)' onmouseout='toolTip()' /><img id='remove-filter' src='img/Remove Icon18.png' alt='click here to remove this filter' style='cursor:pointer;vertical-align: middle;' onmouseover='toolTip(\"Click to REMOVE a filter\", 100)' onmouseout='toolTip()'/> ");
			
			var submit= $("");
			
			//add the submit and reset buttons if it's the first filter
			if (ListOfFilters.length == 1){
				submit= $("<input type='submit' value='Search' style='cursor:pointer;vertical-align: middle;float: right;margin-right: 3px;'>").on('click', function(){
					ListOfRU.filter_results(ListOfFilters.models);
					//~ console.log(ListOfFilters.models);
					});
					
				reset=$("<input type='submit' value='Reset' style='cursor:pointer;vertical-align: middle;float: right;margin-right: 3px;'>").on('click', function(){
					ListOfRU.filter_results([]);
					//~ console.log(ListOfFilters.models);
					});
					
				help=$("<div alt='help me with filters' title='Select a subset of the RIs in the list below just filtering them: <br>1. Choose an option in the \"--select filter--\" dropdown menu <br>2. choose a value in the \"...write a search string...\" box at its right' style='color:red;cursor:help;vertical-align: middle;float: right;margin-right: 3px;'>Help</div>").toggle(
					function(){ $(this).showBalloon({
								tipSize: 20,
								position: "bottom",
								css: {maxWidth: "17em",
									border: "solid 5px #463974",
									color: "#463974",
									fontWeight: "bold",	
									fontSize: "130%",
									backgroundColor: "#efefef"
									}
							}); },
					function(){ $(this).hideBalloon(); }
				  );
				
				$("#search_box_container").append($(help));
				$("#search_box_container").append($(submit));
				$("#search_box_container").append($(reset));
				
				}
			
			$(this.el).append($(span).append($(select)).append($(input)).append($(imgs)));
			$('#header').height($('#header').height()+addHeaderPx);
			return this;
			},
		optionizeList: function(list){
			//create the options list for the dropdown menu
			var optionHTML='';
			//~ list.sort();
			var extendendOptionName={	"ri_name":"Research Infrastructure Name",
										"ri_type":"Research Infrastructure Type",
										"country":"Country",
										"wg":"Working Group",
										"ri_manager":"Research Infrastructure Manager",
										"network_code":"Network Code",
										"laboratory_research_field":"Laboratory Research Field",
										"type":"Instrument Type",
										"brand":"Instrument Brand",
										"searchType":"Search Type (AND/OR)"
										};
			for (var elemento in list){
				//~ optionHTML=optionHTML+'<option value="'+list[elemento]+'">'+list[elemento].toUpperCase().replace(/_/g," ")+'</option>';
				optionHTML=optionHTML+'<option value="'+list[elemento]+'">'+extendendOptionName[list[elemento]]+'</option>';
				//~ console.log(list[elemento], extendendOptionName[list[elemento]]);
				}
			//~ console.log(optionHTML);
			return optionHTML;
			},
		addOne:function(){
			this.trigger("addFilter");
			},
		removeThisFilter:function(){
			//~ delete model from collection
			//~ console.log(ListOfFilters.length);
			if (ListOfFilters.length>1){
				ListOfFilters.remove(this.model);
				$(this.el).remove();
				$('#header').height($('#header').height()-addHeaderPx);
				}
			else { 
				alert ("Please Leave one filter at least. If you want to show all Research Infrastructure, click on 'RESET' and on 'SEARCH'");
				}
			}
		});
	
	//view for facetslist
	//listen for add filter event 
	window.facetListView = Backbone.View.extend({
		el:$("#search_box_container"),
		events:{
			},
		initialize:function(){
			_.bindAll(this,  'addOne');
			//~ ListOfFacets.bind('reset', this.addAll);
			this.addOne();
			this.render();
			//~ $(this.el).hide();//filtrify compatibility
			},
		addOne: function(){
			var newModel= new FacetMdl();
			var filterView=new facetView({model: newModel});
			ListOfFilters.add(filterView.model);
			filterView.bind('addFilter', this.addOne);
			$(this.el).prepend(filterView.render().el);
			},
		render:function(){
			
			}
		});
	
	//** very very simple login view
	window.loginView = Backbone.View.extend({
		el:$("#account"),
		initialize:function(){
			this.render();
		},
		
		render: function(){
			var self=this;
			
			$(this.el).couchLogin({
				loggedIn : function(userCtx) {
					$(self.el).append('  - <a id="editripulsate" href="profile.html" style="color:#EBA612;"> Edit RIs</a>');
					$(self.el).append(' <span id="spanpulsate"><img src="img/up-yellow-arrow-icon-th-mini.png" style=" margin-left:5px; position:relative;vertical-align:text-top"/> Click to edit!</span>');
					$(self.el).find('#spanpulsate').effect("pulsate", { times:20 }, 500);
					$(self.el).find('#editripulsate').effect("pulsate", { times:7 }, 700);
					
					$(self.el).find('#spanpulsate').fadeOut('slow');
					//~ for(var i=0; i<3;i++){
						//~ $(self.el).find('img').animate({ left: '+=30px'},1000).animate({ left: '-=30px'},1000);
						//~ }
					//~ $(self.el).find('img').fadeOut('slow').append('<span>CLICK TO EDIT RESEAERCH INFRASTRUCTURES</span>')				  
					
					loggedIn=true;//global var!!!!!
					self.trigger("loginChange");
				}, 
				loggedOut : function() {
					loggedIn=false;
					self.trigger("loginChange");
					}
				});
			}
	});
	
	// ** view della singola ru nella lista
	window.RUView = Backbone.View.extend({
		tagName: 'li',
		events:{
			"click"				:"showInfo"
			},
		initialize: function(){
		    _.bindAll(this, "showInfo","renderIMG","addIMGlnk","purgeJSONkeys");
		    this.formArray=new Array();
		    },
		JSONri:{}, //a json object representing the RI with all its items. See the list connected to the global var "JSONriDescription" to understand how is it done
		RIrow:0,//var to store the row of the RI, so later focus is on RI label
		formArray:null, //this array contains the forms (one for each doc) to be saved when updating an RI
		render: function(){
			//~ console.log(this.model.attributes.ri_name);
			$(this.el).append("<span class=RUitem>"+this.renderIMG()+"<i>"+this.model.get('ri_name')+"</i>"+" - WG "+this.model.get('wg')+"</span>");
			//~ console.log(JSON.stringify(this.model.get('wg')));
			//~ var self=this;
			//~ //filtrify compatibility
			//~ $.each(this.purgeJSONkeys(this.model.attributes,['key','value','_id']),function( key, value ) {
				 //~ var attribute="data-"+key;
				  //~ $(self.el).attr(attribute, value);
				//~ });
			
			return this;
			},
		addIMGlnk:function(imgName, text, imgId){
		    return ('<a href="javascript:"> <img src="img/'+imgName+'" style="display:inline;vertical-align:middle;float:right;" alt="'+text+'" id="'+imgId+'">  </a>');
		    },
		renderIMG: function(){
		    return ('<img src="img/'+this.model.get('country')+'_flag.gif" width="25px">  ');
		    },
		    
		
		showInfo:function(arg_ri_name){
		    //get items with the same riname
			if (!_.isString(arg_ri_name)){
				this.JSONri = getJSONDataPOST(JSONriDescription,'{"keys":["'+this.model.get('ri_name')+'"]}');
			} else
			{
				this.JSONri = getJSONDataPOST(JSONriDescription,'{"keys":["'+arg_ri_name+'"]}');
				}
			

		    //creates popup
		    this.createPopUp();
		    },
		
		popUpHTML:function(){ //create html to feed to colorbox, from a JSONri obj which representing the RI (all items in an object)
			//~ console.log(this.JSONri);
			
		    var json_infos= this.JSONri;
		    var self=this;
		    var backboneFormEditorName='';
		    //~ ACCORDION CREATION
		    //it uses two blocks: 
		    //the first is the label block, h3 elements appended to  <div class="demo-show-labelcol" />
		    //the seond is the contenct nlock, div elements appended to <div class="demo-show-contentcol" />
		    var accordionHTML= $('<div class="demo-show" />');
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
			    
                //skip if financial info is being processed and user is not logged in
                if(itemListLabel=='financial' && loggedIn==false) //do not visualize financial if user is not logged in
					continue;
          
			    //LABEL
			    switch(itemListLabel){// itemlist label is given in lowercase by the list function! itemlistlabel is the name of the object in the json backbone scheme in app_vars_and_helpers.js
				case "ri":
				    $(labelCol).prepend('<h3 class="row'+counter+'">RI General Info</h3>');
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
							$(labelCol).append('<h3 class="row'+counter+'"> VOLC. FACILITY</h3>');
							}
						
						}
					else if (json_infos[itemListLabel][item].facility_type=='gnss_net'){
							//tab already existing
							$(labelCol).append('<h3 class="row'+counter+'"> GNSS NET:'+json_infos[itemListLabel][item].gnss_net_name.toUpperCase().replace(/_/g," ")+'</h3>');

						}
					else if (json_infos[itemListLabel][item].facility_type=='geomagnetic_permanent' ){
							//tab already existing
							$(labelCol).append('<h3 class="row'+counter+'">GEOMAGNETIC PERMANENT:'+json_infos[itemListLabel][item].name.toUpperCase().replace(/_/g," ")+'</h3>');

						}
					else if (json_infos[itemListLabel][item].facility_type=='seismic_net'){
							$(labelCol).append('<h3 class="row'+counter+'"> SEISMIC NET: '+json_infos[itemListLabel][item].network_code.toUpperCase().replace(/_/g," ")+'</h3>');
						}
				    else{
						//~ console.log(json_infos[itemListLabel][item]);

						//sometimes the facility_type fields is empty...
						if(	json_infos[itemListLabel][item].hasOwnProperty('facility_type')){
							$(labelCol).append('<h3 class="row'+counter+'">'+json_infos[itemListLabel][item].facility_type.toUpperCase().replace(/_/g," ")+'</h3>');
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
				    $(labelCol).append('<h3 class="row'+counter+'">'+itemListLabel.toUpperCase()+'</h3>');
				    backboneFormEditorName=itemListLabel;
				    break;
				}
				
			    //CONTENT
                
			    this.formArray[counter]=new Backbone.Form({
					data: (json_infos[itemListLabel][item]), //Data to populate the form with
					schema:backboneJSONform[backboneFormEditorName]
					}).render();
					//~ schema: (this.getSchema(itemListLabel,json_infos[itemListLabel][item]))
					
			    var contentRow= $('<div class="content row'+counter+'" />');
			    var contentForm=$(this.formArray[counter].el);

			    $(contentCol).append(contentRow);
			    $(contentRow).append(contentForm);
			    
			    //add legend for financial item
			    if(itemListLabel=='financial' ){
				$(contentRow).prepend('<span style="display:block;color: red; font-weight:bold;maring:auto;text-align: center;">All the figures are displayed in thousand euros</span>');
				}
				


			    counter=counter+1;
			    }
			$(accordionHTML).append($(labelCol));
			$(accordionHTML).append($(contentCol));
			}
		   

		    return accordionHTML;
		    },
		    
		createPopUp:function(){ //pops up the colorbox popup. It can be used also to re-render the active popup
		    var self=this;
		    //popup box
		    $.colorbox({
			    html:self.popUpHTML(),//use the rendering function
			    transition: "elastic",
			    speed:400,
			    scrolling: true,
			    width: "850px",
			    height: "700px",
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
			      });

			     }
			});
		    
		    },
		    
 
		backboneFormEditor2JSON:function(editor){ //transforms the backbone-form editor to a json object
		    var returnJSON={};
		    //editor is a json obj
		    for (var key in editor){
			returnJSON[key]='';''
			}
		    return returnJSON;
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
		el:$("#RU-list"),
		events:{
			},
		initialize:function(){
			_.bindAll(this,  'addAll','addOne');
			ListOfRU.bind('reset', this.addAll);
			},
		addOne: function(ResearchUnit){
			var view = new RUView({model: ResearchUnit});
			$(this.el).prepend(view.render().el);
			},
		addAll: function(){
			$(this.el).empty();
			ListOfRU.each(this.addOne);
			//~ $.filtrify("RU-list", "placeHolder");
			}

		});

    // ** vista della toolbar del grafico
    window.statToolbarView=Backbone.View.extend({
		el:$("#graph-control-panel"),
		xAxisBtn:"#xselect",
		yAxisBtn:"#yselect",
		groupByBtn:"#groupselect",
		listEl:"#count-list",
		countResultEl: "#count-result",
		calcEl: "#calculate",
		financialDropDown:"li#financial-dropdown",
		fullListHTML:"",
		parentMcDropDownValue:"",// this is value of the "rel" parameter of the parent element of the selected item. Used to retrieve the document type the item belongs to, as defined in the backboneJSONform editor variable (in app_vars_and_helpers.js file)
		optionMcDropDownValue:"",//if you want to plot values of 'select' type, this parameter specify which option has to be calculated. You must add to the element a "option-to-plot" parameter specifying the optino to be plotted
		//~ McDropDownYUserValue:"", //actual Y value - user output
		McDropDownXUserValue:"", //actual X value - user output
		JSONstatResults:{}, //json object containing stat result
		initialize:function(){
			_.bindAll(this,  "render", "fullListPopUp");
			this.render(RUfacets);
			JSONstatResults={};
			var self=this;
			$(this.yAxisBtn).mcDropdown("#yselectmenu", {//USES MCdROPDOWN PLUGIN TO POPULATE SELECT-DROPBOXES
				delim:': ',
				select: function(value,name){
					if(!_.isUndefined(name)){
						if(name.indexOf(":")!=-1)
							self.McDropDownYUserValue=name.split(':')[1].slice(1);
						}

					self.parentMcDropDownValue=$("li:contains('"+self.McDropDownYUserValue+"')").parents('li').attr("rel");
					self.optionMcDropDownValue=$("#yselectmenu li[rel="+value+"]").attr("option-to-plot");
					//~ console.log("Y:",self.McDropDownYUserValue);
					//~ console.log("parent:",self.parentMcDropDownValue);
					//~ console.log(this.getValue);
					}
					
					
				});
			$(this.yAxisBtn).mcDropdown().setValue("default");
			
			$(this.xAxisBtn).mcDropdown("#xselectmenu", {//USES MCdROPDOWN PLUGIN TO POPULATE SELECT-DROPBOXES
				delim:': ',
				select: function(value,name){
					 self.McDropDownXUserValue=$("#xselectmenu li[rel="+value+"]").text();
					}
				});
			$(this.xAxisBtn).mcDropdown().setValue("default");
			},
		events:{
			"change #yselect":				"onYchange",
			"click #count-list"	:			"fullListPopUp",
			"click #calculate":				"goStat"
			},
		render:function(selectorVals){
			$(this.el).find(this.countResultEl).val("tot");
			var self=this;
			//remove financial menu if user is not logged in 
			$.couch.session({
				success: function(data) {
					if(_.isNull(data.userCtx.name)){
						$(self.financialDropDown).hide();
						}
					else {
						$(self.financialDropDown).show();
						}
					}
				});
			},
		onYchange:function(){
		
			},
		goStat:function(){
			
			//this function groups the results. The drawsimple function in GraphView just graphs the results getting JSONstatResults as input
			
			
			if(this.getYAxisBtnVal()=='default' || this.getXAxisBtnVal()=='default'){
				window.alert("Please select both X axis and Y axis value ");
				return null;
				}
				
			/*
			JSONstatResults is done like this:
			{
				GROUP1:{
						val1:[{'ri_name':'sdaklh', 'ritype':'dsalkjhg'}, {'ri_name':'sdaklh', 'ritype':'dsalkjhg'},...],
						val2:[{'ri_name':'sdaklh', 'ritype':'dsalkjhg'}, ...],
						val3:[...]
						},
				group2:{
						val2:[...],
						val4:[...]
						}.
				group3:[...]
			}*/
			
			this.JSONstatResults={};

				var self=this;
				var groupKey=self.getXAxisBtnVal();
				var riList= ListOfRU.pluck('ri_name');
				var queryParams={"keys":riList};
				var riResponseList=[];
				var ajaxURL= '_list/'+ self.parentMcDropDownValue+'/allfields_RIaskey';
				$.ajax({ 
					contentType: "application/json",
                    async: true, 
                    url: ajaxURL,
                    type:"POST",
                    data:JSON.stringify(queryParams),
                    dataType: 'json',
                    timeout:60000,
                    beforeSend:function(){
						self.trigger("startCalculating");
						},
					complete:function(){
						self.trigger("stopCalculating");
						},
                    success:function(response){
						riResponseList=response.rows;
						var groupVals=_.groupBy(riResponseList, function(obj){ //xAxis
								return obj["value"][groupKey]; 
									});
						self.JSONstatResults[groupKey]= groupVals;
						self.trigger("drawGraph"); //this event is handled by GraphView
						},
					error:function (xhr, ajaxOptions, thrownError){
								alert(" Server reported error "+ xhr.status+ ":"+thrownError);
							}
					});
			},
			
		fullListPopUp:function(){ //NOT IMPLEMENTED YET
			//~ convertme(this.JSONstatResults);
			//~ return;
			//~ var self=this;
			//~ var popupHTML=_.jsonreport(JSON.stringify(this.JSONstatResults));
			//~ window.open( "data:text/html;charset=utf-8," + popupHTML);

			},
		getYAxisBtnVal:function(){
			//~ console.log($(this.el).find(this.yAxisBtn).val());
			//~ console.log($(this.el).find(this.yAxisBtn).attr("option-to-plot"));
			//~ console.log($(this.el).find(this.yAxisBtn).attr("rel"));
			//~ console.log($(this.el).find(this.yAxisBtn).attr("value"));
			return $(this.el).find(this.yAxisBtn).val();//this.$(this.el).find(this.yAxisBtn).val();
			},
		getXAxisBtnVal:function(){
			return $(this.el).find(this.xAxisBtn).val(); // this.$(this.el).find(this.xAxisBtn).val();
			},
		getGroupByBtnVal:function(){
			return this.$(this.el).find(this.groupByBtn).val();
			},
		getCntBoxVal:function(){
			return parseInt($(this.el).find(this.countResultEl).val());
			},
		getJSONstatResults:function(){
			return this.JSONstatResults;
			},
		setCntBoxVal:function(cntVal){
			$(this.el).find(this.countResultEl).val(cntVal);
			$(this.el).find(this.countResultEl).css({color:("#"+((1<<24)*Math.random()|0).toString(16))});
			}
		});

	graphToolbar=new statToolbarView();
	
	// ** vista del grafico con le statistiche
	window.GraphView=  Backbone.View.extend({
		el:$('#stat-box'),
		graphEl:$('#graph'),
		initialize: function(){
			_.bindAll(this, "draw", "startCalc","stopCalc");
			graphToolbar.bind('drawGraph', this.draw);
			graphToolbar.bind('startCalculating', this.startCalc);
			graphToolbar.bind('stopCalculating', this.stopCalc);
			var self= this;
			Highcharts.setOptions({
			   lang: {
				   FullScreenButtonTitle: 'View full Size',
				 }
			});
			this.chartOptions = {
				series: [
				    {
						name: 'example',
						data: [83.6, 78.8, 98.5, 93.4, 106.0]
					}],
				chart: {
						renderTo: self.graphEl.selector.slice(1,self.graphEl.selector.length),//need to remove first char '#'
						type: 'column'
					},
				loading: {
						hideDuration: 1000,
						showDuration: 1000,
						labelStyle: {
								fontWeight: 'bold',
								'font-size': '2.5em',
								color:"#CF2020"
							},
						style: {
								background: "url('img/loading/loading-gif-animation-small-02.gif') no-repeat center"
							}
					},
				title: {
					text: 'EPOS STATS - EXAMPLE'
				},
				xAxis: {
					categories: [
						'europe', 
						'united states', 
						'africa', 
						'oceania', 
						'asia', 

					],
					labels:{
						rotation:-45,
						align:'right',
						//~ y: 25,
						x:5,
						style:{
							font: 'normal 13px Verdana, sans-serif',
							fontWeight:'bold'
							},
						
						formatter: function() {
							var returnValue= this.value.charAt(0).toUpperCase() + this.value.slice(1);
							returnValue = returnValue.replace('_',' ');
							return returnValue;
							}
						},
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Quantity'
					}
				},
				legend: {
					layout: 'horizontal',
					backgroundColor: '#FFFFFF',
					align: 'right',
					verticalAlign: 'top',
					x: -75,
					y: 20,
					floating: true,
					shadow: true,
					enabled: false
				},
				tooltip: {
					formatter: function() {
						return ''+
							this.x +': '+ this.y ;
					}
				},
				credits:{
					enabled:false
					},
				plotOptions: {
					column: {
						stacking:null,
						pointPadding: 0.2,
						borderWidth: 0, 
						dataLabels:{
							enabled:true,

							formatter: function() {
								return this.y;
								}
							}
						}
					},
				exporting: {
						buttons: {
							//~ popUpBtn: {
								//~ enabled:false,
								//~ symbol: 'square',
								//~ _titleKey: 'FullScreenButtonTitle',
								//~ x: -60,
								//~ symbolSize:18,
								//~ symbolFill: '#B5C9DF',
								//~ hoverSymbolFill: '#779ABF',
								//~ onclick: function () {
									//~ generalPurposeGlobalVar = this;
									//~ var win=window.open('./chartpopup.html','Full Size Chart','location=0,titlebar=0,status=0,width=780,height=650');
//~ 
								//~ }
							//~ },
							exportButton: {//add export to CSV functionality
								menuItems:[{
									text: 'Download CSV',
									onclick: function () {
										Highcharts.post('http://www.epos-eu.org/assets/components/RIDE/csv.php', {
											csv: this.getCSV()
										});
									}
								}],
								enabled: true
							},
							printButton: {
								enabled: true
							}

						}
					},
				 labels: {
					items : [{
						html : '',
						style : {
							left : '0px',
							align:'center',
							top : '-15px',
							fontSize : '15px',
							color: '#A52A2A',
							fontWeight:'bold',
						}
					}]
				}

				};
			this.highChart=new Highcharts.Chart(this.chartOptions);
			
			
			
			},
		hide:function(){
			$(this.el).hide(600);
			},
		show:function(){
			$(this.el).show(600);
			},
		startCalc:function(){
			this.highChart.showLoading("...loading data...");
			},
		stopCalc:function(){
			this.highChart.hideLoading();
			},
		draw:function(){
			//it first creates a serie with createSerie
			//then draws it with drawSerie
			
			//~ groupby has been removed!!!!
			//~ if (graphToolbar.getGroupByBtnVal()!='default')
				//~ this.drawGroupBy();
			//~ else 
			var series=graphToolbar.getJSONstatResults();
			//~ console.log(series[graphToolbar.getXAxisBtnVal()]);
			//~ console.log(series[graphToolbar.getXAxisBtnVal()],graphToolbar.getYAxisBtnVal());
			var serieToDraw= this.createSerie(series[graphToolbar.getXAxisBtnVal()],graphToolbar.getYAxisBtnVal());
			//~ console.log(serieToDraw);
			this.drawSerie(serieToDraw.categories, serieToDraw.serie);
			},
			
			
		createSerie: function (groupedResults,yValue){ //returns an xAxis object and a serie object (see highcharts.com)
		// "STANDARD" STATS ARE DONE AT RIDE LEVEL 2 (FACILITIES). To perform level 3 stats (e.g. number of orpheus stations)
			var self=this;
			var seriesArray=[];
			var categoryArray=[];
			
			//serie object for highcharts
			var serieJSON={	name:yValue,
							data:zeros([countAttr(groupedResults)])
							};
			
			//~  different type of sums according to type of the elment, as defined in backboneJSONform global var
			//~ console.log(backboneJSONform[graphToolbar.parentMcDropDownValue], graphToolbar.parentMcDropDownValue);
			//~ console.log('opt',graphToolbar.optionMcDropDownValue);
			//~ console.log('bbval',backboneJSONform[graphToolbar.parentMcDropDownValue]);
			//~ console.log('formtype',graphToolbar.parentMcDropDownValue);
			
			
			 var sumType =backboneJSONform[graphToolbar.parentMcDropDownValue][yValue]['type'];
			
			//cycle
			
			//before processing graph vals, I transform the groupedResult obj to an array of arrays  like [[key1,val1], [key2,val2]], in oreder to maintain order in the _.each cycle, which is not guaranteed with objects.
			var sortedGroupedResults=[];
			for (var myElement in groupedResults){
				sortedGroupedResults.push([myElement,groupedResults[myElement]]);
				}
			sortedGroupedResults.sort(function(a, b) {
				if (a[0]<b[0]) return -1;
				if (a[0]>b[0]) return 1;
				return 0;
				});
			
			_.each(sortedGroupedResults,function(elValue, elIndex, elList){ //xAxis, iterates thorugh x axis categories
				var catKey=elValue[0];
				var catValue=elValue[1];
				
				//this is the 'categories' array for highcharts
				categoryArray.push(catKey);
				var tempObj=new Object();
				
				//performs sum
				_.each(catValue,function(elemValue, elemKey,elemList){ //iterates through elems of category
					var tempKey=elemValue['value'][yValue];
					//~ console.log(tempKey);
					if(!_.isUndefined(tempKey) && !_.isNull(tempKey)){
						
						//TEXT  TYPES: put every value as key of an object with value 1, like {ingv:1, geofon:1}, then sums the values
						 if (sumType=='Text'|| sumType=='select' ){
							 if (!tempObj.hasOwnProperty(tempKey)){
								 tempObj[tempKey]=1;
								 serieJSON.data[elIndex]=serieJSON.data[elIndex]+1;
								 }
							 }
						
						//LIST TYPES: count the number of elements for each list
						if (sumType=='List'){
							serieJSON.data[elIndex]=serieJSON.data[elIndex]+tempKey.length;
							}
						
						//NUMBER TYPES: simply sums the numbers
						if (sumType=='Number'){
							var addValue= (_.isNumber(tempKey))? (tempKey): 0;
							 serieJSON.data[elIndex]=serieJSON.data[elIndex]+addValue;
							}
						

						}
					});
				
					//rounds the number in case there are decimal places
					serieJSON.data[elIndex]=Math.floor(serieJSON.data[elIndex]);
					
					//~ serieJSON.data[counter]=sumAttrVal(tempObj); //sumAttrVal documented in app_vars_and_helpers.js
					delete tempObj;
				});
			
			//~ console.log({categories:{categories:categoryArray}, serie:serieJSON});
			
			return({categories:{categories:this.shorten(categoryArray,12)}, serie:serieJSON} );  
			
			//convert json to array
			//~ for (var key in serieJSON){
				//~ if (serieJSON.hasOwnProperty(key)){
					//~ seriesArray.push(serieJSON[key]);
					//~ }
				//~ }
			},
		shorten:function(myarray, nChar){//cuts all the elements of an array of strings which exceed the "nchar" character
			for (var element in myarray){
				myarray[element]=myarray[element].replace("University of ","Un. of ").substr(0,nChar);
				//~ myarray[element]=myarray[element].slice(0, Math.round(nChar/2)) + "<br>" + myarray[element].slice(Math.round(nChar/2) +1);
				}
			return myarray;
			},
		drawSerie:function(categoryArray, serieJSON){
			//~ console.log(categoryArray, serieJSON);
			//~  Init graph
			//~ this.highChart.destroy();
			var textVal=graphToolbar.McDropDownYUserValue;
			this.chartOptions.xAxis.categories=categoryArray.categories;
			this.chartOptions.tooltip= {
											formatter: function() {
												return graphToolbar.McDropDownXUserValue+": "+ '<b>'+this.x +'</b><br/>'+
													textVal +'<b>: '+ this.y +'</b><br/>';
											}
										};
			this.chartOptions.yAxis= {
							min: 0,
							title: {
								text: textVal,
								style: {
									fontSize: '18px'
								}
							}
						};
						
						
			var titleText= graphToolbar.McDropDownYUserValue + " per " + graphToolbar.McDropDownXUserValue;
			
			this.chartOptions.title= {
					text: titleText
					};
			this.chartOptions.series=[serieJSON];
			

			//~ var Xitems=JSON.stringify(mergeArrays(makeArrayOf(graphToolbar.McDropDownXUserValue, categoryArray.categories.length),categoryArray.categories));
			//~ 
			//~ var Yitems=JSON.stringify(mergeArrays(makeArrayOf(graphToolbar.McDropDownYUserValue, serieJSON.data.length),serieJSON.data));
			//~ 
			//~ var JSONtoConvert=mergeObjArrays(JSON.parse(Xitems), JSON.parse(Yitems));
			
			//~ this.chartOptions.exporting.buttons.exportButton={
                    //~ menuItems: [{},
                    //~ {},
                    //~ {},
                    //~ {}, /* leave standard buttons */
                    //~ {
                        //~ text: 'Download CSV Data',
                        //~ onclick: function() {
							//~ 
							//~ var returndata=ConvertToCSV(JSONtoConvert);
							//~ var data=$("#mydata");
							//~ $("body").append($(data));
							//~ $(data).append(returndata);
							//console.log($(data), returndata);
							//~ $(data).download();
							//~ $(data).remove();
                        //~ 
                        //~ }
                        //~ 
                    //~ }]
                //~ }
			
			this.chartOptions.labels.items[0].html= "Total: "+sumAttrVal(serieJSON.data);
			
			this.highChart.destroy();
			this.highChart=new Highcharts.Chart(this.chartOptions);
			this.highChart.redraw();
			}
	});
	
	// ** view del numerello  che indica quate items sono visualizzate
	window.TotalView = Backbone.View.extend({
		el: $("#total-items"), 
		initialize: function(){
			_.bindAll(this, 'updateTotal');
			ListOfRU.bind('reset', this.updateTotal);
			},
		updateTotal: function(){
			$(this.el).html(' <span class="number" >'+(ListOfRU.length)+ "</span> Research Infrastructures listed");
			},
		
		});
		
		
	// ** view delle informazioni statistiche relative ad EPOS
	window.EPOSinfoView = Backbone.View.extend({
		el: $("#epos-info-box"), 
		initialize: function(){
			this.updateTotal();
			},
		updateTotal: function(){
            var textList=[];
            textList[0]="EPOS is: "+getJSONData(QUERYnumberOfRI).rows[0].value+ " Research Infrastructures";
            textList[1]="EPOS is:  "+getJSONData(QUERYnumberOfCountries).rows.length+ " Countries";
			textList[2]="EPOS is:  "+getJSONData(QUERYnumberOfInstitutions).rows.length+ " Institutions";
			textList[3]="EPOS is:  "+getJSONData(QUERYnumberOfLabs).rows[0].value+ " Laboratories";
			textList[4]="EPOS is:  "+getJSONData(QUERYnumberOfTotalStations).rows[0].value+ " Seismic and GPS Stations/Benchmarks";
			
			var options = {
				duration: 1500,          // Time (ms) each blurb will remain on screen
				rearrangeDuration: 700, // Time (ms) a character takes to reach its position
				effect: 'random',        // Animation effect the characters use to appear
				centered: true           // Centers the text relative to its container
			  }
			//~ $(this.el).lettering('words');
			$(this.el).textualizer(textList, options);
			$(this.el).textualizer('start');
			
			
				
			},
		
		});
		
	// ** view for visualsearch box
	//~ window.VSview = Backbone.View.extend({
		//~ initialize: function(){
			//~ _.bindAll(this, "searchOnEnter");
			//~ this.VSobject=visualSearch;
			//~ this.id=visualSearch.searchBox.id;
			//~ this.VSobject.searchQuery.bind('reset',this.searchOnEnter);
			//ListOfRU.fetch();
			//~ },
		//~ searchOnEnter:function(){
			//~ ListOfRU.filter_results();
			//~ },
		//~ });

    // ** vista del map-box
    window.mapBox = Backbone.View.extend({
        el: $("#map-box"),
        mapEl:$("#RImap"),
        ctrlPanelEl:$('#map-control-panel'),
        initialize:function(){
			_.bindAll(this,  'showRIsOnMap','clearMarkers');
			ListOfRU.bind('reset', this.showRIsOnMap);
            this.fullScreen=false; //by default the window is not fullscreen
            this.markersArray = [];
            var mapDiv = document.getElementById($(this.mapEl).attr('id'));
			
			// Create an array of styles.
			  var simpleMapsStyles = [
			  {
				featureType: "transit.line",
				elementType: "labels",
				stylers: [
				  { visibility: "off" }
				]
			  },{
			  },{
				featureType: "administrative.land_parcel",
				stylers: [
				  { visibility: "off" }
				]
			  },{
				featureType: "administrative.province",
				stylers: [
				  { visibility: "off" }
				]
			  },{
				featureType: "administrative.neighborhood",
				stylers: [
				  { visibility: "off" }
				]
			  },{
				featureType: "road.highway.controlled_access",
				elementType: "labels",
				stylers: [
				  { visibility: "off" }
				]
			  },{
				featureType: "road",
				stylers: [
				  { visibility: "off" }
				]
			  },{
			  }
			];
			
			var simpleMapType = new google.maps.StyledMapType(simpleMapsStyles,
					{name: "Simple"});
					
			// Create a map object, and include the MapTypeId to add
			  // to the map type control.
			  var mapOptions = {
				zoom: 2,
				center: new google.maps.LatLng( 47.7732,  11.7773), //eu center coords
				mapTypeControlOptions: {
				  mapTypeIds: [google.maps.MapTypeId.HYBRID, 'simple_map']
				}
			  };
			
            this.map = new google.maps.Map(mapDiv, mapOptions);
            
            //Associate the styled map with the MapTypeId and set it to display.
			  this.map.mapTypes.set('simple_map', simpleMapType);
			  this.map.setMapTypeId(google.maps.MapTypeId.HYBRID);
            },
        clearMarkers:function() {
              if (this.markersArray) {
                for (i in this.markersArray) {
                  this.markersArray[i].setMap(null);
                }
              }
            },

        events:{
            "click #show-on-map-button"    :    "showRIsOnMap",
            "click #full-screen-map"       :  "toggleFullScreen"
            },
        hide:function(){
			$(this.el).hide(600);
			},
		show:function(){
			$(this.el).show(600);
			},
            
        toggleFullScreen:function(){
            if (this.fullScreen==false){
                this.fullScreen= true;
                this.originalCSS=({
                    'width': $(this.el).css('width'),
                    'height':$(this.el).css('height'),
                    'overflow':$(this.el).css('overflow'), 
                    'position':$(this.el).css('position'),
                    'top':$(this.el).css('top'),
                    'left':$(this.el).css('left'),
                    'z-index':$(this.el).css('z-index')
                 });
                //~ console.log(this.originalCSS);
                $(this.el).css({
                    'width':$(window).width(),
                    'height':$(window).height(),
                    'overflow':'visilble', 
                    'position':'fixed',
                    'top':'0px',
                    'left':'0px',
                    'z-index':'100000000'
                    });
                }
            else{
                this.fullScreen= false;
                $(this.el).css(this.originalCSS);
                }
            },
            
        showRIsOnMap:function(){
			var self=this;
            var riList= ListOfRU.pluck("ri_name");
            var queryParams={"keys":riList};
            
            //~ repeat the query N-times each time for any wg/query
            var couchDBqueries=[labCoordsView,netStationsCoordsView,GPSCoordsView, genericStationCoordsView, geomagneticCoordsView];
            
            var pb =  new progressBar({	height:       '2.3em',
										width:        '250px',
										top:          '50px',
										right:        '25px',
										colorBar:     '#F8F946',
										background:   '#FFF',
										fontFamily:   'Arial, sans-serif',
										fontSize:     '14px'
										});
            
            this.clearMarkers();
            var infowindow = null;
            for (var couchQuery in couchDBqueries){
				//~ waitMarker.setMap(self.map);
                $.ajax({ //retrieve and show on map LABORATORY coordinates
					contentType: "application/json",
                    async: true, 
                    url: couchDBqueries[couchQuery],
                    type:"POST",
                    data:JSON.stringify(queryParams),
                    dataType: 'json',
                    timeout:60000,
                    complete:function(jqXHR, textStatus){
						if(textStatus=="timeout" || textStatus=="abort"){
							pb.hide();
							}
						},
                    success: function(response){
						self.map.controls[google.maps.ControlPosition.RIGHT].push(pb.getDiv());
                       dataArray = response;
                       pb.start(dataArray.rows.length);
                       var geocoder = new google.maps.Geocoder();
                       var address="";
                       var i=0;
           
                       
                       _.each(dataArray.rows,function(Elem){
                           var myLatlng = new google.maps.LatLng(Elem.value[0],Elem.value[1]); //see the coordsView couchdb view (app_vars_and_helpers.js file) to understand which are the elems of the array 
                           
                           
                           
                           //updates the total number of markers (if it's not going to plot one because it's in the center)
                           if(myLatlng.lat==0 || myLatlng.lng()==0){
							   var tot= (pb.getTotal()-1);
							   pb.setTotal(tot);
							   }
							   
							   
                           //check if it is not in the origin (0,0) which usually means unexisting coords
                           if(myLatlng.lat!=0 && myLatlng.lng()!=0){
                                var myicon='img/'+Elem.value[3]+'-icon.png';
                                
                                setTimeout(function() { 
									var marker= new google.maps.Marker({
                                        map: self.map,
                                        position: myLatlng,
                                        icon:myicon,
                                        //~ animation: google.maps.Animation.DROP,
                                        flat: false
                                    });
									self.markersArray.push(marker);
									pb.updateBar(1);
									var tooltip=Elem.value[2];
									
									google.maps.event.addListener(marker, 'click', function() {
										if (infowindow) {
												infowindow.close();
											}
										infowindow = new google.maps.InfoWindow({
											content: tooltip
											});
										infowindow.open(self.map,marker);
										});
                                    if(pb.getCurrent()>(pb.getTotal()-1)){
										pb.hide();
										}
									},i * 1);

                               }
                               i=i+1;
                            });
                        },
                    error:function(response){
                        alert("Connection Error: some stations could be missing. Try reloading the page.");
                        }
                        });
                }
            
            this.unOverlapMrkrs();
            
            //~ this.clusterizeMrkrs();
            
            },
            
        unOverlapMrkrs:function(){ //if SOME markers are superposed, move it randomly of some cents of degree
            //sort markers array
            this.markersArray=_.sortBy(this.markersArray, function(marker){
                marker.getPosition().lat();
                }); 
            
            //if 2 markers have the same lat, then add a random 
            var previousMarkerPosition= new google.maps.LatLng(0, 0);
            _.each(this.markersArray, function(marker){
                    var actualMarkerPosition=marker.getPosition();
                    if (actualMarkerPosition.lat()==previousMarkerPosition.lat()){
                        var newLat=actualMarkerPosition.lat()+(Math.random()*0.001);
                        var newLong=actualMarkerPosition.lng()+(Math.random()*0.001);
                        var newLatlng = new google.maps.LatLng(newLat, newLong);
                        marker.setPosition(newLatlng);
                        }
                    previousMarkerPosition=actualMarkerPosition;
                });
             return true;
            },
            
        clusterizeMrkrs:function(){
            var mcOptions = {gridSize: 1, maxZoom: 15, imagePath:'img/transparent02-icon.png', styles:[{
                url: 'img/transparent02-icon.png',
                height: 15,
                width: 15,
                textColor: '#000000'
              }]};
            var markerCluster = new MarkerClusterer(this.map, this.markersArray,mcOptions );
            },
        });
        
     //vista della navbar 1 per la navigazione sito
     window.navigationBar=  Backbone.View.extend({
		 el:$('#nav1.navigare ul li a.ajax'),
		 initialize:function(){
			 $(this.el).colorbox({
				 transition: "elastic",
			    speed:400,
			    width: "850px",
			    height: "700px"
				 });
			 }
		 });
        
	//// ** vista top level
	window.AppView = Backbone.View.extend({
		el: $("#wholepage"),
		events:{
			"change #item-orderby select"	:		"orderBy",
			"click #item-orderby img"	:			"orderBy",
			"click #bottone"	:					"raggruppa",
			'click .navigare ul li a[href="#map"]':				"showMap",
			'click .navigare ul li a[href="#stat"]':				"showStat"
			},
		initialize: function(){
			this.statChartHelpDiv=$("#stat-box-instructions");
			this.RUlistView= new itemList();
			this.filterView= new facetListView();
			this.total= new TotalView();
			//~ this.searchBox= new VSview(); //remove visual search
			this.statChart=new GraphView();
			this.DBloginView= new loginView();
			this.DBloginView.bind('loginChange', graphToolbar.render);
            this.eposGoogleMap=new mapBox();
            this.EPOSinfobox= new EPOSinfoView();
            this.navigationBar=new navigationBar();
            //map is shown by default
            
            this.showMap();
            

			},
		orderBy:function(){
			ListOfRU.orderBy($(this.el).find("#item-orderby select").val());
			},
		raggruppa:function(){
			this.statChart.groupByValue('country');
			},
		showMap:function(){
			this.eposGoogleMap.show();
			this.statChart.hide();
			$(this.statChartHelpDiv).hide();
			},
		showStat:function(){
			this.eposGoogleMap.hide();
			this.statChart.show();
			$(this.statChartHelpDiv).show();
			$("#stat-box-instructions").css('visibility','visible');
			
			}
	});
	window.App = new AppView;
});
