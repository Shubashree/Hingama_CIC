import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MoodloggingPage } from './moodlogging';

@NgModule({
  declarations: [
    MoodloggingPage,
  ],
  imports: [
    IonicPageModule.forChild(MoodloggingPage),
  ],
})
export class MoodloggingPageModule {}
