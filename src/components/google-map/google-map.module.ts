import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { GoogleMapComponent } from './google-map';

@NgModule({
  declarations: [
    GoogleMapComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    GoogleMapComponent
  ]
})
export class GoogleMapComponentModule {}
