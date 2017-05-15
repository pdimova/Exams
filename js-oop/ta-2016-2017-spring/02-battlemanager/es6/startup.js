const MANAGER = new (require('./models//battlemanager'));

const battlemanager = MANAGER;

const cyki = battlemanager.getCommander('Cyki', 'good', 15),
    koce = battlemanager.getCommander('Koce', 'good', 20);

battlemanager.addCommanders(cyki, koce);

const penguins = battlemanager.getArmyUnit({
    name: 'Penguin Warriors',
    alignment: 'neutral',
    damage: 15,
    health: 40,
    speed: 10,
    count: 120
});
const cavalry = battlemanager.getArmyUnit({
    name: 'Horsemen',
    alignment: 'good',
    damage: 40,
    health: 60,
    speed: 50,
    count: 50
});

const openVim = battlemanager.getSpell('Open vim', 10, target => target.damage -= 5),
    haste = battlemanager.getSpell('Haste', 5, target => target.speed += 5),
    callReinforcements = battlemanager.getSpell('Reinforcements', 10, target => target.count += 5)

battlemanager
    .addArmyUnitTo('Cyki', penguins)
    .addSpellsTo('Cyki', openVim, haste)
    .addArmyUnitTo('Koce', cavalry)
    .addSpellsTo('Koce', haste, callReinforcements)
    .spellcast('Koce', 'Haste', cavalry.id)
    .spellcast('Cyki', 'OpenVim', cavalry.id)
    .battle(penguins, cavalry)
    .spellcast('Koce', 'Reinforcements', cavalry.id);