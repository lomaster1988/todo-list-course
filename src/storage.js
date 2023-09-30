export const storage = {
  itemsKey: 'todo-items',
  idKey: 'todo-id',
  api: 'http://localhost:3000/items',
  getAll: function () {
    return fetch(this.api, { method: 'GET' }).then((res) => {
      return res.json();
    });
  },
  create: function (text) {
    return fetch(this.api, {
      method: 'PUT',
      body: JSON.stringify({
        text: text,
      }),
    }).then((res) => {
      return res.json();
    });
  },
  delete: function (id) {
    return fetch(this.api, {
      method: 'DELETE',
      body: JSON.stringify({ id: id }),
    }).then((res) => {
      return res.json();
    });
  },
  update: function (id, text) {
    return fetch(this.api, {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        text: text,
      }),
    }).then((res) => {
      return res.json();
    });
  },
};
