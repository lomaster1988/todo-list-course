/**
 * API
 *
 * PUT =>    input {text: 'string'}  output { text: 'string', id: 1}
 * GET =>                            output [{text: 'string', id: 1}, ...]
 * DELETE => input {id: 1}           output [{text: 'string', id: 1}, ...]
 */

var items = [{ text: 'my first task from server', id: '0' }]; // [{text: string, id: number}]
var taskId = 1;

// eslint-disable-next-line no-undef
var express = require('express');
var app = express();

const jsonParser = express.json();

function resolveCors(res) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
}

app.use('/items', jsonParser, function (req, res) {
  resolveCors(res);

  switch (req.method) {
    case 'GET': {
      res.json(items);
      break;
    }
    case 'PUT': {
      taskId++;
      const newTask = {
        id: String(taskId),
        text: req.body.text,
      };

      items.push(newTask);
      res.json(newTask);

      return;
    }
    case 'POST': {
      const task = items.find((item) => item.id === req.body.id);
      if (task !== null) {
        task.text = req.body.text;
        res.statusCode(201);
      } else {
        res.sendStatus(404);
      }
      break;
    }
    case 'DELETE': {
      const filteredTaskList = items.filter((item) => item.id !== req.body.id);

      if (items.length !== filteredTaskList.length) {
        items = filteredTaskList;
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
      break;
    }
    case 'OPTIONS': {
      res.sendStatus(204);
      break;
    }
    default:
      console.log('error request', req.method, req.url);
  }
});

app.listen(3000, function () {
  console.log('ExpressJs server run on 3000 port');
});
