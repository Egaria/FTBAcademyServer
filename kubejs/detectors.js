ftbacademy.addDetector("crafting_table", block.id("minecraft:crafting_table"));
ftbacademy.addDetector("first_item_duct", ftbacademy.duct(25, ["minecraft:dirt", "minecraft:iron_ore", "minecraft:gold_ore", "minecraft:diamond_ore"]));
ftbacademy.addDetector("second_item_duct", ftbacademy.duct(24, ["minecraft:dirt"]));
ftbacademy.addDetector("third_item_duct", ftbacademy.duct(24, ["minecraft:iron_ore", "minecraft:gold_ore", "minecraft:diamond_ore"]));
ftbacademy.addDetector("flux_duct", block.entity("thermaldynamics:duct_energy_basic"));
ftbacademy.addDetector("generator", block.entity("actuallyadditions:coalgenerator"));
ftbacademy.addDetector("generator_fuel", block.entity("actuallyadditions:coalgenerator").data(ftbacademy.intMatchOrMore("Energy", 1)));
ftbacademy.addDetector("furnace", block.entity("thermalexpansion:machine_furnace").data(ftbacademy.intMatchOrMore("Energy", 1)));
ftbacademy.addDetector("tank", block.entity("thermalexpansion:storage_tank").data(ftbacademy.intMatchOrMore("Amount", 1)));
ftbacademy.addDetector("luminous_crafting_table", block.entity("astralsorcery:tilealtar"));
ftbacademy.addDetector("endo", block.entity("botania:specialflower"));

ftbacademy.addDetector("endo_fuel", block.entity("botania:specialflower").data(function (data) {
  return data.get("subTileCmp").asCompound().get("burnTime").asInt() >= 1;
}));

ftbacademy.addDetector("mana", block.entity("botania:pool").data(ftbacademy.intMatchOrMore("mana", 1))).after(function (data) {
  data.set("mana", 20000);
});