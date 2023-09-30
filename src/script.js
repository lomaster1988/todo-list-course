import { storage } from './storage.js';

const htmlElements = {
  formElement: document.querySelector('.todo-form'),
  itemList: document.querySelector('.item-list'),
  inputText: document.querySelector('.todo-form__input'),
};

let items = [];

storage.getAll().then((res) => {
  items = res;
  renderAllTask();
});

htmlElements.formElement.addEventListener('submit', createItem);
htmlElements.itemList.addEventListener('click', deleteItem);

function renderAllTask() {
  let htmlString = '';

  for (let i = 0; i < items.length; i++) {
    htmlString += `<div class="item" data-id="${items[i].id}">${items[i].text}</div>`;
  }

  htmlElements.itemList.innerHTML = htmlString;
}

function createItem(event) {
  event.preventDefault();

  const text = htmlElements.inputText.value;

  if (text === '') {
    return;
  }

  storage.create(text).then((res) => {
    const htmlString = `<div class="item" data-id="${res.id}">${text}</div>`;

    items.push({
      text: text,
      id: res.id,
    });

    htmlElements.itemList.innerHTML += htmlString;
    htmlElements.inputText.value = '';
  });
}

function deleteItem(event) {
  const id = event.target.dataset.id;
  const element = document.querySelector(`[data-id="${id}"]`);
  element.remove();

  //   items = items.filter(function (item) {
  //     return item.id !== id;
  //   });
  //   storage.updateItems(items);
}
