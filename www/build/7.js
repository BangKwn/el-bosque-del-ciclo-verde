webpackJsonp([7],{

/***/ 790:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CheckoutPageModule", function() { return CheckoutPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__checkout__ = __webpack_require__(800);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var CheckoutPageModule = /** @class */ (function () {
    function CheckoutPageModule() {
    }
    CheckoutPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__checkout__["a" /* CheckoutPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__checkout__["a" /* CheckoutPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__checkout__["a" /* CheckoutPage */]
            ]
        })
    ], CheckoutPageModule);
    return CheckoutPageModule;
}());

//# sourceMappingURL=checkout.module.js.map

/***/ }),

/***/ 800:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CheckoutPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_storage__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_paypal__ = __webpack_require__(489);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__ = __webpack_require__(486);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var CheckoutPage = /** @class */ (function () {
    function CheckoutPage(navCtrl, navParams, storage, alertCtrl, payPal, WP) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.alertCtrl = alertCtrl;
        this.payPal = payPal;
        this.WP = WP;
        this.newOrder = {};
        this.newOrder.billing = {};
        this.newOrder.shipping = {};
        this.billing_shipping_same = false;
        this.paymentMethods = [
            { method_id: "bacs", method_title: "Direct Bank Transfer" },
            { method_id: "cheque", method_title: "Cheque Payment" },
            { method_id: "cod", method_title: "Cash on Delivery" },
            { method_id: "paypal", method_title: "PayPal" }
        ];
        this.WooCommerce = WP.init();
    }
    CheckoutPage.prototype.setBillingToShipping = function () {
        this.billing_shipping_same = !this.billing_shipping_same;
        if (this.billing_shipping_same) {
            this.newOrder.shipping = this.newOrder.billing;
        }
    };
    CheckoutPage.prototype.placeOrder = function () {
        var _this = this;
        var orderItems = [];
        var data = {};
        var paymentData = {};
        this.paymentMethods.forEach(function (element, index) {
            if (element.method_id == _this.paymentMethod) {
                paymentData = element;
            }
        });
        data = {
            //Fixed a bug here. Updated in accordance with wc/v2 API
            payment_method: paymentData.method_id,
            payment_method_title: paymentData.method_title,
            set_paid: true,
            billing: this.newOrder.billing,
            shipping: this.newOrder.shipping,
            line_items: orderItems
        };
        if (paymentData.method_id == "paypal") {
            this.storage.get("cart").then(function (cart) {
                _this.payPal.init({
                    PayPalEnvironmentProduction: "AVNOvvhGRxLhUqUzHburwScJUM7RqQOrW536jKhnfnB0Ou2ObZoxwl-DNbHw8TNPmgD7JzKorPBVajF",
                    PayPalEnvironmentSandbox: "AYRr5hfq00I-CcbYlhvqkhLpEMyRJ69i9lgut8_8QnhHL4f6WuHDq6RS8_ADSMlhmk9rqBHKGcnUK8KS"
                }).then(function () {
                    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                    _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new __WEBPACK_IMPORTED_MODULE_3__ionic_native_paypal__["b" /* PayPalConfiguration */]({})).then(function () {
                        var total = 0.00;
                        cart.forEach(function (element) {
                            if (element.variation) {
                                orderItems.push({ product_id: element.product.id, variation_id: element.variation.id, quantity: element.qty });
                                _this.tot = total + (element.variation.price * element.qty);
                            }
                            else {
                                orderItems.push({ product_id: element.product.id, quantity: element.qty });
                                _this.tot = total + (element.product.price * element.qty);
                            }
                        });
                        var payment = new __WEBPACK_IMPORTED_MODULE_3__ionic_native_paypal__["c" /* PayPalPayment */](_this.tot.toString(), 'USD', 'Description', 'sale');
                        _this.payPal.renderSinglePaymentUI(payment).then(function (response) {
                            // Successfully paid
                            alert(JSON.stringify(response));
                            data.line_items = orderItems;
                            //console.log(data);
                            var orderData = {};
                            orderData.order = data;
                            _this.WooCommerce.postAsync('orders', orderData.order).then(function (data) {
                                alert("Order placed successfully!");
                                var response = (JSON.parse(data.body));
                                _this.alertCtrl.create({
                                    title: "Order Placed Successfully",
                                    message: "Your order has been placed successfully. Your order number is " + _this.tot,
                                    buttons: [{
                                            text: "OK",
                                            handler: function () {
                                                _this.navCtrl.push('HomePage');
                                            }
                                        }]
                                }).present();
                            });
                        });
                    }, function () {
                        // Error or render dialog closed without being successful
                    });
                }, function () {
                    // Error in configuration
                });
            }, function () {
                // Error in initialization, maybe PayPal isn't supported or something else
            });
        }
        else {
            this.storage.get("cart").then(function (cart) {
                var total = 0.00;
                cart.forEach(function (element) {
                    if (element.variation) {
                        orderItems.push({ product_id: element.product.id, variation_id: element.variation.id, quantity: element.qty });
                        _this.tot = total + (element.variation.price * element.qty);
                    }
                    else {
                        orderItems.push({ product_id: element.product.id, quantity: element.qty });
                        _this.tot = total + (element.product.price * element.qty);
                    }
                });
                _this.payPal.init({
                    PayPalEnvironmentProduction: "",
                    PayPalEnvironmentSandbox: "AYRr5hfq00I-CcbYlhvqkhLpEMyRJ69i9lgut8_8QnhHL4f6WuHDq6RS8_ADSMlhmk9rqBHKGcnUK8KS"
                }).then(function () {
                    // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
                    _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new __WEBPACK_IMPORTED_MODULE_3__ionic_native_paypal__["b" /* PayPalConfiguration */]({})).then(function () {
                        var payment = new __WEBPACK_IMPORTED_MODULE_3__ionic_native_paypal__["c" /* PayPalPayment */](_this.tot.toString(), 'USD', 'Description', 'sale');
                        _this.payPal.renderSinglePaymentUI(payment).then(function () {
                        }, function () {
                            // Error or render dialog closed without being successful
                        });
                    }, function () {
                        // Error in configuration
                    });
                }, function () {
                    // Error in initialization, maybe PayPal isn't supported or something else
                });
                data.line_items = orderItems;
                var orderData = {};
                orderData.order = data;
                _this.WooCommerce.postAsync("orders", orderData.order).then(function (data) {
                    var response = (JSON.parse(data.body));
                    _this.alertCtrl.create({
                        title: "Order Placed Successfully",
                        message: "Your order has been placed successfully. Your order number is " + response.order_number,
                        buttons: [{
                                text: "OK",
                                handler: function () {
                                    _this.navCtrl.setRoot('HomePage');
                                }
                            }]
                    }).present();
                });
            });
        }
    };
    CheckoutPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-checkout',template:/*ion-inline-start:"c:\wamp\www\bv\src\pages\checkout\checkout.html"*/'<ion-header>\n\n  <ion-navbar>\n    <ion-title>Checkout</ion-title>\n  </ion-navbar>\n\n</ion-header> \n\n\n<ion-content>\n  {{ tot }}\n    <ion-list>\n      <ion-item-divider color="danger">Personal Details</ion-item-divider>\n      <ion-item>\n        <ion-label>First Name</ion-label>\n        <ion-input type="text" [(ngModel)]="newOrder.billing.first_name"></ion-input>\n      </ion-item>\n \n      <ion-item>\n        <ion-label>Last Name</ion-label>\n        <ion-input type="text" [(ngModel)]="newOrder.billing.last_name"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Email</ion-label>\n        <ion-input type="email" [(ngModel)]="newOrder.billing.email"></ion-input>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Username</ion-label>\n        <ion-input type="text" [(ngModel)]="newOrder.billing.username"></ion-input>\n      </ion-item>\n\n      <ion-item-divider color="danger">Billing Details</ion-item-divider>\n\n      <ion-item>\n        <ion-label>Address Line 1</ion-label>\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.billing.address_1"></ion-textarea>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Address Line 2</ion-label>\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.billing.address_2"></ion-textarea>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>Country</ion-label>\n        <ion-select [(ngModel)]="newOrder.billing.country">\n          <ion-option value="India" selected="true">India</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>State</ion-label>\n        <ion-select [(ngModel)]="newOrder.billing.state">\n          <ion-option value="New Delhi">New Delhi</ion-option>\n          <ion-option value="Uttar Pradesh">Uttar Pradesh</ion-option>\n          <ion-option value="Maharashtra">Maharashtra</ion-option>\n          <ion-option value="Tamil Nadu">Tamil Nadu</ion-option>\n          <ion-option value="Madhya Pradesh">Madhya Pradesh</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item>\n        <ion-label>City</ion-label>\n        <ion-input type="text" [(ngModel)]="newOrder.billing.city"></ion-input>        \n      </ion-item>\n\n      <ion-item>\n        <ion-label>Postal Code</ion-label>\n        <ion-input type="number" clearInput [(ngModel)]="newOrder.billing.postcode"></ion-input>        \n      </ion-item>\n\n      <ion-item>\n        <ion-label>Phone</ion-label>\n        <ion-input type="tel" clearInput [(ngModel)]="newOrder.billing.phone"></ion-input>        \n      </ion-item>\n\n      <ion-item>\n        <ion-label>Same Shipping Details</ion-label>\n        <ion-checkbox (ionChange)="setBillingToShipping()"></ion-checkbox>\n      </ion-item>\n\n      <ion-item-divider color="danger" *ngIf="!billing_shipping_same">Shipping Details</ion-item-divider>\n      \n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>First Name</ion-label>\n        <ion-input type="text" [(ngModel)]="newOrder.shipping.first_name"></ion-input>\n      </ion-item>\n\n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>Last Name</ion-label>\n        <ion-input type="text" [(ngModel)]="newOrder.shipping.last_name"></ion-input>\n      </ion-item>\n      \n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>Address Line 1</ion-label>\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.shipping.address_1"></ion-textarea>\n      </ion-item>\n\n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>Address Line 2</ion-label>\n        <ion-textarea type="text" maxlength="80" [(ngModel)]="newOrder.shipping.address_2"></ion-textarea>\n      </ion-item>\n\n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>Country</ion-label>\n        <ion-select [(ngModel)]="newOrder.shipping.country">\n          <ion-option value="India" selected="true">India</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>State</ion-label>\n        <ion-select [(ngModel)]="newOrder.shipping.state">\n          <ion-option value="New Delhi">New Delhi</ion-option>\n          <ion-option value="Uttar Pradesh">Uttar Pradesh</ion-option>\n          <ion-option value="Maharashtra">Maharashtra</ion-option>\n          <ion-option value="Tamil Nadu">Tamil Nadu</ion-option>\n          <ion-option value="Madhya Pradesh">Madhya Pradesh</ion-option>\n        </ion-select>\n      </ion-item>\n\n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>City</ion-label>\n        <ion-input type="text" [(ngModel)]="newOrder.shipping.city"></ion-input>        \n      </ion-item>\n\n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>Postal Code</ion-label>\n        <ion-input type="number" clearInput [(ngModel)]="newOrder.shipping.postcode"></ion-input>        \n      </ion-item>\n\n      <ion-item *ngIf="!billing_shipping_same">\n        <ion-label>Phone</ion-label>\n        <ion-input type="tel" clearInput [(ngModel)]="newOrder.shipping.phone"></ion-input>        \n      </ion-item>\n\n      <ion-item-divider color="danger">Payment Details</ion-item-divider>\n\n      <ion-item>\n        <ion-label>Payment Method</ion-label>\n        <ion-select [(ngModel)]="paymentMethod">\n          <ion-option *ngFor="let p of paymentMethods" value="{{p.method_id}}">{{ p.method_title }}</ion-option>\n        </ion-select>\n      </ion-item>\n\n    </ion-list>\n\n</ion-content>\n\n<ion-footer>\n  <button ion-button block color="danger" id="buyNowBtn" (click)="placeOrder()">Place Order</button>\n</ion-footer> '/*ion-inline-end:"c:\wamp\www\bv\src\pages\checkout\checkout.html"*/,
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__ionic_storage__["b" /* Storage */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */]) === "function" && _d || Object, typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_3__ionic_native_paypal__["a" /* PayPal */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__ionic_native_paypal__["a" /* PayPal */]) === "function" && _e || Object, typeof (_f = typeof __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]) === "function" && _f || Object])
    ], CheckoutPage);
    return CheckoutPage;
    var _a, _b, _c, _d, _e, _f;
}());

//# sourceMappingURL=checkout.js.map

/***/ })

});
//# sourceMappingURL=7.js.map