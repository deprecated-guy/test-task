import type { ApplicationConfig } from '@angular/core';
import { InjectionToken } from '@angular/core';

export const FIELD_ERRORS = new InjectionToken<Record<string, string>>('FIELD_ERRORS');

export function provideFieldErrorsGlobally(errors: Record<string, string>): ApplicationConfig['providers'] {
	return [
		{
			provide: FIELD_ERRORS,
			useValue: errors,
		},
	];
}
