import {NgModule} from '@angular/core';
import {SearchSelectComponent} from "./search-select/search-select.component";
import {SequenceModule} from "../sequence-containers/sequence.module";
import {MatSelectModule} from "@angular/material/select";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {NgxMatSelectSearchModule} from "ngx-mat-select-search";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {DateSelectComponent} from "./date-select/date-select.component";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatInputModule} from "@angular/material/input";
import {LayoutGapStyleBuilder} from "@angular/flex-layout";
import {MatFormFieldModule} from "@angular/material/form-field";
import {TableSelectComponent} from "./table-select/table-select.component";
import {ProgressBarComponent} from "./progress-bar/progress-bar.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {IconButtonComponent} from "./icon-button/icon-button.component";
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {RadioGroupComponent} from "./radio-group/radio-group.component";
import {MatRadioModule} from "@angular/material/radio";

@NgModule({
  declarations: [
    SearchSelectComponent,
    DateSelectComponent,
    TableSelectComponent,
    ProgressBarComponent,
    IconButtonComponent,
    RadioGroupComponent
  ],
  imports: [
    SequenceModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatIconModule,
    NgxMatSelectSearchModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatRadioModule
  ],
  providers: [
    MatDatepickerModule,
    LayoutGapStyleBuilder
  ],
  exports: [
    SearchSelectComponent,
    DateSelectComponent,
    ProgressBarComponent,
    IconButtonComponent,
    TableSelectComponent,
    RadioGroupComponent
  ],
})
export class CustomComponentsModule {
}
