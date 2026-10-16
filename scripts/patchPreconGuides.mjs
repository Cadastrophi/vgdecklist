import fs from 'node:fs';

const blasterPrecon = `  {
    id: 'blaster-blade',
    name: 'Break Away Start Deck - Blaster Blade',
    code: 'DZ-SS14',
    nation: 'Keter Sanctuary',
    clan: 'Royal Paladin',
    keyBoss: 'King of Knights, Alfred & Blaster Blade & Soul Saver Dragon',
    iconColor: 'from-blue-600 via-sky-500 to-amber-400',
    bannerImage: 'https://static.wikia.nocookie.net/cardfight/images/3/30/DZ-SS14-002_%28Sample%29.png/revision/latest',
    tagline: 'Stand up, my avatar! Call your allies, trigger universal Persona Ride, and deliver justice with Holy Charging Roar.',
    overview: 'Break Away Start Deck - Blaster Blade marks the historic return of Royal Paladin\\'s iconic vanguard in the DZ Standard format. Centered around the Aichi Icon mechanic and the modern Energy Generator Crest, this deck combines King of Knights Alfred\\'s twin-call offensive, Blaster Blade\\'s pinpoint retire and draw for either Counter Blast 1 or Energy Blast 3, and Soul Saver Dragon\\'s crushing +10,000 multi-column power surge.',
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
      'High persona ride frequency thanks to Alfred\\'s universal ride condition',
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
        why: 'Accelerates soul to easily pay Soul Saver Dragon\\'s 5-soul requirement without depleting Energy.'
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
`;

const blasterCourse = `
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
      'Blaster Blade (G2): When placed on [V] or [R], reveal a G3 Aichi icon card from your ride deck, pay CB1 or EB3, retire an opponent\\'s rear-guard, and DRAW a card!'
    ],
    proTip: 'Blaster Blade\\'s on-ride skill is hand-positive! Discarding to ride is completely refunded because Blaster Blade draws 1 card upon retiring an opponent rear-guard.',
    interactiveScenario: {
      question: 'On Turn 2, you ride Blaster Blade from the Ride Deck. What is the most resource-efficient cost to pay for its retire and draw skill?',
      options: [
        {
          text: 'Pay Energy Blast (3) using your accumulated Energy Generator counters.',
          isCorrect: true,
          explanation: 'Correct! By paying Energy Blast (3), you save your Counter Blast for King of Knights, Alfred\\'s game-changing superior call skill on Turn 3!'
        },
        {
          text: 'Pay Counter Blast (1) and save Energy for nothing in particular.',
          isCorrect: false,
          explanation: 'Suboptimal: Counter Blast is strictly needed for Alfred\\'s battle phase superior call skill. Conserve CB whenever Energy is available.'
        },
        {
          text: 'Do not pay any cost and decline the retire/draw.',
          isCorrect: false,
          explanation: 'Declining costs you a free draw and opponent disruption. You should virtually always activate Blaster Blade\\'s skill on ride.'
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
      'Universal Persona Ride: Normally you can only Persona Ride the identical card name. Alfred\\'s [CONT] skill allows normal riding from ANY Grade 3 card with an Aichi icon (e.g. Soul Saver Dragon) to trigger Persona Ride!',
      'Front row units get +10,000 Power, and you draw 1 card upon Persona Ride.',
      'Call rear-guards: Fill back-row circles with boosters like Marron and Wingal.',
      'Marron (G1) skill: When called, if you have an Aichi icon vanguard, draw 1 card and place 1 card from hand into soul, filtering your hand and fueling Soul Blast!'
    ],
    proTip: 'Never hold back Grade 3 cards in hand: whether you have another Alfred or Soul Saver Dragon, both will trigger Persona Ride and draw you an extra card every single turn.',
    interactiveScenario: {
      question: 'Your vanguard is Soul Saver Dragon. On your next turn, you ride King of Knights, Alfred from hand. Does Persona Ride trigger?',
      options: [
        {
          text: 'Yes! Alfred\\'s [CONT] skill treats normal riding from any G3 with an Aichi icon as a Persona Ride.',
          isCorrect: true,
          explanation: 'Correct! Alfred has a special rule text specifically allowing cross-rides between Aichi icon Grade 3s to count as Persona Rides.'
        },
        {
          text: 'No, because the card names are different.',
          isCorrect: false,
          explanation: 'Normally that is true, but Alfred\\'s continuous skill explicitly overrides this rule for cards with an Aichi icon.'
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
      question: 'In what attack order should you attack when you plan to use Alfred\\'s superior calling skill?',
      options: [
        {
          text: 'Attack with Left Column (RG) -> Attack with Alfred (VC), superior calling to Left Column -> Attack with newly called Left Column (RG) -> Right Column (RG).',
          isCorrect: true,
          explanation: 'Correct! Attacking with the rear-guard column before replacing it with Alfred\\'s skill nets you an extra attack wave, maximizing pressure.'
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
      'Flexible cost: If you don\\'t have 5 cards in soul, you can pay 5 Energy from your Energy Generator Crest!'
    ],
    proTip: 'Soul Saver Dragon\\'s Holy Charging Roar triggers when placed on (VC) OR (RC)! You can call Soul Saver to a rear-guard circle during an Alfred turn, buff the whole board, and still benefit from Alfred\\'s superior calls.',
    interactiveScenario: {
      question: 'Can you activate Soul Saver Dragon\\'s Holy Charging Roar if it is called to a rear-guard circle?',
      options: [
        {
          text: 'Yes! The skill specifies \"When placed on (VC) or (RC)\", so it functions on either circle.',
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
`;

let content = fs.readFileSync('src/data/preconGuides.ts', 'utf8');

// Insert blasterPrecon at start of PRECON_DECKS
const preconMarker = 'export const PRECON_DECKS: PreconDeckInfo[] = [\n';
if (!content.includes("'blaster-blade'")) {
  content = content.replace(preconMarker, preconMarker + blasterPrecon);
}

// Append blasterCourse at end of file
if (!content.includes('BLASTER_BLADE_PILOTING_MASTERCLASS')) {
  content += '\n' + blasterCourse;
}

fs.writeFileSync('src/data/preconGuides.ts', content, 'utf8');
console.log('Successfully patched preconGuides.ts');
