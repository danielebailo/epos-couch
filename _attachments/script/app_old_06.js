$(function(){
	
	//SOME GLOBALS	
	//tooltip for filtering
	var api=$("#filter-tooltip").simpletip({
		 // Configuration properties 
		 persistent:true,
		 focus:true,
		 //~ fixed: false,
		 showEffect: 'fade',
		 hideEffect: 'slide',
		 position: 'bottom',
		 showtime:600,
		 offset:[250,-50],
		}).simpletip();
    
    api.load('filter-tip.html');


	var parentAccordion=null;
	var nestedAccordion=null;
	var loggedIn=false; //this var is handled in the login view
	
	
	

	
	//adds the 'searchType' option to search, to perform searches with logical AND OR operators
	RUfacets.push('searchType');
	RUvalueMatches['searchType']=[['AND','OR']];
	
	
	//Visual Search object
	var visualSearch = VS.init({
          container  : $('#search_box_container'),
          query      : 'country:click-to-select  ',
          unquotable : [],
          callbacks  : {
            search : function(query, searchCollection) {
              var $query = $('#search_query');
              var count  = searchCollection.size();
              $query.stop().animate({opacity : 1}, {duration: 300, queue: false});
              //~ $query.html('<span class="raquo">&raquo;</span> You searched for: ' +
                          //~ '<b>' + (query || '<i>nothing</i>') + '</b>. ' +
                          //~ '(' + count + ' filter' + (count==1 ? '' : 's') + ')');
              clearTimeout(window.queryHideDelay);
              window.queryHideDelay = setTimeout(function() {
                $query.animate({
                  opacity : 0
                }, {
                  duration: 1000,
                  queue: false
                });
              }, 2000);
            },
            facetMatches : function(callback) {
              callback(RUfacets);
            },
            valueMatches : function(facet, searchTerm, callback) {
				for(RUfacet in RUfacets){
					if(RUfacets[RUfacet] == facet){
						callback(RUvalueMatches[facet][0]);
						break;
						}
					}
            }
          }
        
        });




	
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
			return {
				ri_name: 		"blank name",
				type_of_ri:		"generic type",
				};
			},
            
        recursiveGet: function(searchKey, Obj){
            var self=this;
            var retVal = [];
            for (var key in  Obj){

                //passo n: array
                if(_.isArray(Obj[key])){
                    for (var Elem in Obj[key]){
                        var myvalue = self.recursiveGet(searchKey, Obj[key][Elem]);
                        retVal=_.union(retVal,myvalue);
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
					},
				error: function(){
					//~ console.log("error");
					},
				});
			},

            
		filter_results: function(){
			//filter the list according to facets
			var myRUlist=this.serverData.models;
			var facets = visualSearch.searchQuery.models;
			var returnList=myRUlist;
			
			var categroyFct= _.find(facets, function(faccetta){	
								return faccetta.get('category')=='searchType'});
			
			//~ console.log(categroyFct);
			if (facets.length >0){
				if ( !$.isEmptyObject(categroyFct) && (categroyFct.get('value'))=='OR'){//logical operator is OR, and 


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
				else{								//logical operator is AND ( default)
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
			var self=this;
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
					$(self.el).append('  - <a href="profile.html" > Edit RIs</a>');
					loggedIn=true;//global var!!!!!
					self.trigger("loginChange");
				}, 
				loggedOut : function() {
					loggedIn=false
					self.trigger("loginChange");
					}
				});
			}
	});
	
	
	
	// ** view della singola ru nella lista
	window.RUView = Backbone.View.extend({
		tagName: 'li',
		events:{
			"click"				:"showInfo",
			},
		initialize: function(){
		    _.bindAll(this, "showInfo","renderIMG","addIMGlnk","purgeJSONkeys");
		    this.formArray=new Array();
		    },
		JSONri:{}, //a json object representing the RI with all its items. See the list connected to the global var "JSONriDescription" to understand how is it done
		RIrow:0,//var to store the row of the RI, so later focus is on RI label
		formArray:null, //this array contains the forms (one for each doc) to be saved when updating an RI
		render: function(){
			$(this.el).append("<span class=RUitem>"+this.renderIMG()+"<i>"+this.model.get('ri_name')+"</i>"+" - WG "+this.model.get('wg_main')+"</span>");
			return this;
			},
		addIMGlnk:function(imgName, text, imgId){
		    return ('<a href="javascript:"> <img src="img/'+imgName+'" style="display:inline;vertical-align:middle;float:right;" alt="'+text+'" id="'+imgId+'">  </a>');
		    },
		renderIMG: function(){
		    return ('<img src="img/'+this.model.get('country')+'_flag.gif" width="25px">  ');
		    },
		    
		
		showInfo:function(){
		    //get items with the same riname
		    this.JSONri = getJSONData(JSONriDescription+'?key="'+this.model.get('ri_name')+'"');
		    
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
			    switch(itemListLabel){// itemlist label is given in lowercase by the list function!
				case "ri":
				    $(labelCol).prepend('<h3 class="row'+counter+'">RI General Info</h3>');
				    this.RIrow=counter;
				    backboneFormEditorName='ri';
				    break;
				case "facility":
				    if (json_infos[itemListLabel][item].facility_type=='laboratory'){
					$(labelCol).append('<h3 class="row'+counter+'">'+json_infos[itemListLabel][item].facility_type.toUpperCase()+':'+json_infos[itemListLabel][item].laboratory_name+'</h3>');
					}
				    else{
					$(labelCol).append('<h3 class="row'+counter+'">'+json_infos[itemListLabel][item].facility_type.toUpperCase()+'</h3>');
					}

				    backboneFormEditorName=json_infos[itemListLabel][item].facility_type;
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
				//~ $(document.body).append('<div id="loadimage"> <img  src="img/loading/updating-animated.gif" ></div>');
				//~ $('#loadimage').css('position','fixed').css('top','30%').css('left','40%').css('border-style','solid').css('border-width','1px');
				//~ window.setTimeout("$('#loadimage').remove()",2000);
				//~ ListOfRU.fetch({
				    //~ success:function(){
					//~ ListOfRU.serverData.reset(ListOfRU.models);
					//~ ListOfRU.filter_results();
					//~ }
				    //~ });
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
			},
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
		parentMcDropDownValue:"",// this is the rel parent value of a selected item. Used to retrieve the document type the item belongs to, as defined in the backboneJSONform editor variable (in app_vars_and_helpers.js file)
		JSONstatResults:{}, //json object containing stat result
		initialize:function(){
			_.bindAll(this,  "render", "fullListPopUp");
			this.render(RUfacets);
			JSONstatResults={};
			var self=this;
			$(this.yAxisBtn).mcDropdown("#yselectmenu", {
				delim:': ',
				select: function(value,name){
					console.log
					 self.parentMcDropDownValue=$("[rel="+value+"]").parents('li').attr("rel");
					}
				});//USES MCdROPDOWN PLUGIN TO POPULATE SELECT-DROPBOXES
			$(this.yAxisBtn).mcDropdown().setValue("default");
			$(this.xAxisBtn).mcDropdown("#xselectmenu", {delim:': '});//USES MCdROPDOWN PLUGIN TO POPULATE SELECT-DROPBOXES
			$(this.xAxisBtn).mcDropdown().setValue("default");
			//~ $(this.groupByBtn).mcDropdown("#groupselectmenu", {delim:': '});//USES MCdROPDOWN PLUGIN TO POPULATE SELECT-DROPBOXES
			//~ $(this.groupByBtn).mcDropdown().setValue("default");
			},
		events:{
			"change #xselect":				"onXchange",
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
			//***** NB GROUPBY NOT IN USE *******
			//~ more difficult case: groupby is selected 
			//~ if (this.getGroupByBtnVal()!='default'){
				//~ var self=this;
				//~ var xAxisParam=self.getXAxisBtnVal();
				//~ var groupByParam=self.getGroupByBtnVal()
				//~ var groupVals=_.groupBy(ListOfRU.models, function(obj){ //groupBy
									//~ return obj.get(groupByParam); 
									//~ });
//~ 
				//~ _.each(groupVals,function(value, key,list){
					//~ self.JSONstatResults[key] = _.groupBy(value, function(ogg){
							//~ return ogg.get(xAxisParam);
							//~ });
						//~ }
					//~ );
				//~ }
				//~ 
			//~ else{
				//~ simple case: groupby not selected
				var self=this;
				var groupKey=self.getXAxisBtnVal();
				var groupVals=_.groupBy(ListOfRU.models, function(obj){ //xAxis
									return obj.get(self.getXAxisBtnVal()); 
									});
				this.JSONstatResults[groupKey]= groupVals;
				//~ }

			//ok, now graph the results
			//~ console.log(this.JSONstatResults);
			this.trigger("pushbtn"); //this event is handled by GraphView
			},
			
		onXchange:function(){
			},
			
		fullListPopUp:function(){ //NOT IMPLEMENTED YET
			//~ convertme(this.JSONstatResults);
			//~ return;
			//~ var self=this;
			//~ var popupHTML=_.jsonreport(JSON.stringify(this.JSONstatResults));
			//~ window.open( "data:text/html;charset=utf-8," + popupHTML);

			},
		getYAxisBtnVal:function(){
			return this.$(this.el).find(this.yAxisBtn).val();
			},
		getXAxisBtnVal:function(){
			return this.$(this.el).find(this.xAxisBtn).val();
			},
		//~ getXcategoryBtnVal:function(){
			//~ 
			//~ },
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
			},
		});

	graphToolbar=new statToolbarView();
	
	// ** vista del grafico con le statistiche
	window.GraphView=  Backbone.View.extend({
		el:$('#stat-box'),
		graphEl:$('#graph'),
		initialize: function(){
			_.bindAll(this, "draw");
			graphToolbar.bind('pushbtn', this.draw);
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
				title: {
					text: 'EPOS STATS'
				},
				xAxis: {
					categories: [
						'eu', 
						'us', 
						'afr', 
						'oc', 
						'asi', 

					],
					labels:{
						rotation:-45,
						align:'right',
						//~ y: 25,
						x:-20,
						style:{
							font: 'normal 13px Verdana, sans-serif',
							fontWeight:'bold'}
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
					shadow: true
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
							popUpBtn: {
								enabled:false,
								symbol: 'square',
								_titleKey: 'FullScreenButtonTitle',
								x: -60,
								symbolSize:18,
								symbolFill: '#B5C9DF',
								hoverSymbolFill: '#779ABF',
								onclick: function () {
									generalPurposeGlobalVar = this;
									var win=window.open('./chartpopup.html','Full Size Chart','location=0,titlebar=0,status=0,width=780,height=650');

								}
							},
							exportButton: {
								enabled: true
							},
							printButton: {
								enabled: true
							}

						}
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
		draw:function(){
			
			//~ groupby has been removed!!!!
			//~ if (graphToolbar.getGroupByBtnVal()!='default')
				//~ this.drawGroupBy();
			//~ else 
			var series=graphToolbar.getJSONstatResults();
			var serieToDraw= this.createSerie(series[graphToolbar.getXAxisBtnVal()],graphToolbar.getYAxisBtnVal())
			
			this.drawSerie(serieToDraw.categories, serieToDraw.serie);
			//~ console.log(series[graphToolbar.getXAxisBtnVal()]);
			//~ this.drawSimple2();
			},
			
			
		createSerie: function (groupedResults,yValue){ //returns an xAxis object and an serie object (see highcharts.com)
			var self=this;
			var seriesArray=[];
			var categoryArray=[];
			var counter=0;			
						
			//this is the 'categories' array for highcharts
			for(var key in groupedResults) {
				categoryArray.push(key);
				}
			
			//serie object for highcharts
			var serieJSON={	name:yValue,
								data:zeros([categoryArray.length])
								};
			
			//~  different type of sums according to type of the elment, as defined in backboneJSONform global var
			 var sumType =backboneJSONform[graphToolbar.parentMcDropDownValue][yValue]['type'];
			
			//cycle
			_.each(groupedResults,function(catValue, catKey, catList){ //xAxis, iterates thorugh x axis categories
					var tempObj=new Object();
					//performs sum
					_.each(catValue,function(elemValue, elemKey,elemList){ //iterates through elems of category
						 if (sumType=='Text' || sumType=='Select'){//TEXT TYPES
							 var tempKey=elemValue['attributes'][yValue];
							 if (!tempObj.hasOwnProperty(tempKey)){
								 tempObj[tempKey]=1;
								 }
							 }
						if (sumType=='Number' || sumType=='Select'){
							
							}
						});
					serieJSON.data[counter]=sumAttrVal(tempObj); //sumAttrVal documented in app_vars_and_helpers.js
					delete tempObj;
					++counter;
				});
			
			console.log({categories:{categories:categoryArray}, serie:serieJSON});
			
			return({categories:{categories:categoryArray}, serie:serieJSON} );  
			
			//convert json to array
			for (var key in serieJSON){
				if (serieJSON.hasOwnProperty(key)){
					seriesArray.push(serieJSON[key]);
				}
			}
			
			
			},
		
		drawSerie:function(categoryArray, serieJSON){
			console.log(categoryArray, serieJSON);
			//~  Init graph
			//~ this.highChart.destroy();
			this.chartOptions.xAxis.categories=categoryArray.categories;
			this.chartOptions.tooltip= {
											formatter: function() {
												return '<b>'+ this.x +'</b><br/>'+
													this.series.name +': '+ this.y +'<br/>';
											}
										};
			this.chartOptions.series=[serieJSON];
			this.highChart=new Highcharts.Chart(this.chartOptions);
			this.highChart.redraw();
			},

		drawSimple: function(){ //draw function for non groupedBy graphs

			var groupByVal=graphToolbar.getXAxisBtnVal();
			var field=graphToolbar.getYAxisBtnVal();
			var typeObject= fieldTypeList(backboneJSONform);
			var groupObj={};
			var mygroups=[];
			var self=this;
			
			
			//graph stuff
			var groupObj= _.groupBy(ListOfRU.models, function(obj){
					return obj.get(groupByVal); 
					});
			var groups=(_.map(groupObj,function(value, key, list){
				return key;
			}));
			$.each(groups,function(index, value){ mygroups[index]= groups[index].split('_').join(' ')});
			
			//some ops on the chart	
			this.chartOptions.series=[{name:field.split('_').join('\n')}];
			this.highChart.destroy();
			this.highChart=new Highcharts.Chart(this.chartOptions);
			this.highChart.xAxis[0].setCategories(_.isEmpty(mygroups) ? [] : mygroups);
			this.highChart.series[0].setData([]);
			this.highChart.setTitle({text: this.highChart.title.text},{text:(field.split('_').join(' ')),  });
			this.highChart.redraw();//
			graphToolbar.setCntBoxVal(0);
			//~ this.highChart.showLoading("..computing EPOS stats...");
						
			var resList=[];
			var result=0;
			
			_.each(groupObj, function(grValue, grKey){
				result=0;
				resList=_.map(grValue, function(resVal, resKey){
					return resVal['attributes'][field];
					});
				if (typeObject[field]!='Number'){//not a number
					result=resList.length;
					}
				
				else {//it is a number!
					_.each(resList, function(resElement, resIndex){
						if (_.isNumber(resElement)){
							result=result+resElement;
							}
						});
					result.toFixed(3)
					}
				
				self.highChart.series[0].addPoint(result);
				graphToolbar.setCntBoxVal(graphToolbar.getCntBoxVal()+result);
				});//END .each
			//~ this.chartOptions = JSON.parse( JSON.stringify( this.highChart.options ) );//update options
			//~ console.log(this.highChart.options);
			},
			
		//NB ************* this function is not used!*******************
		drawGroupBy: function (){ //draw function for groupwed graphs
			var resultsArray=graphToolbar.getJSONstatResults();
			var self=this;
			var seriesJSON={};
			var seriesArray=[];
			var categoryArray=[];
			var counter=0; //position of the number in the data array of the series
			var gender='male';
			
			//WHAT IS DONE HERE: we use a JSON object to store series.
			//at the end thE JSON is transformed to a seriesArray
			
			//~  xAxis Categories: they are the groupBy params. uses a category array
			// NB: xAxis categories are taken by groupby, it could lead to some confusion! 
			
			for(var key in resultsArray) {
				  categoryArray.push(key);
				}
			

			//iterates thorugh 'groupby' to create different series. 
			_.each(resultsArray,function(groupValue, groupKey,groupList){ //groupby 
				_.each(groupValue, function(Xvalue, Xkey, Xlist){ //xAxis,  calculates column. vals
					if (!seriesJSON.hasOwnProperty(Xkey)){ //check if the series already exist
						gender=(gender=='male')? 'female':'male';
						seriesJSON[Xkey]={	name:Xkey, 
											data: zeros([categoryArray.length]),
											//~ stack:gender
											};
					}

					//performs sum
					seriesJSON[Xkey].data[counter]=seriesJSON[Xkey].data[counter]+Xvalue.length;
				});

				counter=counter+1;
			});
			
			//convert json to array
			for (var key in seriesJSON){
				if (seriesJSON.hasOwnProperty(key)){
					seriesArray.push(seriesJSON[key]);
				}
			}
			
			//~ ok, now we can create the graph
			//~  Init graph
			this.highChart.destroy();
			this.chartOptions.xAxis.categories=categoryArray;
			this.chartOptions.tooltip= {
											formatter: function() {
												return '<b>'+ this.x +'</b><br/>'+
													this.series.name +': '+ this.y +'<br/>';
											}
										};
			this.chartOptions.series=seriesArray;
			this.highChart=new Highcharts.Chart(this.chartOptions);
			this.highChart.redraw();
			
			//garbage collection
			delete seriesJSON;
			seriesArray.length=0;
			categoryArray.length = 0;
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
			textList[4]="EPOS is:  "+getJSONData(QUERYnumberOfTotalStations).rows[0].value+ " Seismic and GPSStations";
			
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
	window.VSview = Backbone.View.extend({
		initialize: function(){
			_.bindAll(this, "searchOnEnter");
			this.VSobject=visualSearch;
			this.id=visualSearch.searchBox.id;
			this.VSobject.searchQuery.bind('reset',this.searchOnEnter);
			//~ ListOfRU.fetch();
			},
		searchOnEnter:function(){
			ListOfRU.filter_results();
			},
		});



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
            this.clearMarkers();
            
            //~ repeat the query N-times each time for any wg/query
            var couchDBqueries=[labCoordsView,netStationsCoordsView];
            
            
            //add the wait image / marker at the center of map
            //~ var mapCenterLatLon = this.map.getCenter();
            //~ var image = 'img/loading/loadingAnimation.gif';
            //~ var waitMarker = new google.maps.Marker({
				  //~ position: mapCenterLatLon,
				  //~ //    ~ map: self.map,
				  //~ icon: image
				//~ });
            
            var pb =  new progressBar({	height:       '2.3em',
										width:        '250px',
										top:          '50px',
										right:        '25px',
										colorBar:     '#F8F946',
										background:   '#FFF',
										fontFamily:   'Arial, sans-serif',
										fontSize:     '14px'
										});
			
            
            
            for (var couchQuery in couchDBqueries){
				//~ waitMarker.setMap(self.map);
                $.ajax({ //retrieve and show on map LABORATORY coordinates
                    async: true, 
                    url: couchDBqueries[couchQuery],
                    type:"POST",
                    data:JSON.stringify(queryParams),
                    dataType: 'json',
                    timeout:5000,
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
									var infowindow = new google.maps.InfoWindow({
                                    content: tooltip
                                    });
									google.maps.event.addListener(marker, 'click', function() {
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
                        //~ alert("error loading map");
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
		 el:$('#nav1 ul li a'),
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
			this.RUlistView= new itemList();
			this.total= new TotalView();
			this.searchBox= new VSview();
			this.statChart=new GraphView();
			this.DBloginView= new loginView();
			this.DBloginView.bind('loginChange', graphToolbar.render);
            this.eposGoogleMap=new mapBox();
            this.EPOSinfobox= new EPOSinfoView();
            this.nav1=new navigationBar();

            //map is shown by default
            this.showMap();
            //~ _.delay(this.eposGoogleMap.showRIsOnMap, 2000) ;
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
			},
		showStat:function(){
			this.eposGoogleMap.hide();
			this.statChart.show();
			}
	});
	window.App = new AppView;
});
