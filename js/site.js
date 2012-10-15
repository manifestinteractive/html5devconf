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
			
			// Live bind click events to table items, bind on single element and let bubble up with nodetype detection
			var time_blocks = [];
			var sessions = _.filter(html5devconf_data.schedule, function(data) { return data.day == 1; });
			for(i in html5devconf_data.time_blocks){
				console.log(html5devconf_data.time_blocks[i]);
				var time_block = _.filter(sessions, function(session) { return session.time == html5devconf_data.time_blocks[i]; });
				if( time_block ) time_blocks.push({ time:html5devconf_data.time_blocks[i], sessions:time_block});
			}
			var html = _.template($('#calendar-template').html(), {title:'Day 1 - Monday October 15', time_blocks: time_blocks});
			$( html ).appendTo($('#event-list'));
			
			var time_blocks = [];
			var sessions = _.filter(html5devconf_data.schedule, function(data) { return data.day == 2; });
			for(i in html5devconf_data.time_blocks){
				var time_block = _.filter(sessions, function(session) { return session.time == html5devconf_data.time_blocks[i]; });
				if( time_block ) time_blocks.push({ time:html5devconf_data.time_blocks[i], sessions:time_block});
			}
			var html = _.template($('#calendar-template').html() , {title:'Day 2 - Monday October 16', time_blocks: time_blocks});
			$( html ).appendTo($('#event-list'));
			
			html5dev.update_layout();
		},
		update_layout: function()
		{
			
		}
	}
})();

jQuery(document).ready(function(){
	html5dev.init();
});

window.addEventListener('load',function(){ html5dev.update_layout(); });
window.addEventListener('orientationchange',function(){html5dev.update_layout(); });
