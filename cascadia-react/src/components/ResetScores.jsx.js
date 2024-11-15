import { useState } from 'react';

export default function ResetScores({resetScores}) {

  const handleOnClick = (text) => {
    resetScores();
  };

  return (
    <>
      <button onClick={() => { handleOnClick() }} className="button reset" data-i18n="reset">Reset scores</button>
    </>
  );
}
