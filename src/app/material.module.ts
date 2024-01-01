import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

const modules = [
  MatSlideToggleModule,
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class MaterialModule {}
