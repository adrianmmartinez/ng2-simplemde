var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Component, NgModule, forwardRef, ElementRef, ViewChild, Input, Inject } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModelBase } from './utils';
import { SIMPLEMDE_CONFIG } from './config';
import * as SimpleMDE from 'simplemde';
var SIMPLEMDE_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return Simplemde; }),
    multi: true
};
var Simplemde = /** @class */ (function (_super) {
    __extends(Simplemde, _super);
    function Simplemde(config) {
        var _this = _super.call(this) || this;
        _this.config = config;
        _this.options = {};
        _this.codemirror = {};
        _this.data = null;
        _this.tmpValue = null;
        _this.data = _this.textarea.nativeElement.value;
        console.log(_this.data);
        return _this;
    }
    Simplemde.prototype.writeValue = function (v) {
        if (v !== this._innerValue) {
            this._innerValue = v;
            if (this.simplemde && this.value != null) {
                this.simplemde.value(this.value);
            }
            if (!this.simplemde) {
                this.tmpValue = this.value;
            }
        }
    };
    Simplemde.prototype.updateValue = function (evt) {
        console.log('textarea data', this.data);
        this.writeValue(this.data);
    };
    Simplemde.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (typeof this.config !== 'object' || typeof this.options !== 'object') {
            throw 'config is not an object';
        }
        var config = __assign({}, this.config, this.options);
        config.element = this.textarea.nativeElement;
        this.simplemde = new SimpleMDE(config);
        Object.keys(this.codemirror).forEach(function (k) {
            _this.simplemde.codemirror.setOption(k, _this.codemirror[k]);
        });
        if (this.tmpValue) {
            this.simplemde.value(this.tmpValue);
            this.tmpValue = null;
        }
        if (this.data) {
            this.simplemde.value(this.data);
        }
        this.simplemde.codemirror.on('change', function () {
            _this.value = _this.simplemde.value();
        });
    };
    Simplemde.prototype.ngOnDestroy = function () {
        this.simplemde = null;
    };
    __decorate([
        ViewChild('simplemde'),
        __metadata("design:type", ElementRef)
    ], Simplemde.prototype, "textarea", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Simplemde.prototype, "options", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], Simplemde.prototype, "codemirror", void 0);
    Simplemde = __decorate([
        Component({
            selector: 'simplemde',
            template: "<textarea [(ngModel)]='this.data' (ngModelChange)='updateValue($event)' #simplemde></textarea>",
            providers: [
                SIMPLEMDE_CONTROL_VALUE_ACCESSOR
            ]
        }),
        __param(0, Inject(SIMPLEMDE_CONFIG)),
        __metadata("design:paramtypes", [Object])
    ], Simplemde);
    return Simplemde;
}(NgModelBase));
export { Simplemde };
var SimplemdeModule = /** @class */ (function () {
    function SimplemdeModule() {
    }
    SimplemdeModule_1 = SimplemdeModule;
    SimplemdeModule.forRoot = function (configProvider) {
        if (configProvider === void 0) { configProvider = {
            provide: SIMPLEMDE_CONFIG,
            useValue: {}
        }; }
        return {
            ngModule: SimplemdeModule_1,
            providers: [
                configProvider
            ]
        };
    };
    var SimplemdeModule_1;
    SimplemdeModule = SimplemdeModule_1 = __decorate([
        NgModule({
            declarations: [
                Simplemde
            ],
            imports: [
                FormsModule,
                CommonModule
            ],
            exports: [
                Simplemde,
                FormsModule,
                CommonModule
            ]
        })
    ], SimplemdeModule);
    return SimplemdeModule;
}());
export { SimplemdeModule };
//# sourceMappingURL=component.js.map