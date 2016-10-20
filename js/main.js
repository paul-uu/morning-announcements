(function() {

	var Announcement = Backbone.Model.extend({
		defaults: {
			'start': null,
			'title': null		
		}
	});

	var Announcements = Backbone.Collection.extend({
		model: Announcement,
		localStorage: new Backbone.LocalStorage('Announcements_LocalStorage')
	});



	var Input_View = Backbone.View.extend({
		el: $('.announcement-input'),
		events: {
			'click .btn': 'save_announcment',
		},
		initialize: function() {
			this.render();
		},
		render: function() {
		},
		save_announcment: function() {
			var date = $('#datepicker').val();
			var announcement = $('.input1').val();
			if (this.validate_announcement(announcement)) {
				new_announcement = new Announcement({
					'start': date,
					'title': announcement
				});
				announcements.add(new_announcement);
				new_announcement.save();				
			} else {
				console.log('invalid');
			}
		},
		validate_announcement: function(str) {
			return str.length > 0;
		}
	});

	var Calendar_View = Backbone.View.extend({
		el: $('#calendar'),
		events: {
		},
		initialize: function(collection) {

			var calendar_events = this.collection_to_array(collection);

			this.$el.fullCalendar({
				header: {
					left: '',
					center: 'prev title next',
					right: ''
				},
				height: 175,
				defaultView: 'basicDay',
				dayClick: function(date, jsEvent, view) {
					console.log('dayClick');
				},
				events: calendar_events
			});
		},
		render: function() {},
		collection_to_array: function(collection) {
			var output = [];
			collection.models.forEach(function(val) {
				output.push(val.attributes);
			});
			return output;
		}
	});


	/* Initialize Collection */
	var announcements = new Announcements();
	announcements.fetch();	

	/* Initialize Views */
	var input_view = new Input_View();
	var calendar_view = new Calendar_View(announcements);


		

	$("#datepicker").datepicker({dateFormat: 'yy-mm-dd'});


})();





