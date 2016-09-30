webApp.factory('CollaborationFactory', ['$q', '$http', function ($q, $http){
    
        return {
            getLanguages: function () {
                return $http({
                    method: 'GET',
                    url: '/api/languages'
                })
            },
            getCategory: function (name) {
                return $http({
                    method: 'GET',
                    url: '/static/mockdata/category.json'
                })
            }
        };
}]);