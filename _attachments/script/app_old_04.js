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

	

	
	//adds the 'searchType' option to search, to perform searches with logical AND OR operators
	RUfacets.push('searchType');
	RUvalueMatches['searchType']=[['AND','OR']];
	
	
	//Visual Search object
	var visualSearch = VS.init({
          container  : $('#search_box_container'),
          query      : 'searchType: "AND"',
          unquotable : [
            'text',
            'account',
            'filter',
            'access'
          ],
          callbacks  : {
            search : function(query, searchCollection) {
              var $query = $('#search_query');
              var count  = searchCollection.size();
              $query.stop().animate({opacity : 1}, {duration: 300, queue: false});
              $query.html('<span class="raquo">&raquo;</span> You searched for: ' +
                          '<b>' + (query || '<i>nothing</i>') + '</b>. ' +
                          '(' + count + ' filter' + (count==1 ? '' : 's') + ')');
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


	//************************** HELPER FUNCTIONS ***********************************//
	//creates an nD array of zeros
	function zeros(dimensions) {
		var array = [];

		for (var i = 0; i < dimensions[0]; ++i) {
			array.push(dimensions.length == 1 ? 0 : zeros(dimensions.slice(1)));
		}

		return array;
	}
	





	//****************************************************+LOGIN
	//very very simple login
	var loggedIn=false;
	$("#account").couchLogin({
		loggedIn : function(userCtx) {
			$("#account").append('  - <a href="profile.html" target="_blank"> Your Profile</a>');
			loggedIn=true;
		}, 
		loggedOut : function() {
			$("a#account").remove();
			loggedIn=false
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
		initialize: function(){
			},
		});
		
	//COLLECTION
	window.RUList= Backbone.Collection.extend({
		model: ResearchUnit,
		url:"/epos-couch/_design/epos-couch/_list/only_vals/allfields_RIaskey",
		parse: function(response){
			//~ console.log(_.groupBy(response.rows, function(object){return object.value.ri_name}));
			return _(response.rows).map(function(row) { return row.value ;});
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
					//do OR search
					//~ console.log('OR SEARCH');
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
								return item.get(facet.get('category')) == facet.get('value');
								});
							}
						});
					returnList=myRUlist;
				}
			}
			this.reset(returnList);
			},
		comparator: function(item){
			return item.get('ri_name');
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
	// ** view della singola ru nella lista
	window.RUView = Backbone.View.extend({
		tagName: 'li',
		initialize: function(){
			_.bindAll(this, "showInfo","renderIMG");
			this.popupelementname= "#dialog";
			this.popupelement=null;
			},
		events:{
			"click"				:"showInfo",
			},
		render: function(){
			//~ $(this.el).id=this.model.get('_id');
			$(this.el).append("<span class=RUitem>"+this.renderIMG()+this.model.get('ri_name')+"</span>");
			//~ $(this.el).append('<li class="RUitem" id="'+ this.model.get('_id')+'" title="...click to view details..."> '+this.renderIMG()+this.model.get('ri_name') + '</li>');
			return this;
			},

		renderIMG: function(){
			return ('<img src="img/'+this.model.get('country')+'_flag.gif" width="25px">  ');
			},
		showInfo: function(){
			//~ console.log("yes");
			//~ var ri_info = this.model.toJSON();
			//the query aggregates all the docs with the same ri_name
			//~ the json_infos is like this: 
			//~ {	RI:[list of ri's docs],
			//~ FACILITY:[list of facilityes docs],
			//~ DATACENTRE:[],
			//~ DATABASE:[]
			//~ }
			var json_infos = getJSONData(JSONriDescription+'?key="'+this.model.get('ri_name')+'"');
			
			for (item in json_infos){//scans through ri, facility, datacetre, database 
									 // and purge them removing unwanted fields
				for (var obj in json_infos[item]){//scans elems in the list (elms are json obj)
					json_infos[item][obj]=this.purgeJSONkeys(json_infos[item][obj], ['_id','_rev','doctype','status']);
					} 
				}
			
			//~ ACCORDION CREATION
			var accordionHTML= $('<div class="demo-show" />');
			$(accordionHTML).prepend("<div class=RUitem style='margin-bottom:10px;text-align:center;font-size:16px;font-weight:bold;'>"+this.renderIMG()+this.model.get('ri_name')+"</div>");
			var counter=0;
			var labelCol=$('<div class="demo-show-labelcol" />');
			var contentCol=$('<div class="demo-show-contentcol" />');
			var RIrow=0;//var to store the row of the RI, so later focus is on RI label
			for (itemListLabel in json_infos){
				for(var item in json_infos[itemListLabel]){	
					//for each item in itemListLabel(which is a list of items with
					//~ the same doctype) , creates a demo-show-labelcol (left label)
					// and a demo-show-contentcol (right content)
					
					if(itemListLabel=='financial' && loggedIn==false) //do not visualize financial if user is not logged in
						continue;

					
					switch(itemListLabel){// itemlist label is given in lowercase by the list function!
						case "ri":
							$(labelCol).prepend('<h3 class="row'+counter+'">RI General Info</h3>');
							RIrow=counter;
							break;
						case "facility":
							if (json_infos[itemListLabel][item].facility_type=='laboratory'){
							$(labelCol).append('<h3 class="row'+counter+'">'+json_infos[itemListLabel][item].facility_type.toUpperCase()+':'+json_infos[itemListLabel][item].laboratory_name+'</h3>');
							}
							else{
								$(labelCol).append('<h3 class="row'+counter+'">'+json_infos[itemListLabel][item].facility_type.toUpperCase()+'</h3>');
							}
						
							
							break;
						case "financial":
							$(labelCol).append('<h3 class="row'+counter+'"> Financial Info</h3>');
							break;
						default:
							$(labelCol).append('<h3 class="row'+counter+'">'+itemListLabel.toUpperCase()+'</h3>');
							break;
						}
						
					var contentRow= $('<div class="jsonreport row'+counter+'" />');
					$(contentCol).append(contentRow);
					$(contentRow).append(_.jsonreport(JSON.stringify(this.removeEmptyKeys(json_infos[itemListLabel][item]))))
					
					counter=counter+1;
					if(itemListLabel=='financial' ){
						$(contentRow).prepend('<span style="display:block;color: red; font-weight:bold;maring:auto;text-align: center;">All the figures are displayed in thousand 	euros</span>');
						}
					}
				$(accordionHTML).append($(labelCol));
				$(accordionHTML).append($(contentCol));
				}

			$.colorbox({
				html:accordionHTML,
				transition: "elastic",
				speed:400,
				scrolling: true,
				width: "900px",
				height: "700px",
				onComplete:function(){
					//~ thanks to http://www.learningjquery.com/2007/02/more-showing-more-hiding
				  var bgColor=$('.demo-show-contentcol').css('background-color');//'#F1F1F1';
				  var fgColor=$('.demo-show h3').css('background-color');//'#BBC7E3';
				  
				  $('div.demo-show div.jsonreport').hide();
				  $('div.demo-show div.jsonreport.row'+RIrow).show();
				  $('h3.row'+RIrow).css('background-color',bgColor);
				  var previousClass='row'+RIrow;
				  
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
				   
				   //click handler
				  $('div.demo-show h3').click(function() {
					$('h3.'+previousClass).css('background-color',fgColor); 
					var classStringShow= 'div.demo-show div.jsonreport.'+$(this).attr("class");
					var classStringH3='div.demo-show h3.'+$(this).attr("class");
					$(classStringH3).css('background-color',bgColor);
					$('div.demo-show div.jsonreport').hide();
					$(classStringShow).fadeToggle('700','linear');
					previousClass=$(this).attr("class");
				  });
				 }
				});
			},
		purgeJSONkeys:function(JSONobj, delFieldArr){
			//remove from JSONobj all the keys specified in delFieldArr
			_.each(delFieldArr, function(elm){
				delete JSONobj[elm];
				});
			return JSONobj;
			},
		removeEmptyKeys:function(JSONobj){
			//if a key is empty, removes it so it is not rendered by _.jsonreport
			for(var elem in JSONobj){
				if(JSONobj[elem]==null || JSONobj[elem]=='' || JSONobj[elem]==[]){
					delete JSONobj[elem];
					}
				}
			return JSONobj;
			//~ LITTLE MODIFICATION that could be done: THE FUNCTION RETURNS  THE backboneJSONform GLOB VAR
		    //~ THE CALLING FUNCTION WILL DECIDE WHAT TO DO WITH NULL VALUES
		    //~ return backboneJSONform;
			
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
			this.ascending=true;
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
		fullListHTML:"",
		JSONstatResults:{}, //json object containing stat result
		initialize:function(){
			_.bindAll(this,  "render", "fullListPopUp");
			this.render(RUfacets);
			JSONstatResults={};
			$("#yselect").mcDropdown("#yselectmenu", {delim:': '});//USES MCdROPDOWN PLUGIN TO POPULATE SELECT-DROPBOXES
			$("#yselect").mcDropdown().setValue("default");
			$("#xselect").mcDropdown("#xselectmenu", {delim:': '});//USES MCdROPDOWN PLUGIN TO POPULATE SELECT-DROPBOXES
			$("#xselect").mcDropdown().setValue("default");
			$("#groupselect").mcDropdown("#groupselectmenu", {delim:': '});//USES MCdROPDOWN PLUGIN TO POPULATE SELECT-DROPBOXES
			$("#groupselect").mcDropdown().setValue("default");
			},
		events:{
			"change #xselect":				"onXchange",
			"change #yselect":				"onYchange",
			"click #count-list"	:			"fullListPopUp",
			"click #calculate":				"goStat",
			},
		render:function(selectorVals){
			//fills in the yaxis
			//~ var self=this;
			//~ $.each(selectorVals, function(index){
				//~ var value=JSON.stringify(selectorVals[index]).split('"').join('');
				//~ $(self.el).find(self.yAxisBtn).append(new Option(value.split('_').join(' '),value));
				//~ });
			//~ $(self.el).find(self.selectEl).prepend(new Option(this.defaultSelectValue,this.defaultSelectValue ));
			$(this.el).find(this.countResultEl).val("tot");
			},
		onYchange:function(){
			//~ console.log("yBtnChange");

			//~ this.fullListHTML='<div class="jsonreport">'+_.jsonreport(JSON.stringify(this.keyValue))+'</div>';
			//~ this.trigger("Ychange");
			},
		goStat:function(){
			if(this.getYAxisBtnVal()=='default' || this.getXAxisBtnVal()=='default')
				return;
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
			//~ console.log('this.JSONstatResults',this.JSONstatResults);
			//~ simple case: groupby not selected
			if (this.getGroupByBtnVal()=='default'){
				var self=this;
				var groupKey=self.getXAxisBtnVal();
				var groupVals=_.groupBy(ListOfRU.models, function(obj){ //xAxis
									return obj.get(self.getXAxisBtnVal()); 
									});
				this.JSONstatResults[groupKey]= groupVals;
				}
			
			//~ more difficult case: groupby is selected
			if (this.getGroupByBtnVal()!='default'){
				var self=this;
				var xAxisParam=self.getXAxisBtnVal();
				var groupByParam=self.getGroupByBtnVal()
				var groupVals=_.groupBy(ListOfRU.models, function(obj){ //groupBy
									return obj.get(groupByParam); 
									});

				_.each(groupVals,function(value, key,list){
					self.JSONstatResults[key] = _.groupBy(value, function(ogg){
							return ogg.get(xAxisParam);
							});
						//~ console.log(key, " subrouping ", self.JSONstatResults[key]);
						}
					);
				}
			//~ console.log(this.JSONstatResults);
			
			//ok, now graph the results
			this.trigger("pushbtn"); //this event is handled by GraphView
			},
			
		onXchange:function(){
			//~ console.log("x Axis change");
			//~ this.trigger("groupByChange");
			},
			
		fullListPopUp:function(){
			convertme(this.JSONstatResults);
			return;
			var self=this;
			var popupHTML=_.jsonreport(JSON.stringify(this.JSONstatResults));
			window.open( "data:text/html;charset=utf-8," + popupHTML);
			//~ console.log(JSON.stringify(self.JSONstatResults));
			//~ $.colorbox({
				//~ html:popupHTML,
				//~ transition: "elastic",
				//~ speed:400,
				//~ width:600
				//~ });
			},
		getYAxisBtnVal:function(){
			return this.$(this.el).find(this.yAxisBtn).val();
			},
		getXAxisBtnVal:function(){
			return this.$(this.el).find(this.xAxisBtn).val();
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
			},
		});

	graphToolbar=new statToolbarView();
	
	// ** vista del grafico con le statistiche
	window.GraphView=  Backbone.View.extend({
		el:$('#graph'),
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
						renderTo: self.el.selector.slice(1,self.el.selector.length),//need to remove first char '#'
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
							this.x +': '+ this.y +' items';
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
									var win=window.open('','','location=0,titlebar=0,status=0,width=780,height=350');
									win.focus();
									var divtag = win.document.createElement("div");
									divtag.id = "div1";
									win.document.body.appendChild(divtag);
									console.log(JSON.stringify(this.options));
									win.document.write('<script type="text/javascript" src="script/jquery-1.7.1-min.js"></script>\
									<script type="text/javascript" src="script/highcharts/js/highcharts.js"></script>\
									<script type="text/javascript" src="script/highcharts/js/modules/exporting.js"></script>\
									<script type="text/javascript">\
									$(document).ready(function () {\
										chart= new Highcharts.Chart({'+JSON.stringify(this.options)+'});\
									});');
									win.document.close();
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
		draw:function(){
			if (graphToolbar.getGroupByBtnVal()=='default')
				this.drawSimple();
			else this.drawGroupBy();
			},
			
		drawSimple: function(){ //draw function for non groupedBy graphs
			// 1) group by if requested
			var groupByVal=graphToolbar.getXAxisBtnVal();
			var field=graphToolbar.getYAxisBtnVal();
			var groupObj={};
			var mygroups=[];
			if (field=="default"){return null};
			if ( groupByVal!="default"){
				//groupObj is a hash where key is the selected 'group by' item
				// and value is a list of all doc's fields
				//my groups is an array with all the group ids
				var groupObj= _.groupBy(ListOfRU.models, function(obj){
					return obj.get(groupByVal); 
					});
				var groups=(_.map(groupObj,function(value, key, list){
					return key;
				}));
				var mygroups=[];
				$.each(groups,function(index, value){ mygroups[index]= groups[index].split('_').join('\n')});
				}
			else{
				groupObj[field]=ListOfRU.models;
				}
			
			//1.1)some ops on the chart	
			this.chartOptions.series=[{name:field.split('_').join('\n')}];
			this.highChart.destroy();
			this.highChart=new Highcharts.Chart(this.chartOptions);
			this.highChart.xAxis[0].setCategories(_.isEmpty(mygroups) ? [] : mygroups);
			this.highChart.series[0].setData([]);
			this.highChart.setTitle({text: this.highChart.title.text},{text:(field.split('_').join('\n')),  });
			this.highChart.redraw();//
			//~ this.highChart.showLoading("..computing EPOS stats...");
			
			// 2) count results foreach group 
			//makes the difference btw numeric and string values
			var self=this;
			var mySum=0;
			graphToolbar.setCntBoxVal(0);
			//~ console.log("***************groupobj***********");
			console.log(groupObj);
			$.each(groupObj, function(Index, Elem){

				
				
				
				
				
				//is that string or numeric value?
				//~ console.log("field is a numeric vaule");
				//~ console.log(Elem);
				//~ console.log(Elem[0]);
				var len=Elem.length;
				var i=0;
				var sumUniqueValues=0;
				var typeObject= fieldTypeList(backboneJSONform);
				while(Elem[i].attributes[field]==null ) {i=i+1};
				//~ console.log(Elem[i].attributes);
				if (typeObject[field]!='Number'){
				//~ console.log("field is string value");
				//CASE 1: string
					sumUniqueValues=_(Elem).chain()
							.map(function(value, key, list){
								return value.attributes[field];
								})
							.reduce(function(memo, listEl){
								if (memo==0){//1st iteration
										memo=new Object();
										}
								memo[listEl]=(memo[listEl] || 0) +1;
								return memo;
								},0)
							.keys()
							.value().length;
					}
				else{
				//CASE 2: number
				//~ console.log("number");
					sumUniqueValues=_(Elem).chain()
							.map(function(value, key, list){
								//~ console.log(value.attributes[field]);
								return value.attributes[field];
								})
							.reduce(function(memo, listEl){
								memo=memo +listEl;
								return memo;
								},0)
							.value;
					}
				console.log(sumUniqueValues);
				self.highChart.series[0].addPoint(sumUniqueValues);
				graphToolbar.setCntBoxVal(graphToolbar.getCntBoxVal()+sumUniqueValues);
			});//END .each
			},
			
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
			// NB: xAxis categories aretaken by groupby, it could lead to some confusion! 
			
			for(var key in resultsArray) {
				  categoryArray.push(key);
				}
			
			//~ console.log(catArray);
			//iterates thorugh 'groupby' to create different series. 
			_.each(resultsArray,function(groupValue, groupKey,groupList){ //groupby 
				_.each(groupValue, function(Xvalue, Xkey, Xlist){ //xAxis,  calc. column. vals
					if (!seriesJSON.hasOwnProperty(Xkey)){ //check if the series already exist
						gender=(gender=='male')? 'female':'male';
						seriesJSON[Xkey]={	name:Xkey, 
											data: zeros([categoryArray.length]),
											//~ stack:gender
											};
					}
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
			//~ console.log(seriesJSON);
			seriesArray.length=0;
			categoryArray.length = 0;
		},
		
			
			
			
			
			
			/*//~ //map-reduce ops on the collection, to draw them
			// 1) group by if requested
			var groupByVal=graphToolbar.getXAxisBtnVal();
			var field=graphToolbar.getYAxisBtnVal();
			var groupObj={};
			var mygroups=[];
			if (field=="default"){return null};
			if ( groupByVal!="default"){
				//groupObj is a hash where key is the selected 'group by' item
				// and value is a list of all doc's fields
				//my groups is an array with all the group ids
				var groupObj= _.groupBy(ListOfRU.models, function(obj){
					return obj.get(groupByVal); 
					});
				var groups=(_.map(groupObj,function(value, key, list){
					return key;
				}));
				var mygroups=[];
				$.each(groups,function(index, value){ mygroups[index]= groups[index].split('_').join('\n')});
				}
			else{
				groupObj[field]=ListOfRU.models;
				}
			
			//1.1)some ops on the chart	
//~ 
			this.highChart.showLoading("..computing EPOS stats...");
			
			// 2) count results foreach group 
			//makes the difference btw numeric and string values
			var self=this;
			var mySum=0;
			graphToolbar.setCntBoxVal(0);
			console.log("***************groupobj***********");
			console.log(groupObj);
			$.each(groupObj, function(Index, Elem){
				//is that string or numeric value?
				console.log("field is a numeric vaule");
				console.log(Elem);
				console.log(Elem[0]);
				var len=Elem.length;
				var i=0;
				var sumUniqueValues=0;
				while(Elem[i].attributes[field]==null ) {i=i+1};
				if (_.isString(Elem[i].attributes[field])){//**********************
				console.log("field is string value");
				//CASE 1: string
					sumUniqueValues=_(Elem).chain()
							.map(function(value, key, list){
								return value.attributes[field];
								})
							.reduce(function(memo, listEl){
								if (memo==0){//1st iteration
										memo=new Object();
										}
								memo[listEl]=(memo[listEl] || 0) +1;
								return memo;
								},0)
							.keys()
							.value().length;
					}
				else{
				//CASE 2: number
				console.log("number");
					sumUniqueValues=_(Elem).chain()
							.map(function(value, key, list){
								return value.attributes[field];
								})
							.reduce.reduce(function(memo, listEl){
								memo=memo +listEl;
								return memo;
								},0)
							.value
					}
				self.highChart.series[0].addPoint(sumUniqueValues);
				graphToolbar.setCntBoxVal(graphToolbar.getCntBoxVal()+sumUniqueValues);
			});//END .each
		},*/
	});
	
	// ** view del numerello  che indica quate items sono visualizzate
	window.TotalView = Backbone.View.extend({
		el: $("#total-items"), 
		initialize: function(){
			_.bindAll(this, 'updateTotal');
			ListOfRU.bind('reset', this.updateTotal);
			},
		updateTotal: function(){
			$(this.el).html(' <span id="stat_number_of_items" >'+ListOfRU.length+ "</span> items for statistics below");
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

	//// ** vista top level
	window.AppView = Backbone.View.extend({
		el: $("#content"),
		events:{
			"change #item-orderby select"	:		"orderBy",
			"click #item-orderby img"	:			"orderBy",
			"click #bottone"	:					"raggruppa"
			},
		initialize: function(){
			this.RUlistView= new itemList();
			this.total= new TotalView();
			this.searchBox= new VSview();
			this.statChart=new GraphView();
		},
		orderBy:function(){
			//~ console.log($(this.el).find("#item-orderby select").val());
			ListOfRU.orderBy($(this.el).find("#item-orderby select").val());
			},
		raggruppa:function(){
			this.statChart.groupByValue('country');
			},
	});
	window.App = new AppView;
});
