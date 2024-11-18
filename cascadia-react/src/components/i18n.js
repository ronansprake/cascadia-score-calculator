import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';

// https://react.i18next.com/guides/multiple-translation-files
const resources = {
  en: {
    translation: {
      'Player': 'Player',
      'Bear': 'Bear',
      'Elk': 'Elk',
      'Hawk': 'Hawk',
      'Fox': 'Fox',
      'Salmon': 'Salmon',
      'Mountain': 'Mountain',
      'Forest': 'Forest',
      'Prairie': 'Prairie',
      'Wetland': 'Wetland',
      'River': 'River',
      'Tokens': 'Tokens',
      'Landmarks': 'Landmarks',
      'Reset scores': 'Reset scores',
      'Give feedback': 'Give feedback',
      'Official rules': 'Official rules',
      'Thanks to': 'Thanks to',
      'Change language': 'Change language',
      'Reset your score?':'Reset your score?'
    }
  },
  de: {
    translation: {
      'Player': 'Spieler',
      'Bear': 'Bär',
      'Elk': 'Hirsch',
      'Hawk': 'Bussard', 
      'Fox': 'Fuchs', 
      'Salmon': 'Lachs', 
      'Mountain': 'Gebirge', 
      'Forest': 'Wald', 
      'Prairie': 'Prärie', 
      'Wetland': 'Feuchtgebiet', 
      'River': 'Fluss', 
      'Tokens': 'Zapfen', 
      'Landmarks': 'Landmarks', 
      'Reset scores': 'Zurücksetzen', 
      'Give feedback': 'Vorschläge', 
      'Official rules': 'Regelbuch (Englisch)', 
      'Thanks to': 'Danke an', 
      'Change language': 'Sprache ändern', 
      'Reset your score?': 'Punkte zurücksetzen?'
    }
  },
  fr: {
    translation: {
      'Player': 'Joueur',
      'Bear': 'Ours',
      'Elk': 'Wapiti',
      'Hawk': 'Buse', 
      'Fox': 'Renard', 
      'Salmon': 'Saumon', 
      'Mountain': 'Montagne', 
      'Forest': 'Forêt', 
      'Prairie': 'Prairie', 
      'Wetland': 'Marais', 
      'River': 'Fleuve', 
      'Tokens': 'Jetons', 
      'Landmarks': 'Paysages', 
      'Reset scores': 'Réinitialiser', 
      'Give feedback': 'Suggestions', 
      'Official rules': 'Livre de règles (Anglais)', 
      'Thanks to': 'Merci à', 
      'Change language': 'Changer de langue', 
      'Reset your score?': 'Réinitialiser les scores?'
    }
  },
  pl: {
    translation: {
      'Player': 'Gracz',
      'Bear': 'Niedźwiedź',
      'Elk': 'Łoś',
      'Hawk': 'Myszołów', 
      'Fox': 'Lis', 
      'Salmon': 'Łosoś', 
      'Mountain': 'Góry', 
      'Forest': 'Lasy', 
      'Prairie': 'Prerie', 
      'Wetland': 'Moczary', 
      'River': 'Rzeki', 
      'Tokens': 'Żetony natury', 
      'Landmarks': 'Pomniki przyrody', 
      'Reset scores': 'Zresetuj wyniki', 
      'Give feedback': 'Uwagi', 
      'Official rules': 'Regulamin (angielski)', 
      'Thanks to': 'Dzięki', 
      'Change language': 'Zmień język', 
      'Reset your score?': 'Zresetować wyniki?'
    }
  },
  tr: {
    translation: {
      'Player': 'Oyuncu',
      'Bear': 'Ayı',
      'Elk': 'Kanada geyiği',
      'Hawk': 'Şahin', 
      'Fox': 'Tilki', 
      'Salmon': 'Somon', 
      'Mountain': 'Dağ', 
      'Forest': 'Orman', 
      'Prairie': 'Prairie', 
      'Wetland': 'Bataklık', 
      'River': 'Nehir', 
      'Tokens': 'Jetonlar', 
      'Landmarks': 'Sınır taşı', 
      'Reset scores': 'Sıfırla', 
      'Give feedback': 'Geri bildirim', 
      'Official rules': 'Kural Kitapçığı (İngilizce)', 
      'Thanks to': 'Teşekkürler', 
      'Change language': 'Dili değiştir', 
      'Reset your score?': 'Tüm tabloyu sıfırla?'
    }
  }
};

i18n
  // Detect user language
  .use(LanguageDetector)
  // Pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // Options: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    }
  });

  export default i18n;