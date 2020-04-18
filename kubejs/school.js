var allowedCommands = utils.newSet();
allowedCommands.add("quit_school");
allowedCommands.add("reset_school");
allowedCommands.add("w");
allowedCommands.add("msg");
allowedCommands.add("tell");
allowedCommands.add("gamemode");
allowedCommands.add("ftbquests");
allowedCommands.add("nbtedit");
allowedCommands.add("kick");
allowedCommands.add("op");
allowedCommands.add("deop");
allowedCommands.add("ban");
allowedCommands.add("stop");
allowedCommands.add("help");
allowedCommands.add("gamestage");
allowedCommands.add("kubejs");
allowedCommands.add("give");

var revokedAdvancements = utils.newSet();
revokedAdvancements.add("astralsorcery:root");
revokedAdvancements.add("minecraft:story/root");
revokedAdvancements.add("minecraft:story/mine_stone");
revokedAdvancements.add("minecraft:story/smelt_iron");
revokedAdvancements.add("refinedstorage:storing_items");
revokedAdvancements.add("botania:main/root");
revokedAdvancements.add("botania:main/flower_pickup");
revokedAdvancements.add("botania:main/generating_flower");
revokedAdvancements.add("botania:challenge/root");

events.listen("ftbacademy.school.started", function (event) {
  log.info(event.player.name + " started school! Restart: " + event.restart);
  if (event.restart) {
    event.player.data.ftbquests.reset(1);
    event.player.inventory.clear();
    event.player.data.gamestages.clear();
  }

  event.player.give("ftbquests:book");
  event.addGameStage("ftba_welcome_to_academy");
  event.addGameStage("in_first_room");
});

events.listen("ftbacademy.school.ended", function (event) {
  event.player.inventory.clear();
  event.player.give("ftbquests:book");
  var guideBook = item.of("minecraft:book");
  guideBook.nbt({
    guide: ""
  });
  guideBook.setTranslatableName("item.ftbguides.book.name");
  event.player.give(guideBook);

  revokedAdvancements.forEach(function (a) {
    event.player.revokeAdvancement(a);
  });

  event.server.runCommand("/as reset " + event.player.name);
  event.server.tell(text.translate("ftbacademymod.graduated", event.player.displayName.darkAqua()));
  event.player.data.gamestages.clear();
  log.info(event.player.name + " finished school!");
});

events.listen("player.tick", function (event) {
  if (event.player.server && event.player.ticksExisted % 20 == 0 && inSchool(event.player)) {
    event.player.addFood(20, 1);
  }
});

events.listen("command.run", function (event) {
  if (event.player && inSchool(event.player) && !allowedCommands.contains(event.command)) {
    event.sender.tell(text.translate("ftbacademymod.command_error"));
    event.cancel();
  }
});

events.listen("ftbquests.completed.clear", function (event) {
  event.onlineMembers.first.inventory.clear(ingredient.of("ftbquests:book").not());
});

events.listen("ftbquests.completed.ding", function (event) {
  event.onlineMembers.playSound("entity.experience_orb.pickup");
});

events.listen("ftbquests.completed.631a1d68", function (event) {
  event.onlineMembers.tell(text.of("This section has less in-world information, you will have to rely on the quests and using JEI").blue().bold());
});

events.listen("player.chest.closed", function (event) {
  if(event.server && inSchool(event.player) && event.inventory.empty && (event.hasGameStage("a1") || event.hasGameStage("b_petal"))) {
    event.world.getBlock(event.wrappedInventory.func_174877_v()).set("minecraft:air");
  }
});