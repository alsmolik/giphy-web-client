import angular from 'angular';
import uirouter from 'angular-ui-router';
import routes from './app.routes';
import HomeController from './sections/home/home.ctrl';

angular.module('giphyClientApp', ['ui.router'])
    .config(routes)
    .controller('HomeController', HomeController);