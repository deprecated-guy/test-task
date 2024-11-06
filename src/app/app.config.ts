import type { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideDefaultInputValue, provideFieldErrorsGlobally } from '@global/other';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: false }),
		provideDefaultInputValue(null),
		provideAnimations(),
		provideFieldErrorsGlobally({
			required: 'This field is required',
			minlength: 'Minimal value length is 2 symbol',
			maxlength: 'Minimal value length is 22 symbols',
			requiredTrue: 'This field is required',
		}),
	],
};
