var html5dev = (function(){

	var vars = {};

	var elements = {};

	var events = {

		analytics: function()
		{
			if(typeof _gaq != 'undefined')
			{
				_gaq.push(['_trackPageview', location.pathname + location.search + location.hash]);
			}
		}
	};

	return {
		init: function()
		{
			var store = null;
	
			if('localStorage' in window && window['localStorage'] !== null){
				//store = window.localStorage;
				//my_events = store.get('my_events');
			}
			
			// Populate JSON object with user preferences for event attendence
			
			// Build HTML table
			
			var calendar_template = $('#calendar-template').html();
			var $event_list = $('#event-list');
			var time_blocks = [];
			var sessions = _.filter(html5devconf_data.schedule, function(data) { return data.day == 1; });
			for(i in html5devconf_data.time_blocks){
				var time_block = _.filter(sessions, function(session) { return session.time == html5devconf_data.time_blocks[i]; });
				if( time_block ) time_blocks.push({ time:html5devconf_data.time_blocks[i], sessions:time_block});
			}
			var rendered_tpl = _.template(calendar_template, {title:'Day 1 - Monday October 15', time_blocks: time_blocks});
			$( rendered_tpl ).appendTo($event_list);
			
			var time_blocks = [];
			var sessions = _.filter(html5devconf_data.schedule, function(data) { return data.day == 2; });
			for(i in html5devconf_data.time_blocks){
				var time_block = _.filter(sessions, function(session) { return session.time == html5devconf_data.time_blocks[i]; });
				if( time_block ) time_blocks.push({ time:html5devconf_data.time_blocks[i], sessions:time_block});
			}
			var rendered_tpl = _.template(calendar_template, {title:'Day 2 - Monday October 16', time_blocks: time_blocks});
			$( rendered_tpl ).appendTo($event_list);
			
			// Live bind click events to table items, bind on single element and let bubble up with nodetype detection
			$('#event-wrapper').click(function(e){
				var $event = $(e.target).closest('.event-item');
				
				if($event.length){
					var event_id = $event.data('session');
					html5dev.show_details(event_id);
				}
			});
			
			html5dev.update_layout();
		},
		update_layout: function()
		{
			
		},
		show_details: function(event_id)
		{
			// Populate the details div
			var event_obj = _.find(html5devconf_data.schedule, function(event_item) { return event_item.id == event_id; });
			
			$details = $('#event-details');
			
			$details.find('.event-title').text(event_obj.title);
			$details.find('.event-description').text(event_obj.description);
			
			$details.find('.speaker-name').text(event_obj.speaker.name);
			$details.find('.speaker-pic img').attr('src',event_obj.speaker.image);
			
			
			
			// alert(event_obj.title);
			
			jQuery('section').addClass('flip');
			return false;
		},
		hide_details: function()
		{
			jQuery('section').removeClass('flip');
			return false;
		}
	}
})();

jQuery(document).ready(function(){
	html5dev.init();
});

window.addEventListener('load',function(){ html5dev.update_layout(); });
window.addEventListener('orientationchange',function(){html5dev.update_layout(); });
