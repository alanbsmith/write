const textarea = document.getElementById('word-count-input');
const helpDescription = document.getElementById('word-count-help-description');
const helpCounter = document.getElementById('word-count-help-counter');

const maxCountInput = document.getElementById('max-word-count-input');
const minCountInput = document.getElementById('min-word-count-input');

const wordCountControl = document.getElementById('count-type-button-word');
const charCountControl = document.getElementById('count-type-button-char');

const defaultRowCount = 8;

function resetFields() {
  maxCountInput.value = '';
  minCountInput.value = '';
  setHelpCounterText();
  setHelpDescriptionText();
}

function getCountType() {
  const isWordCount = wordCountControl.getAttribute('aria-pressed') === "true";
  if (isWordCount) {
    return 'word';
  } else {
    return 'char';
  }
}

function getWordCount(value = '') {
  const countType = getCountType();

  if (countType === 'word') {
    const wordRegExp = /\w+'*\w*/g;
    const words = value.match(wordRegExp) || [];
    return words.length;
  } else {
    return value.length;
  }
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
  while (event.currentTarget && event.currentTarget.scrollHeight > event.currentTarget.clientHeight) {
    const rowCount = parseInt(textarea.getAttribute('rows'), 10) || 2;
    textarea.setAttribute('rows', rowCount + 1);
  }
}

function handleTextareaChange(event) {
  setHelpCounterText();
  setHelpDescriptionText();
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

function handleCharCountTypeControl() {
  const isPressed = charCountControl.getAttribute('aria-pressed');
  if (isPressed === "false") {
    wordCountControl.setAttribute('aria-pressed', false);
    charCountControl.setAttribute('aria-pressed', true);
    setHelpCounterText();
    setHelpDescriptionText();
  }
}

function handleWordCountTypeControl() {
  const isPressed = wordCountControl.getAttribute('aria-pressed');
  if (isPressed === "false") {
    charCountControl.setAttribute('aria-pressed', false);
    wordCountControl.setAttribute('aria-pressed', true);
    setHelpCounterText();
    setHelpDescriptionText();
  }
}

maxCountInput.addEventListener('input', handleMaxCountInputChange);
maxCountInput.addEventListener('keydown', handleRangeInputBackspace);

minCountInput.addEventListener('input', handleMinCountInputChange);
minCountInput.addEventListener('keydown', handleRangeInputBackspace);

textarea.addEventListener('input', handleTextareaChange);
textarea.addEventListener('paste', handleTextareaChange);
textarea.addEventListener('keydown', handleTextareaBackspace);

wordCountControl.addEventListener('click', handleWordCountTypeControl);
charCountControl.addEventListener('click', handleCharCountTypeControl);

resetFields();
