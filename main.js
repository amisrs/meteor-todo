Todos = new Mongo.Collection("todos");
Lists = new Mongo.Collection("lists");

Router.configure({
	layoutTemplate: 'main'
});

Router.route('/register');
Router.route('/login');
Router.route('/', {
	name: 'home',
	template: 'home'
});
Router.route('/list/:_id', {
	name: 'listPage',
	template: 'listPage',
	data: function() {
		var currentList = this.params._id;
		return Lists.findOne({ _id: currentList });
	}
})

Meteor.methods({
	'addItem' : function(itemName, currentList) {
		check(itemName, String);
		Todos.insert({
			name: itemName,
			completed: false,
			createdAt: new Date(),
			listId: currentList
		});
	}
})