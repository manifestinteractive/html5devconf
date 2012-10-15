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
				//store.get('my_schedule');
				//my_events = store.get('my_events');
			}
			
			// Populate JSON object with user preferences for event attendence
			
			// Build HTML table
			
			var event_list_template = $('#event-list-template').html();
			var $event_list = $('#event-list');
			var time_blocks = [];
			var sessions = _.filter(html5devconf_data.schedule, function(data) { return data.day == 1; });
			for(i in html5devconf_data.time_blocks){
				var time_block = _.filter(sessions, function(session) { return session.time == html5devconf_data.time_blocks[i]; });
				if( time_block ) time_blocks.push({ time:html5devconf_data.time_blocks[i], sessions:time_block});
			}
			var rendered_tpl = _.template(event_list_template, {title:'Day 1 - Monday October 15', time_blocks: time_blocks});
			$( rendered_tpl ).appendTo($event_list);
			
			var time_blocks = [];
			var sessions = _.filter(html5devconf_data.schedule, function(data) { return data.day == 2; });
			for(i in html5devconf_data.time_blocks){
				var time_block = _.filter(sessions, function(session) { return session.time == html5devconf_data.time_blocks[i]; });
				if( time_block ) time_blocks.push({ time:html5devconf_data.time_blocks[i], sessions:time_block});
			}
			var rendered_tpl = _.template(event_list_template, {title:'Day 2 - Monday October 16', time_blocks: time_blocks});
			$( rendered_tpl ).appendTo($event_list);
			
			// Live bind click events to table items, bind on single element and let bubble up with nodetype detection
			$('#event-wrapper').click(function(e){
				var $event = $(e.target).closest('.event-item');
				
				if($event.length){
					var id = $event.data('id');
					html5dev.show_details(id);
				}
			});
			
		
			$image_test = $('#image-test');
			
			for(i=0; i < html5devconf_data.schedule.length; i++){
				
				event_item = html5devconf_data.schedule[i];
				
				if(typeof event_item.speaker !== 'undefined' 
					&& typeof event_item.speaker.image !== 'undefined'){
					console.log('create img');
					$img = $('<img>');
					$img.attr('src',event_item.speaker.image);
					$image_test.append($img);
				}
			}
			
			
			html5dev.update_layout();
		},
		update_layout: function()
		{
			window.scrollTo(0,1);
		},
		show_details: function(id)
		{
			var event_detail_template = $('#event-detail-template').html();
			var event_detail = _.find(html5devconf_data.schedule, function(event_detail) { return event_detail.id == id; });
			var rendered_tpl = _.template(event_detail_template, {data:event_detail});
			$('#event-details').html(rendered_tpl);
			jQuery('section').addClass('flip');
			setTimeout(function(){ jQuery('#event-wrapper').hide(); }, 250);
		},
		hide_details: function()
		{
			jQuery('#event-wrapper').show();
			setTimeout(function(){ jQuery('section').removeClass('flip'); }, 250);
			
		}
	}
})();

jQuery(document).ready(function(){
	html5dev.init();
});

window.addEventListener('load',function(){ html5dev.update_layout(); });
window.addEventListener('orientationchange',function(){html5dev.update_layout(); });
