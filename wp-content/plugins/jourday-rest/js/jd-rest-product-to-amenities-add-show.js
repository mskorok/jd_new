var $ = jQuery.noConflict();
var app = angular.module('pluginShow', []);
app.controller('showCtr', function($scope) {
    $scope.jd_rest_limit = 100;
    $scope.admin_navbar = (jd_get_roles() === 'Admin') ? jd_rest_admin_url : '';
    $scope.main_navbar = jd_rest_navbar_url;
    var deleteUrl = '/product-info-to-amenities-add/';
    var getUrl = 'wp/product-to-amenities-add/show/';
    var redirectUrl = jd_product_to_amenities_add_list_url;
    var editUrl = jd_product_to_amenities_add_edit_url;

    var jd_rest_plugin_show = {
        deleteAdmin: function (id) {
            if (id !== '' && !isNaN(id)) {
                var url = jd_rest_host + '?action=jourday_ajax_form_get&method=DELETE&url=' + deleteUrl + id;
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            try {
                                var response = JSON.parse(this.response);
                                if (response.result === 'OK') {
                                    window.location.href = redirectUrl;
                                }
                            } catch (e) {
                                console.log('error', e);
                            }
                        } else {
                            console.log('error response', this.response);
                        }
                    }
                };
                xhr.open('GET', url, true);
                xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
                xhr.send();
            }
        }
    };

    angular.element(document).ready(function () {
        if (!jd_authorized()) {
            window.location.href = '/rest-home/';
        }
        var el_id = getParameterByName('el_id');
        if (!el_id) {
            window.location.href = redirectUrl;
        }
        var url = jd_rest_host + '?action=jourday_ajax_form_get&method=GET&url=' + getUrl + el_id;
        var xhr = new XMLHttpRequest();
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        $('#plugin_show_container').html(this.response);
                        var edit_button = document.getElementById('jd_plugin_show_edit');
                        if (edit_button  && jd_admin()) {
                            edit_button.classList.remove('hidden');
                            var edit_url = editUrl + '?el_id=' + el_id;
                            edit_button.setAttribute('href', edit_url);
                        }
                        var delete_button = document.getElementById('jd_plugin_show_delete');
                        if (delete_button  && jd_admin()) {
                            delete_button.classList.remove('hidden');
                            delete_button.addEventListener('click', function () {
                                jd_rest_plugin_show.deleteAdmin(el_id);
                            })
                        }
                    } catch (e) {
                        console.log('error', e);
                    }
                } else {
                    console.log('error response', this.response);
                }
            }
        };
        xhr.open('GET', url, true);
        xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        xhr.send();
    });
});