import translator from "./translator";

export default function ResetScores({resetScores}) {

  const handleOnClick = (text) => {
    let result = window.confirm(translator.translateForKey('dialog.reset', translator.currentLanguage));
    if (result === true) {
      resetScores();
    }
  };

  return (
    <>
      <button onClick={() => { handleOnClick() }} className="button reset" data-i18n="reset">Reset scores</button>
    </>
  );
}
