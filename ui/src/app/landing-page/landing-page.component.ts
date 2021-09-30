import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  // region Fields

  disabled: boolean;
  selectList: string[];
  selectedTableItem: string;

  // endregion

  // region Constructor

  constructor() {
    this.disabled = false;
    this.selectList = ['One', 'Two', 'Three'];
  }

  // endregion

  // region Overrides

  ngOnInit(): void {
    this.setTableSelection();
  }

  // endregion

  // region Private Methods

  private setTableSelection() {
    this.selectedTableItem = 'Test 2';
  }

  // endregion

  // region Event Handlers

  tableSelectionChanged(newValue: string) {
    this.selectedTableItem = newValue;
  }

  // endregion

}
