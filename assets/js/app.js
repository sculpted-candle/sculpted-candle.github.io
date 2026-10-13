/**
 * SCULPTED&CANDLE — Main Application Script
 * Scrolltide "Threshold" scroll-driven cinematic entrance,
 * multi-category filtering, i18n (RU/EN), Telegram ordering,
 * 3-photo product hover & modal gallery, dynamic attributes, promocodes.
 */

// --- Default Categories ---
const DEFAULT_CATEGORIES = [
  { id: 'all', titleRu: 'Все изделия', titleEn: 'All Pieces' },
  { id: 'candles', titleRu: 'Свечи', titleEn: 'Candles' },
  { id: 'gypsum', titleRu: 'Гипс и подносы', titleEn: 'Plaster Decor' },
  { id: 'sets', titleRu: 'Подарочные сеты', titleEn: 'Gift Sets' },
  { id: 'seasonal', titleRu: 'Сезонное / Праздники', titleEn: 'Seasonal' }
];

// --- Default Scent Palette (Ароматы мастерской для выбора при заказе) ---
const DEFAULT_SCENTS = [
  { id: 'scent-1', title: 'Табак & Ваниль', desc: 'Пряный табачный лист, сливочная бурбонская ваниль, какао, теплые сухофрукты', active: true },
  { id: 'scent-2', title: 'Сандал, Черный перец & Амбра', desc: 'Благородный сандал, терпкий черный перец, теплая смолистая амбра', active: true },
  { id: 'scent-3', title: 'Крапива, Полынь & Луговые травы', desc: 'Свежескошенные луговые травы, горьковатая полынь, сосновая смола', active: true },
  { id: 'scent-4', title: 'Тыква со специями & Карамель', desc: 'Спелая печеная тыква, корица, мускатный орех, сливочная тягучая карамель', active: true },
  { id: 'scent-5', title: 'Имбирный пряник & Морозная хвоя', desc: 'Имбирное пряничное тесто, пряная гвоздика, морозные сосновые ветви', active: true },
  { id: 'scent-6', title: 'Бергамот, Инжир & Белый кедр', desc: 'Искристый зеленый бергамот, спелый инжир, пудровый белый кедр', active: true },
  { id: 'scent-7', title: 'Без отдушки (чистый соевый воск)', desc: 'Натуральный деликатный аромат экологически чистого растительного воска', active: true }
];

// --- Default Finishes (Типы покрытия) ---
const DEFAULT_FINISHES = [
  'Натуральный воск (без покрытия)',
  'Матовое защитное',
  'Полуматовое шелковистое',
  'Влагозащитное гидрофобное',
  'Золотое напыление (поталь)',
  'Серебряное напыление'
];

// --- Default Gypsum Colors (Цвета гипса) ---
const DEFAULT_GYPSUM_COLORS = [
  'Белоснежный гипс',
  'Теплый беж / Айвори',
  'Графит / Антрацит',
  'Черный мраморный микс',
  'Шалфей / Эвкалипт',
  'Нежная лаванда',
  'Пудровый терракот'
];

// --- Default Holidays (Сезонные праздники) ---
const DEFAULT_HOLIDAYS = [
  { id: 'all', name: 'Все коллекции', titleRu: 'Все коллекции', titleEn: 'All Collections', icon: '✨' },
  { id: 'ny', name: 'Новый Год & Рождество', titleRu: 'Новый Год & Рождество', titleEn: 'New Year & Christmas', icon: '❄️' },
  { id: 'feb14', name: '14 Февраля', titleRu: '14 Февраля', titleEn: "Valentine's Day", icon: '❤️' },
  { id: 'mar8', name: '8 Марта', titleRu: '8 Марта', titleEn: "Women's Day", icon: '🌷' },
  { id: 'easter', name: 'Пасха', titleRu: 'Пасха', titleEn: 'Easter', icon: '🐣' },
  { id: 'teacher', name: 'День Учителя / 1 Сентября', titleRu: 'День Учителя / 1 Сентября', titleEn: "Teacher's Day", icon: '📚' },
  { id: 'autumn', name: 'Хэллоуин & Осень', titleRu: 'Хэллоуин & Осень', titleEn: 'Halloween & Autumn', icon: '🎃' },
  { id: 'bday', name: 'День Рождения', titleRu: 'День Рождения', titleEn: 'Birthday', icon: '🎂' },
  { id: 'wedding', name: 'Свадьба & Годовщина', titleRu: 'Свадьба & Годовщина', titleEn: 'Wedding', icon: '💍' }
];

// --- Default Promocodes (Промокоды на скидку) ---
const DEFAULT_PROMOCODES = [
  { id: 'promo-1', code: 'SCULPTED10', type: 'percent', val: 10, desc: 'Скидка 10% на первый заказ', active: true },
  { id: 'promo-2', code: 'KATERINA', type: 'fixed', val: 300, desc: 'Скидка 300 ₽ от мастера', active: true },
  { id: 'promo-3', code: 'SPRING2026', type: 'percent', val: 15, desc: 'Весенняя скидка 15%', active: true }
];

// --- Default Collection Promo Toast ---
const DEFAULT_PROMO = {
  enabled: true,
  badge: 'Особая коллекция',
  title: 'Сет «Тепло и Камень»',
  desc: 'Гипсовый овальный поднос, свеча с потрескивающим деревянным фитилем и спички в стекле.',
  btnText: 'Заказать коллекцию',
  productId: 'sc-06'
};

// --- Initial Products Catalog (10 Curated Pieces with 3 photos each, ingredients, no burnTime) ---
const DEFAULT_PRODUCTS = [
  {
    id: 'sc-01',
    titleRu: 'Свеча «Тыковка» (Осенняя серия)',
    categories: ['candles', 'seasonal'],
    holidays: ['autumn'],
    price: 1200,
    status: 'in-stock',
    image: 'assets/img/product_1.jpg',
    images: ['assets/img/product_1.jpg', 'assets/img/product_8.jpg', 'assets/img/product_3.jpg'],
    ingredients: '100% соевый воск, хлопковый фитиль, премиальные аромамасла',
    availableScents: ['Тыква со специями & Карамель', 'Табак & Ваниль', 'Без отдушки (чистый соевый воск)'],
    availableFinishes: ['Натуральный воск (без покрытия)', 'Матовое защитное'],
    availableGypsumColors: ['Теплый беж / Айвори', 'Пудровый терракот', 'Белоснежный гипс'],
    descRu: 'Нежная фактурная свеча в виде спелой тыквы. Изготавливается из 100% соевого воска с хлопковым фитилем.',
    size: '8 × 7 см'
  },
  {
    id: 'sc-02',
    titleRu: 'Скульптурная свеча «Анатомическое сердце»',
    categories: ['candles', 'seasonal'],
    holidays: ['feb14', 'bday'],
    price: 1800,
    status: 'preorder',
    image: 'assets/img/product_4.jpg',
    images: ['assets/img/product_4.jpg', 'assets/img/product_6.jpg', 'assets/img/product_2.jpg'],
    ingredients: '100% натуральный соевый воск, хлопковый фитиль, премиальные французские аромамасла',
    availableScents: ['Сандал, Черный перец & Амбра', 'Табак & Ваниль', 'Бергамот, Инжир & Белый кедр', 'Без отдушки (чистый соевый воск)'],
    availableFinishes: ['Матовое защитное', 'Полуматовое шелковистое', 'Золотое напыление (поталь)'],
    availableGypsumColors: ['Белоснежный гипс', 'Графит / Антрацит', 'Теплый беж / Айвори', 'Черный мраморный микс'],
    descRu: 'Бестселлер и главный арт-объект мастерской. Невероятно детализированная ручная лепка и заливка. Время кропотливого изготовления — от 3 до 7 дней.',
    size: '11 × 8 см'
  },
  {
    id: 'sc-03',
    titleRu: 'Свеча «Карусель» (Праздничный предзаказ)',
    categories: ['candles', 'seasonal', 'sets'],
    holidays: ['ny', 'bday'],
    price: 2100,
    status: 'preorder',
    image: 'assets/img/product_3.jpg',
    images: ['assets/img/product_3.jpg', 'assets/img/product_7.jpg', 'assets/img/product_1.jpg'],
    ingredients: '100% растительный соевый воск, хлопковый фитиль, ароматические композиции из Граса',
    availableScents: ['Имбирный пряник & Морозная хвоя', 'Табак & Ваниль', 'Без отдушки (чистый соевый воск)'],
    availableFinishes: ['Матовое защитное', 'Золотое напыление (поталь)', 'Серебряное напыление'],
    availableGypsumColors: ['Теплый беж / Айвори', 'Белоснежный гипс'],
    descRu: 'Зимняя сказка в вашем доме. Изящные лошадки карусели и теплый аромат новогодних праздников. Открыт ранний предзаказ к зимнему сезону.',
    size: '12 × 10 см'
  },
  {
    id: 'sc-04',
    titleRu: 'Свеча «Крапива и Полынь» в гипсе',
    categories: ['candles', 'gypsum', 'seasonal'],
    holidays: ['teacher', 'mar8'],
    price: 1450,
    status: 'in-stock',
    image: 'assets/img/product_2.jpg',
    images: ['assets/img/product_2.jpg', 'assets/img/product_5.jpg', 'assets/img/product_4.jpg'],
    ingredients: '100% соевый воск, натуральный деревянный потрескивающий фитиль, скульптурный гипс',
    availableScents: ['Крапива, Полынь & Луговые травы', 'Бергамот, Инжир & Белый кедр', 'Без отдушки (чистый соевый воск)'],
    availableFinishes: ['Матовое защитное', 'Влагозащитное гидрофобное'],
    availableGypsumColors: ['Шалфей / Эвкалипт', 'Белоснежный гипс', 'Черный мраморный микс'],
    descRu: 'Аромасвеча в прочном гипсовом кашпо ручной отливки с деревянным потрескивающим фитилем, напоминающим уютный камин.',
    size: '9 × 8.5 см'
  },
  {
    id: 'sc-05',
    titleRu: 'Гипсовый овальный поднос для украшений',
    categories: ['gypsum', 'seasonal'],
    holidays: ['mar8', 'bday', 'teacher', 'wedding'],
    price: 750,
    status: 'in-stock',
    image: 'assets/img/product_5.jpg',
    images: ['assets/img/product_5.jpg', 'assets/img/product_2.jpg', 'assets/img/product_6.jpg'],
    ingredients: 'Скульптурный гипс повышенной прочности, гидрофобная пропитка, демпферы на дне',
    availableScents: ['Без отдушки (чистый соевый воск)'],
    availableFinishes: ['Полуматовое шелковистое', 'Влагозащитное гидрофобное', 'Золотое напыление (поталь)'],
    availableGypsumColors: ['Белоснежный гипс', 'Теплый беж / Айвори', 'Графит / Антрацит', 'Черный мраморный микс', 'Шалфей / Эвкалипт', 'Пудровый терракот'],
    descRu: 'Минималистичный поднос с гидрофобным защитным покрытием. Подходит для хранения украшений, духов, ключей или как подставка под свечи.',
    size: '18 × 9.5 см'
  },
  {
    id: 'sc-06',
    titleRu: 'Подарочный сет «Тепло и Камень»',
    categories: ['sets', 'gypsum', 'candles', 'seasonal'],
    holidays: ['ny', 'feb14', 'mar8', 'teacher', 'bday', 'wedding'],
    price: 2900,
    status: 'in-stock',
    image: 'assets/img/product_6.jpg',
    images: ['assets/img/product_6.jpg', 'assets/img/product_5.jpg', 'assets/img/product_4.jpg'],
    ingredients: 'Соевая свеча с деревянным фитилем, овальный поднос из гипса, спички в стекле, крафт-упаковка',
    availableScents: ['Бергамот, Инжир & Белый кедр', 'Сандал, Черный перец & Амбра', 'Табак & Ваниль'],
    availableFinishes: ['Матовое защитное', 'Полуматовое шелковистое'],
    availableGypsumColors: ['Белоснежный гипс', 'Теплый беж / Айвори', 'Графит / Антрацит', 'Черный мраморный микс'],
    descRu: 'Идеальный готовый подарок в крафтовой упаковке: свеча в гипсе, овальный поднос и стильные спички в стеклянной колбе.',
    size: 'Сет 3 предмета'
  },
  {
    id: 'sc-07',
    titleRu: 'Новогодний сет «Зимняя Сказка»',
    categories: ['candles', 'seasonal', 'sets'],
    holidays: ['ny'],
    price: 3200,
    status: 'preorder',
    image: 'assets/img/product_3.jpg',
    images: ['assets/img/product_3.jpg', 'assets/img/product_1.jpg', 'assets/img/product_7.jpg'],
    ingredients: '100% соевый воск, аромамасла корицы и хвои, скульптурный гипсовый декор, открытка',
    availableScents: ['Имбирный пряник & Морозная хвоя', 'Табак & Ваниль'],
    availableFinishes: ['Золотое напыление (поталь)', 'Матовое защитное'],
    availableGypsumColors: ['Белоснежный гипс', 'Теплый беж / Айвори'],
    descRu: 'Праздничный набор ручной работы: скульптурная свеча, новогодний декор из гипса, аромат морозной хвои и праздничная открытка с пожеланием.',
    size: 'Подарочный бокс'
  },
  {
    id: 'sc-08',
    titleRu: 'Подарочный бокс «Нежность» (к 8 Марта)',
    categories: ['candles', 'gypsum', 'seasonal', 'sets'],
    holidays: ['mar8', 'wedding'],
    price: 2600,
    status: 'in-stock',
    image: 'assets/img/product_7.jpg',
    images: ['assets/img/product_7.jpg', 'assets/img/product_4.jpg', 'assets/img/product_5.jpg'],
    ingredients: 'Ароматическая свеча в кашпо из соевого воска, поднос для украшений, сухоцветы, открытка',
    availableScents: ['Бергамот, Инжир & Белый кедр', 'Крапива, Полынь & Луговые травы'],
    availableFinishes: ['Полуматовое шелковистое', 'Матовое защитное'],
    availableGypsumColors: ['Нежная лаванда', 'Пудровый терракот', 'Теплый беж / Айвори', 'Белоснежный гипс'],
    descRu: 'Весенний подарочный бокс для самых любимых женщин: ароматическая свеча в кашпо из гипса, изящный поднос и деликатный цветочный комплимент.',
    size: 'Набор 2 предмета'
  },
  {
    id: 'sc-09',
    titleRu: 'Сет «Благодарность» (День Учителя / 1 Сентября)',
    categories: ['candles', 'gypsum', 'seasonal', 'sets'],
    holidays: ['teacher'],
    price: 1950,
    status: 'in-stock',
    image: 'assets/img/product_2.jpg',
    images: ['assets/img/product_2.jpg', 'assets/img/product_1.jpg', 'assets/img/product_6.jpg'],
    ingredients: 'Соевый воск, деревянный фитиль, мини-поднос из гипса, крафтовая коробка с лентой',
    availableScents: ['Крапива, Полынь & Луговые травы', 'Табак & Ваниль'],
    availableFinishes: ['Матовое защитное'],
    availableGypsumColors: ['Белоснежный гипс', 'Теплый беж / Айвори'],
    descRu: 'Изящный и душевный подарок преподавателю или наставнику: свеча с легким природным ароматом, мини-поднос для мелочей и крафтовая упаковка с лентой.',
    size: 'Сет с открыткой'
  },
  {
    id: 'sc-10',
    titleRu: 'Подарочный сет «С Днем Рождения!»',
    categories: ['sets', 'seasonal'],
    holidays: ['bday'],
    price: 3100,
    status: 'in-stock',
    image: 'assets/img/product_6.jpg',
    images: ['assets/img/product_6.jpg', 'assets/img/product_3.jpg', 'assets/img/product_8.jpg'],
    ingredients: 'Соевая свеча, гипсовый поднос, фирменные спички в стекле, праздничная открытка',
    availableScents: ['Табак & Ваниль', 'Сандал, Черный перец & Амбра', 'Бергамот, Инжир & Белый кедр'],
    availableFinishes: ['Полуматовое шелковистое', 'Золотое напыление (поталь)'],
    availableGypsumColors: ['Графит / Антрацит', 'Черный мраморный микс', 'Белоснежный гипс', 'Теплый беж / Айвори'],
    descRu: 'Универсальный праздничный подарок на юбилей или день рождения. Авторская ручная работа из Санкт-Петербурга с персональной открыткой.',
    size: 'Подарочный набор'
  }
];

// --- Auto-translate Russian craft titles and descriptions to English ---
function autoTranslateToEn(text) {
  if (!text) return '';
  const dict = [
    [/Скульптурная свеча «Анатомическое сердце»/gi, 'Sculpted Candle «Anatomical Heart»'],
    [/Свеча «Тыковка» \(Осенняя серия\)/gi, 'Pumpkin Candle (Autumn Edition)'],
    [/Свеча «Карусель» \(Праздничный предзаказ\)/gi, 'Carousel Candle (Holiday Preorder)'],
    [/Свеча «Крапива и Полынь» в гипсе/gi, 'Nettle & Wormwood Candle in Gypsum Vessel'],
    [/Гипсовый овальный поднос для украшений/gi, 'Gypsum Oval Tray for Jewelry & Candles'],
    [/Подарочный сет «Тепло и Камень»/gi, 'Gift Set «Warmth & Stone»'],
    [/Новогодний сет «Зимняя Сказка»/gi, 'New Year Gift Set «Winter Tale»'],
    [/Подарочный бокс «Нежность» \(к 8 Марта\)/gi, 'Spring Gift Box «Tenderness» (March 8)'],
    [/Сет «Благодарность» \(День Учителя \/ 1 Сентября\)/gi, 'Gratitude Gift Box (Teacher’s Day)'],
    [/Подарочный сет «С Днем Рождения!»/gi, 'Happy Birthday Handcrafted Set'],
    [/100% соевый воск/gi, '100% Natural Soy Wax'],
    [/хлопковый фитиль/gi, 'organic cotton wick'],
    [/деревянный фитиль|деревянный потрескивающий фитиль/gi, 'crackling wooden wick'],
    [/премиальные аромамасла|премиальные французские аромамасла/gi, 'premium French fragrance oils'],
    [/скульптурный гипс/gi, 'high-strength sculpted gypsum'],
    [/гидрофобная пропитка|влагозащитное покрытие/gi, 'water-resistant protective seal'],
    [/ручной работы/gi, 'handcrafted in St. Petersburg'],
    [/Натуральный воск \(без покрытия\)/gi, 'Natural Wax (Uncoated)'],
    [/Матовое защитное/gi, 'Matte Protective Finish'],
    [/Полуматовое шелковистое/gi, 'Silky Semi-Matte Finish'],
    [/Влагозащитное гидрофобное/gi, 'Water-Repellent Hydrophobic Seal'],
    [/Золотое напыление \(поталь\)/gi, 'Gold Leaf Accent (Potal)'],
    [/Серебряное напыление/gi, 'Silver Leaf Accent'],
    [/Белоснежный гипс/gi, 'Snow White Gypsum'],
    [/Теплый беж \/ Айвори/gi, 'Warm Beige / Ivory'],
    [/Графит \/ Антрацит/gi, 'Graphite / Anthracite'],
    [/Черный мраморный микс/gi, 'Black Marble Mix'],
    [/Шалфей \/ Эвкалипт/gi, 'Sage / Eucalyptus'],
    [/Нежная лаванда/gi, 'Delicate Lavender'],
    [/Пудровый терракот/gi, 'Powder Terracotta'],
    [/Табак & Ваниль/gi, 'Spiced Tobacco & Vanilla'],
    [/Сандал, Черный перец & Амбра/gi, 'Sandalwood, Black Pepper & Amber'],
    [/Крапива, Полынь & Луговые травы/gi, 'Nettle, Wormwood & Wild Herbs'],
    [/Тыква со специями & Карамель/gi, 'Spiced Pumpkin & Caramel'],
    [/Имбирный пряник & Морозная хвоя/gi, 'Gingerbread & Frosty Pine'],
    [/Бергамот, Инжир & Белый кедр/gi, 'Bergamot, Fig & White Cedar'],
    [/Без отдушки \(чистый соевый воск\)/gi, 'Unscented (Pure Soy Wax)'],
    [/Все изделия/gi, 'All Pieces'],
    [/Свечи/gi, 'Candles'],
    [/Гипс и подносы/gi, 'Plaster Decor'],
    [/Подарочные сеты/gi, 'Gift Sets'],
    [/Сезонное \/ Праздники/gi, 'Seasonal'],
    [/Все коллекции/gi, 'All Collections'],
    [/Новый Год & Рождество/gi, 'New Year & Christmas'],
    [/14 Февраля/gi, 'Valentine\'s Day'],
    [/8 Марта/gi, 'Women\'s Day'],
    [/Пасха/gi, 'Easter'],
    [/День Учителя \/ 1 Сентября/gi, 'Teacher\'s Day'],
    [/Хэллоуин & Осень/gi, 'Halloween & Autumn'],
    [/День Рождения/gi, 'Birthday'],
    [/Свадьба & Годовщина/gi, 'Wedding & Anniversary'],
    [/В наличии/gi, 'In Stock'],
    [/Под заказ \(3-7 дней\)|Под заказ \(3-7 дн\)/gi, 'Made to Order (3-7 days)']
  ];
  let res = text;
  dict.forEach(([rgx, rep]) => {
    res = res.replace(rgx, rep);
  });
  return res;
}

const TRANSLATIONS = {
  ru: {
    navBrandSub: 'Изделия из гипса & свечи ручной работы',
    navBrandCity: 'Санкт-Петербург',
    navCatalog: 'Каталог',
    navSpecial: 'Особая коллекция',
    navAbout: 'О мастере',
    navDelivery: 'Доставка',
    heroTag: 'Авторская мастерская из Санкт-Петербурга',
    heroTitle: 'Гипсовые изделия и свечи ручной работы',
    heroDesc: 'Эстетика натурального соевого воска, прочного гипса и тепла живого огня. Создаем предметы уюта и душевные подарки в мастерской Санкт-Петербурга.',
    heroCtaCatalog: 'Смотреть ассортимент',
    heroCtaTelegram: 'Написать Катерине',
    atelierLiveText: 'Мастерская в СПб',
    feat1Title: '100% Соевый воск',
    feat1Desc: 'Экологичный состав и чистое горение',
    feat2Title: 'Прочный гипс',
    feat2Desc: 'Гладкая обработка и влагостойкость',
    feat3Title: 'Премиальные аромамасла',
    feat3Desc: 'Тонкие и стойкие композиции',
    feat4Title: 'Доставка по РФ и Беларуси',
    feat4Desc: 'По РФ — любая служба, по РБ — СДЭК',
    catalogSubtitle: 'Коллекция изделий',
    catalogTitle: 'Ассортимент мастерской',
    holidayHeader: 'Тематические праздничные коллекции:',
    catalogSortLabel: 'Сортировка:',
    sortDefault: 'Авторский порядок',
    sortPriceAsc: 'Сначала недорогие',
    sortPriceDesc: 'Сначала премиум',
    statusInStock: 'В наличии',
    statusPreorder: 'Под заказ (3-7 дн)',
    btnOrderTg: 'Заказать изделие',
    btnQuickView: 'Быстрый просмотр',
    aboutSub: 'О мастере',
    aboutQuote: '«Я создаю вещи, которые наполняют пространство сказочным уютом, ароматами трав и спокойствием живого пламени.»',
    aboutText1: 'Привет! Меня зовут Катерина. Родом я из Беларуси, а мастерскую волшебных свечей и гипсового декора Sculpted&Candle создаю в Санкт-Петербурге. Для меня каждое изделие — это маленькая история тепла и душевного спокойствия.',
    aboutText2: 'Каждую свечу из чистого соевого воска и гипсовую форму я отливаю, шлифую и бережно упаковываю вручную. Доставляем заказы по всей России и Беларуси, чтобы в каждом доме зажегся огонек уюта.',
    stat1Num: '250+',
    stat1Lbl: 'Созданных свечей',
    stat2Num: '100%',
    stat2Lbl: 'Эко-материалы',
    stat3Num: '2-7 дн',
    stat3Lbl: 'Срок изготовления',
    deliverySub: 'Доставка и забота',
    deliveryTitle: 'Доставка по всей России и Беларуси',
    delivery1Title: 'Доставка по России',
    delivery1Desc: 'Отправляем заказы из Санкт-Петербурга любой удобной службой на ваш выбор: СДЭК, Почта России, Яндекс Доставка, Boxberry. Сроки по РФ: от 2 до 5 дней.',
    delivery2Title: 'Доставка в Беларусь',
    delivery2Desc: 'Регулярная отправка компанией СДЭК до двери или в пункт самовывоза в Минск, Брест, Гродно, Витебск, Гомель и все города РБ. Сроки: от 3 до 6 дней.',
    delivery3Title: 'Надёжная крафт-упаковка',
    delivery3Desc: 'Каждая свеча и гипсовое изделие упаковываются в воздушную защиту, многослойный крафт и плотный брендированный коробок. Доезжает в 100% целости.',
    deliveryCtaText: 'Нужно рассчитать доставку в ваш город?',
    deliveryCtaSub: 'Напишите Катерине — подскажет точный тариф и ближайший пункт выдачи.',
    deliveryCtaBtn: 'Уточнить доставку в Telegram',
    footerTagline: 'Мастерская гипсовых изделий и свечей ручной работы из Санкт-Петербурга.',
    footerNavTitle: 'Навигация',
    footerContactTitle: 'Связь & Соцсети',
    footerLocation: 'Санкт-Петербург • Доставка РФ и Беларусь',
    footerCopy: '© 2026 Sculpted&Candle. Все права защищены. · Санкт-Петербург',
    footerCraftLove: 'Ручная работа с любовью',
    footerMasterCabinet: 'Кабинет мастера',
    modalQuickTitle: 'Оформление заказа',
    modalIngredients: 'Состав:',
    modalAroma: 'Аромат:',
    modalColors: 'Цвет гипса:',
    modalFinish: 'Тип покрытия:',
    modalDimensions: 'Размеры:',
    modalDeliveryNote: 'Срок изготовления и доставка согласуются индивидуально в диалоге.'
  },
  en: {
    navBrandSub: 'Handcrafted gypsum decor & candles',
    navBrandCity: 'St. Petersburg',
    navCatalog: 'Catalog',
    navSpecial: 'Special Collection',
    navAbout: 'About Artist',
    navDelivery: 'Delivery',
    heroTag: 'Artisanal atelier from St. Petersburg',
    heroTitle: 'Handcrafted Gypsum Decor & Sculpted Candles',
    heroDesc: 'Tactile aesthetics of natural soy wax, durable plaster, and candlelight ambiance. Handcrafted cozy home decor and soulful gifts made in St. Petersburg.',
    heroCtaCatalog: 'Browse Collection',
    heroCtaTelegram: 'Message Katerina',
    atelierLiveText: 'Live Atelier • Handcrafting Sculpted Candles',
    feat1Title: '100% Soy Wax',
    feat1Desc: 'Clean, safe, non-toxic natural burn',
    feat2Title: 'Durable Plaster',
    feat2Desc: 'Smooth silky touch & moisture seal',
    feat3Title: 'Premium Fragrance Oils',
    feat3Desc: 'Subtle, lasting & elegant scents',
    feat4Title: 'Delivery across Russia & Belarus',
    feat4Desc: 'Fast shipping via CDEK & postal services',
    catalogSubtitle: 'Artisanal Collection',
    catalogTitle: 'Curated Workshop Pieces',
    holidayHeader: 'Curated Holiday Collections:',
    catalogSortLabel: 'Sort by:',
    sortDefault: 'Curated Order',
    sortPriceAsc: 'Price: Low to High',
    sortPriceDesc: 'Price: High to Low',
    statusInStock: 'In Stock',
    statusPreorder: 'Made to Order (3-7d)',
    btnOrderTg: 'Order Piece',
    btnQuickView: 'Quick View',
    aboutSub: 'About the Artist',
    aboutQuote: '«I craft pieces that bring warmth, forest scents, and visual serenity into your space.»',
    aboutText1: 'Hello! I am Katerina. Born in Belarus, I run the Sculpted&Candle artisanal workshop in St. Petersburg. For me, making candles and plaster decor is an art of slowing down and sharing cozy warmth.',
    aboutText2: 'Each piece is hand-cast, polished, and protected with care. We deliver across Russia using convenient parcel services, as well as shipping to Belarus via CDEK.',
    stat1Num: '250+',
    stat1Lbl: 'Candles Created',
    stat2Num: '100%',
    stat2Lbl: 'Eco Materials',
    stat3Num: '2-7 days',
    stat3Lbl: 'Crafting Time',
    deliverySub: 'Delivery & Care',
    deliveryTitle: 'Shipping across Russia & Belarus',
    delivery1Title: 'Delivery in Russia',
    delivery1Desc: 'Shipped from St. Petersburg via your preferred courier: CDEK, Russian Post, Yandex Delivery, Boxberry. Delivery time: 2–5 days.',
    delivery2Title: 'Delivery to Belarus',
    delivery2Desc: 'Regular CDEK deliveries to door or pickup points across Minsk, Brest, Grodno, Vitebsk, Gomel, and all cities. Delivery time: 3–6 days.',
    delivery3Title: 'Protective Craft Packaging',
    delivery3Desc: 'Each candle and plaster piece is wrapped in bubble protection, multi-layer craft paper, and packed in a sturdy box. Arrives 100% intact.',
    deliveryCtaText: 'Need shipping rates calculated for your city?',
    deliveryCtaSub: 'Message Katerina — she will calculate the exact rate and nearest pickup point.',
    deliveryCtaBtn: 'Check Delivery on Telegram',
    footerTagline: 'Artisanal plaster decor and handcrafted candles atelier from St. Petersburg.',
    footerNavTitle: 'Navigation',
    footerContactTitle: 'Contact & Socials',
    footerLocation: 'St. Petersburg • Shipping to Russia & Belarus',
    footerCopy: '© 2026 Sculpted&Candle. All rights reserved. · St. Petersburg',
    footerCraftLove: 'Handcrafted with love',
    footerMasterCabinet: 'Master Studio',
    modalQuickTitle: 'Order Request',
    modalIngredients: 'Ingredients:',
    modalAroma: 'Fragrance:',
    modalColors: 'Gypsum Color:',
    modalFinish: 'Texture / Finish:',
    modalDimensions: 'Dimensions:',
    modalDeliveryNote: 'Production schedule and delivery terms are arranged individually in chat.'
  }
};

// --- App State ---
let currentLang = localStorage.getItem('sc_lang') || 'ru';
let activeCategory = 'all';
let activeHoliday = 'all';
let currentSort = 'default';
let currentPage = 1;
let itemsPerPage = parseInt(localStorage.getItem('sc_items_per_page') || '6', 10);
let products = [];
let categories = [];
let scents = [];
let finishes = [];
let gypsumColors = [];
let holidays = [];
let promocodes = [];
let promoData = { ...DEFAULT_PROMO };
window.currentAppliedPromo = null;

// Initialize Products & Categories & Custom Attributes
function initData() {
  // Products
  const storedProd = localStorage.getItem('sc_products');
  if (storedProd) {
    try {
      products = JSON.parse(storedProd);
      products.forEach(p => {
        if (!p.categories) p.categories = p.category ? [p.category] : ['candles'];
        if (!p.holidays) p.holidays = [];
        if (!p.images || !p.images.length) p.images = [p.image || 'assets/img/product_1.jpg'];
      });
    } catch (e) {
      products = [...DEFAULT_PRODUCTS];
    }
  } else {
    products = [...DEFAULT_PRODUCTS];
    localStorage.setItem('sc_products', JSON.stringify(products));
  }

  // Categories
  const storedCat = localStorage.getItem('sc_categories');
  if (storedCat) {
    try {
      categories = JSON.parse(storedCat);
    } catch (e) {
      categories = [...DEFAULT_CATEGORIES];
    }
  } else {
    categories = [...DEFAULT_CATEGORIES];
    localStorage.setItem('sc_categories', JSON.stringify(categories));
  }

  // Scents
  const storedScents = localStorage.getItem('sc_scents');
  if (storedScents) {
    try {
      scents = JSON.parse(storedScents);
    } catch (e) {
      scents = [...DEFAULT_SCENTS];
    }
  } else {
    scents = [...DEFAULT_SCENTS];
    localStorage.setItem('sc_scents', JSON.stringify(scents));
  }

  // Finishes
  const storedFinishes = localStorage.getItem('sc_finishes');
  if (storedFinishes) {
    try {
      finishes = JSON.parse(storedFinishes);
    } catch (e) {
      finishes = [...DEFAULT_FINISHES];
    }
  } else {
    finishes = [...DEFAULT_FINISHES];
    localStorage.setItem('sc_finishes', JSON.stringify(finishes));
  }

  // Gypsum Colors
  const storedColors = localStorage.getItem('sc_gypsum_colors');
  if (storedColors) {
    try {
      gypsumColors = JSON.parse(storedColors);
    } catch (e) {
      gypsumColors = [...DEFAULT_GYPSUM_COLORS];
    }
  } else {
    gypsumColors = [...DEFAULT_GYPSUM_COLORS];
    localStorage.setItem('sc_gypsum_colors', JSON.stringify(gypsumColors));
  }

  // Holidays
  const storedHolidays = localStorage.getItem('sc_holidays');
  if (storedHolidays) {
    try {
      holidays = JSON.parse(storedHolidays);
    } catch (e) {
      holidays = [...DEFAULT_HOLIDAYS];
    }
  } else {
    holidays = [...DEFAULT_HOLIDAYS];
    localStorage.setItem('sc_holidays', JSON.stringify(holidays));
  }

  // Promocodes
  const storedPromos = localStorage.getItem('sc_promocodes');
  if (storedPromos) {
    try {
      promocodes = JSON.parse(storedPromos);
    } catch (e) {
      promocodes = [...DEFAULT_PROMOCODES];
    }
  } else {
    promocodes = [...DEFAULT_PROMOCODES];
    localStorage.setItem('sc_promocodes', JSON.stringify(promocodes));
  }

  // Collection Promo Toast
  const storedPromo = localStorage.getItem('sc_promo_popup');
  if (storedPromo) {
    try {
      promoData = { ...DEFAULT_PROMO, ...JSON.parse(storedPromo) };
    } catch (e) {
      promoData = { ...DEFAULT_PROMO };
    }
  } else {
    promoData = { ...DEFAULT_PROMO };
    localStorage.setItem('sc_promo_popup', JSON.stringify(promoData));
  }

  // Apply custom Hero photo & badge text from admin
  const heroImg = localStorage.getItem('sc_hero_img');
  if (heroImg) {
    const el = document.getElementById('hero-img-display');
    if (el) el.src = heroImg;
  }
  const heroBadgeTitle = localStorage.getItem('sc_hero_badge_title');
  if (heroBadgeTitle) {
    const el = document.getElementById('hero-badge-title');
    if (el) el.textContent = heroBadgeTitle;
  }
  const heroBadgeSub = localStorage.getItem('sc_hero_badge_sub');
  if (heroBadgeSub) {
    const el = document.getElementById('hero-badge-sub');
    if (el) el.textContent = heroBadgeSub;
  }

  // Apply custom About photo
  const aboutImg = localStorage.getItem('sc_about_img');
  if (aboutImg) {
    const el = document.getElementById('about-img-display');
    if (el) el.src = aboutImg;
  }

  // Apply editable texts
  applyCustomTexts();
}

// --- Apply Custom Editable Site Texts ---
function applyCustomTexts() {
  const textsStr = localStorage.getItem('sc_site_texts');
  if (!textsStr) return;
  try {
    const texts = JSON.parse(textsStr);
    Object.keys(texts).forEach(key => {
      const val = texts[key];
      if (val && typeof val === 'string') {
        const el = document.querySelector(`[data-i18n="${key}"]`);
        if (el) {
          el.textContent = val;
        }
      }
    });
  } catch (e) {
    console.warn('Error applying custom texts', e);
  }
}

// --- Load Synchronized Site Data from JSON (for real Netlify / multi-device deploy) ---
async function loadSiteData() {
  try {
    const res = await fetch('assets/data/site_data.json?v=' + Date.now(), { cache: 'no-store' });
    if (res.ok) {
      const data = await res.json();
      const localSavedTime = parseInt(localStorage.getItem('sc_last_local_save') || '0', 10);
      const remoteTime = data.lastUpdated ? new Date(data.lastUpdated).getTime() : 0;
      const hasLocalEdits = !!localStorage.getItem('sc_last_local_save');
      const preferLocal = hasLocalEdits && (localSavedTime >= remoteTime);

      if (!preferLocal || !localStorage.getItem('sc_products')) {
        if (data.products && Array.isArray(data.products) && data.products.length > 0) {
          products = data.products;
          localStorage.setItem('sc_products', JSON.stringify(products));
        }
        if (data.categories && Array.isArray(data.categories)) {
          categories = data.categories;
          localStorage.setItem('sc_categories', JSON.stringify(categories));
        }
        if (data.scents && Array.isArray(data.scents)) {
          scents = data.scents;
          localStorage.setItem('sc_scents', JSON.stringify(scents));
        }
        if (data.finishes && Array.isArray(data.finishes)) {
          finishes = data.finishes;
          localStorage.setItem('sc_finishes', JSON.stringify(finishes));
        }
        if (data.gypsumColors && Array.isArray(data.gypsumColors)) {
          gypsumColors = data.gypsumColors;
          localStorage.setItem('sc_gypsum_colors', JSON.stringify(gypsumColors));
        }
        if (data.holidays && Array.isArray(data.holidays)) {
          holidays = data.holidays;
          localStorage.setItem('sc_holidays', JSON.stringify(holidays));
        }
        if (data.promocodes && Array.isArray(data.promocodes)) {
          promocodes = data.promocodes;
          localStorage.setItem('sc_promocodes', JSON.stringify(promocodes));
        }
        renderCategoryTabs();
        renderHolidayChips();
        renderProducts();
      }
    }
  } catch (err) {
    // offline or local static mode
  }
}

// --- Category Tabs Rendering ---
function renderCategoryTabs() {
  const bar = document.getElementById('category-filter-bar');
  if (!bar) return;
  bar.innerHTML = '';

  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `cat-tab-btn ${cat.id === activeCategory ? 'active' : ''}`;
    btn.dataset.category = cat.id;
    btn.textContent = currentLang === 'ru' ? cat.titleRu : (cat.titleEn || autoTranslateToEn(cat.titleRu));

    btn.addEventListener('click', () => {
      activeCategory = cat.id;
      currentPage = 1;
      document.querySelectorAll('.cat-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const holidaySubEl = document.getElementById('holiday-subfilters');
      if (holidaySubEl) {
        if (cat.id === 'seasonal') {
          holidaySubEl.style.display = 'block';
          renderHolidayChips();
        } else {
          holidaySubEl.style.display = 'none';
          activeHoliday = 'all';
          document.querySelectorAll('.holiday-chip').forEach(c => {
            c.classList.toggle('active', c.getAttribute('data-holiday') === 'all');
          });
        }
      }

      renderProducts();
    });

    bar.appendChild(btn);
  });
}

// --- Render Dynamic Holiday Chips ---
function renderHolidayChips() {
  const container = document.getElementById('holiday-chips-container');
  if (!container) return;
  container.innerHTML = '';
  const currentHolidays = (holidays && holidays.length ? holidays : DEFAULT_HOLIDAYS);
  currentHolidays.forEach(h => {
    const btn = document.createElement('button');
    btn.className = `holiday-chip ${h.id === activeHoliday ? 'active' : ''}`;
    btn.dataset.holiday = h.id;
    const displayName = currentLang === 'ru' 
      ? (h.titleRu || h.name) 
      : (h.titleEn || autoTranslateToEn(h.titleRu || h.name));
    btn.textContent = `${h.icon ? h.icon + ' ' : ''}${displayName}`;
    btn.addEventListener('click', () => filterByHoliday(h.id));
    container.appendChild(btn);
  });
}

// --- Holiday Sub-filters Handler ---
window.filterByHoliday = function(holidayId) {
  activeHoliday = holidayId;
  currentPage = 1;
  document.querySelectorAll('.holiday-chip').forEach(c => {
    c.classList.toggle('active', c.getAttribute('data-holiday') === holidayId);
  });
  renderProducts();
};

// --- Sort Change Handler ---
window.handleSortChange = function(val) {
  currentSort = val;
  currentPage = 1;
  renderProducts();
};

// --- Go to Specific Catalog Page ---
window.goToPage = function(page) {
  currentPage = page;
  renderProducts();
  const catalogEl = document.getElementById('catalog');
  if (catalogEl) {
    catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

// --- Render Products Catalog ---
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const countInfo = document.getElementById('catalog-count-info');
  const paginationWrap = document.getElementById('catalog-pagination');
  if (!grid) return;

  // 1. Filter by category
  let filtered = activeCategory === 'all' 
    ? [...products] 
    : products.filter(p => p.categories && p.categories.includes(activeCategory));

  // 2. Filter by holiday (if in seasonal category and specific holiday chosen)
  if (activeCategory === 'seasonal' && activeHoliday !== 'all') {
    filtered = filtered.filter(p => p.holidays && p.holidays.includes(activeHoliday));
  }

  // 3. Sort
  if (currentSort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  }

  grid.innerHTML = '';

  const totalItems = filtered.length;
  if (totalItems === 0) {
    if (countInfo) countInfo.textContent = currentLang === 'ru' ? '0 изделий' : '0 items';
    if (paginationWrap) paginationWrap.innerHTML = '';
    
    const isHolidayFilter = activeCategory === 'seasonal' && activeHoliday !== 'all';
    const holidayObj = (holidays && holidays.length ? holidays : DEFAULT_HOLIDAYS).find(h => h.id === activeHoliday);
    const holidayTitle = holidayObj ? (holidayObj.titleRu || holidayObj.name) : '';

    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 50px 20px; background: var(--bg-surface); border: 1px dashed var(--border-light); border-radius: var(--radius-md);">
        <div style="display: flex; justify-content: center; margin-bottom: 14px; color: var(--accent-sage);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c0 4.5-5 7-5 11a5 5 0 0 0 10 0c0-4-5-6.5-5-11z"/></svg>
        </div>
        <h3 class="font-serif" style="font-size: 1.25rem; margin-bottom: 8px; color: var(--text-primary);">
          ${isHolidayFilter ? `Коллекция «${holidayTitle}» в мастерской` : 'В этой категории пока нет изделий'}
        </h3>
        <p style="font-size: 0.9rem; color: var(--text-secondary); max-width: 440px; margin: 0 auto 16px;">
          ${isHolidayFilter 
            ? 'Катерина принимает индивидуальные предзаказы на праздничные наборы и свечи. Напишите, и мы с радостью создадим подарок по вашим пожеланиям!' 
            : 'Скоро здесь появятся новые авторские работы.'}
        </p>
        <a href="https://t.me/layra_ms?text=${encodeURIComponent(`Здравствуйте, Катерина! Хочу уточнить заказ изделий к празднику ${holidayTitle}`)}" target="_blank" class="btn btn-primary btn-sm">
          Написать Катерине в Telegram
        </a>
      </div>
    `;
    return;
  }

  // 4. Paginate
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  if (currentPage > totalPages) currentPage = totalPages;
  if (currentPage < 1) currentPage = 1;

  const startIdx = (currentPage - 1) * itemsPerPage;
  const paged = filtered.slice(startIdx, startIdx + itemsPerPage);

  // Update count info
  if (countInfo) {
    const endIdx = Math.min(startIdx + itemsPerPage, totalItems);
    countInfo.textContent = currentLang === 'ru'
      ? `Показано ${startIdx + 1}–${endIdx} из ${totalItems} изделий`
      : `Showing ${startIdx + 1}–${endIdx} of ${totalItems} pieces`;
  }

  // Render product cards with 2-photo hover swap & ingredients
  paged.forEach(p => {
    const title = currentLang === 'ru' ? p.titleRu : autoTranslateToEn(p.titleRu);
    const desc = currentLang === 'ru' ? p.descRu : autoTranslateToEn(p.descRu);
    const ingredients = p.ingredients 
      ? (currentLang === 'ru' ? p.ingredients : autoTranslateToEn(p.ingredients))
      : (currentLang === 'ru' ? '100% соевый воск, хлопковый фитиль' : '100% natural soy wax, cotton wick');
    const statusText = p.status === 'in-stock' 
      ? TRANSLATIONS[currentLang].statusInStock 
      : TRANSLATIONS[currentLang].statusPreorder;
    const statusClass = p.status === 'in-stock' ? 'status-in-stock' : 'status-preorder';

    const imgMain = (p.images && p.images[0]) || p.image || 'assets/img/product_1.jpg';
    const imgHover = (p.images && p.images[1]) || (p.images && p.images[0]) || p.image;

    const card = document.createElement('article');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="card-img-wrap" onclick="openQuickView('${p.id}')">
        <img src="${imgMain}" alt="${title}" class="card-img card-img-main" loading="lazy" onerror="this.src='assets/img/product_1.jpg'">
        ${imgHover && imgHover !== imgMain ? `<img src="${imgHover}" alt="${title}" class="card-img-hover" loading="lazy" onerror="this.style.display='none'">` : ''}
        <span class="card-badge-status ${statusClass}">${statusText}</span>
        <div class="card-quick-view-overlay">
          <button class="btn btn-outline btn-sm" style="background: rgba(255,255,255,0.95);">${TRANSLATIONS[currentLang].btnQuickView}</button>
        </div>
      </div>
      <div class="card-body">
        <h3 class="card-title" onclick="openQuickView('${p.id}')">${title}</h3>
        <div class="card-scent">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2c0 4.5-5 7-5 11a5 5 0 0 0 10 0c0-4-5-6.5-5-11z"/></svg>
          <span style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 260px;">${TRANSLATIONS[currentLang].modalIngredients} ${ingredients}</span>
        </div>
        <p class="card-desc">${desc}</p>
        <div class="card-footer">
          <div class="card-price">${p.price.toLocaleString('ru-RU')} ₽</div>
          <button onclick="openQuickView('${p.id}')" class="btn btn-primary btn-sm btn-card-order" aria-label="Заказать ${title}">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 0 0-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.75-.56 2.94-1.28 4.91-2.12 5.9-2.53 2.81-1.17 3.39-1.37 3.77-1.38.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .34z"/></svg>
            <span class="btn-order-text">${TRANSLATIONS[currentLang].btnOrderTg}</span>
          </button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  // 4. Render Pagination Controls
  if (paginationWrap) {
    if (totalPages <= 1) {
      paginationWrap.innerHTML = '';
      return;
    }

    let pagesHtml = `
      <div class="pagination-controls">
        <button class="page-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="goToPage(${currentPage - 1})">
          ‹
        </button>
    `;

    for (let i = 1; i <= totalPages; i++) {
      pagesHtml += `
        <button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="goToPage(${i})">
          ${i}
        </button>
      `;
    }

    pagesHtml += `
        <button class="page-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="goToPage(${currentPage + 1})">
          ›
        </button>
      </div>
      <div class="pagination-info">Страница ${currentPage} из ${totalPages}</div>
    `;

    paginationWrap.innerHTML = pagesHtml;
  }

  // Trigger reveal observer for dynamically rendered cards
  if (typeof initScrollReveal === 'function') {
    initScrollReveal();
  }
}

// --- Quick View Modal with 3-photo gallery, dynamic attributes & promocode ---
window.openQuickView = function(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;

  window.currentAppliedPromo = null;

  const title = currentLang === 'ru' ? p.titleRu : autoTranslateToEn(p.titleRu);
  const desc = currentLang === 'ru' ? p.descRu : autoTranslateToEn(p.descRu);
  const ingredients = p.ingredients 
    ? (currentLang === 'ru' ? p.ingredients : autoTranslateToEn(p.ingredients))
    : (currentLang === 'ru' ? '100% натуральный соевый воск, хлопковый / деревянный фитиль, премиальные аромамасла' : '100% natural soy wax, cotton or wooden wick, fine fragrance oils');
  const statusText = p.status === 'in-stock' 
    ? TRANSLATIONS[currentLang].statusInStock 
    : TRANSLATIONS[currentLang].statusPreorder;

  const images = (p.images && p.images.length > 0) ? p.images : [p.image || 'assets/img/product_1.jpg'];

  // Allowed Scents
  const allScents = (scents && scents.length ? scents : DEFAULT_SCENTS).filter(s => s.active !== false);
  const allowedScents = (p.availableScents && p.availableScents.length > 0)
    ? allScents.filter(s => p.availableScents.includes(s.title))
    : allScents;
  const finalScents = allowedScents.length > 0 ? allowedScents : allScents;

  // Allowed Finishes
  const allFinishes = (finishes && finishes.length ? finishes : DEFAULT_FINISHES);
  const allowedFinishes = (p.availableFinishes && p.availableFinishes.length > 0)
    ? allFinishes.filter(f => p.availableFinishes.includes(f))
    : allFinishes;
  const finalFinishes = allowedFinishes.length > 0 ? allowedFinishes : allFinishes;

  // Allowed Gypsum Colors
  const allColors = (gypsumColors && gypsumColors.length ? gypsumColors : DEFAULT_GYPSUM_COLORS);
  const allowedColors = (p.availableGypsumColors && p.availableGypsumColors.length > 0)
    ? allColors.filter(c => p.availableGypsumColors.includes(c))
    : allColors;
  const finalColors = allowedColors.length > 0 ? allowedColors : allColors;

  const body = document.getElementById('quickview-modal-body');
  body.innerHTML = `
    <div class="quickview-grid">
      <div class="quickview-img-wrap">
        <img id="quickview-active-img" src="${images[0]}" alt="${title}" class="quickview-img" onerror="this.src='assets/img/product_1.jpg'">
        ${images.length > 1 ? `
          <div class="quickview-thumbs-wrap">
            ${images.map((img, idx) => `
              <button type="button" class="quickview-thumb-btn ${idx === 0 ? 'active' : ''}" onclick="window.switchQuickviewImg('${img}', this)">
                <img src="${img}" alt="Фото ${idx + 1}" onerror="this.src='assets/img/product_1.jpg'">
              </button>
            `).join('')}
          </div>
        ` : ''}
      </div>
      <div class="quickview-info">
        <span class="card-badge-status ${p.status === 'in-stock' ? 'status-in-stock' : 'status-preorder'}">
          ${statusText}
        </span>
        <h3 class="heading-md" style="margin: 8px 0;">${title}</h3>
        <div class="quickview-price" id="quickview-price-display">
          ${p.price.toLocaleString('ru-RU')} ₽
        </div>

        <div class="quickview-prop-row" style="margin-bottom: 8px;">
          <strong style="color: var(--text-primary); font-size: 0.84rem;">${TRANSLATIONS[currentLang].modalIngredients}</strong>
          <span class="quickview-prop-val" style="font-size: 0.84rem; color: var(--text-secondary);">${ingredients}</span>
        </div>

        ${p.size ? `
          <div class="quickview-meta-row" style="margin-bottom: 12px;">
            <span>${TRANSLATIONS[currentLang].modalDimensions} ${p.size}</span>
          </div>
        ` : ''}

        <p class="quickview-desc" style="margin-bottom: 16px;">
          ${desc}
        </p>

        <!-- Интерактивная форма оформления заявки -->
        <div class="order-form-box">
          <h4 class="order-form-title">Заявка на изготовление / покупку</h4>
          
          <form id="form-item-order" onsubmit="submitProductOrder(event, '${p.id}')">
            
            <!-- Выбор аромата из доступных для изделия -->
            <div class="scent-picker-wrap">
              <div class="scent-select-label">
                <span>${TRANSLATIONS[currentLang].modalAroma}</span>
                <span style="font-size: 0.72rem; color: var(--accent-sage); font-weight: normal;">палитра изделия</span>
              </div>
              <select id="order-scent-select" class="scent-select-input" onchange="window.updateScentDescPreview(this.value)">
                ${finalScents.map((s, idx) => `<option value="${s.title}" ${idx === 0 ? 'selected' : ''}>${s.title}</option>`).join('')}
              </select>
              <div class="scent-desc-box">
                <div class="scent-notes-title">Ноты аромата:</div>
                <div id="scent-notes-desc">${finalScents[0] ? finalScents[0].desc : ''}</div>
              </div>
            </div>

            <!-- Выбор типа покрытия -->
            <div class="form-group" style="margin-bottom: 10px;">
              <label class="form-label" style="font-size: 0.78rem;">${TRANSLATIONS[currentLang].modalFinish}</label>
              <select id="order-finish-select" class="scent-select-input" style="padding: 8px 12px; font-size: 0.86rem;">
                ${finalFinishes.map((f, idx) => `<option value="${f}" ${idx === 0 ? 'selected' : ''}>${f}</option>`).join('')}
              </select>
            </div>

            <!-- Выбор цвета гипса -->
            <div class="form-group" style="margin-bottom: 12px;">
              <label class="form-label" style="font-size: 0.78rem;">${TRANSLATIONS[currentLang].modalColors}</label>
              <select id="order-color-select" class="scent-select-input" style="padding: 8px 12px; font-size: 0.86rem;">
                ${finalColors.map((c, idx) => `<option value="${c}" ${idx === 0 ? 'selected' : ''}>${c}</option>`).join('')}
              </select>
            </div>

            <!-- Ввод промокода на скидку -->
            <div class="order-promo-box" style="margin-bottom: 12px; background: #FAF9F6; border: 1px solid var(--border-light); border-radius: 8px; padding: 12px;">
              <label style="display: block; font-size: 0.76rem; font-weight: 600; color: var(--accent-sage-dark); margin-bottom: 6px;">
                🎟️ Есть промокод на скидку?
              </label>
              <div style="display: flex; gap: 8px;">
                <input type="text" id="order-promo-input" class="form-input" placeholder="Код (напр: SCULPTED10)" style="text-transform: uppercase; font-size: 0.85rem; padding: 8px 10px; flex: 1;">
                <button type="button" class="btn btn-outline btn-sm" onclick="window.applyPromoCode('${p.id}')" style="white-space: nowrap; padding: 8px 14px; font-weight: 600;">
                  Применить
                </button>
              </div>
              <div id="order-promo-msg" style="display: none; font-size: 0.8rem; margin-top: 8px; line-height: 1.4;"></div>
            </div>

            <div class="form-group" style="margin-bottom: 10px;">
              <label class="form-label" style="font-size: 0.78rem;">Ваше имя *</label>
              <input type="text" id="order-customer-name" class="form-input" placeholder="Как к вам обращаться?" required style="padding: 8px 12px; font-size: 0.86rem;">
            </div>

            <div class="form-group" style="margin-bottom: 12px;">
              <label class="form-label" style="font-size: 0.78rem;">Телефон / Telegram для связи *</label>
              <input type="tel" id="order-customer-phone" class="form-input" placeholder="+7 (999) 000-00-00 или @username" required style="padding: 8px 12px; font-size: 0.86rem;">
            </div>

            <!-- Обязательное уведомление клиенту -->
            <div class="order-promise-note">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="flex-shrink:0; color: var(--accent-sage);"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
              <span>С вами свяжутся для уточнения деталей, сроков и доставки.</span>
            </div>

            <button type="submit" class="btn btn-primary" style="width: 100%; padding: 12px; font-weight: 600;">
              Отправить заявку мастеру
            </button>
          </form>

          <div id="order-success-msg" class="order-success-banner" style="display: none; text-align: left; background: #F4F7F5; border: 1.5px solid var(--accent-sage); border-radius: 12px; padding: 20px;">
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
              <span style="font-size: 1.3rem;">🎉</span>
              <span style="font-size: 1.15rem; font-weight: 700; color: var(--accent-sage-dark);" id="order-success-title">Заявка принята!</span>
            </div>
            <p id="order-success-text" style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55; margin-bottom: 14px;">
              Спасибо! Заявка на «${title}» успешно отправлена мастеру.
            </p>
            <div style="background: #FFFFFF; border-left: 3px solid var(--accent-sage); padding: 12px 14px; border-radius: 6px; font-size: 0.84rem; color: #2D3748; line-height: 1.5; margin-bottom: 16px;">
              <strong>Что будет дальше:</strong><br>
              Мастер Катерина свяжется с вами для уточнения деталей, оттенка и адреса доставки СДЭК.<br>
              <span style="color: var(--accent-sage-dark); font-weight: 600;">Персональную ссылку на безопасную оплату через СБП Катерина направит вам напрямую в диалоге после согласования!</span>
            </div>
            <div style="display: flex; flex-direction: column; gap: 8px;">
              <a id="order-tg-direct-link" href="#" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="width: 100%; text-align: center; display: flex; align-items: center; justify-content: center; gap: 8px; text-decoration: none; padding: 11px;">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.37.75-.56 2.95-1.29 4.92-2.14 5.92-2.57 2.82-1.21 3.4-1.42 3.79-1.42.09 0 .28.02.4.12.1.08.13.19.14.27-.01.07.01.21 0 .36z"/></svg>
                <span>Написать Катерине в Telegram</span>
              </a>
              <button type="button" class="btn btn-outline" onclick="closeQuickView()" style="width: 100%; text-align: center; padding: 10px;">
                Понятно, спасибо
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  document.getElementById('modal-quickview').classList.add('active');
};

// --- Helper: Switch active Quickview Photo from Thumbnails ---
window.switchQuickviewImg = function(url, btn) {
  const mainImg = document.getElementById('quickview-active-img');
  if (mainImg) {
    mainImg.style.opacity = '0.3';
    setTimeout(() => {
      mainImg.src = url;
      mainImg.style.opacity = '1';
    }, 150);
  }
  document.querySelectorAll('.quickview-thumb-btn').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');
};

// --- Helper: Apply Promocode ---
window.applyPromoCode = function(productId) {
  const input = document.getElementById('order-promo-input');
  const msgEl = document.getElementById('order-promo-msg');
  if (!input || !msgEl) return;
  const code = input.value.trim().toUpperCase();
  if (!code) {
    msgEl.style.display = 'block';
    msgEl.style.color = '#C53030';
    msgEl.textContent = 'Введите промокод';
    return;
  }

  const allPromos = JSON.parse(localStorage.getItem('sc_promocodes') || 'null') || DEFAULT_PROMOCODES;
  const promo = allPromos.find(pr => pr.code.toUpperCase() === code && pr.active !== false);

  const p = products.find(item => item.id === productId);
  if (!p) return;

  if (!promo) {
    msgEl.style.display = 'block';
    msgEl.style.color = '#C53030';
    msgEl.innerHTML = '❌ Промокод не найден или срок действия истек';
    window.currentAppliedPromo = null;
    const priceDisplay = document.getElementById('quickview-price-display');
    if (priceDisplay) priceDisplay.innerHTML = `${p.price.toLocaleString('ru-RU')} ₽`;
    return;
  }

  let discount = 0;
  if (promo.type === 'percent') {
    discount = Math.round((p.price * promo.val) / 100);
  } else {
    discount = Math.min(promo.val, p.price);
  }
  const finalPrice = Math.max(0, p.price - discount);

  window.currentAppliedPromo = {
    code: promo.code,
    type: promo.type,
    val: promo.val,
    discount: discount,
    finalPrice: finalPrice
  };

  const priceDisplay = document.getElementById('quickview-price-display');
  if (priceDisplay) {
    priceDisplay.innerHTML = `
      <span style="text-decoration: line-through; color: var(--text-muted); font-size: 1.05rem; margin-right: 8px;">${p.price.toLocaleString('ru-RU')} ₽</span>
      <span style="color: var(--accent-sage-dark); font-weight: 700;">${finalPrice.toLocaleString('ru-RU')} ₽</span>
    `;
  }

  msgEl.style.display = 'block';
  msgEl.style.color = '#2F855A';
  msgEl.innerHTML = `✓ Промокод <strong>${promo.code}</strong> применен! Скидка ${promo.val}${promo.type === 'percent' ? '%' : ' ₽'} (-${discount.toLocaleString('ru-RU')} ₽)`;
};

// --- Helper: Update Scent Notes Preview in Modal ---
window.updateScentDescPreview = function(scentTitle) {
  const found = (scents && scents.length ? scents : DEFAULT_SCENTS).find(s => s.title === scentTitle);
  const descEl = document.getElementById('scent-notes-desc');
  if (descEl && found) {
    descEl.textContent = found.desc || 'Натуральная ароматическая композиция';
  }
};

// --- Product Order Submission Handler ---
window.submitProductOrder = async function(event, productId) {
  event.preventDefault();
  const p = products.find(item => item.id === productId);
  if (!p) return;

  const submitBtn = event.target.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = '⏳ Оформляем заказ...';
  }

  const customerName = document.getElementById('order-customer-name').value.trim();
  const customerPhone = document.getElementById('order-customer-phone').value.trim();
  const selectedScent = document.getElementById('order-scent-select')?.value || 'Стандартный';
  const selectedFinish = document.getElementById('order-finish-select')?.value || 'Матовое защитное';
  const selectedColor = document.getElementById('order-color-select')?.value || 'Белоснежный гипс';

  const orderId = 'SC-' + Math.floor(100 + Math.random() * 900);
  const appliedPromo = window.currentAppliedPromo;
  const totalAmount = appliedPromo ? appliedPromo.finalPrice : p.price;
  const deliveryType = 'СДЭК / Почта РФ';
  const deliveryAddress = 'г. Санкт-Петербург (уточняется)';

  let comment = `Аромат: ${selectedScent}, цвет: ${selectedColor}, покрытие: ${selectedFinish}`;
  if (appliedPromo) {
    comment += ` | Промокод: ${appliedPromo.code} (скидка -${appliedPromo.discount} ₽)`;
  }

  const orderPayload = {
    orderId,
    date: new Date().toLocaleString('ru-RU'),
    customerName,
    customerPhone,
    productId: p.id,
    productTitle: p.titleRu,
    total: totalAmount,
    originalPrice: p.price,
    promoCode: appliedPromo ? appliedPromo.code : null,
    discountAmount: appliedPromo ? appliedPromo.discount : 0,
    items: [
      {
        id: p.id,
        title: p.titleRu,
        price: totalAmount,
        scent: selectedScent,
        colors: selectedColor,
        finish: selectedFinish
      }
    ],
    deliveryType,
    deliveryAddress,
    comment,
    status: 'new'
  };

  // 1. Save to local storage for Admin panel
  try {
    const existingOrders = JSON.parse(localStorage.getItem('sc_orders') || '[]');
    existingOrders.unshift(orderPayload);
    localStorage.setItem('sc_orders', JSON.stringify(existingOrders));
  } catch (e) {
    console.error('Error saving order to localStorage', e);
  }

  // 2. Client-side fallback pay URL
  let payUrl = `pay.html?order=${orderId}&amount=${totalAmount}&desc=${encodeURIComponent(p.titleRu)}&client=${encodeURIComponent(customerName)}`;

  let tgSentFromBackend = false;
  try {
    const resp = await fetch('/api/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderPayload)
    });
    if (resp.ok) {
      const data = await resp.json();
      if (data && data.payUrl) {
        payUrl = data.payUrl;
      }
      tgSentFromBackend = true;
    }
  } catch (err) {
    console.warn('Backend order sync notice:', err);
  }

  // Cloud relay for GitHub Pages & standalone hosting (runs via Netlify serverless)
  if (!tgSentFromBackend) {
    try {
      const cloudResp = await fetch('https://sculpted-candle.netlify.app/.netlify/functions/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload)
      });
      if (cloudResp.ok) {
        const cloudData = await cloudResp.json();
        if (cloudData && cloudData.payUrl) {
          payUrl = cloudData.payUrl;
        }
      }
    } catch (netErr) {
      console.warn('Netlify cloud relay notice:', netErr);
    }
  }

  // 3. Update Quick View modal state
  const form = document.getElementById('form-item-order');
  const successMsg = document.getElementById('order-success-msg');
  const tgLinkBtn = document.getElementById('order-tg-direct-link');

  let directTgText = `Здравствуйте, Катерина! Я хочу заказать изделие «${p.titleRu}» (${totalAmount} ₽).\nМое имя: ${customerName}\nКонтакты: ${customerPhone}\nАромат: ${selectedScent}\nПокрытие: ${selectedFinish}\nЦвет: ${selectedColor}`;
  if (appliedPromo) {
    directTgText += `\nПромокод: ${appliedPromo.code} (скидка -${appliedPromo.discount} ₽)`;
  }
  const directTgUrl = `https://t.me/layra_ms?text=${encodeURIComponent(directTgText)}`;

  const textEl = document.getElementById('order-success-text');
  if (textEl) {
    textEl.innerHTML = `Спасибо, <strong>${customerName}</strong>! Ваша заявка на «<strong>${p.titleRu}</strong>» (${totalAmount} ₽) получена мастером.`;
  }

  if (form) form.style.display = 'none';
  if (successMsg) successMsg.style.display = 'block';
  if (tgLinkBtn) tgLinkBtn.href = directTgUrl;
};

// --- Language Switcher ---
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('sc_lang', lang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  const t = TRANSLATIONS[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  renderCategoryTabs();
  renderHolidayChips();
  renderProducts();
}

// --- Editorial Entrance & Smooth Navigation ---
function setupEditorialEntrance() {
  const enterBtn = document.getElementById('btn-enter-workshop');
  if (enterBtn) {
    enterBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('catalog');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  // Smooth scroll for delivery anchors
  document.querySelectorAll('a[href="#delivery"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('delivery');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        target.classList.add('highlight-flash');
        setTimeout(() => target.classList.remove('highlight-flash'), 2000);
      }
    });
  });
}

// --- Modal backdrop close listener ---
function setupModalCloseListeners() {
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        backdrop.classList.remove('active');
      }
    });
  });

  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('.modal-backdrop');
      if (modal) modal.classList.remove('active');
    });
  });
}

window.closeQuickView = function() {
  const modal = document.getElementById('modal-quickview');
  if (modal) modal.classList.remove('active');
};

// --- Scroll Reveal (IntersectionObserver) ---
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!reveals.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  
  reveals.forEach(el => observer.observe(el));
}

// --- Scroll to Top Button ---
function initScrollTopBtn() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;
  
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 400) {
          btn.classList.add('visible');
        } else {
          btn.classList.remove('visible');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// --- Magic Sparks Particle Engine ---
function initMagicSparks() {
  const canvases = document.querySelectorAll('.hero-sparks-canvas, .about-sparks-canvas');
  canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');
    let width, height;
    let animationFrameId;
    let isVisible = true;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      width = canvas.width = rect.width || 300;
      height = canvas.height = rect.height || 400;
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    const particleCount = 35;
    const particles = [];

    class Spark {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        const originX = width * (0.45 + Math.random() * 0.15);
        const originY = height * (0.65 + Math.random() * 0.2);

        this.x = initial ? originX + (Math.random() - 0.5) * (width * 0.7) : originX + (Math.random() - 0.5) * 40;
        this.y = initial ? Math.random() * height : originY + (Math.random() - 0.5) * 30;
        this.size = Math.random() * 2.4 + 0.8;
        this.speedY = -(Math.random() * 0.7 + 0.35);
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.life = 0;
        this.maxLife = Math.random() * 180 + 100;
        this.baseAlpha = Math.random() * 0.55 + 0.25;
        this.hue = Math.random() > 0.4 ? 42 : 32;
      }

      update() {
        this.life++;
        this.x += this.speedX + Math.sin(this.life * 0.04) * 0.35;
        this.y += this.speedY;

        if (this.life >= this.maxLife || this.y < -10 || this.x < -10 || this.x > width + 10) {
          this.reset();
        }
      }

      draw() {
        const progress = this.life / this.maxLife;
        let alpha = this.baseAlpha;
        if (progress < 0.2) {
          alpha = this.baseAlpha * (progress / 0.2);
        } else if (progress > 0.7) {
          alpha = this.baseAlpha * ((1 - progress) / 0.3);
        }

        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${this.hue}, 90%, 65%, ${alpha})`;
        ctx.shadowColor = `hsla(${this.hue}, 100%, 60%, ${alpha * 0.8})`;
        ctx.shadowBlur = this.size * 3.5;
        ctx.fill();
        ctx.restore();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Spark());
    }

    function animate() {
      if (isVisible) {
        ctx.clearRect(0, 0, width, height);
        particles.forEach(p => {
          p.update();
          p.draw();
        });
      }
      animationFrameId = requestAnimationFrame(animate);
    }

    const obs = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    obs.observe(canvas);

    animate();
  });
}

// --- Dynamic 3D Hero Card Tilt ---
function initMagicHeroCard() {
  const cards = document.querySelectorAll('.hero-visual-card');
  cards.forEach(card => {
    const flameGlow = card.querySelector('.hero-flame-glow');

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const tiltX = (y - centerY) / centerY * -3;
      const tiltY = (x - centerX) / centerX * 3;

      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

      if (flameGlow) {
        const offsetX = (x - centerX) * 0.05;
        const offsetY = (y - centerY) * 0.05;
        flameGlow.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) scale(1.1)`;
      }
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
      if (flameGlow) {
        flameGlow.style.transform = 'translate(-50%, -50%) scale(1)';
      }
    });
  });
}

// --- Mobile Bottom Navigation Scroll Tracking ---
function initMobileBottomNav() {
  const sections = ['hero', 'catalog', 'about', 'delivery'];
  const navItems = document.querySelectorAll('.mobile-nav-item[data-nav]');
  if (!navItems.length) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        let current = 'hero';
        const scrollY = window.scrollY;
        sections.forEach(id => {
          const el = document.getElementById(id);
          if (el && scrollY >= el.offsetTop - 200) {
            current = id;
          }
        });

        navItems.forEach(item => {
          if (item.getAttribute('data-nav') === current) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
}

// --- Initialize App ---
document.addEventListener('DOMContentLoaded', () => {
  initData();
  setupEditorialEntrance();
  renderCategoryTabs();
  renderProducts();
  setupModalCloseListeners();
  loadSiteData();

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  setLanguage(currentLang);

  const urlParams = new URLSearchParams(window.location.search);
  const openProd = urlParams.get('product');
  if (openProd) {
    openQuickView(openProd);
  }

  initScrollReveal();
  initScrollTopBtn();
  initMagicSparks();
  initMagicHeroCard();
  initMobileBottomNav();
});
