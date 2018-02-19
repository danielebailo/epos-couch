//after getting username begins the game!
$.couch.session({
	success:function(data){
	var userName=data.userCtx.name;
	
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
	
	var RUfacets=getJSONData('_list/json_field_names/field_names');
	var RUvalueMatches=getJSONData('_list/facets_category_value_array/allfields');
	var JSONriDescription='_list/aggregate_items/allfields_RIaskey';
	var JSONriView="_view/allfields_RIaskey";
	
	//GLOBAL VAR: backboneJSONform
	var backboneJSONform={
   _id: {type:'Hidden'},
   _rev: {type:'Hidden'},
   doctype: {type:'Hidden'},
   ri_name: {type:'Text'},
   ri_type: {},
   file_path:{},
   country: {type:'Select', options:(RUvalueMatches.country).pop()},
   ri_institution:{},
   ri_institution_website:{},
   wg_main: {type:'Number'},
   wg_related: {type:'List', listType:'Number'},
   ri_manager:{},
   ri_manager_email:{ dataType: 'email', validators: ['required'] },
   ri_manager_phone: {},
   ri_manager_institution: {},
   national_contact_person: {},
   national_contact_person_email:{ dataType: 'email', validators: ['required'] },
   national_contact_person_phone:{},
   national_contact_person_institution: {},
   legal_contact_person: {},
   legal_contact_person_email:{ dataType: 'email', validators: ['required'] },
   legal_contact_person_phone: {},
   legal_contact_person_institution: {},
   financial_contact_person: {},
   financial_contact_person_email:{ dataType: 'email', validators: ['required'] },
   financial_contact_person_phone: {},
   financial_contact_person_institution: {}
	};

	//GLOBAL VAR:  dbName... must explain what it is?
	var dbName="epos-couch";



    //Visual Search object
	var visualSearch = VS.init({
          container  : $('#search_box_container'),
          query      : '   country: "czech_republic"',
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


	 //LOGIN OPS
	$("#welcome").couchLogin({
		loggedIn : function(userCtx) {
			$("#welcome").append('<br><br> Modify or Delete a Research Infrastructure.');

		}, 
		loggedOut : function() {
			$("a#welcome").remove();

		}
	});

	
	//~ 
	//~ HERE I BEGIN WITH THE BACKBONE
	//~ 


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
		url:function(){
			if (userName=='admin' || userName=='epos-couch'){//the two admins
				return "/epos-couch/_design/epos-couch/_list/only_vals/allfields";
				}
			else return ('/epos-couch/_design/epos-couch/_list/only_vals/allfields_countryaskey?key="'+userName+'"');
			},
		parse: function(response){
			return _(response.rows).map(function(row) { 
					return row.value;
				});
			},
		initialize:function(){
			self=this;
			this.fetch({
				success: function(){
					self.serverData=new Backbone.Collection;
					self.serverData.reset(self.models);
					},
				error: function(){
					console.log("error");
					},
				});
			},
		comparator: function(item){
			return item.get('ri_name');
			},
		filter_results: function(){
			var myRUlist=this.serverData.models;
			var facets = visualSearch.searchQuery.models;
			if (facets.length >0){
				_.each(facets,function(facet){
					myRUlist=myRUlist.filter(function(item){
						return item.get(facet.get('category')) == facet.get('value');
						});
					});
				}
			this.reset(myRUlist);
			},
		});
		
	window.ListOfRU = new RUList();
	
	// VIEWS
	//view per il form delle RI
	window.RIform = Backbone.Form.extend({
		data: { id: 123, name: 'Rod Kimble', password: 'cool beans' }, //Data to populate the form with
		schema: {
			wg_main:         { type: 'Number' },
			ri_name:       {},
			
		}
	});
	//~ per recuperare i dati: var data = form.getValue(); //Returns object with new form values
	
	
	// ** view della singola ru nella lista
	window.RUView = Backbone.View.extend({
		tagName: 'li',
		events:{
			"click #edit" : 		"updateRI",
			"click #delete" : 		"deleteRI",
			},
		initialize: function(){
			_.bindAll(this, "updateRI","renderIMG","addIMGlnk","deleteRI","purgeJSONkeys","saveRI");
			//~ $("#updatebtn").bind("click", this.saveRI);
			},
		render: function(){
			//~ $(this.el).id=this.model.get('_id');
			$(this.el).append("<span class=ri-item>"+this.renderIMG()+this.model.get('ri_name')+"   "+this.addIMGlnk("edit.gif", "Edit RI", "edit")+"   "+this.addIMGlnk("delete.gif", "Delete RI", "delete")+"</span>");
			return this;
			},
		addIMGlnk:function(imgName, text, imgId){
			return ('<a href="javascript:"> <img src="img/'+imgName+'" style="display:inline;vertical-align:middle;float:right;" alt="'+text+'" id="'+imgId+'">  </a>');
			},
		renderIMG: function(){
			return ('<img src="img/'+this.model.get('country')+'_flag.gif" width="25px">  ');
			},
		deleteRI:function(){
			alert("Deleting of RI is disabled at the moment. To ask for the deletion of an RI write to daniele.bailo@ingv.it");
			},
		updateRI:function(){
			//creates the update form in a popup menu
			var json_infos = getJSONData(JSONriDescription+'?key="'+this.model.get('ri_name')+'"');
			var self=this;
			
			//key name in capital letters
			for(var key in json_infos){
			    console.log(key);
			    var newKey=key.toUpperCase();
			    console.log(newKey);
			    json_infos[newKey]=new Object(json_infos[key]);
			    delete json_infos.key;
			    }
			var jsondata=(json_infos.RI).pop();
			this.form=new Backbone.Form({
				data: jsondata, //Data to populate the form with
				schema: self.getSchema(jsondata),
				}).render();
			$(this.form.el).prepend("<center><b>"+self.renderIMG()+self.model.get('ri_name')+"</b></center>").append('<div id="updatebtn">OK, Save all Changes!</div>');
			$(this.form.el).delegate('#updatebtn','click',  this.saveRI);
			$.colorbox({
				html:self.form.el,
				transition: "elastic",
				speed:400,
				scrolling: true,
				width: "650px",
				height: "600px",
				onClosed:function(){
				    ListOfRU.fetch();
				    }
				});
			},
		saveRI:function(){
		    //remember: dbName is a global
		    self=this;
		    var otherDocs=getJSONData(JSONriView+'?key="'+this.model.get('ri_name')+'"');
		    
		    //**saves the doc containing modified RI
		    $.couch.db(dbName).saveDoc(this.form.getValue(),{
			success:function(){
			    $(self.form.el).find('#updatebtn').append('   <span style="top:-40px; position:relative;"> <b id="iwillfade" style="color:red"> Doc succesfully saved!</b></span>');
			    $(self.form.el).find('#iwillfade').fadeOut(2500);
			    },
			});
		    
		    //** IF THERE IS MORE THAN ONE DOC WITH THE SAME RI NAME
		    //** CHANGES THE RI NAME ON THE OTHER DOCS
		    //** NB: must omit the _id of the just saved doc, to avoid conflicts
		    if (otherDocs.rows.length>1){
			var saved=0;
			for (row in otherDocs.rows){
			    console.log(JSON.stringify(otherDocs.rows[row]));
			    if(this.form.getValue('_id') !=otherDocs.rows[row].value._id){//do not update the just saved doc
				otherDocs.rows[row].value.ri_name= this.form.getValue('ri_name');
				$.couch.db(dbName).saveDoc(otherDocs.rows[row].value,{//*******ERRORE QUI!!
				    success:function(){
					saved=saved+1;
					},
				    });
				}

			    $(self.form.el).find('#updatebtn').append('   <span > <b id="iwillfade" style="color:green"> Saved '+saved+'/'+otherDocs.rows.length+' </b></span>');
			    $(self.form.el).fadeOut(2500);
			    }
			}
		    },
		getSchema:function(JSONobj){
			//returns a schema for backbone-form where only existing keys are defined
			//the general schema is in the backboneJSONform 
			var returnJSONschema=new Object;
			for (var key in backboneJSONform){
				if (key in JSONobj){
					returnJSONschema[key]=backboneJSONform[key];
					}
				}
			return returnJSONschema;
			},
		purgeJSONkeys:function(JSONobj, delFieldArr){
			//remove from JSONobj all the keys specified in delFieldArr
			_.each(delFieldArr, function(elm){
				delete JSONobj[elm];
				});
			return JSONobj;
			},
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
			},
		addOne: function(ResearchUnit){
			var view = new RUView({model: ResearchUnit});
			$(this.el).prepend(view.render().el);
			},
		addAll: function(){
			$(this.el).empty();
			//~ var popupMsg='<h1 style="text-align:center"> ...REFRESHING LIST...</H1>';

			//~ $.colorbox({
			    //~ html:'<h1 style="text-align:center"> ...REFRESHING LIST...</H1>',
			    //~ transition: "elastic",
			    //~ speed:400,
			    //~ width: "200px",
			    //~ height: "80px",
			    //~ onComplete:function(){
				//~ setTimeout("$.colorbox.close()", 400)}
			    //~ });
			ListOfRU.each(this.addOne);

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
	
	//top level view
	window.AppView = Backbone.View.extend({
		el:$("#content"),
		events:{
			"click #logout"	:					"reload",
			"click #reload"	:					"reload"
			},
		initialize:function(){
			this.listView= new itemList();
			this.searchBox= new VSview();
			//~ ListOfRU.bind('reset', ListOfRU.fetch());
			},
		reload:function(){
			window.location.reload();
			}
		});
	
	window.App = new AppView();


	}
});

