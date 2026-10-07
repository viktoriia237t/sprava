export type BizType = "shop" | "offline" | "services";

export interface Service {
  id: string;
  name: string;
  url: string;
  cat: string;
  gov?: boolean;
  for: BizType[];
  desc: string;
}

export interface Route {
  title: string;
  steps: [id: string, what: string][];
}

/* fs: запит до FreeSerp Main (tld=ua, sort=dr) для блоку «Схожі сайти» і слова,
   які мають бути в заголовку сайту, щоб він потрапив у добірку */
export interface Category { id: string; name: string; fs: { q: string; kw: string[] } }

export const CATS: Category[] = [
  {id:"start", name:"Реєстрація та держсервіси", fs:{q:"підприємців ФОП", kw:["підприєм","фоп"]}},
  {id:"bank", name:"Банки для ФОП", fs:{q:"банк для бізнесу", kw:["банк"]}},
  {id:"pay", name:"Онлайн-оплата", fs:{q:"платежі онлайн", kw:["оплат","платеж","платіж","еквайринг"]}},
  {id:"cash", name:"Каси та облік продажів", fs:{q:"ПРРО", kw:["прро","рро","каса","касов","pos"]}},
  {id:"docs", name:"Документи та звітність", fs:{q:"електронний документообіг", kw:["документообіг","звітн","бухгалтері"]}},
  {id:"sell", name:"Сайт і продажі онлайн", fs:{q:"конструктор інтернет-магазину", kw:["конструктор сайт","конструктор інтернет","конструктор онлайн-магаз","створення інтернет","создания интернет","маркетплейс"]}},
  {id:"delivery", name:"Доставка", fs:{q:"доставка посилок", kw:["доставк","посил","пошта"]}},
  {id:"crm", name:"CRM і зв'язок", fs:{q:"CRM система", kw:["crm","срм","атс","телефоні"]}},
  {id:"marketing", name:"Розсилки та маркетинг", fs:{q:"розсилки", kw:["розсил","рассыл"]}},
  {id:"check", name:"Перевірка контрагентів", fs:{q:"перевірка контрагентів", kw:["контрагент","перевір"]}},
  {id:"hire", name:"Пошук працівників", fs:{q:"вакансії", kw:["ваканс","пошуку роботи","резюме"]}},
  {id:"money", name:"Фінанси", fs:{q:"управлінський облік", kw:["управлінськ","облік фінанс","фінансов"]}}
];
export const TYPES: Record<BizType, string> = {shop:"Інтернет-магазин", offline:"Офлайн-точка", services:"Послуги та фриланс"};
const ALL: BizType[] = ["shop","offline","services"];

export const DATA: Service[] = [
  {id:"diia", name:"Дія", url:"https://diia.gov.ua", cat:"start", gov:true, for:ALL, desc:"Онлайн-реєстрація ФОП, зміна КВЕДів і закриття підприємництва без походу до ЦНАП."},
  {id:"bdf", name:"Фонд розвитку підприємництва", url:"https://bdf.gov.ua", cat:"start", gov:true, for:ALL, desc:"Державні програми підтримки бізнесу: пільгові кредити, гранти й компенсації для ФОП."},
  {id:"mono", name:"monobank для ФОП", url:"https://www.monobank.ua", cat:"bank", for:ALL, desc:"Рахунок ФОП, що відкривається в застосунку. Еквайринг і зручні виписки для податкової."},
  {id:"privat", name:"ПриватБанк для бізнесу", url:"https://privatbank.ua", cat:"bank", for:ALL, desc:"Рахунки для ФОП і юросіб, Приват24 для бізнесу, термінали та зарплатні проєкти."},
  {id:"pumb", name:"ПУМБ", url:"https://pumb.ua", cat:"bank", for:ALL, desc:"Банк із пакетами для малого бізнесу, кредитуванням і онлайн-банкінгом."},
  {id:"liqpay", name:"LiqPay", url:"https://www.liqpay.ua", cat:"pay", for:["shop","services"], desc:"Прийом оплат карткою на сайті, у месенджерах і за посиланням. Від ПриватБанку."},
  {id:"novapay", name:"NovaPay", url:"https://novapay.ua", cat:"pay", for:["shop","services"], desc:"Фінансовий сервіс екосистеми Нової пошти: онлайн- та офлайн-платежі, перекази й операції з картками."},
  {id:"portmone", name:"Portmone", url:"https://www.portmone.com.ua", cat:"pay", for:["shop","services"], desc:"Платіжний сервіс для прийому оплат на сайті й виставлення рахунків."},
  {id:"checkbox", name:"Checkbox", url:"https://checkbox.ua", cat:"cash", for:ALL, desc:"Програмний РРО: фіскальні чеки з телефона, планшета чи комп'ютера."},
  {id:"smartkasa", name:"Smart Kasa", url:"https://smartkasa.ua", cat:"cash", for:["offline"], desc:"ПРРО, касовий апарат і банківський термінал в одному пристрої."},
  {id:"poster", name:"Poster POS", url:"https://joinposter.com", cat:"cash", for:["offline"], desc:"Облік для кафе, магазинів і салонів: каса, склад, звіти, програма лояльності."},
  {id:"vchasno", name:"Вчасно", url:"https://vchasno.ua", cat:"docs", for:ALL, desc:"Електронний документообіг: договори, акти й рахунки з КЕП без паперу."},
  {id:"medoc", name:"M.E.Doc", url:"https://medoc.ua", cat:"docs", for:ALL, desc:"Підготовка та подання звітності до податкової, ПФУ і статистики."},
  {id:"edin", name:"EDIN", url:"https://edin.ua", cat:"docs", for:["shop","offline"], desc:"Електронний документообіг і EDI для обміну накладними та замовленнями з торговими мережами."},
  {id:"smartfin", name:"SMARTFIN", url:"https://smartfin.ua", cat:"docs", for:ALL, desc:"Онлайн-бухгалтерія для ФОП і малого бізнесу: облік доходів, звіти, зарплата й кадри."},
  {id:"horoshop", name:"Хорошоп", url:"https://horoshop.ua", cat:"sell", for:["shop"], desc:"Конструктор інтернет-магазинів з готовими інтеграціями з доставкою та оплатою."},
  {id:"prom", name:"Prom.ua", url:"https://prom.ua", cat:"sell", for:["shop"], desc:"Маркетплейс і конструктор сайту з власним потоком покупців."},
  {id:"epicentrk", name:"Епіцентр Маркетплейс", url:"https://epicentrk.ua", cat:"sell", for:["shop"], desc:"Онлайн-каталог національної мережі Епіцентр, де товари можуть продавати й сторонні продавці."},
  {id:"olx", name:"OLX", url:"https://www.olx.ua", cat:"sell", for:ALL, desc:"Оголошення про товари й послуги. Зручно, щоб швидко перевірити попит."},
  {id:"weblium", name:"Weblium", url:"https://weblium.com", cat:"sell", for:["services","offline"], desc:"Конструктор сайтів-візиток і лендингів без програмування."},
  {id:"np", name:"Нова пошта", url:"https://novaposhta.ua", cat:"delivery", for:["shop"], desc:"Доставка по Україні, накладений платіж, бізнес-кабінет і API для магазинів."},
  {id:"ukrposhta", name:"Укрпошта", url:"https://www.ukrposhta.ua", cat:"delivery", gov:true, for:["shop"], desc:"Недорога доставка, зокрема в невеликі населені пункти, і міжнародні відправлення."},
  {id:"meest", name:"Meest", url:"https://meest.com", cat:"delivery", for:["shop"], desc:"Доставка по Україні та міжнародні відправлення, зокрема з країн ЄС."},
  {id:"keycrm", name:"KeyCRM", url:"https://keycrm.app", cat:"crm", for:["shop","services"], desc:"CRM для інтернет-магазинів: замовлення, склад, ТТН і чати в одному вікні."},
  {id:"salesdrive", name:"SalesDrive", url:"https://salesdrive.ua", cat:"crm", for:["shop"], desc:"Обробка замовлень із сайтів і маркетплейсів, інтеграції з доставкою й оплатою."},
  {id:"sitniks", name:"Sitniks", url:"https://sitniks.ua", cat:"crm", for:["shop","services"], desc:"Українська CRM для малого бізнесу: замовлення з месенджерів, соцмереж, магазинів і маркетплейсів."},
  {id:"binotel", name:"Binotel", url:"https://www.binotel.ua", cat:"crm", for:ALL, desc:"Віртуальна АТС, запис дзвінків і аналітика звернень."},
  {id:"ringostat", name:"Ringostat", url:"https://ringostat.com", cat:"crm", for:["shop","services"], desc:"Колтрекінг і телефонія: видно, з якої реклами прийшов дзвінок."},
  {id:"esputnik", name:"eSputnik", url:"https://esputnik.com", cat:"marketing", for:["shop"], desc:"Email-, SMS- і Viber-розсилки з автоматизацією для e-commerce."},
  {id:"sendpulse", name:"SendPulse", url:"https://sendpulse.com", cat:"marketing", for:["shop","services"], desc:"Розсилки, чат-боти в месенджерах і простий конструктор сторінок."},
  {id:"turbosms", name:"TurboSMS", url:"https://turbosms.ua", cat:"marketing", for:ALL, desc:"SMS-розсилки та сповіщення клієнтам з альфа-іменем."},
  {id:"nomis", name:"Nomis", url:"https://nomis.com.ua", cat:"check", for:ALL, desc:"Онлайн-перевірка контрагентів за даними ЄДР та аналіз ринку."},
  {id:"odb", name:"Opendatabot", url:"https://opendatabot.ua", cat:"check", for:ALL, desc:"Перевірка контрагентів і моніторинг змін у реєстрах через бот або сайт."},
  {id:"workua", name:"Work.ua", url:"https://www.work.ua", cat:"hire", for:ALL, desc:"Вакансії та база резюме для пошуку продавців, менеджерів і кур'єрів."},
  {id:"djinni", name:"Djinni", url:"https://djinni.co", cat:"hire", for:["services"], desc:"Пошук IT-фахівців: розробників, дизайнерів, маркетологів."},
  {id:"finmap", name:"Finmap", url:"https://finmap.online", cat:"money", for:ALL, desc:"Управлінський облік: доходи, витрати, проєкти й рахунки в одному місці."}
];
export const byId: Record<string, Service> = Object.fromEntries(DATA.map(d => [d.id, d]));
export const catName = (id: string) => CATS.find(c => c.id === id)?.name ?? "";

export const ROUTES: Record<BizType, Route> = {
  shop: {title:"Старт інтернет-магазину", steps:[
    ["diia","Зареєструйте ФОП"],["mono","Відкрийте рахунок"],["horoshop","Запустіть сайт"],
    ["liqpay","Приймайте оплату карткою"],["checkbox","Видавайте фіскальні чеки"],["np","Налаштуйте доставку"],["keycrm","Збирайте замовлення в CRM"]]},
  offline: {title:"Старт кав'ярні чи магазину біля дому", steps:[
    ["diia","Зареєструйте ФОП"],["privat","Відкрийте рахунок і термінал"],["poster","Налаштуйте касу та склад"],
    ["weblium","Зробіть сторінку з адресою й меню"],["workua","Знайдіть персонал"],["finmap","Рахуйте прибуток"]]},
  services: {title:"Старт послуг або фрилансу", steps:[
    ["diia","Зареєструйте ФОП"],["mono","Відкрийте рахунок"],["weblium","Покажіть портфоліо на сайті"],
    ["liqpay","Виставляйте рахунки за посиланням"],["vchasno","Підписуйте договори й акти онлайн"],["smartfin","Ведіть облік і звітуйте онлайн"]]}
};
