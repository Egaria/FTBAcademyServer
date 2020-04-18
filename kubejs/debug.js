//Show gamestages as overlay
events.listenAll(["gamestage.added", "gamestage.removed", "player.logged_in"], function (event) {
  if (!isDev(event.world)) {
    return;
  }

  var l = event.player.data.gamestages.list;

  if (!l.empty) {
    var o = utils.overlay("gamestages", ["Game Stages"]);

    l.forEach(function (li) {
      o.text.add(text.blue(li).component());
    });

    event.player.openOverlay(o);
  } else {
    event.player.closeOverlay("gamestages");
  }
});

//Reload script when world restarts
events.listen("server.unload", function (event) {
  if (isDev(event.server.overworld)) {
    event.server.runCommand("/kubejs reload");
  }
});