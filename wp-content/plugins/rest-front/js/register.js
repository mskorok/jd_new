var $ = jQuery.noConflict();
var app = angular.module('front', []);
app.controller('frontCtr', function ($scope) {
    $scope.register_header = window.front_header;
    $scope.register_footer = window.front_footer;
    $scope.register_content = window.front_register_content;

    var formUrl = 'wp/user/create';
    var createUrl = '/users/';
    var redirectUrl = '/front-home/';
    var recaptchaUrl = '/users/recaptcha';
    var loginUrl = front_sign_in_url;
    var loginGoogleUrl = '';
    var loginFbUrl = '';
    
    var front = {
        selectors: ['password', 'confirmPassword'],
        init: function () {
            var has_company_checkbox = document.querySelector('input[name=hasCompany]');
            if (has_company_checkbox) {
                front.show_company(has_company_checkbox);
                has_company_checkbox.addEventListener('change', function (e) {
                    front.show_company(has_company_checkbox);
                });
            }

            this.renameTitle();
        },
        autocomplete: function () {
            //
        },
        show_company: function (has_company_checkbox) {
            var has_company = has_company_checkbox.checked;
            if (has_company) {
                document.getElementById('additional_elements').classList.remove('hidden');
            } else {
                document.getElementById('additional_elements').classList.add('hidden');
            }
        },
        renameTitle: function() {
            var button = document.querySelector('button[type=submit]');
            var form = button.closest('form');
            if (form) {
                var parent = form.parentNode;
                var title = parent.querySelector('h3');
                if (title) {
                    title.textContent = 'Profile';
                }
            }
        },
        submit: function () {
            var self = this;
            var button = document.querySelector('button[type=submit]');
            var form = button.closest('form');
            if (form) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    // self.checkReCaptcha(form);Todo add after testing
                    self.send(form);//todo remove after testing
                    return false;
                })
            }
        },
        checkReCaptcha: function(form) {
            var self = this;
            var form_data = new FormData(form);
            var url = jd_rest_host + '?action=front_send_form_post_models&url=' + recaptchaUrl;

            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var error_container = document.getElementById('jd_error_container');
                            error_container.innerHTML = '';
                            var response = JSON.parse(this.response);
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
                            } else if (response.result === 'OK') {
                                console.log('OK');
                                self.send(form);
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
            xhr.send(form_data);
        },
        send: function (form) {
            jd_sanitize_checkbox(form);
            var password = form.password.value;
            var passwordConfirmed = form.confirmPassword.value;
            if (password !== passwordConfirmed) {
                alert('Password does not matched confirmation!');
                return false;
            }
            var form_data = new FormData(form);
            var url = jd_rest_host + '?action=front_send_form_post_models&url=' + createUrl;

            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var error_container = document.getElementById('jd_error_container');
                            error_container.innerHTML = '';
                            var response = JSON.parse(this.response);
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
                            } else if (response.result === 'OK') {
                                console.log('OK');
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
            xhr.open('POST', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(form_data);
        },
        reCaptcha: function() {
            var button = document.querySelector('button[type=submit]');
            if (button) {
                var div = document.createElement('div');
                div.setAttribute('id', 'recaptcha');
                div.setAttribute('data-sitekey', '6LelZRUUAAAAANUWLzSAm4mYA9osr-5ROloS0fzz');
                div.setAttribute('data-theme', 'light');
                div.classList.add('g-recaptcha');
                button.classList.add('jd-f-right');
                button.parentNode.insertBefore(div, button);
            }
        },
        setRecaptcha: function () {
            // grecaptcha.render('recaptcha', {
            //     'sitekey' : '6LelZRUUAAAAANUWLzSAm4mYA9osr-5ROloS0fzz'
            // }); //TODO uncomment after testing
        },
        auth: function () {
            if ([
                'Unauthorized'
            ].indexOf(jd_get_roles()) !== -1) {
                window.location.href = front_home_url;
            }
        },
        emailSignIn: function () {
            var link = document.getElementById('email_register');
            if (link) {
                link.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    window.location.href = loginUrl;
                })
            }
        },
        fbSignIn: function () {
            var link = document.getElementById('fb_register');
            if (link) {
                link.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    window.location.href = loginFbUrl;
                })
            }
        },
        googleSignIn: function () {
            var link = document.getElementById('google_register');
            if (link) {
                link.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    window.location.href = loginGoogleUrl;
                })
            }
        },
        powerStrength: function () {
            var selectors = this.selectors;
            [].forEach.call(selectors, function (selector) {
                var pass = document.getElementById(selector);
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
            })
        },
        getForm: function () {
            var url = jd_rest_host + '?action=front_form_get&method=GET&url=' + formUrl;
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            $('#plugin_create_container').html(this.response);
                            front.init();
                            front.autocomplete();
                            front.submit();
                            front.reCaptcha();
                            front.powerStrength();
                            front.setRecaptcha();

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
    };
    $scope.$on('$includeContentLoaded', function (event, templateName) {
        if (templateName.indexOf('header') !== -1) {
            front_auth.menuSwitch();
        }
        if (templateName.indexOf('content.html') !== -1) {
            front.getForm();
            front.emailSignIn();
            front.fbSignIn();
            front.googleSignIn();
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
        //
    });

});

document.addEventListener('DOMContentLoaded', function () {
    //
});