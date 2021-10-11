import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SequenceModule} from "./sequence-containers/sequence.module";
import {CustomComponentsModule} from "./custom-components/custom-components.module";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";

@NgModule({
  declarations: [
    LandingPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        SequenceModule,
        CustomComponentsModule,
        MatButtonModule,
        MatFormFieldModule
    ],
  providers: [],
  bootstrap: [LandingPageComponent]
})
export class AppModule {
}
