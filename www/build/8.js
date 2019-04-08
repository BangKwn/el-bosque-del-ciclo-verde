webpackJsonp([8],{

/***/ 789:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Bosky3PageModule", function() { return Bosky3PageModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bosky3__ = __webpack_require__(799);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var Bosky3PageModule = /** @class */ (function () {
    function Bosky3PageModule() {
    }
    Bosky3PageModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_2__bosky3__["a" /* Bosky3Page */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["f" /* IonicPageModule */].forChild(__WEBPACK_IMPORTED_MODULE_2__bosky3__["a" /* Bosky3Page */]),
            ],
        })
    ], Bosky3PageModule);
    return Bosky3PageModule;
}());

//# sourceMappingURL=bosky3.module.js.map

/***/ }),

/***/ 799:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Bosky3Page; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(91);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_weather_agent_weather_agent__ = __webpack_require__(488);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the Bosky3Page page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var Bosky3Page = /** @class */ (function () {
    function Bosky3Page(navCtrl, navParams, weatherAgent, modalCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.weatherAgent = weatherAgent;
        this.modalCtrl = modalCtrl;
        this.messages = [];
        this.chatBox = "";
        this.currentDate = Date.now();
        this.weatherAgent.conversation.subscribe(function (res) {
            _this.messages = _this.messages.concat(res);
            _this.scrollToBottom();
        });
    }
    Bosky3Page.prototype.send = function (chatBox) {
        var _this = this;
        //console.log(chatBox);
        this.weatherAgent.talk(chatBox).then(function () {
            _this.chatBox = "";
        });
    };
    Bosky3Page.prototype.scrollToBottom = function () {
        var _this = this;
        setTimeout(function () {
            _this.content.scrollToBottom();
        });
    };
    Bosky3Page.prototype.keyPressHandler = function (keyCode, chatBox) {
        var _this = this;
        //console.log("keyPressHandler", keyCode);
        // Pressed enter key.
        if (keyCode == 13) {
            this.weatherAgent.talk(chatBox).then(function () {
                _this.chatBox = "";
            });
        }
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_8" /* ViewChild */])(__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */]),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* Content */])
    ], Bosky3Page.prototype, "content", void 0);
    Bosky3Page = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-bosky3',template:/*ion-inline-start:"c:\wamp\www\bv\src\pages\bosky3\bosky3.html"*/'<ion-header>\n  <ion-navbar color="danger">\n      <ion-buttons start>\n          <button ion-button menuToggle>\n            <ion-icon name="menu"></ion-icon>\n          </button>\n        </ion-buttons>\n    <ion-title> \n      Bosky\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content padding>\n  <ion-list no-lines>\n    <ion-item text-wrap *ngFor="let m of messages" [ngClass]="{ \'from\': m.from === \'bot\',\'to\':   m.from === \'user\' }">\n      <ion-avatar item-start>\n        <img [src]="m.from === \'bot\' ? \'https://cdn3.iconfinder.com/data/icons/avatars-9/145/Avatar_Robot-512.png\' : \'https://image.flaticon.com/icons/png/128/149/149071.png\'">\n      </ion-avatar>\n      <h2>\n        <strong>{{m.from}}</strong>\n      </h2>\n      <div class="message">{{m.msg}}</div>\n      <p>\n        <img *ngIf="m.iconURL != \'\'" [src]="m.iconURL" (click)="onClickWeatherIcon()" />\n      </p>\n    </ion-item>\n  </ion-list>\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar color="danger">\n    <ion-input type="text" [(ngModel)]="chatBox" placeholder="Message..." (keypress)="keyPressHandler($event.keyCode, chatBox)"></ion-input>\n    <ion-buttons end>\n      <button ion-button (click)="send(chatBox)">\n        <ion-icon name="send"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"c:\wamp\www\bv\src\pages\bosky3\bosky3.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* NavParams */], __WEBPACK_IMPORTED_MODULE_2__providers_weather_agent_weather_agent__["a" /* WeatherAgentProvider */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["g" /* ModalController */]])
    ], Bosky3Page);
    return Bosky3Page;
}());

//# sourceMappingURL=bosky3.js.map

/***/ })

});
//# sourceMappingURL=8.js.map