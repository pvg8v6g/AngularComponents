import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, timer} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";

// region Interface

export declare type IconType = 'home' | 'menu' | 'close' | 'add' | 'remove' | 'check_circle' | 'highlight_off' | 'build' | 'expand_more' | 'chevron_right';

// endregion

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit, OnDestroy {

  // region Fields

  @Input() iconType: IconType;
  @Input() disabled: boolean = false;
  @Input() helloWorld: string = 'false';
  @Input() tooltip: string;
  @Input() useMatButton: boolean = false;
  @Input() readonly: boolean = false;

  private onDestroy = new Subject<void>();

  // endregion

  // region Constructor

  constructor(private ref: ChangeDetectorRef) {
  }

  // endregion

  // region Overrides

  ngOnInit(): void {
    timer(1000)
      .pipe(tap(() => {
        this.ref.markForCheck();
      }), takeUntil(this.onDestroy))
      .subscribe();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  // endregion

  // region Private Methods


  // endregion

  // region Event Handlers


  // endregion

}
