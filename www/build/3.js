webpackJsonp([3],{

/***/ 794:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MenuPageModule", function() { return MenuPageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__menu__ = __webpack_require__(804);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var MenuPageModule = /** @class */ (function () {
    function MenuPageModule() {
    }
    MenuPageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */]),
            ],
            exports: [
                __WEBPACK_IMPORTED_MODULE_2__menu__["a" /* MenuPage */]
            ]
        })
    ], MenuPageModule);
    return MenuPageModule;
}());

//# sourceMappingURL=menu.module.js.map

/***/ }),

/***/ 804:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MenuPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__cart_cart__ = __webpack_require__(487);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_storage__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__ = __webpack_require__(486);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__login_login__ = __webpack_require__(491);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var MenuPage = /** @class */ (function () {
    function MenuPage(navCtrl, navParams, storage, modalCtrl, WP) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.storage = storage;
        this.modalCtrl = modalCtrl;
        this.WP = WP;
        this.categories = [];
        this.loggedIn = false;
        this.homePage = 'HomePage';
        this.categories = [];
        this.user = {};
        this.WooCommerce = WP.init();
        this.WooCommerce.getAsync("products/categories").then(function (data) {
            var temp = JSON.parse(data.body).product_categories;
            for (var i = 0; i < temp; i++) {
                if (temp[i].parent == 0) {
                    if (temp[i].slug == "clothing") {
                        temp[i].icon = "shirt";
                    }
                    if (temp[i].slug == "music") {
                        temp[i].icon = "musical-notes";
                    }
                    if (temp[i].slug == "posters") {
                        temp[i].icon = "images";
                    }
                    _this.categories.push(temp[i]);
                }
            }
        }, function (err) {
            console.log(err);
        });
    }
    MenuPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.storage.ready().then(function () {
            _this.storage.get("userLoginInfo").then(function (userLoginInfo) {
                if (userLoginInfo != null) {
                    console.log("User logged in...");
                    _this.user = userLoginInfo;
                    console.log(_this.user);
                    _this.loggedIn = true;
                }
                else {
                    console.log("No user found.");
                    _this.user = {};
                    _this.loggedIn = false;
                }
            });
        });
    };
    MenuPage.prototype.openCategoryPage = function (category) {
        this.childNavCtrl.setRoot('ProductByCategoryPage', { "category": category });
    };
    MenuPage.prototype.openPage = function (pageName) {
        var _this = this;
        if (pageName == "signup") {
            this.navCtrl.push('SignupPage');
        }
        if (pageName == "login") {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__login_login__["a" /* LoginPage */]);
        }
        if (pageName == "logout") {
            this.storage.remove("userLoginInfo").then(function () {
                _this.user = {};
                _this.loggedIn = false;
            });
        }
        if (pageName == "cart") {
            var modal = this.modalCtrl.create(__WEBPACK_IMPORTED_MODULE_2__cart_cart__["a" /* CartPage */]);
            modal.present();
        }
        if (pageName == "bosky") {
            this.navCtrl.push('Bosky3Page');
        }
        if (pageName == "santa") {
            this.navCtrl.push("ArPage");
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])('content'),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */])
    ], MenuPage.prototype, "childNavCtrl", void 0);
    MenuPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-menu',template:/*ion-inline-start:"c:\wamp\www\bv\src\pages\menu\menu.html"*/'<ion-menu [content]="content">\n  <ion-header>\n    <ion-toolbar color="danger">\n      <ion-title>Menu</ion-title>\n    </ion-toolbar>\n  </ion-header>\n\n  <ion-content class="card-background-page">\n\n    <ion-card>\n      <img src="./assets/imgs/1.png">\n    </ion-card>\n\n    <ion-list>\n      <ion-item *ngFor="let category of categories" text-wrap (click)="openCategoryPage(category)" menuClose>\n        <ion-icon [name]="category.icon" item-left large></ion-icon>\n        <h2>\n          {{ category.name }}\n        </h2>\n        <p>\n          {{ category.description }}\n        </p>\n      </ion-item>\n\n      <ion-item-divider color="danger">Cuenta</ion-item-divider>\n      <ion-item (click)="openPage(\'bosky\')" menuClose>\n        <ion-icon name="chatbubbles" item-left large></ion-icon>\n        <h2>\n          Bosky "El Protector del Bosque"\n        </h2>\n        <p>\n          Chatea un rato con bosky\n        </p>\n      </ion-item>\n      <ion-item (click)="openPage(\'santa\')" menuClose>\n        <ion-icon name="snow" item-left large></ion-icon>\n        <h2>\n          Realidad Aumentada\n        </h2>\n        <p>\n          Una experiencia nueva\n        </p>\n      </ion-item>\n      <ion-item (click)="openPage(\'santa\')" menuClose>\n        <ion-icon name="snow" item-left large></ion-icon>\n        <h2>\n          MApa del sitios\n        </h2>\n        <p>\n          Para no perderte\n        </p>\n      </ion-item>\n      <ion-item (click)="openPage(\'signup\')" menuClose *ngIf="!loggedIn">\n        <ion-icon name="md-clipboard" item-left large></ion-icon>\n        <h2>\n          Crear una cuenta\n        </h2>\n        <p>\n          crea una cuenta y disfruta del contenido especial\n        </p>\n      </ion-item>\n\n      <ion-item (click)="openPage(\'login\')" menuClose *ngIf="!loggedIn">\n        <ion-icon name="log-in" item-left large></ion-icon>\n        <h2>\n          Iniciar sesión\n        </h2>\n        <p>\n          Usa nombre de usuario o correo\n        </p>\n      </ion-item>\n      <ion-item (click)="openPage(\'santa\')" menuClose>\n        <ion-icon name="snow" item-left large></ion-icon>\n        <h2>\n          Encuesta de satisfacción\n        </h2>\n        <p>\n          Calificanos por favor!\n        </p>\n      </ion-item>\n      <ion-item *ngIf="loggedIn" menuClose>\n        <ion-icon name="contact" item-left large></ion-icon>\n        <h2>{{ this.user.first_name == \'\' ? this.user.username : this.user.first_name || "" }}</h2>\n        <p>Welcome</p>\n      </ion-item>\n\n      <ion-item (click)="openPage(\'cart\')" menuClose>\n        <ion-icon name="cart" item-left large></ion-icon>\n        <h2>Tu carrito</h2>\n        <p>Verifica tus articulos</p>\n      </ion-item>\n\n      <ion-item *ngIf="loggedIn" (click)="openPage(\'logout\')" menuClose>\n        <ion-icon name="log-out" item-left large></ion-icon>\n        <h2>Cerrar sesión</h2>\n        <p>Vuelve pronto</p>\n      </ion-item>\n\n    </ion-list>\n  </ion-content>\n\n</ion-menu> \n\n<ion-nav #content [root]="homePage"></ion-nav>\n'/*ion-inline-end:"c:\wamp\www\bv\src\pages\menu\menu.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_3__ionic_storage__["b" /* Storage */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */], __WEBPACK_IMPORTED_MODULE_4__providers_woocommerce_woocommerce__["a" /* WoocommerceProvider */]])
    ], MenuPage);
    return MenuPage;
}());

//# sourceMappingURL=menu.js.map

/***/ })

});
//# sourceMappingURL=3.js.map