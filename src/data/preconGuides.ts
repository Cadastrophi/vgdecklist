export interface PreconDeckInfo {
  id: string;
  name: string;
  code: string;
  nation: string;
  clan: string;
  keyBoss: string;
  iconColor: string;
  bannerImage: string;
  tagline: string;
  overview: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  mechanics: {
    title: string;
    description: string;
  }[];
  pros: string[];
  cons: string[];
  keyCombos: {
    name: string;
    cards: string[];
    steps: string[];
  }[];
  recommendedUpgrades: {
    cardName: string;
    role: string;
    why: string;
  }[];
}

export interface PilotingStep {
  step: number;
  phase: string;
  title: string;
  summary: string;
  cardsInvolved: string[];
  visualDiagram?: string;
  bulletPoints: string[];
  proTip: string;
  interactiveScenario?: {
    question: string;
    options: {
      text: string;
      isCorrect: boolean;
      explanation: string;
    }[];
  };
}

export const PRECON_DECKS: PreconDeckInfo[] = [
  {
    id: 'blaster-blade',
    name: 'Break Away Start Deck - Blaster Blade',
    code: 'DZ-SS14',
    nation: 'Keter Sanctuary',
    clan: 'Royal Paladin',
    keyBoss: 'King of Knights, Alfred & Blaster Blade & Soul Saver Dragon',
    iconColor: 'from-blue-600 via-sky-500 to-amber-400',
    bannerImage: 'https://static.wikia.nocookie.net/cardfight/images/3/30/DZ-SS14-002_%28Sample%29.png/revision/latest',
    tagline: 'Stand up, my avatar! Call your allies, trigger universal Persona Ride, and deliver justice with Holy Charging Roar.',
    overview: 'Break Away Start Deck - Blaster Blade marks the historic return of Royal Paladin\'s iconic vanguard in the DZ Standard format. Centered around the Aichi Icon mechanic and the modern Energy Generator Crest, this deck combines King of Knights Alfred\'s twin-call offensive, Blaster Blade\'s pinpoint retire and draw for either Counter Blast 1 or Energy Blast 3, and Soul Saver Dragon\'s crushing +10,000 multi-column power surge.',
    difficulty: 'Beginner',
    mechanics: [
      {
        title: 'Aichi Icon Synergy & Universal Persona Ride',
        description: 'Alfred allows normal riding over any Grade 3 with an Aichi icon (such as Soul Saver Dragon) to trigger Persona Ride (+10k front row & draw 1), maintaining relentless aggression and card advantage.'
      },
      {
        title: 'Energy Generator Crest (EB Engine)',
        description: 'Earn 3 Energy per turn up to 10 max. Spend Energy Blast 3 on Blaster Blade to retire and draw without burning Counter Blast, or Energy Blast 5 on Soul Saver Dragon.'
      },
      {
        title: 'Holy Charging Roar (+50,000 Total Power)',
        description: 'Soul Saver Dragon grants +10,000 power to up to five rear-guards by blasting 5 Soul or 5 Energy, creating explosive 3-column kill turns.'
      },
      {
        title: 'Superior Calling & Column Formation',
        description: 'When Alfred attacks, CB1 searches your deck for two Aichi icon units (like Blaster Blade & Wingal) and calls them to the same column for an instant high-power attack!'
      }
    ],
    pros: [
      'Extremely beginner-friendly with linear, explosive royal knight combat',
      'Dual-cost economy allows flexible use of Energy Blast to save Counter Blast for Alfred',
      'High persona ride frequency thanks to Alfred\'s universal ride condition',
      'Massive field-wide burst numbers through Soul Saver Dragon and Wingal'
    ],
    cons: [
      'Board-dependent: Alfred and Soul Saver skills require maintaining rear-guards',
      'Vulnerable to control matchups that retire or bind front-row units before battle phase'
    ],
    keyCombos: [
      {
        name: 'Alfred Formation to Blaster Blade Draw',
        cards: ['King of Knights, Alfred', 'Blaster Blade', 'Wingal'],
        steps: [
          'Persona Ride Alfred to grant all front-row units +10,000 power and draw 1 card.',
          'Attack with Vanguard Alfred (gets Drive +1 and Critical +1 with 4+ RGs).',
          'On attack: Pay CB1 to tutor Blaster Blade and Wingal directly to the same column.',
          'Blaster Blade triggers on call: Pay EB3 or CB1 to retire an opponent rear-guard and draw 1 card!',
          'Swing with Blaster Blade boosted by Wingal for 33k+ power!'
        ]
      },
      {
        name: 'Soul Saver Dragon Holy Charging Roar Finisher',
        cards: ['Soul Saver Dragon', 'Energy Generator', 'Little Sage, Marron'],
        steps: [
          'Fill all rear-guard circles with units across left, center, and right columns.',
          'Ride or call Soul Saver Dragon.',
          'Pay Soul Blast (5) or Energy Blast (5): Grant +10,000 Power to up to five rear-guards!',
          'All columns swing with lethal numbers, forcing massive shields or game-ending damage.'
        ]
      }
    ],
    recommendedUpgrades: [
      {
        cardName: 'Knight of Heavenly Sword, Fort',
        role: 'Soul Accumulator & Column Booster',
        why: 'Accelerates soul to easily pay Soul Saver Dragon\'s 5-soul requirement without depleting Energy.'
      },
      {
        cardName: 'Protection: Twincast',
        role: 'Regalis Piece Blitz Order',
        why: 'Provides massive defensive shield (+25k) and blocks lethal opponent turns.'
      },
      {
        cardName: 'Knight of Light Order, Caractacus',
        role: 'Grade 3 Persona Ride Searcher',
        why: 'Adds Alfred or Soul Saver directly to hand to guarantee persona rides every turn.'
      }
    ]
  },
  {
    id: 'chronojet',
    name: 'Stride Deckset Chronojet',
    code: 'D-SS03',
    nation: 'Dark States',
    clan: 'Gear Chronicle',
    keyBoss: 'Chronojet Dragon & Chronodragon Nextage',
    iconColor: 'from-amber-500 to-purple-700',
    bannerImage: 'https://static.wikia.nocookie.net/cardfight/images/6/67/VGE-D-SS03.png/revision/latest',
    tagline: 'Rewind time, manipulate the deck, and deliver an unstoppable dual vanguard onslaught.',
    overview: 'Chronojet Dragon is the first Stride Deckset introduced to Standard. Utilizing the Crest system, it scales +5,000 Power across all front-row units for every face-up G-unit in the G-Zone. With tutor-calling via Upstream Dragon and the devastating restand turn of Chronodragon Nextage, it commands high consistency, massive soul filtering, and overwhelming pressure.',
    difficulty: 'Intermediate',
    mechanics: [
      {
        title: 'Stride & G-Zone Expansion',
        description: 'Stride from face-down G-Zone by discarding cards totaling Grade 3+. Powers up permanently turn by turn via the Crest.'
      },
      {
        title: 'Time Leap / Deck Cycling',
        description: 'Attack with Upstream Dragon, bottom-deck it to tutor Grade 1 units directly into play, cycling soul and hand advantage.'
      },
      {
        title: 'Dual Vanguard Attack (Nextage Restand)',
        description: 'Nextage attacks with Triple Drive, flips a G-card, discards 2, then stands Chronojet Dragon for a second Vanguard attack with Twin Drive and GB2 guard restriction.'
      }
    ],
    pros: [
      'Guaranteed Crest ramp guarantees scaling power (+15,000 to +25,000 each turn)',
      'Steam Fighter Balih makes Stride cost completely hand-neutral (draws 1 upon discard)',
      'Vanguard restand with Nextage delivers 4-5 drive checks across two vanguard attacks',
      'Bottom-deck removal circumvents on-drop or drop-zone recovery effects'
    ],
    cons: [
      'Heavy Counter Blast and Soul consumption if Gigi is used greedily',
      'Vulnerable before Grade 3 ride turn against hyper-aggressive early decks',
      'Rear-guards reset back to deck, requiring consistent card draw to replenish field'
    ],
    keyCombos: [
      {
        name: 'Upstream to Gigi Turbo Engine',
        cards: ['Upstream Dragon', 'Steam Scara, Gigi'],
        steps: [
          'Call Upstream Dragon to front row rear-guard circle.',
          'Attack opponent vanguard (gets +4,000 power from skill).',
          'At end of battle, return Upstream to bottom of deck and search deck for Gigi, calling it at Rest.',
          'Trigger Gigi on-call: SB2 to draw 1 card. You gained an attacker swing, drew a fresh card, and preserved deck synergy!'
        ]
      },
      {
        name: 'The Nextage Decisive Stride Turn',
        cards: ['Chronodragon Nextage', 'Chronojet Dragon', 'Steam Fighter, Balih'],
        steps: [
          'Discard Balih to Stride Nextage (Balih triggers: draw 1 card).',
          'Swing with Rear-guards first with Crest power boost.',
          'Attack with Chronodragon Nextage (Triple Drive check!).',
          'At end of battle: CB1, discard 2 cards, and flip a G-unit face up.',
          'Stand Chronojet Dragon! Chronojet attacks with Twin Drive, +5,000 Power, and opponent cannot guard with Grade 1+ cards from hand!'
        ]
      }
    ],
    recommendedUpgrades: [
      {
        cardName: 'Brainwash Swirler',
        role: 'Soul Charger & Power Stacker',
        why: 'Soul charges consistently whenever cards enter soul, fueling Gigi and Nextage while hitting 20k+ power.'
      },
      {
        cardName: 'Steam Performer, Tougue',
        role: 'Counter Charge & Soul Recovery',
        why: 'Replenishes Counter Blast and Soul when returning to deck, fixing the deck’s resource choke point.'
      },
      {
        cardName: 'Interdimensional Dragon, Warpdrive Dragon',
        role: 'Alternative Stride Option',
        why: 'Provides massive column clearing against multi-intercept and rear-guard reliant opponents.'
      }
    ]
  },
  {
    id: 'messiah',
    name: 'Stride Deckset Messiah',
    code: 'D-SS04',
    nation: 'Brandt Gate',
    clan: 'Link Joker',
    keyBoss: 'Alter Ego Messiah & Genesis Dragon, Excelics Messiah',
    iconColor: 'from-blue-600 to-cyan-400',
    bannerImage: 'https://static.wikia.nocookie.net/cardfight/images/6/62/VGE-D-SS04.png/revision/latest',
    tagline: 'Lock the cosmos, unlock reality, and unleash relentless multi-attacks from absolute zero.',
    overview: 'Revives the legendary Link Joker mechanic in D-Series! Unlike historical opponent locking, D-Series Messiah focuses on self-locking rear-guards during battle and unlocking them simultaneously to grant extra attacks, draw power, and unguardable momentum.',
    difficulty: 'Advanced',
    mechanics: [
      {
        title: 'Lock & Unlock Synergy',
        description: 'Rear-guards lock themselves after attacking to activate powerful abilities, then unlock in Stand state to attack again.'
      },
      {
        title: 'Crest Scaling',
        description: 'Grants front-row units +5000 power per face-up card in the G-Zone, supercharging unlocked rear-guards.'
      },
      {
        title: 'Selective Board Denial',
        description: 'Can temporarily lock enemy front-row intercepts, preventing them from shielding during your kill phase.'
      }
    ],
    pros: [
      'High number of attacks per turn (5 to 6 attacks routinely)',
      'Excellent hand generation upon unlocking units with Alter Ego Crest',
      'Bypasses many defensive triggers with rapid re-standing attackers'
    ],
    cons: [
      'Highly sequencing intensive; a misplay in lock order wastes an attack',
      'Requires precise board pieces (Awaking Messiah, Sacrifice Messiah)'
    ],
    keyCombos: [
      {
        name: 'Amnesty Dual Unlock Rush',
        cards: ['Genesis Dragon, Amnesty Messiah', 'Alter Ego Messiah'],
        steps: [
          'Attack with front-row rear-guards, locking themselves.',
          'Attack with Amnesty Messiah. Skill unlocks rear-guards and stands them.',
          'Rear-guards gain Crest power bonuses and attack a second time!'
        ]
      }
    ],
    recommendedUpgrades: [
      {
        cardName: 'Combine Rusher',
        role: 'Free Drop-Zone Calling',
        why: 'Recycles from drop zone when Set Orders or locks occur, providing free attackers.'
      },
      {
        cardName: 'Polarxis Dragon',
        role: 'Board Disruption',
        why: 'Provides extra control against aggressive front-line decks.'
      }
    ]
  },
  {
    id: 'shiranui',
    name: 'Stride Deckset Shiranui',
    code: 'D-SS09',
    nation: 'Dragon Empire',
    clan: 'Nubatama',
    keyBoss: 'Demon Stealth Dragon, Shiranui "Oboro"',
    iconColor: 'from-red-600 to-stone-900',
    bannerImage: 'https://static.wikia.nocookie.net/cardfight/images/5/5e/VGE-D-SS09.png/revision/latest',
    tagline: 'Take control of your opponent’s strongest rear-guards and turn their own army against them.',
    overview: 'Introduces the terrifying "Dominate" keyword into standard. Dominate allows Shiranui to force the opponent’s own rear-guards or drop zone units to attack their vanguard, while you perform drive checks or trigger effects on their behalf!',
    difficulty: 'Intermediate',
    mechanics: [
      {
        title: 'Dominate Keyword',
        description: 'Commandeer enemy rear-guards to battle their own master, denying intercept and soaking defensive checks.'
      },
      {
        title: 'Ghost Token Generation',
        description: 'Spawns and binds silhouette tokens to extend attack counts without using your own hand resources.'
      },
      {
        title: 'Mukuro & Crest Domination',
        description: 'Stride units like Evil-eye Hades Emperor, Shiranui "Mukuro" perform multiple attacks using the opponent’s best unit.'
      }
    ],
    pros: [
      'Forces opponent to guard their own units attacks',
      'Retires or controls key enemy combo pieces effortlessly',
      'Extreme card advantage while saving your own rear-guards'
    ],
    cons: [
      'Effectiveness partly scales with what units the opponent plays',
      'Counter Blast hungry if opponent starves damage'
    ],
    keyCombos: [
      {
        name: 'Turn-3 Oboro Dominate Strike',
        cards: ['Shiranui "Oboro"', 'Genkai'],
        steps: [
          'Ride Oboro, choose opponent’s front row grade 2 unit.',
          'Dominate it: it attacks the opponent vanguard with +5,000 power!',
          'Genkai triggers when dominated unit attacks to draw 1 and Soul Charge.'
        ]
      }
    ],
    recommendedUpgrades: [
      {
        cardName: 'Stealth Fiend, Shenryi',
        role: 'Draw Engine',
        why: 'Draws additional cards and provides Counter Charge when rear-guards are retired or dominated.'
      }
    ]
  },
  {
    id: 'luard',
    name: 'Stride Deckset Luard',
    code: 'D-SS10',
    nation: 'Keter Sanctuary',
    clan: 'Shadow Paladin',
    keyBoss: 'Dragheart, Luard & Dragdriver, Luard',
    iconColor: 'from-indigo-900 to-amber-400',
    bannerImage: 'https://static.wikia.nocookie.net/cardfight/images/a/a2/VGE-D-SS10.png/revision/latest',
    tagline: 'Harness the ancient Ritual of the abyss to Stride for free and call endless Grade 1 knights.',
    overview: 'The ritualistic master of Shadow Paladin returns. Luard operates around "Ritual", checking the number of Grade 1 cards in your drop zone. Once Ritual 3 or higher is achieved, Luard Strides for free without discarding, and repeatedly calls Grade 1 units from deck to overwhelm the opponent.',
    difficulty: 'Intermediate',
    mechanics: [
      {
        title: 'Ritual Condition',
        description: 'Counts Grade 1 cards in drop zone. Ritual 3 lets you Stride without paying any discard cost!'
      },
      {
        title: 'Superior Calling Grade 1s',
        description: 'Sacrifices rear-guards to pull Morfessa, Charon, or Swordbreaker directly from deck.'
      },
      {
        title: 'Drop Zone Recycling',
        description: 'Shuffles Normal Units back into the deck to prevent deck-out and concentrate triggers.'
      }
    ],
    pros: [
      'Free Stride turns guarantee +1 to +2 card advantage every single turn',
      'Virtually endless superior call toolboxing from deck',
      'Deck thinning concentrates Critical and Over triggers into your drive checks'
    ],
    cons: [
      'Relies heavily on having Grade 1s in drop zone by turn 3',
      'Vulnerable to drop-zone bind strategies'
    ],
    keyCombos: [
      {
        name: 'Free Stride into Dragdriver Double Call',
        cards: ['Dragheart, Luard', 'Dragdriver, Luard', 'Morfessa'],
        steps: [
          'Ritual 3 active: Stride Dragdriver, Luard without discarding any cards!',
          'Use Dragdriver ACT to retire 1 rear-guard and call two Grade 1 units from deck.',
          'Call Morfessa who gains Grade 2 and +5000, attacking with huge numbers.'
        ]
      }
    ],
    recommendedUpgrades: [
      {
        cardName: 'Maple, Closer Age to the Dragon',
        role: 'Free Drop-Zone Recurring Fodder',
        why: 'Recurs from drop zone for free whenever you ride or stride, providing effortless retire cost.'
      }
    ]
  },
  {
    id: 'harri',
    name: 'Stride Deckset Harri',
    code: 'DZ-SS02',
    nation: 'Dark States',
    clan: 'Pale Moon',
    keyBoss: 'Masked Magician, Harri',
    iconColor: 'from-pink-600 to-purple-900',
    bannerImage: 'https://static.wikia.nocookie.net/cardfight/images/6/64/D-icon.png/revision/latest',
    tagline: 'Step into the circus of illusions! Call from the soul and vanish before the curtain falls.',
    overview: 'Master of the "Magia" circus style. Harri moves units back and forth between the soul and rear-guard circles. At the end of the turn, units return to the soul, protecting them from opponent retirement effects and setting up explosive re-entries.',
    difficulty: 'Advanced',
    mechanics: [
      {
        title: 'Magia Soul Stage',
        description: 'Superior calls units from soul for immediate battle attacks, then safely returns them to soul at turn end.'
      },
      {
        title: 'Board Retirement Immunity',
        description: 'Leaves empty circles during opponent’s turn, neutralizing control decks like Prison, Overlord, and Eugene.'
      }
    ],
    pros: [
      'High surprise factor and multi-attack combos from soul',
      'Immune to opponent’s field interaction since units retreat into the soul',
      'Supercharged late game with Lunatec and Mephisto strides'
    ],
    cons: [
      'Empty board means you cannot intercept on opponent’s turn without specific skills',
      'Heavy reliance on specific soul pieces (Peryton, Cat Knight)'
    ],
    keyCombos: [
      {
        name: 'Magia Multi-Ring Circus',
        cards: ['Masked Magician, Harri', 'Flying Peryton'],
        steps: [
          'Stride into G-unit, Harri skill calls Flying Peryton from soul.',
          'Peryton on-call pulls another attacker and booster from soul.',
          'Execute 4-5 attacks, then all Magia units safely return to soul.'
        ]
      }
    ],
    recommendedUpgrades: [
      {
        cardName: 'Steam Tamer, Nanni',
        role: 'Soul Extender',
        why: 'Provides repeat attacks and soul charging on command.'
      }
    ]
  },
  {
    id: 'nightrose',
    name: 'Stride Deckset Nightrose',
    code: 'DZ-SS03',
    nation: 'Stoicheia',
    clan: 'Granblue',
    keyBoss: 'Vampire Princess of Nether Hour, Nightrose',
    iconColor: 'from-teal-600 to-indigo-950',
    bannerImage: 'https://static.wikia.nocookie.net/cardfight/images/6/64/D-icon.png/revision/latest',
    tagline: 'The ghostly armada rises from the murky depths of the drop zone to strike without mercy.',
    overview: 'The Granblue pirate queen returns under the Stoicheia nation. Nightrose utilizes the "Hollow" keyword: units gain terrifying power for the battle, but retire themselves at the end of turn — which Nightrose immediately turns into an advantage by resurrecting them during the battle phase!',
    difficulty: 'Advanced',
    mechanics: [
      {
        title: 'Hollow State',
        description: 'Units enter Hollow for huge power boosts, retiring at turn end to refill the drop zone.'
      },
      {
        title: 'Mid-Battle Resurrect',
        description: 'Nightrose’s AUTO skill revives fallen pirate rear-guards during the battle phase for continuous attack chains.'
      },
      {
        title: 'Drop Zone as Second Hand',
        description: 'Milling cards to drop allows near-perfect toolboxing of any needed shield, booster, or attacker.'
      }
    ],
    pros: [
      'Continuous wave of 5+ attacks every stride turn',
      'Drop zone acts as a secondary 20-card hand',
      'Immense flexibility and defensive resilience via Colombard and Grenache'
    ],
    cons: [
      'Risk of decking out if drop milling is unmanaged',
      'Requires deep knowledge of trigger timings and attack declarations'
    ],
    keyCombos: [
      {
        name: 'Battle Phase Nether Revival',
        cards: ['Nightrose', 'Ghostie Great King, Obadiah', 'King Serpent'],
        steps: [
          'Obadiah sends King Serpent and Negrobone to drop zone.',
          'King Serpent revives itself, Counter Charging 1 and Soul Charging 1.',
          'Attack with rear-guards, retire them, and Nightrose triggers to call fresh attackers from drop!'
        ]
      }
    ],
    recommendedUpgrades: [
      {
        cardName: 'Tear Knight, Costas',
        role: 'Multi-Attack Enabler',
        why: 'Synergizes with repeated restand and drop resurrection mechanics.'
      }
    ]
  },
  {
    id: 'start-decks',
    name: 'Quick Start Decks & Master Decksets',
    code: 'DZ-SD01 to DZ-SD06 / Break Away',
    nation: 'All 6 Nations (Dragon Empire, Keter, Dark States, Brandt Gate, Stoicheia, Lyrical)',
    clan: 'Various',
    keyBoss: 'Fated Ones & Legendary Vanguards',
    iconColor: 'from-emerald-500 to-sky-600',
    bannerImage: 'https://static.wikia.nocookie.net/cardfight/images/6/64/D-icon.png/revision/latest',
    tagline: 'The ultimate gateway into standard Cardfight!! Vanguard with zero barrier to entry.',
    overview: 'Quick Start Decks (DZ-SD01 through DZ-SD06) and the new Break Away Series provide ready-to-play 50-card decks for under $5 USD. Featuring the DivineZ anime protagonists and simple "Energy" generator rules, they are the ideal launching pad before upgrading to Stride Decksets.',
    difficulty: 'Beginner',
    mechanics: [
      {
        title: 'Ride Deck & Energy Generator',
        description: 'Guaranteed rides each turn plus Energy Crest generation (EB - Energy Blast) to fuel skills.'
      },
      {
        title: 'Persona Ride Engine',
        description: 'Riding the same Grade 3 grants +10,000 to front row and draws 1 card.'
      },
      {
        title: 'Direct Upgrade Pathways',
        description: 'Can be upgraded with booster pack singles into tier-1 competitive archetypes.'
      }
    ],
    pros: [
      'Extremely affordable and easy to learn (under 10 minutes)',
      'Introduces core mechanics: Ride Deck, Trigger checks, Intercept, Sentinel',
      'Includes Energy Generator Crest compatible with all modern DZ expansions'
    ],
    cons: [
      'Lower base power ceiling than Stride Decksets without upgrade singles',
      'Fewer multi-attack options out of the box'
    ],
    keyCombos: [
      {
        name: 'Energy Blast Draw into Persona Ride',
        cards: ['Energy Generator', 'Boss Grade 3'],
        steps: [
          'Every turn, gain 3 Energy on your Energy Generator Crest.',
          'Spend Energy Blast (EB3) to draw cards or grant power.',
          'Execute Persona Ride on turn 4 for guaranteed front row +10,000 power!'
        ]
      }
    ],
    recommendedUpgrades: [
      {
        cardName: 'Elementaria Sanctitude',
        role: 'Blitz Order Sentinel',
        why: 'Stops opponent attacks without discarding if opponent’s card has Triple Drive or Stride!'
      },
      {
        cardName: 'Inlet Pulse Dragon',
        role: 'Hand Replenishment',
        why: 'Universal powerhouse in Stoicheia and multi-nation lists.'
      }
    ]
  }
];

export const CHRONOJET_PILOTING_MASTERCLASS: PilotingStep[] = [
  {
    step: 1,
    phase: 'Ride Line & Setup',
    title: 'Guaranteed Ride Deck & Crest Activation',
    summary: 'Never miss a ride! Set up your Ride Deck and place the Chronojet Dragon Crest as soon as you hit Grade 3.',
    cardsInvolved: ['Chrono Dran', 'Masergear Dragon', 'Smokegear Dragon', 'Chronojet Dragon', 'Chronojet Dragon Crest'],
    bulletPoints: [
      'Ride Deck contains 4 cards: Chrono Dran (G0), Masergear Dragon (G1), Smokegear Dragon (G2), Chronojet Dragon (G3).',
      'During your Ride Phase, discard 1 card from hand to ride the next grade from your ride deck with 100% certainty.',
      'G1 Masergear: Discard 1 to draw 1 when ridden by Smokegear (hand filtering).',
      'G2 Smokegear: When ridden by Chronojet, check top 5 cards of deck for a Grade 3+ card (e.g. Steam Fighter Balih or extra Chronojet) and add to hand!',
      'G3 Chronojet: When placed on [V], place the "Chronojet Dragon Crest" face-up into your Crest zone.'
    ],
    proTip: 'Always check if you have Steam Fighter Balih in hand. If not, use Smokegear’s top 5 search to hunt for Balih so your next turn Stride discard is completely free!',
    interactiveScenario: {
      question: 'You ride Chronojet Dragon from the ride deck onto Smokegear Dragon. What triggers immediately in sequence?',
      options: [
        {
          text: 'Smokegear top 5 search for G3+, Chronojet places Crest in Crest Zone, and you may Stride immediately.',
          isCorrect: false,
          explanation: 'Incorrect: You cannot Stride on the turn you ride Grade 3 unless the opponent is already at Grade 3 (or at the start of your subsequent turn).'
        },
        {
          text: 'Smokegear top 5 search for G3+ resolves, and Chronojet places Chronojet Dragon Crest face-up in Crest Zone.',
          isCorrect: true,
          explanation: 'Correct! Both AUTO skills trigger upon riding Chronojet. You resolve the search and deploy the Crest, establishing your Stride permissions and power scaling engine.'
        },
        {
          text: 'You perform Persona Ride to give all front row +10,000 power.',
          isCorrect: false,
          explanation: 'Incorrect: Riding Chronojet from Ride Deck for the first time is a normal ride, not a Persona Ride. Furthermore, Stride decks do not rely on Persona Ride; they use Stride and Crest power!'
        }
      ]
    }
  },
  {
    step: 2,
    phase: 'Ride Phase / Stride Step',
    title: 'Mastering the Stride Condition & Discard Economy',
    summary: 'Stride allows you to transcend dimensions by calling a Grade 4 G-unit over your Vanguard for the turn.',
    cardsInvolved: ['Chronodragon Nextage', 'Interdimensional Dragon, Faterider Dragon', 'Steam Fighter, Balih', 'Steam Breath Dragon'],
    bulletPoints: [
      'Timing condition: You may Stride if both you and your opponent are at Grade 3, OR if you began your turn at Grade 3.',
      'Stride Cost: Discard cards from hand whose sum of grades is 3 or greater.',
      'Discarding Steam Fighter, Balih: Balih is Grade 3, so discarding Balih alone fulfills the full cost. Balih’s AUTO immediately triggers: Draw 1 card! (Net cost = 0 cards).',
      'Steam Breath Dragon: In hand, Steam Breath Dragon counts as Grade 3 for Stride discard!',
      'Stride replaces your Vanguard with the G-unit (15,000 base + heart’s original power = 28,000 base power) and grants Triple Drive!'
    ],
    proTip: 'Never discard two shield cards (like Grade 1s or Triggers) for Stride unless in an emergency. Protect your Steam Breath Dragons and Balihs for Stride fodder.',
    interactiveScenario: {
      question: 'Your hand contains: 1x Steam Fighter Balih (G3), 1x Lively Breath Dragon (Crit G0), 1x Upstream Dragon (G2). What is the optimal discard for Stride?',
      options: [
        {
          text: 'Discard Upstream Dragon (G2) + Lively Breath Dragon (G0).',
          isCorrect: false,
          explanation: 'Sum of grades is 2 + 0 = 2, which does not meet the requirement of 3+, and you would waste a trigger!'
        },
        {
          text: 'Discard Steam Fighter, Balih (G3).',
          isCorrect: true,
          explanation: 'Spot on! Balih satisfies the grade 3 requirement alone, and triggers: Draw 1 card. You save Upstream for attacking and keep the Critical Trigger for guarding!'
        },
        {
          text: 'Discard all 3 cards to get +15,000 power.',
          isCorrect: false,
          explanation: 'Discarding excess cards does not increase Stride power and heavily depletes your hand.'
        }
      ]
    }
  },
  {
    step: 3,
    phase: 'Continuous Rule',
    title: 'Crest Power Scaling Calculation',
    summary: 'Chronojet Dragon Crest provides a perpetual, unstoppable power boost across your entire front row.',
    cardsInvolved: ['Chronojet Dragon Crest'],
    bulletPoints: [
      'Crest Skill 1: "You can [Stride] G units."',
      'Crest Skill 2: "The original [Power] of your grade 3 vanguard with Chronojet in its card name becomes 13000 during your turn."',
      'Crest Skill 3: "During your turn, your vanguard and all of your front row rear-guards get [Power]+5000 for each face-up card in your G zone."',
      'Turn 3 (First Stride with Faterider skill flip): 1 face-up card in G-zone = +5,000 to entire front row.',
      'Turn 4 (Second Stride with Nextage skill): At least 3 face-up cards = +15,000 to +20,000 to entire front row!',
      'This power is CONT (Continuous) and active during every single attack that turn.'
    ],
    proTip: 'Remember that Crest power applies to your Vanguard AND both front row rear-guards. Even an 8,000 or 10,000 base unit swings for 25,000 - 30,000 without needing a booster!',
    interactiveScenario: {
      question: 'You are on your second Stride turn. You have 3 face-up cards in your G-Zone. Your front row is: Upstream Dragon (10,000 base) and Chronodragon Nextage (28,000 base). What is their power before boosting?',
      options: [
        {
          text: 'Upstream Dragon is 10,000 and Nextage is 28,000.',
          isCorrect: false,
          explanation: 'Incorrect: You forgot the Crest effect! 3 face-up G-cards give +15,000 power to all front-row units.'
        },
        {
          text: 'Upstream Dragon is 25,000 and Nextage is 43,000.',
          isCorrect: true,
          explanation: 'Correct! 3 face-up cards = +15,000 power. 10k + 15k = 25k for Upstream; 28k + 15k = 43k for Nextage! When Upstream attacks, it gets another +4,000 (hitting 29,000 solo!).'
        },
        {
          text: 'Only Chronojet Dragon gets the power, Nextage does not.',
          isCorrect: false,
          explanation: 'Incorrect: The Crest states "your vanguard and all of your front row rear-guards", which includes G-units on the Vanguard circle!'
        }
      ]
    }
  },
  {
    step: 4,
    phase: 'Battle Phase Combo',
    title: 'The Core Engine: Upstream Dragon & Steam Scara Gigi',
    summary: 'Cycle attacks while preserving board presence, filling the drop zone, and drawing cards from the soul.',
    cardsInvolved: ['Upstream Dragon', 'Steam Scara, Gigi', 'Gear Serow of Magnetic Resonance'],
    bulletPoints: [
      'Step 1: Declare attack with Upstream Dragon (Front Row) against the opponent Vanguard.',
      'Step 2: Upstream skill activates: Gains +4,000 Power for the battle (hitting 14k + Crest power + Booster).',
      'Step 3: At the end of that battle, Upstream puts itself on the bottom of your deck.',
      'Step 4: Search deck for any Grade 1 card (such as Steam Scara, Gigi or Gear Serow) and call it at [Rest].',
      'Step 5: If you call Gigi, activate Gigi on-call: COST [Soul Blast 2] -> Draw 1 card!',
      'Step 6: If Gear Serow is on the board, its AUTO triggers when Upstream returns to deck, gaining +5,000 Power!'
    ],
    proTip: 'Calling Gigi in [Rest] is fine because Gigi is not meant to attack that turn; it serves as a booster for subsequent turns or intercept/shield in later rounds.',
    interactiveScenario: {
      question: 'When Upstream Dragon returns to the deck at the end of battle, where does it go?',
      options: [
        {
          text: 'To the Drop Zone.',
          isCorrect: false,
          explanation: 'Upstream specifies "put this unit on the bottom of your deck", recycling itself into the deck rather than the drop zone.'
        },
        {
          text: 'To the bottom of your deck, then you search your deck for a Grade 1 card and call it as [Rest].',
          isCorrect: true,
          explanation: 'Correct! This keeps your deck full of attackers and recruits utility Grade 1s like Gigi or Serow.'
        }
      ]
    }
  },
  {
    step: 5,
    phase: 'Decisive Stride Phase',
    title: 'Stride Sequencing: First Stride (Faterider) vs Kill Turn (Nextage)',
    summary: 'Execute the perfect two-stride roadmap to break the opponent’s hand and close the match.',
    cardsInvolved: ['Interdimensional Dragon, Faterider Dragon', 'Chronodragon Nextage', 'Chronojet Dragon'],
    bulletPoints: [
      'Turn 3 - Stride 1: Interdimensional Dragon, Faterider Dragon.',
      'Why Faterider first? Turn a G-card face up in G-Zone (activating Crest +5,000). Put a rested G1 or G0 on bottom of deck, search for Upstream Dragon (Grade 1 -> Grade 2 promotion!), and give +10,000 power to any unit.',
      'Turn 4 - Stride 2: Chronodragon Nextage (The Kill Turn).',
      'Order of attack: Attack with rear-guards first so trigger power from Nextage can be assigned to remaining units.',
      'Nextage attacks with Triple Drive! At end of battle: CB1, discard 2 cards, and flip a G-unit face up.',
      'Chronojet Dragon RESTANDS! It performs a second Vanguard attack with Twin Drive, +5,000 Power from GB2, and the opponent CANNOT call Grade 1 or greater cards from hand to guard!'
    ],
    proTip: 'Because Chronojet’s GB2 restricts Grade 1+ guards from hand, the opponent CANNOT use Sentinels/Perfect Guards from hand! They must guard with Grade 0 triggers or blitz orders/intercepts!',
    interactiveScenario: {
      question: 'Why is Chronojet Dragon’s restand attack after Nextage so deadly to the opponent?',
      options: [
        {
          text: 'It has 10 Critical and bypasses damage checks.',
          isCorrect: false,
          explanation: 'It does not bypass damage checks or have 10 critical inherently.'
        },
        {
          text: 'Opponent cannot call Grade 1 or greater cards from hand to guard (no regular Sentinels/PGs), backed by Crest power and Twin Drive.',
          isCorrect: true,
          explanation: 'Exactly! Opponents holding standard Grade 1 Sentinels cannot drop them to guard Chronojet. They are forced to drop multiple Grade 0 triggers against a 33,000+ power Vanguard attack!'
        }
      ]
    }
  },
  {
    step: 6,
    phase: 'Defensive Strategy',
    title: 'Guarding, Resource Conservation & Counter Management',
    summary: 'Maintain Counter Blast and Soul while surviving opponent kill turns with high-efficiency shields.',
    cardsInvolved: ['Steam Maiden, Arlim', 'Steam Fighter, Argandia', 'Advanced Clock Dragon', 'Direful Doll, Alexandra'],
    bulletPoints: [
      'Steam Fighter Argandia: Gains +5,000 Shield when placed on [G] (making it a 10,000 shield from front-row intercept).',
      'Steam Maiden, Arlim (Sentinel): Discards 1 if you have 2+ cards in hand. Completely negates any single massive attack.',
      'Resource check: Chronojet on-stride spin takes CB1, Masergear takes CB1, Nextage takes CB1. Always protect at least 1 open Counter Blast for Nextage turn!',
      'Soul management: Do not spam Gigi if your soul has only 2 cards unless you are guaranteed to ride/stride and replenish soul.'
    ],
    proTip: 'If your opponent attacks with an Over Trigger boosted unit (100 Million power), never waste normal shield cards; use Arlim (Sentinel) or take the damage if at low damage count.',
    interactiveScenario: {
      question: 'You have 1 open Counter Blast and 2 Soul. Next turn is your Nextage Stride turn. Should you use Masergear Dragon’s CB1 skill during the opponent’s turn?',
      options: [
        {
          text: 'Yes, remove any opponent unit immediately regardless of resources.',
          isCorrect: false,
          explanation: 'No! If you spend your last Counter Blast, you will not have CB1 for Nextage’s restand skill next turn!'
        },
        {
          text: 'No, conserve that 1 Counter Blast so Nextage can activate its restand finisher on your turn.',
          isCorrect: true,
          explanation: 'Correct! Chronodragon Nextage requires Counter Blast 1 to restand Chronojet Dragon. Resource foresight wins matches!'
        }
      ]
    }
  }
];


export const BLASTER_BLADE_PILOTING_MASTERCLASS: PilotingStep[] = [
  {
    step: 1,
    phase: 'Ride Phase & Energy Crest Setup',
    title: 'Deploying the Energy Generator & Ride Line Tutoring',
    summary: 'Set up your early turns with Barcgal, Wingal, and deploy the new standard Energy Generator Crest.',
    cardsInvolved: ['Barcgal', 'Wingal', 'Blaster Blade', 'Energy Generator'],
    bulletPoints: [
      'Ride Deck setup: Barcgal (G0) -> Wingal (G1) -> Blaster Blade (G2) -> King of Knights, Alfred (G3).',
      'When you ride Barcgal (G0), place the Energy Generator Crest in your Crest Zone.',
      'Energy generation: At the start of your ride phase (and going second on Turn 1), gain 3 Energy counters up to 10 maximum.',
      'Wingal (G1): When ridden by Blaster Blade, look at top 7 cards of your deck for a G2+ card with an Aichi icon and add it to hand.',
      'Blaster Blade (G2): When placed on [V] or [R], reveal a G3 Aichi icon card from your ride deck, pay CB1 or EB3, retire an opponent\'s rear-guard, and DRAW a card!'
    ],
    proTip: 'Blaster Blade\'s on-ride skill is hand-positive! Discarding to ride is completely refunded because Blaster Blade draws 1 card upon retiring an opponent rear-guard.',
    interactiveScenario: {
      question: 'On Turn 2, you ride Blaster Blade from the Ride Deck. What is the most resource-efficient cost to pay for its retire and draw skill?',
      options: [
        {
          text: 'Pay Energy Blast (3) using your accumulated Energy Generator counters.',
          isCorrect: true,
          explanation: 'Correct! By paying Energy Blast (3), you save your Counter Blast for King of Knights, Alfred\'s game-changing superior call skill on Turn 3!'
        },
        {
          text: 'Pay Counter Blast (1) and save Energy for nothing in particular.',
          isCorrect: false,
          explanation: 'Suboptimal: Counter Blast is strictly needed for Alfred\'s battle phase superior call skill. Conserve CB whenever Energy is available.'
        },
        {
          text: 'Do not pay any cost and decline the retire/draw.',
          isCorrect: false,
          explanation: 'Declining costs you a free draw and opponent disruption. You should virtually always activate Blaster Blade\'s skill on ride.'
        }
      ]
    }
  },
  {
    step: 2,
    phase: 'Main Phase & Grade 3 Transition',
    title: 'Universal Persona Ride & Board Saturation',
    summary: 'Ride King of Knights Alfred and utilize its unique skill that turns ANY G3 with an Aichi icon into a Persona Ride.',
    cardsInvolved: ['King of Knights, Alfred', 'Soul Saver Dragon', 'Little Sage, Marron'],
    bulletPoints: [
      'Universal Persona Ride: Normally you can only Persona Ride the identical card name. Alfred\'s [CONT] skill allows normal riding from ANY Grade 3 card with an Aichi icon (e.g. Soul Saver Dragon) to trigger Persona Ride!',
      'Front row units get +10,000 Power, and you draw 1 card upon Persona Ride.',
      'Call rear-guards: Fill back-row circles with boosters like Marron and Wingal.',
      'Marron (G1) skill: When called, if you have an Aichi icon vanguard, draw 1 card and place 1 card from hand into soul, filtering your hand and fueling Soul Blast!'
    ],
    proTip: 'Never hold back Grade 3 cards in hand: whether you have another Alfred or Soul Saver Dragon, both will trigger Persona Ride and draw you an extra card every single turn.',
    interactiveScenario: {
      question: 'Your vanguard is Soul Saver Dragon. On your next turn, you ride King of Knights, Alfred from hand. Does Persona Ride trigger?',
      options: [
        {
          text: 'Yes! Alfred\'s [CONT] skill treats normal riding from any G3 with an Aichi icon as a Persona Ride.',
          isCorrect: true,
          explanation: 'Correct! Alfred has a special rule text specifically allowing cross-rides between Aichi icon Grade 3s to count as Persona Rides.'
        },
        {
          text: 'No, because the card names are different.',
          isCorrect: false,
          explanation: 'Normally that is true, but Alfred\'s continuous skill explicitly overrides this rule for cards with an Aichi icon.'
        },
        {
          text: 'Only if you pay 1 Counter Blast.',
          isCorrect: false,
          explanation: 'Incorrect: The persona ride conversion is a continuous [CONT] rule skill that requires no cost.'
        }
      ]
    }
  },
  {
    step: 3,
    phase: 'Battle Phase Offensive',
    title: 'Alfred Superior Column Call & Critical Pressure',
    summary: 'Swing with rear-guards first, then unleash Alfred to tutor attackers and strike with Triple Drive and Critical +1.',
    cardsInvolved: ['King of Knights, Alfred', 'Blaster Blade', 'Wingal'],
    bulletPoints: [
      'Alfred Vanguard passive: Gains +2,000 Power for each of your rear-guards (up to +10,000 power with a full board).',
      'With 3+ rear-guards: Alfred gains Drive +1 (Twin Drive -> Triple Drive!).',
      'With 4+ rear-guards and Persona Ride: Alfred also gains [Critical] +1!',
      'When Alfred attacks: Pay CB1, search your deck for up to two cards with an Aichi icon, and call them to the SAME column!',
      'Call Blaster Blade to the front and Wingal to the back. If opponent is G3+, this new column can attack right after Alfred!'
    ],
    proTip: 'Attack with your initial rear-guard column FIRST before swinging with Alfred. When Alfred attacks, your CB1 superior call replaces the already-rested column with fresh standing units for a 4th or 5th attack!',
    interactiveScenario: {
      question: 'In what attack order should you attack when you plan to use Alfred\'s superior calling skill?',
      options: [
        {
          text: 'Attack with Left Column (RG) -> Attack with Alfred (VC), superior calling to Left Column -> Attack with newly called Left Column (RG) -> Right Column (RG).',
          isCorrect: true,
          explanation: 'Correct! Attacking with the rear-guard column before replacing it with Alfred\'s skill nets you an extra attack wave, maximizing pressure.'
        },
        {
          text: 'Always attack with Alfred first before any rear-guards attack.',
          isCorrect: false,
          explanation: 'Suboptimal: If you attack with Alfred first, superior calling over standing units wastes their attack potential.'
        },
        {
          text: 'Attack with only rear-guards and do not attack with Alfred.',
          isCorrect: false,
          explanation: 'Incorrect: Vanguard attacks provide drive checks and trigger checks.'
        }
      ]
    }
  },
  {
    step: 4,
    phase: 'Finishing Turn',
    title: 'Holy Charging Roar & Overwhelming Finish',
    summary: 'Close out the match by placing Soul Saver Dragon and buffing up to five units with +10,000 power each!',
    cardsInvolved: ['Soul Saver Dragon', 'Knight of Truth, Gordon', 'Knight of Silence, Gallatin'],
    bulletPoints: [
      'Soul Saver Dragon skill: When placed on [V] or [R], pay Soul Blast (5) OR Energy Blast (5).',
      'Target selection: Choose up to FIVE of your rear-guards; each chosen unit gets [Power]+10,000 until end of turn!',
      'Total power output: Distributes +50,000 raw power across your board, turning 10k/13k units into 30k+ threats before triggers.',
      'Flexible cost: If you don\'t have 5 cards in soul, you can pay 5 Energy from your Energy Generator Crest!'
    ],
    proTip: 'Soul Saver Dragon\'s Holy Charging Roar triggers when placed on (VC) OR (RC)! You can call Soul Saver to a rear-guard circle during an Alfred turn, buff the whole board, and still benefit from Alfred\'s superior calls.',
    interactiveScenario: {
      question: 'Can you activate Soul Saver Dragon\'s Holy Charging Roar if it is called to a rear-guard circle?',
      options: [
        {
          text: 'Yes! The skill specifies "When placed on (VC) or (RC)", so it functions on either circle.',
          isCorrect: true,
          explanation: 'Correct! This gives the deck tremendous versatility as Soul Saver can act as either a boss Vanguard or a rear-guard finisher.'
        },
        {
          text: 'No, Soul Saver Dragon only works on the Vanguard circle.',
          isCorrect: false,
          explanation: 'Incorrect: D-Series Soul Saver Dragon triggers on both (VC) and (RC).'
        },
        {
          text: 'Only if your vanguard is also Soul Saver Dragon.',
          isCorrect: false,
          explanation: 'Incorrect: It works with King of Knights, Alfred as vanguard.'
        }
      ]
    }
  }
];
