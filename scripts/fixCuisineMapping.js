const fs = require('fs');
const path = require('path');

// Cuisine classification rules based on restaurant names and descriptions
const cuisineRules = {
  indian: [
    'dishoom', 'gymkhana', 'maharaja', 'kricket', 'chettinad', 'aladin', 'brigadiers', 
    'bengal village', 'cinnamon bazaar', 'pravaas', 'fat chef', 'paro', 'jilani', 
    'tandoor', 'sangeetha', 'hichki', 'de cafe lounge', 'de biryani', 'colonel saab',
    'taste of lahore', 'shahs halal food', 'haweli', 'royal nawaab', 'hyderabad darbar',
    'punjab grill', 'tawa grill', 'manjaros', 'spice khazana', 'sultan', 'colony',
    'aroma authentic dum biriyani', 'indi-go rasoi', 'baba\'s village'
  ],
  italian: [
    'circolo popolare', 'carlotta', 'ave mario', 'grasso', 'gloria', 'bocca di lupo',
    'faros', 'padella', 'bocconcino', 'osteria romana', 'amalfi', 'bancone', 'como garden',
    'doppo', 'manteca', 'giulia', 'sparrow italia', 'luca', 'amor gastronomia', 'da mario',
    'osteria napoletana', 'ci tua osteria', 'la mia mamma', 'il sugo', 'fatto a mano',
    'casa fofó', 'buon appetito', 'la bella napoli', 'italina385'
  ],
  japanese: [
    'zuma', 'kanpai', 'machiya', 'oita', 'maru', 'sanjugo', 'high yaki', 'eat tokyo',
    'niju', 'roka', 'rai restaurant', 'uzumaki', 'inko nito', 'hot stone', 'shack-fuyu',
    'yiqi', 'tattu', 'din tai fung', 'yauatcha', 'hutong', 'house of ming', 'peacock',
    'noble palace', 'the sichuan', 'min jiang', 'nanyang blossom', 'ma la sichuan',
    'shan shui', 'a. wong', 'golden dragon', 'speedboat', 'platapian', 'shoryu',
    'miyako', 'master bao'
  ],
  chinese: [
    'fatt pundit', 'yauatcha', 'gold mine', 'hutong', 'house of ming', 'peacock',
    'noble palace', 'the sichuan', 'min jiang', 'nanyang blossom', 'ma la sichuan',
    'shan shui', 'a. wong', 'golden dragon', 'speedboat', 'platapian', 'dan dan',
    'dragon\'s den', 'far east kitchen', 'mr wong\'s wok', 'gansu', 'yauatcha city',
    'lucky cat', 'shezan', 'zu\'s'
  ],
  thai: [
    'kolae', 'nua', 'smoking goat', 'khao bird', 'kiln', 'plaza khao gaeng', 'patara',
    'banana tree', 'champor-champor', 'kin + deum', 'chet\'s', 'busaba', 'thai'
  ],
  turkish: [
    'kibele', 'firin', 'gokyuzu', 'tower mangal', 'efes', 'ishtar', 'the mantl',
    'cirrik', 'liman', 'hala', 'antalya', 'ottoman', 'fes', 'selale', 'midpoint',
    'zahter', 'riviera', 'my shish', 'kervan', 'ottomans', 'kasiba', 'lokma',
    'sultan sofrasi', 'tanjia', 'tanjia garden', 'olives and oregano'
  ],
  french: [
    'bouchon racine', '64 goodge street', 'la palombe', 'le relais de venise',
    'l\'escargot', 'galvin la chapelle', 'chez bruce', 'maison françois',
    'casse-croûte', 'clos maggiore', 'pavyllon', 'la trompette', 'mon plaisir',
    'gauthier', 'studio gauthier', 'the ledbury', 'helène darroze', 'core',
    'restaurant 1890', 'cycene', 'the ninth', 'the ritz', 'ormer', 'hide',
    'humo', 'frog by adam', 'scully'
  ],
  spanish: [
    'sabor', 'copita', 'barrafina', 'dehesa', 'donostia', 'aqua nueva', 'lobos',
    'salt yard', 'luna llena', 'little taperia', 'el ganso', 'santo remedio',
    'el pastor', 'ixchel', 'los mochis', 'el cenote', 'cavita', 'yucca'
  ],
  korean: [
    'majang dong', 'arang', 'seoul tokyo', 'jang', 'bibimbap', 'daebak', 'miga',
    'assa', 'bibimbop', 'korean'
  ],
  mexican: [
    'cu4tro', 'fonda', 'wahaca', 'santo remedio', 'el pastor', 'ixchel', 'los mochis',
    'el cenote', 'cavita', 'yucca', 'mexican'
  ],
  british: [
    'the great chase', 'the banc', 'steak and company', 'elvet steakhouse', 'azura',
    'le bab', 'naroon', 'cyprus mangal', 'the connaught', 'nosh', 'meat street',
    'restaurant favorit', 'the devonshire', 'dirty bones', 'the seafood bar',
    'noble rot', 'bill\'s', 'cahoots', 'bao', 'señor ceviche', 'flat iron',
    'blacklock', 'popolo', 'smokestak', 'the blues kitchen', 'lahpet', 'the clove club',
    'camino', 'brat', 'rochelle canteen', 'the light bar', 'barrio', '34 mayfair',
    'bacchanalia', 'coya', 'gaia', 'the maine', 'roka', 'corrigan\'s', 'isabel',
    'the ivy asia', 'grilandia', 'hakkasan', 'bluebird', 'the ivy chelsea',
    'la mia mamma', 'the chelsea corner', 'daphne\'s', 'no. fifty cheyne',
    'granger & co.', 'stanley\'s', 'mucci\'s', 'the cadogan arms', 'baba',
    'bottarga', 'gaucho', 'caravan', 'da mario', 'balthazar', 'browns',
    'inamo', 'cora pearl', 'osteria napoletana', 'granger and co.', 'gold',
    'frame', 'wild', 'lush & hush', 'the barbary', 'zephyr', 'ci tua',
    'caractère', 'la mia mamma', 'dove', 'taqueria', 'the blues kitchen',
    'il sugo', 'laz', 'daphne', 'la patagonia', 'turtle bay', 'jamon jamon',
    'purezza', 'frida', 'band of burgers', 'made in brasil', 'coco',
    'brother marcus', 'the ivy', 'barbarella', 'gaucho', 'blacklock',
    'kricket', 'roe', 'brera lounge', 'roka', 'dishoom', 'hawksmoor',
    'six by nico', 'amerigo vespucci', 'hotto potto', 'bocca in cielo',
    'rasoi ghar', 'du\'aa diner', 'tayyabs', 'dilpasand', 'babel grill',
    'dan dan', 'janna', 'halal restaurant', 'grounded', 'sylhet nights',
    'dragon\'s den', 'naan staap', 'baristas lounge', 'madina grill',
    'shahs halal food', 'zaiqa', 'baraka eatery', 'maedah grill',
    'grill guys', 'madison steak', 'haweli', 'royal nawaab', 'hyderabad darbar',
    'punjab grill', 'tawa grill', 'manjaros', 'spice khazana', 'sultan',
    'colony', 'franzos', 'naan staap', 'grill house', 'paradise', 'neyzen',
    'turtle bay', 'ciao bella', 'braza', 'blue orchid', 'ivy tree',
    'cosmo world buffet', 'roosters piri piri', 'minoa', 'veyso\'s',
    'sunrise lutong', 'tilaw', 'wagamama', 'crem kitchen', 'flippin grill',
    'kervan kitchen', 'my shish', 'shahs halal food', 'lara grill',
    'bekash', 'stack & sizzle', 'kervan saray', 'chef asia', 'yebaba',
    'nasi isda', 'ottomans', 'kasiba', 'bread street kitchen', 'kokin',
    'hera', 'figo', 'bamboo-mat', 'union social', 'lokma', 'elondi',
    'stk steakhouse', 'darkhorse', 'mezban', 'big easy', 'busaba',
    'xix nineteen', 'kitchen e20', 'wahaca', 'santi', 'the grill',
    'the fat crab', 'master bao', 'aroma authentic', 'indi-go rasoi',
    'cafe rasa malaysia', 'al zayt', 'hs & co', 'steakout', 'bababoom',
    'the westbridge', 'stax burgers', 'tanjia', 'cabana', 'the solo kitchen',
    'fatto a mano', 'maple brunch', 'palmers', 'arepa & co', 'restaurant elis',
    'ombra', 'desi lounge', 'da terra', 'brawn', 'cav', 'afghan grill',
    'princelyn', 'the star', 'briq', 'chaskaas', 'halal street kitchen',
    'purpleish', 'shah\'s halal food', 'andy\'s burgers', 'mr wong\'s wok',
    'gansu', 'get stuffed', 'papi', 'dalla', 'morito', 'rogues', 'elliot\'s',
    'cafe cecilia', 'angelina', 'lardo', 'shankeys', 'narrow kitchen',
    'casa fofó', 'mama', 'big night', 'planque', 'rao\'s', 'mare street',
    'the alchemist', 'big easy', 'caravan', 'oysteria', 'eggslut', 'wahaca',
    'yolk', 'smoke end', 'darling\'s', 'the bourbon', 'momlette', 'grounded',
    'bibimbop', 'bow grill', 'smoke & pepper', 'morgan arms', 'milagros',
    'far east kitchen', 'bun & sum', 'meat up', 'buon appetito', 'the coborn',
    'afrikana', 'the victoria', 'ariana', 'mile end sandwich', 'simply smashed',
    'wngz', 'the coffee room', 'nando\'s', 'damal', 'food coma', 'king\'s flavour',
    'rose peri peri', 'suite 85', 'las iguanas', 'shoryu', 'bbq express',
    'hardies peri peri', 'smash', 'slice of meat', 'sultan sofrasi', 'tanjia',
    'tanjia garden', 'kolapata', 'olives and oregano', 'needo', 'sotto cucina',
    'feast and mishti', 'makkah grill', 'spice hut', 'the munch', 'liverpool street',
    'eggslut', 'lucky cat', 'yauatcha', 'the drift', 'the ivy city', 'luca dsq',
    'eataly', 'dirty martini', 'piccolino', 'canto corvino', 'gaucho broadgate',
    'mcdonald\'s', 'devonshire terrace', 'miyako', 'faroz', 'salamis', 'shezan',
    'crave station', 'wazir', 'smoke & pepper', 'the urban chocolatier', 'zu\'s',
    'famz peri peri', 'taj grill', 'gallio', 'scarpetta', 'capeesh', 'bethnal green',
    'italina385', 'the common', 'phat for life', 'the full monty', 'arches cafe',
    'nando\'s', 'al-safa grill', 'sweet café', 'la bella napoli', 'shah\'s halal food',
    'par london', 'lala\'s grill', 'my shish', 'salash kitchen', 'shahs halal food',
    'asado steakhouse', 'e3 vegan', 'the hogless roast', 'sen viet vegan', 'siddhi',
    'bubala', 'essential vegan', 'facing heaven', 'taste of india', 'plantxology',
    'vegan biosphere', 'adyar ananda', 'dauns', 'shinde\'s', 'the coven',
    'the spread eagle', 'wave', 'tofu vegan', 'black cat', 'mildreds', 'fed by plants',
    'baba\'s village'
  ],
  mediterranean: [
    'cyprus mangal', 'mildreds', 'mallow', 'vantra vegan', 'vegan yes', 'tendril',
    'gauthier', 'studio gauthier', 'bubala', 'mildreds', 'tofu vegan', 'govinda\'s',
    'unity diner', 'holy carrot', 'kin cafe', 'meat the vegans', 'plants of roselyn',
    'cream dream', 'love shack', 'mallow', 'mildreds', 'the veg box', 'mildreds',
    'vegan planet', 'the ledbury', 'ekstedt', 'dinner by heston', 'restaurant st. barts',
    'evelyn\'s table', 'kitchen table', 'restaurant story', 'row on 5', 'akoko',
    'helène darroze', 'core', 'behind restaurant', 'restaurant 1890', 'cycene',
    'the ninth', 'the ritz', 'ormer', 'hide', 'humo', 'frog by adam', 'scully',
    'el&n', 'l\'eto', 'scarlett green', 'lumi', 'victoria house', 'farm girl',
    'london night cafe', 'kennington lane', 'regency cafe', 'st james\'s',
    'drury covent garden', 'café kitsuné', 'old queen street', 'e pellicci',
    'morr', 'dulce coffee', 'el&n park lane', 'cafe maya', 'feya', 'arabica',
    'prufrock', 'monmouth coffee', 'omotesando', 'kiss the hippo', 'kaffeine',
    'rosslyn', 'ozone', 'hideaway', 'chill house', 'lever & bloom', 'batch baby',
    'saint nine', 'coffee london', 'attendant', 'coffee island', 'formative',
    'coffee & friends', 'monmouth coffee', 'arôme bakery', 'e5 bakehouse',
    'aux pains de papy', 'fortitude', 'beigel bake', 'chestnut bakery',
    'the dusty knuckle', 'common breads', 'bageriet', 'miel bakery', 'maison bertaux',
    'chestnut bakery', 'arôme bakery', 'toad bakery', 'maya\'s bakehouse',
    'gail\'s bakery', 'dunn\'s bakery', 'don\'t tell dad', 'patisserie sainte anne',
    'fabrique bakery', 'the buttery', 'paradise green', 'sunday in brooklyn',
    'brother marcus', 'eggbreak', 'brother marcus', 'duck & waffle', 'milk beach',
    'broken eggs', 'drunch', 'the breakfast club', 'the table café', 'nessa',
    'bill\'s', 'kozzee cafe', 'the wolseley', 'amber', 'the breakfast club',
    'brother marcus', 'the breakfast club', 'coppa club', 'the breakfast club',
    'the little scarlet door', 'swift', 'amazing grace', 'nightjar', 'alcotraz',
    'florattica', 'stereo', 'simmons', 'opium', 'the cocktail club', 'disrepute',
    'pulse bar', 'mr fogg\'s', 'bar soho', 'a bar with shapes', 'soma', 'lyaness',
    'bussey rooftop', 'nine lives', 'be at one', 'the rooftop', 'wagtail',
    'london bridge rooftop', 'mercer roof', 'madison', 'kitty hawk', 'miradora',
    'circe\'s rooftop', 'aviary', 'savage garden', '1 leicester square',
    'joia restaurant', 'pergola', 'the soho social', 'blacklock', 'kapara',
    'the devonshire', 'dirty bones', 'the seafood bar', 'noble rot', 'bill\'s',
    'cahoots', 'bao', 'señor ceviche', 'kricket', 'flat iron', 'blacklock',
    'popolo', 'padella', 'smokestak', 'the blues kitchen', 'lahpet', 'the clove club',
    'camino', 'brat', 'rochelle canteen', 'the light bar', 'barrio', '34 mayfair',
    'bacchanalia', 'coya', 'gaia', 'the maine', 'roka', 'corrigan\'s', 'isabel',
    'noble rot', 'the ivy asia', 'grilandia', 'hakkasan', 'bluebird', 'the ivy chelsea',
    'la mia mamma', 'the chelsea corner', 'daphne\'s', 'no. fifty cheyne',
    'granger & co.', 'stanley\'s', 'mucci\'s', 'the cadogan arms', 'baba',
    'bottarga', 'flat iron', 'gaucho', 'caravan', 'blacklock', 'da mario',
    'balthazar', 'browns', 'banana tree', 'inamo', 'cora pearl', 'osteria napoletana',
    'granger and co.', 'gold', 'frame', 'wild', 'lush & hush', 'the barbary',
    'zephyr', 'ci tua', 'caractère', 'la mia mamma', 'dove', 'taqueria',
    'the blues kitchen', 'il sugo', 'laz', 'daphne', 'la patagonia', 'turtle bay',
    'jamon jamon', 'purezza', 'frida', 'band of burgers', 'made in brasil',
    'coco', 'brother marcus', 'the ivy', 'barbarella', 'gaucho', 'blacklock',
    'kricket', 'roe', 'brera lounge', 'roka', 'dishoom', 'hawksmoor',
    'six by nico', 'amerigo vespucci', 'hotto potto', 'bocca in cielo',
    'rasoi ghar', 'du\'aa diner', 'tayyabs', 'dilpasand', 'babel grill',
    'dan dan', 'janna', 'halal restaurant', 'grounded', 'sylhet nights',
    'dragon\'s den', 'naan staap', 'baristas lounge', 'madina grill',
    'shahs halal food', 'zaiqa', 'baraka eatery', 'maedah grill',
    'grill guys', 'madison steak', 'haweli', 'royal nawaab', 'hyderabad darbar',
    'punjab grill', 'tawa grill', 'manjaros', 'spice khazana', 'sultan',
    'colony', 'franzos', 'naan staap', 'grill house', 'paradise', 'neyzen',
    'turtle bay', 'ciao bella', 'braza', 'blue orchid', 'ivy tree',
    'cosmo world buffet', 'roosters piri piri', 'minoa', 'veyso\'s',
    'sunrise lutong', 'tilaw', 'wagamama', 'crem kitchen', 'flippin grill',
    'kervan kitchen', 'my shish', 'shahs halal food', 'lara grill',
    'bekash', 'stack & sizzle', 'kervan saray', 'chef asia', 'yebaba',
    'nasi isda', 'ottomans', 'kasiba', 'bread street kitchen', 'kokin',
    'hera', 'figo', 'bamboo-mat', 'union social', 'lokma', 'elondi',
    'stk steakhouse', 'darkhorse', 'mezban', 'big easy', 'busaba',
    'xix nineteen', 'kitchen e20', 'wahaca', 'santi', 'the grill',
    'the fat crab', 'master bao', 'aroma authentic', 'indi-go rasoi',
    'cafe rasa malaysia', 'al zayt', 'hs & co', 'steakout', 'bababoom',
    'the westbridge', 'stax burgers', 'tanjia', 'cabana', 'the solo kitchen',
    'fatto a mano', 'maple brunch', 'palmers', 'arepa & co', 'restaurant elis',
    'ombra', 'desi lounge', 'da terra', 'brawn', 'cav', 'afghan grill',
    'princelyn', 'the star', 'briq', 'chaskaas', 'halal street kitchen',
    'purpleish', 'shah\'s halal food', 'andy\'s burgers', 'mr wong\'s wok',
    'gansu', 'get stuffed', 'papi', 'dalla', 'morito', 'rogues', 'elliot\'s',
    'cafe cecilia', 'angelina', 'lardo', 'shankeys', 'narrow kitchen',
    'casa fofó', 'mama', 'big night', 'planque', 'rao\'s', 'mare street',
    'the alchemist', 'big easy', 'caravan', 'oysteria', 'eggslut', 'wahaca',
    'yolk', 'smoke end', 'darling\'s', 'the bourbon', 'momlette', 'grounded',
    'bibimbop', 'bow grill', 'smoke & pepper', 'morgan arms', 'milagros',
    'far east kitchen', 'bun & sum', 'meat up', 'buon appetito', 'the coborn',
    'afrikana', 'the victoria', 'ariana', 'mile end sandwich', 'simply smashed',
    'wngz', 'the coffee room', 'nando\'s', 'damal', 'food coma', 'king\'s flavour',
    'rose peri peri', 'suite 85', 'las iguanas', 'shoryu', 'bbq express',
    'hardies peri peri', 'smash', 'slice of meat', 'sultan sofrasi', 'tanjia',
    'tanjia garden', 'kolapata', 'olives and oregano', 'needo', 'sotto cucina',
    'feast and mishti', 'makkah grill', 'spice hut', 'the munch', 'liverpool street',
    'eggslut', 'lucky cat', 'yauatcha', 'the drift', 'the ivy city', 'luca dsq',
    'eataly', 'dirty martini', 'piccolino', 'canto corvino', 'gaucho broadgate',
    'mcdonald\'s', 'devonshire terrace', 'miyako', 'faroz', 'salamis', 'shezan',
    'crave station', 'wazir', 'smoke & pepper', 'the urban chocolatier', 'zu\'s',
    'famz peri peri', 'taj grill', 'gallio', 'scarpetta', 'capeesh', 'bethnal green',
    'italina385', 'the common', 'phat for life', 'the full monty', 'arches cafe',
    'nando\'s', 'al-safa grill', 'sweet café', 'la bella napoli', 'shah\'s halal food',
    'par london', 'lala\'s grill', 'my shish', 'salash kitchen', 'shahs halal food',
    'asado steakhouse', 'e3 vegan', 'the hogless roast', 'sen viet vegan', 'siddhi',
    'bubala', 'essential vegan', 'facing heaven', 'taste of india', 'plantxology',
    'vegan biosphere', 'adyar ananda', 'dauns', 'shinde\'s', 'the coven',
    'the spread eagle', 'wave', 'tofu vegan', 'black cat', 'mildreds', 'fed by plants',
    'baba\'s village'
  ],
  vietnamese: [
    'sen viet vegan', 'facing heaven', 'vietnamese'
  ],
  caribbean: [
    'turtle bay', 'caribbean'
  ]
};

function classifyCuisine(venue) {
  const name = venue.name.toLowerCase();
  const description = (venue.description || '').toLowerCase();
  const text = `${name} ${description}`;
  
  // Check each cuisine rule
  for (const [cuisine, keywords] of Object.entries(cuisineRules)) {
    for (const keyword of keywords) {
      if (text.includes(keyword)) {
        return cuisine;
      }
    }
  }
  
  // Default fallback based on common patterns
  if (text.includes('coffee') || text.includes('cafe') || text.includes('bakery')) {
    return 'british';
  }
  
  if (text.includes('bar') || text.includes('cocktail') || text.includes('pub')) {
    return 'british';
  }
  
  // If no match found, keep as modern european for now
  return 'modern european';
}

function fixCuisineMapping() {
  try {
    const filePath = path.join(process.cwd(), 'public/venues.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    let data = JSON.parse(fileContent);
    
    const venues = data.venues || data;
    let fixedCount = 0;
    
    console.log('🔍 Analyzing cuisine classifications...');
    
    venues.forEach(venue => {
      const originalCuisine = venue.cuisines ? venue.cuisines[0] : 'modern european';
      const newCuisine = classifyCuisine(venue);
      
      if (originalCuisine !== newCuisine) {
        venue.cuisines = [newCuisine];
        fixedCount++;
        console.log(`✅ ${venue.name}: ${originalCuisine} → ${newCuisine}`);
      }
    });
    
    // Save the updated data
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
    
    console.log(`\n📊 Summary:`);
    console.log(`   Total venues: ${venues.length}`);
    console.log(`   Fixed classifications: ${fixedCount}`);
    
    // Generate new cuisine counts
    const cuisineCounts = {};
    venues.forEach(venue => {
      if (venue.cuisines && venue.cuisines.length > 0) {
        const cuisine = venue.cuisines[0];
        cuisineCounts[cuisine] = (cuisineCounts[cuisine] || 0) + 1;
      }
    });
    
    console.log(`\n🍽️  New Cuisine Distribution:`);
    Object.entries(cuisineCounts)
      .sort(([,a], [,b]) => b - a)
      .forEach(([cuisine, count]) => {
        console.log(`   ${cuisine}: ${count} restaurants`);
      });
    
    return { success: true, fixedCount, totalVenues: venues.length };
    
  } catch (error) {
    console.error('❌ Error fixing cuisine mapping:', error);
    return { success: false, error: error.message };
  }
}

// Run the fix
const result = fixCuisineMapping();

if (result.success) {
  console.log(`\n✅ Cuisine mapping fixed successfully!`);
  console.log(`   Fixed ${result.fixedCount} out of ${result.totalVenues} venues`);
} else {
  console.log(`\n❌ Failed to fix cuisine mapping: ${result.error}`);
}
