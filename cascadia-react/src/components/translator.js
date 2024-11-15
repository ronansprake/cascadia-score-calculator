import Translator from "@andreasremdt/simple-translator";

    // Translations

    var englishTranslation = {
        player: 'Player',
        bear: 'Bear',
        elk: 'Elk',
        hawk: 'Hawk',
        fox: 'Fox',
        salmon: 'Salmon',
        mountain: 'Mountain',
        forest: 'Forest',
        prarie: 'Prairie',
        wetland: 'Wetland',
        river: 'River',
        tokens: 'Tokens',
        landmarks: 'Landmarks',
        reset: 'Reset scores',
        feedback: 'Give feedback',
        rules: 'Official rules',
        thanks: 'Thanks to',
        dialog: {
            reset: 'Reset your score?',
        },
    };
    var frenchTranslation = {
        player: 'Joueur',
        bear: 'Ours',
        elk: 'Wapiti',
        hawk: 'Buse',
        fox: 'Renard',
        salmon: 'Saumon',
        mountain: 'Montagne',
        forest: 'Forêt',
        prarie: 'Prairie',
        wetland: 'Marais',
        river: 'Fleuve',
        tokens: 'Jetons',
        landmarks: 'Paysages',
        reset: 'Réinitialiser',
        feedback: 'Suggestions',
        rules: 'Livre de règles (Anglais)',
        thanks: 'Merci à',
        dialog: {
            reset: 'Réinitialiser les scores?',
        },
    };
    var germanTranslation = {
        player: 'Spieler',
        bear: 'Bär',
        elk: 'Hirsch',
        hawk: 'Bussard',
        fox: 'Fuchs',
        salmon: 'Lachs',
        mountain: 'Gebirge',
        forest: 'Wald',
        prarie: 'Prärie',
        wetland: 'Feuchtgebiet',
        river: 'Fluss',
        tokens: 'Zapfen',
        landmarks: 'Landmarks',
        reset: 'Zurücksetzen',
        feedback: 'Vorschläge',
        rules: 'Regelbuch (Englisch)',
        thanks: 'Danke an ',
        dialog: {
            reset: 'Punkte zurücksetzen?',
        },
    };
    var polishTranslation = {
        player: 'Gracz',
        bear: 'Niedźwiedź',
        elk: 'Łoś',
        hawk: 'Myszołów',
        fox: 'Lis',
        salmon: 'Łosoś',
        mountain: 'Góry',
        forest: 'Lasy',
        prarie: 'Prerie',
        wetland: 'Moczary',
        river: 'Rzeki',
        tokens: 'Żetony natury',
        landmarks: 'Pomniki przyrody',
        reset: 'Reset scores',
        feedback: 'Give feedback',
        rules: 'Official rules',
        thanks: 'Thanks to',
        dialog: {
            reset: 'Reset your score?',
        },
    };
    var turkishTranslation = {
        player: 'Oyuncu',
        bear: 'Ayı',
        elk: 'Kanada geyiği',
        hawk: 'Şahin',
        fox: 'Tilki',
        salmon: 'Somon',
        mountain: 'Dağ',
        forest: 'Orman',
        prarie: 'Prairie',
        wetland: 'Bataklık',
        river: 'Nehir',
        tokens: 'Jetonlar',
        landmarks: 'Sınır taşı',
        reset: 'Sıfırla',
        feedback: 'Geri bildirim',
        rules: 'Kural Kitapçığı (İngilizce)',
        thanks: 'Thanks to',
        dialog: {
            reset: 'Tüm tabloyu sıfırla?',
        },
    };

    var translator = new Translator({
        detectLanguage: true,
        selector: "[data-i18n]",
        persist: true,
        persistKey: "preferred_language"
    });

    translator.add('en', englishTranslation);
    translator.add('fr', frenchTranslation);
    translator.add('de', germanTranslation);
    translator.add('pl', polishTranslation);
    translator.add('tr', turkishTranslation);

    translator.translatePageTo();

    // const elemLanguageSelector = document.getElementById('language-select');
    // elemLanguageSelector.value = translator.currentLanguage;

    // elemLanguageSelector.addEventListener('change', (e) => {
    // var language = e.target.value;
    // translator.translatePageTo(language);
    // });