(function () {
    'use strict';

    var app = angular.module('app', ['ngTouch', 'ui.grid', 'ui.grid.pagination']);

    app.controller('MainCtrl', ['$scope', '$http', '$timeout', function ($scope, $http, $timeout) {
        $scope.gridOptions1 = {
            enableFiltering: true,
            useExternalFiltering: true,
            enablePaginationControls: true,
            paginationPageSizes: [25, 50, 75],
            paginationPageSize: 25,
            columnDefs: [
                { name: 'name' },
                { name: 'gender' },
                { name: 'company' }
            ],
            onRegisterApi: function( gridApi ) {
                $scope.gridApi = gridApi;
                $scope.gridApi.core.on.filterChanged( $scope, function() {
                    var grid = this.grid;

                    if (angular.isDefined($scope.filterTimeout)) {
                        $timeout.cancel($scope.filterTimeout);
                    }
                    $scope.filterTimeout = $timeout(function () {

                        console.log("huhu");

                        if( grid.columns[1].filters[0].term === 'male' ) {
                            $http.get('/data/100_male.json')
                                .success(function(data) {
                                    $scope.gridOptions1.data = data;
                                });
                        } else if ( grid.columns[1].filters[0].term === 'female' ) {
                            $http.get('/data/100_female.json')
                                .success(function(data) {
                                    $scope.gridOptions1.data = data;
                                });
                        } else {
                            $http.get('/data/data.js')
                                .success(function(data) {
                                    $scope.gridOptions1.data = data;
                                });
                        }
                    }, 500);


                });
            }
        };



        $http.get('/data/data.js')
            .success(function (data) {
                $scope.gridOptions1.data = data;
            });
    }]);

}());