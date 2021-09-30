import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {LandingPageComponent} from "./landing-page/landing-page.component";
import {SequenceModule} from "./sequence-containers/sequence.module";
import {CustomComponentsModule} from "./custom-components/custom-components.module";

@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SequenceModule,
    CustomComponentsModule
  ],
  providers: [],
  bootstrap: [LandingPageComponent]
})
export class AppModule {
}
