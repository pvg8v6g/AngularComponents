import {Component, OnInit} from '@angular/core';

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

  // endregion

  // region Constructor

  constructor() {
  }

  // endregion

  // region Overrides

  ngOnInit(): void {
    this.radioButtonOptions = ['radio option 1', 'radio option 2', 'radio option 3'];
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

  // endregion

}
