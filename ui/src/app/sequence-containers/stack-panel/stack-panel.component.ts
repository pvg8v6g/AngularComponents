import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

// region Interface

export declare type Orientation = 'horizontal' | 'vertical';
export declare type Alignment = 'start' | 'end';

// endregion

@Component({
  selector: 'app-stack-panel',
  templateUrl: './stack-panel.component.html',
  styleUrls: ['./stack-panel.component.scss']
})
export class StackPanelComponent implements OnInit, AfterViewInit {

  // region Fields

  @ViewChild('root') root: ElementRef<HTMLElement>;

  @Input() spacing: string = '0px';
  @Input() width: string;
  @Input() height: string;
  @Input() background: string;
  @Input() marginBottom: string;
  @Input() marginLeft: string;
  @Input() marginRight: string;
  @Input() marginTop: string;
  @Input() orientation: Orientation = 'vertical';
  @Input() alignment: Alignment = 'start';

  // private _disabled: boolean = false;
  _orientation: string = 'column nowrap';
  _alignment: string = 'flex-start';

  // @Input() set disabled(value: boolean) {
  //   this._disabled = value;
  //   if (this.disabled) this.disableElement(this.root?.nativeElement);
  // }
  //
  // get disabled(): boolean {
  //   return this._disabled;
  // }

  // endregion

  // region Constructor

  constructor() {
  }

  // endregion

  // region Overrides

  ngOnInit(): void {
    switch (this.orientation) {
      case "horizontal":
        this._orientation = 'row nowrap';
        break;
      case "vertical":
        this._orientation = 'column nowrap';
        break;
    }

    switch (this.alignment) {
      case "start":
        this._alignment = 'flex-start';
        break;
      case "end":
        this._alignment = 'flex-end';
        break;
    }
  }

  ngAfterViewInit(): void {
    // if (this.disabled) this.disableElement(this.root?.nativeElement);
  }

  // endregion

  // region Private Methods

  private disableElement(element: HTMLElement) {
    // if (element == null) return;
    // element?.setAttribute('disabled', this.disabled ? 'true' : 'false');
    //
    // if (element.children == null) return;
    // const children: HTMLElement[] = Array.prototype.slice.call(element?.children);
    // children.forEach(value => this.disableElement(value));
  }

  // endregion

  // region Event Handlers


  // endregion

}
