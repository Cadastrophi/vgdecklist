import fs from 'fs';

// Map of real authentic URLs extracted from the Cardfight Fandom wiki tabbers
const realImageMap = {
  "D-SS03/001": {
    en: "https://static.wikia.nocookie.net/cardfight/images/a/a9/D-SS03-001EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/e/ea/D-SS03-001R_%28Sample%29.png/revision/latest"
  },
  "D-SS03/002": {
    en: "https://static.wikia.nocookie.net/cardfight/images/6/63/D-SS03-002EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/7/7e/D-SS03-002_%28Sample%29.png/revision/latest"
  },
  "D-SS03/003": {
    en: "https://static.wikia.nocookie.net/cardfight/images/1/18/D-SS03-003EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/d/db/D-SS03-003_%28Sample%29.png/revision/latest"
  },
  "D-SS03/004": {
    en: "https://static.wikia.nocookie.net/cardfight/images/a/ae/D-SS03-004EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/1/13/D-SS03-004_%28Sample%29.png/revision/latest"
  },
  "D-SS03/005": {
    en: "https://static.wikia.nocookie.net/cardfight/images/6/63/D-SS03-005EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/5/53/D-SS03-005_%28Sample%29.png/revision/latest"
  },
  "D-SS03/006": {
    en: "https://static.wikia.nocookie.net/cardfight/images/4/42/D-SS03-006EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/b/bf/D-SS03-006R_%28Sample%29.png/revision/latest"
  },
  "D-SS03/007": {
    en: "https://static.wikia.nocookie.net/cardfight/images/d/d1/D-SS03-007EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/9/95/D-SS03-007R_%28Sample%29.png/revision/latest"
  },
  "D-SS03/008": {
    en: "https://static.wikia.nocookie.net/cardfight/images/4/4a/D-SS03-008EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/a/ab/D-SS03-008R_%28Sample%29.png/revision/latest"
  },
  "D-SS03/009": {
    en: "https://static.wikia.nocookie.net/cardfight/images/c/c0/D-SS03-009EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/0/04/D-SS03-009_%28Sample%29.png/revision/latest"
  },
  "D-SS03/010": {
    en: "https://static.wikia.nocookie.net/cardfight/images/c/c9/D-SS03-010EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/c/c2/D-SS03-010R_%28Sample%29.png/revision/latest"
  },
  "D-SS03/011": {
    en: "https://static.wikia.nocookie.net/cardfight/images/d/d4/D-SS03-011EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/6/65/D-SS03-011_%28Sample%29.png/revision/latest"
  },
  "D-SS03/012": {
    en: "https://static.wikia.nocookie.net/cardfight/images/7/7f/D-BT01-016EN-ORR_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/9/96/D-BT01-SP16-SP_%28Sample%29.png/revision/latest"
  },
  "D-SS03/013": {
    en: "https://static.wikia.nocookie.net/cardfight/images/3/3f/D-BT06-075EN-C_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/f/f0/D-BT06-075-C_%28Sample%29.png/revision/latest"
  },
  "D-SS03/014": {
    en: "https://static.wikia.nocookie.net/cardfight/images/a/a3/D-BT06-076EN-C_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/4/44/D-BT06-076-C_%28Sample%29.png/revision/latest"
  },
  "D-SS03/015": {
    en: "https://static.wikia.nocookie.net/cardfight/images/2/23/D-BT06-077EN-C_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/2/2d/D-BT06-077-C_%28Sample%29.png/revision/latest"
  },
  "D-SS03/016": {
    en: "https://static.wikia.nocookie.net/cardfight/images/7/7b/D-BT06-078EN-C_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/5/5c/D-BT06-078-C_%28Sample%29.png/revision/latest"
  },
  "D-SS03/017": {
    en: "https://static.wikia.nocookie.net/cardfight/images/2/2d/D-SS03-017EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/5/54/D-SS03-017R_%28Sample%29.png/revision/latest"
  },
  "D-SS03/018": {
    en: "https://static.wikia.nocookie.net/cardfight/images/0/02/D-SS03-018EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/f/f3/D-SS03-018R_%28Sample%29.png/revision/latest"
  },
  "D-SS03/T03": {
    en: "https://static.wikia.nocookie.net/cardfight/images/3/3e/D-SS03-T01EN_%28Sample%29.png/revision/latest",
    jp: "https://static.wikia.nocookie.net/cardfight/images/b/b8/D-SS03-T03R_%28Sample%29.png/revision/latest"
  }
};

const cardsPath = 'src/data/cards.json';
const cards = JSON.parse(fs.readFileSync(cardsPath, 'utf8'));

cards.forEach(card => {
  const real = realImageMap[card.cardNo];
  if (real) {
    card.imageUrl = real.en;
    card.artVariants = [
      {
        rarity: card.rarity || 'TD',
        imageUrl: real.en,
        source: 'English Official'
      },
      {
        rarity: 'JP Sample',
        imageUrl: real.jp,
        source: 'Japanese Release'
      }
    ];
  }
});

fs.writeFileSync(cardsPath, JSON.stringify(cards, null, 2), 'utf8');
console.log('Successfully updated src/data/cards.json with authentic wiki tabber image URLs!');
