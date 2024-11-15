import translator from "./translator";

export default function TranslationControl() {

    const handleChange = (evt) => {
      translator.translatePageTo(evt.target.value);
    };

    return (
      <>
      <div className="language">
        <label htmlFor="language-select" data-i18n="changeLanguage">Change language</label>
        <select id="language-select" onChange={handleChange}>
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
