import { useTranslation } from 'react-i18next';

export default function ResetScores({resetScores}) {

  const { t } = useTranslation();

  const handleOnClick = (text) => {
    let result = window.confirm(t('Reset your score?'));
    if (result === true) {
      resetScores();
    }
  };

  return (
    <>
      <button onClick={() => { handleOnClick() }} className="button reset" data-i18n="reset">{t('Reset scores')}</button>
    </>
  );
}
