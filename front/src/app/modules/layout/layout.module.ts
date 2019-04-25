import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {CalendarComponent} from './components/calendar/calendar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import {AddNewEventComponent} from '../meeting/components/add-new-event/add-new-event.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FlatpickrModule} from 'angularx-flatpickr';
import {HeaderComponent} from './components/header/header.component';
import {BrowserModule} from '@angular/platform-browser';
import {CustomMaterialModule} from '../../material.module';
import {MessageComponent} from '../message/components/message.component';
import {FriendsComponent} from '../user/components/friends/friends.component';
import {AddFriendComponent} from '../user/components/add-friend/add-friend.component';
import {ContinueSessionComponent} from '../authorization/continueSession/continue-session.component';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    AddNewEventComponent,
    HeaderComponent,
    MessageComponent,
    FriendsComponent,
    AddFriendComponent,
    ContinueSessionComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    CustomMaterialModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  entryComponents: [AddNewEventComponent, AddFriendComponent, ContinueSessionComponent],
  exports: [HomeComponent, CalendarComponent]
})
export class LayoutModule {
}
