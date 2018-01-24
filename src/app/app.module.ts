import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {MagicModule} from './magic/magic.module';
import {MgModalService} from './magic/modal/modal.service';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    // CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MagicModule,
    RouterModule.forRoot([
      {path: '', component: AppComponent}])
  ],
  providers: [
    MgModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
