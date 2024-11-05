import type { PipeTransform } from '@angular/core';
import type { AbstractControl } from '@angular/forms';
import type { Observable } from 'rxjs';
import { inject, Pipe } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { FIELD_ERRORS } from '@global/other/tokens/field-errors';
import { map, of, startWith } from 'rxjs';

@Pipe({
	name: 'fieldError',
	standalone: true,
	pure: false,
})
export class FieldErrorPipe<T> implements PipeTransform {
	private readonly control = inject(NgControl, { optional: true });
	private readonly errors = inject(FIELD_ERRORS);
	transform(value: T[]): Observable<string[]> {
		if (!this.control || !(this.control.control instanceof FormControl)) {
			return of(value as string[]);
		}

		return this.control.control.statusChanges.pipe(
			startWith(this.control.control.status),
			map(() => {
				return [...this.getErrorsArray(this.control!.control!)];
			}),
		);
	}

	private getErrorsArray(control: AbstractControl): string[] {
		if (!control.errors) {
			return [];
		}

		return Object.keys(control!.errors!).map((key) => {
			return this.errors[key];
		});
	}
}
