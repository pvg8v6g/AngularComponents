import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subject, timer} from 'rxjs';
import {takeUntil, tap} from 'rxjs/operators';
import {Orientation} from "../../sequence-containers/stack-panel/stack-panel.component";

@Component({
  selector: 'app-radio-group',
  templateUrl: './radio-group.component.html',
  styleUrls: ['./radio-group.component.scss']
})
export class RadioGroupComponent implements OnInit {

  // region Fields

  // region Selected Item

  private _selectedItem: number;

  get selectedItem(): number {
    return this._selectedItem;
  }

  @Input()
  set selectedItem(value: number) {
    this._selectedItem = value;
    this.internalSelectedValue = this.dataSource[this.selectedItem];
  }

  @Output()
  selectedItemChange = new EventEmitter(true);

  // endregion

  @Input() orientation: Orientation = 'vertical';
  @Input() dataSource: string[];
  @Input() spacing: string = '5px';

  internalSelectedValue: string;
  private onDestroy = new Subject<void>();

  // endregion

  // region Constructor

  constructor(private ref: ChangeDetectorRef) {
  }

  // endregion

  // region Overrides

  ngOnInit(): void {
    this.internalSelectedValue = this.dataSource[this.selectedItem];

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

  onModelChange() {
    this._selectedItem = this.dataSource.indexOf(this.internalSelectedValue);
    this.selectedItemChange.emit(this.selectedItem);
  }

  // endregion

}
