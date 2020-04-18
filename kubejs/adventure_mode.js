//Block events
events.listen("block.right_click", function (event) {
  if (inSchool(event.player)) {
    if (event.hand == OFF_HAND) {
      event.cancel();
      return;
    }

    var i = findInteraction(event.block, event.item);

    if (i) {
      if(event.player.server && isDev(event.world)) {
        log.info("+ Allowed " + i.block + " with " + i.item);
      }
      
      if (i.action && !i.action(event)) {
        event.cancel();
      }
    } else {
      if(event.player.server && isDev(event.world)) {
        log.info("- Denied " + event.block + " with " + event.item);
      }

      event.cancel();
    }
  }
});

events.listen("block.break", function (event) {
  if (inSchool(event.player)) {
    event.cancel();
  }
});

events.listen("block.left_click", function (event) {
  if (inSchool(event.player) && !canLeftClick(event.block)) {
    event.cancel();
  }
});

events.listen("item.right_click", function (event) {
  if (event.item.equals("ftbquests:book")) {
    if (event.hasGameStage("ftba_welcome_to_academy")) {
      event.removeGameStage("ftba_welcome_to_academy");
      if (event.player.server) {
        event.player.data.ftbtutorialmod.openTutorial("ftbacademy:quests");
      }
      event.cancel();
    }
  } else if (inSchool(event.player) && (event.item.equals("minecraft:ender_pearl") || event.item.equals("minecraft:water_bucket"))) {
    event.cancel();
  }
});