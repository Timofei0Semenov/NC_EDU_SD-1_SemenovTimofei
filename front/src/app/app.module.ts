import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CustomMaterialModule} from './material.module';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from './modules/layout/layout.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthorizationModule} from './modules/authorization/authorization.module';
import {AuthService} from './services/auth.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    CustomMaterialModule,
    HttpClientModule,
    FormsModule,
    LayoutModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthorizationModule
  ],
  bootstrap: [AppComponent],
  providers: [AuthService]
})
export class AppModule { }
