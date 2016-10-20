$(function() {

	/* used to keep track of the currently rendered view */
	var calView = '';
	var $calendar = $('#calendar');

	$('#calendar').fullCalendar({
		header: {
			left: 'today basicDay basicWeek month',
			center: 'prev title next',
			right: ''
		},

		/* for month view, ensure each week row does no exceed 68px * 6 (weeks) = 408px */
		contentHeight: 436,
		defaultView: 'basicWeek',

		//defaultDate: '2016-06-12',
		views: {
		},

		/* On click on a day: */
		dayClick: function(date, jsEvent, view) {

			/* Change the view type to 'day' */
			$('#calendar').fullCalendar('changeView', 'basicDay');

			/* Go to the date of the day clicked on */
			$('#calendar').fullCalendar('gotoDate', date);
		},

		/* called on a new render via date change or view type change */
		viewRender: function(view, el) {

			/* update current view to variable in parent scope */
			calView = view.name;

			/* update view state (calendar vs list) */
			$calendar.trigger('updateState');


		},

		editable: true,
		eventLimit: true, // allow "more" link when too many events
		events: [
			{
				title: 'All Day Event',
				start: '2016-06-01',
				className: 'event-scheduled'
			},
			{
				title: 'Long Event',
				start: '2016-06-07',
				end: '2016-06-10',
				className: 'event-unscheduled'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: '2016-06-09T16:00:00',
				className: 'event-scheduled'
			},
			{
				id: 999,
				title: 'Repeating Event',
				start: '2016-06-16T16:00:00',
				className: 'event-scheduled'
			},
			{
				title: 'Conference',
				start: '2016-06-11',
				end: '2016-06-13',
				className: 'event-scheduled'
			},
			{
				title: 'Meeting',
				start: '2016-06-12T10:30:00',
				end: '2016-06-12T12:30:00',
				className: 'event-scheduled'
			},
			{
				title: 'Lunch',
				start: '2016-06-12T12:00:00',
				className: 'event-scheduled'
			},
			{
				title: 'Meeting',
				start: '2016-06-12T14:30:00',
				className: 'event-unscheduled'
			},
			{
				title: 'Happy Hour',
				start: '2016-06-12T17:30:00',
				className: 'event-unscheduled'
			},
			{
				title: 'Dinner',
				start: '2016-06-12T20:00:00',
				className: 'event-scheduled'
			},
			{
				title: 'Birthday Party',
				start: '2016-06-13T07:00:00',
				className: 'event-scheduled'
			},
			{
				title: 'Click for Google',
				url: 'http://google.com/',
				start: '2016-06-28',
				className: 'event-scheduled'
			},
			{
				title: 'Lunch with the President',
				start: '2016-08-02',
				className: 'event-scheduled'
			}
		]
	});


	/* new */
	/* Calendar/List toggling */
	var $toggleCalendar = $('.toggle-calendar'),
		$toggleList     = $('.toggle-list'),
		$toggleBtn      = $('.toolbar-toggle-btn'),
		$list           = $('.dashboard-list'),
		$viewBtns       = $('.fc-button.fc-state-default'),
		toggleState     = 'calendar'; /* store state of toggle value */


	/* initialize toggleBtn state using var 'toggleState' */
	$('.toggle-' + toggleState).addClass('selected');

	/* toggle css class 'selected' on button' */
	$toggleBtn.on('click', function() {
		$toggleBtn.removeClass('selected');
		$(this).addClass('selected');
	});

	/* update toggleState variable depending on which btn toggle clicked */
	/* trigger update to view calendar */
	$toggleCalendar.on('click', function() {
		toggleState = 'calendar';
		$calendar.trigger('updateState');
	});
	$toggleList.on('click', function() {
		toggleState = 'list';
		$calendar.trigger('updateState');
	});
	$viewBtns.on('click', function() {
		$calendar.trigger('updateState');
	});

	/* using 'toggleState' and 'calView', show/hide appropriate elements */
	$calendar.on('updateState', function(e) {

		if (toggleState === 'calendar') {
			$(this).find('.fc-view-container').removeClass('hide');

			if (calView === 'month')
				$list.addClass('hide');
			else
				$list.removeClass('hide');
		} 
		else {
			$(this).find('.fc-view-container').addClass('hide');
			$list.removeClass('hide');
		}
	});
	

});

