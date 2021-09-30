import {NgModule} from '@angular/core';
import {FlexLayoutModule} from "@angular/flex-layout";
import {StackPanelComponent} from "./stack-panel/stack-panel.component";

@NgModule({
  declarations: [
    StackPanelComponent
  ],
  imports: [
    FlexLayoutModule
  ],
  exports: [
    StackPanelComponent
  ],
})
export class SequenceModule {
}
