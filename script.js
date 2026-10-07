const CATS = [
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
const TYPES = {shop:"Інтернет-магазин", offline:"Офлайн-точка", services:"Послуги та фриланс"};
const ALL = ["shop","offline","services"];

const DATA = [
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
const byId = Object.fromEntries(DATA.map(d => [d.id, d]));
const catName = id => (CATS.find(c => c.id === id) || {}).name || "";

const ROUTES = {
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

const $ = s => document.querySelector(s);
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const host = u => { try { return new URL(u).hostname.replace(/^www\./, ""); } catch { return u; } };
const safeUrl = u => /^https?:\/\//i.test(u || "") ? u : "#";

const store = {
  get(k, def){ try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : def; } catch { return def; } },
  set(k, v){ try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};
let kit = new Set((store.get("sprava-kit", []) || []).filter(id => byId[id]));
const state = { q:"", cat:"", forType:"" };

function toast(msg){
  const t = $("#toast"); t.textContent = msg; t.classList.add("show");
  clearTimeout(toast.timer); toast.timer = setTimeout(() => t.classList.remove("show"), 1800);
}

/* Hero: маршрут старту */
function renderPicker(active){
  $("#picker").innerHTML = Object.entries(TYPES).map(([k, v]) =>
    `<button type="button" data-type="${k}" aria-pressed="${k === active}">${v}</button>`).join("");
}
function renderRoute(type){
  const r = ROUTES[type], box = $("#route");
  box.innerHTML = `<h2>${esc(r.title)}: ${r.steps.length} кроків</h2>
    <ol class="steps">${r.steps.map(([id, what]) => `<li><div class="what">${esc(what)}</div>
      <button class="svc" type="button" data-open="${id}">${esc(byId[id].name)}</button></li>`).join("")}</ol>
    <div class="actions">
      <button class="btn" type="button" data-addroute="${type}">Додати все в мій набір</button>
      <button class="btn ghost" type="button" data-showtype="${type}">Усі сервіси для цього бізнесу</button>
    </div>`;
  box.classList.remove("flash"); void box.offsetWidth; box.classList.add("flash");
  store.set("sprava-type", type);
}
$("#picker").addEventListener("click", e => {
  const b = e.target.closest("button[data-type]"); if (!b) return;
  renderPicker(b.dataset.type); renderRoute(b.dataset.type);
});
$("#route").addEventListener("click", e => {
  const add = e.target.closest("[data-addroute]");
  if (add){ ROUTES[add.dataset.addroute].steps.forEach(([id]) => kit.add(id)); saveKit(); renderList(); toast("Додано в мій набір"); }
  const show = e.target.closest("[data-showtype]");
  if (show){ state.forType = show.dataset.showtype; $("#forSel").value = state.forType; renderList(); $("#catalog").scrollIntoView(); }
});

/* Каталог */
function renderChips(){
  const items = [{id:"", name:"Усі"}, ...CATS];
  $("#chips").innerHTML = items.map(c =>
    `<button type="button" data-cat="${c.id}" aria-pressed="${c.id === state.cat}">${esc(c.name)}</button>`).join("");
}
function matches(d){
  if (state.cat && d.cat !== state.cat) return false;
  if (state.forType && !d.for.includes(state.forType)) return false;
  if (state.q){
    const hay = (d.name + " " + d.desc + " " + catName(d.cat) + " " + host(d.url)).toLowerCase();
    return state.q.toLowerCase().split(/\s+/).filter(Boolean).every(w => hay.includes(w));
  }
  return true;
}
function rowHTML(d){
  const on = kit.has(d.id);
  return `<div class="row">
    <div><button class="name" type="button" data-open="${d.id}">${esc(d.name)}</button><span class="dom">${esc(host(d.url))}</span>${d.gov ? '<span class="gov" title="Державний сервіс">держ</span>' : ""}
      <p>${esc(d.desc)}</p></div>
    <button class="add" type="button" data-toggle="${d.id}" aria-pressed="${on}">${on ? "✓ У наборі" : "+ У набір"}</button>
  </div>`;
}
function renderList(){
  const found = DATA.filter(matches);
  $("#count").textContent = found.length ? `Знайдено: ${found.length}` : "";
  if (!found.length){
    $("#list").innerHTML = `<div class="empty">У каталозі немає збігів. Змініть фільтри або <a href="#ask" id="toAsk">пошукайте в мережі</a>.</div>`;
    return;
  }
  $("#list").innerHTML = CATS.map(c => {
    const items = found.filter(d => d.cat === c.id);
    return items.length ? `<div class="group"><h3>${esc(c.name)}</h3><div class="rows">${items.map(rowHTML).join("")}</div></div>` : "";
  }).join("");
}
$("#q").addEventListener("input", e => { state.q = e.target.value.trim(); renderList(); });
$("#forSel").addEventListener("change", e => { state.forType = e.target.value; renderList(); });
$("#chips").addEventListener("click", e => {
  const b = e.target.closest("button[data-cat]"); if (!b) return;
  state.cat = b.dataset.cat; renderChips(); renderList();
});
$("#list").addEventListener("click", e => {
  if (e.target.id === "toAsk" && state.q) $("#askQ").value = state.q;
});

/* Мій набір */
function saveKit(){ store.set("sprava-kit", [...kit]); renderKit(); }
function toggleKit(id){
  if (kit.has(id)){ kit.delete(id); toast("Прибрано з набору"); }
  else { kit.add(id); toast("Додано в мій набір"); }
  saveKit(); renderList();
}
function renderKit(){
  $("#kitCount").textContent = kit.size;
  const box = $("#kitBox");
  if (!kit.size){
    box.innerHTML = `<div class="empty">Тут поки порожньо. Додайте сервіси з каталогу або оберіть готовий маршрут угорі сторінки.</div>`;
    return;
  }
  const items = [...kit].map(id => byId[id]);
  box.innerHTML = `<ul class="kit-list">${items.map(d =>
      `<li><a href="${esc(d.url)}" target="_blank" rel="noopener">${esc(d.name)}</a><span>${esc(catName(d.cat))}</span></li>`).join("")}</ul>
    <div style="display:flex;gap:.6rem;flex-wrap:wrap">
      <button class="btn" type="button" id="copyKit">Скопіювати список</button>
      <button class="btn ghost" type="button" id="clearKit">Очистити набір</button>
    </div>`;
}
$("#kitBox").addEventListener("click", async e => {
  if (e.target.id === "clearKit"){ kit.clear(); saveKit(); renderList(); toast("Набір очищено"); }
  if (e.target.id === "copyKit"){
    const text = [...kit].map(id => `${byId[id].name}: ${byId[id].url}`).join("\n");
    try { await navigator.clipboard.writeText(text); toast("Список скопійовано"); }
    catch { toast("Не вдалося скопіювати. Виділіть список вручну"); }
  }
});

/* Живий пошук через FreeSerp (index=web, українська мова) */
async function freeserp(q, size = 5){
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 9000);
  try {
    const url = "https://freeserp.ai/api.php?" + new URLSearchParams({index:"web", q, lang:"uk", size, agent:"Sprava/1.0"});
    const r = await fetch(url, {signal: ctrl.signal});
    if (!r.ok) throw new Error("HTTP " + r.status);
    const j = await r.json();
    if (!j.ok) throw new Error(j.error || "API error");
    return j.results || [];
  } finally { clearTimeout(timer); }
}
function resultsHTML(list){
  if (!list.length) return `<p class="note">Нічого не знайшлося. Спробуйте коротший запит або інші слова.</p>`;
  return list.map(h => `<div class="res"><a href="${esc(safeUrl(h.url))}" target="_blank" rel="noopener">${esc(h.title || h.url)}</a>
    <small>${esc(h.domain || host(h.url))}${h.published_at ? ", " + esc(h.published_at) : ""}</small>
    ${h.snippet ? `<p>${esc(h.snippet)}</p>` : ""}</div>`).join("");
}
const failHTML = `<p class="err">Не вдалося отримати результати з FreeSerp. Перевірте з'єднання і спробуйте ще раз.</p>`;

$("#askForm").addEventListener("submit", async e => {
  e.preventDefault();
  const q = $("#askQ").value.trim(); if (!q) return;
  const out = $("#askOut"), btn = e.target.querySelector("button");
  btn.disabled = true; out.innerHTML = `<p class="note">Шукаємо…</p>`;
  try { out.innerHTML = resultsHTML(await freeserp(q, 8)); }
  catch { out.innerHTML = failHTML; }
  finally { btn.disabled = false; }
});

/* Картка сервісу */
const dlg = $("#dlg");
let openToken = 0;
async function openSvc(id){
  const d = byId[id]; if (!d) return;
  const token = ++openToken, on = kit.has(id);
  const types = d.for.map(t => TYPES[t]).join(", ").toLowerCase();
  $("#dlgBody").innerHTML = `<header><div><h2 id="dlgTitle">${esc(d.name)}</h2>
      <div class="note">${esc(catName(d.cat))}${d.gov ? ", державний сервіс" : ""}</div></div>
      <button class="x" type="button" data-close aria-label="Закрити">×</button></header>
    <p>${esc(d.desc)}</p>
    <p class="note">Кому підходить: ${esc(types)}.</p>
    <div class="acts">
      <a class="btn" href="${esc(d.url)}" target="_blank" rel="noopener">Відкрити ${esc(host(d.url))}</a>
      <button class="btn ghost" type="button" data-toggle="${d.id}" data-dlg aria-pressed="${on}">${on ? "Прибрати з набору" : "Додати в набір"}</button>
    </div>
    <h3 style="font-size:1rem;margin-top:1.25rem">Згадки в мережі</h3>
    <div class="results" id="mentions"><p class="note">Завантажуємо з FreeSerp…</p></div>`;
  if (!dlg.open) dlg.showModal();
  let html;
  try { html = resultsHTML(await freeserp(`${d.name} ${host(d.url).split(".")[0]}`, 4)); }
  catch { html = failHTML; }
  if (dlg.open && token === openToken) $("#mentions").innerHTML = html;
}
document.addEventListener("click", e => {
  const o = e.target.closest("[data-open]");
  if (o){ openSvc(o.dataset.open); return; }
  const t = e.target.closest("[data-toggle]");
  if (t){
    toggleKit(t.dataset.toggle);
    if (t.hasAttribute("data-dlg")){
      const on = kit.has(t.dataset.toggle);
      t.setAttribute("aria-pressed", on); t.textContent = on ? "Прибрати з набору" : "Додати в набір";
    }
    return;
  }
  if (e.target.closest("[data-close]")) dlg.close();
});
dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });

/* Старт */
const saved = store.get("sprava-type", "shop");
const initType = ROUTES[saved] ? saved : "shop";
renderPicker(initType); renderRoute(initType);
renderChips(); renderList(); renderKit();
