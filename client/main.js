Template.lists.helpers({
	'list' : function() {
		return Lists.find({}, { sort: {name: 1}});
	}
});

Template.addList.events({
	'submit form' : function(event) {
		event.preventDefault();
		var listName = $('[name=listName]').val();
		Lists.insert({
			name: listName
		}, function(error, results) {
			Router.go('listPage', { _id: results});
		});
		$('[name=listName]').val('');
	}
});

Template.todos.helpers({
	'todo' : function() {
		var currentList = this._id;
		return Todos.find({ listId: currentList }, {sort: { createdAt: -1}});
	}
});

Template.addItem.events({
	'submit form' : function(event) {
		event.preventDefault();
		var itemName = $('[name="addItem"]').val();
		var currentList = this._id;
		Meteor.call('addItem', itemName, currentList);
		$('[name="addItem"]').val('');
	}
});

Template.todoItem.helpers({
	'checked' : function() {
		var isCompleted = this.completed;
		if(isCompleted) {
			return "checked";
		}
		else {
			return "";
		}
	}
})

Template.todoItem.events({
	'click .deleteItem' : function(event) {
		event.preventDefault();
		var documentId = this._id;
		var confirm = window.confirm("Delete?");
		if(confirm) {
			Todos.remove({
				_id: documentId
			})
		}
	},
	
	'keyup [name=todoItem]' : function(event) {
		if(event.which == 13 || event.which == 27) {
			$(event.target).blur();
		} 
		else {
			var documentId = this._id;
			var todoItem = $(event.target).val();
			Todos.update({ _id: documentId }, { $set: { name: todoItem }});
		}
	},
	
	'change [type=checkbox]' : function() {
		var documentId = this._id;
		var isCompleted = this.completed;
		if(isCompleted) {
			Todos.update({ _id: documentId }, { $set: { completed: false }});
		}
		else {
			Todos.update({ _id: documentId }, { $set: { completed: true }});
		}
	}
});

Template.todoCount.helpers({
	'totalTodo' : function() {
		var currentList = this._id;
		return Todos.find({ listId: currentList }).count();
	},
	'completedTodo' : function() {
		var currentList = this._id;
		return Todos.find({ listId: currentList, completed: true}).count();
	}
});