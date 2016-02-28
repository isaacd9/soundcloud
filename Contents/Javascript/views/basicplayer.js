
var BasicPlayerView = new KONtx.Class({
	ClassName: 'BasicPlayerView',
	
	Extends: KONtx.system.FullscreenView,
	
	initView: function() {
		KONtx.mediaplayer.initialize();
		
		this.dialogs = {};
		
		this.dialogs.error = new KONtx.dialogs.Alert({
			title: $_('video_error_dialog_title'),
			message: $_('video_error_dialog_message'),
			buttons: [
				{ label: $_('dialog_retry_button'), callback: function() {
					KONtx.mediaplayer.playlist.start();
				} },
				{ label: $_('dialog_cancel_button'), callback: function() {
					KONtx.application.previousView();
				} },
			] 
		});
	},
	
	createView: function() {
		this.controls.overlay = new KONtx.control.MediaTransportOverlay().appendTo(this);
	},
	
	focusView: function() {
		this.controls.overlay.focus();
	},
	
	updateView: function() {	
		this._registerHandlers();
		this._resetViewport();
		this._handlePlaylistUpdate(this.persist.PlaylistID);
	},
	
	hideView: function() {
		this._unregisterHandlers();
	},
	
	_handlePlaylistUpdate: function(playlistID) {
		if(KONtx.mediaplayer.isPlaylistEntryActive) {
			if(!playlistID) {
				// we have no new playlist we've been asked to play, so keep playing what we already are playing
				return;
			}
			if(playlistID == KONtx.mediaplayer.playlist.get().PlaylistID) {
				// we have been asked to play the same playlist we are already playing, so just keeping playing it
				return;
			}
		}
		
		// Otherwise, we need to start this new playlist
		this._startPlaylist(playlistID);
	},
	
	_startPlaylist: function(playlistID) {
		this.controls.overlay.resetState();
		
		KONtx.mediaplayer.playlist.set(this._createPlaylist(playlistID));
		
		KONtx.mediaplayer.setConnectionBandwidth(KONtx.messages.fetch("bandwidth") || 1);
		KONtx.mediaplayer.playlist.start();
	},
	
	_createPlaylist: function(playlistID) {
		var playlist = new KONtx.media.Playlist(); 
		playlist.PlaylistID = playlistID;
		
		var json = KONtx.messages.fetch("playlist." + playlistID);
		for each(var entry in json.entries) {
			var playlistEntry = new KONtx.media.PlaylistEntry(entry);
			playlistEntry.entryID = entry.entryID; 
			playlist.addEntry(playlistEntry);
		}
		
		return playlist;
	},
	
	_resetViewport: function() {
		var bounds = KONtx.mediaplayer.getDefaultViewportBounds();
		KONtx.mediaplayer.setViewportBounds(bounds);
	},
	
	_registerHandlers: function() {
		if(this._boundPlayerHandler) {
			this._unregisterHandlers();
		}
		this._boundPlayerHandler = this._playerDispatcher.subscribeTo(KONtx.mediaplayer, ['onStateChange', 'onPlaylistEnd', 'onStreamLoadError'], this);
	},
	
	_unregisterHandlers: function() {
		if(this._boundPlayerHandler) {
			this._boundPlayerHandler.unsubscribeFrom(KONtx.mediaplayer, ['onStateChange', 'onPlaylistEnd', 'onStreamLoadError']);
			this._boundPlayerHandler = null;
		}
	},
	
	_playerDispatcher: function(event) {
		switch(event.type) {
			case 'onStateChange':
				if(event.payload.newState == KONtx.mediaplayer.constants.states.STOP) {
					KONtx.application.previousView();
				}
				if(event.payload.newState == KONtx.mediaplayer.constants.states.ERROR || event.payload.newState == KONtx.mediaplayer.constants.states.UNKNOWN) {
					this.dialogs.error.show();
				}
				break;
			case 'onPlaylistEnd':
				KONtx.application.previousView();				
				break;
			case 'onStreamLoadError':
				this.dialogs.error.show();
				break;
			default:
				break;
		}
	}
});
