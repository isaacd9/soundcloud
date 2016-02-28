
var SampleSnippetView = new KONtx.Class({
	ClassName: 'SnippetView',
	
	Extends: KONtx.system.AnchorSnippetView,
		
	createView: function() {
		this.controls.text = new KONtx.element.Text({
			label: $_('media_player_snippet'),
			styles: {
				color: "#ffffff",
				fontSize: KONtx.utility.scale(20),
				vAlign: "center",
				hAlign: "center"
			},
		}).appendTo(this);
	},
});
