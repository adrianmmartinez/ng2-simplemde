import { ElementRef, AfterViewInit, OnDestroy, ModuleWithProviders } from '@angular/core';
import { NgModelBase } from './utils';
import * as SimpleMDE from 'simplemde';
export declare class Simplemde extends NgModelBase implements AfterViewInit, OnDestroy {
    private config;
    textarea: ElementRef;
    options: SimpleMDE.Options;
    codemirror: any;
    data: any;
    private simplemde;
    private tmpValue;
    writeValue(v: any): void;
    updateValue(evt: any): void;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    constructor(config: any);
}
export declare class SimplemdeModule {
    static forRoot(configProvider?: any): ModuleWithProviders;
}
