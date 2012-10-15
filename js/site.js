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
				store = window.localStorage;
				my_events = store.get('my_events');
			}
			
			// Populate JSON object with user preferences for event attendence
			
			// Build HTML table
			
			// Live bind click events to table items, bind on single element and let bubble up with nodetype detection
			
			
			
			
			html5dev.update_layout();
		},
		update_layout: function()
		{
			
		},
		show_details: function()
		{
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
