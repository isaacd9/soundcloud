
var SampleSidebarView = new KONtx.Class({
	ClassName: 'SampleSidebarView',
	
	Extends: KONtx.system.SidebarView,
	
	createView: function() {
		this.controls.button1 = new KONtx.control.TextButton({
			label: $_('play_one'),
			guid: "button1",
			events: {
				onSelect: function(event) {
					KONtx.application.loadView('view-Player', { PlaylistID: 1 });
				}
			},
			styles: {
				width: Theme.viewSpecs.SIDE_BAR.width,
				height: KONtx.utility.scale(35),
				vOffset: 0,
			}
		}).appendTo(this);
		
		this.controls.button2 = new KONtx.control.TextButton({
			label: $_('play_two'),
			guid: "button2",
			events: {
				onSelect: function(event) {
					KONtx.application.loadView('view-Player', { PlaylistID: 2 });
				}
			},
			styles: {
				width: Theme.viewSpecs.SIDE_BAR.width,
				height: KONtx.utility.scale(35),
				vOffset: this.controls.button1.outerHeight,
			}
		}).appendTo(this);
		
		var offset = this.controls.button2.outerHeight;
		new KONtx.control.EmptySpace({
			styles: {
				vOffset: offset,
				height: Theme.viewSpecs.SIDE_BAR.height - offset
			},
		}).appendTo(this);
	},
});
