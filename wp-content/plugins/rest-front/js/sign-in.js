var $ = jQuery.noConflict();
var app = angular.module('front', []);
app.controller('frontCtr', function ($scope) {
    $scope.jd_rest_limit = 100;
    $scope.sign_in_header = window.front_header;
    $scope.sign_in_footer = window.front_footer;
    $scope.sign_in_content = window.front_sign_in_content;
    var front = {
        login: function (form) {
            var name, password, remember;
            if (typeof form.username.value !== 'undefined') {
                name = form.username.value;
            } else {
                alert('Username not defined');
                return false;
            }
            if (typeof form.password.value !== 'undefined') {
                password = form.password.value;
            } else {
                alert('password not defined');
                return false;
            }
            if (typeof form.remember.checked !== 'undefined' && form.remember.checked) {
                remember = form.remember.checked
            } else {
                remember = null;
            }
            front_auth.login(name, password, remember);
        },
        submit: function () {
            var form = document.getElementById('login_form');
            if (form) {
                form.addEventListener('submit', function (e) {
                    e.stopPropagation();
                    e.preventDefault();
                    front.login(form);
                    return false;
                })
            }
        },
        signUp: function () {
            var link = document.getElementById('sign_up_link');
            if (link) {
                link.setAttribute('href', front_register_url);
            }
        }
    };
    $scope.$on('$includeContentLoaded', function (event, templateName) {
        if (templateName.indexOf('header') !== -1) {
            front_auth.menuSwitch();
        }
        if (templateName.indexOf('content.html') !== -1) {
            front.submit();
            front.signUp();
        }
        if (templateName.indexOf('footer.html') !== -1) {
            var subscription_form = document.getElementById('front_subscribe');
            if (subscription_form) {
                subscription_form.addEventListener('submit', function (ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    front_backpack.subscribe(subscription_form);

                })
            }
            var search = document.getElementById('footer_search');
            if (search) {
                search.addEventListener('keyup', function (ev) {
                    if (ev.which === 13 || ev.keyCode === 13) {
                        if (typeof search.place !== 'undefined'
                            && typeof search.place.value !== 'undefined'
                            && search.place.value.length > 0
                        ) {
                            window.location.href = front_backpack.listUrl + '/?place=' + search.place.value
                        }
                    }
                })
            }
        }
    });
    angular.element(document).ready(function () {
    });
});