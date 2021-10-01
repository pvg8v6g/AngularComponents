import {AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject, timer} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";

// region Interface

export declare type IconType = 'home' | 'menu' | 'close' | 'add' | 'remove' | 'check_circle' | 'highlight_off';

// endregion

@Component({
  selector: 'app-icon-button',
  templateUrl: './icon-button.component.html',
  styleUrls: ['./icon-button.component.scss']
})
export class IconButtonComponent implements OnInit, OnDestroy, AfterViewInit {

  // region Fields

  @Input() iconType: IconType;
  @Input() disabled: boolean = false;
  @Input() helloWorld: string = 'false';
  @Input() tooltip: string;

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

  ngAfterViewInit(): void {
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
