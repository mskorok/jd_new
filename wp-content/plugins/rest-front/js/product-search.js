var $ = jQuery.noConflict();
var app = angular.module('front', []);
app.controller('frontCtr', function ($scope) {
    $scope.product_search_header = window.front_header;
    $scope.product_search_footer = window.front_footer;
    $scope.product_search_content = window.front_product_search_content;
    var front = {

    };
    angular.element(document).ready(function () {

    });
});