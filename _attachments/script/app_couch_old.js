$(function(){
	
	//very very simple login
	$("#account").couchLogin({

    loggedIn : function(userCtx) {

    }, 
    loggedOut : function() {
        
    }
	});
	
	
	//ok, let's start with backbonejs...
	//MODEL (attributes are text, order, done)
	window.Todo = Backbone.Model.extend({
		defaults: function(){
			return {
				done: false,
				order: Todos.nextOrder()//puzzonata!!! il todos è una var globale...
				};
			},
			
		toggle: function(){
			this.save({done:!this.get("done")});
			},
			
		});
		
	//COLLECTION
	window.TodoList= backbone.Collection.extend({
		model: Todo,
		localStorage: new Store("todos"),
		done: function(){
			return this.filter(function(todo){
				return todo.get('done');
				});
			},
		remaining: function(){
			return this.without.apply(this, this.done());
			},
		nextOrder: function(){
			if (!this.length) return 1;
			return.this.last.get('order')+1; 
			},
		comparator: function (todo) {
			return todo.get('order');
			},
		
		
		});
		
		window.Todos = new TodoList;
		
	//VIEW
	window.TodoView = Backbone.View.extend({
		tagname: 'li',
		template: _.template($('#item-template').html()),
		events:{
			"click .check"				:"toggleDone",
			"dbclick div.todo-text"		:"edit",
			"click span.todo-destroy"	:"clear",
			"keypress .todo-input"		:"updateOnEnter"
			},
		initialize: function(){
			this.model.bind('change', this.render, this);
			this.model.bind('destroy', this.render, this);
			},
		render: function(){
			$(this.el).html(this.template(this.model.toJSON()));
			this.setText();
			return this;
			},
		setText: function(){
			var text = this.model.get('text');
			this.$('.todo-text').text(text);//text è un metodo jquery
			this.input = this.$('.todo-input');
			this.input.bind('blur', _.bind(this.close, this).val(text);//??
			},
		toggleDone: function(){
			this.model.toggle();
			},
		edit: function(){
			$(this.el).addClass("editing");
			this.input.focus();
			},
		close: function(){
			this.model.save({text: this.input.val()});
			$(this.el).removeClass("editing");
			},
		updateOnEnter: function(e){
			if (e.keycode ==13) this.close();
			},
		remove: function() {
			$(this.el).remove();
			},
		clear: function(){
			this.model.desroy();
			},
		});
		
		//vista top level
		window.AppView = Backbone.View.extend({
			el: $("#todoapp"),
			statsTemplate: _.template($('#stats-template').html())
			
			
		});
		
		
  
});
