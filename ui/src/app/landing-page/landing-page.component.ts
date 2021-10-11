import {Component, OnInit} from '@angular/core';
import {SelectTreeNode} from "../custom-components/another-tree-select/another-tree-select.component";
import {CheckboxComponent, TextBoxComponent} from "../custom-components/primeng-table/primeng-table.component";

// region Interface

interface MyClass {
  id: string;
  name: string;
  count: number;
  test: string;
}

// endregion

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  // region Fields

  radioButtonOptions: string[];

  selectedDropdownItem: string;
  selectedDate: Date;
  selectedRadioButton: number;
  selectedTableValue: string;

  treeSource: SelectTreeNode<MyClass>[];
  primengSource: any[];

  checkboxSource: CheckboxComponent[];
  textBoxSource: TextBoxComponent[];

  // endregion

  // region Constructor

  constructor() {
    this.checkboxSource = [];
  }

  // endregion

  // region Overrides

  ngOnInit(): void {
    this.radioButtonOptions = ['radio option 1', 'radio option 2', 'radio option 3'];


    let models: MyClass[] = [
      <MyClass>{id: '1', name: 'hello', count: 5, test: 'a'},
      <MyClass>{id: '2', name: 'world', count: 6, test: 'n'},
      <MyClass>{id: '3', name: 'TREE', count: 101, test: 'd'},
      <MyClass>{id: '4', name: 'view', count: 1, test: 'e'},
      <MyClass>{id: '5', name: 'nothing', count: 0, test: 'l'}
    ];

    this.treeSource = [
      <SelectTreeNode<MyClass>>{folderNodeId: '6', folderNodeName: 'Expandable'},
      <SelectTreeNode<MyClass>>{node: models[0], parentId: '6'},
      <SelectTreeNode<MyClass>>{node: models[1], parentId: '6'},
      <SelectTreeNode<MyClass>>{node: models[2], parentId: '1'},
      <SelectTreeNode<MyClass>>{node: models[3], parentId: '1'},
      <SelectTreeNode<MyClass>>{node: models[4], parentId: '3'}
    ];

    this.primengSource = [
      {name: 'test 1', size: 5, type: false, children: [{name: 'test 4', size: 8, type: true}]},
      {name: 'test 2', size: 847, type: true},
      {name: 'test 3', size: -2, type: false},
    ];

    this.checkboxSource = [
      <CheckboxComponent>{primaryKey: 'test 2', selected: true}
    ]

    this.textBoxSource = [
      <TextBoxComponent>{primaryKey: 'test 2', text: 'hello'}
    ]
  }

  // endregion

  // region Private Methods


  // endregion

  // region Event Handlers

  homeAction() {
    console.log('you pressed home');
  }

  menuAction() {
    console.log('you pressed menu');
  }

  closeAction() {
    console.log('you pressed close');
  }

  addAction() {
    console.log('you pressed add');
  }

  removeAction() {
    console.log('you pressed remove');
  }

  checkAction() {
    console.log('you pressed checked');
  }

  offAction() {
    console.log('you pressed highlight off');
  }

  buildAction() {
    console.log('you pressed build');
  }

  dropdownValue() {
    console.log("the selection is " + this.selectedDropdownItem);
  }

  getDateValue() {
    console.log("the date selected is " + this.selectedDate);
  }

  radioButtonSelect() {
    console.log("the radio selection is index " + this.selectedRadioButton + ' and the value is ' + this.radioButtonOptions[this.selectedRadioButton]);
  }

  tableSelection() {
    console.log("the table selection is " + this.selectedTableValue);
  }

  getCheckboxValues() {
    console.log(this.checkboxSource?.map(x => x.primaryKey + " > " + x.selected).join(", "))
  }

  // endregion

}
