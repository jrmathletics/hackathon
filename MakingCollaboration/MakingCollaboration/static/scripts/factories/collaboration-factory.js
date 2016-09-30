webApp.factory('CollaborationFactory', ['$q', '$http', function ($q, $http){
    
        return {
            getCategory: function (name) {
                return $http({
                    method: 'GET',
                    url: '/static/mockdata/category.json'
                })
            }
        };
}]);