$(function(){
	//SOME GLOBALS	
	
	//function to get data from server (view or list), used in visualsearch callbacks definition 
	function getJSONData(myurl) {
	var data;
    $.ajax({
        async: false, //thats the trick
        url: myurl,
        dataType: 'json',
        success: function(response){
           data = response;
			}
		});
    return data;
	}
	
	var RUfacets=getJSONData('_list/json_field_names/ri_field_names');
	var RUvalueMatches=getJSONData('_list/facets_category_value_array/RI');
	var JSONfacilityCouchDBurl='_list/json_field_names/facility';
	
	//Visual Search object
	var visualSearch = VS.init({
          container  : $('#search_box_container'),
          query      : 'country: "italy" ',
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
              //~ switch (facet) {
                //~ case 'filter':
                  //~ callback(['published', 'unpublished', 'draft']);
                  //~ break;
                //~ case 'access':
                  //~ callback(['public', 'private', 'protected']);
                  //~ break;
                //~ case 'WG':
                  //~ callback([
                    //~ '1',
                    //~ '2',
                    //~ '3',
                    //~ '4'
                  //~ ]);
                  //~ break;
                //~ case 'city':
                  //~ callback([
                    //~ 'Cleveland',
                    //~ 'New York City',
                    //~ 'Brooklyn',
                    //~ 'Manhattan',
                    //~ 'Queens',
                    //~ 'The Bronx',
                    //~ 'Staten Island',
                    //~ 'San Francisco',
                    //~ 'Los Angeles',
                    //~ 'Seattle',
                    //~ 'London',
                    //~ 'Portland',
                    //~ 'Chicago',
                    //~ 'Boston'
                  //~ ]);
                  //~ break;
                //~ case 'state':
                  //~ callback([
                    //~ "Alabama", "Alaska", "Arizona", "Arkansas", "California",
                    //~ "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida",
                    //~ "Georgia", "Guam", "Hawaii", "Idaho", "Illinois",
                    //~ "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
                    //~ "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
                    //~ "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
                    //~ "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
                    //~ "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
                    //~ "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
                    //~ "Texas", "Utah", "Vermont", "Virginia", "Virgin Islands",
                    //~ "Washington", "West Virginia", "Wisconsin", "Wyoming"
                  //~ ]);
                  //~ break;
                //~ case 'country':
                  //~ callback([
                    //~ "China", "India", "United States", "Indonesia", "Brazil",
                    //~ "Pakistan", "Bangladesh", "Nigeria", "Russia", "Japan",
                    //~ "Mexico", "Philippines", "Vietnam", "Ethiopia", "Egypt",
                    //~ "Germany", "Turkey", "Iran", "Thailand", "D. R. of Congo",
                    //~ "France", "United Kingdom", "Italy", "Myanmar", "South Africa",
                    //~ "South Korea", "Colombia", "Ukraine", "Spain", "Tanzania",
                    //~ "Sudan", "Kenya", "Argentina", "Poland", "Algeria",
                    //~ "Canada", "Uganda", "Morocco", "Iraq", "Nepal",
                    //~ "Peru", "Afghanistan", "Venezuela", "Malaysia", "Uzbekistan",
                    //~ "Saudi Arabia", "Ghana", "Yemen", "North Korea", "Mozambique",
                    //~ "Taiwan", "Syria", "Ivory Coast", "Australia", "Romania",
                    //~ "Sri Lanka", "Madagascar", "Cameroon", "Angola", "Chile",
                    //~ "Netherlands", "Burkina Faso", "Niger", "Kazakhstan", "Malawi",
                    //~ "Cambodia", "Guatemala", "Ecuador", "Mali", "Zambia",
                    //~ "Senegal", "Zimbabwe", "Chad", "Cuba", "Greece",
                    //~ "Portugal", "Belgium", "Czech Republic", "Tunisia", "Guinea",
                    //~ "Rwanda", "Dominican Republic", "Haiti", "Bolivia", "Hungary",
                    //~ "Belarus", "Somalia", "Sweden", "Benin", "Azerbaijan",
                    //~ "Burundi", "Austria", "Honduras", "Switzerland", "Bulgaria",
                    //~ "Serbia", "Israel", "Tajikistan", "Hong Kong", "Papua New Guinea",
                    //~ "Togo", "Libya", "Jordan", "Paraguay", "Laos",
                    //~ "El Salvador", "Sierra Leone", "Nicaragua", "Kyrgyzstan", "Denmark",
                    //~ "Slovakia", "Finland", "Eritrea", "Turkmenistan"
                  //~ ], {preserveOrder: true});
                  //~ break;
              //~ }
            }
          }
        
        });


	//****************************************************+LOGIN
	//very very simple login
	$("#account").couchLogin({

    loggedIn : function(userCtx) {

    }, 
    loggedOut : function() {
        
    }
	});
	
	
	//***********************************+ BACKBONE
	//ok, let's start with backbonejs...
	
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
		url: '/epos-couch/_design/epos-couch/_view/RI',
		parse: function(response){
			return _(response.rows).map(function(row) { return row.value ;});
			},

		serverData:null,
		initialize:function(){
			var self=this;
			this.fetch({
				success: function(){
					self.serverData=new Backbone.Collection;
					self.serverData.reset(self.models);
					console.log("dump");
					console.log(self.serverData);
					},
				error: function(){
					console.log("errore");
					},
				});

			},
		//localStorage: new Store("epos-couch"),
		//~ comparator: function(item){
			//~ return item.get('ri_name');
			//~ },
		//~ filterBySearchParameters:function(params){//params is a json object like {ri_name:"hi man", country:"asia"}
			//~ _.filter(this, function(item){
				//~ return _.each(params, function(par){
					//~ if (item.get(par.key)!=par.value)
						//~ return;
					//~ });
				//~ });
			//~ },
		filter_results: function(){
			var myRUlist=this.serverData.models;
			var facets = visualSearch.searchQuery.models;
			if (facets.length >0){
				console.log(">0");
				_.each(facets,function(facet){
					myRUlist=myRUlist.filter(function(item){
						return item.get(facet.get('category')) == facet.get('value');
						});
					});
				}
			this.reset(myRUlist);
			},
		comparator: function(item){
			return item.get('ri_name');
			},
		orderBy: function(){
			this.comparator=function(item){
				return item.get('country');
				}
			this.sort({silent:true});
			//~ this.reset(this.models);
			//~ 
			//~ this.models.reverse();
			this.trigger('reset',this.models,{});
			},
		});
		
	window.ListOfRU = new RUList();

	//VIEWS
	// ** view della singola ru nella lista
	window.RUView = Backbone.View.extend({
		tagname: 'li',
		initialize: function(){
			_.bindAll(this, "render", "popRUinfo","showInfo","renderIMG");
			this.popupelementname= "#dialog";
			this.popupelement=null;
			},
		//template: _.template($('#item-template').html()),
		events:{
			"mouseover .RUitem"			:"popRUinfo",
			"click .RUitem"				:"showInfo",
			//"dbclick div.todo-text"		:"edit",
			//"click span.todo-destroy"	:"clear",
			//"keypress .todo-input"		:"updateOnEnter"
			},
		render: function(){
			$(this.el).append('<li class="RUitem" id="'+ this.model.get('_id')+'" title="...click to view details..."> '+this.renderIMG()+this.model.get('ri_name') + '</li>');
			return this;
			},
		popRUinfo: function(){
			//$("#RUs li[title] ").tooltip();
			//console.log(JSON.stringify(this.model));
			},
		renderIMG: function(){
			return ('<img src="img/'+this.model.get('country')+'_flag.gif" width="25px">  ');
			},
		showInfo: function(){
			var ri_info = this.model.toJSON();
			//~ console.log("ciao");
			var facility_info = getJSONData(JSONfacilityCouchDBurl+'?key="'+this.model.get('ri_name')+'"');
			//~ console.log(JSON.stringify(facility_info));
			var json_infos={"Research Unit: ":ri_info,"Facilities:":facility_info};
			//~ var template = _.template( $("#RU-popup-template").html(), ri_info );
			var htmljsonreport='<div class="jsonreport">'+_.jsonreport(JSON.stringify(json_infos))+'</div>';
			$.colorbox({
				html:htmljsonreport,
				transition: "elastic",
				speed:400
				});
			},

		});

	// ** view del numerello  che indica quate items sono visualizzate
	window.TotalView = Backbone.View.extend({
		el: $("#total-items"), 
		initialize: function(){
			_.bindAll(this, 'updateTotal');
			ListOfRU.bind('reset', this.updateTotal);
			},
		updateTotal: function(){
			$(this.el).html(" :: Showing "+ListOfRU.length+ "items ::");
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
		events:{
			},
		searchOnEnter:function(){
			ListOfRU.filter_results();
			},
		});

	// ** view for the list of items
	window.itemList = Backbone.View.extend({
		el:$("#RU-list"),
		events:{
			},
		initialize:function(){
			_.bindAll(this,  'addAll', 'filter','addOne');
			ListOfRU.bind('reset', this.addAll);
			this.ascending=true;
			},
		addOne: function(ResearchUnit){
			var view = new RUView({model: ResearchUnit});
			$(this.el).prepend(view.render().el);
			},
		addAll: function(){
			//~ console.log("adding all...");
			//~ console.log(ListOfRU);
			$(this.el).empty();
			var view = new RUView({model: ResearchUnit});
			ListOfRU.each(this.addOne);
			},
		});

		RUlistView= new itemList();
		total= new TotalView();
		sarchBox= new VSview();
			
	//// ** vista top level
	window.AppView = Backbone.View.extend({
		el: $("#content"),
		ascending: true,
		//statsTemplate: _.template($('#stats-template').html()),
		events:{
			//~ "keypress #new-RU":			"createOnEnter",
			"click #bycountry":			"orderBy",
			//~ "scroll #content":			"scroll",
			//"keyup #new-todo":    	"showTooltip",
			//"click .todo-clear a": 	"clearCompleted"
			},
		initialize: function(){
			//~ _.bindAll(this,  'addAll', 'filter');
			//~ ListOfRU.bind('add', this.addOne);

		},
		orderBy:function(){
			ListOfRU.orderBy();
			},
	});
	window.App = new AppView;
});
