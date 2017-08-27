webpackJsonpac__name_([4],{

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChildBarrelComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(7);


/**
 * We're loading this component asynchronously
 * We are using some magic with es6-promise-loader that will wrap the module with a Promise
 * see https://github.com/gdi2290/es6-promise-loader for more info
 */
console.log('`ChildBarrel` component loaded asynchronously');
var ChildBarrelComponent = (function () {
    function ChildBarrelComponent() {
    }
    ChildBarrelComponent.prototype.ngOnInit = function () {
        console.log('hello `ChildBarrel` component');
    };
    return ChildBarrelComponent;
}());
ChildBarrelComponent = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["_10" /* Component */])({
        selector: 'child-barrel',
        template: "\n    <h1>Hello from Child Barrel</h1>    \n  ",
    })
], ChildBarrelComponent);



/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChildBarrelModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(178);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_core__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_router__ = __webpack_require__(101);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__child_barrel_routes__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__child_barrel_component__ = __webpack_require__(387);







console.log('`ChildBarrel` bundle loaded asynchronously');
var ChildBarrelModule = (function () {
    function ChildBarrelModule() {
    }
    return ChildBarrelModule;
}());
ChildBarrelModule.routes = __WEBPACK_IMPORTED_MODULE_5__child_barrel_routes__["a" /* routes */];
ChildBarrelModule = __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __decorate */]([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__angular_core__["y" /* NgModule */])({
        declarations: [
            /**
             * Components / Directives/ Pipes
             */
            __WEBPACK_IMPORTED_MODULE_6__child_barrel_component__["a" /* ChildBarrelComponent */],
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["e" /* CommonModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_4__angular_router__["a" /* RouterModule */].forChild(__WEBPACK_IMPORTED_MODULE_5__child_barrel_routes__["a" /* routes */]),
        ],
    })
], ChildBarrelModule);



/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routes; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__child_barrel_component__ = __webpack_require__(387);

var routes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_0__child_barrel_component__["a" /* ChildBarrelComponent */], pathMatch: 'full' },
];


/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__child_barrel_module__ = __webpack_require__(391);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ChildBarrelModule", function() { return __WEBPACK_IMPORTED_MODULE_0__child_barrel_module__["a"]; });



/***/ })

});
//# sourceMappingURL=4.chunk.js.map