
$API = function() {
	
	// this code here is just a stub for now
	// future samples will contain more real examples
	
	var playlists = [
		{ ID: 1, entries: [ { url: "http://cosmos.bcst.yahoo.com/getPlaylist.php?node_id=11886648&bitrate=300&tech=wmp", bitrate: 300, entryID: 1}]},
		{ ID: 2, entries: [ { url: "http://cosmos.bcst.yahoo.com/getPlaylist.php?node_id=11886648&bitrate=300&tech=wmp", bitrate: 300, entryID: 1}, { url: "http://cosmos.bcst.yahoo.com/getPlaylist.php?node_id=12101875&bitrate=300&tech=wmp", bitrate: 300, entryID: 2}]},
	];
	
	return {
		fetchPlaylists: function() {
			KONtx.messages.store("playlists", playlists);
			for each(var playlist in playlists) {
				KONtx.messages.store("playlist." + playlist.ID, playlist);
			}
		}
	}
}();
