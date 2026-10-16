import fs from 'node:fs';

const overlordDeck = {
  id: "dz-ss15-dragonic-overlord",
  name: "Break Away Start Deck - Dragonic Overlord",
  code: "DZ-SS15",
  nation: "Dragon Empire",
  description: "The violent dragon of the empire returns with blazing re-standing fury! Master the Kai Fighter Icon synergy, Energy Generator mechanics, and burn the opponent's entire board to ash with Dragonic Overlord.",
  rideDeck: [
    { cardNo: "DZ-SS15/004", name: "Lizard Soldier, Conroe", grade: 0 },
    { cardNo: "DZ-SS15/003", name: "Embodiment of Armor, Bahr", grade: 1 },
    { cardNo: "DZ-SS15/002", name: "Dragon Knight, Nehalem", grade: 2 },
    { cardNo: "DZ-SS15/001", name: "Dragonic Overlord", grade: 3 }
  ],
  crest: {
    cardNo: "DZ-SS15/005",
    name: "Energy Generator",
    grade: null
  },
  gDeck: [],
  mainDeck: [
    { cardNo: "DZ-SS15/001", name: "Dragonic Overlord", count: 3, category: "Grade 3" },
    { cardNo: "DZ-SS15/006", name: "Vortex Dragon", count: 4, category: "Grade 3" },
    { cardNo: "DZ-SS15/002", name: "Dragon Knight, Nehalem", count: 3, category: "Grade 2" },
    { cardNo: "DZ-SS15/007", name: "Great Flame Axe of Ambitious Scales, Colgaflan", count: 1, category: "Grade 2" },
    { cardNo: "DZ-SS15/008", name: "Berserk Dragon", count: 4, category: "Grade 2" },
    { cardNo: "DZ-SS15/009", name: "Wyvern Strike, Tejas", count: 4, category: "Grade 2" },
    { cardNo: "DZ-SS15/003", name: "Embodiment of Armor, Bahr", count: 2, category: "Grade 1" },
    { cardNo: "DZ-SS15/010", name: "Dragon Monk, Gojo", count: 4, category: "Grade 1" },
    { cardNo: "DZ-SS15/011", name: "Wyvern Strike, Jarran", count: 4, category: "Grade 1" },
    { cardNo: "DZ-SS15/012", name: "Wyvern Guard, Barri", count: 4, category: "Grade 1 (Sentinel)" },
    { cardNo: "DZ-SS15/018", name: "Forbidoll Surrogate", count: 1, category: "Order (Regalis Piece)" },
    { cardNo: "DZ-SS15/013", name: "Dragon Deity King of Resurgence, Dragveda", count: 1, category: "Trigger (Over)" },
    { cardNo: "DZ-SS15/014", name: "Demonic Dragon Mage, Rakshasa", count: 4, category: "Trigger (Critical)" },
    { cardNo: "DZ-SS15/015", name: "Embodiment of Spear, Tahr", count: 4, category: "Trigger (Critical)" },
    { cardNo: "DZ-SS15/016", name: "Dragon Dancer, Monica", count: 3, category: "Trigger (Draw)" },
    { cardNo: "DZ-SS15/017", name: "Dragon Monk, Genjo", count: 4, category: "Trigger (Heal)" }
  ]
};

const harriDeck = {
  id: "dz-ss02-harri",
  name: "Stride Deckset Harri",
  code: "DZ-SS02",
  nation: "Dark States",
  description: "Step right up to the grand Pale Moon Magia Circus! Command Masked Magician, Harri and Stride into Dragon Masquerade, Harri, orchestrating dazzling soul-calling combos and multi-attacks with the Harri Stride Crest.",
  rideDeck: [
    { cardNo: "DZ-SS02/004", name: "Happiness Collector", grade: 0 },
    { cardNo: "DZ-SS02/003", name: "Moonlight Melody Tamer, Betty", grade: 1 },
    { cardNo: "DZ-SS02/002", name: "Card Dealer, Jacqueline", grade: 2 },
    { cardNo: "DZ-SS02/001", name: "Masked Magician, Harri", grade: 3 }
  ],
  crest: {
    cardNo: "DZ-SS02/T01",
    name: "Masked Magician, Harri (Crest)",
    grade: null
  },
  gDeck: [
    { cardNo: "DZ-SS02/017", name: "Dragon Masquerade, Harri", count: 4, category: "Stride" },
    { cardNo: "DZ-SS02/018", name: "Jester Demonic Dragon, Lunatec Dragon", count: 4, category: "Stride" }
  ],
  mainDeck: [
    { cardNo: "DZ-SS02/001", name: "Masked Magician, Harri", count: 3, category: "Grade 3" },
    { cardNo: "DZ-SS02/005", name: "Flying Manticore", count: 4, category: "Grade 3" },
    { cardNo: "DZ-SS02/002", name: "Card Dealer, Jacqueline", count: 3, category: "Grade 2" },
    { cardNo: "DZ-SS02/006", name: "Direful Doll, Orneta", count: 4, category: "Grade 2" },
    { cardNo: "DZ-SS02/007", name: "Darkside Princess", count: 4, category: "Grade 2" },
    { cardNo: "DZ-SS02/008", name: "Cutie Paratrooper", count: 4, category: "Grade 1" },
    { cardNo: "DZ-SS02/009", name: "Masquerade Bunny", count: 4, category: "Grade 1" },
    { cardNo: "DZ-SS02/010", name: "Lunging Assistant", count: 4, category: "Grade 1" },
    { cardNo: "DZ-SS02/011", name: "Darkside Mirror Master", count: 4, category: "Grade 1 (Sentinel)" },
    { cardNo: "DZ-SS02/012", name: "Hades Dragon Deity of Resentment, Gallmageheld", count: 1, category: "Trigger (Over)" },
    { cardNo: "DZ-SS02/013", name: "Swanky Enthraller", count: 4, category: "Trigger (Critical)" },
    { cardNo: "DZ-SS02/014", name: "Silky Sky Actress", count: 4, category: "Trigger (Draw)" },
    { cardNo: "DZ-SS02/015", name: "Intrepid Spinner", count: 3, category: "Trigger (Front)" },
    { cardNo: "DZ-SS02/016", name: "Gambling Juggler", count: 4, category: "Trigger (Heal)" }
  ]
};

fs.writeFileSync('src/data/overlordDeck.json', JSON.stringify(overlordDeck, null, 2), 'utf8');
fs.writeFileSync('src/data/harriDeck.json', JSON.stringify(harriDeck, null, 2), 'utf8');
console.log('Successfully created overlordDeck.json and harriDeck.json');
