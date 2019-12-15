var $ = jQuery.noConflict();
var app = angular.module('front', []);
app.controller('frontCtr', function ($scope) {
    $scope.profile_header = window.front_header;
    $scope.profile_footer = window.front_footer;
    $scope.profile_content = window.front_profile_content;
    var front = {
        selectors: ['password', 'confirmPassword'],
        show_company: function (has_company_checkbox) {
            has_company = has_company_checkbox.checked;
            if (has_company) {
                document.getElementById('additional_elements').classList.remove('hidden');
            } else {
                document.getElementById('additional_elements').classList.add('hidden');
            }
        },
        appendCheckbox: function(form, form_data){
            if (form.hasCompany) {
                form_data.append('hasCompany', form.hasCompany.value);
            }
            if (form.insurancePLI) {
                form_data.append('insurancePLI', form.insurancePLI.value);
            }
            if (form.insurancePTR) {
                form_data.append('insurancePTR', form.insurancePTR.value);
            }
            if (form.workWithLocals) {
                form_data.append('workWithLocals', form.workWithLocals.value);
            }
            if (form.refund4Days) {
                form_data.append('refund4Days', form.refund4Days.value);
            }
            if (form.refund4moreDays) {
                form_data.append('refund4moreDays', form.refund4moreDays.value);
            }
            if (form.refund8moreDays) {
                form_data.append('refund8moreDays', form.refund8moreDays.value);
            }
            if (form.refund30Days) {
                form_data.append('refund30Days', form.refund30Days.value);
            }
            if (form.refund30moreDays) {
                form_data.append('refund30moreDays', form.refund30moreDays.value);
            }
            if (form.refund60moreDays) {
                form_data.append('refund60moreDays', form.refund60moreDays.value);
            }
        },
        user_edit: function (form) {
            jd_sanitize_checkbox(form);
            var password = form.password.value;
            var passwordConfirmed = form.confirmPassword.value;
            if (password !== passwordConfirmed) {
                alert('Password does not matched confirmation!');
                return false;
            }
            var jd_edit_user_key = window.jd_edit_user_key;
            var form_data = new FormData(form);
            this.appendCheckbox(form, form_data);
            var url = jd_rest_host + '?action=jourday_ajax_send_form_post';
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            var error_container = document.getElementById('jd_error_container');
                            var html;
                            if (response.result === 'error') {
                                if (error_container) {
                                    html = '';
                                    if (Array.isArray(response.message)) {
                                        response.message.forEach(function (message) {
                                            if (typeof message === 'object') {
                                                for (var key in message) {
                                                    html += '<div>' + key + ' : ' + message[key] + '</div>';
                                                }
                                            } else if (typeof message === 'string') {
                                                html += '<div>' + message + '</div>';
                                            }
                                        });
                                    } else if (typeof response.message === 'object') {
                                        for (var key in response.message) {
                                            html += '<div>' + key + ' : ' + response.message[key] + '</div>';
                                        }
                                    } else {
                                        html = '<div>' + response.message + '</div>';
                                    }
                                    error_container.innerHTML = html;
                                    window.location.hash = 'top';
                                }
                                console.log('error', response.message, html);
                            } else if (response.error) {
                                if (error_container) {
                                    html = '';
                                    if (Array.isArray(response.error.message)) {
                                        response.error.message.forEach(function (message) {
                                            if (typeof message === 'object') {
                                                for (var key in message) {
                                                    html += '<div>' + key + ' : ' + message[key] + '</div>';
                                                }
                                            } else if (typeof message === 'string') {
                                                html += '<div>' + message + '</div>';
                                            }
                                        })
                                    } else if (typeof response.error.message === 'string') {
                                        try {
                                            var errors = JSON.parse(response);
                                            errors.forEach(function (message) {
                                                html += '<div>' + message + '</div>';
                                            })

                                        } catch(e) {
                                            console.log(e.message);
                                            html = response.error.message;
                                        }
                                    }
                                    error_container.textContent = html;
                                    window.location.hash = 'top';
                                }
                                console.log('error', error_container, response.error.message);
                            } else if (response[jd_edit_product_key] && response[jd_edit_product_key].result === 'error') {
                                if (error_container) {
                                    error_container.textContent = response[jd_edit_product_key].message;
                                    window.location.hash = 'top';
                                }
                                console.log('error', response[jd_edit_product_key].message);
                            } else if (response[jd_edit_user_key].success) {
                                window.location.reload();
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
            // xhr.send(form_data);
        },
        powerStrength: function () {
            var selectors = this.selectors;
            [].forEach.call(selectors, function (selector) {
                var pass = document.getElementById(selector);
                if (pass) {
                    var parent = pass.parentNode;
                    parent.removeChild(pass);
                    var div = document.createElement('div');
                    div.setAttribute('id', selector);
                    div.classList.add('w-100');
                    parent.appendChild(div);
                    $('#' + selector).strength_meter();
                    var input = parent.querySelector('input[type=password]');
                    input.setAttribute('name', selector);
                    input.classList.add('form-control');
                }
            })
        }
    };

    angular.element(document).ready(function () {
        if (!front_auth.authorized()) {
            window.location.href = '/front-home/';
        }
        $scope.$on('$includeContentLoaded', function (event, templateName) {
            if (templateName.indexOf('header') !== -1) {
                front_auth.menuSwitch();
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
            if (templateName.indexOf('content.html') !== -1) {
                var user_id = front_auth.auth_id();
                var url = jd_rest_host + '?action=front_form_get&method=GET&url=' + front_user_edit_get_url + user_id;
                var xhr = new XMLHttpRequest();
                xhr.onload = function () {
                    if (this.readyState === 4) {
                        if (this.status === 200) {
                            try {
                                $('#user_edit_container').html(this.response);
                                front.powerStrength();
                                var form = document.getElementById('user_form');
                                if (form) {
                                    form.addEventListener('submit', function (e) {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        front.user_edit(form);
                                        front.powerStrength();
                                        return false;
                                    })
                                }
                                var has_company_checkbox = document.querySelector('input[name=hasCompany]');
                                if (has_company_checkbox) {
                                    front.show_company(has_company_checkbox);
                                    has_company_checkbox.addEventListener('change', function (e) {
                                        front.show_company(has_company_checkbox);
                                    });
                                }

                                $('input[name=username]').attr('disabled', 'disabled');//edit
                                var role_select = document.querySelector('select[name=role]');
                                if (role_select) {
                                    var role_id_input = document.getElementById('role_id');
                                    role_select.removeAttribute('disabled');
                                    if (role_id_input) {
                                        var role_id = role_id_input.value;
                                        var options = role_select.querySelectorAll('option');
                                        if (role_id.length < 1 || role_id === 'null' || role_id === null) {
                                            [].forEach.call(options, function (option) {
                                                if (parseInt(option.value) === 9) {
                                                    option.setAttribute('selected', 'selected');
                                                }
                                            });
                                        }
                                        [].forEach.call(options, function (option) {
                                            if (parseInt(option.value) === parseInt(role_id)) {
                                                option.setAttribute('selected', 'selected');
                                            }
                                        });
                                        // role_select.setAttribute('disabled', 'disabled');
                                    }
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
        });
    });
});