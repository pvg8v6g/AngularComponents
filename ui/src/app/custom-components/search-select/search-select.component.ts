import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subject, timer} from "rxjs";
import {FormControl} from "@angular/forms";
import {takeUntil, tap} from "rxjs/operators";

@Component({
  selector: 'app-search-select',
  templateUrl: './search-select.component.html',
  styleUrls: ['./search-select.component.scss']
})
export class SearchSelectComponent implements OnInit, AfterViewInit, OnDestroy {

  // region Fields

  @Input() dataSource: any[];
  @Input() namePropertyName: string;
  @Input() title: string;
  @Input() placeholder: string = 'Search';
  @Input() formWidth: string;
  @Input() required: boolean;
  @Input() clearButton: boolean = true;
  @Input() disabled: boolean = false;
  @Input() fillAppearance: boolean = true;
  @Input() boldFont: boolean = false;
  @Input() selectedItem: any = null;
  @Output() selectedItemChange = new EventEmitter<any>(true);

  public selectFilterCtrl: FormControl = new FormControl();
  private onDestroy = new Subject<void>();

  filtered: any[];

  // endregion

  // region Constructor

  constructor(private ref: ChangeDetectorRef) {
  }

  // endregion

  // region Overrides

  ngOnInit() {
    this.selectFilterCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.filterData();
      });

    timer(1000)
      .pipe(tap(() => {
        this.ref.markForCheck();
      }), takeUntil(this.onDestroy))
      .subscribe();
  }

  ngAfterViewInit() {
    this.setInitialValue();
    this.ref.detectChanges();
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  // endregion

  // region Private Methods

  private setInitialValue() {
    this.filtered = this.dataSource;
  }

  private filterData() {
    if (!this.dataSource) {
      return;
    }

    // get the search keyword
    const search = (this.selectFilterCtrl.value).toLowerCase();
    if (search == null || search == '') {
      this.filtered = this.dataSource;
      return;
    }

    if (this.namePropertyName == null) {
      this.filtered = this.dataSource.filter(x => x.toString().toLowerCase().includes(search));
    } else {
      this.filtered = this.dataSource.filter(x => x[this.namePropertyName].toLowerCase().includes(search));
    }
  }

  // endregion

  // region Event Handlers

  clearSelection() {
    this.selectedItem = null;
    this.selectedItemChange.emit(this.selectedItem);
  }

  onModelChange() {
    this.selectedItemChange.emit(this.selectedItem);
  }

  // endregion

}
