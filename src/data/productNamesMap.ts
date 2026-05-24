export const PRODUCT_NAMES_MAP: Record<string, string> = {
  // Page 4: Plastic chairs & tables
  "BS-127": "Plastic Chair (Big - H-14\")",
  "PSF-505C": "Zoom Chair (H-38.5cm)",
  "BSWP-PSF001": "Rubber Wood Chair (H-26cm)",
  "BS-118M1": "Metal Leg Chair (H-26cm)",
  "BS-127M": "Plastic Chair (Medium)",
  
  // Page 5-6: Plastic tables
  "BS-113": "Square Play Table (24\"x24\"x20\")",
  "BS-115": "Rectangular Activity Table (48\"x24\"x20\")",
  "BSP-114S": "Round Classroom Table (H-20\")",
  "BS-114": "Premium Hexagonal Group Table (H-20\")",
  "BSOK-260S": "Moon-Shaped Activity Table (54\"x30\"x20\")",
  "BS-111": "Kid-Scale Clover Leaf Table (61\"x33\"x20\")",
  "BSOK-BCD076": "Montessori Adjustable Height Table (122x60cm)",
  
  // Page 7: Wooden Classroom Furniture
  "BSOK-9500": "Solid Beechwood Round Table (D-122cm)",
  "BSOK-9610": "Premium Oval Wooden Group Table (167x82cm)",
  "BSOK-9510": "Rectangular Wooden Classroom Desk (122x60cm)",
  
  // Zoo Buddy / Mini Minds Double Seater Combos
  "ZBD-1G": "Zoo Buddy Double Seater (Green)",
  "ZBD-1R": "Zoo Buddy Double Seater (Red)",
  "MMD-1P": "Mini Minds Double Seater (Pink)",
  "MMD-1G": "Mini Minds Double Seater (Green)",
  "MMD-1R": "Mini Minds Double Seater (Red)",
  "OK-8090": "Mini Minds Hexagonal Collaborative Desk",
  
  // Activity / benches / soft blocks
  "BSL-136": "Montessori Active Play Plastic Bench",
  "BB-245": "Montessori Spiral Play Table (D-60cm)",
  "HL-2008": "My First Play Table",
  "BS-507": "Soft Stack Foam Blocks (Medium)",
  "SPS-105": "Soft Play Playpen Corner set",
  
  // Fences / play junctions
  "PSF-134N": "Play Junction Safety Fence (6-Piece Set)",
  "BS-135B": "Sensory Play Fence (Blue - 1pc)",
  "BS-135W": "Sensory Play Fence (Wood Finish - 1pc)",
  "OK-3330": "2-in-1 Play Junction Fence / Ball Pool",
  
  // Play Equipment / Ball Pools
  "GP-8011B": "Baby Bear Zone Ball Pool (Beige)",
  "GP-8011R": "Baby Bear Zone Ball Pool (Multicolor)",
  "BSOK-21414": "Hexagonal Ball Pool (D-158cm)",
  "PR-3618": "Rectangle Foam Ball Pen (160x80cm)",
  "BSP-912": "Jumbo Sensory Ball Pool",
  "PSF-5134": "Activity Club House (52\"x41\")",
  "PH-7328": "Montessori Forest Play House",
  "BSOK-PIPC": "Castle Play Center (Single Slide)",
  "OK-70159": "Indoor Playground Castle (Multi-Activity)",
  "70195-a": "Castle Play Center (with Double Slide)",
  "70159-b": "Jungle Gym Play Center",
  "BS-101": "Montessori Kingdom Play Castle",
  "BSOK-CLPC": "Kingdom Play Castle Premium (Dbl Slide)",
  "BSOK-FUPC": "Kingdom Play Castle Ultimate",
  "BSOK-WOPC": "Forest Adventure Playscape (Giant)",
  "BSOK-ROPC": "Royal Kingdom Playscape (Mega)",
  
  // Slides
  "OK-21406": "Unicorn Slide (with Basketball Hoop)",
  "BSP-216": "Elephant Slide & Swing Combo",
  "OK-21407": "Elephant Slide Senior (with Hoop)",
  "BSP-226": "Elephant Baby Slide",
  "OK-4341": "Unicorn Slide Senior (with Hoop)",
  "OK-2028": "Slide Supreme Active Play Slide",
  "OK-1210": "Baby Slide Senior",
  "BS-1220A": "Whimsical Rabbit Slide",
  "BS-1240": "Whimsical Elephant Slide",
  "PGS-208": "Sunny Day Slide (with Base)",
  "PGS-4302": "Activity Club Slide",
  "OK-21406-C": "Super Wavy Jumbo Slide",
  "BS-8001001": "Mega Inflatable Castle Slide",
  
  // Rockers
  "BSL-136-R": "3-in-1 Rocker, Climber & Bench",
  "rainbow-board": "Curved Birch Wood Balance Board",
  
  // Storage Shelf / racks
  "BSL-08-8": "Wooden Book Shelf (8-Bins)",
  "BSL-07-6": "Wooden Shoe Rack (6-Bins)",
  "BSL-01": "3-Tier Wooden Winning Podium",
  
  // Sensory & wall toys
  "Aryabhatta Rocket": "Aryabhatta Rocket Vertical Wall Board",
  "Woolly Sensory": "Woolly Sensory Activity Wall Panel",
  "The Sensory Wall": "Grand Montessori Sensory Wall Panel",
  "The Learning House": "The Learning House Activity Board",
  "The Learning Calendar": "The Learning Calendar Hanging Wall Board"
};

// Help clean OCR-messy product names using our dictionary or clean patterns
export const cleanProductName = (name: string, category: string, modelCode: string) => {
  const code = modelCode ? modelCode.replace(/\s+/g, '') : '';
  
  // Check our curated dictionary first
  if (PRODUCT_NAMES_MAP[code]) {
    return PRODUCT_NAMES_MAP[code];
  }
  
  // Partial code match in dictionary keys
  const dictKey = Object.keys(PRODUCT_NAMES_MAP).find(k => code.toUpperCase().includes(k.toUpperCase()) || k.toUpperCase().includes(code.toUpperCase()));
  if (dictKey) {
    return PRODUCT_NAMES_MAP[dictKey];
  }

  const isMessy = /["'*\\_|¢~§©]/.test(name) || name.length <= 4 || name.toLowerCase() === 'a' || name.toLowerCase() === 'o' || name.toLowerCase() === 'g' || name.toLowerCase() === '&';
  if (isMessy) {
    // Produce a clean fallback name from the category
    const cleanCat = category
      .replace(/Classroom Furniture|Wooden Classroom Furniture|Activity|Fence|Play Equipments|Play Equipment|Slides Swing Sets|Slides|Wall Toys|Sensory \/ Wall Toys/gi, '')
      .replace(/[–-]/g, '')
      .trim();
    return `Montessori ${cleanCat || 'Play Structure'} (${modelCode})`;
  }
  return name;
};
