import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Details } from 'src/app/models/details';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  minItems = 0;
  homeForm = new FormGroup({
    details: this.fb.array([]),
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.addDetails({
      title: 'Netherlands',
      data: ['Almere', 'Amsterdam', 'Rotterdam', 'Den Haag'],
    });
  }

  get details() {
    return this.homeForm.get('details') as FormArray;
  }

  addDetails(details?: Details) {
    const lessonForm = this.fb.group({
      title: [details?.title],
      data: [details?.data ?? []],
    });
    this.details.push(lessonForm);
  }
}
