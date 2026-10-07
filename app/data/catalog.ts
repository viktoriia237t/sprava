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

export const CATS = [
  {id:"start", name:"Реєстрація та держсервіси"},
  {id:"bank", name:"Банки для ФОП"},
  {id:"pay", name:"Онлайн-оплата"},
  {id:"cash", name:"Каси та облік продажів"},
  {id:"docs", name:"Документи та звітність"},
  {id:"sell", name:"Сайт і продажі онлайн"},
  {id:"delivery", name:"Доставка"},
  {id:"crm", name:"CRM і зв'язок"},
  {id:"marketing", name:"Розсилки та маркетинг"},
  {id:"check", name:"Перевірка контрагентів"},
  {id:"hire", name:"Пошук працівників"},
  {id:"money", name:"Фінанси"}
];
export const TYPES: Record<BizType, string> = {shop:"Інтернет-магазин", offline:"Офлайн-точка", services:"Послуги та фриланс"};
const ALL: BizType[] = ["shop","offline","services"];

export const DATA: Service[] = [
  {id:"diia", name:"Дія", url:"https://diia.gov.ua", cat:"start", gov:true, for:ALL, desc:"Онлайн-реєстрація ФОП, зміна КВЕДів і закриття підприємництва без походу до ЦНАП."},
  {id:"tax", name:"Електронний кабінет платника", url:"https://cabinet.tax.gov.ua", cat:"start", gov:true, for:ALL, desc:"Податкова звітність, сплата єдиного податку та ЄСВ, реєстрація ПРРО."},
  {id:"mono", name:"monobank для ФОП", url:"https://www.monobank.ua", cat:"bank", for:ALL, desc:"Рахунок ФОП, що відкривається в застосунку. Еквайринг і зручні виписки для податкової."},
  {id:"privat", name:"ПриватБанк для бізнесу", url:"https://privatbank.ua", cat:"bank", for:ALL, desc:"Рахунки для ФОП і юросіб, Приват24 для бізнесу, термінали та зарплатні проєкти."},
  {id:"pumb", name:"ПУМБ", url:"https://pumb.ua", cat:"bank", for:ALL, desc:"Банк із пакетами для малого бізнесу, кредитуванням і онлайн-банкінгом."},
  {id:"liqpay", name:"LiqPay", url:"https://www.liqpay.ua", cat:"pay", for:["shop","services"], desc:"Прийом оплат карткою на сайті, у месенджерах і за посиланням. Від ПриватБанку."},
  {id:"wfp", name:"WayForPay", url:"https://wayforpay.com", cat:"pay", for:["shop","services"], desc:"Інтернет-еквайринг, рахунки на оплату за посиланням і регулярні платежі."},
  {id:"portmone", name:"Portmone", url:"https://www.portmone.com.ua", cat:"pay", for:["shop","services"], desc:"Платіжний сервіс для прийому оплат на сайті й виставлення рахунків."},
  {id:"checkbox", name:"Checkbox", url:"https://checkbox.ua", cat:"cash", for:ALL, desc:"Програмний РРО: фіскальні чеки з телефона, планшета чи комп'ютера."},
  {id:"vkasa", name:"Вчасно.Каса", url:"https://kasa.vchasno.ua", cat:"cash", for:ALL, desc:"ПРРО для невеликого бізнесу, працює в браузері та застосунку."},
  {id:"poster", name:"Poster POS", url:"https://joinposter.com", cat:"cash", for:["offline"], desc:"Облік для кафе, магазинів і салонів: каса, склад, звіти, програма лояльності."},
  {id:"vchasno", name:"Вчасно", url:"https://vchasno.ua", cat:"docs", for:ALL, desc:"Електронний документообіг: договори, акти й рахунки з КЕП без паперу."},
  {id:"medoc", name:"M.E.Doc", url:"https://medoc.ua", cat:"docs", for:ALL, desc:"Підготовка та подання звітності до податкової, ПФУ і статистики."},
  {id:"paperless", name:"Paperless", url:"https://paperless.com.ua", cat:"docs", for:ALL, desc:"Документообіг із підписом КЕП, інтегрований з Приват24 для бізнесу."},
  {id:"horoshop", name:"Хорошоп", url:"https://horoshop.ua", cat:"sell", for:["shop"], desc:"Конструктор інтернет-магазинів з готовими інтеграціями з доставкою та оплатою."},
  {id:"prom", name:"Prom.ua", url:"https://prom.ua", cat:"sell", for:["shop"], desc:"Маркетплейс і конструктор сайту з власним потоком покупців."},
  {id:"rozetka", name:"Rozetka Маркетплейс", url:"https://rozetka.com.ua", cat:"sell", for:["shop"], desc:"Продаж товарів на одному з найбільших майданчиків країни."},
  {id:"olx", name:"OLX", url:"https://www.olx.ua", cat:"sell", for:ALL, desc:"Оголошення про товари й послуги. Зручно, щоб швидко перевірити попит."},
  {id:"weblium", name:"Weblium", url:"https://weblium.com", cat:"sell", for:["services","offline"], desc:"Конструктор сайтів-візиток і лендингів без програмування."},
  {id:"np", name:"Нова пошта", url:"https://novaposhta.ua", cat:"delivery", for:["shop"], desc:"Доставка по Україні, накладений платіж, бізнес-кабінет і API для магазинів."},
  {id:"ukrposhta", name:"Укрпошта", url:"https://www.ukrposhta.ua", cat:"delivery", gov:true, for:["shop"], desc:"Недорога доставка, зокрема в невеликі населені пункти, і міжнародні відправлення."},
  {id:"meest", name:"Meest", url:"https://meest.com", cat:"delivery", for:["shop"], desc:"Доставка по Україні та міжнародні відправлення, зокрема з країн ЄС."},
  {id:"keycrm", name:"KeyCRM", url:"https://keycrm.app", cat:"crm", for:["shop","services"], desc:"CRM для інтернет-магазинів: замовлення, склад, ТТН і чати в одному вікні."},
  {id:"salesdrive", name:"SalesDrive", url:"https://salesdrive.ua", cat:"crm", for:["shop"], desc:"Обробка замовлень із сайтів і маркетплейсів, інтеграції з доставкою й оплатою."},
  {id:"uspacy", name:"Uspacy", url:"https://uspacy.ua", cat:"crm", for:["services"], desc:"Українська платформа для команди: CRM, задачі, комунікації."},
  {id:"binotel", name:"Binotel", url:"https://www.binotel.ua", cat:"crm", for:ALL, desc:"Віртуальна АТС, запис дзвінків і аналітика звернень."},
  {id:"ringostat", name:"Ringostat", url:"https://ringostat.com", cat:"crm", for:["shop","services"], desc:"Колтрекінг і телефонія: видно, з якої реклами прийшов дзвінок."},
  {id:"esputnik", name:"eSputnik", url:"https://esputnik.com", cat:"marketing", for:["shop"], desc:"Email-, SMS- і Viber-розсилки з автоматизацією для e-commerce."},
  {id:"sendpulse", name:"SendPulse", url:"https://sendpulse.com", cat:"marketing", for:["shop","services"], desc:"Розсилки, чат-боти в месенджерах і простий конструктор сторінок."},
  {id:"turbosms", name:"TurboSMS", url:"https://turbosms.ua", cat:"marketing", for:ALL, desc:"SMS-розсилки та сповіщення клієнтам з альфа-іменем."},
  {id:"youcontrol", name:"YouControl", url:"https://youcontrol.com.ua", cat:"check", for:ALL, desc:"Досьє на компанії та ФОП з держреєстрів перед угодою."},
  {id:"odb", name:"Opendatabot", url:"https://opendatabot.ua", cat:"check", for:ALL, desc:"Перевірка контрагентів і моніторинг змін у реєстрах через бот або сайт."},
  {id:"workua", name:"Work.ua", url:"https://www.work.ua", cat:"hire", for:ALL, desc:"Вакансії та база резюме для пошуку продавців, менеджерів і кур'єрів."},
  {id:"robota", name:"robota.ua", url:"https://robota.ua", cat:"hire", for:ALL, desc:"Сайт пошуку роботи з базою резюме й інструментами для роботодавця."},
  {id:"djinni", name:"Djinni", url:"https://djinni.co", cat:"hire", for:["services"], desc:"Пошук IT-фахівців: розробників, дизайнерів, маркетологів."},
  {id:"finmap", name:"Finmap", url:"https://finmap.online", cat:"money", for:ALL, desc:"Управлінський облік: доходи, витрати, проєкти й рахунки в одному місці."}
];
export const byId: Record<string, Service> = Object.fromEntries(DATA.map(d => [d.id, d]));
export const catName = (id: string) => CATS.find(c => c.id === id)?.name ?? "";

export const ROUTES: Record<BizType, Route> = {
  shop: {title:"Старт інтернет-магазину", steps:[
    ["diia","Зареєструйте ФОП"],["mono","Відкрийте рахунок"],["horoshop","Запустіть сайт"],
    ["wfp","Приймайте оплату карткою"],["checkbox","Видавайте фіскальні чеки"],["np","Налаштуйте доставку"],["keycrm","Збирайте замовлення в CRM"]]},
  offline: {title:"Старт кав'ярні чи магазину біля дому", steps:[
    ["diia","Зареєструйте ФОП"],["privat","Відкрийте рахунок і термінал"],["poster","Налаштуйте касу та склад"],
    ["weblium","Зробіть сторінку з адресою й меню"],["workua","Знайдіть персонал"],["finmap","Рахуйте прибуток"]]},
  services: {title:"Старт послуг або фрилансу", steps:[
    ["diia","Зареєструйте ФОП"],["mono","Відкрийте рахунок"],["weblium","Покажіть портфоліо на сайті"],
    ["liqpay","Виставляйте рахунки за посиланням"],["vchasno","Підписуйте договори й акти онлайн"],["tax","Звітуйте й сплачуйте податки"]]}
};
