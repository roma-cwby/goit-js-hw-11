export default { addHistory };

const historyKey = 'history';
const historyList = document.querySelector('.history');
const historySize = 10;

setHistory();

function setHistory() {
  const data = JSON.parse(localStorage.getItem(historyKey));
  if (data && data.length > 0) createButtons(data);
}

function addHistory(value) {
  let data = null;
  data = JSON.parse(localStorage.getItem(historyKey));

  if (data && data.length > 0) {
    if (data.includes(value) || value === '') return;
    if (data.length >= historySize) {
      let result = [];
      for (let i = 1; i < data.length; i++) result.push(data[i]);

      data = result;
      data.push(value);
    } else data.push(value);
  } else {
    data = [];
    data.push(value);
  }

  localStorage.setItem(historyKey, JSON.stringify(data));
  createButtons(data);
}

function createButtons(data) {
  historyList.innerHTML = data.reduce(
    (acc, item) => acc + `<li id="${item}">${item}</li>`,
    ''
  );
}
