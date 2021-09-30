import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Subject, timer} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";
import {ProgressBarMode} from "@angular/material/progress-bar";

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  // region Fields

  @Input() progressText: string;
  @Input() mode: ProgressBarMode = 'indeterminate';

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

  // endregion

  // region Private Methods


  // endregion

  // region Event Handlers


  // endregion

}
