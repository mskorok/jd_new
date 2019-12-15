var $ = jQuery.noConflict();
var app = angular.module('front', []);
app.controller('frontCtr', function ($scope) {
    $scope.approval_header = window.front_header;
    $scope.approval_footer = window.front_footer;
    $scope.approval_content = window.front_approval_content;
    var front = {
        approval: function () {
            var paymentID = getParameterByNameFront('paymentId');
            var payerID = getParameterByNameFront('PayerID');
            if (paymentID && payerID) {
                this.execute(paymentID, payerID);
            }
        },
        clearBackpack: function(){
            localStorage.removeItem('backpack');
            localStorage.removeItem('paymentID')
        },
        execute: function (paymentID, payerID) {
            var self = this;
            var url = front_wp_host + '?action=front_send_form_post_models&url=/paypal/execute';
            var formData = new FormData(form);
            formData.append('paymentID', paymentID);
            formData.append('payerID', payerID);
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            console.log(response);
                            if (typeof response.success !== 'undefined') {
                                self.clearBackpack();
                                $scope.approval_content = window.front_approval_content_success;
                            }
                            if (typeof response.data.error !== 'undefined') {
                                $scope.approval_content = window.front_approval_content_failure;
                            }

                        } catch (e) {
                            console.log('error', e);
                        }
                    } else {
                        console.log('error response', this.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(formData);
        }
    };
    $scope.$on('$includeContentLoaded', function (event, templateName) {
        if (templateName.indexOf('header') !== -1) {
            front_auth.menuSwitch();
        }
        if (templateName.indexOf('content.html') !== -1) {
            // front.approval();//todo uncomment
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