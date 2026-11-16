/* Annadata Fresh Mart — storefront logic (shop, cart, login, checkout, account, story) */
(() => {
"use strict";
const C = window.CONFIG, T = window.T;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const fmt = n => "₹" + Number(n || 0).toLocaleString("en-IN");
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v == null ? d : JSON.parse(v); } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
  del(k) { try { localStorage.removeItem(k); } catch {} }
};
const ss = {
  get(k) { try { return sessionStorage.getItem(k); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, v); } catch {} },
  del(k) { try { sessionStorage.removeItem(k); } catch {} }
};

/* ---------------- state ---------------- */
const S = {
  lang: store.get("af_lang", "en") === "hi" ? "hi" : "en",
  cart: store.get("af_cart", {}),            // { "id|optKey": qty }
  products: store.get("af_products", null) || window.PRODUCTS,
  cat: "all", q: "", sort: "rel",
  loaded: false,
  session: null, profile: null, profileErr: false,
  view: "cart", lastOrder: null,
  loginStep: "start", loginEmail: "", resendAt: 0, afterLogin: null,
  accTab: "orders", accData: null, accLoading: false, accErr: false, memPlan: null
};
const t = (k, vars) => { let s = (T[S.lang] && T[S.lang][k]) ?? T.en[k] ?? k; if (vars) for (const [a, b] of Object.entries(vars)) s = s.replace("{" + a + "}", b); return s; };
const pname = p => (S.lang === "hi" ? p.name_hi : p.name_en) || p.name_en;
const oname = o => (S.lang === "hi" ? o.hi : o.en) || o.en;
const defOpt = p => p.options.find(o => o.def) || p.options[0];
const pct = o => o.mrp && o.mrp > o.price ? Math.round((o.mrp - o.price) * 100 / o.mrp) : 0;
const wa = msg => `https://wa.me/${C.whatsapp}?text=${encodeURIComponent(msg)}`;

/* ---------------- supabase ---------------- */
let sb = null;
try {
  sb = window.supabase.createClient(C.supabaseUrl, C.supabaseKey, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true, flowType: "pkce", storageKey: "af-auth" }
  });
} catch (e) { console.warn("Supabase unavailable", e); }

async function withRetry(fn, tries = 3) {
  let last;
  for (let i = 0; i < tries; i++) {
    try { const r = await fn(); if (r && r.error) throw r.error; return r; }
    catch (e) { last = e; if (i < tries - 1) await new Promise(r => setTimeout(r, 600 * (i + 1) * (i + 1))); }
  }
  throw last;
}
function errText(e) {
  const m = String(e?.message || e || "");
  if (!navigator.onLine || /Failed to fetch|NetworkError|network/i.test(m)) return t("errNet");
  if (e?.status === 429 || /rate limit|too many/i.test(m)) return t("errRate");
  return t("errGeneric");
}

/* ---------------- i18n ---------------- */
function applyLang() {
  document.documentElement.lang = S.lang;
  $$("[data-t]").forEach(el => { el.textContent = t(el.dataset.t); });
  $$("[data-t-html]").forEach(el => { el.innerHTML = t(el.dataset.tHtml); });
  $$("[data-ph]").forEach(el => { el.placeholder = t(el.dataset.ph); });
  $$(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === S.lang)));
  $("#nextSlot").textContent = new Date().getHours() < C.eveningCutoffHour ? t("nextToday") : t("nextTomorrow");
  renderFaq(); renderCats(); renderGrid(); renderCartUI(); renderHarvest(); renderSocial();
  if ($("#cartDrawer").classList.contains("open")) renderDrawer();
  if ($("#accDrawer").classList.contains("open")) renderAccount();
  if ($("#loginModal").classList.contains("open")) renderLogin();
  if ($("#story").classList.contains("open")) renderTimeline();
}

/* ---------------- products ---------------- */
async function loadProducts() {
  if (!sb) { S.loaded = true; renderGrid(); return; }
  try {
    const { data, error } = await withRetry(() => sb.from("products")
      .select("id,name_en,name_hi,price,mrp,kit,active,sort,options,category,image,farm,tag_en,tag_hi")
      .eq("active", true).order("sort"), 2);
    if (error) throw error;
    const list = (data || []).filter(p => Array.isArray(p.options) && p.options.length);
    if (list.length) { S.products = list; store.set("af_products", list); }
  } catch (e) { console.warn("Using saved product list", e); }
  S.loaded = true;
  // drop cart lines whose product/option no longer exists
  let dropped = false;
  for (const key of Object.keys(S.cart)) if (!lineInfo(key)) { delete S.cart[key]; dropped = true; }
  if (dropped) saveCart();
  renderCats(); renderGrid(); renderCartUI(); renderHarvest();
}
function lineInfo(key) {
  const [id, k] = key.split("|");
  const p = S.products.find(x => x.id === id); if (!p) return null;
  const o = p.options.find(x => x.k === k); if (!o) return null;
  return { p, o };
}
function visibleProducts() {
  let list = S.products.slice();
  if (S.cat === "farm") list = list.filter(p => p.farm);
  else if (S.cat !== "all") list = list.filter(p => p.category === S.cat);
  const q = S.q.trim().toLowerCase();
  if (q) list = S.products.filter(p => [p.name_en, p.name_hi, p.category, p.tag_en].join(" ").toLowerCase().includes(q));
  if (S.sort === "low") list.sort((a, b) => defOpt(a).price - defOpt(b).price);
  if (S.sort === "high") list.sort((a, b) => defOpt(b).price - defOpt(a).price);
  if (S.sort === "off") list.sort((a, b) => pct(defOpt(b)) - pct(defOpt(a)));
  return list;
}

/* ---------------- shop rendering ---------------- */
function renderCats() {
  const nav = $("#cats"); if (!nav) return;
  const counts = id => id === "all" ? S.products.length : id === "farm" ? S.products.filter(p => p.farm).length : S.products.filter(p => p.category === id).length;
  nav.innerHTML = window.CATS.filter(c => counts(c.id) > 0).map(c =>
    `<button type="button" class="cat" data-cat="${c.id}" aria-current="${S.cat === c.id && !S.q}"><img src="assets/${c.img}" alt="" loading="lazy" width="48" height="48"><span>${esc(c[S.lang])}</span></button>`).join("");
}
function qtyOf(id) { return Object.entries(S.cart).filter(([k]) => k.startsWith(id + "|")); }
function btnFor(p) {
  const lines = qtyOf(p.id);
  const many = p.options.length > 1;
  if (!lines.length) return `<button type="button" class="addb" data-add="${p.id}" aria-label="${t("add")} ${esc(pname(p))}">${t("add")}${many ? `<small>${p.options.length} ${t("options")}</small>` : ""}</button>`;
  if (lines.length === 1) {
    const [key, q] = lines[0];
    return `<div class="stp"><button type="button" data-dec="${key}" aria-label="−">−</button><span class="num">${q}</span><button type="button" data-inc="${key}" aria-label="+">+</button></div>`;
  }
  const total = lines.reduce((s, [, q]) => s + q, 0);
  return `<div class="stp"><button type="button" data-sheet="${p.id}" aria-label="−">−</button><span class="num">${total}</span><button type="button" data-sheet="${p.id}" aria-label="+">+</button></div>`;
}
function cardHTML(p) {
  const lines = qtyOf(p.id);
  const o = lines.length === 1 ? lineInfo(lines[0][0]).o : defOpt(p);
  const off = pct(o);
  return `<article class="pc" data-pid="${p.id}">
    <div class="pim"><img src="assets/${esc(p.image || "logo-badge.png")}" alt="${esc(pname(p))}" loading="lazy" width="300" height="300">
      ${off ? `<span class="rib">${off}%<br>${t("off")}</span>` : ""}
      ${p.farm ? `<span class="farm"><svg class="i"><use href="#leaf"/></svg>${t("ourFarm")}</span>` : ""}</div>
    <span class="eta"><svg class="i"><use href="#clock"/></svg>${esc(slotShort())}</span>
    <h4>${esc(pname(p))}</h4>
    <span class="q">${esc(oname(o))}</span>
    <div class="pf"><span><b class="num">${fmt(o.price)}</b>${o.mrp > o.price ? `<s class="num">${fmt(o.mrp)}</s>` : ""}</span>${btnFor(p)}</div>
  </article>`;
}
function renderGrid() {
  const grid = $("#grid"); if (!grid) return;
  const list = visibleProducts();
  const cat = window.CATS.find(c => c.id === S.cat);
  $("#catTitle").textContent = S.q ? `"${S.q}"` : (cat ? cat[S.lang] : "");
  $("#catCount").textContent = `(${list.length})`;
  const note = `<div class="note"><svg class="i" style="color:var(--leaf)"><use href="#sprout"/></svg><span>${t("noteFarm")}</span></div>`;
  if (!S.loaded && !list.length) { grid.innerHTML = note + Array(5).fill('<div class="pc skel"><div class="pim"></div><h4>…</h4><span class="q">…</span></div>').join(""); return; }
  grid.innerHTML = note + (list.length ? list.map(cardHTML).join("") : `<div class="empty-s">${t("noResults")}</div>`);
}
function refreshCard(id) {
  const el = $(`.pc[data-pid="${id}"]`); const p = S.products.find(x => x.id === id);
  if (el && p) { el.outerHTML = cardHTML(p); }
}
function renderHarvest() {
  const el = $("#harvestList"); if (!el) return;
  el.textContent = S.products.filter(p => p.farm).slice(0, 3).map(pname).join(" · ") || "—";
}
function renderFaq() {
  $("#faqList").innerHTML = window.FAQ.map((f, i) => `<details${i === 0 ? " open" : ""}><summary>${esc(f[S.lang][0])}<svg class="i"><use href="#chev"/></svg></summary><p>${esc(f[S.lang][1])}</p></details>`).join("");
}
function renderSocial() {
  const items = [];
  if (C.instagram) items.push(`<li><a href="${esc(C.instagram)}" target="_blank" rel="noopener">Instagram</a></li>`);
  if (C.facebook) items.push(`<li><a href="${esc(C.facebook)}" target="_blank" rel="noopener">Facebook</a></li>`);
  items.push(`<li><a href="${wa("Hi Annadata Fresh Mart!")}" target="_blank" rel="noopener">WhatsApp</a></li>`);
  $("#socialList").innerHTML = items.join("");
  $("#waFab").href = wa("Hi Annadata Fresh Mart! I want to order vegetables.");
  $("#mapLink").href = C.mapLink;
}

/* ---------------- slots ---------------- */
function slotOptions() {
  const now = new Date(), d = n => { const x = new Date(now); x.setDate(x.getDate() + n); return x.toLocaleDateString("en-IN", { weekday: "short", day: "numeric", month: "short" }); };
  const list = [];
  if (now.getHours() < C.eveningCutoffHour) list.push({ v: `${d(0)}, 6–8 PM`, l: t("slotToday") });
  list.push({ v: `${d(1)}, 6–8 AM`, l: t("slotMorning") }, { v: `${d(1)}, 6–8 PM`, l: t("slotTomEve") });
  return list;
}
const slotShort = () => slotOptions()[0].l;

/* ---------------- cart ---------------- */
function saveCart() { store.set("af_cart", S.cart); }
function setQty(key, q) {
  const info = lineInfo(key); if (!info) return;
  const before = S.cart[key] || 0;
  q = Math.max(0, Math.min(50, q));
  if (q) S.cart[key] = q; else delete S.cart[key];
  saveCart();
  refreshCard(info.p.id);
  renderCartUI();
  if ($("#optSheet").classList.contains("open")) renderSheet(info.p.id);
  if ($("#cartDrawer").classList.contains("open") && S.view === "cart") renderDrawer();
  if (!before && q) toast(t("added"));
}
function totals() {
  let sub = 0, mrp = 0, count = 0, kit = false;
  for (const [key, q] of Object.entries(S.cart)) {
    const info = lineInfo(key); if (!info) continue;
    sub += info.o.price * q; mrp += (info.o.mrp || info.o.price) * q; count += q; kit = kit || !!info.p.kit;
  }
  const fee = sub === 0 || sub >= C.freeDeliveryAbove ? 0 : C.deliveryCharge;
  return { sub, mrp, fee, total: sub + fee, count, kit, lines: Object.keys(S.cart).length };
}
function renderCartUI() {
  const tt = totals();
  $("#cartBtnTxt").innerHTML = tt.lines ? `${tt.count} ${tt.count === 1 ? t("item") : t("items")}<small class="num">${fmt(tt.sub)}</small>` : t("cart");
  const bar = $("#mbar");
  const show = tt.lines > 0 && !document.body.classList.contains("lock");
  bar.classList.toggle("show", show);
  document.body.classList.toggle("has-cart", tt.lines > 0);
  $("#mbarTotal").textContent = fmt(tt.sub);
  const left = C.freeDeliveryAbove - tt.sub, short = C.minOrder - tt.sub;
  $("#mbarSmall").textContent = `${tt.count} ${tt.count === 1 ? t("item") : t("items")} · ` + (short > 0 ? t("minWarn", { n: short }).replace(/\s*\(.*\)/, "") : left > 0 ? t("freeHint", { n: left }) : t("freeOk"));
  $("#mbarProg").style.width = Math.min(100, Math.round(tt.sub * 100 / C.freeDeliveryAbove)) + "%";
}

/* ---------------- option sheet ---------------- */
let sheetPid = null;
function openSheet(pid) { sheetPid = pid; renderSheet(pid); openLayer($("#optSheet")); }
function renderSheet(pid) {
  const p = S.products.find(x => x.id === pid); if (!p) return;
  $("#optTitle").textContent = pname(p);
  $("#optSub").textContent = p.kit ? t("kitNote") : t("chooseQty");
  $("#optList").innerHTML = p.options.map(o => {
    const key = p.id + "|" + o.k, q = S.cart[key] || 0, off = pct(o);
    return `<div class="opt2"><img src="assets/${esc(p.image)}" alt=""><div class="on"><b>${esc(oname(o))}</b>${off ? `<em>${off}% ${t("off")}</em>` : ""}</div>
      <div class="pp"><b class="num">${fmt(o.price)}</b>${o.mrp > o.price ? `<s class="num">${fmt(o.mrp)}</s>` : ""}</div>
      ${q ? `<div class="stp"><button type="button" data-dec="${key}" aria-label="−">−</button><span class="num">${q}</span><button type="button" data-inc="${key}" aria-label="+">+</button></div>`
          : `<button type="button" class="addb" data-addkey="${key}">${t("add")}</button>`}</div>`;
  }).join("");
}

/* ---------------- layers ---------------- */
const layers = [];
function openLayer(el) {
  if (!layers.includes(el)) layers.push(el);
  el.classList.add("open"); el.setAttribute("aria-hidden", "false");
  $("#ov").classList.add("open");
  document.body.classList.add("lock");
  renderCartUI();
  setTimeout(() => { const f = el.querySelector("input,button:not(.x)"); if (f && matchMedia("(min-width:901px)").matches) f.focus({ preventScroll: true }); }, 50);
}
function closeLayer(el) {
  el = el || layers[layers.length - 1]; if (!el) return;
  el.classList.remove("open"); el.setAttribute("aria-hidden", "true");
  layers.splice(layers.indexOf(el), 1);
  if (el.id === "cartDrawer" && S.view === "done") S.view = "cart";
  if (!layers.length) { $("#ov").classList.remove("open"); document.body.classList.remove("lock"); }
  renderCartUI();
}

/* ---------------- cart drawer ---------------- */
function openCart(view = "cart") { S.view = view; renderDrawer(); openLayer($("#cartDrawer")); }
function renderDrawer() {
  const tt = totals(), body = $("#cartBody"), foot = $("#cartFoot");
  $("#cartBack").hidden = S.view !== "checkout";
  if (S.view === "done") return renderDone();
  if (!tt.lines) {
    S.view = "cart";
    $("#cartTitle").textContent = t("cart");
    body.innerHTML = `<div class="empty"><svg class="i"><use href="#bag"/></svg><h4 style="font:700 18px Mukta;color:var(--ink)">${t("emptyCart")}</h4><p>${t("emptyCartSub")}</p></div>`;
    foot.innerHTML = `<button class="btn btn-p btn-block" type="button" data-close data-goto-shop>${t("startShopping")}</button>`;
    return;
  }
  const short = C.minOrder - tt.sub, left = C.freeDeliveryAbove - tt.sub;
  const bill = `<div class="box"><h5>${t("billDetails")}</h5>
    <div class="row"><span>${t("itemsTotal")}</span><span class="num">${tt.mrp > tt.sub ? `<s style="color:#8A938B">${fmt(tt.mrp)}</s> ` : ""}<b>${fmt(tt.sub)}</b></span></div>
    <div class="row"><span>${t("deliveryFee")}</span><b class="num">${tt.fee ? fmt(tt.fee) : `<span class="save">${t("free")}</span>`}</b></div>
    <div class="row tot"><span>${t("grandTotal")}</span><span class="num">${fmt(tt.total)}</span></div>
    ${tt.mrp > tt.sub ? `<div class="row"><span class="save">${t("youSave")}</span><span class="save num">${fmt(tt.mrp - tt.sub)}</span></div>` : ""}</div>`;
  const hint = short > 0 ? `<div class="hint warn">${t("minWarn", { n: short })}</div>` : `<div class="hint"><svg class="i"><use href="#truck"/></svg>${left > 0 ? t("freeHint", { n: left }) : t("freeOk")}</div>`;
  if (S.view === "cart") {
    $("#cartTitle").textContent = t("cart");
    body.innerHTML = hint + `<div class="box">` + Object.entries(S.cart).map(([key, q]) => {
      const { p, o } = lineInfo(key);
      return `<div class="line"><img src="assets/${esc(p.image)}" alt=""><div><b>${esc(pname(p))}</b><small>${esc(oname(o))}</small><div class="lp num">${fmt(o.price * q)}${o.mrp > o.price ? `<s>${fmt(o.mrp * q)}</s>` : ""}</div></div>
        <div class="stp"><button type="button" data-dec="${key}" aria-label="−">−</button><span class="num">${q}</span><button type="button" data-inc="${key}" aria-label="+">+</button></div></div>`;
    }).join("") + `</div>` + (tt.kit ? `<div class="kit"><svg class="i"><use href="#gift"/></svg>${t("kitLine")}<em>${t("free")}</em></div>` : "") + bill;
    foot.innerHTML = `<button class="btn btn-p btn-block" type="button" id="toCheckout" ${short > 0 ? "disabled" : ""}>${S.session ? t("proceed") : t("loginToOrder")} · <span class="num">${fmt(tt.total)}</span></button>
      <p class="msg"><a class="linkbtn" href="${wa(waOrderText())}" target="_blank" rel="noopener">${t("orWhatsApp")}</a></p>`;
    return;
  }
  // checkout
  $("#cartTitle").textContent = t("checkout");
  const pr = S.profile || {};
  const bal = pr.balance || 0;
  const slots = slotOptions();
  const saved = store.get("af_checkout", {});
  const payOpts = [];
  if (C.upiId) payOpts.push(`<label class="opt"><input type="radio" name="pay" value="upi"><span><b>${t("payUpi")}</b><small>${t("payUpiS")}</small></span></label>`);
  payOpts.push(`<label class="opt"><input type="radio" name="pay" value="cod" checked><span><b>${t("payCod")}</b><small>${t("payCodS")}</small></span></label>`);
  payOpts.push(`<label class="opt${bal < tt.total ? " dis" : ""}"><input type="radio" name="pay" value="wallet" ${bal < tt.total ? "disabled" : ""}><span><b>${t("payWallet")}</b><small>${bal < tt.total ? t("payWalletLow", { n: bal.toLocaleString("en-IN") }) : t("payWalletS", { n: bal.toLocaleString("en-IN") })}</small></span></label>`);
  body.innerHTML = `<form id="coForm" novalidate>
    <div class="box"><h5>${t("deliverTo")}</h5>
      <div class="f" id="fName"><label for="cName">${t("name")}</label><input id="cName" autocomplete="name" value="${esc(pr.full_name || saved.name || "")}"><span class="err"></span></div>
      <div class="f" id="fPhone"><label for="cPhone">${t("phone")}</label><input id="cPhone" inputmode="numeric" maxlength="10" autocomplete="tel-national" placeholder="98XXXXXXXX" value="${esc(pr.phone || saved.phone || "")}"><span class="err"></span></div>
      <div class="f" id="fAddr"><label for="cAddr">${t("address")}</label><textarea id="cAddr" rows="2" autocomplete="street-address">${esc(pr.address || saved.address || "")}</textarea><span class="err"></span></div>
      <div class="f"><label for="cLand">${t("landmark")}</label><input id="cLand" value="${esc(pr.landmark || saved.landmark || "")}"></div>
    </div>
    <div class="box"><h5>${t("slot")}</h5><div class="opts">${slots.map((s, i) => `<label class="opt"><input type="radio" name="slot" value="${esc(s.v)}" ${i === 0 ? "checked" : ""}><span><b>${esc(s.l)}</b><small>${esc(s.v)}</small></span></label>`).join("")}</div></div>
    <div class="box"><h5>${t("pay")}</h5><div class="opts">${payOpts.join("")}</div></div>
    ${bill}</form>`;
  foot.innerHTML = `<button class="btn btn-g btn-block" type="button" id="placeBtn">${t("placeOrder", { n: tt.total.toLocaleString("en-IN") })}</button><p class="msg err" id="placeErr" hidden></p>`;
}
function waOrderText(order) {
  const lines = order ? order.items.map(i => `• ${i.name} (${i.opt}) × ${i.qty} = ₹${i.price * i.qty}`)
    : Object.entries(S.cart).map(([key, q]) => { const { p, o } = lineInfo(key); return `• ${p.name_en} (${o.en}) × ${q} = ₹${o.price * q}`; });
  const tt = order ? { sub: order.subtotal, fee: order.fee, total: order.total } : totals();
  return `🥬 *${order ? "Order #" + order.id : "New order"} – Annadata Fresh Mart*\n\n${lines.join("\n")}\n\nItems: ₹${tt.sub}\nDelivery: ${tt.fee ? "₹" + tt.fee : "FREE"}\n*Total: ₹${tt.total}*` +
    (order ? `\n\nName: ${order.name}\nPhone: ${order.phone}\nAddress: ${order.address}\nSlot: ${order.slot}\nPayment: ${order.pay}` : "\n\nName:\nAddress:\nSlot (6–8 AM / 6–8 PM):");
}
function setErr(id, msg) { const f = $("#" + id); f.classList.toggle("bad", !!msg); f.querySelector(".err").textContent = msg || ""; }
let placing = false;
async function placeOrder() {
  if (placing) return;
  const name = $("#cName").value.trim(), phone = $("#cPhone").value.replace(/\D/g, "").slice(-10), address = $("#cAddr").value.trim(), landmark = $("#cLand").value.trim();
  setErr("fName", name ? "" : t("errName")); setErr("fPhone", /^[6-9]\d{9}$/.test(phone) ? "" : t("errPhone")); setErr("fAddr", address ? "" : t("errAddr"));
  if (!name || !/^[6-9]\d{9}$/.test(phone) || !address) { $("#coForm .bad input, #coForm .bad textarea")?.focus(); return; }
  store.set("af_checkout", { name, phone, address, landmark });
  if (!S.session) { S.afterLogin = "checkout"; return openLogin(); }
  const slot = $("input[name=slot]:checked").value, pay = $("input[name=pay]:checked")?.value || "cod";
  const items = Object.entries(S.cart).map(([key, qty]) => { const [id, opt] = key.split("|"); return { id, opt, qty }; });
  let ref = ss.get("af_order_ref"); if (!ref) { ref = (crypto.randomUUID ? crypto.randomUUID() : Date.now() + "-" + Math.random().toString(36).slice(2)); ss.set("af_order_ref", ref); }
  const btn = $("#placeBtn"), errEl = $("#placeErr");
  placing = true; btn.disabled = true; btn.innerHTML = `<span class="spin"></span>${t("placing")}`; errEl.hidden = true;
  try {
    const { data, error } = await sb.rpc("place_order", { p_items: items, p_slot: slot, p_pay: pay, p_name: name, p_phone: phone, p_address: address, p_landmark: landmark, p_client_ref: ref });
    if (error) throw error;
    ss.del("af_order_ref");
    S.lastOrder = { ...data, name, phone, address, slot, pay, payLabel: pay };
    S.cart = {}; saveCart();
    if (S.profile) { S.profile.balance = data.balance ?? S.profile.balance; Object.assign(S.profile, { full_name: name, phone, address, landmark }); }
    S.accData = null;
    S.view = "done"; renderDrawer(); renderGrid(); renderCartUI();
  } catch (e) {
    const m = String(e?.message || "");
    let msg = errText(e);
    if (m.includes("MIN_ORDER")) msg = t("minWarn", { n: C.minOrder - totals().sub });
    else if (m.includes("LOW_BALANCE")) msg = t("payWalletLow", { n: (S.profile?.balance || 0) });
    else if (m.includes("ITEM_UNAVAILABLE")) { msg = t("errGeneric"); await loadProducts(); }
    else if (m.includes("BAD_DETAILS")) msg = t("errAddr");
    else if (m.includes("LOGIN_REQUIRED") || e?.code === "PGRST301") { S.afterLogin = "checkout"; openLogin(); }
    errEl.textContent = msg; errEl.hidden = false;
    btn.disabled = false; btn.textContent = t("placeOrder", { n: totals().total.toLocaleString("en-IN") });
  } finally { placing = false; }
}
function renderDone() {
  const o = S.lastOrder; if (!o) { S.view = "cart"; return renderDrawer(); }
  $("#cartTitle").textContent = t("orderPlaced");
  const upi = o.pay === "upi" && C.upiId && !o.upiDone;
  const upiLink = `upi://pay?pa=${encodeURIComponent(C.upiId)}&pn=${encodeURIComponent(C.upiName)}&am=${o.total}&cu=INR&tn=${encodeURIComponent("Annadata order " + o.id)}`;
  $("#cartBody").innerHTML = `<div class="done"><div class="tick"><svg class="i"><use href="#check"/></svg></div><h4>${t("orderPlaced")}</h4>
    <p><b>${t("orderNo", { n: o.id })}</b> · <span class="num">${fmt(o.total)}</span><br>${esc(t("orderPlacedSub", { slot: o.slot }))}</p></div>
    ${upi ? `<div class="box"><h5>${t("upiPayTitle")}</h5><a class="btn btn-g btn-block" href="${upiLink}">${t("upiPayBtn", { n: o.total })}</a>
      <div class="f" style="margin-top:12px" id="fRef"><label for="upiRef">${t("upiRef")}</label><input id="upiRef" inputmode="numeric" maxlength="22"><span class="err"></span></div>
      <button class="btn btn-o btn-block" type="button" id="upiRefBtn">${t("upiRefBtn")}</button></div>` : ""}
    <div class="box">${o.items.map(i => `<div class="row"><span>${esc(i.name)} (${esc(i.opt)}) × ${i.qty}</span><b class="num">${fmt(i.price * i.qty)}</b></div>`).join("")}
      <div class="row tot"><span>${t("grandTotal")}</span><span class="num">${fmt(o.total)}</span></div></div>`;
  $("#cartFoot").innerHTML = `<a class="btn btn-p btn-block" href="${wa(waOrderText(o))}" target="_blank" rel="noopener"><svg class="i"><use href="#wa"/></svg>${t("sendWa")}</a>
    <p class="msg"><button class="linkbtn" type="button" data-close data-goto-shop>${t("continueShop")}</button> · <button class="linkbtn" type="button" data-open-orders>${t("viewOrders")}</button></p>`;
}
async function submitUpiRef() {
  const v = $("#upiRef").value.replace(/\s/g, "");
  if (v.length < 6) return setErr("fRef", t("upiRef"));
  try { const { error } = await sb.rpc("submit_upi_ref", { p_order: S.lastOrder.id, p_ref: v }); if (error) throw error; S.lastOrder.upiDone = true; toast(t("upiRefOk")); renderDone(); }
  catch (e) { setErr("fRef", errText(e)); }
}

/* ---------------- auth ---------------- */
function openLogin() { S.loginStep = S.loginStep === "code" && S.loginEmail ? "code" : "start"; renderLogin(); openLayer($("#loginModal")); }
function renderLogin() {
  const b = $("#loginBody");
  if (S.loginStep === "start") {
    b.innerHTML = `<h3 id="loginTitle">${t("loginTitle")}</h3><p class="sub">${t("loginSub")}</p>
      <button class="gbtn" type="button" id="gLogin"><svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>${t("google")}</button>
      <div class="or">${t("orEmail")}</div>
      <form id="emailForm" novalidate><div class="f" id="fEmail"><label for="lEmail">${t("email")}</label><input id="lEmail" type="email" inputmode="email" autocomplete="email" value="${esc(S.loginEmail)}" placeholder="name@gmail.com"><span class="err"></span></div>
      <button class="btn btn-p btn-block" type="submit" id="sendBtn"><svg class="i"><use href="#mail"/></svg>${t("sendCode")}</button></form>
      <p class="msg err" id="loginErr" hidden></p>`;
  } else {
    b.innerHTML = `<h3 id="loginTitle">${t("codeTitle")}</h3><p class="sub">${esc(t("codeSub", { e: S.loginEmail }))}</p>
      <form id="codeForm" novalidate><div class="f" id="fCode"><label for="lCode">${t("code")}</label><input id="lCode" class="otp" inputmode="numeric" autocomplete="one-time-code" maxlength="8" pattern="[0-9]*"><span class="err"></span></div>
      <button class="btn btn-p btn-block" type="submit" id="verifyBtn">${t("verify")}</button></form>
      <p class="msg"><button class="linkbtn" type="button" id="resendBtn"></button> · <button class="linkbtn" type="button" id="changeEmail">${t("changeEmail")}</button></p>
      <p class="msg err" id="loginErr" hidden></p>`;
    tickResend();
  }
}
let resendTimer;
function tickResend() {
  clearInterval(resendTimer);
  const upd = () => { const b = $("#resendBtn"); if (!b) return clearInterval(resendTimer); const s = Math.ceil((S.resendAt - Date.now()) / 1000); b.disabled = s > 0; b.textContent = s > 0 ? t("resendIn", { n: s }) : t("resend"); if (s <= 0) clearInterval(resendTimer); };
  upd(); resendTimer = setInterval(upd, 1000);
}
function loginErr(msg) { const e = $("#loginErr"); if (e) { e.textContent = msg; e.hidden = !msg; } }
async function sendCode(email) {
  if (!sb) return loginErr(t("errNet"));
  const btn = $("#sendBtn") || $("#resendBtn");
  if (btn) btn.disabled = true;
  loginErr("");
  try {
    const { error } = await sb.auth.signInWithOtp({ email, options: { shouldCreateUser: true, emailRedirectTo: location.origin + location.pathname } });
    if (error) throw error;
    S.loginEmail = email; S.loginStep = "code"; S.resendAt = Date.now() + 60000; store.set("af_login_email", email);
    renderLogin(); setTimeout(() => $("#lCode")?.focus(), 60);
  } catch (e) {
    const m = String(e?.message || "");
    loginErr(e?.status === 429 || /rate|seconds/i.test(m) ? t("errRate") : (!navigator.onLine || /fetch/i.test(m)) ? t("errNet") : t("errEmailSend"));
    if (btn) btn.disabled = false;
  }
}
async function verifyCode(code) {
  const btn = $("#verifyBtn"); btn.disabled = true; btn.innerHTML = `<span class="spin"></span>`; loginErr("");
  try {
    const { data, error } = await sb.auth.verifyOtp({ email: S.loginEmail, token: code, type: "email" });
    if (error) throw error;
    await onSignedIn(data.session);
  } catch (e) {
    const m = String(e?.message || "");
    setErr("fCode", e?.status === 429 || /rate/i.test(m) ? t("errRate") : (!navigator.onLine || /fetch/i.test(m)) ? t("errNet") : t("errCode"));
    btn.disabled = false; btn.textContent = t("verify");
  }
}
async function googleLogin() {
  if (!sb) return loginErr(t("errNet"));
  ss.set("af_after_login", S.afterLogin || "");
  const { error } = await sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname, queryParams: { prompt: "select_account" } } });
  if (error) loginErr(errText(error));
}
async function loadProfile() {
  if (!S.session) { S.profile = null; return; }
  const u = S.session.user;
  try {
    const { data } = await withRetry(() => sb.rpc("ensure_profile"), 3);
    S.profile = data; S.profileErr = false;
  } catch (e) {
    console.warn("profile load failed", e);
    // never block the user: fall back to what the login itself tells us
    S.profile = S.profile || { id: u.id, email: u.email, full_name: u.user_metadata?.full_name || u.user_metadata?.name || "", balance: 0 };
    S.profileErr = true;
  }
  $("#accDot").hidden = false;
}
async function onSignedIn(session) {
  if (!session) return;
  const first = !S.session;
  S.session = session;
  await loadProfile();
  S.loginStep = "start";
  if ($("#loginModal").classList.contains("open")) closeLayer($("#loginModal"));
  if (first) toast(t("welcome", { n: (S.profile?.full_name || session.user.email || "").split(" ")[0].split("@")[0] }));
  const next = S.afterLogin || ss.get("af_after_login"); S.afterLogin = null; ss.del("af_after_login");
  if (next === "checkout" && totals().lines) openCart("checkout");
  else if (next === "membership") openAccount("wallet", true);
  else if (next === "orders") openAccount("orders");
  if ($("#cartDrawer").classList.contains("open")) renderDrawer();
  if ($("#accDrawer").classList.contains("open")) renderAccount();
}
async function logout() {
  try { await sb.auth.signOut({ scope: "local" }); } catch {}
  S.session = null; S.profile = null; S.accData = null; $("#accDot").hidden = true;
  closeLayer($("#accDrawer")); toast(t("loggedOut"));
}

/* ---------------- account ---------------- */
function openAccount(tab, member) {
  if (!S.session) { S.afterLogin = member ? "membership" : tab === "orders" ? "orders" : null; return openLogin(); }
  S.accTab = tab || S.accTab; S.memPlan = member ? (S.memPlan || "saathi") : null;
  renderAccount(); openLayer($("#accDrawer")); loadAccount();
}
async function loadAccount(force) {
  if (!S.session || S.accLoading) return;
  if (S.accData && !force) return renderAccount();
  S.accLoading = true; S.accErr = false; renderAccount();
  const uid = S.session.user.id;
  try {
    if (S.profileErr) await loadProfile();
    const [o, w, m] = await Promise.all([
      withRetry(() => sb.from("orders").select("id,items,total,pay_method,status,paid,slot,created_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(30), 2),
      withRetry(() => sb.from("wallet_txns").select("amount,kind,note,created_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(30), 2),
      withRetry(() => sb.from("membership_requests").select("plan,amount,credit,status,created_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(10), 2)
    ]);
    S.accData = { orders: o.data || [], txns: w.data || [], reqs: m.data || [] };
  } catch (e) { console.warn(e); S.accErr = true; }
  S.accLoading = false; renderAccount();
}
const chipCls = s => s === "delivered" || s === "confirmed" ? "ok" : s === "cancelled" ? "no" : "wait";
const dt = s => new Date(s).toLocaleDateString(S.lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
function renderAccount() {
  const b = $("#accBody"); if (!b) return;
  if (!S.session) { b.innerHTML = `<div class="empty"><svg class="i"><use href="#user"/></svg><p>${t("loginSub")}</p><button class="btn btn-p" type="button" data-login style="margin-top:14px">${t("loginTitle")}</button></div>`; return; }
  const p = S.profile || {}, nm = p.full_name || (p.email || "").split("@")[0];
  const head = `<div class="acc-hd"><span class="avatar">${esc((nm || "A")[0].toUpperCase())}</span><div><b>${esc(nm)}</b><small>${esc(p.email || S.session.user.email || "")}</small></div></div>
    <div class="bal"><div><small>${t("balance")}</small><b class="num">${fmt(p.balance || 0)}</b></div><button class="btn btn-g" style="min-height:42px;padding:0 16px;font-size:15px" type="button" data-mem-start>${t("memBtn")}</button></div>
    <div class="tabs" role="tablist">${["orders", "wallet", "profile"].map(k => `<button type="button" role="tab" data-tab="${k}" aria-selected="${S.accTab === k}">${t("tab" + k[0].toUpperCase() + k.slice(1))}</button>`).join("")}</div>`;
  let body = "";
  if (S.memPlan) body = memberHTML();
  else if (S.accTab === "profile") body = `<form id="profForm" class="box" novalidate>
      <div class="f"><label for="pName">${t("name")}</label><input id="pName" autocomplete="name" value="${esc(p.full_name || "")}"></div>
      <div class="f" id="fPPhone"><label for="pPhone">${t("phone")}</label><input id="pPhone" inputmode="numeric" maxlength="10" value="${esc(p.phone || "")}"><span class="err"></span></div>
      <div class="f"><label for="pAddr">${t("address")}</label><textarea id="pAddr" rows="2">${esc(p.address || "")}</textarea></div>
      <div class="f"><label for="pLand">${t("landmark")}</label><input id="pLand" value="${esc(p.landmark || "")}"></div>
      <button class="btn btn-p btn-block" type="submit" id="profSave">${t("save")}</button></form>
      <button class="btn btn-w btn-block" type="button" id="logoutBtn">${t("logout")}</button>`;
  else if (S.accLoading && !S.accData) body = `<p class="msg">${t("loadingAcc")}</p>`;
  else if (S.accErr && !S.accData) body = `<div class="empty"><p>${t("loadErr")}</p><button class="btn btn-o" type="button" id="accRetry" style="margin-top:12px">${t("retry")}</button></div>`;
  else if (S.accTab === "orders") {
    const os = S.accData?.orders || [];
    body = os.length ? os.map(o => `<div class="ord"><div class="t"><b>#${o.id} · <span class="num">${fmt(o.total)}</span></b><span class="chip ${chipCls(o.status)}">${t("st_" + o.status)}</span></div>
      <p>${esc((o.items || []).map(i => `${i.name}${i.opt ? " (" + i.opt + ")" : ""} × ${i.qty}`).join(", "))}</p><p>${esc(o.slot || "")} · ${dt(o.created_at)}</p></div>`).join("")
      : `<div class="empty"><svg class="i"><use href="#bag"/></svg><p>${t("noOrders")}</p></div>`;
  } else {
    const tx = S.accData?.txns || [], rq = S.accData?.reqs || [];
    body = (rq.length ? `<div class="box">${rq.map(r => `<div class="tx"><span>${r.plan === "parivar" ? "Parivar" : "Saathi"} · ${fmt(r.amount)}</span><span class="chip ${r.status === "approved" ? "ok" : r.status === "rejected" ? "no" : "wait"}">${esc(r.status)}</span></div>`).join("")}</div>` : "") +
      (tx.length ? `<div class="box">${tx.map(x => `<div class="tx"><span>${esc(x.note || x.kind)}<br><small style="color:var(--ink-3)">${dt(x.created_at)}</small></span><span class="num ${x.amount > 0 ? "pos" : ""}">${x.amount > 0 ? "+" : "−"}${fmt(Math.abs(x.amount))}</span></div>`).join("")}</div>` : `<div class="empty"><svg class="i"><use href="#wallet"/></svg><p>${t("noTx")}</p></div>`);
  }
  b.innerHTML = head + body;
}
function memberHTML() {
  const amt = S.memPlan === "parivar" ? 10000 : 5000;
  const link = `upi://pay?pa=${encodeURIComponent(C.upiId)}&pn=${encodeURIComponent(C.upiName)}&am=${amt}&cu=INR&tn=${encodeURIComponent("Annadata membership")}`;
  return `<div class="box"><h5>${t("memBuyTitle")}</h5><div class="opts">
    <label class="opt"><input type="radio" name="plan" value="saathi" ${S.memPlan !== "parivar" ? "checked" : ""}><span><b>${t("memPlanS")}</b></span></label>
    <label class="opt"><input type="radio" name="plan" value="parivar" ${S.memPlan === "parivar" ? "checked" : ""}><span><b>${t("memPlanP")}</b></span></label></div></div>
    ${C.upiId ? `<div class="box"><p style="font-size:14.5px;color:var(--ink-2);margin-bottom:10px">${t("memPayNote")}</p>
      <a class="btn btn-g btn-block" href="${link}">${t("upiPayBtn", { n: amt.toLocaleString("en-IN") })}</a>
      <div class="f" id="fMRef" style="margin-top:12px"><label for="mRef">${t("upiRef")}</label><input id="mRef" inputmode="numeric" maxlength="22"><span class="err"></span></div>
      <button class="btn btn-p btn-block" type="button" id="memSubmit">${t("upiRefBtn")}</button></div>`
    : `<div class="box"><p style="font-size:14.5px;color:var(--ink-2);margin-bottom:12px">${t("memSoon")}</p><a class="btn btn-p btn-block" target="_blank" rel="noopener" href="${wa(`Hi! I want to start the ${S.memPlan === "parivar" ? "Parivar (₹10,000)" : "Saathi (₹5,000)"} membership.`)}"><svg class="i"><use href="#wa"/></svg>${t("memAsk")}</a></div>`}
    <p class="msg"><a class="linkbtn" href="membership.html">${t("memTerms")}</a> · <button class="linkbtn" type="button" id="memBack">${t("tabWallet")}</button></p>`;
}
async function submitMembership() {
  const ref = $("#mRef").value.replace(/\s/g, "");
  if (ref.length < 6) return setErr("fMRef", t("upiRef"));
  const btn = $("#memSubmit"); btn.disabled = true;
  try { const { error } = await sb.rpc("request_membership", { p_plan: S.memPlan, p_upi_ref: ref }); if (error) throw error; toast(t("memSent")); S.memPlan = null; S.accTab = "wallet"; loadAccount(true); }
  catch (e) { setErr("fMRef", String(e?.message || "").includes("TOO_MANY") ? t("errRate") : errText(e)); btn.disabled = false; }
}
async function saveProfile() {
  const phone = $("#pPhone").value.replace(/\D/g, "");
  if (phone && !/^[6-9]\d{9}$/.test(phone)) return setErr("fPPhone", t("errPhone"));
  const btn = $("#profSave"); btn.disabled = true;
  const upd = { full_name: $("#pName").value.trim() || null, phone: phone || null, address: $("#pAddr").value.trim() || null, landmark: $("#pLand").value.trim() || null };
  try { const { error } = await sb.from("profiles").update(upd).eq("id", S.session.user.id); if (error) throw error; Object.assign(S.profile, upd); toast(t("saved")); renderAccount(); }
  catch (e) { toast(errText(e)); btn.disabled = false; }
}

/* ---------------- story ---------------- */
function renderTimeline() {
  $("#timeline").innerHTML = window.TIMELINE.map(it => { const y = typeof it.y === "object" ? it.y[S.lang] : it.y; const [h, p] = it[S.lang]; return `<li><span class="y">${esc(y)}</span><h4>${esc(h)}</h4><p>${esc(p)}</p></li>`; }).join("");
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { root: $("#story"), threshold: .2 });
  $$("#timeline li").forEach(li => io.observe(li));
}
function openStory() {
  renderTimeline();
  const st = $("#story"); st.classList.add("open"); st.setAttribute("aria-hidden", "false"); st.scrollTop = 0;
  document.body.classList.add("lock"); renderCartUI();
  const v = $("#storyVid"); if (!matchMedia("(prefers-reduced-motion: reduce)").matches) { v.preload = "auto"; v.play().catch(() => {}); }
  if (location.hash !== "#story") history.pushState({ story: 1 }, "", "#story");
  setTimeout(() => st.querySelector(".x").focus({ preventScroll: true }), 50);
}
function closeStory(fromPop) {
  const st = $("#story"); if (!st.classList.contains("open")) return;
  st.classList.remove("open"); st.setAttribute("aria-hidden", "true"); $("#storyVid").pause();
  if (!layers.length) document.body.classList.remove("lock");
  renderCartUI();
  if (!fromPop && location.hash === "#story") history.back();
}

/* ---------------- toast ---------------- */
function toast(m) { const el = $("#toast"); el.textContent = m; el.classList.add("show"); clearTimeout(el._t); el._t = setTimeout(() => el.classList.remove("show"), 2200); }

/* ---------------- events ---------------- */
document.addEventListener("click", e => {
  const el = e.target.closest("button,a,[data-cat]"); if (!el) { if (e.target.id === "ov") closeLayer(); return; }
  const d = el.dataset;
  if (d.add) { const p = S.products.find(x => x.id === d.add); if (!p) return; if (p.options.length > 1) openSheet(p.id); else setQty(p.id + "|" + p.options[0].k, 1); return; }
  if (d.addkey) return setQty(d.addkey, 1);
  if (d.inc) return setQty(d.inc, (S.cart[d.inc] || 0) + 1);
  if (d.dec) return setQty(d.dec, (S.cart[d.dec] || 0) - 1);
  if (d.sheet) return openSheet(d.sheet);
  if (d.cat) { S.cat = d.cat; S.q = ""; $$(".q-in").forEach(i => i.value = ""); renderCats(); renderGrid(); if (matchMedia("(max-width:900px)").matches) $("#shop").scrollIntoView({ behavior: "smooth" }); return; }
  if (d.lang) { S.lang = d.lang; store.set("af_lang", S.lang); return applyLang(); }
  if ("openCart" in d) { e.preventDefault(); return openCart("cart"); }
  if ("close" in d) { closeLayer(el.closest(".drawer,.sheet,.modal") || undefined); if ("gotoShop" in d) $("#shop").scrollIntoView({ behavior: "smooth" }); if (S.view === "done") S.view = "cart"; return; }
  if ("openStory" in d) { e.preventDefault(); return openStory(); }
  if ("closeStory" in d) { closeStory(); if ("gotoShop" in d) setTimeout(() => $("#shop").scrollIntoView({ behavior: "smooth" }), 350); return; }
  if ("openMember" in d) { e.preventDefault(); return openAccount("wallet", true); }
  if ("openOrders" in d) { e.preventDefault(); if (layers.includes($("#cartDrawer"))) closeLayer($("#cartDrawer")); S.view = "cart"; return openAccount("orders"); }
  if ("memStart" in d) { S.memPlan = "saathi"; return renderAccount(); }
  if ("login" in d) { closeLayer($("#accDrawer")); return openLogin(); }
  if (d.tab) { S.accTab = d.tab; S.memPlan = null; return renderAccount(); }
  switch (el.id) {
    case "accBtn": return openAccount("orders");
    case "cartBack": S.view = "cart"; return renderDrawer();
    case "toCheckout": if (!S.session) { S.afterLogin = "checkout"; return openLogin(); } S.view = "checkout"; return renderDrawer();
    case "placeBtn": return placeOrder();
    case "upiRefBtn": return submitUpiRef();
    case "gLogin": return googleLogin();
    case "resendBtn": return sendCode(S.loginEmail);
    case "changeEmail": S.loginStep = "start"; return renderLogin();
    case "logoutBtn": return logout();
    case "accRetry": return loadAccount(true);
    case "memSubmit": return submitMembership();
    case "memBack": S.memPlan = null; S.accTab = "wallet"; return renderAccount();
    case "installBtn": return doInstall();
  }
});
$("#ov").addEventListener("click", () => closeLayer());
document.addEventListener("change", e => {
  if (e.target.name === "plan") { S.memPlan = e.target.value; renderAccount(); }
  if (e.target.id === "sortSel") { S.sort = e.target.value; renderGrid(); }
});
document.addEventListener("submit", e => {
  e.preventDefault();
  if (e.target.id === "emailForm") {
    const v = $("#lEmail").value.trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)) return setErr("fEmail", t("errEmail"));
    setErr("fEmail", ""); S.loginEmail = v; sendCode(v);
  }
  if (e.target.id === "codeForm") { const c = $("#lCode").value.replace(/\D/g, ""); if (c.length < 6) return setErr("fCode", t("errCode")); verifyCode(c); }
  if (e.target.id === "profForm") saveProfile();
});
document.addEventListener("input", e => {
  if (e.target.classList.contains("q-in")) {
    S.q = e.target.value; $$(".q-in").forEach(i => { if (i !== e.target) i.value = S.q; });
    renderCats(); renderGrid();
    clearTimeout(S._qs); S._qs = setTimeout(() => { if (S.q && $("#shop").getBoundingClientRect().top > innerHeight * .6) $("#shop").scrollIntoView({ behavior: "smooth" }); }, 500);
  }
  if (e.target.id === "lCode") e.target.value = e.target.value.replace(/\D/g, "");
});
document.addEventListener("keydown", e => { if (e.key === "Escape") { if ($("#story").classList.contains("open")) closeStory(); else closeLayer(); } });
addEventListener("popstate", () => { if (location.hash !== "#story") closeStory(true); });
addEventListener("storage", e => { if (e.key === "af_cart") { S.cart = store.get("af_cart", {}); renderGrid(); renderCartUI(); } });

/* ---------------- PWA install ---------------- */
let deferredPrompt = null;
addEventListener("beforeinstallprompt", e => { e.preventDefault(); deferredPrompt = e; $("#installBtn").classList.add("show"); });
addEventListener("appinstalled", () => { $("#installBtn").classList.remove("show"); toast(t("installed")); });
async function doInstall() { if (!deferredPrompt) return; deferredPrompt.prompt(); await deferredPrompt.userChoice.catch(() => {}); deferredPrompt = null; $("#installBtn").classList.remove("show"); }

/* ---------------- boot ---------------- */
function readAuthErrorFromUrl() {
  const q = new URLSearchParams(location.search), h = new URLSearchParams(location.hash.replace(/^#/, ""));
  const err = q.get("error_description") || h.get("error_description");
  if (err) { setTimeout(() => toast(/expired|invalid/i.test(err) ? t("errCode") : t("errGeneric")), 400); history.replaceState(null, "", location.pathname); }
}
async function boot() {
  S.loginEmail = store.get("af_login_email", "");
  applyLang();
  readAuthErrorFromUrl();
  loadProducts();
  if (!sb) return;
  sb.auth.onAuthStateChange((event, session) => {
    // defer: never call Supabase inside this callback directly
    setTimeout(() => {
      if (session && (event === "SIGNED_IN" || event === "INITIAL_SESSION")) {
        if (!S.session || S.session.user.id !== session.user.id) onSignedIn(session); else S.session = session;
        if (/[?&]code=/.test(location.search)) history.replaceState(null, "", location.pathname + location.hash);
      } else if (session && event === "TOKEN_REFRESHED") S.session = session;
      else if (event === "SIGNED_OUT") { S.session = null; S.profile = null; $("#accDot").hidden = true; }
    }, 0);
  });
  if (location.hash === "#story") openStory();
}
boot();
})();
