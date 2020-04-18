function itemOnly(iid) {
  return ingredient.custom(function(i) { return i.id.equals(iid); });
}

events.listenAll(["postinit", "loaded"], function (event) {
  //Custom interactions where action(event) is fired when you right-click on block with optional item (Have to be first)
  addInteraction({"item": "ironchest:wood_iron_chest_upgrade", "block": block.id("minecraft:chest"), "action": function (event) {
    event.player.data.ftbquests.addProgress("f126973c", 1);
    event.removeGameStage("storage_7");
    event.addGameStage("storage_8");
    return true;
  }});

  addInteraction({"item": "minecraft:water_bucket", "block": block.id("botania:altar"), "action": function (event) {
    event.removeGameStage("b_water");
    event.addGameStage("b1");
    return true;
  }});

  addInteraction({"block": block.id("minecraft:lever"), "action": function (event) {
    if (event.hasGameStage("auto_lever")) {
      if (event.block.properties.get("powered") == "false") {
        event.removeGameStage("auto_lever");
        event.player.give("thermalfoundation:wrench");
        event.addGameStage("auto_5");
        return true;
      } else {
        return false;
      }
    } else {
      event.player.statusMessage = text.red("Can't flip the lever, until you have completed the Filtering quest.");
      return false;
    }
  }});

  addInteraction({"item": "thermalfoundation:wrench", "action": function (event) {
    return !event.player.sneaking && block.id("thermalexpansion:tank").check(event.block);
  }});

  addInteraction({"block": block.id("draconicevolution:placed_item"), "action": function (event) {
    if (event.server) {
      event.player.tell(text.of("You've found an easter egg!").green());
      event.player.addXPLevels(5);
      event.block.set("minecraft:air");
      event.server.schedule(SECOND, event.player, function (callback) {
        callback.data.inventory.clear(itemOnly("quark:parrot_egg"));
      });
    }
    return false;
  }});

  addInteraction({"block": block.id("botania:spreader"), "item": itemOnly("botania:twigwand"), "action": function (event) {
    if(event.player.sneaking && !event.player.data.ftbquests.isCompleted("532efd73")) {
      event.addGameStage("school_clicked_spreader");
      event.removeGameStage("b2");
      return true;
    }

    return false;
  }});

  addInteraction({"block": block.id("botania:pool"), "item": itemOnly("botania:twigwand"), "action": function (event) {
    if(event.player.sneaking && event.hasGameStage("school_clicked_spreader")) {
      event.removeGameStage("school_clicked_spreader");
      return true;
    }

    return false;
  }});

  //Allow placing down blocks or right-clicking on blocks with items
  addInteraction({"item": "actuallyadditions:block_coal_generator", "block": block.id("minecraft:iron_block")});
  addInteraction({"item": "thermaldynamics:duct_0", "block": block.id("minecraft:wool")});
  addInteraction({"item": "minecraft:crafting_table", "block": block.id("minecraft:wool")});
  addInteraction({"item": "astralsorcery:blockaltar", "block": block.id("minecraft:quartz_block")});
  addInteraction({"item": itemOnly("botania:specialflower"), "block": block.id("minecraft:grass")});
  addInteraction({"item": "minecraft:bucket", "block": block.id("thermalexpansion:tank")});
  addInteraction({"item": "minecraft:water_bucket", "block": block.id("thermalexpansion:tank")});
  addInteraction({"item": itemOnly("thermalexpansion:machine"), "block": block.id("minecraft:lapis_block")});

  //Allow right-clicking on blocks (Have to be last, because they ignore item, and some others require item)
  addInteraction({"block": block.id("minecraft:chest")});
  addInteraction({"block": block.id("minecraft:trapped_chest")});
  addInteraction({"block": block.id("ironchest:iron_chest")});
  addInteraction({"block": block.id("actuallyadditions:block_giant_chest")});
  addInteraction({"block": block.id("storagedrawers:compdrawers")});
  addInteraction({"block": block.id("storagedrawers:basicdrawers")});
  addInteraction({"block": block.id("refinedstorage:grid")});
  addInteraction({"block": block.id("refinedstorage:disk_drive")});
  addInteraction({"block": block.id("thermaldynamics:duct_32")});
  addInteraction({"block": block.id("thermaldynamics:duct_16")});
  addInteraction({"block": block.id("actuallyadditions:block_coal_generator")});
  addInteraction({"block": block.id("thermalexpansion:machine")});
  addInteraction({"block": block.id("minecraft:crafting_table")});
  addInteraction({"block": block.id("astralsorcery:blockaltar")});
  addInteraction({"block": block.id("botania:altar")});

  addInteraction({"item": "minecraft:water_bucket", "action": function(event){
    return false;
  }});

  addLeftClick(block.id("storagedrawers:compdrawers"));
  addLeftClick(block.id("storagedrawers:basicdrawers"));
});
