function isDev(world) {
  return world.gameRules.getBoolean("ftba_dev");
}

function inSchool(player) {
  return !player.creative && ftbacademy.isInSchool(player);
}

var schoolOverlays = utils.newMap();
var interactionList = utils.newList();
var leftClickList = utils.newList();

function addOverlay(id, text) {
  var o = utils.overlay(id, text);
  schoolOverlays[id] = o;
  return o;
}

function addSimpleOverlay(id, titleKey, descKey) {
  return addOverlay(id, [text.translate(titleKey).bold().underlined(), "", text.translate(descKey).aqua()]).color("#0B1544");
}

function addReallyComplicatedOverlay(id, titleKey, descKey1, descKey2) {
  return addOverlay(id, [text.translate(titleKey).bold().underlined(), "", text.translate(descKey1).aqua(), text.translate(descKey2).aqua()]).color("#0B1544");
}

function addInteraction(i) {
  if(i.item) {
    i.item = ingredient.of(i.item);
  }

  interactionList.add(i);
}

function addLeftClick(b) {
  leftClickList.add(b);
}

function findInteraction(b, i) {
  for each(var li in interactionList) {
    if((!li.block || li.block.check(b)) && (!li.item || li.item.test(i))) {
      return li;
    }
  }
}

function canLeftClick(b) {
  for each(var li in leftClickList) {
    if(li.check(b)) {
      return li;
    }
  }
  
  return false;
}