(function(){
	var regex = /api:"room.vote"/i;
	var to_s = Function.prototype.toString;

	var room = (function(tt){
		for (var i in tt)
			if (tt[i].roomId)
				return tt[i];
	})(turntable);

	var voter = (function(r){
		for (var i in r){
			if (typeof r[i] == 'function'){
				if (regex.test(to_s.call(r[i]))){
					return r[i];
				}
			}
		}
	})(room);

	turntable.socket.on('message', function(msg){
		var json = JSON.parse(msg);

		if (json.command == 'newsong'){
			(function(song_id){
				setTimeout(function(){
					// is it song the same?
					if (song_id == json.room.metadata.current_song._id){
						voter.call(room, 'up');
					}
				}, 15000);

			})(json.room.metadata.current_song._id);
		}
	});
})();
