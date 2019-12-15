var $ = jQuery.noConflict();
var app = angular.module('front', []);
app.controller('frontCtr', function ($scope) {
    $scope.product_list_header = window.front_header;
    $scope.product_list_footer = window.front_footer;
    $scope.product_list_content = window.front_product_list_content;
    var front = {
        limit: 5,
        offset: 0,
        cnt: 0,
        createTemplate: function (item) {
            var div = document.createElement('div');
            div.setAttribute('class', 'row');
            var product = item['Product'];
            var availability = item['ProductAvailability'];
            var city = item['City'];
            var country = item['Country'];
            var category = item['Category'];
            var type = item['Type'];
            var start = item['Start'];
            var image = item['Image'];
            var info = item['Info'];
            var overview = item['overview'];
            var tags = item['Tags'];
            var tagHtml = '';
            [].forEach.call(tags, function (tag) {
                tagHtml += '<li class="tag-cultural">' + tag['name'] + ',</li>\n'
            });

            overview = overview ? overview.substring(0, 30) + '...' : '';
            var url = '';
            if (image['id'] !== null && image['id'] !== 'null') {
                url = front_rest_host + image['path'] + image['fileName'];
            }
            var operatedBy = 'Operated by Partner';
            var providerColor = 'partner';
            if (parseInt(product['id']) === jourdayProviderId) {
                operatedBy = 'Operated by Jourday';
                providerColor = 'jourday'
            }
            var instantBooking = '';
            if (parseInt(availability['instantBooking']) === 1) {
                instantBooking = '<span class="travel_bite-item-instant">' +
                    ' <i class="fa fa-rocket fa-2x" aria-hidden="true"></i></span> Instant Booking';
            }


            div.innerHTML = '<div class="col-md-12 ">\n' +
                '                            <div class="travel_bite-item-wrapper row">\n' +
                '                                <div class="travel_bite-item-image col-sm-4"\n' +
                '                                     style="background:url(' + url + ') no-repeat center center transparent">\n' +
                '                                    <!-- <img src="https://jourday.com/wp-content/uploads/2017/01/DSC05405_Caves-Meteora-Large.jpg"> -->\n' +
                '                                    <div class="travel_bite-item-overlay">\n' +
                '                                        <div class="row">\n' +
                '                                            <div class="col-xs-12 mbot10">\n' +
                '                                                <img src="https://jourday.com/wp-content/themes/jourday/imgs/excursion-type.png">\n' +
                '                                                ' + category['name'] + '\n' +
                '                                            </div>\n' +
                '                                            <div class="col-xs-12 mbot10">\n' +
                '                                                <img src="https://jourday.com/wp-content/themes/jourday/imgs/duration.png">\n' +
                '                                                Duration: ' + start['duration'] + ' ' + start['durationType'] + '\n' +
                '                                            </div>\n' +
                '                                            <div class="col-xs-12 mbot10">\n' +
                '                                                <i class="fa fa-users fa-2x" aria-hidden="true"></i> Group: ' + availability['personsPerGroup'] + '\n' +
                '                                            </div>\n' +
                '\n' +
                '                                            <div class="col-xs-12 travel_bite-item-instant-wrapper">\n' +
                '\n' +
                '                                            </div>\n' +
                '                                        </div>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                                <div class="col-sm-8">\n' +
                '                                    <div class="travel_bite-item-price-wrapper">\n' +
                '\n' +
                '\n' +
                '                                        <span class="travel_bite-item-price">€' + availability['adultPrice'] + '\t\t\t\t\t\t</span><br><span\n' +
                '                                            class="adult-indicator">adult</span>\n' +
                '                                    </div>\n' +
                '\n' +
                '                                    <a href="' + front_product_url + '?id=' + product.id + '&affiliate-slug="\n' +
                '                                       class="travel_bite-item-title">' + product['name'] + '</a>\n' +
                '\n' +
                '                                    <div class="travel_bite-item-subtitle">\n' +
                '                                        <i class="fa fa-shield fa-lg ' + providerColor + '" aria-hidden="true"></i> ' + operatedBy + '\n' +
                 instantBooking +
                '                                    </div>\n' +
                '                                    <div class="travel_bite-item-info">\n' +
                '                                        <a href="#" class="travel-bite-favorite post-2085" data-id="2085" data-cb="inline">\n' +
                '                                            <i class="fa fa-heart-o"></i><span class="travel_favorites">Add to favorites</span>\n' +
                '                                        </a>\n' +
                '                                    </div>\n' +
                '                                    <div class="travel_bite-item-excerpt">' + overview + '\n' +
                '                                    </div>\n' +
                '                                    <ul class="inline-list travel_bite-item-tags">\n' + tagHtml +
                '                                    </ul>\n' +
                '                                    <div class="travel_bite-button-wrapper">' +
                '                                    <a class="results-book-button"\n' +
                '                                         href="' + front_product_url + '?id=' + product.id + '&affiliate-slug=">Get\n' +
                '                                        your tickets</a></div>\n' +
                '\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>';

            return div;
        },
        getList: function () {
            var self = this;
            var place = getParameterByNameFront('place');
            var country = getParameterByNameFront('country');
            var city = getParameterByNameFront('city');
            var category = getParameterByNameFront('category');
            var type = getParameterByNameFront('type');
            var container = document.getElementById('search_loop');
            var url = front_wp_host + '?action=front_send_form_post_models&url=/products/front';
            var formData = new FormData();
            formData.append('place', place);
            formData.append('country', country);
            formData.append('city', city);
            formData.append('category', category);
            formData.append('type', type);
            formData.append('offset', this.offset.toString());
            formData.append('limit', this.limit.toString());
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            var list = response['front'];

                            if (list && container) {
                                container.innerHTML = '';
                                [].forEach.call(list, function (item) {
                                    if (typeof item['cnt'] !== 'undefined') {
                                        self.cnt = item['cnt'];
                                    }
                                    var html = self.createTemplate(item);
                                    container.appendChild(html);
                                });
                                var counted = document.getElementById('all_count');
                                if (counted) {
                                    counted.textContent = self.cnt.toString();
                                }
                                var previous = document.getElementById('list_previous');
                                if (previous) {
                                    if (self.offset < self.limit) {
                                        previous.classList.add('hidden');
                                    } else {
                                        previous.classList.remove('hidden');
                                    }
                                }

                                var next = document.getElementById('list_next');
                                if (next) {
                                    if (self.offset + self.limit >= self.cnt) {
                                        next.classList.add('hidden');
                                    } else {
                                        next.classList.remove('hidden');
                                    }
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
            xhr.open('POST', url, true);
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
            xhr.send(formData);
        },
        setHeader: function () {
            var container = document.getElementById('header_container');
            if (container) {
                var div = document.createElement('div');
                div.classList.add('row');
                div.innerHTML = '<div class="col-md-12">\n' +
                    '<div class="archive-title fittext">' + $scope.searchTitle + '</div>\n' +
                    '</div>';
                container.appendChild(div);
            }
        },
        setTypeFilter: function () {
            var url = front_wp_host + '?action=front_form_get&url=/activity-types';
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            // console.log(this.response);
                            var response = JSON.parse(this.response);
                            if (typeof response.activitiesTypes !== 'undefined') {
                                var container = document.getElementById('type_filter');
                                if (container) {
                                    container.innerHTML = '';
                                    [].forEach.call(response.activitiesTypes, function (item) {
                                        var input = document.createElement('input');
                                        input.setAttribute('type', 'radio');
                                        input.setAttribute('name', 'type');
                                        input.setAttribute('value', item.id);
                                        var label = document.createElement('span');
                                        label.textContent = ' ' + item.name;
                                        var br = document.createElement('br');
                                        container.appendChild(input);
                                        container.appendChild(label);
                                        container.appendChild(br);
                                    })
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
        },
        setCategoryFilter: function () {
            var url = front_wp_host + '?action=front_form_get&url=/activity-categories';
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            if (typeof response.activityCategories !== 'undefined') {
                                var container = document.getElementById('category_filter');
                                if (container) {
                                    container.innerHTML = '';
                                    [].forEach.call(response.activityCategories, function (item) {
                                        var input = document.createElement('input');
                                        input.setAttribute('type', 'radio');
                                        input.setAttribute('name', 'type');
                                        input.setAttribute('value', item.id);
                                        var label = document.createElement('span');
                                        label.textContent = ' ' + item.name;
                                        var br = document.createElement('br');
                                        container.appendChild(input);
                                        container.appendChild(label);
                                        container.appendChild(br);
                                    })
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
        },
        increase_offset: function() {
            this.offset += this.limit;
        },
        decrease_offset: function() {
            this.offset -= this.limit;
            if (this.offset < this.limit) {
                this.offset = 0;
            } else {
                this.offset -= this.limit;
            }
        }
    };
    angular.element(document).ready(function () {
        var searchTitle = getParameterByNameFront('place');
        $scope.searchTitle = searchTitle ? searchTitle : '';
        $scope.$on('$includeContentLoaded', function (event, templateName) {
            if (templateName.indexOf('header') !== -1) {
                front.setHeader();
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
                front.setTypeFilter();
                front.setCategoryFilter();
                var form = document.getElementById('filter-bites');
                if (form) {
                    form.addEventListener('submit', function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        var place = getParameterByNameFront('place');

                        var type = form.type.value;
                        var category = form.category.value;
                        if (!place) {
                            place = form.place.value;
                        }

                        var uri = 'category=' + category + '&type=' +
                            type + '&place=' + place + '&offset=' + front.offset + '&limit=' + front.limit;
                        console.log('uri', uri);
                        window.location.href = '/front-product-list?' + uri;
                        return false;
                    });
                }
                var previous = document.getElementById('list_previous');
                if (previous) {
                    previous.classList.add('hidden');
                    previous.addEventListener('click', function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        front.decrease_offset();
                        front.getList();
                    })
                }
                var next = document.getElementById('list_next');
                if (next) {
                    next.classList.add('hidden');
                    next.addEventListener('click', function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        front.increase_offset();
                        front.getList();
                    })
                }
                front.getList();
            }
        });
    });
});