import { useTranslation } from 'react-i18next';

export default function TranslationControl() {

  const { t, i18n } = useTranslation();

  const handleChange = (evt) => {
    i18n.changeLanguage(evt.target.value);
  };

  const getLanguage = window.localStorage.i18nextLng;

  return (
    <>
    <div className="language">
      <label htmlFor="language-select">{ t('Change language') }</label>
      <select value={getLanguage} id="language-select" onChange={handleChange}>
          <option value="en">English</option>
          <option value="de">Deutsch</option>
          <option value="fr">Français</option>
          <option value="pl">Polski</option>
          <option value="tr">Türkçe</option>
      </select>
    </div>
    </>
  );
}
