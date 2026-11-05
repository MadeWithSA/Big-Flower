// Мультиязычный словарь
const i18n = {
  ru: {
    home: "Главная",
    catalog: "Каталог",
    favorites: "Избранное",
    cart: "Корзина",
    profile: "Профиль",
    searchPlaceholder: "Поиск букета...",
    heroTag: "Премиальная флористика",
    heroTitle: "Цветы, говорящие на языке чувств",
    heroSub: "Авторские композиции, редкие сорта и быстрая доставка за 60 минут.",
    heroBtn: "В каталог",
    all: "Все",
    roses: "Розы",
    peonies: "Пионы",
    tulips: "Тюльпаны",
    hydrangeas: "Гортензии",
    orchids: "Орхидеи",
    exotic: "Экзотика",
    addToCart: "В корзину",
    added: "Добавлено!",
    buyNow: "Купить сразу",
    details: "Подробнее",
    emptyFav: "В избранном пока ничего нет",
    emptyCart: "Ваша корзина пуста",
    total: "Итого:",
    checkout: "Оформить заказ",
    orderSuccess: "Ваш заказ успешно оформлен! Флорист уже собирает букет.",
    profileTitle: "Личный кабинет",
    userName: "Имя",
    userPhone: "Телефон",
    userAddress: "Адрес доставки",
    saveProfile: "Сохранить профиль",
    savedAlert: "Данные успешно сохранены!",
    orderHistory: "История заказов",
    noOrders: "Заказов пока не было",
    currency: "сум"
  },
  uz: {
    home: "Bosh sahifa",
    catalog: "Katalog",
    favorites: "Tanlanganlar",
    cart: "Savat",
    profile: "Profil",
    searchPlaceholder: "Guldasta izlash...",
    heroTag: "Premium floristika",
    heroTitle: "Tuyg'ular tilida so'zlashuvchi gullar",
    heroSub: "Mualliflik kompozitsiyalari, nodir navlar va 60 daqiqada tez yetkazish.",
    heroBtn: "Katalogga o'tish",
    all: "Barchasi",
    roses: "Atirgullar",
    peonies: "Pionlar",
    tulips: "Lolalar",
    hydrangeas: "Gortenziyalar",
    orchids: "Orxideyalar",
    exotic: "Ekzotika",
    addToCart: "Savatga solish",
    added: "Qo'shildi!",
    buyNow: "Hoziroq xarid qilish",
    details: "Batafsil",
    emptyFav: "Tanlanganlar ro'yxati hozircha bo'sh",
    emptyCart: "Savatingiz bo'sh",
    total: "Jami:",
    checkout: "Buyurtma berish",
    orderSuccess: "Buyurtmangiz qabul qilindi! Floristlarimiz ishga kirishdi.",
    profileTitle: "Shaxsiy kabinet",
    userName: "Ism",
    userPhone: "Telefon",
    userAddress: "Yetkazib berish manzili",
    saveProfile: "Profilni saqlash",
    savedAlert: "Ma'lumotlar saqlandi!",
    orderHistory: "Buyurtmalar tarixi",
    noOrders: "Hozircha buyurtmalar yo'q",
    currency: "so'm"
  },
  en: {
    home: "Home",
    catalog: "Catalog",
    favorites: "Favorites",
    cart: "Cart",
    profile: "Profile",
    searchPlaceholder: "Search flowers...",
    heroTag: "Luxury Floristry",
    heroTitle: "Flowers that speak the language of emotions",
    heroSub: "Artisanal bouquets, rare varieties and express delivery in 60 minutes.",
    heroBtn: "Shop Catalog",
    all: "All",
    roses: "Roses",
    peonies: "Peonies",
    tulips: "Tulips",
    hydrangeas: "Hydrangeas",
    orchids: "Orchids",
    exotic: "Exotics",
    addToCart: "Add to cart",
    added: "Added!",
    buyNow: "Buy now",
    details: "Details",
    emptyFav: "Your wishlist is currently empty",
    emptyCart: "Your cart is empty",
    total: "Total:",
    checkout: "Checkout",
    orderSuccess: "Order successfully placed! Our florists are preparing it.",
    profileTitle: "Customer Profile",
    userName: "Full Name",
    userPhone: "Phone Number",
    userAddress: "Delivery Address",
    saveProfile: "Save Profile",
    savedAlert: "Profile saved successfully!",
    orderHistory: "Order History",
    noOrders: "No previous orders found",
    currency: "UZS"
  }
};

// База данных 35 цветов
const flowers = [
  {
    id: 1,
    category: "peonies",
    price: 450000,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Пионы Сара Бернар", uz: "Sara Bernar pionlari", en: "Sarah Bernhardt Peonies" },
    desc: {
      ru: "Нежно-розовые махровые бутоны с тонким пудровым ароматом. Любимая классика романтики.",
      uz: "Yupqa kukunli xushbo'y hidli nozik pushti pionlar. Romantika klassikasi.",
      en: "Gentle pink double blossoms with a delicate sweet fragrance. A romantic classic."
    }
  },
  {
    id: 2,
    category: "roses",
    price: 620000,
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Розы Пинк Флойд", uz: "Pink Floyd atirgullari", en: "Pink Floyd Roses" },
    desc: {
      ru: "Ярко-малиновые крупные бутоны из высокогорий Эквадора. Исключительная стойкость.",
      uz: "Ekvadordan yorqin to'q pushti yirik gullar. Juda uzoq vaqt so'lmaydi.",
      en: "Vibrant fuchsia large buds grown in Ecuadorian mountains with long vase life."
    }
  },
  {
    id: 3,
    category: "hydrangeas",
    price: 390000,
    image: "https://images.unsplash.com/photo-1588628566587-dbd176de94b4?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Лазурная Гортензия", uz: "Moviy Gortenziya", en: "Azure Hydrangea" },
    desc: {
      ru: "Пышное облако небесно-голубого оттенка, символизирующее искренность и покой.",
      uz: "Samoviy moviy rangdagi ulkan guldasta, samimiylik ramzi.",
      en: "A lush cloud of sky-blue petals signifying sincerity and grace."
    }
  },
  {
    id: 4,
    category: "tulips",
    price: 280000,
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Солнечные Тюльпаны", uz: "Quyoshli Lolalar", en: "Sunburst Tulips" },
    desc: {
      ru: "Пионовидные двухцветные тюльпаны солнечной палитры, дарящие весеннее тепло.",
      uz: "Bahor nafasi va iliqligini baxsh etuvchi ikki rangli lolalar.",
      en: "Peony-shaped dual-tone yellow-orange tulips radiating warmth."
    }
  },
  {
    id: 5,
    category: "roses",
    price: 540000,
    image: "https://images.unsplash.com/photo-1533616688419-b7a585564566?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Белоснежный Мондиаль", uz: "Qordek oq Mondial", en: "Pure White Mondial" },
    desc: {
      ru: "Белоснежные королевские розы с легким мятным отливом на крайних лепестках.",
      uz: "Qordek oppoq nafis qirollik atirgullari, soflik va go'zallik timsoli.",
      en: "Pure white royal roses featuring faint mint undertones on outer petals."
    }
  },
  {
    id: 6,
    category: "orchids",
    price: 780000,
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Орхидея Фаленопсис Роял", uz: "Falenopsis Royal Orxideyasi", en: "Royal Phalaenopsis Orchid" },
    desc: {
      ru: "Изысканная каскадная орхидея в керамическом кашпо. Благородный и долговечный подарок.",
      uz: "Keramik qutidagi hashamatli kaskadli orxideya. Uzoq saqlanuvchi sovg'a.",
      en: "Graceful cascading orchids in ceramic pot. An enduring and noble gift."
    }
  },
  {
    id: 7,
    category: "exotic",
    price: 610000,
    image: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Стрелиция Райская Птица", uz: "Strelitsiya Jannat Qushi", en: "Bird of Paradise" },
    desc: {
      ru: "Дерзкий тропический цветок архитектурной формы для ценителей смелого дизайна.",
      uz: "Jasur dizayn ixlosmandlari uchun tropik me'moriy gul.",
      en: "Striking exotic tropical bloom for architectural interior compositions."
    }
  },
  {
    id: 8,
    category: "roses",
    price: 720000,
    image: "https://images.unsplash.com/photo-1559563458-527698bf5295?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Пионовидные розы Джульетта", uz: "Julietta pion atirgullari", en: "Juliet Garden Roses" },
    desc: {
      ru: "Легендарные персиковые английские розы Дэвида Остина с неповторимым раскрытием.",
      uz: "Devid Ostinning afsonaviy shaftolirang ingliz atirgullari.",
      en: "David Austin's iconic soft peach garden roses with mesmerizing spiral petaling."
    }
  },
  {
    id: 9,
    category: "peonies",
    price: 490000,
    image: "https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Бордовый Ред Шарм", uz: "To'q qizil Red Charm", en: "Red Charm Peonies" },
    desc: {
      ru: "Глубокий винный оттенок и бархатная плотность бутона делают этот сорт шедевром.",
      uz: "Chuqur sharob rangli va baxmal to'qimali ajoyib pion navi.",
      en: "Rich crimson velvet petals creating high visual drama and passion."
    }
  },
  {
    id: 10,
    category: "hydrangeas",
    price: 410000,
    image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Изумрудная Гортензия", uz: "Zumrad rang Gortenziya", en: "Emerald Hydrangea" },
    desc: {
      ru: "Свежий фисташково-зеленый оттенок гортензии, идеален для современного интерьера.",
      uz: "Zamonaviy interyer uchun mukammal bo'lgan yangi pista-yashil tus.",
      en: "Crisp pistachio-green hydrangea head bringing modern calm vibes."
    }
  },
  {
    id: 11,
    category: "tulips",
    price: 310000,
    image: "https://images.unsplash.com/photo-1582794543139-8ac9cb0f7b11?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Черный Тюльпан Queen", uz: "Qora Lola Queen", en: "Queen of the Night" },
    desc: {
      ru: "Мистический и редкий темно-фиолетовый, почти черный сорт тюльпанов.",
      uz: "Juda kamyob, sirli to'q binafsharang, deyarli qora lola navi.",
      en: "Mysterious near-black deep purple tulips of extraordinary elegance."
    }
  },
  {
    id: 12,
    category: "orchids",
    price: 690000,
    image: "https://images.unsplash.com/photo-1566806787910-3e1074766c48?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Ванда Индиго", uz: "Vanda Indigo orxideyasi", en: "Vanda Indigo Orchid" },
    desc: {
      ru: "Ультрамариновая тропическая орхидея без субстрата в стеклянной вазе.",
      uz: "Shisha vazadagi noyob moviy rangli tropik orxideya.",
      en: "Vibrant ultramarine blue exotic orchid set in modern glass cylinder."
    }
  },
  {
    id: 13,
    category: "exotic",
    price: 520000,
    image: "https://images.unsplash.com/photo-1546842931-886c185b4c8c?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Королевская Протея", uz: "Qirollik Proteyasi", en: "King Protea" },
    desc: {
      ru: "Монументальный цветок из Южной Африки с серебристо-розовыми венцами.",
      uz: "Janubiy Afrikadan keltirilgan hashamatli kumushrang-pushti gul.",
      en: "Sculptural South African bloom famous for its crown-shaped pink bracts."
    }
  },
  {
    id: 14,
    category: "roses",
    price: 580000,
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Розы Капучино", uz: "Kapuchino atirgullari", en: "Cappuccino Roses" },
    desc: {
      ru: "Трендовый кофейно-карамельный цвет лепестков с легким пыльным подтоном.",
      uz: "Kofe va karamel tusli urfdagi zamonaviy nozik atirgullar.",
      en: "Sophisticated coffee-nude and caramel tones beloved by luxury stylists."
    }
  },
  {
    id: 15,
    category: "peonies",
    price: 470000,
    image: "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Белый Дюшес де Немур", uz: "Oq Dyushes de Nemur", en: "Duchesse de Nemours" },
    desc: {
      ru: "Исторический белый сорт с тонким ароматом весеннего ландыша.",
      uz: "Vodiy nilufari xushbo'y hidiga ega tarixiy oq pion navi.",
      en: "Heirloom fragrant white peony with hints of fresh lily-of-the-valley."
    }
  },
  {
    id: 16,
    category: "hydrangeas",
    price: 430000,
    image: "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Розовая Гортензия Кэнди", uz: "Pushti Kendi Gortenziya", en: "Candy Pink Hydrangea" },
    desc: {
      ru: "Зефирно-розовые объемные шапки цветов, дарящие ощущение легкости.",
      uz: "Yengillik va shirinlik hissini uyg'otuvchi zefir-pushti gullar.",
      en: "Sweet marshmallow-pink blossom balls delivering cheerful elegance."
    }
  },
  {
    id: 17,
    category: "tulips",
    price: 290000,
    image: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Белые Бахромчатые Тюльпаны", uz: "Oq popukli lolalar", en: "Crisp Fringed White Tulips" },
    desc: {
      ru: "Кружевная кайма на краях лепестков напоминает морозные узоры на стекле.",
      uz: "Muz naqshlariga o'xshash qirrali oq nafis lolalar.",
      en: "Delicate frosted fringe outlining crisp crystalline white petals."
    }
  },
  {
    id: 18,
    category: "orchids",
    price: 750000,
    image: "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Цимбидиум Зеленый Чай", uz: "Yashil Choy Tsimbidiumi", en: "Green Cymbidium Orchid" },
    desc: {
      ru: "Восковые цветки оливкового цвета с бордовой крапчатой губой.",
      uz: "To'q qizil nuqtali zaytun rangli mustahkam orxideya shoxlari.",
      en: "Wax-textured chartreuse petals complemented by deep crimson speckles."
    }
  },
  {
    id: 19,
    category: "exotic",
    price: 480000,
    image: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Антуриум Черная Королева", uz: "Qora Qirolicha Anturiumi", en: "Black Queen Anthurium" },
    desc: {
      ru: "Глянцевое сердцевидное соцветие шоколадно-бордового отлива.",
      uz: "Yaltiroq yuraksimon to'q shokolad tusli o'zgacha gul.",
      en: "Glossy deep-burgundy heart-shaped spathes for sleek modern spaces."
    }
  },
  {
    id: 20,
    category: "roses",
    price: 660000,
    image: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Розы Эксплорер (Red)", uz: "Eksplorer qizil atirgullari", en: "Explorer Velvet Roses" },
    desc: {
      ru: "Глубокий алый бархат с бутонами высотой до 8 см. Непревзойденный знак страсти.",
      uz: "Baxmal to'q qizil yirik atirgullar, cheksiz muhabbat ifodasi.",
      en: "Classic deep crimson velvet roses with immense stately heads."
    }
  },
  {
    id: 21,
    category: "peonies",
    price: 510000,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Корал Сансет (Peony)", uz: "Koral Sanset Pioni", en: "Coral Sunset Peonies" },
    desc: {
      ru: "Удивительный сорт-хамелеон: меняет цвет от лососево-кораллового до нежно-кремового.",
      uz: "Rangi ochilishi davomida marjon rangidan krem rangiga o'zgaruvchi noyob pion.",
      en: "Chameleon blossom that shifts from rich salmon-coral to cream over time."
    }
  },
  {
    id: 22,
    category: "hydrangeas",
    price: 450000,
    image: "https://images.unsplash.com/photo-1527061011665-3652c757a4d4?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Фиолетовая Гортензия Мистик", uz: "Binafsharang Mistik Gortenziya", en: "Mystic Violet Hydrangea" },
    desc: {
      ru: "Глубокие оттенки аметиста и черники в одном пышном соцветии.",
      uz: "Ametist va chernika ranglarini o'zida jamlagan maftunkor guldasta.",
      en: "Rich amethyst and twilight violet tones blended into full blossoms."
    }
  },
  {
    id: 23,
    category: "tulips",
    price: 330000,
    image: "https://images.unsplash.com/photo-1469248669582-74894de0df19?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Французские Тюльпаны XXL", uz: "Fransuz XXL lolalari", en: "French Longstem Tulips" },
    desc: {
      ru: "Высокие грациозные тюльпаны на стеблях до 70 см нежно-розового оттенка.",
      uz: "Uzun bo'yli (70 sm gacha), nafis pushti rangli fransuz lolalari.",
      en: "Stately 70cm tall French tulips with sweeping artistic stems."
    }
  },
  {
    id: 24,
    category: "orchids",
    price: 820000,
    image: "https://images.unsplash.com/photo-1524355865884-568527ec4233?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Белая Орхидея Каскад", uz: "Oq Kaskad Orxideyasi", en: "Cascading White Orchid" },
    desc: {
      ru: "Двуствольная белая орхидея с цветками до 12 см в диаметре.",
      uz: "Gullari 12 sm gacha yetadigan ikki shoxli oppoq kaskadli orxideya.",
      en: "Double-stem cascading giant white phalaenopsis with saucer blooms."
    }
  },
  {
    id: 25,
    category: "exotic",
    price: 590000,
    image: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Геликония Тропикана", uz: "Gelikoniya Tropikana", en: "Heliconia Tropicana" },
    desc: {
      ru: "Огненные клешневидные прицветники, заряжающие солнечной энергией.",
      uz: "Olovdek yorqin shaklga ega quyosh energiyasini bag'ishlovchi tropik gul.",
      en: "Flame-red and yellow claw-like bracts adding fiery excitement."
    }
  },
  {
    id: 26,
    category: "roses",
    price: 600000,
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Французские розы Мента", uz: "Fransuz Menta atirgullari", en: "Menta Vintage Roses" },
    desc: {
      ru: "Уникальный лавандово-серый пудровый тон в винтажном парижском стиле.",
      uz: "Vintage Parij uslubidagi noyob lavanda-kulrang kukunli tus.",
      en: "Subtle silver-lavender antique hue for quiet luxury arrangements."
    }
  },
  {
    id: 27,
    category: "peonies",
    price: 440000,
    image: "https://images.unsplash.com/photo-1533038590840-1cde6e668a91?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Пионы Боул оф Бьюти", uz: "Boul of Byuti pionlari", en: "Bowl of Beauty Peonies" },
    desc: {
      ru: "Ярко-розовая чаша с пышным кремово-желтым центром из стаминодий.",
      uz: "O'rtasi sariq-krem rangli tolalar bilan to'lgan yorqin pushti pion.",
      en: "Anemone-form blossoms with bright pink outer petals and vanilla center."
    }
  },
  {
    id: 28,
    category: "hydrangeas",
    price: 400000,
    image: "https://images.unsplash.com/photo-1502977249166-824b3a8a4d6d?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Белая Гортензия Сноубол", uz: "Qor to'pi oq gortenziyasi", en: "Snowball Hydrangea" },
    desc: {
      ru: "Идеально чистый белый купол без примесей других оттенков.",
      uz: "Boshqa ranglar aralashmagan mukammal oppoq gortenziya.",
      en: "Pristine dome of snowy white petals delivering timeless calm."
    }
  },
  {
    id: 29,
    category: "tulips",
    price: 320000,
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Лилейные Тюльпаны Баллада", uz: "Ballada nilufarsimon lolalari", en: "Ballade Lily Tulips" },
    desc: {
      ru: "Заостренные отогнутые лепестки пурпурного цвета с белой каемкой.",
      uz: "Oq hoshiyali binafsharang uchli nafis lolalar.",
      en: "Fluted pointed petals in deep violet edged with crisp white margins."
    }
  },
  {
    id: 30,
    category: "orchids",
    price: 710000,
    image: "https://images.unsplash.com/photo-1516205651411-aef33a44f7c2?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Дендробиум Нобиле", uz: "Dendrobium Nobile", en: "Dendrobium Nobile" },
    desc: {
      ru: "Ароматная орхидея, густо усыпанная бело-сиреневыми цветами по всему стеблю.",
      uz: "Butun poyasi bo'ylab och binafsharang xushbo'y gullar bilan qoplangan orxideya.",
      en: "Fragrant cane-type orchid blanketed with delicate bicolored blooms."
    }
  },
  {
    id: 31,
    category: "exotic",
    price: 640000,
    image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Кампанула Экзотик", uz: "Kampanula Ekzotik", en: "Exotic Campanula" },
    desc: {
      ru: "Необычные колокольчатые соцветия глубокого синего сапфирового оттенка.",
      uz: "To'q sapfir ko'k rangli noodatiy qo'ng'iroqsimon gullar.",
      en: "Distinctive bell blooms in intense midnight sapphire tones."
    }
  },
  {
    id: 32,
    category: "roses",
    price: 680000,
    image: "https://images.unsplash.com/photo-1548690312-e3b507d8c110?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Розы Кахала (Kahala)", uz: "Kaxala atirgullari", en: "Kahala Peach Roses" },
    desc: {
      ru: "Теплый терракотово-персиковый тон лепестков. Фаворит свадебных церемоний.",
      uz: "Iliq shaftoli-terrakota tusli nozik atirgullar, to'y marosimlari gultoji.",
      en: "Warm terracotta-peach hue with gentle ruffling. A luxury bridal favorite."
    }
  },
  {
    id: 33,
    category: "peonies",
    price: 460000,
    image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Пионы Фестива Максима", uz: "Festiva Maksima pionlari", en: "Festiva Maxima Peonies" },
    desc: {
      ru: "Белоснежные шаровидные цветы с редкими дерзкими малиновыми мазками в сердцевине.",
      uz: "O'rtasida yorqin to'q qizil chiziqlari bo'lgan oppoq qalin pionlar.",
      en: "Snowy ruffled globes dashed with dramatic crimson flecks at the center."
    }
  },
  {
    id: 34,
    category: "hydrangeas",
    price: 420000,
    image: "https://images.unsplash.com/photo-1588628566587-dbd176de94b4?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Гортензия Сиреневый Дым", uz: "Binafsha Tutun Gortenziyasi", en: "Smoky Lilac Hydrangea" },
    desc: {
      ru: "Приглушенный винтажный дымчато-сиреневый тон с оливковым градиентом.",
      uz: "Zaytun tusi bilan uyg'unlashgan xira binafsharang vintage gortenziya.",
      en: "Smoky lilac petals blending subtly with antique olive-green edges."
    }
  },
  {
    id: 35,
    category: "tulips",
    price: 340000,
    image: "https://images.unsplash.com/photo-1520763185298-1b434c919102?auto=format&fit=crop&w=800&q=80",
    name: { ru: "Тюльпаны Айс Крим", uz: "Ays Krim lolalari", en: "Ice Cream Peony Tulips" },
    desc: {
      ru: "Уникальный сорт: плотная белая шапка лепестков возвышается над розовым рожком.",
      uz: "Muzqaymoqqa o'xshash noodatiy nav: pushti ostida oq qalin shoxobcha.",
      en: "Whimsical cultivar featuring a dollop of white petals inside pink petals."
    }
  }
];