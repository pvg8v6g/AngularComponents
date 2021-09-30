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

    @Input() spacing: string;
    @Input() width: string;
    @Input() height: string;
    @Input() background: string;
    @Input() margin_bottom: string;
    @Input() margin_left: string;
    @Input() margin_right: string;
    @Input() margin_top: string;
    @Input() orientation: Orientation = 'vertical';
    @Input() alignment: Alignment = 'start';

    private _disabled: boolean = false;
    _orientation: string = 'column nowrap';
    _alignment: string = 'flex-start';

    @Input() set disabled(value: boolean) {
        this._disabled = value;
        this.disableChildren(this.disabled);
    }

    get disabled(): boolean {
        return this._disabled;
    }

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
        this.disableChildren(this.disabled);
    }

    // endregion

    // region Private Methods

    private disableChildren(value: boolean) {
        const dom = this.root?.nativeElement?.children;
        if (dom == null) return;
        const list: Element[] = [].slice.call(dom);
        list.filter(x => x['disabled'] != null).forEach(x => x['disabled'] = value);
    }

    // endregion

    // region Event Handlers


    // endregion

}
