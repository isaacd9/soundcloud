
$preferences = function() {
	var options = {};
	var current_options_version = 1;
	
	var staticInit = function() {
		fetchConfig();
	}();
	
	function fetchConfig() {
		try {
			options = JSON.parse(currentAppData.get("options"));
		} catch(e) {
			initConfig();
		}
		
		// here you would add logic to migrate old data when you incremented the options version
		
		if(options.version != current_options_version) {
			initConfig();
		}		
	}
	
	function initConfig() {
		options = {
			'previousBitrate': 0,
			'version': current_options_version,
		}
	};
	
	function saveConfig() {
		try {
			currentAppData.set("options", JSON.stringify(options));
		} catch (e) {
			log("\n\n!!!!!!!!!!!!!!!!!Error saving config preferences!\n!!!!!!!!!!!!!!!!!!!!!!\n\n");
		}
	}
	
	function saveBandwidth(speed) {
		options.previousBitrate = speed;
		saveConfig();
		log('');log('');log('');
		log('Detected Connection Speed: ', speed);
		log('');log('');log('');
		KONtx.messages.store("bandwidthError", false);
		KONtx.messages.store("bandwidth", speed);
	}
	
	function speedTestError(xhr) {
		log('');log('');log('');
		log('Bandwidth detection error: ', $dump(xhr,3));
		log('');log('');log('');
		KONtx.messages.store("bandwidthError", true);
	}
	
	return {
		'checkConnectionBitrate': function() {
			fetchConfig();
			KONtx.messages.store("bandwidth", options.previousBitrate);
			KONtx.speedtest.profileConnection(saveBandwidth.bindTo(this), null, speedTestError.bindTo(this));
		}
	}
}();
