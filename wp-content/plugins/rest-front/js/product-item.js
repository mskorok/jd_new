var $ = jQuery.noConflict();
var app = angular.module('front', []);
app.controller('frontCtr', function ($scope) {
    $scope.product_header = window.front_header;
    $scope.product_footer = window.front_footer;
    $scope.product_content = window.front_product_content;
    var redirectUrl = front_product_list_url;
    var front = {
        has_header: false,
        has_content: false,
        has_nearby: false,
        header_added: false,
        content_added: false,
        nearby_added: false,
        item_loaded: false,
        nearby_loaded: false,
        calendar_loaded: false,
        days: {
            date: "2018-09-28",
            badge: false,
            title: "Available Day!",
            classname: "available-day"
        },
        date: null,
        item: null,
        nearBy: null,
        calendarData: null,
        backpackData: null,
        nearbyContainer: 'nearby_container',
        headerContainer: 'header_container',
        contentContainer: 'content_container',
        calendarContainer: 'calendar_container',
        redirect: function() {
            var id = getParameterByNameFront('id');
            if (id === null || id === '') {
                var body = document.querySelector('body');
                if (body) {
                    body.classList.add('hidden');
                }
                window.location.href = redirectUrl;
            }
        },
        getNearByData: function() {
            var city = this.item['City']['id'];
            var self = this;
            var place = getParameterByNameFront('place');
            var url = front_wp_host + '?action=front_send_form_post_models&url=/products/front';
            var formData = new FormData();
            if (place) {
                formData.append('place', place);
            }
            formData.append('city', city);
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            self.nearBy = JSON.parse(this.response);
                            self.nearby_loaded = true;
                            var event = new Event('nearby_loaded');
                            document.dispatchEvent(event);
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
        getCalendarDate: function () {
            var self = this;
            var item = this.item;
            var productId = item['Product']['id'];
            var start = item['Start'][0];

            var duration = start['duration'];
            var durationType = start['durationType'];
            var diff = 0;
            if (durationType === 'day') {
                diff = parseInt(duration) * 86400;
            } else if (durationType === 'hour') {
                diff = parseInt(duration) * 3600;
            }

            var startDate = new Date();

            var time = start['time'];
            if (typeof time === 'string' && time.indexOf(':') !== -1 ) {
                var hours = time.split(':');
                startDate.setHours(parseInt(hours[0]));
                startDate.setMinutes(parseInt(hours[1]));
                startDate.setSeconds(parseInt(hours[2]));
            }

            var startTime = Math.round(startDate.getTime() / 1000);
            var endTime = startTime + diff;
            var data = [];
            var obj;
            for (var i = 0; i < 366; i++) {
                var current_start_date_time = startTime + 86400 * i;
                var current_start_date = new Date(current_start_date_time * 1000);
                var current_end_date_time = endTime + 86400 * i;
                var current_end_date = new Date(current_end_date_time * 1000);
                obj = {
                    'productId': productId,
                    'startDate': current_start_date.toISOString().split('T').shift(),
                    'endDate': current_end_date.toISOString().split('T').shift()
                };
                data.push(obj);
            }
            data = JSON.stringify(data);
            var url = front_wp_host + '?action=front_send_form_post_models&url=/booking/date/availabilities';
            var formData = new FormData();
            formData.append('data', data);

            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            self.calendarData = JSON.parse(this.response);
                            self.calendar_loaded = true;
                            var event = new Event('calendar_loaded');
                            document.dispatchEvent(event);


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
        createHeader: function (item) {
            var div = document.createElement('div');
            div.setAttribute('class', 'row');
            var product = item['Product'];
            var availability = item['ProductAvailability'];
            var city = item['City'];
            var country = item['Country'];
            var category = item['Category'];
            var type = item['Type'];
            var start = item['Start'];
            if (typeof start[0] !== 'undefined') {
                start = start[0];
            } else {
                start['duration'] = '';
                start['durationType'] = '';
            }
            var image = item['Image'];
            var info = item['Info'];
            var overview = item['overview'];
            var tags = item['Tags'];
            var reviewCount = item['ReviewCount'];
            var tagHtml = '';
            var blockedDates = item['BlockedDates'];
            [].forEach.call(tags, function (tag) {
                tagHtml += '<li class="tag-cultural">' + tag['name'] + ',</li>\n'
            });
            overview = overview.substring(0, 30) + '...';
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
                instantBooking = '<div class="booking-type">' +
                    '<i class="fa fa-rocket" aria-hidden="true"></i> Instant Booking</div>\n';
            }
            var reviewCountContainer = document.getElementById('comment_count');
            if (reviewCountContainer) {
                reviewCountContainer.textContent = reviewCount;
            }
            var calendarAdultPrice = document.getElementById('calendar_adult_price');
            if (calendarAdultPrice) {
                calendarAdultPrice.textContent = availability['adultPrice'];
            }

            var calendarChildPrice = document.getElementById('calendar_child_price');
            if (calendarChildPrice) {
                calendarChildPrice.textContent = availability['childPrice'];
            }

            var calendarStudentPrice = document.getElementById('calendar_student_price');
            if (calendarStudentPrice) {
                calendarStudentPrice.textContent = availability['studentPrice'];
            }


            div.innerHTML = '<div class="col-md-12">\n' +
                '                        <div class="header-post-title">' + product['name'] + '</div>\n' +
                '                        <div class="header-post-meta">\n' +
                '                            <div class="header-comments-counter">' + reviewCount + '</div>\n' +
                '                            <div>\n' +
                '                                <ul class="inline-list header-tags">' + tagHtml + '</ul>\n' +
                '                            </div>\n' +
                '                            <div class="header-duration">\n' +
                '                                <i class="fa fa-clock-o"></i>' +
                ' Starting time: ' + start['time'] + ' - Duration: ' + start['duration'] + ' ' + start['durationType'] + '\t\t\t\t\t\t\t\t\t</div>\n' +
                instantBooking +
                '                            <div class="header-duration">\n' +
                '                                <i class="fa fa-shield fa-lg ' + providerColor + '"' +
                '                                     aria-hidden="true"></i>' + operatedBy + '\n' +
                '                            </div>\n' +
                '                            <!-- <a href="#" class="header-map-link"><i class="fa fa-map"></i></a> -->\n' +
                '                        </div>\n' +
                '                    </div>';

            return div;
        },
        addComment: function (form) {
            var url = front_wp_host + '?action=front_send_form_post_models&url=/reviews';
            var formData = new FormData(form);
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var responce = JSON.parse(this.response);
                            if (responce.result === 'OK') {
                                console.log('OK');
                                window.location.reload();
                            } else {
                                alert('Something went wrong, review not saved')
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
        openCommentForm: function () {
            var self = this;
            $('.add-a-review-button').on('click', function(event) {
                event.preventDefault();
                $('.comment-form-wrapper').toggleClass('hidden');
            });
            var el;
            if (front_auth.hasBookings()) {
                var id = front_auth.auth_id();
                el = document.getElementById('comment_form');
                var form = document.getElementById('Comments_form');
                if (form) {
                    form.user_id.value = id;
                    form.addEventListener('submit', function (ev) {
                        ev.stopPropagation();
                        ev.preventDefault();
                        self.addComment(form);
                    })
                }
            } else {
                el = document.getElementById('no_bookings');
            }
            if (el) {
                el.classList.remove('hidden');
            }

        },
        createComments: function (item) {
            var self = this;
            var reviewCount = item['ReviewCount'];
            this.openCommentForm();
            var no_comment = document.getElementById('no_comment_container');
            if (parseInt(reviewCount) > 0) {
                if (no_comment) {
                    no_comment.classList.add('hidden');
                }
                var comment_title = document.getElementById('comment_title_container');
                if (comment_title) {
                    comment_title.classList.remove('hidden');
                }
                var comment_container = document.getElementById('comment_container');
                if (comment_container) {
                    comment_container.classList.remove('hidden');
                    var reviews = item['Review'];
                    var users = item['ReviewUsers'];


                    [].forEach.call(reviews, function (review) {
                        var div = document.createElement('div');
                        div.setAttribute('class', 'comment-item');
                        comment_container.appendChild(div);
                        var comment = self.createComment(review, users);
                        div.appendChild(comment);
                    });
                }
            } else {
                if (no_comment) {
                    no_comment.classList.remove('hidden');
                }
            }
        },
        createComment: function (review, users) {
            var id = review['id'];
            var user = users['user'][id];
            var city = users['city'][id]['name'];
            var bookings = users['booking'][id];
            var div = document.createElement('div');
            div.classList.add('row');
            div.innerHTML = '                            <div class="col-sm-3">\n' +
                '                                <div class="comment-profile-picture-wrapper">\n' +
                '                                    <img class="comment-profile-picture" src="">\n' +
                '                                    <div class="profile-travel-bites-count-wrapper">\n' +
                '                                        <span class="profile-travel-bites-count">' + bookings + '</span> BITES\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                                <div class="comment-profile-name">' + user['firstName'] + ' ' + user['lastName'] + '</div>\n' +
                '                                <div class="comment-profile-location">' + city + '</div>\n' +
                '                            </div>\n' +
                '                            <div class="col-sm-9">\n' +
                // '                                <div class="review-rating-wrapper">\n' +
                // '                                    <i class="fa fa-star" aria-hidden="true"></i>\n' +
                // '                                    <i class="fa fa-star" aria-hidden="true"></i>\n' +
                // '                                    <i class="fa fa-star" aria-hidden="true"></i>\n' +
                // '                                    <i class="fa fa-star" aria-hidden="true"></i>\n' +
                // '                                    <i class="fa fa-star" aria-hidden="true"></i>\n' +
                // '                                    5 out of 5\n' +
                // '                                </div>\n' +
                '                                <div class="comment-content">\n' +
                '                                    <p>' + review['text'] + '</p>\n' +
                '                                </div>\n' +
                '                            </div>';
            return div;
        },
        createContent: function (item) {
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
            var reviewCount = item['ReviewCount'];
            var tagHtml = '';
            var blockedDates = item['BlockedDates'];
            var languages = item['Languages'];
            var level = item['PhysicalLevel'];
            var langs = '';

            [].forEach.call(languages, function (lang) {
                langs += lang['name'] + ', ';
            });
            langs = langs.substring(0, langs.length - 2);
            var amenitiesAdd = item['AmenitiesAdd'];
            var add = '';
            [].forEach.call(amenitiesAdd, function (item) {
                add += item['name'] + ', ';
            });
            add = add.substring(0, add.length - 2);
            var amenitiesRemove = item['AmenitiesRemove'];
            var remove = '';
            [].forEach.call(amenitiesRemove, function (item) {
                remove += item['name'] + ', ';
            });
            remove = remove.substring(0, remove.length - 2);
            [].forEach.call(tags, function (tag) {
                tagHtml += '<li class="tag-cultural">' + tag['name'] + ',</li>\n'
            });
            overview = overview.substring(0, 30) + '...';
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
                instantBooking = '<div class="booking-type">' +
                    '<i class="fa fa-rocket" aria-hidden="true"></i> Instant Booking</div>\n';
            }

            var images = item['Images'];
            var lic = '';
            var cimg = '';
            var j = 0;
            [].forEach.call(images, function (img) {
                if (j === 0) {
                    lic += '<li data-target="#carousel-example-generic" data-slide-to="' + j + '" class="active"></li>';
                    cimg += '<div class="item active"><img src="' + front_rest_host + img['path'] + img['fileName'] + '"></div>';
                } else {
                    lic += '<li data-target="#carousel-example-generic" data-slide-to="' + j + '"></li>';
                    cimg += '<div class="item"><img src="' + front_rest_host + img['path'] + img['fileName'] + '"></div>';
                }
                j++;
            });

            var hideSlider = images.length < 1 ? 'hidden' : '';


            div.innerHTML = '<div class="page-title">Overview</div>\n' +
                '            <p>' + overview + '</p>\n' +
                '            <div class="page-content travel-bite-content">\n' +
                '\n' +
                '                <div class="travel-bite-excerpt"><p>' + info['tourHighlights'] + '</p></div>\n' +
                '\n' +
                '\n' +
                '                <div class="travel-bite-readmore-content hidden"><p>' + info['tipsUsefulInfo'] + '</p>\n' +
                '                </div>\n' +
                '                <div class="travel-bite-readmore"><a href="javascript:void 0;">Read More</a></div>\n' +
                '\n' +
                '            </div>\n' +
                '            <div class="page-features">\n' +
                '                <h3>Tips &amp; Useful Info</h3>\n' +
                '                <div class="col-md-12">\n' +
                '                    <div class="page-feature">\n' +
                '                        <div class="page-feature-symbol col-xs-1">\n' +
                '                            <i class="fa fa-map-marker"></i>\n' +
                '                        </div>\n' +
                '                        <div class="page-feature-content col-xs-11">\n' +
                '                            <span class="strong">Starting point: </span>\n' +
                '                            ' + info['startingPoint'] + '\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="col-md-12">\n' +
                '                    <div class="page-feature">\n' +
                '                        <div class="page-feature-symbol col-xs-1">\n' +
                '                            <i class="fa fa-comments-o"></i>\n' +
                '                        </div>\n' +
                '                        <div class="page-feature-content col-xs-11">\n' +
                '                            <span class="strong">Languages: </span>\n' +
                '                            ' + langs + '\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="col-md-12">\n' +
                '                    <div class="page-feature">\n' +
                '                        <div class="page-feature-symbol col-xs-1">\n' +
                '                            <i class="fa fa-plus-square"></i>\n' +
                '                        </div>\n' +
                '                        <div class="page-feature-content col-xs-11">\n' +
                '                            <span class="strong">Included Amenities: </span>\n' +
                '                            ' + add + '\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="col-md-12">\n' +
                '                    <div class="page-feature">\n' +
                '                        <div class="page-feature-symbol col-xs-1">\n' +
                '                            <i class="fa fa-minus-square"></i>\n' +
                '                        </div>\n' +
                '                        <div class="page-feature-content col-xs-11">\n' +
                '                            <span class="strong">Excluded Amenities: </span>\n' +
                '                            ' + remove + '\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="col-md-12">\n' +
                '                    <div class="page-feature">\n' +
                '                        <div class="page-feature-symbol col-xs-1">\n' +
                '                            <i class="fa fa-users"></i>\n' +
                '                        </div>\n' +
                '                        <div class="page-feature-content col-xs-11">\n' +
                '                            <span class="strong">Minimum number of guests needed: </span>\n' +
                '                            ' + info['minGuests'] + '\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="col-md-12">\n' +
                '                    <div class="page-feature">\n' +
                '                        <div class="page-feature-symbol col-xs-1">\n' +
                '                            <i class="fa fa-users"></i>\n' +
                '                        </div>\n' +
                '                        <div class="page-feature-content col-xs-11">\n' +
                '                            <span class="strong">Maximum number of guests: </span>\n' +
                '                            ' + info['maxGuests'] + '\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '                <div class="col-lg-12">\n' +
                '                    <div class="page-feature">\n' +
                '                        <div class="page-feature-symbol col-xs-1">\n' +
                '                            <i class="fa fa-signal"></i>\n' +
                '                        </div>\n' +
                '                        <div class="page-feature-content col-xs-11">\n' +
                '                            <span class="strong">Physical Level: </span>\n' +
                '                            ' + level['label'] + '\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div id="carousel-example-generic" class="carousel slide col-xs-12 ' + hideSlider + '" data-ride="carousel">\n' +
                '                <!-- Indicators -->\n' +
                '                <ol class="carousel-indicators">\n' + lic + '</ol>\n' +
                '\n' +
                '                <!-- Wrapper for slides -->\n' +
                '                <div class="carousel-inner" role="listbox">' + cimg + '</div>\n' +
                '\n' +
                '                <!-- Left and right controls -->\n' +
                '                <a class="left carousel-control" href="#carousel-example-generic" data-slide="prev">\n' +
                '                    <span class="glyphicon glyphicon-chevron-left"></span>\n' +
                '                    <span class="sr-only">Previous</span>\n' +
                '                </a>\n' +
                '                <a class="right carousel-control" href="#carousel-example-generic" data-slide="next">\n' +
                '                    <span class="glyphicon glyphicon-chevron-right"></span>\n' +
                '                    <span class="sr-only">Next</span>\n' +
                '                </a>\n' +
                '            </div>';

            return div;
        },
        createCalendar: function (item, container) {
            var self = this;
            var days = item['days']['availability'];
            var firstAvailableDate = new Date(days[0].date);
            $('#' + container).zabuto_calendar({
                today: true,
                show_previous: false,
                show_days: false,
                nav_icon: {
                    prev: '<i class="fa fa-angle-left"></i>',
                    next: '<i class="fa fa-angle-right"></i>'
                },
                year: firstAvailableDate.getFullYear(),
                month: firstAvailableDate.getMonth() + 1,
                data: days,
                action: function () {
                    self.clickDate(this, item);
                }
            });
        },
        clickDate: function (el, item) {
            var self = this;
            var selector = '#' + el.id;
            var id = item['Product']['id'];
            var name = item['Product']['name'];
            var hasEvent = $(selector).data('hasEvent');
            var addToBackpackButton = $('.calendar-add-to-backpack');
            var quantityControl = $('.quantity-controls-wrapper');
            var storedData = {
                id: id,
                title: name,
                product: item,
                adultSlots: 0,
                childSlots: 0,
                studentSlots: 0,
                slots: 0
            };

            if (hasEvent) {
                var date = $("#" + el.id).data('date');
                self.date = date;
                if ($(el).hasClass('selected-date')) {
                    $(el).removeClass('selected-date');
                    addToBackpackButton.data('date', '');
                    if (self.backpackData !== null) {
                        self.backpackData = null;
                    }
                    addToBackpackButton.removeClass('active');
                    quantityControl.addClass('hidden');
                } else {
                    // remove other selected dates
                    var preselectedDate = $(el).parents('table').find('.selected-date');
                    if (preselectedDate.length) {
                        $(preselectedDate).removeClass('selected-date');
                    }
                    $(el).addClass('selected-date');
                    addToBackpackButton.data('date', date);
                    storedData['date'] = date;
                    if (Array.isArray(storedData) || front_backpack.isObject(storedData)) {
                        self.backpackData = storedData;
                    }
                    addToBackpackButton.addClass('active');
                    quantityControl.removeClass('hidden');
                }
            }
        },
        getCalendar: function (container) {
            if (this.calendar_loaded) {
                var list = this.calendarData;
                var self = this;
                var item = this.item;
                if (typeof list['data']) {
                    item['days'] = list['data'];
                    self.createCalendar(item, container);
                }
            } else {
                return false;
            }
        },
        createNearby: function () {
            var self = this;
            var nearby_container = document.getElementById(this.nearbyContainer);
            if (this.nearby_loaded) {
                var list = this.nearBy['front'];
                if (list) {
                    [].forEach.call(list, function (entity) {
                        if (nearby_container) {
                            var nearby_item = self.getNearbyItem(entity);
                            nearby_container.appendChild(nearby_item);
                        }
                    })
                }
            } else {
                return false;
            }
        },
        getNearbyItem: function (item) {
            var div = document.createElement('div');
            div.setAttribute('class', 'travel-bite-nearby');
            var start = item['Start'];
            var duration = start['duration'] + ' ' + start['durationType'];
            var category = item['Category'];
            var image = item['Image'];
            var product = item['Product'];
            var city = item['City'];
            div.innerHTML = '<div class="travel-bite-nearby-thumb">\n' +
                '                                <img width="100%" src="' + front_rest_host + image['path'] + image['fileName'] + '">\n' +
                '                            </div>\n' +
                '                            <div class="travel-bite-nearby-info">\n' +
                '                                <a class="trabel-bite-nearby-title"\n' +
                '                                   href="https://jourday.com/travel_bite/meteora-rock-climbing/">\n' +
                product['name'] + ' </a>\n' +
                '                                <div class="travel-bite-nearby-meta">\n' +
                '                                    <i class="fa fa-globe"></i> ' + city['name'] + ' <i class="fa fa-clock-o"></i> ' + duration + ' <i\n' +
                '                                        class="fa fa-map-o"></i> ' + category['name'] + '\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                            <div class="clearfix"></div>';
            return div;
        },
        changeSlots: function () {
            var self = this;
            var adult_minus = document.getElementById('adult_minus');
            var adult_plus = document.getElementById('adult_plus');
            var child_minus = document.getElementById('child_minus');
            var child_plus = document.getElementById('child_plus');
            var student_minus = document.getElementById('student_minus');
            var student_plus = document.getElementById('student_plus');
            var adult_slots = document.getElementById('adult_slots');
            var student_slots = document.getElementById('student_slots');
            var child_slots = document.getElementById('child_slots');
            if (adult_minus && adult_slots) {
                adult_minus.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    var slots = adult_slots.textContent;
                    var new_slots = parseInt(slots) - 1;
                    if (new_slots < 0) {
                        new_slots = 0;
                    }
                    adult_slots.textContent = new_slots.toString();
                    if (self.countPrice() === null) {
                        adult_slots.textContent = slots.toString();
                    }

                })
            }
            if (adult_plus && adult_slots) {
                adult_plus.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    var slots = adult_slots.textContent;
                    var new_slots = parseInt(slots) + 1;
                    if (new_slots < 0) {
                        new_slots = 0;
                    }
                    adult_slots.textContent = new_slots.toString();
                    if (self.countPrice() === null) {
                        adult_slots.textContent = slots.toString();
                    }
                })
            }
            if (student_minus && student_slots) {
                student_minus.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    var slots = student_slots.textContent;
                    var new_slots = parseInt(slots) - 1;
                    if (new_slots < 0) {
                        new_slots = 0;
                    }
                    student_slots.textContent = new_slots.toString();
                    if (self.countPrice() === null) {
                        student_slots.textContent = slots.toString();
                    }
                })
            }
            if (student_plus && student_slots) {
                student_plus.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    var slots = student_slots.textContent;
                    var new_slots = parseInt(slots) + 1;
                    if (new_slots < 0) {
                        new_slots = 0;
                    }
                    student_slots.textContent = new_slots.toString();
                    if (self.countPrice() === null) {
                        student_slots.textContent = slots.toString();
                    }
                })
            }
            if (child_minus && child_slots) {
                child_minus.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    var slots = child_slots.textContent;
                    var new_slots = parseInt(slots) - 1;
                    if (new_slots < 0) {
                        new_slots = 0;
                    }
                    child_slots.textContent = new_slots.toString();
                    if (self.countPrice() === null) {
                        child_slots.textContent = slots.toString();
                    }
                })
            }
            if (child_plus && child_slots) {
                child_plus.addEventListener('click', function (ev) {
                    ev.stopPropagation();
                    var slots = child_slots.textContent;
                    var new_slots = parseInt(slots) + 1;
                    if (new_slots < 0) {
                        new_slots = 0;
                    }
                    child_slots.textContent = new_slots.toString();
                    if (self.countPrice() === null) {
                        child_slots.textContent = slots.toString();
                    }
                })
            }
        },
        getItem: function () {
            var self = this;
            var place = getParameterByNameFront('place');
            var country = getParameterByNameFront('country');
            var city = getParameterByNameFront('city');
            var category = getParameterByNameFront('category');
            var type = getParameterByNameFront('type');
            var id = getParameterByNameFront('id');
            var url = front_wp_host + '?action=front_send_form_post_models&url=/products/front';
            var formData = new FormData();
            formData.append('place', place);
            formData.append('country', country);
            formData.append('city', city);
            formData.append('category', category);
            formData.append('type', type);
            formData.append('id', id);
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            var response = JSON.parse(this.response);
                            var list = response['front'];
                            if (list) {
                                [].forEach.call(list, function (item) {
                                    self.item = item;
                                    var event = new Event('item_loaded');
                                    document.dispatchEvent(event);
                                });
                                self.getNearByData();
                                self.getCalendarDate();
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
        countPrice: function () {
            var self = this;
            var total_price = document.getElementById('total_price');
            var adult_slots = document.getElementById('adult_slots');
            if (!adult_slots) {
                throw 'adult slots not found'
            }
            adult_slots = parseInt(adult_slots.textContent);
            var student_slots = document.getElementById('student_slots');
            if (!student_slots) {
                throw 'student slots not found'
            }
            student_slots = parseInt(student_slots.textContent);
            var child_slots = document.getElementById('child_slots');
            if (!child_slots) {
                throw 'child slots not found'
            }
            child_slots = parseInt(child_slots.textContent);
            if (this.item === null) {
                throw 'Item not set!!!'
            }

            var availability = this.item['ProductAvailability'];
            var slots;
            var price;
            var adult_price;
            var student_price;
            var child_price;
            slots = adult_slots + child_slots + student_slots;
            if (slots > availability['availableSlots']) {
                alert('You choose more slots than available');
                return null;
            }
            var start = self.item['Start'][0];
            var duration = start['duration'];
            var durationType = start['durationType'];
            var diff = 0;
            if (durationType === 'day') {
                diff = parseInt(duration) * 86400;
            } else if (durationType === 'hour') {
                diff = parseInt(duration) * 3600;
            }
            var discounts = self.item['Discounts'];
            var groupDiscounts = self.item['GroupDiscounts'];
            var personsDiscounts = self.item['PersonsDiscounts'];
            var personsPerGroup = availability['personsPerGroup'];
            var groupCount = Math.floor(slots / personsPerGroup);
            var discount = 1;
            if (personsDiscounts.length !== 0) {
                [].forEach.call(personsDiscounts, function (personsDiscount) {
                    if (slots >= personsDiscount['number']
                        && discount > personsDiscount['discount']
                    ) {
                        discount = parseFloat(personsDiscount['discount']);
                    }
                });
            } else if (groupDiscounts.length !== 0 && groupCount > 0) {
                [].forEach.call(groupDiscounts, function (groupDiscount) {
                    if (groupCount >= groupDiscount['number']
                        && discount > groupDiscount['discount']
                    ) {
                        discount = parseFloat(groupDiscount['discount']);
                    }
                });
            }
            var startDate = Math.round(new Date(self.date).getTime() / 1000);
            var endDate = startDate + diff;
            var additionalDiscount = 1;
            [].forEach.call(discounts, function (disc) {
                var discountStartDate = disc['startValidityDate'];
                var discountEndDate = disc['endValidityDate'];
                discountStartDate = Math.round(new Date(discountStartDate).getTime() / 1000);
                discountEndDate = Math.round(new Date(discountEndDate).getTime() / 1000);
                if (startDate > discountStartDate && endDate < discountEndDate) {
                    additionalDiscount *= parseFloat(disc['discount']);
                }
            });
            discount *= additionalDiscount;


            if (self.backpackData === null) {
                alert('You must add date first!');
                throw 'You must add date first!'
            } else {
                self.backpackData['discount'] = discount.toFixed(2).toString();
                if (!self.backpackData.hasOwnProperty('date')) {
                    alert('You must add date first!');
                    throw 'You must add date first!'
                }
            }

            adult_price = parseFloat(availability['adultPrice']);
            child_price = parseFloat(availability['childPrice']);
            student_price = parseFloat(availability['studentPrice']);
            adult_price = adult_slots * adult_price * discount;
            child_price = child_slots * child_price * discount;
            student_price = student_slots * student_price * discount;

            price = adult_price + child_price + student_price;
            total_price.textContent = price.toFixed(2).toString();
            return {
                'price': parseFloat(price).toFixed(2),
                'adultPrice': parseFloat(adult_price).toFixed(2),
                'studentPrice': parseFloat(student_price).toFixed(2),
                'childPrice': parseFloat(child_price).toFixed(2)
            };
        },
        addHeader: function () {
            var self = this;
            if (self.has_header && self.item_loaded && !self.header_added) {
                var header_container = document.getElementById(self.headerContainer);
                if (header_container) {
                    var head = self.createHeader(self.item);
                    header_container.appendChild(head);
                    self.header_added = true;
                }
            }
        },
        addContent: function () {
            var self = this;
            if (self.has_content && self.item_loaded && !self.content_added) {
                var content_container = document.getElementById(this.contentContainer);
                if (content_container) {
                    var content = self.createContent(self.item);
                    content_container.appendChild(content)
                }
                var calendar_container = document.getElementById(this.calendarContainer);
                if (calendar_container) {
                    self.getCalendar(this.calendarContainer);
                }
                self.createNearby();
                self.createComments(self.item);
                front.changeSlots();
                self.addToBackpack();
                self.content_added = true;
            }
        },
        addToBackpack: function () {
            var self = this;
            var backpack;
            var storedData;
            var add_button = document.getElementById('add_to_backpack');
            if (add_button) {
                add_button.addEventListener('click', function (ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    var price = self.countPrice();
                    var id = self.item['Product']['id'];
                    var adultPrice = price['adultPrice'];
                    var studentPrice = price['studentPrice'];
                    var childPrice = price['childPrice'];
                    price = price['price'];
                    var adult_slots = document.getElementById('adult_slots');
                    var student_slots = document.getElementById('student_slots');
                    var child_slots = document.getElementById('child_slots');
                    adult_slots = parseInt(adult_slots.textContent);
                    child_slots = parseInt(child_slots.textContent);
                    student_slots = parseInt(student_slots.textContent);
                    var slots = adult_slots + child_slots + student_slots;

                    var index = null;
                    var affiliate = getParameterByNameFront('affiliate');
                    if (!affiliate) {
                        affiliate = getParameterByNameFront('affiliate-slug')
                    }
                    if (!affiliate) {
                        affiliate = getParameterByNameFront('aff');
                    }
                    backpack = localStorage.getItem('backpack');
                    if (self.backpackData === null) {
                        alert('You must add date first!');
                        throw 'You must add date first!'
                    } else {
                        storedData = self.backpackData;
                        storedData['finalPrice'] = price.toString();
                        storedData['adultPrice'] = adultPrice.toString();
                        storedData['childPrice'] = childPrice.toString();
                        storedData['studentPrice'] = studentPrice.toString();
                        storedData['slots'] = slots.toString();
                        storedData['adultSlots'] = adult_slots.toString();
                        storedData['childSlots'] = child_slots.toString();
                        storedData['studentSlots'] = student_slots.toString();
                        if (affiliate) {
                            storedData['affiliate'] = affiliate.toString();
                        }
                        var backpack_link = document.getElementById('backpack_link');
                        if (backpack !== '' && backpack !== null && typeof backpack !== 'undefined') {
                            backpack = JSON.parse(backpack);
                            [].forEach.call(backpack, function (entity) {
                                if (entity.id === id) {
                                    if (!entity.hasOwnProperty('date')) {
                                        alert('You must add date first!');
                                        throw 'You must add date first!'
                                    }
                                    index = backpack.indexOf(entity);
                                    backpack.splice(index, 1);
                                    index = null;
                                }
                            });
                            backpack.push(storedData);

                        } else {
                            backpack = [storedData];
                        }
                        if (backpack_link) {
                            backpack_link.textContent = backpack.length.toString();
                        }


                    }

                    if (Array.isArray(backpack) || front_backpack.isObject(backpack)) {
                        backpack = JSON.stringify(backpack);
                        localStorage.setItem('backpack', backpack);
                        alert('Product added to backpack!');
                    }
                })
            }
        }
    };
    front.redirect();
    document.addEventListener('item_loaded', function (evt) {
        front.item_loaded = true;
        front.addHeader();
        front.addContent();
    });
    document.addEventListener('nearby_loaded', function (evt) {
        front.nearby_loaded = true;
        front.createNearby();
    });
    document.addEventListener('calendar_loaded', function (evt) {
        front.calendar_loaded = true;
        var calendar_container = document.getElementById(front.calendarContainer);
        if (calendar_container) {
            front.getCalendar(front.calendarContainer);
        }
    });
    front.getItem();

    $scope.$on('$includeContentLoaded', function (event, templateName) {
        if (templateName.indexOf('header') !== -1) {
            front.has_header = true;
            front.addHeader();
            front_auth.menuSwitch();
        }
        if (templateName.indexOf('content.html') !== -1) {
            front.has_content = true;
            front.addContent();
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
    // angular.element(document).ready(function () {
    //
    // });
});