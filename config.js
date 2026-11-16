/* =====================================================================
   ANNADATA FRESH MART — SETTINGS (yahan badlo / edit here)
   ===================================================================== */
window.CONFIG = {
  whatsapp: "919636032956",            // orders & help WhatsApp number
  upiId: "",                           // farmer ji ka UPI ID, e.g. "name@okaxis" — khali = UPI option band
  upiName: "Annadata Fresh Mart",
  minOrder: 299,
  freeDeliveryAbove: 499,
  deliveryCharge: 30,
  eveningCutoffHour: 16,               // 4 PM tak order = aaj shaam 6–8 PM
  mapLink: "https://www.google.com/maps/search/?api=1&query=Piprali%2C+Sikar%2C+Rajasthan",
  instagram: "https://www.instagram.com/",  // apna Instagram link daalo
  facebook: "",
  supabaseUrl: "https://kyquhiktnjoeucafrjly.supabase.co",
  supabaseKey: "sb_publishable_yjrho_YDkRrAyENklcn_bw_DlH2RDB_"
};

/* Fallback product list — live rates come from the database (admin panel).
   Used only if the database can't be reached. */
window.PRODUCTS = [
  {id:"zy",category:"exotic",farm:true,kit:true,image:"zucchini-yellow.jpg",name_en:"Yellow Zucchini",name_hi:"पीली ज़ुकिनी",options:[{k:"250g",en:"250 g",hi:"250 ग्राम",price:65,mrp:75},{k:"500g",en:"500 g",hi:"500 ग्राम",price:125,mrp:150,def:true},{k:"1kg",en:"1 kg",hi:"1 किलो",price:250,mrp:300}]},
  {id:"zg",category:"exotic",farm:true,kit:true,image:"zucchini-green.jpg",name_en:"Green Zucchini",name_hi:"हरी ज़ुकिनी",options:[{k:"250g",en:"250 g",hi:"250 ग्राम",price:50,mrp:63},{k:"500g",en:"500 g",hi:"500 ग्राम",price:100,mrp:125,def:true},{k:"1kg",en:"1 kg",hi:"1 किलो",price:200,mrp:250}]},
  {id:"cn",category:"cucumber",farm:true,image:"cucumber-net.jpg",name_en:"Green Cucumber (Net house)",name_hi:"हरा खीरा (नेट हाउस)",options:[{k:"500g",en:"500 g",hi:"500 ग्राम",price:30,mrp:50},{k:"1kg",en:"1 kg",hi:"1 किलो",price:60,mrp:100,def:true},{k:"2kg",en:"2 kg",hi:"2 किलो",price:120,mrp:200}]},
  {id:"co",category:"cucumber",farm:true,image:"cucumber-open.jpg",name_en:"Cucumber (Open field)",name_hi:"खीरा (खुला खेत)",options:[{k:"500g",en:"500 g",hi:"500 ग्राम",price:30,mrp:50},{k:"1kg",en:"1 kg",hi:"1 किलो",price:60,mrp:100,def:true},{k:"2kg",en:"2 kg",hi:"2 किलो",price:120,mrp:200}]},
  {id:"cg",category:"cucumber",farm:false,image:"cucumber-green.jpg",name_en:"Green Cucumber",name_hi:"हरा खीरा",options:[{k:"500g",en:"500 g",hi:"500 ग्राम",price:23,mrp:25},{k:"1kg",en:"1 kg",hi:"1 किलो",price:45,mrp:50,def:true},{k:"2kg",en:"2 kg",hi:"2 किलो",price:90,mrp:100}]},
  {id:"ck",category:"gourd",farm:true,image:"chappan-kaddu.jpg",name_en:"Chappan Kaddu",name_hi:"छप्पन कद्दू",options:[{k:"500g",en:"500 g",hi:"500 ग्राम",price:30,mrp:50},{k:"1kg",en:"1 kg",hi:"1 किलो",price:60,mrp:100,def:true},{k:"2kg",en:"2 kg",hi:"2 किलो",price:120,mrp:200}]},
  {id:"cl",category:"bulk",farm:true,image:"chappan-lot.jpg",name_en:"Chappan Kaddu (Bulk lot)",name_hi:"छप्पन कद्दू (थोक)",options:[{k:"5kg",en:"5 kg",hi:"5 किलो",price:175,mrp:250,def:true},{k:"10kg",en:"10 kg",hi:"10 किलो",price:350,mrp:500}]},
  {id:"ch",category:"chilli",farm:false,image:"chilli.jpg",name_en:"Green Chilli",name_hi:"हरी मिर्च",options:[{k:"100g",en:"100 g",hi:"100 ग्राम",price:8,mrp:10},{k:"250g",en:"250 g",hi:"250 ग्राम",price:20,mrp:25,def:true},{k:"500g",en:"500 g",hi:"500 ग्राम",price:40,mrp:50}]},
  {id:"pw",category:"gourd",farm:false,image:"parwal.jpg",name_en:"Parwal (Natural)",name_hi:"परवल (प्राकृतिक)",options:[{k:"250g",en:"250 g",hi:"250 ग्राम",price:15,mrp:25},{k:"500g",en:"500 g",hi:"500 ग्राम",price:30,mrp:50,def:true},{k:"1kg",en:"1 kg",hi:"1 किलो",price:60,mrp:100}]}
];

window.CATS = [
  {id:"all", img:"veg/kheera.jpg", en:"All vegetables", hi:"सभी सब्ज़ियाँ"},
  {id:"farm", img:"zucchini-yellow.jpg", en:"From our farm", hi:"अपने खेत से"},
  {id:"exotic", img:"zucchini-green.jpg", en:"Zucchini", hi:"ज़ुकिनी"},
  {id:"cucumber", img:"cucumber-net.jpg", en:"Cucumber", hi:"खीरा"},
  {id:"gourd", img:"chappan-kaddu.jpg", en:"Gourds", hi:"कद्दू-परवल"},
  {id:"chilli", img:"chilli.jpg", en:"Chilli & herbs", hi:"मिर्च"},
  {id:"bulk", img:"chappan-lot.jpg", en:"Bulk lots", hi:"थोक"}
];

window.TIMELINE = [
  {y:"1991", en:["Engineering at ITI","Sitaram Khichar studied engineering at ITI from 1991 to 1993."], hi:["ITI से इंजीनियरिंग","सीताराम खीचड़ ने 1991 से 1993 तक ITI से इंजीनियरिंग की।"]},
  {y:"1993+", en:["Machines and design","He worked with companies on machine maintenance and designed industrial machines."], hi:["मशीन और डिज़ाइन","उन्होंने कंपनियों के साथ मशीनों की देखरेख की और औद्योगिक मशीनें डिज़ाइन कीं।"]},
  {y:{en:"Business",hi:"व्यवसाय"}, en:["His own transformer factory","With that experience he started manufacturing electrical transformers himself."], hi:["अपनी ट्रांसफॉर्मर फैक्ट्री","इसी अनुभव से उन्होंने खुद बिजली के ट्रांसफॉर्मर बनाना शुरू किया।"]},
  {y:"2010", en:["Health comes first","He decided that what we eat matters most, and started chemical-free farming on his own land."], hi:["सेहत सबसे पहले","उन्होंने तय किया कि जो हम खाते हैं वही सबसे ज़रूरी है, और अपनी ज़मीन पर केमिकल-फ्री खेती शुरू की।"]},
  {y:{en:"Research",hi:"शोध"}, en:["His own liquid khaad","Working with agricultural scientists, he experimented for years and developed his own natural liquid khaad."], hi:["अपनी लिक्विड खाद","कृषि वैज्ञानिकों के साथ सालों प्रयोग करके उन्होंने अपनी प्राकृतिक लिक्विड खाद बनाई।"]},
  {y:{en:"Today",hi:"आज"}, en:["30 bigha and growing","Our own 30 bigha plus leased land, with a polyhouse and open fields near Piprali, Sikar."], hi:["30 बीघा और बढ़ते कदम","अपनी 30 बीघा ज़मीन और लीज़ की ज़मीन, पिपराली, सीकर के पास पॉलीहाउस और खुले खेत।"]},
  {y:"2026", en:["Annadata Fresh Mart","Farm-fresh vegetables, delivered straight to homes across Sikar."], hi:["अन्नदाता Fresh Mart","खेत की ताज़ी सब्ज़ी, सीधे सीकर के घरों तक।"]}
];

window.FAQ = [
  {en:["Which areas of Sikar do you deliver to?","All of Sikar city. Delivery is free on orders of ₹499 or more, otherwise ₹30. If you live within 2 km of our outlet, we waive the fee when we confirm your order."],
   hi:["सीकर में कहाँ-कहाँ डिलीवरी है?","पूरे सीकर शहर में। ₹499 या उससे ज़्यादा के ऑर्डर पर डिलीवरी फ्री, वरना ₹30। हमारे आउटलेट से 2 किमी के अंदर हैं तो ऑर्डर कन्फर्म करते समय चार्ज माफ़ कर देते हैं।"]},
  {en:["When will my order arrive?","Order by 4 PM for the same evening (6–8 PM). Orders after 4 PM go in the next morning slot (6–8 AM). You choose the slot at checkout."],
   hi:["ऑर्डर कब आएगा?","शाम 4 बजे तक ऑर्डर करें तो उसी शाम 6–8 बजे। 4 बजे के बाद का ऑर्डर अगली सुबह 6–8 बजे। स्लॉट आप चेकआउट पर चुनते हैं।"]},
  {en:["Are the vegetables really chemical-free?","Vegetables from our own farm are grown without chemical sprays, using Sitaram ji's own liquid organic khaad. Items we source from local farmers are marked separately, without the 'Our farm' badge."],
   hi:["क्या सब्ज़ियाँ सच में केमिकल-फ्री हैं?","अपने खेत की सब्ज़ियाँ बिना केमिकल स्प्रे के, सीताराम जी की अपनी लिक्विड जैविक खाद से उगती हैं। स्थानीय किसानों से ली गई सब्ज़ियों पर 'अपना खेत' का बैज नहीं होता।"]},
  {en:["How can I pay?","Pay on delivery (cash or UPI to the delivery person), or from your Annadata Wallet balance. Online UPI payment on the website is coming very soon."],
   hi:["पेमेंट कैसे करें?","डिलीवरी पर (कैश या डिलीवरी वाले को UPI), या अपने अन्नदाता वॉलेट बैलेंस से। वेबसाइट पर ऑनलाइन UPI पेमेंट जल्द शुरू होगा।"]},
  {en:["Can I visit the farm?","Yes. Message us on WhatsApp and we will plan a morning visit to the farm near Piprali."],
   hi:["क्या मैं खेत देखने आ सकता हूँ?","हाँ। WhatsApp पर मैसेज करें, हम पिपराली के पास खेत पर सुबह की विज़िट तय कर देंगे।"]}
];

window.T = {
 en:{
  topFree:"Free delivery on ₹499+", topMin:"Minimum order ₹299", topSlots:"Slots 6–8 AM & 6–8 PM", city:"Delivering across Sikar",
  searchLabel:"Search vegetables", searchPh:'Search "zucchini"', install:"Install app",
  heroTitle:"Picked at sunrise in Piprali. <em>On your table by evening.</em>",
  heroLead:"Chemical-free vegetables from Sitaram Khichar's farm, grown with his own organic khaad since 2010 and delivered across Sikar.",
  heroShop:"Shop today's harvest", heroFarmer:"Meet the farmer",
  f1b:"Since 2010", f1:"chemical-free farming", f2b:"30 bigha", f2:"own farm, Piprali", f3b:"500+", f3:"Sikar families",
  farmPin:"Piprali farm, Sikar", harvestSmall:"Harvested this morning",
  b1b:"Two slots daily", b1:"6–8 AM and 6–8 PM", b2b:"Free delivery", b2:"On orders of ₹499+", b3b:"No chemical sprays", b3:"Homemade liquid khaad", b4b:"Pay your way", b4:"On delivery or Annadata Wallet",
  shopTitle:"Today's harvest", shopSub:"Rates are updated every morning.",
  sortRel:"Sort: Relevance", sortLow:"Price: low to high", sortHigh:"Price: high to low", sortOff:"Biggest discount",
  noteFarm:"<b>Harvested this morning</b> at Piprali farm. Order by 4 PM for today's 6–8 PM slot.",
  ourFarm:"Our farm", off:"OFF", add:"ADD", options:"options", soldOut:"Sold out", noResults:"No vegetables match your search.", items:"items", item:"item",
  slotToday:"Today 6–8 PM", slotMorning:"Tomorrow 6–8 AM", slotTomEve:"Tomorrow 6–8 PM",
  nextToday:"Delivery today, 6–8 PM", nextTomorrow:"Delivery tomorrow, 6–8 AM",
  chooseQty:"Choose quantity", kitNote:"Free zucchini recipe kit with every zucchini order", bestValue:"Best value",
  memTitle:"Annadata Wallet: pay once, get extra every month", memText:"Top up once and we add bonus credit. Every order is paid from your balance in one tap.",
  p1s:"Saathi · pay ₹5,000", p2s:"Parivar · pay ₹10,000", memBtn:"Start membership",
  gTitle:"New to zucchini?", gText:"Quick Indian recipes, from zucchini sabzi to cheela, and why our yellow zucchini is naturally that colour.", gLink:"Read the zucchini guide",
  faqTitle:"Questions from Sikar families", faqSub:"Anything else? Message us on WhatsApp.",
  pStamp:"Founder's story", pTitle:"An engineer who went back to the soil", pText:"From ITI engineering and his own transformer factory to 30 bigha of chemical-free fields. Tap to read how Sitaram Khichar built Annadata.", pY2:"Factory", pY4:"Khaad", pTap:"Read the full story",
  footTag:"Farm-fresh, chemical-free vegetables for Sikar.", fShop:"Shop", fHarvest:"Today's harvest", fMember:"Membership", fHelp:"Help", fOrders:"My orders", fRefund:"Refund policy", fTerms:"Terms", fPrivacy:"Privacy", fFollow:"Follow us", fCopy:"Grown near Piprali, Sikar.",
  viewCart:"View cart", cart:"My cart", checkout:"Checkout", emptyCart:"Your cart is empty", emptyCartSub:"Add some fresh vegetables from today's harvest.", startShopping:"Start shopping",
  billDetails:"Bill details", itemsTotal:"Items total", deliveryFee:"Delivery fee", free:"FREE", grandTotal:"Grand total", youSave:"You save",
  minWarn:"Add ₹{n} more to place the order (minimum ₹299).", freeHint:"Add ₹{n} more for FREE delivery.", freeOk:"You get FREE delivery.",
  kitLine:"Zucchini Recipe Kit (e-book + videos)", proceed:"Proceed to checkout", loginToOrder:"Log in to place order", orWhatsApp:"Order on WhatsApp instead",
  deliverTo:"Delivery details", name:"Full name", phone:"Mobile number (WhatsApp)", address:"House no., street, area", landmark:"Landmark (optional)", slot:"Delivery slot", pay:"Payment",
  payCod:"Pay on delivery", payCodS:"Cash or UPI to the delivery person", payWallet:"Annadata Wallet", payWalletS:"Balance: ₹{n}", payWalletLow:"Balance ₹{n}, not enough for this order", payUpi:"Pay now with UPI", payUpiS:"PhonePe, GPay, Paytm or any UPI app",
  placeOrder:"Place order · ₹{n}", placing:"Placing order…",
  errName:"Please enter your name.", errPhone:"Enter a valid 10-digit mobile number.", errAddr:"Please enter your address.",
  orderPlaced:"Order placed!", orderNo:"Order #{n}", orderPlacedSub:"We will deliver in the {slot} slot. You'll get a confirmation on WhatsApp.",
  upiPayTitle:"Complete your UPI payment", upiPayBtn:"Pay ₹{n} with UPI", upiRef:"UPI transaction ID (12 digits)", upiRefBtn:"Submit payment ID", upiRefOk:"Thanks! We'll confirm your payment shortly.",
  sendWa:"Send order on WhatsApp", continueShop:"Continue shopping", viewOrders:"View my orders",
  loginTitle:"Log in to Annadata", loginSub:"Track orders, use your wallet and check out faster.", google:"Continue with Google", orEmail:"or use your email", email:"Email address", sendCode:"Send code",
  codeTitle:"Enter the code", codeSub:"We sent a code to {e}. It may take a minute; also check Spam.", code:"Code from email", verify:"Verify & log in", resend:"Resend code", resendIn:"Resend in {n}s", changeEmail:"Change email",
  errEmail:"Enter a valid email address.", errCode:"That code didn't work. Check it, or tap Resend code.", errRate:"Too many attempts. Please wait a minute and try again.", errNet:"No internet connection. Please try again.", errGeneric:"Something went wrong. Please try again.", errEmailSend:"We couldn't send the code right now. Please try Google login or order on WhatsApp.",
  welcome:"Welcome, {n}!", loggedOut:"You are logged out.",
  myAccount:"My account", tabOrders:"Orders", tabWallet:"Wallet", tabProfile:"Profile", logout:"Log out", balance:"Wallet balance", noOrders:"No orders yet.", noTx:"No wallet activity yet.",
  save:"Save", saved:"Saved", loadingAcc:"Loading your account…", loadErr:"Couldn't load your account. Pull down or tap to retry.", retry:"Retry",
  st_awaiting_payment:"Awaiting payment", st_placed:"Placed", st_confirmed:"Confirmed", st_out_for_delivery:"Out for delivery", st_delivered:"Delivered", st_cancelled:"Cancelled",
  memBuyTitle:"Start membership", memPlanS:"Saathi: pay ₹5,000, get ₹5,500", memPlanP:"Parivar: pay ₹10,000, get ₹11,500 + recipe kit", memPayNote:"Pay the amount by UPI, then enter the UPI transaction ID. We add the balance after checking.", memSoon:"Online UPI payment for membership is starting soon. Message us on WhatsApp to join today.", memSent:"Request sent! Balance will be added after we confirm the payment.", memAsk:"Ask on WhatsApp", memTerms:"Membership terms",
  sTitle:"An engineer who went back to the soil", sLead:"The story of Sitaram Khichar and the farm behind Annadata.", sIntro:"Annadata did not start as a business plan. It started with a simple question Sitaram ji asked himself: what are we really feeding our families?", sShop:"Shop from his farm", sMap:"See the farm on Google Maps",
  added:"Added to cart", removed:"Removed", installed:"App installed"
 },
 hi:{
  topFree:"₹499+ पर फ्री डिलीवरी", topMin:"न्यूनतम ऑर्डर ₹299", topSlots:"स्लॉट सुबह 6–8 और शाम 6–8", city:"पूरे सीकर में डिलीवरी",
  searchLabel:"सब्ज़ी खोजें", searchPh:'"ज़ुकिनी" खोजें', install:"ऐप इंस्टॉल करें",
  heroTitle:"सुबह पिपराली के खेत से तोड़ी। <em>शाम तक आपकी थाली में।</em>",
  heroLead:"सीताराम खीचड़ के खेत की केमिकल-फ्री सब्ज़ियाँ, 2010 से उनकी अपनी जैविक खाद से उगाई हुई, पूरे सीकर में डिलीवरी।",
  heroShop:"आज की ताज़ी सब्ज़ी देखें", heroFarmer:"किसान से मिलें",
  f1b:"2010 से", f1:"केमिकल-फ्री खेती", f2b:"30 बीघा", f2:"अपना खेत, पिपराली", f3b:"500+", f3:"सीकर परिवार",
  farmPin:"पिपराली खेत, सीकर", harvestSmall:"आज सुबह तोड़ी गई",
  b1b:"रोज़ दो स्लॉट", b1:"सुबह 6–8 और शाम 6–8", b2b:"फ्री डिलीवरी", b2:"₹499+ के ऑर्डर पर", b3b:"कोई केमिकल स्प्रे नहीं", b3:"घर की बनी लिक्विड खाद", b4b:"आसान पेमेंट", b4:"डिलीवरी पर या अन्नदाता वॉलेट",
  shopTitle:"आज की ताज़ी सब्ज़ी", shopSub:"भाव रोज़ सुबह अपडेट होते हैं।",
  sortRel:"क्रम: सामान्य", sortLow:"दाम: कम से ज़्यादा", sortHigh:"दाम: ज़्यादा से कम", sortOff:"सबसे ज़्यादा छूट",
  noteFarm:"<b>आज सुबह तोड़ी गई</b> पिपराली खेत से। शाम 4 बजे तक ऑर्डर करें, आज शाम 6–8 बजे डिलीवरी।",
  ourFarm:"अपना खेत", off:"छूट", add:"जोड़ें", options:"विकल्प", soldOut:"खत्म", noResults:"आपकी खोज से कोई सब्ज़ी नहीं मिली।", items:"आइटम", item:"आइटम",
  slotToday:"आज शाम 6–8", slotMorning:"कल सुबह 6–8", slotTomEve:"कल शाम 6–8",
  nextToday:"आज शाम 6–8 डिलीवरी", nextTomorrow:"कल सुबह 6–8 डिलीवरी",
  chooseQty:"मात्रा चुनें", kitNote:"हर ज़ुकिनी ऑर्डर पर रेसिपी किट फ्री", bestValue:"सबसे किफ़ायती",
  memTitle:"अन्नदाता वॉलेट: एक बार भरें, हर बार ज़्यादा पाएँ", memText:"एक बार टॉप-अप करें, हम बोनस बैलेंस जोड़ते हैं। हर ऑर्डर एक टैप में बैलेंस से।",
  p1s:"साथी · ₹5,000 दें", p2s:"परिवार · ₹10,000 दें", memBtn:"मेंबरशिप शुरू करें",
  gTitle:"ज़ुकिनी पहली बार?", gText:"ज़ुकिनी की सब्ज़ी से चीला तक आसान रेसिपी, और हमारी पीली ज़ुकिनी असली में पीली क्यों है।", gLink:"ज़ुकिनी गाइड पढ़ें",
  faqTitle:"सीकर परिवारों के सवाल", faqSub:"और कुछ पूछना है? WhatsApp पर मैसेज करें।",
  pStamp:"संस्थापक की कहानी", pTitle:"एक इंजीनियर जो मिट्टी से जुड़ा", pText:"ITI इंजीनियरिंग और अपनी ट्रांसफॉर्मर फैक्ट्री से 30 बीघा केमिकल-फ्री खेती तक। टैप करें और पढ़ें सीताराम खीचड़ ने अन्नदाता कैसे बनाया।", pY2:"फैक्ट्री", pY4:"खाद", pTap:"पूरी कहानी पढ़ें",
  footTag:"सीकर के लिए खेत की ताज़ी, केमिकल-फ्री सब्ज़ी।", fShop:"खरीदें", fHarvest:"आज की सब्ज़ी", fMember:"मेंबरशिप", fHelp:"मदद", fOrders:"मेरे ऑर्डर", fRefund:"रिफंड नीति", fTerms:"शर्तें", fPrivacy:"प्राइवेसी", fFollow:"फॉलो करें", fCopy:"पिपराली, सीकर में उगाई गई।",
  viewCart:"कार्ट देखें", cart:"मेरा कार्ट", checkout:"चेकआउट", emptyCart:"आपका कार्ट खाली है", emptyCartSub:"आज की ताज़ी सब्ज़ी जोड़ें।", startShopping:"खरीदारी शुरू करें",
  billDetails:"बिल", itemsTotal:"सामान का कुल", deliveryFee:"डिलीवरी चार्ज", free:"फ्री", grandTotal:"कुल रकम", youSave:"आपकी बचत",
  minWarn:"ऑर्डर के लिए ₹{n} और जोड़ें (न्यूनतम ₹299)।", freeHint:"फ्री डिलीवरी के लिए ₹{n} और जोड़ें।", freeOk:"आपको फ्री डिलीवरी मिल रही है।",
  kitLine:"ज़ुकिनी रेसिपी किट (ई-बुक + वीडियो)", proceed:"चेकआउट करें", loginToOrder:"ऑर्डर के लिए लॉग इन करें", orWhatsApp:"या WhatsApp पर ऑर्डर करें",
  deliverTo:"डिलीवरी की जानकारी", name:"पूरा नाम", phone:"मोबाइल नंबर (WhatsApp)", address:"मकान नं., गली, मोहल्ला", landmark:"पास की पहचान (वैकल्पिक)", slot:"डिलीवरी स्लॉट", pay:"पेमेंट",
  payCod:"डिलीवरी पर पेमेंट", payCodS:"डिलीवरी वाले को कैश या UPI", payWallet:"अन्नदाता वॉलेट", payWalletS:"बैलेंस: ₹{n}", payWalletLow:"बैलेंस ₹{n}, इस ऑर्डर के लिए कम है", payUpi:"अभी UPI से पेमेंट", payUpiS:"PhonePe, GPay, Paytm या कोई भी UPI ऐप",
  placeOrder:"ऑर्डर करें · ₹{n}", placing:"ऑर्डर हो रहा है…",
  errName:"कृपया अपना नाम लिखें।", errPhone:"सही 10 अंकों का मोबाइल नंबर लिखें।", errAddr:"कृपया अपना पता लिखें।",
  orderPlaced:"ऑर्डर हो गया!", orderNo:"ऑर्डर #{n}", orderPlacedSub:"{slot} स्लॉट में डिलीवरी होगी। WhatsApp पर कन्फर्मेशन मिलेगा।",
  upiPayTitle:"UPI पेमेंट पूरा करें", upiPayBtn:"₹{n} UPI से दें", upiRef:"UPI ट्रांज़ैक्शन ID (12 अंक)", upiRefBtn:"पेमेंट ID भेजें", upiRefOk:"धन्यवाद! हम जल्द पेमेंट कन्फर्म करेंगे।",
  sendWa:"WhatsApp पर ऑर्डर भेजें", continueShop:"और खरीदें", viewOrders:"मेरे ऑर्डर देखें",
  loginTitle:"अन्नदाता में लॉग इन", loginSub:"ऑर्डर ट्रैक करें, वॉलेट इस्तेमाल करें और जल्दी चेकआउट करें।", google:"Google से जारी रखें", orEmail:"या ईमेल से", email:"ईमेल पता", sendCode:"कोड भेजें",
  codeTitle:"कोड डालें", codeSub:"{e} पर कोड भेजा है। एक मिनट लग सकता है, Spam भी देखें।", code:"ईमेल वाला कोड", verify:"वेरिफ़ाई करें", resend:"कोड दोबारा भेजें", resendIn:"{n} सेकंड में दोबारा भेजें", changeEmail:"ईमेल बदलें",
  errEmail:"सही ईमेल पता लिखें।", errCode:"यह कोड सही नहीं है। जाँचें, या कोड दोबारा भेजें।", errRate:"बहुत कोशिशें हो गईं। एक मिनट रुककर फिर कोशिश करें।", errNet:"इंटरनेट नहीं है। फिर कोशिश करें।", errGeneric:"कुछ गड़बड़ हुई। फिर कोशिश करें।", errEmailSend:"अभी कोड नहीं भेज पाए। Google से लॉग इन करें या WhatsApp पर ऑर्डर करें।",
  welcome:"स्वागत है, {n}!", loggedOut:"आप लॉग आउट हो गए।",
  myAccount:"मेरा अकाउंट", tabOrders:"ऑर्डर", tabWallet:"वॉलेट", tabProfile:"प्रोफ़ाइल", logout:"लॉग आउट", balance:"वॉलेट बैलेंस", noOrders:"अभी कोई ऑर्डर नहीं।", noTx:"वॉलेट में अभी कोई लेन-देन नहीं।",
  save:"सेव करें", saved:"सेव हो गया", loadingAcc:"अकाउंट लोड हो रहा है…", loadErr:"अकाउंट लोड नहीं हुआ। दोबारा कोशिश करें।", retry:"दोबारा कोशिश",
  st_awaiting_payment:"पेमेंट बाकी", st_placed:"ऑर्डर मिला", st_confirmed:"कन्फर्म", st_out_for_delivery:"रास्ते में", st_delivered:"डिलीवर", st_cancelled:"रद्द",
  memBuyTitle:"मेंबरशिप शुरू करें", memPlanS:"साथी: ₹5,000 दें, ₹5,500 पाएँ", memPlanP:"परिवार: ₹10,000 दें, ₹11,500 + रेसिपी किट पाएँ", memPayNote:"UPI से रकम भेजें, फिर UPI ट्रांज़ैक्शन ID डालें। जाँच के बाद बैलेंस जुड़ जाएगा।", memSoon:"मेंबरशिप के लिए ऑनलाइन UPI जल्द शुरू होगा। आज जुड़ने के लिए WhatsApp करें।", memSent:"रिक्वेस्ट भेज दी! पेमेंट कन्फर्म होते ही बैलेंस जुड़ जाएगा।", memAsk:"WhatsApp पर पूछें", memTerms:"मेंबरशिप की शर्तें",
  sTitle:"एक इंजीनियर जो मिट्टी से जुड़ा", sLead:"सीताराम खीचड़ और अन्नदाता के खेत की कहानी।", sIntro:"अन्नदाता किसी बिज़नेस प्लान से शुरू नहीं हुआ। यह एक सवाल से शुरू हुआ जो सीताराम जी ने खुद से पूछा: हम अपने परिवार को असल में क्या खिला रहे हैं?", sShop:"उनके खेत से खरीदें", sMap:"Google Maps पर खेत देखें",
  added:"कार्ट में जुड़ गया", removed:"हटा दिया", installed:"ऐप इंस्टॉल हो गया"
 }
};
