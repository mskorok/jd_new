var $ = jQuery.noConflict();
var app = angular.module('front', []);
app.controller('frontCtr', function ($scope) {
    $scope.add_to_card_header = window.front_header;
    $scope.add_to_card_footer = window.front_footer;
    $scope.add_to_card_content = window.front_add_to_card_content;
    var front = {
        container: 'backpack_container',
        termsUrl: 'https://jourday.com/terms-conditions/',
        policyUrl: 'https://jourday.com/privacy-policy/',
        paymentUrl: 'https://jourday.com/payments/?affiliate-slug=',
        weekday: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        productTemplate: function (data, i) {
            var product = data['product']['Product'];
            var slots = data['slots'];
            var adult_slots = data['adultSlots'];
            var child_slots = data['childSlots'];
            var student_slots = data['studentSlots'];
            var id = product['id'];
            var price = data['finalPrice'];
            var availability = data['product']['ProductAvailability'];
            var policies = data['product']['Policy'];
            var cancellation_policy = '';
            [].forEach.call(policies, function (policy) {
                cancellation_policy += policy['cancellationWindow'] + ' / ' + policy['cancellationFees'] + '<br>';
            });
            var start = data['product']['Start'];
            var duration = start[0]['duration'] + ' ' + start[0]['durationType'];
            var discount = parseFloat(data['discount']);
            var adult_price = parseFloat(availability['adultPrice'])*discount;
            var child_price = parseFloat(availability['childPrice'])*discount;
            var student_price = parseFloat(availability['studentPrice'])*discount;
            var date = data['date'];
            var div = document.createElement('div');
            var n = i + 1;
            var day = new Date(date);
            var day_of_week = day.getDay();
            day_of_week = this.weekday[day_of_week].toUpperCase();
            var dd = day.getDate();
            var mm = day.getMonth()+1; //January is 0!
            var yyyy = day.getFullYear();
            if (dd < 10) {
                dd='0'+dd;
            }
            if (mm < 10) {
                mm='0'+mm;
            }
            var formatted = dd + '/' + mm + '/' + yyyy;

            n = n.toString();
            div.setAttribute('class', 'row mbot20 backpack-row');
            div.innerHTML = '<div class="col-md-5">\n' +
                '                <span class="hidden resdata"></span>\n' +
                '                <div class="backpack-item-name">\n' +
                n + '. ' + product['name'] + ' <br>\n' +
                '                    <div class="backpack-item-desc">\n' +
                '\t\t\t\t\t\t\t\t<span class="pright">on\n' +
                '\t\t\t\t\t\t\t\t\t' + day_of_week + '\t\t\t\t\t\t\t\t\t' + formatted + '\t\t\t\t\t\t\t\t\t</span>\n' +
                '                        <span class="pright"><i class="fa fa-clock-o"></i> ' + duration + '</span>\n' +
                '                        <div class="pright"><i class="fa fa-bookmark"></i> <a href="#" data-toggle="modal"\n' +
                '                                                                              data-target="#myModal' + id + '">Cancellation\n' +
                '                            Policy</a></div>\n' +
                '                        <div class="modal fade" id="myModal' + id + '" tabindex="-1" role="dialog"\n' +
                '                             aria-labelledby="myModalLabel' + id + '">\n' +
                '                            <div class="modal-dialog" role="document">\n' +
                '                                <div class="modal-content">\n' +
                '                                    <div class="modal-header">\n' +
                '                                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">\n' +
                '                                            <span aria-hidden="true">×</span></button>\n' +
                '                                        <h4 class="modal-title" id="myModalLabel' + id + '">Cancellation Policy</h4> <br>\n' +
                '                                    </div>\n' +
                '                                    <div class="modal-body">\n' +
                cancellation_policy + '\n' +
                '                                    </div>\n' +
                '                                    <div class="modal-footer">\n' +
                '                                        <button type="button" class="btn btn-default" data-dismiss="modal">Close\n' +
                '                                        </button>\n' +
                '                                    </div>\n' +
                '                                </div>\n' +
                '                            </div>\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="col-md-4">\n' +
                '                <div class="row counter-container" data-id="' + id + '">\n' +
                '                    <div class="col-md-4">\n' +
                '                        <div class="quantity-control-container">\n' +
                '                            <a href="javascript:void 0" class="quantity-control adult-minus">\n' +
                '                                <i class="fa fa-minus"></i>\n' +
                '                            </a>\n' +
                '                            <span class="quantity adult-slots" data-price="' + adult_price + '">' + adult_slots + '</span>\n' +
                '                            <a href="javascript:void 0" class="quantity-control adult-plus">\n' +
                '                                <i class="fa fa-plus"></i>\n' +
                '                            </a>\n' +
                '                            adult(s)\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="col-md-4">\n' +
                '                        <div class="quantity-control-container">\n' +
                '                            <a href="javascript:void 0" class="quantity-control child-minus">\n' +
                '                                <i class="fa fa-minus"></i>\n' +
                '                            </a>\n' +
                '                            <span class="quantity child-slots" data-price="' + child_price + '">' + child_slots + '</span>\n' +
                '                            <a href="javascript:void 0" class="quantity-control child-plus">\n' +
                '                                <i class="fa fa-plus"></i>\n' +
                '                            </a>\n' +
                '                            child(s)\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                    <div class="col-md-4">\n' +
                '                        <div class="quantity-control-container">\n' +
                '                            <a href="javascript:void 0" class="quantity-control student-minus">\n' +
                '                                <i class="fa fa-minus"></i>\n' +
                '                            </a>\n' +
                '                            <span class="quantity student-slots" data-price="' + student_price + '">' + student_slots + '</span>\n' +
                '                            <a href="javascript:void 0" class="quantity-control student-plus">\n' +
                '                                <i class="fa fa-plus"></i>\n' +
                '                            </a>\n' +
                '                            student(s)\n' +
                '                        </div>\n' +
                '                    </div>\n' +
                '                </div>\n' +
                '            </div>\n' +
                '            <div class="col-md-2">\n' +
                '                <span class="backpack-price item-total-price" >€ <span class="product_price">' + price + '</span></span>\n' +
                '            </div>\n' +
                '            <div class="col-md-1">\n' +
                '                <div class="pright pt-20 ">\n' +
                '                    <a href="javascript:void 0" class="delete-travel-bite-data btn btn-default" data-id="' + id + '"\n' +
                '                       data-date="' + date + '">\n' +
                '                        <i class="fa fa-trash"></i>\n' +
                '                    </a>\n' +
                '                </div>\n' +
                '            </div>';

            return div;
        },
        getData: function () {
            var backpack = localStorage.getItem('backpack');
            if (backpack === '' || backpack === null || typeof backpack === 'undefined') {
                stop();
                window.location.href = front_product_list_url;
            }
            return JSON.parse(backpack);
        },
        deleteProduct: function () {
            var self = this;
            var buttons = document.querySelectorAll('.delete-travel-bite-data');
            if (buttons) {
                [].forEach.call(buttons, function (button) {
                    button.addEventListener('click', function (ev) {
                        ev.preventDefault();
                        ev.stopPropagation();
                        var id = button.getAttribute('data-id');
                        if (localStorage.getItem('backpack') === null) {
                            alert('Something wrong - backpack is empty!');
                            throw 'Something wrong - backpack is empty!'
                        } else {
                            var index;
                            var backpack = self.getData();
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
                            var length = backpack.length;
                            var backpack_link = document.getElementById('backpack_link');
                            if (backpack_link) {
                                backpack_link.textContent = length;
                            }

                            if (backpack.length === 0) {
                                localStorage.setItem('backpack', '');
                                self.redirect();
                            } else {
                                self.backpackSave(backpack);
                            }

                            var container = button.closest('.backpack-row');
                            if (container) {
                                container.parentNode.removeChild(container);
                            }
                            self.countTotalPrice();
                        }
                    })
                })
            }
        },
        checkPolicy: function () {
            var check = document.getElementById('check_policy');
            if (check) {
                check.addEventListener('click', function (ev) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    var i = check.querySelector('i');
                    if (i) {
                        if (i.classList.contains('fa-check-square-o')) {
                            i.classList.remove('fa-check-square-o');
                            i.classList.add('fa-square-o');
                        } else {
                            i.classList.add('fa-check-square-o');
                            i.classList.remove('fa-square-o');
                        }
                    }
                })
            }
        },
        redirect: function () {
            if (localStorage.getItem('backpack') === null
                || localStorage.getItem('backpack') === ''
                || typeof localStorage.getItem('backpack') === 'undefined'
            ) {
                window.location.href = front_product_list_url;
            }
        },
        show: function () {
            this.redirect();
            var backpack = this.getData();
            var backpack_link = document.getElementById('backpack_link');
            if (backpack_link) {
                backpack_link.textContent = backpack.length;
            }
            var self = this;
            var terms = document.getElementById('terms_conditions');
            if (terms) {
                terms.setAttribute('href', this.termsUrl);
            }
            var policy = document.getElementById('privacy_policy');
            if (policy) {
                policy.setAttribute('href', this.policyUrl);
            }
            var container = document.getElementById(this.container);
            if (container) {
                var data = this.getData();
                [].forEach.call(data, function (item, i) {
                    var div = self.productTemplate(item, i);
                    container.appendChild(div);

                });
                this.addPriceListeners();
                this.deleteProduct();
            }
            self.checkPolicy();
            self.proceedToPayment();

        },
        getItem: function(id){
            var backpack = this.getData();
            var item = null;
            [].forEach.call(backpack, function (entity) {
                if (entity.id === id) {
                    item = JSON.parse(JSON.stringify(entity));
                }
            });
            return item;
        },
        getDate: function () {
            var backpack = self.getData();
            var item = null;
            var date = null;
            [].forEach.call(backpack, function (entity) {
                if (entity.id === id) {
                    item = JSON.parse(JSON.stringify(entity));
                    date = item['date'];
                }
            });
            if (!date) {
                throw 'Date not found';
            }
            return date;
        },
        addPriceListeners: function () {
            var self = this;
            var adult_minus = document.querySelectorAll('.adult-minus');
            var adult_plus = document.querySelectorAll('.adult-plus');
            var child_minus = document.querySelectorAll('.child-minus');
            var child_plus = document.querySelectorAll('.child-plus');
            var student_minus = document.querySelectorAll('.student-minus');
            var student_plus = document.querySelectorAll('.student-plus');
            if (adult_minus) {
                [].forEach.call(adult_minus, function (el) {
                    el.addEventListener('click', function (ev) {
                        ev.preventDefault();
                        var slots = el.closest('.quantity-control-container').querySelector('.adult-slots');
                        var child_slots = el.closest('.counter-container').querySelector('.child-slots');
                        var student_slots = el.closest('.counter-container').querySelector('.student-slots');
                        var count = slots.textContent;
                        var new_count = parseInt(count) - 1;
                        if (new_count < 0) {
                            new_count = 0;
                        }
                        slots.textContent = new_count.toString();
                        var total_slots = new_count + parseInt(child_slots.textContent) + parseInt(student_slots.textContent);
                        var container = el.closest('.counter-container');
                        var id = container.getAttribute('data-id');
                        var item = self.getItem(id);

                        var product = item['product'];
                        var discount = self.getDiscount(total_slots, product);
                        var availability = product['ProductAvailability'];
                        var adult_price = parseFloat(availability['adultPrice'])*discount;
                        // var adult_price = parseFloat(slots.getAttribute('data-price'));

                        var adult_final_price = adult_price * new_count;

                        if (total_slots > availability['availableSlots']) {
                            alert('You chose more slots than available');
                            slots.textContent = count.toString();
                            return false;
                            // throw 'You choose more slots than available';
                        }

                        if (total_slots < 1) {
                            alert('Total slots can`t be 0');
                            slots.textContent = count.toString();
                            return false;
                        }

                        var storedData = null, index;
                        if (localStorage.getItem('backpack') === null
                            || localStorage.getItem('backpack') === ''
                            || typeof localStorage.getItem('backpack') === 'undefined'
                        ) {
                            alert('Something wrong - backpack is empty!');
                            stop();
                            window.location.href = front_product_list_url;
                            // throw 'Something wrong - backpack is empty!';
                        } else {
                            var backpack = self.getData();
                            [].forEach.call(backpack, function (entity) {
                                if (entity.id === id) {
                                    if (!entity.hasOwnProperty('date')) {
                                        alert('You must add date first!');
                                        throw 'You must add date first!'
                                    }
                                    storedData = JSON.parse(JSON.stringify(entity));
                                    index = backpack.indexOf(entity);
                                    backpack.splice(index, 1);
                                    index = null;

                                    var finalPrice = adult_final_price + parseFloat(storedData['childPrice'])
                                        + parseFloat(storedData['studentPrice']);
                                    storedData['finalPrice'] = finalPrice.toString();
                                    storedData['adultPrice'] = adult_final_price.toString();
                                    storedData['adultSlots'] = new_count.toString();
                                    storedData['slots'] = total_slots.toString();
                                    backpack.push(storedData);
                                }
                            });
                            self.backpackSave(backpack);
                        }
                        self.countPrice(container, storedData);
                        self.countTotalPrice();
                    })
                })
            }
            if (adult_plus) {
                [].forEach.call(adult_plus, function (el) {
                    el.addEventListener('click', function (ev) {
                        ev.preventDefault();
                        var slots = el.closest('.quantity-control-container').querySelector('.adult-slots');
                        var child_slots = el.closest('.counter-container').querySelector('.child-slots');
                        var student_slots = el.closest('.counter-container').querySelector('.student-slots');
                        var count = slots.textContent;
                        var new_count = parseInt(count) + 1;
                        if (new_count < 0) {
                            new_count = 0;
                        }
                        slots.textContent = new_count.toString();
                        var container = el.closest('.counter-container');
                        var id = container.getAttribute('data-id');
                        var item = self.getItem(id);
                        var total_slots = new_count + parseInt(child_slots.textContent) + parseInt(student_slots.textContent);
                        var product = item['product'];
                        var discount = self.getDiscount(total_slots, product);
                        var availability = product['ProductAvailability'];
                        var adult_price = parseFloat(availability['adultPrice'])*discount;

                        // var adult_price = parseFloat(slots.getAttribute('data-price'));

                        var adult_final_price = adult_price * new_count;


                        if (total_slots > availability['availableSlots']) {
                            alert('You chose more slots than available');
                            slots.textContent = count.toString();
                            return false;
                            // throw 'You choose more slots than available';
                        }

                        if (total_slots < 1) {
                            alert('Total slots can`t be 0');
                            slots.textContent = count.toString();
                            return false;
                        }

                        var storedData = null, index;
                        if (localStorage.getItem('backpack') === null
                            || localStorage.getItem('backpack') === ''
                            || typeof localStorage.getItem('backpack') === 'undefined'
                        ) {
                            alert('Something wrong - backpack is empty!');
                            stop();
                            window.location.href = front_product_list_url;
                            // throw 'Something wrong - backpack is empty!';
                        } else {
                            var backpack = self.getData();
                            [].forEach.call(backpack, function (entity) {
                                if (entity.id === id) {
                                    if (!entity.hasOwnProperty('date')) {
                                        alert('You must add date first!');
                                        throw 'You must add date first!'
                                    }
                                    storedData = JSON.parse(JSON.stringify(entity));
                                    index = backpack.indexOf(entity);
                                    backpack.splice(index, 1);
                                    index = null;

                                    var finalPrice = adult_final_price + parseFloat(storedData['childPrice'])
                                        + parseFloat(storedData['studentPrice']);
                                    storedData['finalPrice'] = finalPrice.toString();
                                    storedData['adultPrice'] = adult_final_price.toString();
                                    storedData['adultSlots'] = new_count.toString();
                                    storedData['slots'] = total_slots.toString();
                                    backpack.push(storedData);
                                }
                            });
                            self.backpackSave(backpack);
                        }
                        self.countPrice(container, storedData);
                        self.countTotalPrice();
                    })
                })
            }
            if (child_minus) {
                [].forEach.call(child_minus, function (el) {
                    el.addEventListener('click', function (ev) {
                        ev.preventDefault();
                        var slots = el.closest('.quantity-control-container').querySelector('.child-slots');
                        var adult_slots = el.closest('.counter-container').querySelector('.adult-slots');
                        var student_slots = el.closest('.counter-container').querySelector('.student-slots');
                        var count = slots.textContent;
                        var new_count = parseInt(count) - 1;
                        if (new_count < 0) {
                            new_count = 0;
                        }
                        slots.textContent = new_count.toString();
                        var container = el.closest('.counter-container');
                        var id = container.getAttribute('data-id');
                        var item = self.getItem(id);
                        var total_slots = new_count + parseInt(adult_slots.textContent) + parseInt(student_slots.textContent);
                        var product = item['product'];
                        var discount = self.getDiscount(total_slots, product);
                        var availability = product['ProductAvailability'];
                        var child_price = parseFloat(availability['childPrice'])*discount;

                        // var child_price = parseFloat(slots.getAttribute('data-price'));

                        var child_final_price = child_price * new_count;


                        if (total_slots > availability['availableSlots']) {
                            alert('You chose more slots than available');
                            slots.textContent = count.toString();
                            return false;
                        }

                        if (total_slots < 1) {
                            alert('Total slots can`t be 0');
                            slots.textContent = count.toString();
                            return false;
                        }

                        var storedData = null, index;
                        if (localStorage.getItem('backpack') === null
                            || localStorage.getItem('backpack') === ''
                            || typeof localStorage.getItem('backpack') === 'undefined'
                        ) {
                            alert('Something wrong - backpack is empty!');
                            stop();
                            window.location.href = front_product_list_url;
                            // throw 'Something wrong - backpack is empty!'
                        } else {
                            var backpack = self.getData();
                            [].forEach.call(backpack, function (entity) {
                                if (entity.id === id) {
                                    if (!entity.hasOwnProperty('date')) {
                                        alert('You must add date first!');
                                        throw 'You must add date first!'
                                    }
                                    storedData = JSON.parse(JSON.stringify(entity));
                                    index = backpack.indexOf(entity);
                                    backpack.splice(index, 1);
                                    index = null;

                                    var finalPrice = child_final_price + parseFloat(storedData['adultPrice'])
                                        + parseFloat(storedData['studentPrice']);
                                    storedData['finalPrice'] = finalPrice.toString();
                                    storedData['childPrice'] = child_final_price.toString();
                                    storedData['childSlots'] = new_count.toString();
                                    storedData['slots'] = total_slots.toString();
                                    backpack.push(storedData);
                                }
                            });
                            self.backpackSave(backpack);
                        }
                        self.countPrice(container, storedData);
                        self.countTotalPrice();
                    })
                })
            }
            if (child_plus) {
                [].forEach.call(child_plus, function (el) {
                    el.addEventListener('click', function (ev) {
                        ev.preventDefault();
                        var slots = el.closest('.quantity-control-container').querySelector('.child-slots');
                        var count = slots.textContent;
                        var new_count = parseInt(count) + 1;
                        if (new_count < 0) {
                            new_count = 0;
                        }
                        var container = el.closest('.counter-container');
                        var id = container.getAttribute('data-id');
                        var adult_slots = el.closest('.counter-container').querySelector('.adult-slots');
                        var student_slots = el.closest('.counter-container').querySelector('.student-slots');
                        var total_slots = new_count + parseInt(adult_slots.textContent) + parseInt(student_slots.textContent);
                        slots.textContent = new_count.toString();
                        var item = self.getItem(id);

                        var product = item['product'];
                        var discount = self.getDiscount(total_slots, product);
                        var availability = product['ProductAvailability'];
                        var child_price = parseFloat(availability['childPrice'])*discount;

                        // var child_price = parseFloat(slots.getAttribute('data-price'));
                        var child_final_price = child_price * new_count;

                        if (total_slots > availability['availableSlots']) {
                            alert('You chose more slots than available');
                            slots.textContent = count.toString();
                            return false;
                        }

                        if (total_slots < 1) {
                            alert('Total slots can`t be 0');
                            slots.textContent = count.toString();
                            return false;
                        }

                        var storedData = null, index;
                        if (localStorage.getItem('backpack') === null
                            || localStorage.getItem('backpack') === ''
                            || typeof localStorage.getItem('backpack') === 'undefined'
                        ) {
                            alert('Something wrong - backpack is empty!');
                            stop();
                            window.location.href = front_product_list_url;
                            // throw 'Something wrong - backpack is empty!';
                        } else {
                            var backpack = self.getData();
                            [].forEach.call(backpack, function (entity) {
                                if (entity.id === id) {
                                    if (!entity.hasOwnProperty('date')) {
                                        alert('You must add date first!');
                                        throw 'You must add date first!'
                                    }
                                    storedData = JSON.parse(JSON.stringify(entity));
                                    index = backpack.indexOf(entity);
                                    backpack.splice(index, 1);
                                    index = null;

                                    var finalPrice = child_final_price + parseFloat(storedData['adultPrice'])
                                        + parseFloat(storedData['studentPrice']);
                                    storedData['finalPrice'] = finalPrice.toString();
                                    storedData['childPrice'] = child_final_price.toString();
                                    storedData['childSlots'] = new_count.toString();
                                    storedData['slots'] = total_slots.toString();
                                    backpack.push(storedData);
                                }
                            });
                            self.backpackSave(backpack);
                        }
                        self.countPrice(container, storedData);
                        self.countTotalPrice();
                    })
                })
            }
            if (student_minus) {
                [].forEach.call(student_minus, function (el) {
                    el.addEventListener('click', function (ev) {
                        ev.preventDefault();
                        var slots = el.closest('.quantity-control-container').querySelector('.student-slots');
                        var count = slots.textContent;
                        var new_count = parseInt(count) - 1;
                        if (new_count < 0) {
                            new_count = 0;
                        }
                        var container = el.closest('.counter-container');
                        var id = container.getAttribute('data-id');
                        var adult_slots = el.closest('.counter-container').querySelector('.adult-slots');
                        var child_slots = el.closest('.counter-container').querySelector('.child-slots');
                        var total_slots = new_count + parseInt(adult_slots.textContent) + parseInt(child_slots.textContent);
                        slots.textContent = new_count.toString();
                        var item = self.getItem(id);

                        var product = item['product'];
                        var discount = self.getDiscount(total_slots, product);
                        var availability = product['ProductAvailability'];
                        var student_price = parseFloat(availability['studentPrice'])*discount;

                        // var student_price = parseFloat(slots.getAttribute('data-price'));
                        var student_final_price = student_price * new_count;

                        if (total_slots > availability['availableSlots']) {
                            alert('You chose more slots than available');
                            slots.textContent = count.toString();
                            return false;
                        }

                        if (total_slots < 1) {
                            alert('Total slots can`t be 0');
                            slots.textContent = count.toString();
                            return false;
                        }

                        var storedData = null, index;
                        if (localStorage.getItem('backpack') === null
                            || localStorage.getItem('backpack') === ''
                            || typeof localStorage.getItem('backpack') === 'undefined'
                        ) {
                            alert('Something wrong - backpack is empty!');
                            stop();
                            window.location.href = front_product_list_url;
                            // throw 'Something wrong - backpack is empty!';
                        } else {
                            var backpack = self.getData();
                            [].forEach.call(backpack, function (entity) {
                                if (entity.id === id) {
                                    if (!entity.hasOwnProperty('date')) {
                                        alert('You must add date first!');
                                        throw 'You must add date first!'
                                    }
                                    storedData = JSON.parse(JSON.stringify(entity));
                                    index = backpack.indexOf(entity);
                                    backpack.splice(index, 1);
                                    index = null;

                                    var finalPrice = student_final_price + parseFloat(storedData['adultPrice'])
                                        + parseFloat(storedData['childPrice']);
                                    storedData['finalPrice'] = finalPrice.toString();
                                    storedData['studentPrice'] = student_final_price.toString();
                                    storedData['studentSlots'] = new_count.toString();
                                    storedData['slots'] = total_slots.toString();
                                    backpack.push(storedData);
                                }
                            });
                            self.backpackSave(backpack);
                        }
                        self.countPrice(container, storedData);
                        self.countTotalPrice();
                    })
                })
            }
            if (student_plus) {
                [].forEach.call(student_plus, function (el) {
                    el.addEventListener('click', function (ev) {
                        ev.preventDefault();
                        var slots = el.closest('.quantity-control-container').querySelector('.student-slots');
                        var count = slots.textContent;
                        var new_count = parseInt(count) + 1;
                        if (new_count < 0) {
                            new_count = 0;
                        }
                        var container = el.closest('.counter-container');
                        var id = container.getAttribute('data-id');
                        var adult_slots = el.closest('.counter-container').querySelector('.adult-slots');
                        var child_slots = el.closest('.counter-container').querySelector('.child-slots');
                        var total_slots = new_count + parseInt(adult_slots.textContent) + parseInt(child_slots.textContent);
                        slots.textContent = new_count.toString();
                        var item = self.getItem(id);

                        var product = item['product'];
                        var discount = self.getDiscount(total_slots, product);
                        var availability = product['ProductAvailability'];
                        var student_price = parseFloat(availability['studentPrice'])*discount;

                        // var student_price = parseFloat(slots.getAttribute('data-price'));
                        var student_final_price = student_price * new_count;

                        if (total_slots > availability['availableSlots']) {
                            alert('You chose more slots than available');
                            slots.textContent = count.toString();
                            return false;
                        }

                        if (total_slots < 1) {
                            alert('Total slots can`t be 0');
                            slots.textContent = count.toString();
                            return false;
                        }

                        var storedData = null, index;
                        if (localStorage.getItem('backpack') === null
                            || localStorage.getItem('backpack') === ''
                            || typeof localStorage.getItem('backpack') === 'undefined'
                        ) {
                            alert('Something wrong - backpack is empty!');
                            stop();
                            window.location.href = front_product_list_url;
                            // throw 'Something wrong - backpack is empty!';
                        } else {
                            var backpack = self.getData();
                            [].forEach.call(backpack, function (entity) {
                                if (entity.id === id) {
                                    if (!entity.hasOwnProperty('date')) {
                                        alert('You must add date first!');
                                        throw 'You must add date first!'
                                    }
                                    storedData = JSON.parse(JSON.stringify(entity));
                                    index = backpack.indexOf(entity);
                                    backpack.splice(index, 1);
                                    index = null;
                                    var finalPrice = student_final_price + parseFloat(storedData['adultPrice'])
                                        + parseFloat(storedData['childPrice']);
                                    storedData['finalPrice'] = finalPrice.toString();
                                    storedData['studentPrice'] = student_final_price.toString();
                                    storedData['studentSlots'] = new_count.toString();
                                    storedData['slots'] = total_slots.toString();
                                    backpack.push(storedData);
                                }
                            });
                            self.backpackSave(backpack);
                        }
                        self.countPrice(container, storedData);
                        self.countTotalPrice();
                    })
                })
            }
        },
        backpackSave: function(backpack) {
            backpack = JSON.stringify(backpack);
            localStorage.setItem('backpack', backpack);
        },
        countPrice: function (container, storedData) {
            var total_price = container.closest('div.backpack-row').querySelector('.product_price');
            if (total_price && typeof storedData['finalPrice'] !== 'undefined' && !isNaN(storedData['finalPrice'])) {
                total_price.textContent = parseFloat(storedData['finalPrice']).toFixed(2).toString();
            }
        },
        countTotalPrice: function () {
            var price = 0;
            var total_price = document.getElementById('total_price');
            var container = document.getElementById('backpack_container');
            var prices = container.querySelectorAll('.product_price');
            if (prices) {
                [].forEach.call(prices, function (el) {
                    price += parseFloat(el.textContent);
                })
            }
            price = parseFloat(price.toString());
            if (total_price) {
                total_price.textContent = price.toString();
            }
            return price;
        },
        getDiscount: function(slots, item) {
            var availability = item['ProductAvailability'];
            var start = item['Start'][0];
            var duration = start['duration'];
            var durationType = start['durationType'];
            var diff = 0;
            if (durationType === 'day') {
                diff = parseInt(duration) * 86400;
            } else if (durationType === 'hour') {
                diff = parseInt(duration) * 3600;
            }
            var discounts = item['Discounts'];
            var groupDiscounts = item['GroupDiscounts'];
            var personsDiscounts = item['PersonsDiscounts'];
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

            return discount;
        },
        proceedToPayment: function () {
            var self = this;
            var proceed = document.getElementById('pay');
            var check = document.querySelector('a#check_policy i');
            if (proceed) {
                proceed.addEventListener('click', function (ev) {
                    if (check.classList.contains('fa-square-o')) {
                        ev.preventDefault();
                        var message = {
                            'type': 'failure',
                            'message': 'Please check that you agree with the terms and conditions'
                        };
                        self.handleMessages(message);
                        return false
                    } else {
                        var coupon = document.getElementById('coupon');
                        if (coupon) {
                            coupon = coupon && coupon.value !== '' ? coupon.value : null;
                            var backpack = self.getData();
                            var storedData, index;
                            [].forEach.call(backpack, function (entity) {
                                if (!entity.hasOwnProperty('date')) {
                                    alert('You must add date first!');
                                    throw 'You must add date first!'
                                }
                                storedData = JSON.parse(JSON.stringify(entity));
                                index = backpack.indexOf(entity);
                                backpack.splice(index, 1);
                                index = null;

                                storedData['coupon'] = coupon;
                                backpack.push(storedData);
                            });
                            self.backpackSave(backpack);
                        }
                        window.location.href = front_auth.frontPayment;
                    }
                })
            }
        },
        handleMessages: function (data) {
            var modal = $('#myModal .modal-body');
            switch (data.type) {
                case 'success':
                    modal.removeClass('failure message').addClass('success');
                    break;
                case 'failure':
                    modal.removeClass('success message').addClass('failure');
                    break;
                case 'message':
                    modal.removeClass('success failure').addClass('message');
                    break;
            }
            modal.html(data.message);
            $('#myModal').modal('show');
        }
    };

    $scope.$on('$includeContentLoaded', function (event, templateName) {
        if (templateName.indexOf('header') !== -1) {
            front_auth.menuSwitch();
        }
        if (templateName.indexOf('content.html') !== -1) {
            front.show();
            front.countTotalPrice();
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