import { Component, forwardRef, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormArray,
  FormControl,
  FormGroup,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  UntypedFormArray,
  ValidationErrors,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true,
    },
  ],
})
export class CustomInputComponent implements OnInit, ControlValueAccessor {
  // Allow the input to be disabled, and when it is make it somewhat transparent.
  @Input() disabled = false;
  @Input() minItems!: number;
  @Input() maxItems!: number;
  @Input() placeholder = 'item';

  // Function to call when the rating changes.
  onChange = (_: any) => {};
  // Function to call when the input is touched/
  onTouched: any = () => {};
  // Function called when validation is updated
  onValidatorChange = () => {};

  _value: any = null;

  formElement = new FormGroup({
    item: new FormArray([]),
  });

  get value(): any[] {
    return this._value;
  }

  set value(newValue: any) {
    this._value = newValue;
    this.onChange(this._value);
    this.configureForm();
    this.onValidatorChange();
  }

  ngOnInit(): void {
    this.formElement.valueChanges.subscribe(() => {
      setTimeout(() => {
        const formValue = this.formElement.getRawValue();
        this.onChange(formValue.item);
      }, 20);
    });
  }

  // Allows Angular to update the model
  // Update the model and changes needed for the view here.
  public writeValue(value: string): void {
    this.value = value;
  }

  // Allows Angular to register a function to call when the model changes.
  // Save the function as a property to call later here.
  public registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  // Allows Angular to register a function to call when the input has been touched.
  // Save the function as a property to call later here.
  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  // Allows Angular to disable the input.
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(_: AbstractControl): ValidationErrors | null {
    let valid = true;
    valid = this.formElement.valid || this.formElement.disabled;
    return valid ? null : { invalid: true };
  }

  configureForm(): void {
    if (this.minItems && !this.value?.length) {
      let min = this.minItems;
      while (min--) {
        this.addItem('');
      }
    }
    this.value?.forEach((data: any) => {
      this.addItem(data);
    });
  }

  get item() {
    return this.formElement.get('item') as UntypedFormArray;
  }

  removeItem(index: number): void {
    this.item.removeAt(index);
  }

  addItem(data?: string): void {
    this.item.push(new FormControl(data ?? ''));
  }
}
