/**
 *
 * @param name
 * @param url
 * @returns {*}
 */
function getParameterByNameFront(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

var jourdayProviderId = 13;//TODO remove in production

var front_backpack = {
    uri: '/subscriptions/unregistered/add',
    listUrl: '/front-product-list',
    getData: function () {
        var backpack = localStorage.getItem('backpack');
        return JSON.parse(backpack);
    },
    isObject: function (val) {
        if (val === null) {
            return false;
        }
        return typeof val === 'function' || typeof val === 'object';
    },
    subscribe: function (form) {
        var url = jd_rest_host + '?action=front_send_form_post_models&method=POST&url=' + this.uri;
        var xhr = new XMLHttpRequest();
        var form_data = new FormData(form);
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        console.log('r', this.response);
                        alert('Subscribed');
                    } catch (e) {
                        console.log('error', e);
                    }
                } else {
                    console.log('error response', this.response);
                }
            }
        };
        xhr.open('POST', url, true);
        xhr.send(form_data);
    }
};



var onloadCallback = function() {
    //
};

var front_auth = {
    frontHome: '/front-home',
    frontLogin: '/front-sign-in',
    frontRegister: '/front-register',
    frontPayment: '/front-purchase',
    frontAddToCard: '/front-add-to-card',
    notAllowedUrls: [
        // 'front-product-list',
        // 'front-product',
        // 'front-add-to-card',
        // 'front-purchase',
        // 'front-profile',
        // 'front-approval',
        'front-product-search'
    ],
    logout: function () {
        var el = document.getElementById('front_logout');
        if (el) {
            el.addEventListener('click', function (ev) {
                ev.stopPropagation();
                front_auth.remove_cookies();
                localStorage.removeItem('front_user');
                window.location.reload();
            })
        }
    },
    check_auth: function () {
        var self = this;
        window.rest_user_id = null;
        var cookies = rest_auth.get_cookies(), current_url = window.location.href;
        if (typeof cookies === 'object' && Object.keys(cookies).length > 0) {
            console.log('logged in');
            window.rest_user_role = cookies['rest_user_role'];
            window.rest_user_full_name = cookies['rest_user_full_name'];
            window.rest_user_id = cookies['rest_user_id'];
            window.rest_user_token = cookies['rest_user_token'];
            window.rest_bookings_count = cookies['rest_bookings_count'];
            if (current_url.indexOf(this.frontLogin) !== -1
                || current_url.indexOf(this.frontRegister) !== -1
            ) {
                window.location.href = this.frontHome;
            }
        } else {
            console.log('not logged');
        }

        this.notAllowedUrls.forEach(function (url) {
            if (current_url.indexOf(url) !== -1) {
                console.log('not logged');
                window.location.href = self.frontLogin;
            }
        });
    },
    get_cookies: function () {
        var parsed = {};
        if (this.get_cookie('rest_user_role') !== '') {
            parsed.rest_user_role = this.get_cookie('rest_user_role');
        }
        if (this.get_cookie('rest_bookings_count') !== '') {
            parsed.rest_bookings_count = this.get_cookie('rest_bookings_count');
        }
        if (this.get_cookie('rest_user_id') !== '') {
            parsed.rest_user_id = this.get_cookie('rest_user_id');
        }
        if (this.get_cookie('rest_user_token') !== '') {
            parsed.rest_user_token = this.get_cookie('rest_user_token');
        }
        if (this.get_cookie('rest_user_full_name') !== '') {
            parsed.rest_user_full_name = this.get_cookie('rest_user_full_name');
        }
        if (this.get_cookie('front_user') !== '') {
            parsed.front_user = this.get_cookie('front_user');
        }
        return parsed;
    },
    set_cookie: function (name, value, days) {
        var d = new Date();
        d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
        var expires = "expires=" + d.toUTCString();
        if (days) {
            document.cookie = name + "=" + value + ";" + expires + ";path=/";
        } else {
            document.cookie = name + "=" + value + ";path=/";
        }

    },
    get_cookie: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    },
    eraseCookie: function (name) {
        this.set_cookie(name, '', -1);
    },
    login: function (name, password, remember) {
        remember = remember || null;
        var self = this;//TODO add headers with password and name
        var url = jd_rest_host + '?action=front_send_form_post_models&method=POST&url=' + front_login_post_url;
        var xhr = new XMLHttpRequest();
        var form_data = new FormData();
        form_data.append('username', name);
        form_data.append('password', password);
        form_data.append('Authorization', 'Basic ' + btoa(name + ":" + password));
        xhr.onload = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    try {
                        var response = JSON.parse(this.response);
                        self.set_cookies(response, remember);
                        window.location.href = self.frontHome;
                    } catch (e) {
                        console.log('error', e);
                    }
                } else {
                    console.log('error response', this.response);
                }
            }
        };
        xhr.open('POST', url, true);
        xhr.send(form_data);

    },
    set_cookies: function (response, remember) {
        var expires = remember ? 90 : 0;
        if (typeof response.data !== 'undefined' && typeof response.data.role !== 'undefined') {
            this.set_cookie('rest_user_role', response.data.role, expires);
        }
        if (typeof response.data !== 'undefined' && typeof response.data.bookings !== 'undefined') {
            this.set_cookie('rest_bookings_count', response.data.bookings, expires);
        }
        if (typeof response.data !== 'undefined' && typeof  response.data.token !== 'undefined') {
            this.set_cookie('rest_user_token', response.data.token, expires);
        }
        if (typeof response.data !== 'undefined' && typeof  response.data.user.id !== 'undefined') {
            this.set_cookie('rest_user_id', response.data.user.id, expires);
        }
        if (typeof response.data !== 'undefined' && typeof  response.data.user.id !== 'undefined') {
            var name = response.data.user.firstName + ' ' + response.data.user.lastName;
            this.set_cookie('rest_user_full_name', name, expires);
        }
        if (typeof response.data !== 'undefined' && typeof  response.data.user !== 'undefined') {
            var user = JSON.stringify(response.data.user);
            this.set_cookie('front_user', user, expires);
            localStorage.setItem('front_user', user);
        }
    },
    remove_cookies: function () {
        this.eraseCookie('rest_user_role');
        this.eraseCookie('rest_user_id');
        this.eraseCookie('rest_user_token');
        this.eraseCookie('rest_user_full_name');
        this.eraseCookie('front_user');
        localStorage.removeItem('front_user');
    },
    get_token: function () {
        return this.get_cookie('rest_user_token');
    },
    authorized: function () {
        var id = this.get_cookie('rest_user_id');
        return id !== '';
    },
    auth_id: function () {
        var id = front_auth.get_cookie('rest_user_id');
        return id === '' ? null : id;
    },
    hasBookings: function () {
        return typeof window.rest_bookings_count !== 'undefined'
            && window.rest_bookings_count !== ''
            && window.rest_bookings_count !== null
            && parseInt(window.rest_bookings_count) > 0;
    },
    menuSwitch: function () {
        $('#nav-icon1').click(function () {
            $(this).toggleClass('open');
            setTimeout(function () {
                $('.hdn').toggleClass('unvisible')
            }, 0);
            $('.sub-menu').css('display', 'none');
        });

        $.each($('nav #primary-menu').children(), function (i, el) {
            if (i > 1) {
                $(el).addClass('hdn');
                $(el).addClass('unvisible');
            }
        })
    }
};
front_auth.check_auth();
document.addEventListener('DOMContentLoaded', function () {
    // front_auth.logout();
});