(function () {

    angular
        .module('users')
        .controller('UserController', [
            '$mdSidenav', '$mdBottomSheet', '$timeout', '$log', '$http',
            UserController
        ]);

    function UserController($mdSidenav, $mdBottomSheet, $timeout, $log, $http) {
        var self = this;
        var publickey = '5d2707ee7cf225daeb109e0e2f4333c7';
        var hs = '9d5c5c873655678d744af05dbaa0a601';
        var timeStamp = '1';
        var baseUrl = "http://gateway.marvel.com/v1/public/characters";
        var buscaPadrao = 'Spider';

        self.selected = null;
        self.buscaHero = buscaHero;
        self.heroi = '';
        self.modificado = '';
        self.herois = [];
        self.selecionaHeroi = selecionaHeroi;
        self.toggleList = toggleUsersList;

        buscaHero();

        function toggleUsersList() {
            $mdSidenav('left').toggle();
        }

        function selecionaHeroi(hero) {
            self.selected = angular.isNumber(hero) ? self.herois[hero] : hero;
        }

        function buscaHero() {
            if (self.heroi == '') {
                self.heroi = buscaPadrao;
            }  

            $http.get(baseUrl, {
                params: {
                    nameStartsWith: self.heroi,
                    modifiedSince: self.modificado,
                    limit: 25,
                    ts: timeStamp,
                    apikey: publickey,
                    hash: hs
                }
            }).then(function (result) {
                console.log(result.data.data.results);
                self.herois = result.data.data.results;
            });
        }

    }

})();
