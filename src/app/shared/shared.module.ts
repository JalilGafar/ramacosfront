import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';



@NgModule({
  declarations: [],
  imports: [
    RouterLink,
    CommonModule
  ],
  exports: [
    RouterLink,
    CommonModule
  ]
})
export class SharedModule { }
