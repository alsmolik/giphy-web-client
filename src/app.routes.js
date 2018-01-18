routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
    $stateProvider
        .state('home', {
            url: '/',
            template: require('./sections/home/home.tpl.html')
        });
}