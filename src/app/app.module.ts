import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { OpentokService } from '../services/opentok-service';
import { VideoCallPage } from '../pages/video-call/video-call';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';

@NgModule({
  declarations: [
    MyApp,
    VideoCallPage,
    Page1,
    Page2
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    VideoCallPage,
    Page1,
    Page2
  ],
  providers: [OpentokService, {provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
