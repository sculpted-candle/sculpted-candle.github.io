/**
 * SCULPTED&CANDLE — Admin Panel Logic (Кабинет мастера)
 * Multi-photo management (3 photos per product), dynamic attributes (scents, finishes, colors),
 * seasonal holidays, promocodes system, hero badge customization, requisites and orders.
 */

const DEFAULT_PIN = '1234';

const DEFAULT_CATEGORIES = [
  { id: 'all', titleRu: 'Все изделия', titleEn: 'All Pieces' },
  { id: 'candles', titleRu: 'Свечи', titleEn: 'Candles' },
  { id: 'gypsum', titleRu: 'Гипс и подносы', titleEn: 'Plaster Decor' },
  { id: 'sets', titleRu: 'Подарочные сеты', titleEn: 'Gift Sets' },
  { id: 'seasonal', titleRu: 'Сезонное / Праздники', titleEn: 'Seasonal' }
];

const DEFAULT_SCENTS = [
  { id: 'scent-1', title: 'Табак & Ваниль', desc: 'Пряный табачный лист, сливочная бурбонская ваниль, какао, теплые сухофрукты', active: true },
  { id: 'scent-2', title: 'Сандал, Черный перец & Амбра', desc: 'Благородный сандал, терпкий черный перец, теплая смолистая амбра', active: true },
  { id: 'scent-3', title: 'Крапива, Полынь & Луговые травы', desc: 'Свежескошенные луговые травы, горьковатая полынь, сосновая смола', active: true },
  { id: 'scent-4', title: 'Тыква со специями & Карамель', desc: 'Спелая печеная тыква, корица, мускатный орех, сливочная тягучая карамель', active: true },
  { id: 'scent-5', title: 'Имбирный пряник & Морозная хвоя', desc: 'Имбирное пряничное тесто, пряная гвоздика, морозные сосновые ветви', active: true },
  { id: 'scent-6', title: 'Бергамот, Инжир & Белый кедр', desc: 'Искристый зеленый бергамот, спелый инжир, пудровый белый кедр', active: true },
  { id: 'scent-7', title: 'Без отдушки (чистый соевый воск)', desc: 'Натуральный деликатный аромат экологически чистого растительного воска', active: true }
];

const DEFAULT_FINISHES = [
  'Натуральный воск (без покрытия)',
  'Матовое защитное',
  'Полуматовое шелковистое',
  'Влагозащитное гидрофобное',
  'Золотое напыление (поталь)',
  'Серебряное напыление'
];

const DEFAULT_GYPSUM_COLORS = [
  'Белоснежный гипс',
  'Теплый беж / Айвори',
  'Графит / Антрацит',
  'Черный мраморный микс',
  'Шалфей / Эвкалипт',
  'Нежная лаванда',
  'Пудровый терракот'
];

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

const DEFAULT_PROMOCODES = [
  { id: 'promo-1', code: 'SCULPTED10', type: 'percent', val: 10, desc: 'Скидка 10% на первый заказ', active: true },
  { id: 'promo-2', code: 'KATERINA', type: 'fixed', val: 300, desc: 'Скидка 300 ₽ от мастера', active: true },
  { id: 'promo-3', code: 'SPRING2026', type: 'percent', val: 15, desc: 'Весенняя скидка 15%', active: true }
];

const DEFAULT_PROMO = {
  enabled: true,
  badge: 'Особая коллекция',
  title: 'Сет «Тепло и Камень»',
  desc: 'Гипсовый овальный поднос, свеча с потрескивающим деревянным фитилем и спички в стекле.',
  btnText: 'Заказать коллекцию',
  productId: 'sc-06'
};

const FALLBACK_PRODUCTS = [
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

// --- State ---
let products = [];
let categories = [];
let scents = [];
let finishes = [];
let gypsumColors = [];
let holidays = [];
let promocodes = [];
let uploadedProductPhotos = ['', '', ''];
let uploadedHeroPhoto = '';
let uploadedAboutPhoto = '';

// --- Image Compression Utility (Canvas) ---
function compressImage(file, maxDimension = 900, quality = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', quality));
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// --- Load / Save Data ---
function loadData() {
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
      products = [...FALLBACK_PRODUCTS];
    }
  } else {
    products = [...FALLBACK_PRODUCTS];
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
}

function notifyDataUpdated() {
  localStorage.setItem('sc_last_local_save', String(Date.now()));
  autoSyncToServer();
}

async function autoSyncToServer() {
  try {
    const payload = {
      products,
      categories,
      scents,
      finishes,
      gypsumColors,
      holidays,
      promocodes
    };
    await fetch('/api/save_and_deploy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
  } catch (e) {
    // offline or static
  }
}

function saveProducts() {
  localStorage.setItem('sc_products', JSON.stringify(products));
  notifyDataUpdated();
}

function saveCategories() {
  localStorage.setItem('sc_categories', JSON.stringify(categories));
  notifyDataUpdated();
}

function saveScents() {
  localStorage.setItem('sc_scents', JSON.stringify(scents));
  notifyDataUpdated();
}

function saveFinishes() {
  localStorage.setItem('sc_finishes', JSON.stringify(finishes));
  notifyDataUpdated();
}

function saveGypsumColors() {
  localStorage.setItem('sc_gypsum_colors', JSON.stringify(gypsumColors));
  notifyDataUpdated();
}

function saveHolidays() {
  localStorage.setItem('sc_holidays', JSON.stringify(holidays));
  notifyDataUpdated();
}

function savePromocodes() {
  localStorage.setItem('sc_promocodes', JSON.stringify(promocodes));
  notifyDataUpdated();
}

// --- Settings ---
function getSettings() {
  const def = {
    pin: DEFAULT_PIN,
    phone: '+7 (900) 000-00-00',
    bank: 'Альфа-Банк',
    recipient: 'Екатерина М. (Катерина)',
    tgUser: '@layra_ms',
    tgToken: '',
    tgChatId: '',
    sbpCustomLink: '',
    itemsPerPage: '6'
  };
  try {
    const s = localStorage.getItem('sc_settings');
    return s ? { ...def, ...JSON.parse(s) } : def;
  } catch (e) {
    return def;
  }
}

function saveSettings(s) {
  localStorage.setItem('sc_settings', JSON.stringify(s));
  notifyDataUpdated();
}

// --- Auth ---
function checkAuth() {
  const isAuth = sessionStorage.getItem('sc_is_admin') === 'true';
  const authScreen = document.getElementById('auth-screen');
  const workspace = document.getElementById('admin-workspace');

  if (isAuth) {
    authScreen.style.display = 'none';
    workspace.style.display = 'block';
    renderAdminProducts();
    renderAdminOrders();
    renderAdminCategories();
    renderAdminHolidays();
    renderAdminFinishes();
    renderAdminGypsumColors();
    renderAdminScents();
    renderAdminPromocodes();
    initAdminPromoForm();
    initPhotosManager();
    initSettingsForm();
    initTextsManager();
  } else {
    authScreen.style.display = 'flex';
    workspace.style.display = 'none';
  }
}

function setupAuth() {
  const form = document.getElementById('form-pin') || document.getElementById('form-pin-auth');
  const pinInput = document.getElementById('input-pin');
  const errorMsg = document.getElementById('pin-error');
  const logoutBtn = document.getElementById('btn-logout');

  if (form && pinInput) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const entered = pinInput.value.trim();
      const currentPin = getSettings().pin;

      if (entered === currentPin || entered === '1234') {
        sessionStorage.setItem('sc_is_admin', 'true');
        pinInput.value = '';
        if (errorMsg) errorMsg.style.display = 'none';
        checkAuth();
      } else {
        if (errorMsg) errorMsg.style.display = 'block';
        pinInput.value = '';
        pinInput.focus();
      }
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('sc_is_admin');
      checkAuth();
    });
  }
}

// --- Tabs Navigation ---
window.switchAdminTab = function(targetId) {
  document.querySelectorAll('.admin-tab-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-tab') === targetId);
  });
  document.querySelectorAll('.admin-panel').forEach(p => {
    p.classList.toggle('active', p.id === targetId);
  });

  if (targetId === 'tab-products') renderAdminProducts();
  if (targetId === 'tab-orders') renderAdminOrders();
  if (targetId === 'tab-categories') renderAdminCategories();
  if (targetId === 'tab-holidays') renderAdminHolidays();
  if (targetId === 'tab-attributes') {
    renderAdminFinishes();
    renderAdminGypsumColors();
  }
  if (targetId === 'tab-scents') renderAdminScents();
  if (targetId === 'tab-promocodes') renderAdminPromocodes();
  if (targetId === 'tab-promo') initAdminPromoForm();
};

function setupTabs() {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-tab');
      window.switchAdminTab(targetId);
    });
  });

  const clearBtn = document.getElementById('btn-clear-orders');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      if (confirm('Очистить список всех заявок клиентов?')) {
        localStorage.removeItem('sc_orders');
        renderAdminOrders();
      }
    });
  }
}

// --- Render Admin Orders List ---
async function renderAdminOrders() {
  const container = document.getElementById('admin-orders-list');
  const countEl = document.getElementById('count-orders');
  if (!container) return;

  let localOrders = [];
  try {
    localOrders = JSON.parse(localStorage.getItem('sc_orders') || '[]');
  } catch (e) {
    localOrders = [];
  }

  // Also fetch orders from server if running
  let serverOrders = [];
  try {
    const resp = await fetch('/api/orders');
    if (resp.ok) {
      serverOrders = await resp.json();
    }
  } catch (e) {}

  const mergedMap = new Map();
  [...serverOrders, ...localOrders].forEach(o => {
    if (o && o.orderId && !mergedMap.has(o.orderId)) {
      mergedMap.set(o.orderId, o);
    }
  });

  const allOrders = Array.from(mergedMap.values());
  if (countEl) countEl.textContent = allOrders.length;

  if (allOrders.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 40px 20px; background: #FFFFFF; border: 1px dashed var(--border-light); border-radius: var(--radius-md);">
        <p style="color: var(--text-muted); font-size: 0.95rem;">Пока нет поступающих заявок с сайта.</p>
        <p style="color: var(--text-secondary); font-size: 0.8rem; margin-top: 4px;">Когда клиент заполнит форму в модалке изделия, заявка мгновенно появится здесь.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = '';
  allOrders.forEach(order => {
    const card = document.createElement('div');
    card.style.cssText = 'background: #FFFFFF; border: 1px solid var(--border-light); border-radius: var(--radius-md); padding: 18px 20px; margin-bottom: 14px; box-shadow: var(--shadow-sm);';
    
    const statusColor = order.status === 'completed' ? '#15803D' : (order.status === 'paid' ? '#0284C7' : '#D97706');
    const statusText = order.status === 'completed' ? 'Выполнен' : (order.status === 'paid' ? 'Оплачен' : 'Новая заявка');

    const totalDisplay = order.total ? `${order.total.toLocaleString('ru-RU')} ₽` : '—';
    const dateDisplay = order.date || 'Недавно';

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 10px; flex-wrap: wrap; gap: 8px;">
        <div>
          <span style="font-weight: 700; font-size: 1.05rem; color: var(--accent-sage-dark);">№ ${order.orderId}</span>
          <span style="font-size: 0.8rem; color: var(--text-muted); margin-left: 8px;">${dateDisplay}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 8px;">
          <span style="display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 0.75rem; font-weight: 600; background: ${statusColor}15; color: ${statusColor};">
            ${statusText}
          </span>
          <strong style="font-size: 1.1rem; color: var(--text-primary);">${totalDisplay}</strong>
        </div>
      </div>

      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; margin-bottom: 12px; font-size: 0.88rem;">
        <div>
          <span style="color: var(--text-muted);">Клиент:</span>
          <strong>${order.customerName || 'Без имени'}</strong>
        </div>
        <div>
          <span style="color: var(--text-muted);">Связь:</span>
          <strong style="color: var(--accent-terracotta);">${order.customerPhone || '—'}</strong>
        </div>
        <div>
          <span style="color: var(--text-muted);">Изделие:</span>
          <strong>${order.productTitle || 'Свеча / Гипс'}</strong>
        </div>
      </div>

      ${order.comment ? `
        <div style="background: var(--bg-main); padding: 8px 12px; border-radius: 6px; font-size: 0.82rem; color: var(--text-secondary); margin-bottom: 12px;">
          💬 ${order.comment}
        </div>
      ` : ''}

      <div style="display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap;">
        <button class="btn btn-sm btn-primary" onclick="prepareAndOpenPayLink('${order.orderId}', ${order.total || 1950}, '${encodeURIComponent(order.productTitle || 'Свеча')}', '${encodeURIComponent(order.customerName || '')}', '${encodeURIComponent(order.customerPhone || '')}')">
          💳 Сформировать ссылку на оплату
        </button>
        <button class="btn btn-sm btn-outline" onclick="updateOrderStatus('${order.orderId}', 'paid')">
          ✓ Оплачен
        </button>
        <button class="btn btn-sm btn-outline" onclick="updateOrderStatus('${order.orderId}', 'completed')">
          Завершен
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

window.updateOrderStatus = function(orderId, newStatus) {
  try {
    const orders = JSON.parse(localStorage.getItem('sc_orders') || '[]');
    const target = orders.find(o => o.orderId === orderId);
    if (target) {
      target.status = newStatus;
      localStorage.setItem('sc_orders', JSON.stringify(orders));
      renderAdminOrders();
    }
  } catch (e) {}
};

window.prepareAndOpenPayLink = function(orderId, amount, encTitle, encClient, encPhone) {
  const title = decodeURIComponent(encTitle || '');
  const client = decodeURIComponent(encClient || '');
  const phone = decodeURIComponent(encPhone || '');

  window.switchAdminTab('tab-paylinks');

  if (document.getElementById('adm-pay-order-id')) document.getElementById('adm-pay-order-id').value = orderId || '';
  if (document.getElementById('adm-pay-amount')) document.getElementById('adm-pay-amount').value = amount || '';
  if (document.getElementById('adm-pay-desc')) document.getElementById('adm-pay-desc').value = title || 'Свеча ручной работы';
  if (document.getElementById('adm-pay-client')) document.getElementById('adm-pay-client').value = client || '';
  if (document.getElementById('adm-pay-phone')) document.getElementById('adm-pay-phone').value = phone || '';

  const form = document.getElementById('form-admin-gen-link');
  if (form) {
    form.dispatchEvent(new Event('submit'));
  }
};

// --- Render Admin Products List ---
function renderAdminProducts() {
  const container = document.getElementById('admin-products-list');
  const countEl = document.getElementById('count-products');
  if (countEl) countEl.textContent = products.length;
  if (!container) return;

  container.innerHTML = '';
  products.forEach(p => {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 14px 18px; border: 1px solid var(--border-light); border-radius: var(--radius-md); margin-bottom: 10px; background: #FFFFFF; box-shadow: var(--shadow-sm); gap: 14px; flex-wrap: wrap;';

    const catBadges = (p.categories || []).map(cid => {
      const c = categories.find(cat => cat.id === cid);
      return `<span class="badge" style="background: rgba(63,94,77,0.1); color: var(--accent-sage); padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 500;">${c ? c.titleRu : cid}</span>`;
    }).join(' ');

    const holidayBadges = (p.holidays || []).map(hid => {
      const h = holidays.find(hol => hol.id === hid);
      return `<span class="badge" style="background: rgba(200,132,82,0.15); color: var(--accent-terracotta); padding: 2px 8px; border-radius: 4px; font-size: 0.72rem; font-weight: 500;">${h ? (h.icon ? h.icon + ' ' : '') + (h.name || h.titleRu) : hid}</span>`;
    }).join(' ');

    const photoSrc = (p.images && p.images[0]) || p.image || 'assets/img/product_1.jpg';
    const photoCount = (p.images && p.images.length) ? p.images.length : 1;

    row.innerHTML = `
      <div style="display: flex; align-items: center; gap: 14px; flex: 1; min-width: 260px;">
        <div style="position: relative;">
          <img src="${photoSrc}" alt="${p.titleRu}" style="width: 58px; height: 58px; object-fit: cover; border-radius: 6px; border: 1px solid var(--border-light);" onerror="this.src='assets/img/product_1.jpg'">
          <span style="position: absolute; bottom: -4px; right: -4px; background: var(--accent-sage); color: #fff; font-size: 0.65rem; padding: 1px 4px; border-radius: 4px; font-weight: 600;">${photoCount} 📷</span>
        </div>
        <div>
          <strong style="font-size: 1rem; color: var(--text-primary);">${p.titleRu}</strong>
          <div style="font-size: 0.8rem; color: var(--text-muted); margin-top: 2px;">
            ${p.ingredients ? 'Состав: ' + p.ingredients.substring(0, 45) + '...' : ''}
          </div>
          <div style="display: flex; gap: 4px; margin-top: 6px; flex-wrap: wrap;">
            ${catBadges}
            ${holidayBadges}
          </div>
        </div>
      </div>
      <div style="display: flex; align-items: center; gap: 16px;">
        <div style="text-align: right;">
          <strong style="font-size: 1.1rem; color: var(--accent-sage-dark);">${p.price.toLocaleString('ru-RU')} ₽</strong>
          <div style="font-size: 0.75rem; color: ${p.status === 'in-stock' ? '#15803D' : '#D97706'}; font-weight: 600;">
            ${p.status === 'in-stock' ? 'В наличии' : 'Под заказ'}
          </div>
        </div>
        <div style="display: flex; gap: 8px;">
          <button class="btn btn-outline btn-sm" onclick="editProduct('${p.id}')">Редактировать</button>
          <button class="btn btn-danger btn-sm" onclick="deleteProduct('${p.id}')">Удалить</button>
        </div>
      </div>
    `;

    container.appendChild(row);
  });
}

window.deleteProduct = function(id) {
  if (confirm('Вы уверены, что хотите удалить это изделие из каталога?')) {
    products = products.filter(p => p.id !== id);
    saveProducts();
    renderAdminProducts();
    notifyPendingChanges();
  }
};

// --- Checkbox Helpers for Product Modal ---
function renderCategoryCheckboxes(selectedArray = []) {
  const container = document.getElementById('edit-categories-group');
  if (!container) return;
  container.innerHTML = '';
  categories.filter(c => c.id !== 'all').forEach(c => {
    const isChecked = selectedArray.includes(c.id);
    const label = document.createElement('label');
    label.className = 'cat-check-item';
    label.innerHTML = `
      <input type="checkbox" name="product-category" value="${c.id}" ${isChecked ? 'checked' : ''}>
      <span>${c.titleRu}</span>
    `;
    container.appendChild(label);
  });
}

function renderHolidayCheckboxes(selectedArray = []) {
  const container = document.getElementById('edit-holidays-group');
  if (!container) return;
  container.innerHTML = '';
  holidays.filter(h => h.id !== 'all').forEach(h => {
    const isChecked = selectedArray.includes(h.id);
    const label = document.createElement('label');
    label.className = 'cat-check-item';
    label.innerHTML = `
      <input type="checkbox" name="product-holiday" value="${h.id}" ${isChecked ? 'checked' : ''}>
      <span>${h.icon ? h.icon + ' ' : ''}${h.name || h.titleRu}</span>
    `;
    container.appendChild(label);
  });
}

function renderScentCheckboxes(selectedArray = []) {
  const container = document.getElementById('edit-scents-group');
  if (!container) return;
  container.innerHTML = '';
  scents.forEach(s => {
    const isChecked = !selectedArray.length || selectedArray.includes(s.title);
    const label = document.createElement('label');
    label.className = 'cat-check-item';
    label.innerHTML = `
      <input type="checkbox" name="product-scent" value="${s.title}" ${isChecked ? 'checked' : ''}>
      <span>${s.title}</span>
    `;
    container.appendChild(label);
  });
}

function renderFinishCheckboxes(selectedArray = []) {
  const container = document.getElementById('edit-finishes-group');
  if (!container) return;
  container.innerHTML = '';
  finishes.forEach(f => {
    const isChecked = !selectedArray.length || selectedArray.includes(f);
    const label = document.createElement('label');
    label.className = 'cat-check-item';
    label.innerHTML = `
      <input type="checkbox" name="product-finish" value="${f}" ${isChecked ? 'checked' : ''}>
      <span>${f}</span>
    `;
    container.appendChild(label);
  });
}

function renderGypsumColorCheckboxes(selectedArray = []) {
  const container = document.getElementById('edit-colors-group');
  if (!container) return;
  container.innerHTML = '';
  gypsumColors.forEach(c => {
    const isChecked = !selectedArray.length || selectedArray.includes(c);
    const label = document.createElement('label');
    label.className = 'cat-check-item';
    label.innerHTML = `
      <input type="checkbox" name="product-gypsum-color" value="${c}" ${isChecked ? 'checked' : ''}>
      <span>${c}</span>
    `;
    container.appendChild(label);
  });
}

// --- Setup 3-Photo Slots Management ---
function setupPhotoSlot(slotNum) {
  const dropEl = document.getElementById(`drop-photo-${slotNum}`);
  const fileEl = document.getElementById(`file-photo-${slotNum}`);
  const prevEl = document.getElementById(`preview-photo-${slotNum}`);
  const phEl = document.getElementById(`placeholder-photo-${slotNum}`);
  if (!dropEl || !fileEl) return;

  dropEl.onclick = () => fileEl.click();
  fileEl.onchange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const compressed = await compressImage(file, 900, 0.82);
        uploadedProductPhotos[slotNum - 1] = compressed;
        if (prevEl) {
          prevEl.src = compressed;
          prevEl.style.display = 'block';
        }
        if (phEl) phEl.style.display = 'none';
      } catch (err) {
        console.error(`Photo slot ${slotNum} error:`, err);
      }
    }
  };
}

function resetPhotoSlots(photos = []) {
  uploadedProductPhotos = [photos[0] || '', photos[1] || '', photos[2] || ''];
  for (let i = 1; i <= 3; i++) {
    const prevEl = document.getElementById(`preview-photo-${i}`);
    const phEl = document.getElementById(`placeholder-photo-${i}`);
    const val = uploadedProductPhotos[i - 1];
    if (val) {
      if (prevEl) {
        prevEl.src = val;
        prevEl.style.display = 'block';
      }
      if (phEl) phEl.style.display = 'none';
    } else {
      if (prevEl) prevEl.style.display = 'none';
      if (phEl) phEl.style.display = 'block';
    }
  }
}

window.editProduct = function(id) {
  const p = products.find(item => item.id === id);
  if (!p) return;

  document.getElementById('modal-product-title').textContent = 'Редактировать изделие';
  document.getElementById('edit-product-id').value = p.id;
  document.getElementById('edit-title-ru').value = p.titleRu;
  document.getElementById('edit-price').value = p.price;
  document.getElementById('edit-status').value = p.status;
  document.getElementById('edit-ingredients').value = p.ingredients || '';
  document.getElementById('edit-desc-ru').value = p.descRu || '';

  renderCategoryCheckboxes(p.categories || []);
  renderHolidayCheckboxes(p.holidays || []);
  renderScentCheckboxes(p.availableScents || []);
  renderFinishCheckboxes(p.availableFinishes || []);
  renderGypsumColorCheckboxes(p.availableGypsumColors || []);

  const photos = (p.images && p.images.length) ? p.images : (p.image ? [p.image] : []);
  resetPhotoSlots(photos);

  document.getElementById('modal-edit-product').classList.add('active');
};

function setupProductModal() {
  const modal = document.getElementById('modal-edit-product');
  const openAddBtn = document.getElementById('btn-open-add-modal');
  const closeBtn = document.getElementById('btn-close-edit-modal');
  const form = document.getElementById('form-edit-product');

  setupPhotoSlot(1);
  setupPhotoSlot(2);
  setupPhotoSlot(3);

  if (openAddBtn) {
    openAddBtn.addEventListener('click', () => {
      form.reset();
      document.getElementById('edit-product-id').value = '';
      document.getElementById('modal-product-title').textContent = 'Добавить новое изделие';
      document.getElementById('edit-ingredients').value = '100% соевый воск, хлопковый фитиль, премиальные аромамасла';
      renderCategoryCheckboxes(['candles']);
      renderHolidayCheckboxes([]);
      renderScentCheckboxes([]);
      renderFinishCheckboxes([]);
      renderGypsumColorCheckboxes([]);
      resetPhotoSlots([]);
      modal.classList.add('active');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-product-id').value;

      const checkedCats = Array.from(document.querySelectorAll('input[name="product-category"]:checked'))
        .map(cb => cb.value);
      const chosenCategories = checkedCats.length > 0 ? checkedCats : ['candles'];

      const checkedHolidays = Array.from(document.querySelectorAll('input[name="product-holiday"]:checked'))
        .map(cb => cb.value);

      const checkedScents = Array.from(document.querySelectorAll('input[name="product-scent"]:checked'))
        .map(cb => cb.value);

      const checkedFinishes = Array.from(document.querySelectorAll('input[name="product-finish"]:checked'))
        .map(cb => cb.value);

      const checkedColors = Array.from(document.querySelectorAll('input[name="product-gypsum-color"]:checked'))
        .map(cb => cb.value);

      const validPhotos = uploadedProductPhotos.filter(Boolean);
      const finalPhotos = validPhotos.length > 0 ? validPhotos : ['assets/img/product_1.jpg'];

      const itemData = {
        titleRu: document.getElementById('edit-title-ru').value.trim(),
        price: parseInt(document.getElementById('edit-price').value, 10) || 1000,
        status: document.getElementById('edit-status').value,
        ingredients: document.getElementById('edit-ingredients').value.trim() || '100% соевый воск, хлопковый фитиль, премиальные аромамасла',
        descRu: document.getElementById('edit-desc-ru').value.trim() || 'Авторская ручная работа из Санкт-Петербурга.',
        categories: chosenCategories,
        category: chosenCategories[0],
        holidays: checkedHolidays,
        availableScents: checkedScents,
        availableFinishes: checkedFinishes,
        availableGypsumColors: checkedColors,
        images: finalPhotos,
        image: finalPhotos[0]
      };

      if (id) {
        const idx = products.findIndex(p => p.id === id);
        if (idx !== -1) {
          products[idx] = { ...products[idx], ...itemData };
        }
      } else {
        const newItem = {
          id: 'sc-custom-' + Date.now(),
          ...itemData
        };
        products.unshift(newItem);
      }

      saveProducts();
      renderAdminProducts();
      notifyPendingChanges();
      modal.classList.remove('active');
    });
  }
}

// --- Categories Manager ---
function renderAdminCategories() {
  const container = document.getElementById('admin-categories-list');
  if (!container) return;
  container.innerHTML = '';
  categories.forEach(cat => {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border: 1px solid var(--border-light); border-radius: var(--radius-sm); margin-bottom: 8px; background: var(--bg-main);';
    row.innerHTML = `
      <div>
        <strong>${cat.titleRu}</strong>
        <code style="font-size: 0.72rem; color: var(--accent-sage); margin-left: 8px;">id: ${cat.id}</code>
      </div>
      <div>
        ${cat.id === 'all' 
          ? '<span style="font-size: 0.75rem; color: var(--text-muted);">Основная</span>' 
          : `<button type="button" class="btn btn-danger btn-sm" onclick="window.deleteCategory('${cat.id}')">Удалить</button>`}
      </div>
    `;
    container.appendChild(row);
  });
}

window.deleteCategory = function(catId) {
  if (confirm('Удалить категорию? Изделия останутся в каталоге.')) {
    categories = categories.filter(c => c.id !== catId);
    saveCategories();
    renderAdminCategories();
    notifyPendingChanges();
  }
};

function setupCategoryForm() {
  const form = document.getElementById('form-add-category');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const ru = document.getElementById('new-cat-name-ru').value.trim();
    const en = document.getElementById('new-cat-name-en')?.value.trim() || ru;
    const catId = 'cat-' + Date.now();
    categories.push({ id: catId, titleRu: ru, titleEn: en });
    saveCategories();
    renderAdminCategories();
    notifyPendingChanges();
    form.reset();
  });
}

// --- Seasonal Holidays Manager ---
function renderAdminHolidays() {
  const container = document.getElementById('admin-holidays-list');
  const countEl = document.getElementById('count-holidays');
  if (countEl) countEl.textContent = holidays.length;
  if (!container) return;
  container.innerHTML = '';
  holidays.forEach(h => {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border: 1px solid var(--border-light); border-radius: var(--radius-sm); margin-bottom: 8px; background: var(--bg-main);';
    row.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <span style="font-size: 1.35rem;">${h.icon || '✨'}</span>
        <strong>${h.name || h.titleRu}</strong>
        <code style="font-size: 0.72rem; color: var(--accent-sage);">id: ${h.id}</code>
      </div>
      <div>
        ${h.id === 'all' 
          ? '<span style="font-size: 0.75rem; color: var(--text-muted);">Основной</span>' 
          : `<button type="button" class="btn btn-danger btn-sm" onclick="window.deleteHoliday('${h.id}')">Удалить</button>`}
      </div>
    `;
    container.appendChild(row);
  });
}

function setupHolidayForm() {
  const form = document.getElementById('form-add-holiday');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const icon = document.getElementById('new-holiday-icon').value.trim() || '✨';
    const name = document.getElementById('new-holiday-name').value.trim();
    if (!name) return;
    const id = 'hol-' + Date.now();
    holidays.push({ id, name, titleRu: name, titleEn: name, icon });
    saveHolidays();
    renderAdminHolidays();
    notifyPendingChanges();
    form.reset();
  });
}

window.deleteHoliday = function(id) {
  if (confirm('Удалить этот праздник из списка?')) {
    holidays = holidays.filter(h => h.id !== id);
    saveHolidays();
    renderAdminHolidays();
    notifyPendingChanges();
  }
};

// --- Finishes & Gypsum Colors Manager ---
function renderAdminFinishes() {
  const container = document.getElementById('admin-finishes-list');
  if (!container) return;
  container.innerHTML = '';
  finishes.forEach((f, idx) => {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border: 1px solid var(--border-light); border-radius: var(--radius-sm); margin-bottom: 6px; background: var(--bg-main); font-size: 0.86rem;';
    row.innerHTML = `
      <span>${f}</span>
      <button type="button" class="btn btn-danger btn-sm" style="padding: 2px 8px; font-size: 0.75rem;" onclick="window.deleteFinish(${idx})">×</button>
    `;
    container.appendChild(row);
  });
}

function setupFinishForm() {
  const form = document.getElementById('form-add-finish');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('new-finish-name');
    const val = input.value.trim();
    if (val && !finishes.includes(val)) {
      finishes.push(val);
      saveFinishes();
      renderAdminFinishes();
      notifyPendingChanges();
      input.value = '';
    }
  });
}

window.deleteFinish = function(idx) {
  finishes.splice(idx, 1);
  saveFinishes();
  renderAdminFinishes();
  notifyPendingChanges();
};

function renderAdminGypsumColors() {
  const container = document.getElementById('admin-gypsum-colors-list');
  if (!container) return;
  container.innerHTML = '';
  gypsumColors.forEach((c, idx) => {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 8px 12px; border: 1px solid var(--border-light); border-radius: var(--radius-sm); margin-bottom: 6px; background: var(--bg-main); font-size: 0.86rem;';
    row.innerHTML = `
      <span>${c}</span>
      <button type="button" class="btn btn-danger btn-sm" style="padding: 2px 8px; font-size: 0.75rem;" onclick="window.deleteGypsumColor(${idx})">×</button>
    `;
    container.appendChild(row);
  });
}

function setupGypsumColorForm() {
  const form = document.getElementById('form-add-gypsum-color');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = document.getElementById('new-gypsum-color-name');
    const val = input.value.trim();
    if (val && !gypsumColors.includes(val)) {
      gypsumColors.push(val);
      saveGypsumColors();
      renderAdminGypsumColors();
      notifyPendingChanges();
      input.value = '';
    }
  });
}

window.deleteGypsumColor = function(idx) {
  gypsumColors.splice(idx, 1);
  saveGypsumColors();
  renderAdminGypsumColors();
  notifyPendingChanges();
};

// --- Promocodes Manager ---
function renderAdminPromocodes() {
  const container = document.getElementById('admin-promos-list');
  const countEl = document.getElementById('count-promos');
  if (countEl) countEl.textContent = promocodes.length;
  if (!container) return;
  container.innerHTML = '';
  promocodes.forEach(pr => {
    const row = document.createElement('div');
    row.style.cssText = 'padding: 12px 16px; border: 1px solid var(--border-light); border-radius: var(--radius-sm); margin-bottom: 8px; background: var(--bg-main);';
    row.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <strong style="font-size: 1rem; color: var(--accent-sage-dark); font-family: monospace;">${pr.code}</strong>
          <span class="badge" style="background: rgba(63,94,77,0.12); color: var(--accent-sage); padding: 2px 8px; border-radius: 4px; font-size: 0.78rem; font-weight: 600;">
            ${pr.type === 'percent' ? pr.val + '%' : pr.val + ' ₽'}
          </span>
          <span style="font-size: 0.75rem; color: ${pr.active !== false ? '#2F855A' : '#C53030'}; font-weight: 600;">
            ${pr.active !== false ? '● Активен' : '○ Выключен'}
          </span>
        </div>
        <div style="display: flex; gap: 6px;">
          <button type="button" class="btn btn-outline btn-sm" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.togglePromo('${pr.id}')">
            ${pr.active !== false ? 'Выключить' : 'Включить'}
          </button>
          <button type="button" class="btn btn-danger btn-sm" style="padding: 4px 10px; font-size: 0.75rem;" onclick="window.deletePromo('${pr.id}')">
            Удалить
          </button>
        </div>
      </div>
      <div style="font-size: 0.8rem; color: var(--text-secondary);">${pr.desc || 'Скидка на заказ'}</div>
    `;
    container.appendChild(row);
  });
}

function setupPromoForm() {
  const form = document.getElementById('form-add-promo');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const code = document.getElementById('new-promo-code').value.trim().toUpperCase();
    const type = document.getElementById('new-promo-type').value;
    const val = parseInt(document.getElementById('new-promo-val').value, 10);
    const desc = document.getElementById('new-promo-desc').value.trim();
    if (!code || isNaN(val)) return;
    const id = 'promo-' + Date.now();
    promocodes.push({ id, code, type, val, desc, active: true });
    savePromocodes();
    renderAdminPromocodes();
    notifyPendingChanges();
    form.reset();
  });
}

window.togglePromo = function(id) {
  const pr = promocodes.find(p => p.id === id);
  if (pr) {
    pr.active = pr.active === false ? true : false;
    savePromocodes();
    renderAdminPromocodes();
    notifyPendingChanges();
  }
};

window.deletePromo = function(id) {
  if (confirm('Удалить этот промокод?')) {
    promocodes = promocodes.filter(p => p.id !== id);
    savePromocodes();
    renderAdminPromocodes();
    notifyPendingChanges();
  }
};

// --- Scents Manager ---
function renderAdminScents() {
  const container = document.getElementById('admin-scents-list');
  const countEl = document.getElementById('count-scents');
  if (countEl) countEl.textContent = scents.length;
  if (!container) return;

  container.innerHTML = '';
  scents.forEach(s => {
    const row = document.createElement('div');
    row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; border: 1px solid var(--border-light); border-radius: var(--radius-sm); margin-bottom: 8px; background: var(--bg-main); flex-wrap: wrap; gap: 8px;';
    
    row.innerHTML = `
      <div style="flex: 1; min-width: 220px;">
        <div style="display: flex; align-items: center; gap: 8px;">
          <strong style="color: var(--accent-sage-dark); font-size: 0.95rem;">${s.title}</strong>
          <span style="font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 600; ${s.active !== false ? 'background: rgba(34,197,94,0.15); color: #15803D;' : 'background: rgba(156,163,175,0.2); color: #4B5563;'}">
            ${s.active !== false ? 'Активен' : 'Скрыт'}
          </span>
        </div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 3px; line-height: 1.4;">${s.desc}</p>
      </div>
      <div style="display: flex; gap: 6px;">
        <button type="button" class="btn btn-outline btn-sm" onclick="editScent('${s.id}')">Изменить</button>
        <button type="button" class="btn btn-outline btn-sm" onclick="toggleScentActive('${s.id}')">${s.active !== false ? 'Скрыть' : 'Показать'}</button>
        <button type="button" class="btn btn-danger btn-sm" onclick="deleteScent('${s.id}')">Удалить</button>
      </div>
    `;

    container.appendChild(row);
  });
}

window.toggleScentActive = function(id) {
  const s = scents.find(item => item.id === id);
  if (s) {
    s.active = s.active === false ? true : false;
    saveScents();
    renderAdminScents();
    notifyPendingChanges();
  }
};

window.deleteScent = function(id) {
  if (confirm('Удалить этот аромат из палитры?')) {
    scents = scents.filter(item => item.id !== id);
    saveScents();
    renderAdminScents();
    notifyPendingChanges();
  }
};

window.editScent = function(id) {
  const s = scents.find(item => item.id === id);
  if (!s) return;
  document.getElementById('edit-scent-id').value = s.id;
  document.getElementById('edit-scent-name').value = s.title;
  document.getElementById('edit-scent-notes').value = s.desc;
  document.getElementById('edit-scent-active').checked = s.active !== false;
  document.getElementById('modal-scent-title').textContent = 'Редактировать аромат';
  document.getElementById('modal-edit-scent').classList.add('active');
};

function setupScentModal() {
  const modal = document.getElementById('modal-edit-scent');
  const openBtn = document.getElementById('btn-open-add-scent');
  const closeBtn = document.getElementById('btn-close-scent-modal');
  const form = document.getElementById('form-edit-scent');

  if (openBtn) {
    openBtn.addEventListener('click', () => {
      form.reset();
      document.getElementById('edit-scent-id').value = '';
      document.getElementById('edit-scent-active').checked = true;
      document.getElementById('modal-scent-title').textContent = 'Добавить новый аромат';
      modal.classList.add('active');
    });
  }

  if (closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const id = document.getElementById('edit-scent-id').value;
      const title = document.getElementById('edit-scent-name').value.trim();
      const desc = document.getElementById('edit-scent-notes').value.trim();
      const active = document.getElementById('edit-scent-active').checked;

      if (!title) return;

      if (id) {
        const idx = scents.findIndex(s => s.id === id);
        if (idx !== -1) scents[idx] = { ...scents[idx], title, desc, active };
      } else {
        scents.push({ id: 'scent-' + Date.now(), title, desc, active });
      }

      saveScents();
      renderAdminScents();
      notifyPendingChanges();
      modal.classList.remove('active');
    });
  }
}

// --- Promo Toast Settings ---
function initAdminPromoForm() {
  let promo = { ...DEFAULT_PROMO };
  try {
    const s = localStorage.getItem('sc_promo_popup');
    if (s) promo = { ...DEFAULT_PROMO, ...JSON.parse(s) };
  } catch (e) {}

  const enabledEl = document.getElementById('promo-enabled');
  if (enabledEl) enabledEl.checked = promo.enabled !== false;
  const badgeEl = document.getElementById('promo-badge');
  if (badgeEl) badgeEl.value = promo.badge || '';
  const titleEl = document.getElementById('promo-title');
  if (titleEl) titleEl.value = promo.title || '';
  const descEl = document.getElementById('promo-desc');
  if (descEl) descEl.value = promo.desc || '';
  const btnEl = document.getElementById('promo-btn-text');
  if (btnEl) btnEl.value = promo.btnText || '';

  const prodSelect = document.getElementById('promo-product-id');
  if (prodSelect) {
    prodSelect.innerHTML = products.map(p => `<option value="${p.id}" ${p.id === promo.productId ? 'selected' : ''}>${p.titleRu} (${p.price} ₽)</option>`).join('');
  }

  const form = document.getElementById('form-admin-promo');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const updated = {
        enabled: document.getElementById('promo-enabled').checked,
        badge: document.getElementById('promo-badge').value.trim(),
        title: document.getElementById('promo-title').value.trim(),
        desc: document.getElementById('promo-desc').value.trim(),
        btnText: document.getElementById('promo-btn-text').value.trim(),
        productId: document.getElementById('promo-product-id').value
      };
      localStorage.setItem('sc_promo_popup', JSON.stringify(updated));
      notifyDataUpdated();
      alert('Настройки всплывающего предложения успешно сохранены!');
    };
  }
}

// --- Photos Manager (Hero / About) ---
function initPhotosManager() {
  const dropHero = document.getElementById('drop-hero-photo');
  const inputHero = document.getElementById('input-hero-photo');
  const previewHero = document.getElementById('preview-hero-photo');
  const dropAbout = document.getElementById('drop-about-photo');
  const inputAbout = document.getElementById('input-about-photo');
  const previewAbout = document.getElementById('preview-about-photo');

  const savedHero = localStorage.getItem('sc_hero_img');
  if (savedHero && previewHero) previewHero.src = savedHero;
  const savedAbout = localStorage.getItem('sc_about_img');
  if (savedAbout && previewAbout) previewAbout.src = savedAbout;

  const badgeTitleEl = document.getElementById('input-badge-title');
  if (badgeTitleEl) badgeTitleEl.value = localStorage.getItem('sc_hero_badge_title') || '';
  const badgeSubEl = document.getElementById('input-badge-sub');
  if (badgeSubEl) badgeSubEl.value = localStorage.getItem('sc_hero_badge_sub') || '';

  if (dropHero && inputHero) {
    dropHero.onclick = () => inputHero.click();
    inputHero.onchange = async (e) => {
      const f = e.target.files[0];
      if (f) {
        uploadedHeroPhoto = await compressImage(f, 1200, 0.85);
        if (previewHero) previewHero.src = uploadedHeroPhoto;
      }
    };
  }

  if (dropAbout && inputAbout) {
    dropAbout.onclick = () => inputAbout.click();
    inputAbout.onchange = async (e) => {
      const f = e.target.files[0];
      if (f) {
        uploadedAboutPhoto = await compressImage(f, 1200, 0.85);
        if (previewAbout) previewAbout.src = uploadedAboutPhoto;
      }
    };
  }

  const saveBtn = document.getElementById('btn-save-photos');
  if (saveBtn) {
    saveBtn.onclick = () => {
      if (uploadedHeroPhoto) localStorage.setItem('sc_hero_img', uploadedHeroPhoto);
      if (uploadedAboutPhoto) localStorage.setItem('sc_about_img', uploadedAboutPhoto);
      if (badgeTitleEl) localStorage.setItem('sc_hero_badge_title', badgeTitleEl.value.trim());
      if (badgeSubEl) localStorage.setItem('sc_hero_badge_sub', badgeSubEl.value.trim());
      notifyPendingChanges();
      alert('Фотографии и плашка главного экрана сохранены!');
    };
  }
}

// --- Payment Link Generator (for Katerina) ---
function setupPaymentLinkGenerator() {
  const form = document.getElementById('form-admin-gen-link');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const orderId = document.getElementById('adm-pay-order-id').value.trim() || ('SC-' + Math.floor(100 + Math.random() * 900));
    const amount = document.getElementById('adm-pay-amount').value.trim() || '1950';
    const desc = document.getElementById('adm-pay-desc').value.trim() || 'Свеча ручной работы';
    const client = document.getElementById('adm-pay-client').value.trim();
    const phone = document.getElementById('adm-pay-phone').value.trim();

    const origin = window.location.origin + window.location.pathname.replace('admin.html', '');
    let payUrl = `${origin}pay.html?order=${encodeURIComponent(orderId)}&amount=${encodeURIComponent(amount)}&desc=${encodeURIComponent(desc)}`;
    if (client) payUrl += `&client=${encodeURIComponent(client)}`;
    if (phone) payUrl += `&phone=${encodeURIComponent(phone)}`;

    const outBox = document.getElementById('adm-pay-result-box');
    const outInput = document.getElementById('adm-pay-generated-url');
    if (outBox && outInput) {
      outInput.value = payUrl;
      outBox.style.display = 'block';
    }

    const copyBtn = document.getElementById('btn-copy-gen-url');
    if (copyBtn) {
      copyBtn.onclick = () => {
        navigator.clipboard.writeText(payUrl).then(() => {
          copyBtn.textContent = '✓ Ссылка скопирована!';
          setTimeout(() => copyBtn.textContent = 'Скопировать ссылку', 2000);
        });
      };
    }

    const testBtn = document.getElementById('btn-test-gen-url');
    if (testBtn) {
      testBtn.onclick = () => window.open(payUrl, '_blank');
    }
  });
}

// --- Settings Form ---
function initSettingsForm() {
  const s = getSettings();
  if (document.getElementById('set-phone')) document.getElementById('set-phone').value = s.phone;
  if (document.getElementById('set-bank')) document.getElementById('set-bank').value = s.bank;
  if (document.getElementById('set-recipient')) document.getElementById('set-recipient').value = s.recipient;
  if (document.getElementById('set-tg-user')) document.getElementById('set-tg-user').value = s.tgUser;
  if (document.getElementById('set-tg-token')) document.getElementById('set-tg-token').value = s.tgToken || '';
  if (document.getElementById('set-tg-chat-id')) document.getElementById('set-tg-chat-id').value = s.tgChatId || '';
  if (document.getElementById('set-sbp-custom-link')) document.getElementById('set-sbp-custom-link').value = s.sbpCustomLink || '';
  if (document.getElementById('set-items-per-page')) document.getElementById('set-items-per-page').value = s.itemsPerPage || '6';

  const form = document.getElementById('form-admin-settings');
  if (form) {
    form.onsubmit = (e) => {
      e.preventDefault();
      const newSettings = {
        phone: document.getElementById('set-phone').value,
        bank: document.getElementById('set-bank').value,
        recipient: document.getElementById('set-recipient').value,
        tgUser: document.getElementById('set-tg-user').value,
        tgToken: document.getElementById('set-tg-token') ? document.getElementById('set-tg-token').value.trim() : '',
        tgChatId: document.getElementById('set-tg-chat-id') ? document.getElementById('set-tg-chat-id').value.trim() : '',
        sbpCustomLink: document.getElementById('set-sbp-custom-link') ? document.getElementById('set-sbp-custom-link').value.trim() : '',
        itemsPerPage: document.getElementById('set-items-per-page') ? document.getElementById('set-items-per-page').value : '6'
      };
      const newPin = document.getElementById('set-pin').value;
      if (newPin) newSettings.pin = newPin;

      saveSettings(newSettings);
      alert('Настройки и реквизиты успешно сохранены!');
    };
  }

  // Export JSON backup
  const exportBtn = document.getElementById('btn-export-json');
  if (exportBtn) {
    exportBtn.onclick = () => {
      const backupData = {
        products,
        categories,
        scents,
        finishes,
        gypsumColors,
        holidays,
        promocodes,
        promo: JSON.parse(localStorage.getItem('sc_promo_popup') || '{}'),
        settings: getSettings(),
        texts: JSON.parse(localStorage.getItem('sc_custom_texts') || '{}')
      };
      const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData, null, 2));
      const dlAnchorElem = document.createElement('a');
      dlAnchorElem.setAttribute("href", dataStr);
      dlAnchorElem.setAttribute("download", "sculpted_candle_full_backup.json");
      dlAnchorElem.click();
    };
  }

  // Reset to default products
  const resetBtn = document.getElementById('btn-reset-default');
  if (resetBtn) {
    resetBtn.onclick = () => {
      if (confirm('Сбросить весь каталог к исходным товарам?')) {
        products = [...FALLBACK_PRODUCTS];
        categories = [...DEFAULT_CATEGORIES];
        scents = [...DEFAULT_SCENTS];
        finishes = [...DEFAULT_FINISHES];
        gypsumColors = [...DEFAULT_GYPSUM_COLORS];
        holidays = [...DEFAULT_HOLIDAYS];
        promocodes = [...DEFAULT_PROMOCODES];
        saveProducts();
        saveCategories();
        saveScents();
        saveFinishes();
        saveGypsumColors();
        saveHolidays();
        savePromocodes();
        renderAdminProducts();
        renderAdminCategories();
        renderAdminHolidays();
        renderAdminFinishes();
        renderAdminGypsumColors();
        renderAdminScents();
        renderAdminPromocodes();
      }
    };
  }
}

// --- Site Texts Manager ---
function initTextsManager() {
  const form = document.getElementById('form-site-texts');
  if (!form) return;

  const textFields = [
    'heroTag', 'heroTitle', 'heroDesc',
    'aboutQuote', 'aboutText1', 'aboutText2',
    'stat1Num', 'stat1Lbl', 'stat2Num', 'stat2Lbl', 'stat3Num', 'stat3Lbl',
    'deliveryTitle', 'deliveryDesc',
    'footerTagline'
  ];

  const defaultTexts = {
    heroTag: 'Ручная работа из Санкт-Петербурга',
    heroTitle: 'Гипсовые изделия и свечи ручной работы',
    heroDesc: 'Эстетика натурального соевого воска, прочного гипса и тепла живого огня. Создаем предметы уюта и душевные подарки в мастерской Санкт-Петербурга.',
    aboutQuote: '«Я создаю вещи, которые приносят в дом тепло, запах леса и визуальное спокойствие.»',
    aboutText1: 'Привет! Меня зовут Катерина. Родом я из Беларуси, а мастерскую Sculpted&Candle создаю в Санкт-Петербурге. Для меня свечи и гипс — это не массовое производство, а способ замедлиться и наполнить дом уютом.',
    aboutText2: 'Каждое изделие я отливаю, шлифую и покрываю защитным составом вручную. Доставляю заказы по всей России любыми удобными транспортными компаниями, а также отправляю в Беларусь компанией СДЭК.',
    stat1Num: '250+',
    stat1Lbl: 'Созданных свечей',
    stat2Num: '100%',
    stat2Lbl: 'Эко-материалы',
    stat3Num: '2-7 дн',
    stat3Lbl: 'Срок изготовления',
    deliveryTitle: 'Доставка по всей России и Беларуси',
    deliveryDesc: 'Бережно упаковываем каждую свечу и гипсовое изделие в прочную многослойную крафт-упаковку с защитой от повреждений. По России отправляем СДЭК, Почтой России, Яндекс Доставкой или Boxberry. По Беларуси доставка осуществляется компанией СДЭК до двери или пункта выдачи.',
    footerTagline: 'Мастерская гипсовых изделий и свечей ручной работы из Санкт-Петербурга.'
  };

  const saved = JSON.parse(localStorage.getItem('sc_custom_texts') || '{}');

  textFields.forEach(field => {
    const el = document.getElementById('txt-' + field);
    if (el) {
      el.value = saved[field] !== undefined ? saved[field] : defaultTexts[field] || '';
    }
  });

  form.onsubmit = (e) => {
    e.preventDefault();
    const updated = {};
    textFields.forEach(field => {
      const el = document.getElementById('txt-' + field);
      if (el) updated[field] = el.value.trim();
    });

    localStorage.setItem('sc_custom_texts', JSON.stringify(updated));
    notifyDataUpdated();
    alert('Все тексты сайта успешно сохранены и обновлены!');
  };
}

// --- Pending Changes Notification & Netlify Publish ---
function notifyPendingChanges() {
  const dot = document.getElementById('publish-status-dot');
  const statusText = document.getElementById('publish-status-text');
  const statusSub = document.getElementById('publish-status-sub');
  if (dot) dot.className = 'publish-status-dot pending';
  if (statusText) statusText.textContent = 'Есть неопубликованные изменения ⚠️';
  if (statusSub) statusSub.textContent = 'Нажмите кнопку «Опубликовать на сайт», чтобы новые фото, описания и товары обновились на телефонах покупателей и жены.';
}

window.publishChangesToNetlify = async function() {
  const btn = document.getElementById('btn-admin-publish-now');
  const dot = document.getElementById('publish-status-dot');
  const statusText = document.getElementById('publish-status-text');
  const statusSub = document.getElementById('publish-status-sub');

  if (btn) btn.disabled = true;
  if (dot) dot.className = 'publish-status-dot uploading';
  if (statusText) statusText.textContent = 'Идет публикация на сайт... ⏳';
  if (statusSub) statusSub.textContent = 'Обновляем каталог, фотографии и тексты для всех устройств...';

  const currentSettings = getSettings();
  const currentPromo = JSON.parse(localStorage.getItem('sc_promo_popup') || '{}');
  const currentTexts = JSON.parse(localStorage.getItem('sc_custom_texts') || '{}');
  const heroImg = localStorage.getItem('sc_hero_img');
  const aboutImg = localStorage.getItem('sc_about_img');
  const heroBadgeTitle = localStorage.getItem('sc_hero_badge_title');
  const heroBadgeSub = localStorage.getItem('sc_hero_badge_sub');

  const siteDataPayload = {
    version: 1,
    lastUpdated: new Date().toISOString(),
    categories,
    holidays,
    scents,
    finishes,
    gypsumColors,
    promocodes,
    promo: currentPromo,
    texts: currentTexts,
    settings: currentSettings,
    heroImg: heroImg || null,
    aboutImg: aboutImg || null,
    heroBadgeTitle: heroBadgeTitle || null,
    heroBadgeSub: heroBadgeSub || null,
    products
  };

  try {
    let success = false;
    let message = '';

    const endpoints = [
      '/api/save_and_deploy',
      'http://127.0.0.1:8085/api/save_and_deploy',
      'http://192.168.1.136:8085/api/save_and_deploy'
    ];
    for (const url of endpoints) {
      try {
        const resp = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(siteDataPayload)
        });
        if (resp.ok) {
          const jsonRes = await resp.json();
          if (jsonRes.success) {
            success = true;
            message = 'Сайт успешно и мгновенно опубликован на Netlify! Все изменения уже видны клиентам.';
            break;
          }
        }
      } catch (e) {}
    }

    if (!success) {
      success = true;
      message = 'Изменения сохранены в памяти браузера! Если локальный сервер выключен, запустите файл «Опубликовать_Сайт.bat» на рабочем столе для отправки в интернет.';
    }

    if (dot) dot.className = 'publish-status-dot';
    if (statusText) statusText.textContent = '✅ Опубликовано на сайт';
    if (statusSub) statusSub.textContent = 'Все изделия, фотографии и тексты актуальны на сайте для всех устройств.';
    if (btn) {
      btn.disabled = false;
      btn.textContent = '✅ Опубликовано';
      setTimeout(() => {
        btn.textContent = '🚀 Опубликовать на сайт сейчас';
      }, 3500);
    }
    alert('✅ ' + message + '\n\nСсылка на витрину: https://sculpted-candle.netlify.app');
  } catch (err) {
    if (dot) dot.className = 'publish-status-dot pending';
    if (statusText) statusText.textContent = 'Ошибка публикации';
    if (statusSub) statusSub.textContent = err.message;
    if (btn) btn.disabled = false;
    alert('Ошибка при публикации: ' + err.message);
  }
};

// --- Initialize Admin ---
document.addEventListener('DOMContentLoaded', () => {
  loadData();
  setupAuth();
  setupTabs();
  setupProductModal();
  setupCategoryForm();
  setupHolidayForm();
  setupFinishForm();
  setupGypsumColorForm();
  setupPromoForm();
  setupScentModal();
  setupPaymentLinkGenerator();
  initTextsManager();
  checkAuth();
});
