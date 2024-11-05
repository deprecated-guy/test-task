import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FieldErrorPipe } from '../../pipes/field-error.pipe';
import { ErrorComponent } from '../error/error.component';
import { CheckboxComponent } from '../inputs/checkbox/checkbox.component';
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
	],
	templateUrl: './ankete.component.html',
	styleUrl: './ankete.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnketeComponent {
	readonly form = new FormGroup({
		test: new FormControl<string | null>(null, {
			nonNullable: true,
			validators: [Validators.required],
		}),
		bl: new FormControl<boolean | null>(null, {
			nonNullable: true,
			validators: [Validators.required],
		}),
		bl1: new FormControl<string | null>(null, {
			nonNullable: true,
			validators: [Validators.required],
		}),
	});

	readonly items = ['1', '2', '3'];
}
