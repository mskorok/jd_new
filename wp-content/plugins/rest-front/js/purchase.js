var $ = jQuery.noConflict();
var app = angular.module('front', []);
app.controller('frontCtr', function ($scope) {
    $scope.purchase_header = window.front_header;
    $scope.purchase_footer = window.front_footer;
    $scope.purchase_content = window.front_purchase_content;
    var front = {
        container: 'payment_container',
        selectors: ['password', 'confirmPassword'],
        getCurrentUserTemplate: function (user) {
            var container = document.getElementById(this.container);
            var div = document.createElement('div');
            div.innerHTML = '\n' +
                '\t\t<div class="row">\n' +
                '\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t<div class="payment-heading">\n' +
                '\t\t\t\t\tBilling Info\n' +
                '\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t<div class="payment-heading">Prepopulated billing info. <br> Please go to <a href="javascript:void 0">your profile</a> if you need to change something from below.</div>\n' +
                '\t\t\t\t\t\t\t\t<form id="billing_data_form" class="billing-form w-100">\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input name="fullName" value="' + user.firstName + ' ' +  user.lastName + '" placeholder="your full name (*)" readonly="" type="text"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input name="email" value="' + user.email + '" placeholder="your email (*)" readonly="" type="email"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input name="phone" value="' + user.phone +  '" placeholder="your phone number (*)" readonly="" type="tel"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input name="city" value="' + user.City.name + '" placeholder="your city (*)" readonly="" type="text"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<select id="country">\n' +
                '\t\t\t\t\t\t\t\t<option value="' + user.country.id +'" selected="">' + user.country.name +'</option>\n' +
                '\t\t\t\t\t\t\t</select>\n' +
                '\t\t\t\t\t\t\t<input name="country" value="' + user.country.id + '" type="hidden">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<input name="hotel_name" placeholder="type here your hotel name if you know it" type="text">\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<textarea name="comments" placeholder="Type here any comment you\'d like us to know beforehand" rows="5"></textarea>\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<select name="source" id="source">\n' +
                '\t\t\t\t\t\t\t\t<option value="" disabled="" selected="">Where did you find us?</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="internet">Internet search (search engines)</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="social">Social Media</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="newsletter">Newsletter</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="travel_guide">Online travel guide</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="magazine">Travel magazine</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="friend">Friend / Family</option>\n' +
                '\t\t\t\t\t\t\t</select>\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<input name="age_check" id="age_check" checked="checked" type="checkbox"> I am over 18 years old (*).\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<input name="company_check" id="company_check" type="checkbox"> Check if you want a company invoice.\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<input name="newsletter" id="newsletter" type="checkbox"> Check if you want to receive jourday newsletter.\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<input name="newProducts" id="newProducts" type="checkbox"> Would like to receive info for new products/activities?\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10 hidden company-check">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input name="company_name" value="" placeholder="the company\'s name" readonly="" type="text"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10 hidden company-check">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input name="company_address" value="" placeholder="the company\'s address" readonly="" type="text"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10 hidden company-check">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input min="0" step="1" name="company_vat_number" value="" placeholder="the company\'s VAT number" readonly="" type="number"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12" style="color:red;">(*): Required fields</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t</form>\n' +
                '\t\t\t</div>\n' +
                '\t\t<div class="row mbot20">\n' +
                '\t\t<div class="col-md-8 text-right mbot20">\n' +
                '\t\t\t<img src="https://jourday.com/wp-content/themes/jourday/imgs/paypal.png" alt="protected purchases with PayPal">\n' +
                '\t\t</div>\n' +
                '\t\t\t<div class="col-md-4">\n' +
                '\t\t\t\t<a href="javascript:void 0" id="proceed_to_payment_button" target="_self" class="pull-right proceed-button">Proceed to PayPal</a>\n' +
                '\t\t\t</div>\n' +
                '\t\t</div>\n' +
                '\t';
            if (container) {
                container.appendChild(div);
            }
        },
        getNewUserTemplate: function () {
            var container = document.getElementById(this.container);
            var div = document.createElement('div');
            div.innerHTML = '<div class="row">\n' +
                '\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t<div class="modal fade" id="myModalLoginForm" tabindex="-1" role="dialog" aria-labelledby="myModalLoginLabel">\n' +
                '\t\t\t\t\t<div class="modal-dialog" role="document">\n' +
                '\t\t\t\t\t\t<div class="modal-content">\n' +
                '\t\t\t\t\t\t\t<div class="modal-header">\n' +
                '\t\t\t\t\t\t\t\t<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>\n' +
                '\t\t\t\t\t\t\t\t<h4 class="modal-title" id="myModalLoginLabel">Login to Jourday.com</h4>\n' +
                '\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t<div class="modal-body">\n' +
                '\t\t\t\t\t\t\t\t\n' +
                '\t\t<form name="loginform" id="loginform" action="https://jourday.com/wp-login.php" method="post">\n' +
                '\t\t\t\n' +
                '\t\t\t<p class="login-username">\n' +
                '\t\t\t\t<label for="user_login">Username or Email Address</label>\n' +
                '\t\t\t\t<input type="text" name="log" id="user_login" class="input" value="" size="20" placeholder="Username">\n' +
                '\t\t\t</p>\n' +
                '\t\t\t<p class="login-password">\n' +
                '\t\t\t\t<label for="user_pass">Password</label>\n' +
                '\t\t\t\t<input type="password" name="pwd" id="user_pass" class="input" value="" size="20" placeholder="Password">\n' +
                '\t\t\t</p>\n' +
                '\t\t\t\n' +
                '\t\t\t<p class="login-remember"><label><input name="rememberme" type="checkbox" id="rememberme" value="forever"> Remember Me</label></p>\n' +
                '\t\t\t<p class="login-submit">\n' +
                '\t\t\t\t<input type="submit" name="wp-submit" id="wp-submit" class="button button-primary" value="Log In">\n' +
                '\t\t\t\t<input type="hidden" name="redirect_to" value="https://jourday.com/payments/?affiliate-slug=">\n' +
                '\t\t\t<div class="col-xs-12"><a href="/travelers-area/">No signed in? Sign Up!</a></div><div class="col-xs-12 hrWrapper"><hr></div><div class="col-xs-12 orWrapper"></div></p>\n' +
                '\t\t\t<input type="hidden" name="wppb_redirect_check" value="true">\n' +
                '\t\t</form>\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t\t<div class="modal-footer">\n' +
                '\t\t\t\t\t\t\t\t<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n' +
                '\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t</div>\n' +
                '\n' +
                '\t\t\t\t<div class="payment-heading">\n' +
                '\t\t\t\t\tBilling Info\n' +
                '\t\t\t\t</div>\n' +
                // '\t\t\t\t\t\t\t\t<div class="payment-heading">Fill your Billing info or <a href="javascript:void 0" data-toggle="modal" data-target="#myModalLoginForm">login with your Jourday account</a></div>\n' +
                '\t\t\t\t\t\t\t\t<div class="payment-heading">Fill your Billing info or <a href="' + front_sign_in_url + '">login with your Jourday account</a></div>\n' +
                '\t\t\t\t\t\t\t\t<form id="billing_data_form"  class="billing-form w-100">\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">' +
                '\t\t\t\t\t\t\t\t<input type="text" name="fullName" value="" placeholder="your full name (*)">' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input type="email" name="email" value="" placeholder="your email (*)"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input type="tel" name="phone" value="" placeholder="your phone number (*)"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input type="text" name="city" value="" placeholder="your city (*)"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">' +
                '\t\t\t\t\t\t\t\t<input type="password" name="password" id="password"  placeholder="password (*)">' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">' +
                '\t\t\t\t\t\t\t\t<input type="password" name="confirmPassword" id="confirmPassword" placeholder="confirm password (*)">' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t<select name="country" id="country">\n' +
                '\t\t\t\t\t\t\t\t<option value="" disabled="" selected="">Select your country (*)</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="28">Afghanistan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="31">Åland Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="32">Albania</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="90">Algeria</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="37">American Samoa</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="33">Andorra</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="29">Angola</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="30">Anguilla</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="38">Antarctica</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="40">Antigua and Barbuda</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="35">Argentina</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="36">Armenia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="27">Aruba</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="41">Australia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="42">Austria</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="43">Azerbaijan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="51">Bahamas</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="50">Bahrain</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="48">Bangladesh</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="59">Barbados</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="54">Belarus</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="45">Belgium</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="55">Belize</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="46">Benin</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="56">Bermuda</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="61">Bhutan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="57">Bolivia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="52">Bosnia and Herzegovina</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="63">Botswana</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="62">Bouvet Island</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="58">Brazil</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="131">British Indian Ocean Territory</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="265">British Virgin Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="60">Brunei</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="49">Bulgaria</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="47">Burkina Faso</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="44">Burundi</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="145">Cambodia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="71">Cameroon</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="65">Canada</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="77">Cape Verde</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="82">Cayman Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="64">Central African Republic</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="242">Chad</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="68">Chile</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="69">China</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="81">Christmas Island</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="66">Cocos (Keeling) Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="75">Colombia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="76">Comoros</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="74">Cook Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="78">Costa Rica</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="125">Croatia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="79">Cuba</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="80">Curaçao</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="83">Cyprus</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="84">Czech Republic</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="88">Denmark</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="86">Djibouti</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="87">Dominica</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="89">Dominican Republic</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="72">DR Congo</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="91">Ecuador</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="92">Egypt</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="226">El Salvador</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="114">Equatorial Guinea</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="93">Eritrea</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="96">Estonia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="97">Ethiopia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="100">Falkland Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="102">Faroe Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="99">Fiji</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="98">Finland</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="101">France</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="119">French Guiana</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="212">French Polynesia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="39">French Southern and Antarctic Lands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="104">Gabon</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="112">Gambia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="106">Georgia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="85">Germany</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="108">Ghana</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="109">Gibraltar</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="10">Greece</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="117">Greenland</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="116">Grenada</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="111">Guadeloupe</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="120">Guam</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="118">Guatemala</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="107">Guernsey</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="110">Guinea</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="113">Guinea-Bissau</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="121">Guyana</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="126">Haiti</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="123">Heard Island and McDonald Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="124">Honduras</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="122">Hong Kong</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="127">Hungary</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="135">Iceland</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="130">India</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="128">Indonesia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="133">Iran</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="134">Iraq</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="132">Ireland</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="129">Isle of Man</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="136">Israel</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="137">Italy</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="70">Ivory Coast</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="138">Jamaica</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="141">Japan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="139">Jersey</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="140">Jordan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="142">Kazakhstan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="143">Kenya</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="146">Kiribati</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="149">Kosovo</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="150">Kuwait</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="144">Kyrgyzstan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="151">Laos</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="161">Latvia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="152">Lebanon</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="158">Lesotho</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="153">Liberia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="154">Libya</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="156">Liechtenstein</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="159">Lithuania</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="160">Luxembourg</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="162">Macau</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="171">Macedonia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="167">Madagascar</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="183">Malawi</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="184">Malaysia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="168">Maldives</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="172">Mali</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="173">Malta</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="170">Marshall Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="181">Martinique</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="179">Mauritania</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="182">Mauritius</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="185">Mayotte</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="169">Mexico</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="103">Micronesia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="166">Moldova</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="165">Monaco</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="176">Mongolia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="175">Montenegro</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="180">Montserrat</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="164">Morocco</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="178">Mozambique</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="174">Myanmar</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="186">Namibia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="196">Nauru</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="195">Nepal</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="193">Netherlands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="187">New Caledonia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="197">New Zealand</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="191">Nicaragua</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="188">Niger</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="190">Nigeria</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="192">Niue</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="189">Norfolk Island</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="208">North Korea</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="177">Northern Mariana Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="194">Norway</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="198">Oman</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="199">Pakistan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="204">Palau</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="211">Palestine</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="200">Panama</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="205">Papua New Guinea</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="210">Paraguay</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="202">Peru</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="203">Philippines</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="201">Pitcairn Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="206">Poland</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="209">Portugal</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="207">Puerto Rico</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="213">Qatar</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="73">Republic of the Congo</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="214">Réunion</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="215">Romania</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="216">Russia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="217">Rwanda</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="53">Saint Barthélemy</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="147">Saint Kitts and Nevis</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="155">Saint Lucia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="163">Saint Martin</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="229">Saint Pierre and Miquelon</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="263">Saint Vincent and the Grenadines</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="270">Samoa</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="227">San Marino</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="232">São Tomé and Príncipe</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="218">Saudi Arabia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="220">Senegal</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="230">Serbia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="239">Seychelles</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="225">Sierra Leone</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="221">Singapore</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="238">Sint Maarten</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="234">Slovakia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="235">Slovenia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="224">Solomon Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="228">Somalia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="272">South Africa</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="222">South Georgia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="148">South Korea</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="231">South Sudan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="95">Spain</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="157">Sri Lanka</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="219">Sudan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="233">Suriname</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="223">Svalbard and Jan Mayen</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="237">Swaziland</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="236">Sweden</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="67">Switzerland</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="240">Syria</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="254">Taiwan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="245">Tajikistan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="255">Tanzania</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="244">Thailand</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="248">Timor-Leste</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="243">Togo</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="246">Tokelau</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="249">Tonga</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="250">Trinidad and Tobago</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="251">Tunisia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="252">Turkey</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="247">Turkmenistan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="241">Turks and Caicos Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="253">Tuvalu</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="256">Uganda</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="257">Ukraine</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="34">United Arab Emirates</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="105">United Kingdom</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="260">United States</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="258">United States Minor Outlying Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="266">United States Virgin Islands</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="259">Uruguay</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="261">Uzbekistan</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="268">Vanuatu</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="262">Vatican City</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="264">Venezuela</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="267">Vietnam</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="269">Wallis and Futuna</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="94">Western Sahara</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="271">Yemen</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="273">Zambia</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t<option value="274">Zimbabwe</option>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t</select>\n' +
                '\t\t\t\t\t\t\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<input type="text" name="hotel_name" placeholder="type here your hotel name if you know it or your home address (*)">\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<textarea name="comments" placeholder="Type here any comment you\'d like us to know beforehand" rows="5"></textarea>\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<select name="source" id="source">\n' +
                '\t\t\t\t\t\t\t\t<option value="" disabled="" selected="">Where did you find us?</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="internet">Internet search (search engines)</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="social">Social Media</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="newsletter">Newsletter</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="travel_guide">Online travel guide</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="magazine">Travel magazine</option>\n' +
                '\t\t\t\t\t\t\t\t<option value="friend">Friend / Family</option>\n' +
                '\t\t\t\t\t\t\t</select>\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<input type="checkbox" name="age_check" id="age_check"> I am over 18 years old (*).\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<input type="checkbox" name="company_check" id="company_check"> Check if you want a company invoice.\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<input type="checkbox" name="newsletter" id="newsletter"> Check if you want to receive jourday newsletter.\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12">\n' +
                '\t\t\t\t\t\t\t<input type="checkbox" name="newProducts" id="newProducts"> Would like to receive info for new products/activities?\n' +
                '\t\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10 hidden company-check">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input type="text" name="company_name" value="" placeholder="the company\'s name"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10 hidden company-check">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input type="text" name="company_address" value="" placeholder="the company\'s address"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10 hidden company-check">\n' +
                '\t\t\t\t\t\t<div class="col-md-12"><input type="number" min="0" step="1" name="company_vat_number" value="" placeholder="the company\'s VAT number"></div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t\t<div class="row mbot10">\n' +
                '\t\t\t\t\t\t<div class="col-md-12" style="color:red;">(*): Required fields</div>\n' +
                '\t\t\t\t\t</div>\n' +
                '\t\t\t\t</form>\n' +
                '\t\t\t</div>\n' +
                '\t\t<div class="row mbot20">\n' +
                '\t\t<div class="col-md-8 text-right mbot20">\n' +
                '\t\t\t<img src="https://jourday.com/wp-content/themes/jourday/imgs/paypal.png" alt="protected purchases with PayPal">\n' +
                '\t\t</div>\n' +
                '\t\t\t<div class="col-md-4">\n' +
                '\t\t\t\t<a href="javascript:void 0" id="proceed_to_payment_button" target="_self" class="pull-right proceed-button">Proceed to PayPal</a>\n' +
                '\t\t\t</div>\n' +
                '\t\t</div>';

            if (container) {
                container.appendChild(div);
            }
        },
        getUser: function () {
            var user = localStorage.getItem('front_user');
            if (user !== null) {
                return JSON.parse(user);
            }
            return null;
        },
        proceed: function () {
            var self = this;
            var button = document.getElementById('proceed_to_payment_button');
            button.addEventListener('click', function(ev) {
                ev.preventDefault();
                ev.stopPropagation();
                if (!$('#age_check').is(':checked')) {
                    handleMessages({
                        'type': 'failure',
                        'message': 'You have to be 18+ years old to book a travel bite!'
                    });
                    return;
                }
                self.pay();
            });
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
            });
        },
        pay: function() {
            var form = document.getElementById('billing_data_form');
            if (!front_auth.authorized()) {
                var password = form.password.value;
                var passwordConfirmed = form.confirmPassword.value;
                if (password !== passwordConfirmed) {
                    alert('Password does not matched confirmation!');
                    return false;
                }
            }

            var id = null;
            var backpack = localStorage['backpack'];
            if (typeof window.rest_user_id !== 'undefined' && window.rest_user_id && window.rest_user_id.length) {
                id = window.rest_user_id;
            }

            var url = front_wp_host + '?action=front_send_form_post_models&url=/booking/proceed';
            var formData = new FormData(form);
            formData.append('backpack', backpack);
            formData.append('id', id);
            var xhr = new XMLHttpRequest();
            xhr.onload = function () {
                if (this.readyState === 4) {
                    if (this.status === 200) {
                        try {
                            console.log('p', this.response);
                            var response = JSON.parse(this.response);
                            if (typeof response.data.paymentID !== 'undefined') {
                                localStorage.setItem('paymentID', response.data.paymentID);
                            }
                            if (typeof response.data.approvalUrl !== 'undefined') {
                                // window.location.href = response.data.approvalUrl;
                            }
                            alert('Done');

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
        companyInvoiceData: function () {
            var button = $('#company_check');
            var block = $('.company-check');
            if (button.is(':checked')) {
                block.removeClass('hidden');
            }
            button.on('change', function(event) {
                event.preventDefault();
                if ($(this).is(':checked')) {
                    block.removeClass('hidden');
                } else {
                    block.addClass('hidden');
                }
            });
        }
    };
    $scope.$on('$includeContentLoaded', function (event, templateName) {
        if (templateName.indexOf('header') !== -1) {
            front_auth.menuSwitch();
        }
        if (templateName.indexOf('content.html') !== -1) {
            var user = front.getUser();
            if (user) {
                front.getCurrentUserTemplate(user);
            } else {
                front.getNewUserTemplate();
            }
            front.companyInvoiceData();
            front.proceed();
            front.powerStrength();
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