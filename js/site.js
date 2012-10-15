$(document).ready(function(){
	
	var store = null;
	
	if('localStorage' in window && window['localStorage'] !== null){
		store = window.localStorage;
		
		my_events = store.get('my_events');
		
	
	}
	
	
	// Populate JSON object with user preferences for event attendence
	
	// Build HTML table
	
	// Live bind click events to table items, bind on single element and let bubble up with nodetype detection
	
	
});
