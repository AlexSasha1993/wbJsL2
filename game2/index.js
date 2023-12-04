import Game from './src/game.js';
import View from './src/view.js';
import Controller from './src/controller.js';

const root = document.querySelector('#root');

const game = new Game();
const view = new View(root, 480, 640, 20, 10);
const controller = new Controller(game, view);

// необходимо сделать чтобы получить доступ к объекту game,  так как используем модули и константа не попадает в глобальное пространство имен
window.game = game;
window.view = view;
window.controller = controller;
