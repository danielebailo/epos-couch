$(function(){
 $(document).ready(function() {
        var visualSearch = VS.init({
          container  : $('#search_box_container'),
          query      : 'country: "United States" state: "New York" account: 5-samuel title: "Pentagon Papers"',
          unquotable : [
            'text',
            'account',
            'filter',
            'access'
          ],
          callbacks  : {
            search : function(query, searchCollection) {
				console.log(searchBox.value() );
              var $query = $('#search_query');
              var count  = searchCollection.size();
              $query.stop().animate({opacity : 1}, {duration: 300, queue: false});
              $query.html('<span class="raquo">&raquo;</span> You searched for: ' +
                          '<b>' + (query || '<i>nothing</i>') + '</b>. ' +
                          '(' + count + ' facet' + (count==1 ? '' : 's') + ')');
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
              callback([
                'account', 'filter', 'access', 'title',
                { label: 'city',    category: 'location' },
                { label: 'country', category: 'location' },
                { label: 'state',   category: 'location' },
              ]);
            },
            valueMatches : function(facet, searchTerm, callback) {
              switch (facet) {
              case 'account':
                  callback([
                    { value: '1-amanda', label: 'Amanda' },
                    { value: '2-aron',   label: 'Aron' },
                    { value: '3-eric',   label: 'Eric' },
                    { value: '4-jeremy', label: 'Jeremy' },
                    { value: '5-samuel', label: 'Samuel' },
                    { value: '6-scott',  label: 'Scott' }
                  ]);
                  break;
                case 'filter':
                  callback(['published', 'unpublished', 'draft']);
                  break;
                case 'access':
                  callback(['public', 'private', 'protected']);
                  break;
                case 'title':
                  callback([
                    'Pentagon Papers',
                    'CoffeeScript Manual',
                    'Laboratory for Object Oriented Thinking',
                    'A Repository Grows in Brooklyn'
                  ]);
                  break;
                case 'city':
                  callback([
                    'Cleveland',
                    'New York City',
                    'Brooklyn',
                    'Manhattan',
                    'Queens',
                    'The Bronx',
                    'Staten Island',
                    'San Francisco',
                    'Los Angeles',
                    'Seattle',
                    'London',
                    'Portland',
                    'Chicago',
                    'Boston'
                  ]);
                  break;
                case 'state':
                  callback([
                    "Alabama", "Alaska", "Arizona", "Arkansas", "California",
                    "Colorado", "Connecticut", "Delaware", "District of Columbia", "Florida",
                    "Georgia", "Guam", "Hawaii", "Idaho", "Illinois",
                    "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana",
                    "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
                    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada",
                    "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
                    "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
                    "Puerto Rico", "Rhode Island", "South Carolina", "South Dakota", "Tennessee",
                    "Texas", "Utah", "Vermont", "Virginia", "Virgin Islands",
                    "Washington", "West Virginia", "Wisconsin", "Wyoming"
                  ]);
                  break;
                case 'country':
                  callback([
                    "China", "India", "United States", "Indonesia", "Brazil",
                    "Pakistan", "Bangladesh", "Nigeria", "Russia", "Japan",
                    "Mexico", "Philippines", "Vietnam", "Ethiopia", "Egypt",
                    "Germany", "Turkey", "Iran", "Thailand", "D. R. of Congo",
                    "France", "United Kingdom", "Italy", "Myanmar", "South Africa",
                    "South Korea", "Colombia", "Ukraine", "Spain", "Tanzania",
                    "Sudan", "Kenya", "Argentina", "Poland", "Algeria",
                    "Canada", "Uganda", "Morocco", "Iraq", "Nepal",
                    "Peru", "Afghanistan", "Venezuela", "Malaysia", "Uzbekistan",
                    "Saudi Arabia", "Ghana", "Yemen", "North Korea", "Mozambique",
                    "Taiwan", "Syria", "Ivory Coast", "Australia", "Romania",
                    "Sri Lanka", "Madagascar", "Cameroon", "Angola", "Chile",
                    "Netherlands", "Burkina Faso", "Niger", "Kazakhstan", "Malawi",
                    "Cambodia", "Guatemala", "Ecuador", "Mali", "Zambia",
                    "Senegal", "Zimbabwe", "Chad", "Cuba", "Greece",
                    "Portugal", "Belgium", "Czech Republic", "Tunisia", "Guinea",
                    "Rwanda", "Dominican Republic", "Haiti", "Bolivia", "Hungary",
                    "Belarus", "Somalia", "Sweden", "Benin", "Azerbaijan",
                    "Burundi", "Austria", "Honduras", "Switzerland", "Bulgaria",
                    "Serbia", "Israel", "Tajikistan", "Hong Kong", "Papua New Guinea",
                    "Togo", "Libya", "Jordan", "Paraguay", "Laos",
                    "El Salvador", "Sierra Leone", "Nicaragua", "Kyrgyzstan", "Denmark",
                    "Slovakia", "Finland", "Eritrea", "Turkmenistan"
                  ], {preserveOrder: true});
                  break;
              }
            }
          }
        });
              
      });

	
	
		
	
	
	
	
	
	

	////connect with couchdb
  //Backbone.couch_connector.config.db_name = "epos-couch";
  //Backbone.couch_connector.config.ddoc_name = "epos-couch";
  
  //// If set to true, the connector will listen to the changes feed
  //// and will provide your models with real time remote updates.
  //// But in this case we enable the changes feed for each Collection on our own.
  //Backbone.couch_connector.config.global_changes = false;
	
	//****************************************************+LOGIN
	//very very simple login
	$("#account").couchLogin({

    loggedIn : function(userCtx) {

    }, 
    loggedOut : function() {
        
    }
	});
	
	//********************FLOAT ELEMENT
	//var name = "#item-info";
	//var menuYloc = null;

		//menuYloc = parseInt($(name).css("top").substring(0,$(name).css("top").indexOf("px")));
			//$(window).scroll(function () {
				//offset = menuYloc+$(document).scrollTop()+"px";
				//$(name).animate({top:offset},{duration:500,queue:false});
			//});
 
			//$('#close_message').click(function()
			//{alert('c');
  			////$(name).animate({ top:"+=15px",opacity:0 }, "slow");
  			//$('#item-info').remove();
			//});

	
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
		//sync:  function(method, model, options){
			//options.timeout = 10000;
			//options.dataType = "jsonp";
			//return Backbone.sync(method, model, options);
				  //} ,
		initialize:function(){
			//this.fetch();
			//console.log(JSON.stringify(this.parse));
			},
		//localStorage: new Store("epos-couch"),
		comparator: function(item){
			return item.get('ri_name');
			},
		
		
		
		
		});
		
	window.ListOfRU = new RUList();
	//ListOfRU.fetch()
	
	//console.log("alldocs: " + JSON.stringify(ListOfRU.fetch()));
		
		
	//VIEW
	
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
			var variables = this.model.toJSON();
			var template = _.template( $("#RU-popup-template").html(), variables );
			$.colorbox({
				html:template,
				transition: "elastic",
				speed:400
				});
			},

		});
		
		

		
		//~ // ** view del box di ricerca visualsearch
		//~ window.VisualSearchView=Backbone.View.extend({
			//~ el:$("input#searchbox"),
			//~ initialize: fnction(){
				//~ //_.bindAll(this, );
				//~ this.VisualSearch = VS.init({
					//~ container: $(this.el),
					//~ query: '',
					//~ callbacks:{
						//~ search: function(query, searchcollection){},
						//~ facetMatches : function(callback) {},
						//~ valueMatches : function(facet, searchTerm, callback) {}
						//~ }
					//~ 
					//~ 
					//~ });
				//~ },
			//~ 
			//~ });

		
		// ** view del numerello  che indica quate items sono visualizzate
		window.TotalView = Backbone.View.extend({
			el: $("#total-items"), 
			initialize: function(){
				_.bindAll(this, 'updateTotal');
				ListOfRU.bind('reset', this.updateTotal);
				},
			updateTotal: function(){
				$(this.el).html(" :: Showing "+ListOfRU.length+ "RUs");
				},
			
			}		
		);
		
		
		
		//// ** vista top level
		window.AppView = Backbone.View.extend({
			el: $("#content"),
			ascending: true,
			//statsTemplate: _.template($('#stats-template').html()),
			events:{
				"keypress #new-RU":			"createOnEnter",
				"click #byCountry":			"orderByCountry",
				"scroll #content":			"scroll",
				//"keyup #new-todo":    	"showTooltip",
				//"click .todo-clear a": 	"clearCompleted"
				},
			initialize: function(){
				_.bindAll(this, 'AddOne', 'addAll');
				ListOfRU.bind('add', this.addOne);
				ListOfRU.bind('reset', this.addAll);
				ListOfRU.fetch();
				var total= new TotalView();
			},
			addOne: function(ResearchUnit){
				var view = new RUView({model: ResearchUnit});
				$("#RU-list").prepend(view.render().el);
				},
			addAll: function(){
				ListOfRU.each(this.addOne);
				},
			orderByCountry: function(){
				ListOfRU.comparator=function(item){
					return item.get('country');
					}
				$("#RU-list").remove();
				$("#RUs").append('<ul id="RU-list"></ul>');
				ListOfRU.sort({silent:true});
				if (this.ascending==true){
					ListOfRU.models=ListOfRU.models.reverse();
					}
				//ListOfRU.sort();
				ListOfRU.trigger('reset',ListOfRU,{});
				this.ascending= !this.ascending;
				},
			filter: function(){
				
				},
			//~ scroll: function(){
				//~ console.log('scrolling');
				//~ },
			//initialize: function(){
				//this.input = this.$("#new-todo");
				//Todos.bind('add', this.addOne, this);
				//Todos.bind('reset', this.addAll, this);
				//Todos.bind('all', this.render, this);
				//Todos.fetch();
				//},
			//render: function(){
				//this.$('#RU-stats').html(this.statsTemplate({
					//total: 		ListOfRU.length,
					//}));
				//},
			//addOne: function(todo){
				//var view = new TodoView({model:todo});
				//this.$("#todo-list").append(view.render().el);
				//},
			//addAll: function(){
				//Todos.each(this.addOne);
				//},
			//clearCompleted: function(){
				 //_.each(Todos.done(), function(todo){ todo.destroy(); });
				//return false;
				//},
			createOnEnter: function(e) {
				  var text = this.input.val();
				  if (!text || e.keyCode != 13) return;
				  ListOfRU.create({ri_name: text});
				  this.input.val('');//resetta l'input'
				},
			//showTooltip: function(e) {
				  //var tooltip = this.$(".ui-tooltip-top");
				  //var val = this.input.val();
				  //tooltip.fadeOut();
				  //if (this.tooltipTimeout) clearTimeout(this.tooltipTimeout);
				  //if (val == '' || val == this.input.attr('placeholder')) return;
				  //var show = function(){ tooltip.show().fadeIn(); };
				  //this.tooltipTimeout = _.delay(show, 1000);
				//}
		});
		window.App = new AppView;
		
  
});
