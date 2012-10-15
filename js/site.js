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