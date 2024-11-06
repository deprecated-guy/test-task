import type { OnInit } from '@angular/core';
import type { AbstractControl } from '@angular/forms';
import type { Request } from '@global/other';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ABILITIES, CITIES, parseFromLS, saveToLS } from '@global/other';
import { FieldErrorPipe } from '../../pipes/field-error.pipe';
import { ButtonComponent } from '../button/button.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ErrorComponent } from '../error/error.component';
import { CheckboxComponent } from '../inputs/checkbox/checkbox.component';
import { CheckboxLabeledComponent } from '../inputs/checkbox/checkbox-labeled/checkbox-labeled.component';
import { InputSettingsDirective } from '../inputs/input-settings.directive';
import { SelectComponent } from '../inputs/select/select.component';
import { StandardInputComponent } from '../inputs/standard-input/standard-input.component';

@Component({
	selector: 'app-ankete',
	standalone: true,
	imports: [
		StandardInputComponent,
		ReactiveFormsModule,
		ErrorComponent,
		FieldErrorPipe,
		AsyncPipe,
		InputSettingsDirective,
		CheckboxComponent,
		SelectComponent,
		ButtonComponent,
		CheckboxLabeledComponent,
		JsonPipe,
	],
	templateUrl: './ankete.component.html',
	styleUrl: './ankete.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [
		{
			provide: DropdownComponent,
			useFactory: () => new DropdownComponent(),
		},
	],
})
export class AnketeComponent implements OnInit {
	readonly cities = inject(CITIES);
	readonly abilities = inject(ABILITIES);

	readonly form = new FormGroup({
		name: new FormControl<string | null>(null, {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(2), Validators.maxLength(22)],
		}),
		age: new FormControl<number | null>(null, {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(2), Validators.maxLength(22)],
		}),
		complication: new FormControl<string | null>(null, {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(2), Validators.maxLength(22)],
		}),
		city: new FormControl<string | null>(null, {
			nonNullable: true,
			validators: [Validators.required, Validators.minLength(2), Validators.maxLength(22)],
		}),
		universities: new FormArray([
			new FormControl<string | null>(null, {
				nonNullable: true,
				validators: [Validators.required, Validators.minLength(2), Validators.maxLength(22)],
			}),
		]),
		abilities: new FormArray([
			new FormControl<boolean | null>(null, {
				nonNullable: true,
			}),
			new FormControl<boolean | null>(null, {
				nonNullable: true,
			}),
			new FormControl<boolean | null>(null, {
				nonNullable: true,
			}),
			new FormControl<boolean | null>(null, {
				nonNullable: true,
			}),
			new FormControl<boolean | null>(null, {
				nonNullable: true,
			}),
			new FormControl<boolean | null>(null, {
				nonNullable: true,
			}),
			new FormControl<boolean | null>(null, {
				nonNullable: true,
			}),
			new FormControl<boolean | null>(null, {
				nonNullable: true,
			}),
			new FormControl<boolean | null>(null, {
				nonNullable: true,
			}),
			new FormControl<boolean | null>(null, {
				nonNullable: true,
			}),
		]),
	});

	readonly complications = ['Не важно', 'Не женат / не замужем', 'Женат / замужем'];

	ngOnInit(): void {
		const data = parseFromLS();
		if (data) {
			const checkedValues = data.abilities!.map((a) => a.checked);

			this.form.reset({
				name: data.name,
				complication: data.complication,
				age: data.age,
				abilities: checkedValues,
				universities: data.universities,
				city: data.city,
			});
		}
	}

	addField<T>(controlName: keyof typeof this.form.controls): void {
		const control = this.form.get(controlName) as AbstractControl;
		if (control instanceof FormArray) {
			control.push(
				new FormControl<T | null>(null, {
					nonNullable: true,
					validators: [Validators.required, Validators.requiredTrue],
				}),
			);
		}
	}

	removeField(controlName: keyof typeof this.form.controls, index: number): void {
		const control = this.form.get(controlName) as AbstractControl;
		if (control instanceof FormArray) {
			control.removeAt(index);
		}
	}

	checkUncheckAll(): void {
		const abilitiesArray = this.form.controls.abilities as FormArray;

		abilitiesArray.controls.forEach((control) => {
			if (control instanceof FormControl) {
				const currentValue = control.value;

				control.setValue(!currentValue);
			}
		});
	}

	submit(): void {
		const data = this.form.getRawValue();

		const abilities = this.abilities.map((ability, index) => {
			return {
				name: ability,
				checked: data.abilities.find((cb, cbIndex) => cbIndex === index)!,
			};
		});

		const userData: Request = {
			name: data.name!,
			complication: data.complication!,
			abilities,
			age: data.age!,
			universities: data.universities as string[],
			city: data.city!,
		};

		saveToLS(userData);
	}
}
