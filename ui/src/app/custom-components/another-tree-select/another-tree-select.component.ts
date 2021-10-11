import {Component, Input, OnInit} from '@angular/core';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';

// region Interfaces

export interface SelectTreeNode<T> {
  node?: T;
  folderNodeName?: string;
  folderNodeId?: string;
  parentId?: string;
}

interface InternalNode<T> {
  node?: T;
  parentId?: string;
  key?: string;
  label?: string;
  children?: InternalNode<T>[];
}

interface ExampleFlatNode<T> {
  expandable: boolean;
  level: number;
  node: T;
  key?: string;
  label?: string;
}

export interface Column {
  key: string;
  name: string;
}

// endregion

@Component({
  selector: 'app-another-tree-select',
  templateUrl: './another-tree-select.component.html',
  styleUrls: ['./another-tree-select.component.scss']
})
export class AnotherTreeSelectComponent<T> implements OnInit {

  // region Fields

  // region DataSource

  @Input() dataSource: SelectTreeNode<T>[];

  // endregion

  @Input() columns: Column[];
  @Input() dataUniqueId: string;
  @Input() disabled: boolean;
  @Input() rowSelectionEnabled: boolean = false;
  @Input() width: string = '100%';
  @Input() height: string = '100%';

  internalMaxLevel: number;
  internalLevelMargin: number = 40;

  // region Tree Table Stuff

  private _transformer = (node: InternalNode<T>, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      level: level,
      node: node.node,
      key: node.key,
      label: node.label
    };
  }

  treeControl = new FlatTreeControl<ExampleFlatNode<T>>(node => node.level, node => node.expandable);

  treeFlattener = new MatTreeFlattener(this._transformer, node => node.level, node => node.expandable, node => node.children);

  internalDataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // endregion

  // endregion

  // region Constructor

  constructor() {
  }

  // endregion

  // region Overrides

  ngOnInit() {
    this.populateDataSource();
    this.internalMaxLevel = this.getMaxLevel(this.internalDataSource.data.slice(), 0) * this.internalLevelMargin;
  }

  // endregion

  // region Private Methods

  private populateDataSource() {
    const tempList: InternalNode<T>[] = [];
    const noParentList = this.dataSource.groupBy(x => x.parentId).get(undefined);
    for (let selectNode of noParentList) {
      const node = <InternalNode<T>>{
        key: selectNode.folderNodeId,
        label: selectNode.folderNodeName
      };

      this.recursivePopulation(node);
      tempList.push(node);
    }

    this.internalDataSource.data = tempList;
  }

  private recursivePopulation(parentNode: InternalNode<T>) {
    const id = parentNode.node == null ? parentNode.key : parentNode.node[this.dataUniqueId];
    for (let selectNode of this.dataSource.filter(x => x.parentId == id)) {
      const child = <InternalNode<T>>{
        node: selectNode.node,
        parentId: selectNode.parentId
      };

      this.recursivePopulation(child);
      if (parentNode.children == null) parentNode.children = [];
      parentNode.children.push(child);
    }
  }

  private getMaxLevel(nodes: InternalNode<T>[], currentLevel: number): number {
    let level = currentLevel;
    for (let node of nodes) {
      if (node.children == null || node.children.length == 0) continue;
      level = this.getMaxLevel(node.children, currentLevel + 1);
    }

    return level;
  }

  // endregion

  // region Event Handlers

  hasChild = (_: number, node: ExampleFlatNode<T>) => node.expandable;

  columnIds(): string[] {
    return this.columns.map(x => x.key);
  }

  getDataRow(node: ExampleFlatNode<T>, columnKey: string, first: boolean = false): string {
    if (node.node == null) {
      return first ? node.label : '';
    } else {
      return node.node[columnKey]?.toString();
    }
  }

  // endregion

  selectedRow(newSelectedValue: T): boolean {
    if (!this.rowSelectionEnabled) return false;
    return false;
    // if (this.selectedItem == null) return false;
    // if (newSelectedValue == null) return false;
    // if (!this.selectedItem.hasOwnProperty(this.idPropertyName)) return this.getStringValue(this.selectedItem, 'null') == this.getStringValue(newSelectedValue, 'null');
    // else return this.selectedItem[this.idPropertyName] == newSelectedValue[this.idPropertyName];
  }

  onTableSelectChange(newSelectedValue: T) {
    if (!this.rowSelectionEnabled) return;
    // this.oldValue = this.selectedItem;
    // this._selectedItem = newSelectedValue;
    // this.selectedItemChange.emit(this.selectedItem);
  }

}
