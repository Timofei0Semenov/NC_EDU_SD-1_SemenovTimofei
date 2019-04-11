import {NgModule} from '@angular/core';
import {HomeComponent} from './components/home/home.component';
import {RouterModule} from '@angular/router';
import {CalendarComponent} from './components/calendar/calendar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import {AddNewEventComponent} from './components/add-new-event/add-new-event.component';
import {MatButtonModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { FlatpickrModule } from 'angularx-flatpickr';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    AddNewEventComponent
  ],
  imports: [
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FlatpickrModule.forRoot(),
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    })
  ],
  providers: [],
  exports: [HomeComponent, CalendarComponent]
})
export class LayoutModule {
}
