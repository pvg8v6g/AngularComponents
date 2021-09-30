import {Component, DoCheck, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import "../../extensions/extension-methods";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.scss']
})
export class TableSelectComponent<T> implements OnInit, DoCheck {

  // region Fields

  // region Selected Item

  private _selectedItem: T;

  get selectedItem(): T {
    return this._selectedItem;
  }

  @Input()
  set selectedItem(value: T) {
    this._selectedItem = value;
  }

  @Output()
  selectedItemChange = new EventEmitter(true);

  private oldValue: T;

  // endregion

  @Input() width: string = '100%';
  @Input() height: string = '100%';
  @Input() dataSource: T[];
  @Input() headerIds: string[];
  @Input() headerLabels: string[];
  @Input() searchPropertyNames: string[];
  @Input() idPropertyName: string;
  @Input() canSort: boolean = true;
  @Input() searchLabel = 'Search Table';

  internalDataSource: MatTableDataSource<T>;
  searchText: string;

  @ViewChild(MatSort) sort: MatSort;

  filteredList: T[];

  // endregion

  // region Constructor

  constructor() {
    this.internalDataSource = new MatTableDataSource<T>();
  }

  // endregion

  // region Overrides

  ngOnInit(): void {
    if (this.headerIds == null || this.headerIds.length == 0) {
      this.headerIds = ['null'];
      this.headerLabels = ['Name'];
    }

    this.filteredList = this.dataSource;
    this.populateDataSource();
  }

  ngDoCheck(): void {
    this.populateDataSource();
  }

  // endregion

  // region Private Methods

  private populateDataSource() {
    this.internalDataSource = new MatTableDataSource<T>(this.filteredList);
  }

  // endregion

  // region Event Handlers

  clearSearch() {
    this.searchText = '';
    this.filteredList = this.dataSource;
  }

  onSortData(sort: Sort) {
    if (!this.canSort) return;

    let data = this.internalDataSource.data.slice();
    switch (sort.direction) {
      case "":
      case "asc":
        data = data.orderBy(x => x.hasOwnProperty(sort.active) ? x[sort.active] : x).toArray();
        break;
      case "desc":
        data = data.orderByDescending(x => x.hasOwnProperty(sort.active) ? x[sort.active] : x).toArray();
        break;
    }

    this.filteredList = data;
  }

  searchFilterChange() {
    if (this.searchText == '') this.filteredList = this.dataSource;
    if (this.searchPropertyNames == null || this.searchPropertyNames.length < 1) {
      let l: T[] = [];
      l = l.concat(this.dataSource.filter(x => x?.toString()?.toLowerCase().includes(this.searchText?.toLowerCase())));
      this.filteredList = l;
      return;
    }

    let filtered: T[] = [];
    for (let name of this.searchPropertyNames) {
      filtered = filtered.concat(this.dataSource.filter(x => x.hasOwnProperty(name) ? x[name].toString().toLowerCase().includes(this.searchText.toLowerCase()) : x.toString()));
    }

    this.filteredList = filtered;
  }

  selectedRow(newSelectedValue: T): boolean {
    if (this.selectedItem == null) return false;
    if (newSelectedValue == null) return false;
    if (!this.selectedItem.hasOwnProperty(this.idPropertyName)) return this.getStringValue(this.selectedItem, 'null') == this.getStringValue(newSelectedValue, 'null');
    else return this.selectedItem[this.idPropertyName] == newSelectedValue[this.idPropertyName];
  }

  onTableSelectChange(newSelectedValue: T) {
    this.oldValue = this.selectedItem;
    this._selectedItem = newSelectedValue;
    this.selectedItemChange.emit(this.selectedItem);
  }

  isCheckbox(row: any): boolean {
    return typeof row == "boolean";
  }

  checkboxStyle(row: any): string {
    return row ? 'check_circle' : 'highlight_off';
  }

  getStringValue(value: any, property: string): string {
    return value[property] == null ? value.toString() : value[property];
  }

  // endregion

}
