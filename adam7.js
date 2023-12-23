
    const manifestUri =
    'https://n-22-3.dcs.redcdn.pl/livedash/o2/tvnplayer/live/cn/live.isml/playlist.mpd?indexMode=&dummyfile=&server_side_events=0&dvr=7200000';
    async function init() {
    // When using the UI, the player is made automatically by the UI object.
    const video = document.getElementById('video');
    const ui = video['ui'];
    const controls = ui.getControls();
    const player = controls.getPlayer();

    // Attach player and ui to the window to make it easy to access in the JS console.
    window.player = player;
    window.ui = ui;

    // Listen for error events.
    player.addEventListener('error', onPlayerErrorEvent);
    player.configure({
      drm: {
        clearKeys: {
          "0e014e56b3da80d3976f403144ac03f4": "8fb430f68b7d5750ddd92de70cd16ce7"
        }
      }
    });
    controls.addEventListener('error', onUIErrorEvent);

    // Try to load a manifest.
    // This is an asynchronous process.
    try {
        await player.load(manifestUri);
        // This runs if the asynchronous load is successful.
    } catch (error) {
        onPlayerError(error);
    }
    }

    function onPlayerErrorEvent(errorEvent) {
    // Extract the shaka.util.Error object from the event.
    onPlayerError(event.detail);
    }

    function onPlayerError(error) {
    // Handle player error
    console.error('Error code', error.code, 'object', error);
    }

    function onUIErrorEvent(errorEvent) {
    // Extract the shaka.util.Error object from the event.
    onPlayerError(event.detail);
    }

    function initFailed(errorEvent) {
    // Handle the failure to load; errorEvent.detail.reasonCode has a
    // shaka.ui.FailReasonCode describing why.
    console.error('Unable to load the UI library!');
    }

    // Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.
    document.addEventListener('shaka-ui-loaded', init);
    // Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
    // to load (e.g. due to lack of browser support).
    document.addEventListener('shaka-ui-load-failed', initFailed);
