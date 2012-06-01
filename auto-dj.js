(function(){
	var api = (function(win){
		for (var i in win)
			if (win[i].become_dj)
				return win[i];

	})(window);

	turntable.socket.on('message', function(msg){
		var json = JSON.parse(msg);

		if (json.command == 'rem_dj'){
			// TODO poll if not visible right away?
			if (api.become_dj.is(':visible')){
				var spot = api.become_dj.data('spot');
				api.callback('become_dj', spot);
			
				turntable.socket.removeListener('message', arguments.callee);
			}
		}
	});
})();
