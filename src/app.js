//import 'bootstrap/dist/js/bootstrap';
import angular from 'angular';
import 'ng-infinite-scroll/build/ng-infinite-scroll.min';
import 'angularjs-toaster/toaster.min';
import modal from 'angular-ui-bootstrap/src/modal';
import {config} from './app.config';
import SearchController from './controllers/search.ctrl';
import GiphyService from './services/giphy.srv';

angular.module('giphyClientApp', ['infinite-scroll', 'toaster', modal])
    .constant('config', config)
    .service('GiphyService', GiphyService)
    .controller('SearchController', SearchController);