import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AddMonumentos } from './add-monumentos';

@NgModule({
  declarations: [
    AddMonumentos,
  ],
  imports: [
    IonicPageModule.forChild(AddMonumentos),
  ],
  exports: [
    AddMonumentos
  ]
})
export class AddMonumentosModule {}
