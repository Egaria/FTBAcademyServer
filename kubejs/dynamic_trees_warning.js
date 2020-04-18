events.listen("player.logged_in", function (event) {
  event.player.tell(text.of("Warning! Dynamic Trees will be removed in a future update!").hover(text.of("If you want to disable this warning, delete kubejs/dynamic_trees_warning.js file")).red());
});