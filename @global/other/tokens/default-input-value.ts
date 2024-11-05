import { type ApplicationConfig, InjectionToken } from '@angular/core';

export const DEFAULT_INPUT_VALUE = new InjectionToken<any>('DEFAULT_INPUT_VALUE');
export function provideDefaultInputValue<T>(value: T): ApplicationConfig['providers'] {
	return [
		{
			provide: DEFAULT_INPUT_VALUE,
			useValue: value,
		},
	];
}
