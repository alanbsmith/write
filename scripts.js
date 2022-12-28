const textarea = document.getElementById('word-count-input');
const helpDescription = document.getElementById('word-count-help-description');
const helpCounter = document.getElementById('word-count-help-counter');

const maxCountInput = document.getElementById('max-word-count-input');
const minCountInput = document.getElementById('min-word-count-input');

const defaultRowCount = 8;

function resetRangeValues() {
  maxCountInput.value = '';
  minCountInput.value = '';
}

function getWordCount(value = '') {
  const wordRegExp = /\w+'*\w*/g;
  const words = value.match(wordRegExp) || [];
  return words.length;
}

function getMinWordCount() {
  return parseInt(minCountInput.value, 10) || 0;
}

function getMaxWordCount() {
  return parseInt(maxCountInput.value, 10) || Infinity;
}

function getCurrentWordCount() {
  return getWordCount(textarea.value);
}

function setHelpCounterText() {
  const count = getCurrentWordCount();
  const maxCount = getMaxWordCount();
  const formattedMaxCount = maxCount === Infinity ? '∞' : maxCount;
  helpCounter.innerHTML = `${count} / ${formattedMaxCount}`;
}

function setHelpDescriptionText() {
  const count = getCurrentWordCount();
  const maxCount = getMaxWordCount();
  const minCount = getMinWordCount();

  if (!count) {
    helpDescription.innerHTML = '';
  } else if (count < minCount) {
    helpDescription.innerHTML = `▽ ${minCount - count} below`;
  } else if (count >= minCount && count <= maxCount) {
    helpDescription.innerHTML = `▷ in range`;
  } else if (count > maxCount) {
    helpDescription.innerHTML = `△ ${count - maxCount} above`;
  }
}

function setRowCount(event) {
  if (event.currentTarget && event.currentTarget.scrollHeight > event.currentTarget.clientHeight) {
    const rowCount = parseInt(textarea.getAttribute('rows'), 10) || 2;
    textarea.setAttribute('rows', rowCount + 1);
  }
}

function handleTextareaChange(event) {
  setHelpCounterText();
  setHelpDescriptionText()
  setRowCount(event);
}

function handleTextareaBackspace(event) {
  if (event.key === "Backspace" || event.key === "Delete") {
    const rowCount = parseInt(textarea.getAttribute('rows'), 10) || defaultRowCount;
    if (rowCount > defaultRowCount) {
      textarea.setAttribute('rows', rowCount - 1);
    }
  }
}

function handleMaxCountInputChange(event) {
  const maxCountValue = parseInt(event.currentTarget.value, 10) || 0; 
  if (maxCountValue <= 0) {
    event.currentTarget.value = '';
  }
  setHelpCounterText();
  setHelpDescriptionText();
}

function handleMinCountInputChange(event) {
  const minCountValue = parseInt(event.currentTarget.value, 10) || 0;
  if (minCountValue <= 0) {
    event.currentTarget.value = '';
  }
  setHelpDescriptionText();
}

function handleRangeInputBackspace(event) {
  if (event.key === "Backspace" || event.key === "Delete") {
    event.currentTarget.value === ''
  }
}

maxCountInput.addEventListener('input', handleMaxCountInputChange);
maxCountInput.addEventListener('keydown', handleRangeInputBackspace);

minCountInput.addEventListener('input', handleMinCountInputChange);
minCountInput.addEventListener('keydown', handleRangeInputBackspace);

textarea.addEventListener('input', handleTextareaChange);
textarea.addEventListener('keydown', handleTextareaBackspace);

resetRangeValues();