/* Annadata Fresh Mart — accounts, membership wallet, order history, checkout via database */
(function () {
  Object.assign(T.en, {
    nav_mem: "Membership", m_eyebrow: "Annadata Parivar Membership", m_title: "Pay ahead, get more sabzi",
    m_sub: "Add money to your Annadata account once. Every order is paid from your balance, with extra value on top.",
    m_p1_tag: "Saathi", m_p2_tag: "Parivar · Best value", m_get: "You get", m_worth: "of vegetables",
    m_b1: "10% extra value", m_b2: "Balance shows in your account", m_b3: "Free delivery on member orders above ₹499",
    m_b4: "15% extra value", m_b5: "Free zucchini recipe kit", m_b6: "Two farm visits a year", m_join: "Become a member",
    m_terms_t: "Simple, honest terms", m_t1: "Vegetables from our own farm, starting next week", m_t2: "Use your balance within 6 months",
    m_t3: "Unused balance refunded any time, within 7 days", m_t4: "Limited to the first 100 families", m_terms_link: "Read full membership terms",
    login: "Log in", loginTitle: "Log in to Annadata", loginSub: "Log in to order, see your balance and your order history.",
    google: "Continue with Google", orEmail: "or use email or mobile", tabEmail: "Email", tabPhone: "Mobile",
    emailL: "Email address", phoneL: "Mobile number", sendCode: "Send code", codeL: "Enter the 6-digit code",
    codeSentE: "We sent a code to your email. You can also tap the link in that email.", codeSentP: "We sent an OTP by SMS.",
    verify: "Verify and log in", change: "Change", loggedIn: "You are logged in", logout: "Log out",
    myAcct: "My account", balance: "Membership balance", addMoney: "Add membership",
    myOrders: "Order history", noOrders: "No orders yet.", walletHist: "Balance history", noTx: "No balance activity yet.",
    myReq: "Membership requests", pay: "Payment", payWallet: "Pay from membership balance", balIs: "Balance",
    lowBal: "Not enough balance", payCod: "Pay on delivery", payCodS: "UPI or cash at your door",
    payOnline: "Pay now by UPI", payOnlineS: "Opens your UPI app after the order",
    loginToOrder: "Log in to place your order", placeOrder: "Place order", placing: "Placing your order…",
    orderOk: "Order #{id} placed", orderOkS: "Total ₹{total}. We will confirm on WhatsApp.", newBal: "New balance",
    sendWaToo: "Also send details on WhatsApp", payUpiNow: "Pay ₹{total} by UPI",
    buyT: "Pay for your membership", buyS: "Send ₹{amt} by UPI, then enter the UPI transaction ID (UTR). We add ₹{credit} to your balance after checking the payment, usually within a few hours.",
    upiTo: "Pay to", utrL: "UPI transaction ID (UTR / Ref no.)", submitReq: "Submit payment details",
    reqOk: "Received. Your balance will be added after we check the payment.", payByUpiApp: "Open UPI app",
    upiMissing: "Our UPI ID will be added soon. For now, message us on WhatsApp to pay.",
    st_placed: "Placed", st_confirmed: "Confirmed", st_out_for_delivery: "Out for delivery", st_delivered: "Delivered", st_cancelled: "Cancelled",
    st_pending: "Checking payment", st_approved: "Added to balance", st_rejected: "Not approved",
    k_membership: "Membership added", k_order: "Order", k_refund: "Refund", k_adjust: "Adjustment",
    e_MIN_ORDER: "Minimum order is ₹299.", e_LOW_BALANCE: "Your balance is not enough for this order.", e_BAD_DETAILS: "Please check your name, number and address.",
    e_BAD_UPI_REF: "Enter a valid UPI transaction ID.", e_TOO_MANY_PENDING: "You already have payments being checked. Please wait.",
    e_generic: "Something went wrong. Please try again.", e_email: "Enter a valid email address.", e_phone: "Enter a 10-digit mobile number.", e_code: "Enter the code you received.",
    close: "Close", hello: "Namaste"
  });
  Object.assign(T.hi, {
    nav_mem: "मेम्बरशिप", m_eyebrow: "अन्नदाता परिवार मेम्बरशिप", m_title: "पहले भुगतान, ज़्यादा सब्ज़ी",
    m_sub: "एक बार अपने अन्नदाता अकाउंट में पैसे जोड़िए। हर ऑर्डर बैलेंस से कटेगा, और ऊपर से ज़्यादा फ़ायदा।",
    m_p1_tag: "साथी", m_p2_tag: "परिवार · सबसे बढ़िया", m_get: "आपको मिलेगी", m_worth: "की सब्ज़ी",
    m_b1: "10% ज़्यादा फ़ायदा", m_b2: "बैलेंस आपके अकाउंट में दिखेगा", m_b3: "₹499 से ऊपर के ऑर्डर पर फ्री डिलीवरी",
    m_b4: "15% ज़्यादा फ़ायदा", m_b5: "फ्री ज़ुकिनी रेसिपी किट", m_b6: "साल में दो बार खेत की सैर", m_join: "मेम्बर बनें",
    m_terms_t: "सीधी, ईमानदार शर्तें", m_t1: "अपने खेत की सब्ज़ी, अगले हफ़्ते से", m_t2: "बैलेंस 6 महीने में इस्तेमाल करें",
    m_t3: "बचा बैलेंस कभी भी वापस, 7 दिन में", m_t4: "सिर्फ़ पहले 100 परिवारों के लिए", m_terms_link: "मेम्बरशिप की पूरी शर्तें पढ़ें",
    login: "लॉग इन", loginTitle: "अन्नदाता में लॉग इन करें", loginSub: "ऑर्डर करने, बैलेंस और ऑर्डर हिस्ट्री देखने के लिए लॉग इन करें।",
    google: "Google से जारी रखें", orEmail: "या ईमेल / मोबाइल से", tabEmail: "ईमेल", tabPhone: "मोबाइल",
    emailL: "ईमेल", phoneL: "मोबाइल नंबर", sendCode: "कोड भेजें", codeL: "6 अंकों का कोड डालें",
    codeSentE: "आपके ईमेल पर कोड भेजा है। ईमेल का लिंक दबाकर भी लॉग इन कर सकते हैं।", codeSentP: "SMS पर OTP भेजा है।",
    verify: "पुष्टि करें और लॉग इन करें", change: "बदलें", loggedIn: "आप लॉग इन हैं", logout: "लॉग आउट",
    myAcct: "मेरा अकाउंट", balance: "मेम्बरशिप बैलेंस", addMoney: "मेम्बरशिप जोड़ें",
    myOrders: "ऑर्डर हिस्ट्री", noOrders: "अभी कोई ऑर्डर नहीं।", walletHist: "बैलेंस हिस्ट्री", noTx: "अभी कोई लेन-देन नहीं।",
    myReq: "मेम्बरशिप अनुरोध", pay: "भुगतान", payWallet: "मेम्बरशिप बैलेंस से भुगतान", balIs: "बैलेंस",
    lowBal: "बैलेंस कम है", payCod: "डिलीवरी पर भुगतान", payCodS: "घर पर UPI या कैश",
    payOnline: "अभी UPI से भुगतान", payOnlineS: "ऑर्डर के बाद UPI ऐप खुलेगा",
    loginToOrder: "ऑर्डर करने के लिए लॉग इन करें", placeOrder: "ऑर्डर करें", placing: "ऑर्डर हो रहा है…",
    orderOk: "ऑर्डर #{id} हो गया", orderOkS: "कुल ₹{total}। हम WhatsApp पर पुष्टि करेंगे।", newBal: "नया बैलेंस",
    sendWaToo: "WhatsApp पर भी जानकारी भेजें", payUpiNow: "₹{total} UPI से भरें",
    buyT: "मेम्बरशिप का भुगतान", buyS: "₹{amt} UPI से भेजें, फिर UPI ट्रांज़ैक्शन ID (UTR) डालें। भुगतान जाँचने के बाद आपके बैलेंस में ₹{credit} जुड़ जाएँगे, आमतौर पर कुछ घंटों में।",
    upiTo: "भुगतान करें", utrL: "UPI ट्रांज़ैक्शन ID (UTR / Ref नंबर)", submitReq: "भुगतान की जानकारी भेजें",
    reqOk: "मिल गया। भुगतान जाँचने के बाद बैलेंस जुड़ जाएगा।", payByUpiApp: "UPI ऐप खोलें",
    upiMissing: "हमारी UPI ID जल्द जुड़ेगी। अभी भुगतान के लिए WhatsApp करें।",
    st_placed: "ऑर्डर मिला", st_confirmed: "पक्का", st_out_for_delivery: "रास्ते में", st_delivered: "पहुँच गया", st_cancelled: "रद्द",
    st_pending: "भुगतान जाँच में", st_approved: "बैलेंस में जुड़ा", st_rejected: "मंज़ूर नहीं",
    k_membership: "मेम्बरशिप जुड़ी", k_order: "ऑर्डर", k_refund: "रिफंड", k_adjust: "बदलाव",
    e_MIN_ORDER: "कम से कम ऑर्डर ₹299 है।", e_LOW_BALANCE: "इस ऑर्डर के लिए बैलेंस कम है।", e_BAD_DETAILS: "नाम, नंबर और पता जाँच लें।",
    e_BAD_UPI_REF: "सही UPI ट्रांज़ैक्शन ID डालें।", e_TOO_MANY_PENDING: "आपके भुगतान पहले से जाँच में हैं। थोड़ा रुकें।",
    e_generic: "कुछ गड़बड़ हुई। फिर से कोशिश करें।", e_email: "सही ईमेल डालें।", e_phone: "10 अंकों का मोबाइल नंबर डालें।", e_code: "मिला हुआ कोड डालें।",
    close: "बंद करें", hello: "नमस्ते"
  });

  const PLANS = { saathi: { amt: 5000, credit: 5500 }, parivar: { amt: 10000, credit: 11500 } };
  let sb = null, session = null, profile = null, bal = 0, lastOrder = null;
  try { sb = window.supabase.createClient(CONFIG.supabaseUrl, CONFIG.supabaseKey); } catch (e) { sb = null; }
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const errMsg = e => { const m = String(e?.message || e || ""); const k = (m.match(/[A-Z_]{5,}/) || [])[0]; return (k && T[lang]["e_" + k]) || (m && m.length < 140 ? m : t("e_generic")); };
  const dt = s => new Date(s).toLocaleString(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "short", hour: "numeric", minute: "2-digit" });
  const openM = id => $(id).classList.add("open"), closeM = id => $(id).classList.remove("open");

  /* prices from database */
  async function loadPrices() {
    if (!sb) return;
    const { data } = await sb.from("products").select("id,price,mrp,active");
    if (!data) return;
    data.forEach(r => { const p = PRODUCTS.find(x => x.id === r.id); if (p) { p.price = r.price; p.mrp = r.mrp; p.hidden = !r.active; } });
    for (let i = PRODUCTS.length - 1; i >= 0; i--) if (PRODUCTS[i].hidden) PRODUCTS.splice(i, 1);
    renderProducts(); renderCart();
  }

  async function refresh() {
    if (!sb || !session) { profile = null; bal = 0; $("#openAcct").classList.remove("on"); return; }
    const [{ data: p }, { data: b }] = await Promise.all([
      sb.from("profiles").select("full_name,phone,address,landmark,is_admin").eq("id", session.user.id).maybeSingle(),
      sb.rpc("my_balance")
    ]);
    profile = p || {}; bal = b || 0;
    $("#openAcct").classList.add("on");
  }

  /* ---------- login ---------- */
  let authTab = "email", authStage = "start", authId = "", afterLogin = null;
  function renderAuth(err) {
    const box = $("#authBox");
    const idField = authTab === "email"
      ? `<div class="f"><label for="aId">${t("emailL")}</label><input id="aId" type="email" autocomplete="email" value="${esc(authId)}" ${authStage === "code" ? "readonly" : ""}></div>`
      : `<div class="f"><label for="aId">${t("phoneL")}</label><input id="aId" inputmode="numeric" maxlength="10" placeholder="98XXXXXXXX" value="${esc(authId)}" ${authStage === "code" ? "readonly" : ""}></div>`;
    box.innerHTML = `<div class="mhead"><h3 id="authTitle">${t("loginTitle")}</h3><button class="x" type="button" data-close="#authModal" aria-label="${t("close")}">×</button></div>
      <p class="sub" style="margin:0 0 14px">${t("loginSub")}</p>
      <button class="btn gbtn" type="button" id="gLogin"><svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M23 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.2a5.3 5.3 0 0 1-2.3 3.5v2.9h3.7c2.2-2 3.4-5 3.4-8.5z"/><path fill="#34A853" d="M12 24c3.1 0 5.7-1 7.6-2.8l-3.7-2.9c-1 .7-2.3 1.1-3.9 1.1-3 0-5.5-2-6.4-4.7H1.8v3A12 12 0 0 0 12 24z"/><path fill="#FBBC05" d="M5.6 14.7a7.2 7.2 0 0 1 0-4.6v-3H1.8a12 12 0 0 0 0 10.6z"/><path fill="#EA4335" d="M12 4.8c1.7 0 3.2.6 4.4 1.7l3.3-3.3A12 12 0 0 0 1.8 7.1l3.8 3C6.5 6.9 9 4.8 12 4.8z"/></svg>${t("google")}</button>
      <div class="or">${t("orEmail")}</div>
      <div class="tabs" role="tablist"><button type="button" role="tab" data-atab="email" aria-selected="${authTab === "email"}">${t("tabEmail")}</button><button type="button" role="tab" data-atab="phone" aria-selected="${authTab === "phone"}">${t("tabPhone")}</button></div>
      ${idField}
      ${authStage === "code" ? `<p class="hint">${authTab === "email" ? t("codeSentE") : t("codeSentP")} <a href="#" id="aChange">${t("change")}</a></p>
        <div class="f"><label for="aCode">${t("codeL")}</label><input id="aCode" inputmode="numeric" maxlength="6" autocomplete="one-time-code"></div>
        <button class="btn btn-primary" type="button" id="aVerify" style="width:100%">${t("verify")}</button>`
      : `<button class="btn btn-primary" type="button" id="aSend" style="width:100%">${t("sendCode")}</button>`}
      <p class="err" id="aErr" role="alert">${err ? esc(err) : ""}</p>`;
  }
  function openLogin(cb) { afterLogin = cb || null; authStage = "start"; renderAuth(); openM("#authModal"); }
  async function sendCode() {
    authId = $("#aId").value.trim();
    try {
      if (authTab === "email") {
        if (!/^\S+@\S+\.\S+$/.test(authId)) return renderAuth(t("e_email"));
        const { error } = await sb.auth.signInWithOtp({ email: authId, options: { emailRedirectTo: location.origin + location.pathname } }); if (error) throw error;
      } else {
        if (!/^[6-9]\d{9}$/.test(authId)) return renderAuth(t("e_phone"));
        const { error } = await sb.auth.signInWithOtp({ phone: "+91" + authId }); if (error) throw error;
      }
      authStage = "code"; renderAuth();
    } catch (e) { renderAuth(errMsg(e)); }
  }
  async function verifyCode() {
    const token = $("#aCode").value.trim();
    if (token.length < 6) return renderAuth(t("e_code"));
    try {
      const { error } = authTab === "email"
        ? await sb.auth.verifyOtp({ email: authId, token, type: "email" })
        : await sb.auth.verifyOtp({ phone: "+91" + authId, token, type: "sms" });
      if (error) throw error;
    } catch (e) { renderAuth(errMsg(e)); }
  }

  /* ---------- account ---------- */
  let acctView = "home", buyPlan = null;
  async function renderAcct(msg) {
    const box = $("#acctBox");
    if (!session) { closeM("#acctModal"); return openLogin(openAcct); }
    if (acctView === "buy") return renderBuy(msg);
    box.innerHTML = `<div class="mhead"><h3 id="acctTitle">${t("myAcct")}</h3><button class="x" type="button" data-close="#acctModal" aria-label="${t("close")}">×</button></div><p class="sub">…</p>`;
    const uid = session.user.id;
    const [{ data: orders }, { data: txns }, { data: reqs }] = await Promise.all([
      sb.from("orders").select("id,items,total,pay_method,status,slot,created_at,has_kit").eq("user_id", uid).order("created_at", { ascending: false }).limit(30),
      sb.from("wallet_txns").select("amount,kind,note,created_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(30),
      sb.from("membership_requests").select("plan,amount,credit,status,created_at").eq("user_id", uid).order("created_at", { ascending: false }).limit(10)
    ]);
    await refresh();
    const who = esc(profile?.full_name || session.user.email || session.user.phone || "");
    box.innerHTML = `<div class="mhead"><h3 id="acctTitle">${t("myAcct")}</h3><button class="x" type="button" data-close="#acctModal" aria-label="${t("close")}">×</button></div>
      <p style="margin:0">${t("hello")}, <b>${who}</b></p>
      ${msg ? `<p class="hint">${esc(msg)}</p>` : ""}
      <div class="bal"><small>${t("balance")}</small><b>₹${bal.toLocaleString("en-IN")}</b></div>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:16px">
        <button class="btn btn-gold" type="button" data-plan="saathi">₹5,000 → ₹5,500</button>
        <button class="btn btn-gold" type="button" data-plan="parivar">₹10,000 → ₹11,500</button>
      </div>
      ${reqs && reqs.length ? `<h4>${t("myReq")}</h4><div class="list">${reqs.map(r => `<div class="li"><div class="top"><span>₹${r.amount.toLocaleString("en-IN")} → ₹${r.credit.toLocaleString("en-IN")}</span><span class="badge ${r.status}">${t("st_" + r.status)}</span></div><span class="sub">${dt(r.created_at)}</span></div>`).join("")}</div>` : ""}
      <h4>${t("myOrders")}</h4>
      <div class="list">${orders && orders.length ? orders.map(o => `<div class="li"><div class="top"><span>#${o.id} · ₹${o.total}</span><span class="badge ${o.status}">${t("st_" + o.status)}</span></div>
        <div>${o.items.map(i => `${esc(i.name)} × ${i.qty} kg`).join(", ")}${o.has_kit ? " · 🎁 Recipe kit" : ""}</div>
        <span class="sub">${dt(o.created_at)} · ${esc(o.slot)} · ${o.pay_method === "wallet" ? t("payWallet") : o.pay_method === "cod" ? t("payCod") : "UPI"}</span></div>`).join("") : `<p class="sub">${t("noOrders")}</p>`}</div>
      <h4>${t("walletHist")}</h4>
      <div class="list">${txns && txns.length ? txns.map(x => `<div class="li"><div class="top"><span>${t("k_" + x.kind)}</span><span class="${x.amount > 0 ? "plus" : "minus"}">${x.amount > 0 ? "+" : "−"}₹${Math.abs(x.amount).toLocaleString("en-IN")}</span></div><span class="sub">${esc(x.note || "")} · ${dt(x.created_at)}</span></div>`).join("") : `<p class="sub">${t("noTx")}</p>`}</div>
      <button class="btn btn-ghost" type="button" id="logoutBtn" style="width:100%">${t("logout")}</button>`;
  }
  function renderBuy(err) {
    const p = PLANS[buyPlan];
    const upi = CONFIG.upiId ? `upi://pay?pa=${encodeURIComponent(CONFIG.upiId)}&pn=${encodeURIComponent(CONFIG.upiName)}&am=${p.amt}&cu=INR&tn=${encodeURIComponent("Annadata membership")}` : "";
    $("#acctBox").innerHTML = `<div class="mhead"><h3 id="acctTitle">${t("buyT")}</h3><button class="x" type="button" data-close="#acctModal" aria-label="${t("close")}">×</button></div>
      <button type="button" class="x" style="width:auto;padding:0 14px;border-radius:999px;font-size:15px;margin-bottom:10px" id="buyBack">${t("back").replace(/cart|कार्ट/, t("myAcct"))}</button>
      <p>${t("buyS").replace("{amt}", p.amt.toLocaleString("en-IN")).replace("{credit}", p.credit.toLocaleString("en-IN"))}</p>
      <div class="payinfo">${CONFIG.upiId ? `<b>${t("upiTo")}:</b> ${esc(CONFIG.upiId)}<br><b>₹${p.amt.toLocaleString("en-IN")}</b><br><a class="btn btn-primary" style="margin-top:10px" href="${upi}">${t("payByUpiApp")}</a>`
        : `${t("upiMissing")}<br><a class="btn btn-primary" style="margin-top:10px" target="_blank" rel="noopener" href="${wa("Hello Annadata, I want the " + buyPlan + " membership (₹" + p.amt + "). Please share payment details.")}">WhatsApp</a>`}</div>
      <div class="f"><label for="utr">${t("utrL")}</label><input id="utr" maxlength="40" autocomplete="off"></div>
      <button class="btn btn-gold" type="button" id="submitReq" style="width:100%">${t("submitReq")}</button>
      <p class="err" role="alert">${err ? esc(err) : ""}</p>`;
  }
  async function submitReq() {
    const ref = $("#utr").value.trim();
    const { error } = await sb.rpc("request_membership", { p_plan: buyPlan, p_upi_ref: ref });
    if (error) return renderBuy(errMsg(error));
    acctView = "home"; renderAcct(t("reqOk"));
  }
  function openAcct() { if (!session) return openLogin(openAcct); acctView = "home"; openM("#acctModal"); renderAcct(); }
  function startBuy(plan) {
    buyPlan = plan;
    if (!session) return openLogin(() => startBuy(plan));
    acctView = "buy"; openM("#acctModal"); renderBuy();
  }

  /* ---------- checkout (replaces the WhatsApp-only version) ---------- */
  const baseRenderCart = renderCart;
  window.renderCart = renderCart = function () {
    if (view === "done" && lastOrder) return renderDone();
    if (view !== "checkout" || !Object.keys(cart).length) return baseRenderCart();
    const body = $("#dBody"), foot = $("#dFoot");
    if (!session) {
      body.innerHTML = `<button type="button" class="x" style="width:auto;padding:0 14px;border-radius:999px;font-size:15px;margin-bottom:12px" id="backCart">${t("back")}</button><p>${t("loginSub")}</p>`;
      foot.innerHTML = `<button class="btn btn-primary" type="button" id="loginToOrder">${t("loginToOrder")}</button>`;
      return;
    }
    const pr = profile || {};
    baseRenderCart();
    ["cName", "cPhone", "cAddr", "cLand"].forEach((id, i) => { const v = [pr.full_name, pr.phone && pr.phone.replace(/^\+?91/, ""), pr.address, pr.landmark][i]; if (v && $("#" + id)) $("#" + id).value = v; });
    const opts = document.querySelector('input[name=pay]').closest(".opts");
    const { total } = totals();
    opts.innerHTML = `<label class="opt ${bal < total ? "dis" : ""}"><input type="radio" name="pay" value="wallet" ${bal >= total && bal > 0 ? "checked" : "disabled"}><span><b>${t("payWallet")}</b>${t("balIs")}: ₹${bal.toLocaleString("en-IN")}${bal < total ? " · " + t("lowBal") : ""}</span></label>
      <label class="opt"><input type="radio" name="pay" value="cod" ${bal >= total && bal > 0 ? "" : "checked"}><span><b>${t("payCod")}</b>${t("payCodS")}</span></label>
      <label class="opt"><input type="radio" name="pay" value="online"><span><b>${t("payOnline")}</b>${t("payOnlineS")}</span></label>`;
    foot.innerHTML = `<div id="sumBox"></div><p class="err" id="coErr" role="alert"></p><button class="btn btn-gold" type="button" id="placeOrder">${t("placeOrder")}</button>`;
    updateSum();
  };
  window.placeOrder = placeOrder = async function () {
    const name = $("#cName").value.trim(), phone = $("#cPhone").value.replace(/\D/g, ""), addr = $("#cAddr").value.trim();
    $("#eName").textContent = name ? "" : t("errName");
    $("#ePhone").textContent = /^[6-9]\d{9}$/.test(phone) ? "" : t("errPhone");
    $("#eAddr").textContent = addr ? "" : t("errAddr");
    if (!name || !/^[6-9]\d{9}$/.test(phone) || !addr) return;
    const btn = $("#placeOrder"); btn.disabled = true; btn.textContent = t("placing");
    const pay = document.querySelector("input[name=pay]:checked").value;
    const { data, error } = await sb.rpc("place_order", {
      p_items: Object.entries(cart).map(([id, qty]) => ({ id, qty })),
      p_zone: document.querySelector("input[name=zone]:checked").value,
      p_slot: document.querySelector("input[name=slot]:checked").value,
      p_pay: pay, p_name: name, p_phone: phone, p_address: addr, p_landmark: $("#cLand").value.trim()
    });
    if (error) { btn.disabled = false; btn.textContent = t("placeOrder"); $("#coErr").textContent = errMsg(error); return; }
    lastOrder = { ...data, pay, name, phone, addr, slot: document.querySelector("input[name=slot]:checked").value };
    cart = {}; save(); renderProducts(); await refresh();
    view = "done"; renderCart();
  };
  function renderDone() {
    const o = lastOrder;
    $("#cartCount").textContent = 0;
    const msg = `🥬 *Order #${o.id} – Annadata Fresh Mart*\n\n${o.items.map(i => `• ${i.name} – ${i.qty} kg × ₹${i.price}`).join("\n")}${o.kit ? "\n• 🎁 FREE Zucchini Recipe Kit" : ""}\n\nDelivery: ${o.fee ? "₹" + o.fee : "FREE"}\n*Total: ₹${o.total}*\nPayment: ${o.pay === "wallet" ? "Membership balance" : o.pay === "cod" ? "Pay on delivery" : "UPI"}\n\nName: ${o.name}\nWhatsApp: ${o.phone}\nAddress: ${o.addr}\nSlot: ${o.slot}`;
    const upi = o.pay === "online" && CONFIG.upiId ? `upi://pay?pa=${encodeURIComponent(CONFIG.upiId)}&pn=${encodeURIComponent(CONFIG.upiName)}&am=${o.total}&cu=INR&tn=${encodeURIComponent("Annadata order " + o.id)}` : "";
    $("#dBody").innerHTML = `<div class="empty" style="padding:24px 4px"><div style="font-size:46px">✅</div><h3 style="color:var(--deep);margin:8px 0">${t("orderOk").replace("{id}", o.id)}</h3><p>${t("orderOkS").replace("{total}", o.total)}</p>${o.pay === "wallet" ? `<p><b>${t("newBal")}: ₹${(o.balance || 0).toLocaleString("en-IN")}</b></p>` : ""}</div>`;
    $("#dFoot").innerHTML = `${upi ? `<a class="btn btn-primary" href="${upi}">${t("payUpiNow").replace("{total}", o.total)}</a>` : ""}<a class="btn btn-gold" target="_blank" rel="noopener" href="${wa(msg)}">${t("sendWaToo")}</a>`;
    toast(t("placed"));
  }

  /* ---------- events ---------- */
  document.addEventListener("click", e => {
    const c = e.target.closest("[data-close]"); if (c) closeM(c.dataset.close);
    if (e.target.classList.contains("modal")) e.target.classList.remove("open");
    if (e.target.closest("#openAcct")) openAcct();
    const pl = e.target.closest("[data-plan]"); if (pl) startBuy(pl.dataset.plan);
    const at = e.target.closest("[data-atab]"); if (at) { authTab = at.dataset.atab; authStage = "start"; authId = ""; renderAuth(); }
    if (e.target.closest("#gLogin")) sb.auth.signInWithOAuth({ provider: "google", options: { redirectTo: location.origin + location.pathname } }).then(({ error }) => error && renderAuth(errMsg(error)));
    if (e.target.closest("#aSend")) sendCode();
    if (e.target.closest("#aVerify")) verifyCode();
    if (e.target.closest("#aChange")) { e.preventDefault(); authStage = "start"; renderAuth(); }
    if (e.target.closest("#logoutBtn")) sb.auth.signOut().then(() => { closeM("#acctModal"); toast(t("logout")); });
    if (e.target.closest("#buyBack")) { acctView = "home"; renderAcct(); }
    if (e.target.closest("#submitReq")) submitReq();
    if (e.target.closest("#loginToOrder")) openLogin(() => { openCart(); view = "checkout"; renderCart(); });
    if (e.target.closest("#closeCart") || e.target === $("#overlay")) { if (view === "done") { view = "cart"; lastOrder = null; } }
  });
  document.addEventListener("keydown", e => { if (e.key === "Escape") { closeM("#authModal"); closeM("#acctModal"); } });
  document.addEventListener("click", e => { if (e.target.closest(".lang button")) { if ($("#authModal").classList.contains("open")) renderAuth(); if ($("#acctModal").classList.contains("open")) renderAcct(); } });

  if (!sb) return;
  sb.auth.onAuthStateChange(async (ev, s) => {
    session = s; await refresh();
    if (ev === "SIGNED_IN") { closeM("#authModal"); toast(t("loggedIn")); const cb = afterLogin; afterLogin = null; if (cb) cb(); if ($("#drawer").classList.contains("open")) renderCart(); }
    if (ev === "SIGNED_OUT" && view === "checkout") renderCart();
  });
  sb.auth.getSession().then(async ({ data }) => { session = data.session; await refresh(); });
  applyLang(); loadPrices();
})();
