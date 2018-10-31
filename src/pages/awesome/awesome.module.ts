import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AwesomePage } from './awesome';

@NgModule({
  declarations: [
    AwesomePage,
  ],
  imports: [
    IonicPageModule.forChild(AwesomePage),
  ],
})
export class AwesomePageModule {}
