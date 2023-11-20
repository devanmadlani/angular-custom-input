import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  homeForm = new FormGroup({
    details: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  get details() {
    return this.homeForm.get('details') as FormArray;
  }

  addDetails() {
    const lessonForm = this.fb.group({
      title: [],
      data: [[1, 2]],
    });
    this.details.push(lessonForm);
  }
}
