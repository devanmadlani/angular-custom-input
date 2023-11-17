import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

const modules = [MatInputModule, MatButtonModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
