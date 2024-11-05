import type { Provider } from '@angular/core';
import { InjectionToken } from '@angular/core';

export interface InputSettings {
	textFieldCleaner?: boolean;
	textFieldAutofocus?: boolean;
	textFieldPasswordOpener?: boolean;
}

export const INPUT_SETTINGS = new InjectionToken<InputSettings>('INPUT_SETTINGS', {
	providedIn: 'root',
	factory: (): InputSettings => ({}),
});

export function provideInputSettings(settings: InputSettings): Provider {
	return {
		provide: INPUT_SETTINGS,
		useValue: settings,
	};
}
