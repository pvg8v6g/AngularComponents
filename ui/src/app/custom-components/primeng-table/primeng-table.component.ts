import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TreeNode} from "primeng/api";

// region Interfaces

export interface Column {
  key: string;
  name: string;
  columnType?: ColumnType;
}

export interface CheckboxComponent {
  primaryKey: string;
  selected: boolean;
}

export interface TextBoxComponent {
  primaryKey: string;
  text: string;
}

export declare type ColumnType = 'text or number' | 'true/false' | 'interactive checkbox' | 'interactive textbox';

// endregion

@Component({
  selector: 'app-primeng-table',
  templateUrl: './primeng-table.component.html',
  styleUrls: ['./primeng-table.component.scss']
})
export class PrimeNGTableComponent<T> implements OnInit {

  // region Fields

  @Input() columns: Column[];
  @Input() primaryKey: string;

  // region Data Source

  @Input() dataSource: T[];

  internalDataSource: TreeNode<T>[];

  // endregion

  // region Checkbox Data Source

  @Input() checkboxDataSource: CheckboxComponent[];
  @Output() checkboxDataSourceChange = new EventEmitter<CheckboxComponent[]>(true);

  // endregion

  // region TextBox Data Source

  @Input() textBoxDataSource: TextBoxComponent[];
  @Output() textBoxDataSourceChange = new EventEmitter<TextBoxComponent[]>(true);

  // endregion

  // endregion

  // region Constructor

  constructor() {
    this.checkboxDataSource = [];
    this.textBoxDataSource = [];
  }

  // endregion

  // region Overrides

  ngOnInit(): void {
    this.columns.filter(x => x.columnType == null).forEach(x => x.columnType = 'text or number');
    this.internalDataSource = this.dataSource.map(x => <TreeNode>{data: x, children: x['children']?.map(x => <TreeNode>{data: x})});
  }

  // endregion

  // region Private Methods


  // endregion

  // region Event Handlers

  getRowData(node: T, column: Column) {
    switch (column.columnType) {
      case 'text or number':
        return node[column.key]?.toString();
      case 'true/false':
        break;
      case 'interactive checkbox':
        break;
      case 'interactive textbox':
        break;
    }
  }

  valueIsBoolean(property: any): boolean {
    return property instanceof Boolean || property === true || property === false;
  }

  changeCheckboxValue(primaryKey: string, selected: boolean) {
    if (!this.checkboxDataSource.any(x => x.primaryKey == primaryKey)) this.checkboxDataSource.push(<CheckboxComponent>{primaryKey: primaryKey, selected: selected});
    else this.checkboxDataSource.find(x => x.primaryKey == primaryKey).selected = selected;
    this.checkboxDataSourceChange.emit(this.checkboxDataSource);
  }

  getCheckboxData(primaryKey: string): boolean {
    const data = this.checkboxDataSource.find(x => x.primaryKey == primaryKey);
    return data != null ? data.selected : false;
  }

  getTextBoxData(primaryKey: string): string {
    const data = this.textBoxDataSource.find(x => x.primaryKey == primaryKey);
    return data != null ? data.text : '';
  }

  changeTextBoxValue(primaryKey: string, text: string) {
    if (!this.textBoxDataSource.any(x => x.primaryKey == primaryKey)) this.textBoxDataSource.push(<TextBoxComponent>{primaryKey: primaryKey, text: text});
    else this.textBoxDataSource.find(x => x.primaryKey == primaryKey).text = text;
    this.textBoxDataSourceChange.emit(this.textBoxDataSource);
  }

  // endregion

}
