import React from 'react';
import {createRoot} from 'react-dom/client';
import App from './app.js';
import Store from './store.js';

const store = new Store({
  list: [
    {code: 1, title: 'Название элемента', selection: 0},
    {code: 2, title: 'Некий объект', selection: 0},
    {code: 3, title: 'Заголовок', selection: 0},
    {code: 4, title: 'Очень длинное название элемента из семи слов', selection: 0},
    {code: 5, title: 'Запись', selection: 0},
    {code: 6, title: 'Шестая запись', selection: 0},
    {code: 7, title: 'Седьмая запись', selection: 0},
  ],
  lastId : 0
});

const root = createRoot(document.getElementById('root'));

store.subscribe(() => {
  root.render(<App store={store}/>);
});

// Первый рендер приложения
root.render(<App store={store}/>);

