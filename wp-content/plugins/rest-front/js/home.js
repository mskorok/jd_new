var $ = jQuery.noConflict();
var app = angular.module('front', []);
app.controller('frontCtr', function ($scope) {
    $scope.home_header = window.front_header;
    $scope.home_footer = window.front_footer;
    $scope.home_content = window.front_home_content;
    var front = {
        bestDestinations: [
            'zagorochoria',
            'thessaloniki',
            'santorini',
            'meteora',
            'karpenisi',
            'ioannina',
            'heraklion',
            'chania',
            'chalkidiki',
            'athens',
            'agios-nikolaos'
        ],
        getBest: function () {
            var self = this;
            var el;
            var url = front_wp_host + '?action=front_send_form_post_models&url=/products/best';
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            var counts = response['count'];
                            if (counts) {
                                [].forEach.call(counts, function (count) {
                                    if (self.bestDestinations.indexOf(count['destination'].toLowerCase()) !== -1) {
                                       el = document.getElementById(count['destination'].toLowerCase());
                                       if (el) {
                                           el.textContent = count['count'];
                                       }
                                    }
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
            xhr.open('POST', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send();
        },
        setHeader: function (){
            var container = document.getElementById('header_container');
            if (container) {
                var div = document.createElement('div');
                div.classList.add('search-motto');
                div.innerHTML = 'YOUR <span class="search-motto-hard">JOURNEY</span> IN GREECE BEGINS HERE\n' +
                    '                <div class="search-motto-small">\n' +
                    '                    Book an Activity, Live an Experience\n' +
                    '                </div>\n' +
                    '                <form action="" class="header-search" id="header_search">\n' +
                    '                    <input type="text" name="place" class="header-search-text-input" placeholder="Where would you like to go?" autocomplete="off">\n' +
                    '                    <input type="submit" value="">\n' +
                    '                    <div class="row advance-search">\n' +
                    '                        <a href="javascript:void 0" id="product_list_page">View All Destinations <i class="fa fa-arrow-right" aria-hidden="true"></i></a>\n' +
                    '                    </div>\n' +
                    '                    <div class="row advance-search hidden">\n' +
                    '                        <input type="checkbox" name="advanceSearch" id="advanceSearch" value="off"> Advance search<br>\n' +
                    '                    </div>\n' +
                    '                    <div class="row advance-filters hidden">\n' +
                    '                        <div class="col-md-6 col-xs-12">\n' +
                    '                            <select name="type" id="type">\n' +
                    '                                <option value="" disabled="" selected="">What is your travelling purpose?</option>\n' +
                    '                                <option value="1">Tour</option>\n' +
                    '                                <option value="2">Activity</option>\n' +
                    '                                <option value="3">Package Tour</option>\n' +
                    '                                <option value="4">Sailing Multi Day Tour</option>\n' +
                    '                                <option value="5">Sailing Tour</option>\n' +
                    '                            </select>\n' +
                    '                        </div>\n' +
                    '                        <div class="col-md-6 col-xs-12">\n' +
                    '                            <select name="category" id="category">\n' +
                    '                                <option value="" disabled="" selected="">Specify an activity category?</option>\n' +
                    '                                <option value="1">Nature</option>\n' +
                    '                                <option value="2">Cultural</option>\n' +
                    '                                <option value="3">Adventure</option>\n' +
                    '                                <option value="4">Ecotourism</option>\n' +
                    '                                <option value="5">Gastronomy</option>\n' +
                    '                                <option value="6">History</option>\n' +
                    '                                <option value="7">Mountain Adventure</option>\n' +
                    '                                <option value="8">Relaxing</option>\n' +
                    '                                <option value="9">River Adventure</option>\n' +
                    '                                <option value="10">Sea Adventure</option>\n' +
                    '                            </select>\n' +
                    '                        </div>\n' +
                    '                    </div>\n' +
                    '                </form>';
                container.appendChild(div);
            }
        },
        list: function () {
            var link = document.getElementById('product_list_page');
            if (link) {
                link.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    ev.preventDefault();
                    window.location.href = front_product_list_url;
                });
            }
        }
    };
    angular.element(document).ready(function () {
        $scope.$on('$includeContentLoaded', function (event, templateName) {
            if (templateName.indexOf('header') !== -1) {
                front.setHeader();
                var form = document.getElementById('header_search');
                if (form) {
                    form.addEventListener('submit', function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        var place = form.place.value;
                        window.location.href = '/front-product-list?place=' + place;
                        return false;
                    })
                }
                front_auth.menuSwitch();
                // $scope.testVar = 'ØØØØØØØ';TODO remove after testing
                // var func = function(){
                //     $scope.testVar = 'ZZZZCCCCCDDDDOOOOO';
                // };
                // setTimeout(func(), 4000);
            }
            if (templateName.indexOf('content.html') !== -1) {
                front.getBest();
                front.list();
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
    });
});