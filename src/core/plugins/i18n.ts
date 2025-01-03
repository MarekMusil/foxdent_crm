import { createI18n } from "vue-i18n";

const messages = {
  // values from Metronic template
  cs: {
    password: "Heslo",
    dashboard: "Dashboard",
    layoutBuilder: "Tvůrce rozložení",
    craft: "Vytvořeno",
    pages: "Stránky",
    page: "Stránka",
    profile: "Profil",
    profileOverview: "Přehled",
    projects: "Projekty",
    campaigns: "Kampaně",
    documents: "Dokumenty",
    connections: "Spojení",
    wizards: "Průvodci",
    horizontal: "Horizontální",
    vertical: "Vertikální",
    account: "Účet",
    accountOverview: "Přehled účtu",
    settings: "Nastavení",
    authentication: "Ověření",
    basicFlow: "Základní postup",
    signIn: "Přihlášení",
    signUp: "Registrace",
    passwordReset: "Obnova hesla",
    pinConfirmation: "PIN potvrzení",
    signOut: "Odhlásit",
    multiStepSignUp: "Vícekroková registrace",
    error404: "Chyba 404",
    error500: "Chyba 500",
    apps: "Aplikace",
    chat: "Chat",
    privateChat: "Soukromý chat",
    groupChat: "Skupinový chat",
    drawerChat: "Chat v zásuvce",
    widgets: "Widgety",
    widgetsLists: "Seznamy",
    widgetsStatistics: "Statistiky",
    widgetsCharts: "Grafy",
    widgetsMixed: "Kombinované",
    widgetsTables: "Tabulky",
    widgetsFeeds: "Zprávy",
    changelog: "Záznam změn",
    docsAndComponents: "Dokumentace a komponenty",
    megaMenu: "Mega menu",
    exampleLink: "Příkladový odkaz",
    modals: "Modální okna",
    general: "Obecné",
    inviteFriends: "Pozvat přátele",
    viewUsers: "Zobrazit uživatele",
    upgradePlan: "Upgradovat plán",
    shareAndEarn: "Sdílet a vydělat",
    forms: "Formuláře",
    newTarget: "Nový cíl",
    newCard: "Nová karta",
    newAddress: "Nová adresa",
    createAPIKey: "Vytvořit API klíč",
    twoFactorAuth: "Dvoufaktorové ověření",
    createApp: "Vytvořit aplikaci",
    createAccount: "Vytvořit účet",
    documentation: "Dokumentace",
    components: "Komponenty",
    resources: "Zdroje",
    activity: "Aktivity",
    customers: "Zákazníci",
    gettingStarted: "První kroky",
    customersListing: "Seznam zákazníků",
    customerDetails: "Detaily zákazníka",
    calendar: "Kalendář",
    subscriptions: "Předplatné",
    getStarted: "První kroky",
    subscriptionList: "Seznam předplatných",
    addSubscription: "Přidat předplatné",
    viewSubscription: "Zobrazit předplatné",
    // localization for validation (yup)
    validation: {
      mixed: {
        required: "Toto pole je povinné",
        notNull: "Musíte vybrat hodnotu",
        notType: "Toto pole musí být `{type}`",
      },
      number: {
        min: "Číslo musí mít alespoň {min} znaků",
        max: "Číslo musí mít nejvýše {max} znaků",
        more: "Číslo musí být větší než {more}",
        less: "Číslo musí být menší než {less}",
        integer: "Číslo musí být celé číslo",
      },
      string: {
        min: "Řetězec musí mít alespoň {min} znaků",
        max: "Řetězec nesmí přesáhnout {max} znaků",
        length: "Řetězec musí mít {length} znaků",
        email: "Neplatný formát emailu",
        url: "Neplatný formát URL",
        lowercase: "Řetězec musí být malými písmeny",
        uppercase: "Řetězec musí být velkými písmeny",
      },
      array: {
        min: "Musíte vybrat jednu z možností",
      },
    },

    // copied from ago localization file
    actual_orders: "Nejbližší zakázky",
    actual_orders_description: "Přehled nejbližších zakázek",
    author_description: "Firemní aplikace na míru",
    calibrations: "Kalibrací",
    changes: "Výměn",
    crn: "IČO",
    dashboard_overview: "Přehled modulů",
    do_you_forgot_password: "Zapomněli jste heslo?",
    do_you_remember_password: "Vzpomněli jste si na své heslo?",
    email: "E-mail",
    enter_data_and_login: "Zadejte své údaje a přihlaste se",
    enter_email_and_restore_password: "Zadejte svůj email a heslo obnovíme",
    enter_pin_and_login: "Zadejte svůj PIN a přihlaste se",
    error_404: "Chyba 404!",
    error_403: "Chyba 403!",
    found_records: "záznamů",
    generated_files: "Generované soubory",
    last_activities: "Poslední aktivity",
    last_activities_description: "Posledních 10 aktivit v systému",
    link_all_files: "Stáhnout ZIP soubor s kompletní fotodokumentací",
    page_forbidden: "Nemáte právo vstoupit do této části systému.",
    page_limit: "Záznamů na stránce",
    page_not_found: "Požadovaná část systému nebyla nalezena.",
    quick_options: "Rychlé volby",
    repairs: "Oprav",
    repassword: "Heslo znovu",
    total: "Celkem",
    uploaded_files: "Nahrané soubory",

    help_active: "Zvolte stav záznamu v systému",
    help_bank_account: "Zadejte číslo účtu",
    help_branche: "Zvolte provozovnu",
    help_car_brand_model: "Zadejte značku a model vozidla",
    help_car_rz: "Zadejte RZ vozidla",
    help_car_vin: "Zadejte VIN vozidla",
    help_car_year: "Zadejte rok výroby vozidla",
    help_company_in: "Zadejte IČO subjektu",
    help_company_vat_in: "Zadejte DIČ subjektu",
    help_contact_person: "Zadejte kontaktní osobu",
    help_customer_city: "Zadejte město",
    help_customer_company_in_identificator_from_ares: "Zadejte IČO pro vyhledání",
    help_customer_company_identificator_from_list: "Zadejte IČO / název pro vyhledávání z adresáře",
    help_customer_country: "Vyberte stát",
    help_customer_name: "Zadejte název subjektu",
    help_customer_street: "Zadejte ulici",
    help_customer_type: "Zvolte typ klienta",
    help_customer_zip: "Zadejte PSČ",
    help_date_of_work: "Zvolte datum opravy",
    help_email: "Zadejte kontaktní email",
    help_enter_note: "Můžete připsat poznámku",
    help_file: "Vyberte soubor",
    help_file_type: "Zvolte typ řílohy",
    help_files_upload: "Kliknutím nahrajte přílohy",
    help_files_drag_drop: "Přetáhněte soubory pro nahrání",
    help_files_upload_limits:
      "Maximální velikost souboru je 5 000 kb (5 MB).<br>Povolené formáty jsou: jpg | jpeg | png | bmp | pdf | doc | docx | word",
    help_from_three_chars: "Vyhledávání od 3 a více znaků",
    help_image_upload: "Kliknutím vyberte obrázek",
    help_insurance: "Zvolte pojišťovnu",
    help_item_camera: "Zvolte výbavu skla",
    help_item_ec: "Zadejte EC skla",
    help_insurance_limit: "Zadejte pojistný limit",
    help_insurance_participation_amount: "Zadejte částku spoluúčasti",
    help_insurance_participation_percent: "Zadejte spoluúčast v %",
    help_inv_company: "Zvolte společnost, která bude zakázku realizovat.",
    help_modules_config: "Zvolte přístupné moduly",
    help_name_of_record: "Název záznamu pro idenfitikaci",
    help_number_insurance: "Zadejte číslo PÚ",
    help_number_confim_insurance: "Zadejte číslo schválení",
    help_order_cancel: "Zakázku můžete stornovat",
    help_order_client_total_amount: "Částka, kterou musí klient zaplatit.",
    help_order_paid: "Zakázku můžete označit jako zaplacenou.",
    help_order_invoice_total_amount: "Zadejte celkovou fakturovanou částku",
    help_order_sent_insurance: "Zvolte stav odeslání",
    help_order_total_amount: "Zadejte celkovou částku",
    help_order_type: "Zvolte typ zakázky",
    help_person_in: "Zadejte RČ osoby",
    help_phone: "Zadejte kontaktní telefon",
    help_payment_method: "Zvolte platební metodu",
    help_field_not_edited: "Pole nelze měnit",
    help_selected_value: "Toto je vybraná hodnota.",
    help_shortname_of_record: "Krtaší název záznamu",
    help_street_customer: "Klient z ulice",
    help_customer_from_partner: "Zákazník od partnera",
    help_time_of_work: "Zvolte čas opravy",
    help_user_for_branches: "Zvolte přiřazené provozovny",
    help_user_name: "Zadejte jméno uživatele",
    help_user_pin: "Zadejte PIN pro mob. app",
    help_user_role: "Vyberte typ uživatele",
    help_vat_payer: "Zvolte možnost pro další výpočty",
    help_with_insurance: "Zvolte stav pro výpočet",

    branches: "Provozovny",
    orders: "Zakázky",
    partners: "Pojišťovny",
    users: "Uživatelé",
    category: "Kategorie",
    companies: "Společnosti",
    company: "Společnost",
    employment: "Úvazek",
    items: "Položky",
    parameter: "Parametr",
    parameters: "Parametry",

    account_settings: "Nastavení účtu",
    account_activition: "Aktivace účtu",
    amount: "Částka",
    amount_to_pay: "Částka k zaplacení",
    assumed_price_vat: "Předpokládaná cena s DPH",
    available_modules: "Přístupné moduly",
    bank_account: "Bankovní spojení",
    branche: "Provozovna",
    cashdesk: "Pokladna",
    cashdesk_number_p: "Číslo poklady P",
    camera_record: "Kamerový záznam",
    car_brand: "Značka vozidla",
    car_model: "Model vozidla",
    car_create: "Přidání vozidla",
    car_description: "Popis vozidla",
    car_distance: "Stav tachometru",
    car_rz: "RZ vozidla",
    car_vin: "VIN vozidla",
    car_vin_short: "VIN",
    car_year: "Rok výroby vozidla",
    cashdoc_type: "Typ dokladu",
    cashdoc_description: "Popis dokladu",
    city: "Město",
    click_for_reservation: "Označte sklad pro rezervaci",
    click_to_choose_file: "Kliknutím vyberte soubor",
    client_total_amount: "Částka doplatku v Kč s DPH",
    company_in: "IČO subjektu",
    company_vat_in: "DIČ subjektu",
    contact_person: "Kontaktní osoba",
    contact_email: "Kontaktní email",
    contact_phone: "Kontaktní telefon",
    const_number: "Konst. symbol",
    country: "Stát",
    customer: "Zákazník",
    customer_cars: "Vozidla zákazníka",
    customer_identificator_ares: "IČO pro hledání v ARES",
    customer_identificator_list: "IČO / název pro hledání v adresáři",
    customer_name: "Název subjektu",
    customer_order_name: "Odběratel (majitel vozidla)",
    customer_type: "Typ subjektu",
    company_name: "Název společnosti",
    start: "Začátek",
    end: "Konec",
    date: "Datum",
    date_from: "Datum od",
    date_to: "Datum do",
    date_zp: "Datum ZP",
    date_of_work: "Datum realizace",
    time_from: "Čas od",
    time_to: "Čas do",
    description: "Popis",
    do_with_insurance: "Uplatněno na pojišťovnu?",
    employee: "Zaměstnanec",
    employment_type: "Typ úvazku",
    employee_name: "Jméno zaměstnance",
    employee_work_time_start: "Začátek prac. doby",
    employee_work_time_end: "Konec prac. doby",
    file: "Soubor",
    file_type: "Typ souboru",
    files_and_documents: "Soubory a dokumenty",
    has_item_camera: "Má sklo kameru?",
    info_about_customer: "Detail zákazníka",
    info_about_car: "Detail vozidla",
    info_about_insurance: "Detail pojistné události",
    info_about_photos: "Fotografie zakázky",
    info_about_repair: "Detail opravy",
    info_all_files: "Kompletní fotodokumentace",
    info_other: "Další informace",
    info_realization: "Realizace",
    info_type_repair: "Typ opravy",
    insurance: "Pojišťovna",
    insurance_amount: "Pojistná částka",
    insurance_date_time: "Datum a čas ŠU",
    insurance_driver: "Řidič během ŠU",
    insurance_description: "Nehodový děj",
    insurance_limit: "Pojistný limit",
    insurance_number: "Číslo poj. události",
    insurance_place: "Místo ŠU",
    insurance_confirm_number: "Číslo schválení",
    insurance_over_limit: "Smluvený nadlimit",
    insurance_participation_amount: "Částka spoluúčasti",
    insurance_participation_percent: "Spoluúčast v %",
    insurance_type: "Typ pojištění",
    inv_company: "Společnost pro realizaci",
    invoicedoc_description: "Popis / Fakturujeme Vám za:",
    invoice_description: "Fakturujeme vám za",
    invoice_number: "Číslo faktury",
    invoice_type: "Typ faktury",
    is_record_active: "Je záznam aktivní?",
    vat_payer: "Plátce DPH",
    item_ec: "EC skla",
    item_ec_implicit: "Výchozí EC",
    item_oem: "OEM číslo",
    item_ec_and_acs: "EC skla a přísluš.",
    item_name: "Název",
    item_code: "Kód",
    item_code_number: "Číslo dílu",
    item_desription: "Popis",
    item_order_purchase_price: "Nákup. cena skla bez DPH",
    item_order_date: "Datum objednání skla",
    item_order_note: "Poznámka k obj. skla",
    item_order_shipping: "Doba doručení skla",
    item_price_basic: "Cena bez DPH",
    item_purchase_price_basic: "Nákup. cena bez DPH",
    item_supplier_id: "Dodavatel skla",
    item_type: "Typ položky",
    item_unit: "Jednotka",
    module_customers: "Modul Klienti",
    module_orders: "Modul Objednávky",
    module_users: "Modul Uživatelů",
    module_user_roles: "Modul Oprávnění",
    month: "Měsíc",
    name_of_record: "Název záznamu",
    no_need_to_next_pay: "Není třeba doplácet.",
    note: "Poznámka",
    noteForTechnic: "Poznámka pro technika",
    number_insurance_contract: "Číslo poj. smlouvy",
    option_active: "Status aktivní",
    order: "Zakázka",
    order_cancel: "Stornovaní zakázky",
    order_cancel_desc: "Ano, stornovaná",
    order_cancel_note: "Poznámka ke stornu",
    order_close_email_file_types: "Volitelné soubory do likvidačního emailu",
    order_description: "Popis zakázky",
    order_gallery: "Fotografie zakázky",
    order_invoice_total_amount: "Fakturovaná částka bez DPH",
    order_invoice_total_amount_vat: "Fakturovaná částka včetně DPH",
    order_item_note: "Poznámka k EC",
    order_list_note: "Poznámka do ZL",
    order_list_short: "Zak. list",
    order_paid: "Je zakázka zaplacená?",
    order_pickup: "Pick-up?",
    order_work_place: "Místo realizace",
    order_work_place_type: "Typ realizace",
    order_sent_insurance: "Je odesláno na pojišťovnu?",
    order_solved: "Likvidace zakázky",
    order_solved_option_package: "Možnosti balíčku",
    order_solved_desc: "Ano, zlikvidovaná",
    order_solved_desc_not_auto: "Neodesílat balíček automaticky",
    order_solved_note: "Interní poznámka k likvidaci",
    order_solved_email: "Email k likvidaci",
    order_solved_email_note: "Předmět emailu a Váš podpis bude doplněn automaticky",
    order_total_amount: "Cena zakázky bez DPH",
    order_total_amount_vat: "Cena zakázky s DPH",
    order_type: "Typ zakázky",
    order_work_date: "Datum realizace",
    order_work_time: "Čas realizace",
    order_work_time_slot: "Čas. slot realizace",
    order_state: "Stav zakázky",
    owner_operator: "Provozovatel (nájemce)",
    parameter_name: "Název parametru",
    parameter_type: "Typ parametru",
    payment_type: "Metoda platby",
    pay_days: "Splatnost (dny)",
    person_in: "RČ osoby",
    phone: "Telefon",
    power_of_attorney_short: "Plná moc",
    qauntity: "Množství",
    quick_load_customer: "Rychlý výběr klienta",
    recipient: "Příjemce",
    reports_not_ready: "Přehledy za předchozí měsíc ještě nejsou k dispozici.",
    role_name: "Název oprávnění",
    searching: "Vyhledávání",
    searching_customer_list: "Vyhledávání v adresáři",
    shortname_of_record: "Kratší název záznamu",
    show_notes_history: "Zobrazit historii poznámek",
    sort: "Řazení",
    sort_by_dates: "Dle data",
    sort_by_order_states: "Dle stavu zakázek",
    spec_condition: "Spec. podmínka / získatel",
    spec_number: "Spec. symbol",
    state: "Stav",
    stock: "Sklad",
    stock_from: "Ze skladu",
    stock_qty: "Skladové zásoby",
    stock_qty_reservation: "Rezervované kusy",
    stock_to: "Do skladu",
    street: "Ulice + č.p.",
    street_customer: "Klient z ulice",
    supplier: "Dodavatel",
    customer_from_partner: "Zákazník od partnera",
    technician: "Technik",
    technicians: "Technik / technici",
    time_of_work: "Čas realizace",
    type: "Typ",
    user_for_branches: "Spojení k provozovně",
    user_name: "Jméno uživatele",
    user_pin: "PIN k přihlášení",
    user_pin_mob_app: "PIN k mob. app",
    user_password: "Heslo uživatele",
    user_role: "Typ uživatele",
    user_is_active: "Aktivní účet",
    var_symbol: "Variabilní symbol",
    vat_rate: "Sazba DPH",
    witness: "Svědek ŠU",
    year: "Rok",
    zip: "PSČ",
    active: "Aktivní",

    option_all: "Vše",
    option_yes: "Ano",
    option_no: "Ne",
    option_calibration: "Kalibrace",
    option_change: "Výměna",
    option_repair: "Oprava",

    choose_date: "Vyberte datum",
    choose_time: "Vyberte čas",
    choose_order_state: "Vyberte stav zakázky",
    enter_amount: "Zadejte částku",
    enter_email: "Zadejte email",
    enter_number: "Zadejte číslo",
    enter_number_short: "Číslo",
    choose_option: "- vyberte možnost -",
    choose_option_short: "- vyberte -",
    choose_option_or_all: "- vše / vyberte -",
    choose_option_type: "- vyberte typ -",
    enter_password: "Zadejte heslo",
    enter_phone: "Zadejte tel. číslo",
    enter_text: "Zadejte text",
    enter_time: "Zadejte čas",
    enter_pin: "Zadejte PIN",

    record_id: "ID",
    record_car: "Vozidlo",
    record_customer: "Zákazník",
    record_date: "Datum",
    record_options: "Možnosti",
    record_price: "Cena",
    record_state: "Stav",
    record_type: "Typ",
    record_update_time: "Změněno",
    record_update_time_short: "změna",

    btn_add_record: "Přidat záznam",
    btn_back: "Zpět",
    btn_discard: "Zahodit",
    btn_cancle: "Zrušit",
    btn_close: "Zavřít",
    btn_confirm: "Potvrdit",
    btn_continue: "Pokračovat",
    btn_create: "Přidat",
    btn_edit: "Upravit",
    btn_login: "Přihlásit",
    btn_next: "Další",
    btn_print: "Tisk",
    btn_remove: "Smazat",
    btn_reset: "Resetovat",
    btn_upload: "Nahrát",
    btn_view: "Zobrazit",

    expired_bearer_token: "Vaše přihlášení vypršelo.",
    you_can_change_password: "Nastavte si nové heslo.",
    you_can_login: "Nyní se můžete přihlásit.",
    request_not_verified: "Požadavek se nepodařilo ověřit.",
    record_delete_error: "Při mazání záznamu došlo k problému.",

    // new

    contact_address: "Adresa",
    vat: "DIČ",
    please_wait: "Prosím čekejte...",

    client: "Klient",
    subject: "Subjekt",
    cancellation: "Storno",
    user_account_name: "Název účtu",
    time: "Čas",
    material: "Materiál",
    work: "Pozice",
    search_vehicle_database: "Vyhledávání v databázi vozidel",

    doc_type: "Typ dokladu",
    doc_number: "Čísla dokladu",
    valid_from: "Platný od",
    valid_to: "Platný do",
    issued_by: "Vydal",
    gender: "Pohlaví",
    personal_id_number: "Rodné číslo",
    change_password: "Změna hesla",
    data_change: "Změna údajů",
    notification: "Notifikace",
    new_image_upload: "Nahrát nový obrázek",

    choose_branch: "Vyberte provozovnu",
    choose_supplier: "Vyberte dodavatele",
    choose_customer: "Vyberte provozovnu",
    choose_user: "Vyberte uživatele",
    choose_invoice_type: "Vyberte typ faktury",
    choose_date_from: "Vyberte datum od",
    choose_date_to: "Vyberte datum do",
    choose_reality_date_from: "Vyberte datum realizace od",
    choose_reality_date_to: "Vyberte datum realizace do",
    choose_delivery_date_from: "Vyberte datum dodání od",
    choose_delivery_date_to: "Vyberte datum dodání do",
    signature_img: "Podpis uživatele",
    new_signature_img: "Nový podpis uživatele",
    charts_data_loaded: "Data grafů načtena",
    charts_data_error: "Chyba při načítání dat grafů",

    degree: "Titul",
    education: "Vzdělání",
    photo: "Fotka",
    new_photo: "Nahrát fotku",

    text: "Text",
    localization: "Jazyk",
    title: "Titulek",
    subtitle: "Podtitulek",

    email_1: "E-mail 1",
    email_2: "E-mail 2",
    phone_1: "Telefon 1",
    phone_2: "Telefon 2",
    button_1: "Tlačítko 1",
    button_2: "Tlačítko 2",
    choose_text_type: "Vybrat typ textu",
    rank: "Pořadí",
    content: "Obsah",
    office_hours_stomatology: "Otevírací doba - Stomatologie",
    office_hours_dental_hygiene: "Otevírací doba - Dentální hygiena",

    all: "Vše",
    inactive: "Neaktivní",
    choose_service: "Vyberte službu",

    important_message_name: "Název důležitého sdělení",
    important_message_content: "Obsah důležitého sdělení",
    important_message_is_visible: "Zobrazovat důležité sdělení",

    meta_title: "Meta titulek",
    meta_description: "Meta popis",
    meta_keywords: "Meta klíčová slova",
    use_photo: "Použít fotku",

    name: "Název"
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "cs",
  globalInjection: true,
  messages,
});

export default i18n;
