import {Component, DoCheck, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import "../../extensions/extension-methods";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort, Sort} from "@angular/material/sort";
import {Common} from "../../extensions/common";
import {IconType} from "../icon-button/icon-button.component";

// region Interfaces

export declare type SearchStyle = 'old janky version' | 'shiny new version';

// endregion

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

  // region Data Source

  private _dataSource: T[];

  @Input() set dataSource(source: T[]) {
    this._dataSource = source;
    this.filteredList = Common.deepCopy(this.dataSource);
    this.searchFilterChange();
  }

  get dataSource(): T[] {
    return this._dataSource;
  }

  // endregion

  @Input() width: string = '100%';
  @Input() height: string = '100%';
  @Input() headerIds: string[];
  @Input() headerLabels: string[];
  @Input() searchPropertyNames: string[];
  @Input() idPropertyName: string;
  @Input() canSort: boolean = true;
  @Input() disabled: boolean = false;
  @Input() searchLabel = 'Search Table';
  @Input() searchStyle: SearchStyle = 'shiny new version';
  @Input() builtInSearch: boolean = true;

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

  onSortData(sort: Sort) {
    if (!this.canSort) return;

    let data = this.internalDataSource.data.slice();
    switch (sort.direction) {
      case "":
      case "asc":
        data = data.orderBy(x => x[sort.active]).toArray();
        break;
      case "desc":
        data = data.orderByDescending(x => x[sort.active]).toArray();
        break;
    }

    this.filteredList = Common.deepCopy(data);
  }

  clearSearch() {
    this.searchText = '';
    this.filteredList = Common.deepCopy(this.dataSource);
  }

  searchFilterChange() {
    if (this.dataSource == null || this.dataSource.length < 1 || !this.searchText?.hasValue()) {
      this.filteredList = Common.deepCopy(this.dataSource);
      return;
    }

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

    this.filteredList = Common.deepCopy(filtered);
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

  checkboxStyle(row: any): IconType {
    return row ? 'check_circle' : 'highlight_off';
  }

  getStringValue(value: any, property: string): string {
    return value[property] == null ? value.toString() : value[property];
  }

  // endregion

}
