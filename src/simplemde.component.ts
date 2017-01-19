import {
  Component,
  NgModule,
  forwardRef,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ModuleWithProviders,
  Inject
} from '@angular/core'
import {
  NG_VALUE_ACCESSOR
} from '@angular/forms'
import { CommonModule } from '@angular/common'
import { FormsModule } from '@angular/forms'
import { NgModelBase } from './utils'
import { SIMPLEMDE_CONFIG } from './config'

// use local style
import 'simplemde/dist/simplemde.min.css'
const SimpleMDE = require('simplemde')

const SIMPLEMDE_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => Simplemde),
  multi: true
}

@Component({
  selector: 'simplemde',
  template: `
    <textarea #simplemde></textarea>
  `,
  providers: [
    SIMPLEMDE_CONTROL_VALUE_ACCESSOR
  ]
})
export class Simplemde extends NgModelBase implements AfterViewInit, OnDestroy {
  @ViewChild('simplemde') textarea: ElementRef

  private simplemde: SimpleMDE

  writeValue(v: any) {
    if (v !== this._innerValue) {
      this._innerValue = v
      if (this.value != null) {
        this.simplemde.value(this.value)
      }
    }
  }

  ngAfterViewInit() {
    if (typeof this.config !== 'object') {
      throw 'config is not an object'
    }
    // copy
    const config = Object.assign({}, this.config)
    config.element = this.textarea.nativeElement

    this.simplemde = new SimpleMDE(config)

    this.simplemde.codemirror.on('change', () => {
      this.value = this.simplemde.value()
    })
  }

  ngOnDestroy() {
    this.simplemde = null
  }

  constructor(
    private _elementRef: ElementRef,
    @Inject(SIMPLEMDE_CONFIG) private config
  ) {
    super()
  }

}

@NgModule({
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
export class SimplemdeModule {
  static forRoot(configProvider: any = {
    provide: SIMPLEMDE_CONFIG,
    useValue: {}
  }): ModuleWithProviders {
    return {
      ngModule: SimplemdeModule,
      providers: [
        configProvider
      ]
    }
  }
}