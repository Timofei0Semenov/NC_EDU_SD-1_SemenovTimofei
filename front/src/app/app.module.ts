import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {CustomMaterialModule} from './material.module';
import {FormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {LayoutModule} from './modules/layout/layout.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthorizationModule} from './modules/authorization/authorization.module';
import {ApplyTokenInterceptor} from './interceptors/applyTokenInterceptor';
import {RefreshTokenInterceptor} from './interceptors/RefreshTokenInterceptor';
import {MembersDialogComponent} from './modules/meeting/components/show-meeting/show-meeting.component';
import {FriendCalendarComponent} from './modules/layout/components/friendCalendar/friend-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    MembersDialogComponent,
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
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: ApplyTokenInterceptor,
    multi: true
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RefreshTokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [MembersDialogComponent, FriendCalendarComponent]
})
export class AppModule {
}
