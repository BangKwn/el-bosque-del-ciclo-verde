webpackJsonp([5],{

/***/ 792:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomePageModule", function() { return HomePageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home__ = __webpack_require__(802);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var HomePageModule = /** @class */ (function () {
    function HomePageModule() {
    }
    HomePageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__home__["a" /* HomePage */]
            ]
        })
    ], HomePageModule);
    return HomePageModule;
}());

//# sourceMappingURL=home.module.js.map

/***/ }),

/***/ 802:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__ = __webpack_require__(486);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, toastCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.toastCtrl = toastCtrl;
        this.WP = WP;
        this.products = [];
        this.moreproducts = [];
        this.searchQuery = "";
        this.produc = [];
        this.page = 2;
        this.WooCommerce = WP.init();
        this.LoadMoreProducts(null);
        this.WooCommerce.getAsync('products').then(function (data) {
            _this.products = JSON.parse(data.body);
            console.log(JSON.parse(data.body));
            for (var k = 0; k <= _this.products.length; k++) {
                _this.produc.push(_this.products[k]);
            }
        }, function (err) {
            console.log(err);
        });
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        setInterval(function () {
            if (_this.productSlides.getActiveIndex() == _this.productSlides.length() - 1) {
                _this.productSlides.slideTo(0);
            }
            _this.productSlides.slideNext();
        }, 3000);
    };
    HomePage.prototype.LoadMoreProducts = function (event) {
        var _this = this;
        if (event == null) {
            this.page = 2;
            this.moreproducts = [];
        }
        else {
            this.page++;
        }
        this.WooCommerce.getAsync("products?page=" + this.page).then(function (data) {
            _this.moreproducts = _this.moreproducts.concat(_this.produc);
            if (event != null) {
                event.complete();
            }
            if (JSON.parse(data.body).products < 10) {
                event.enable(false);
                _this.toastCtrl.create({
                    message: "No more products to load!",
                    duration: 3000
                }).present();
            }
        }, function (err) {
            console.log(err);
        });
    };
    HomePage.prototype.openProductPage = function (product) {
        this.navCtrl.push('ProductDetailsPage', { "product": product });
    };
    HomePage.prototype.onSearch = function (event) {
        if (this.searchQuery.length > 0) {
            this.navCtrl.push('SearchPage', { "searchQuery": this.searchQuery });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('productSlides'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["l" /* Slides */])
    ], HomePage.prototype, "productSlides", void 0);
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"c:\wamp\www\bv\src\pages\home\home.html"*/'<ion-header>\n  <ion-navbar color="danger">\n    <button ion-button menuToggle>\n      <ion-icon name="menu"></ion-icon>\n    </button>\n    <ion-title>Inicio</ion-title>\n  </ion-navbar>\n\n  <ion-toolbar color="danger">\n    <ion-searchbar [(ngModel)]="searchQuery" (search)="onSearch($event)"></ion-searchbar>\n  </ion-toolbar>\n\n</ion-header>\n\n\n\n<ion-content no-padding>\n\n<ion-grid>\n  <ion-row>\n    <ion-card>\n    <img src="./assets/imgs/banner.jpg">\n  </ion-card>\n  </ion-row>\n</ion-grid>\n\n<ion-grid>\n  <ion-row>\n    <ion-slides #productSlides>\n      <ion-slide *ngFor="let product of products">\n        <ion-card no-padding *ngFor="let image of product.images">\n          <img [src]="image.src">\n          <h1 padding center> {{ product?.name }} </h1>\n          <p padding center [innerHTML]="product?.short_description"></p>\n        </ion-card>\n      </ion-slide>\n    </ion-slides>\n  </ion-row>\n</ion-grid>\n\n<ion-list>\n  <ion-item *ngFor="let product of moreproducts" text-wrap (click)="openProductPage(product)">\n    <ion-thumbnail item-left>\n      <img [src]="product?.featured_src">\n    </ion-thumbnail>\n\n    <h2>{{ product?.name }}</h2>\n\n    <p>\n      <span [innerHTML]="product?.short_description.substr(0, 30) + \'...\'"></span>\n      <span [innerHTML]="product?.price_html"></span>\n    </p>\n\n    <button ion-button icon clear item-right>\n        <ion-icon name="arrow-round-forward"></ion-icon>\n    </button>\n  </ion-item>\n</ion-list>\n\n<ion-infinite-scroll (ionInfinite)="LoadMoreProducts($event)">\n  <ion-infinite-scroll-content></ion-infinite-scroll-content>\n</ion-infinite-scroll>\n\n</ion-content>\n'/*ion-inline-end:"c:\wamp\www\bv\src\pages\home\home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["m" /* ToastController */], __WEBPACK_IMPORTED_MODULE_2__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ })

});
//# sourceMappingURL=5.js.map