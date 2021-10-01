import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {FormControl} from "@angular/forms";
import {Subject, timer} from "rxjs";
import {takeUntil, tap} from "rxjs/operators";
import {Common} from "../../extensions/common";

// region Models

interface DateModel {
  year: number;
  month: number;
  day: number;
}

enum DatePart {
  Year,
  Month,
  Day
}

// endregion

@Component({
  selector: 'app-date-select',
  templateUrl: './date-select.component.html',
  styleUrls: ['./date-select.component.scss']
})
export class DateSelectComponent implements OnInit, AfterViewInit, OnDestroy {

  // region Fields

  @Input() selectedDate: Date = new Date();
  @Output() selectedDateChange = new EventEmitter<Date>(true);
  @Input() title: string = 'Choose Date'
  @Input() formWidth: string;
  @Input() required: boolean;
  @Input() disabled: boolean;

  @ViewChild('dateInput') input: ElementRef;

  private onDestroy = new Subject<void>();
  private regex = new RegExp('^([1-9]|0[1-9]|1[012])[\\/]([1-9]|0[1-9]|[12][0-9]|3[01])[\\/]((19|20)\\d{2})$');
  private settingSelection: boolean;

  formControl: FormControl;
  dateString: string;

  // endregion

  // region Constructor

  constructor() {
  }

  // endregion

  // region Overrides

  ngOnInit() {
    this.formControl = new FormControl(this.selectedDate);
    this.selectedDateChange.emit(this.selectedDate);
    this.setDateString();
    this.setSelection(DatePart.Month);

    timer(1000)
      .pipe(tap(() => {
        this.onChange();
      }), takeUntil(this.onDestroy))
      .subscribe();
  }

  ngAfterViewInit() {
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  // endregion

  // region Private Methods

  private setDateString() {
    if (this.selectedDate == null) this.selectedDate = new Date();
    const y = this.selectedDate.getFullYear();
    const m = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
    const d = String(this.selectedDate.getDate()).padStart(2, '0');
    this.dateString = m + '/' + d + '/' + y;
  }

  private testDateString(input: string) {
    return this.regex.test(input);
  }

  private extractDateArray(input: string): DateModel {
    const dateArray = this.regex.exec(input);
    if (dateArray == null) return null;
    if (dateArray.length < 4) return null;
    return <DateModel>{
      year: parseInt(dateArray[3]),
      month: parseInt(dateArray[1]),
      day: parseInt(dateArray[2])
    };
  }

  private isArrowKey(event: KeyboardEvent): boolean {
    const arrows = ['ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp'];
    const key = event.key;
    return arrows.includes(key);
  }

  private getDatePart(selection: number): DatePart {
    let part: DatePart;
    switch (selection) {
      case 0:
      case 1:
      case 2:
        part = DatePart.Month;
        break;
      case 3:
      case 4:
      case 5:
        part = DatePart.Day;
        break;
      default:
        part = DatePart.Year;
    }

    return part;
  }

  private activateArrowFunction(inputChar: string) {
    const selectionStart = Common.deepCopy(this.input?.nativeElement.selectionStart);
    const datePart = this.getDatePart(selectionStart);
    switch (inputChar) {
      case 'ArrowDown':
        switch (datePart) {
          case DatePart.Year:
            this.selectedDate.setFullYear(this.selectedDate.getFullYear() - 1);
            break;
          case DatePart.Month:
            this.selectedDate.setMonth(this.selectedDate.getMonth() - 1);
            break;
          case DatePart.Day:
            this.selectedDate.setDate(this.selectedDate.getDate() - 1);
            break;
        }
        this.onChange();
        this.setSelection(datePart);
        break;
      case 'ArrowLeft':
        let leftNewPart = datePart;
        if (datePart == DatePart.Month) return;
        if (datePart == DatePart.Day) leftNewPart = DatePart.Month;
        if (datePart == DatePart.Year) leftNewPart = DatePart.Day;
        this.setSelection(leftNewPart);
        break;
      case 'ArrowRight':
        let rightNewPart = datePart;
        if (datePart == DatePart.Month) rightNewPart = DatePart.Day;
        if (datePart == DatePart.Day) rightNewPart = DatePart.Year;
        if (datePart == DatePart.Year) return;
        this.setSelection(rightNewPart);
        break;
      case 'ArrowUp':
        switch (datePart) {
          case DatePart.Year:
            this.selectedDate.setFullYear(this.selectedDate.getFullYear() + 1);
            break;
          case DatePart.Month:
            this.selectedDate.setMonth(this.selectedDate.getMonth() + 1);
            break;
          case DatePart.Day:
            this.selectedDate.setDate(this.selectedDate.getDate() + 1);
            break;
        }
        this.onChange();
        this.setSelection(datePart);
        break;
    }
  }

  private setSelection(datePart: DatePart) {
    this.settingSelection = true;
    setTimeout(() => this.setSelectionInner(datePart), 1);
  }

  private setSelectionInner(datePart: DatePart) {
    let selectionStart = 0;
    let selectionEnd = 2;
    switch (datePart) {
      case DatePart.Year:
        selectionStart = 6;
        selectionEnd = this.dateString.length;
        break;
      case DatePart.Day:
        selectionStart = 3;
        selectionEnd = 5;
        break;
    }

    this.input?.nativeElement.setSelectionRange(selectionStart, selectionEnd);
    this.settingSelection = false;
  }

  // endregion

  // region Event Handlers

  onChange() {
    this.selectedDateChange.emit(this.selectedDate);
    this.setDateString();
  }

  dateStringChange(input: string) {
    const result = this.testDateString(input);
    if (result) {
      const model = this.extractDateArray(input);
      this.selectedDate = new Date(model.year, model.month - 1, model.day);
      this.onChange();
    } else {
      this.selectedDate = null;
      this.dateString = input;
    }
  }

  onKeypress(event: KeyboardEvent) {
    if (this.settingSelection) return;
    if (!this.isArrowKey(event)) return;
    if (!this.testDateString(this.dateString)) return;
    event.preventDefault();
    this.activateArrowFunction(event.key);
  }

  onClick() {
    if (!this.testDateString(this.dateString)) return;
    this.setSelection(this.getDatePart(this.input?.nativeElement.selectionStart));
  }

  // endregion

}
