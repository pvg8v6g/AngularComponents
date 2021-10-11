import {Component, DoCheck, OnInit} from '@angular/core';

// // region Interface
//
// export interface TreeSelectNode<T> {
//   data?: T;
//   ifFolderId?: string;
//   ifFolderLabel?: string;
//   parentId?: string;
// }
//
// interface InternalNode<T> {
//   data?: T;
//   parentId?: string;
//   key?: string;
//   label?: string;
//   children?: InternalNode<T>[];
// }
//
// export interface Column {
//   key: string;
//   name: string;
// }
//
// // endregion

@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.scss']
})
export class TreeSelectComponent<T> implements OnInit, DoCheck {

  // // region Fields
  //
  // // region Data Source
  //
  // private _dataSource: TreeSelectNode<T>[];
  //
  // @Input() set dataSource(source: TreeSelectNode<T>[]) {
  //   this._dataSource = source;
  // }
  //
  // get dataSource(): TreeSelectNode<T>[] {
  //   return this._dataSource;
  // }
  //
  // // endregion
  //
  // @Input() columns: Column[];
  // @Input() dataUniqueId: string;
  // @Input() disabled: boolean;
  // @Input() width: boolean;
  // @Input() height: boolean;
  //
  // internalDataSource: TreeNode[];
  //
  // // endregion
  //
  // // region Constructor
  //
  constructor() {
  }

  //
  // // endregion
  //
  // // region Overrides
  //
  ngOnInit(): void {
    // this.populateDataSource();
  }


  ngDoCheck(): void {
    // this.populateDataSource();
  }

  // // endregion
  //
  // // region Private Methods
  //
  // private populateDataSource() {
  //   this.internalDataSource = [];
  //   const tempList: InternalNode<T>[] = [];
  //   const noParentList = this.dataSource.groupBy(x => x.parentId).get(undefined);
  //   for (let selectNode of noParentList) {
  //     const node = <InternalNode<T>>{
  //       key: selectNode.ifFolderId,
  //       label: selectNode.ifFolderLabel
  //     };
  //
  //     this.recursivePopulation(node);
  //     tempList.push(node);
  //   }
  //
  //   this.internalDataSource = this.recursiveConvertToTreeNode(tempList);
  // }
  //
  // private recursivePopulation(parentNode: InternalNode<T>) {
  //   const id = parentNode.data == null ? parentNode.key : parentNode.data[this.dataUniqueId];
  //   for (let selectNode of this.dataSource.filter(x => x.parentId == id)) {
  //     const child = <InternalNode<T>>{
  //       data: selectNode.data,
  //       parentId: selectNode.parentId
  //     };
  //
  //     this.recursivePopulation(child);
  //     if (parentNode.children == null) parentNode.children = [];
  //     parentNode.children.push(child);
  //   }
  // }
  //
  // private recursiveConvertToTreeNode(parentNodes: InternalNode<T>[]): TreeNode[] {
  //   if (parentNodes == null) return [];
  //   return parentNodes.map(x => <TreeNode>{data: x.data, label: x.label, children: this.recursiveConvertToTreeNode(x.children)});
  // }
  //
  // // endregion
  //
  // // region Event Handlers
  //
  // // getMainColumnText(node: TreeNode): string {
  // //   console.log(node.constructor.name);
  // //   if (node.data == null) {
  // //     // console.log('label => ' + node.label);
  // //     return node.label;
  // //   } else {
  // //     // console.log('property => ' + node.data[this.headerIds[0]]);
  // //     return node.data[this.columns[0].key];
  // //   }
  // // }
  //
  // getColumnText(data: any, propertyId: string): string {
  //   // Object.keys(data).forEach(value => console.log(value));
  //   // Object.keys(data.node).forEach(value => console.log(value));
  //   // console.log(data?.node?.children);
  //   // Object.keys(data?.node?.data).forEach(value => console.log(value));
  //   // console.log(typeof data);
  //   // console.log(propertyId);
  //   if (data == null || data.node == null) {
  //     return '';
  //   } else {
  //     // Object.keys(data?.node).forEach(value => console.log(value));
  //     console.log(data?.node.data);
  //     return '';
  //     // if (data.node.data[propertyId] == null) return '';
  //     // else return data[propertyId].toString();
  //   }
  // }
  //
  // print(object: any) {
  //   console.log(object?.toString());
  // }
  //
  // // endregion

}
