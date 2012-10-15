var html5dev = (function(){

	var vars = {
		interested: []
	};

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
		is_interested: function(session_id){
			return _.indexOf(vars.interested, session_id) !== -1;
		},
		init: function()
		{
			if('localStorage' in window && window['localStorage'] !== null){
				var interested = window.localStorage.getItem('interested');
				if( interested ){
					vars.interested = JSON.parse(interested);
				}
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
			
			$('#interested-btn').live('click',function(){
				var $this = $(this);
				var interested = $this.is('.active');
				var id = $this.closest('.event-detail-root').data('id');
				if( interested ){
					vars.interested.push(id);
					$('#event_'+id+' .status').addClass('checked');
				}else{
					vars.interested = _.filter(vars.interested, function(session_id){ return session_id != id; });
					$('#event_'+id+' .status').removeClass('checked');
				}
				if('localStorage' in window && window['localStorage'] !== null){
					window.localStorage.setItem('interested', JSON.stringify(vars.interested));
				}
			});
			
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
			
			window.location.hash = 'event-detail-' + id;
			
			setTimeout(function(){ jQuery('#event-wrapper').hide(); }, 250);
			
			events.analytics();
		},
		hide_details: function(id)
		{
			jQuery('#event-wrapper').show();
			setTimeout(function(){ jQuery('section').removeClass('flip'); }, 250);
			
			window.location.hash = 'event-' + id;
			
			events.analytics();
		}
	}
})();

jQuery(document).ready(function(){
	html5dev.init();
});

window.addEventListener('load',function(){ html5dev.update_layout(); });
window.addEventListener('orientationchange',function(){html5dev.update_layout(); });
