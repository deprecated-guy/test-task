import { type ApplicationConfig, InjectionToken, type Provider } from '@angular/core';

export interface PasswordOpenerIconStates {
	show: string;
	hide: string;
	isColored?: boolean;
}

export const PASSWORD_OPENER_ICON = new InjectionToken<PasswordOpenerIconStates>('PASSWORD_OPENER_ICON', {
	providedIn: 'root',
	factory: (): PasswordOpenerIconStates => ({
		hide: 'hide-password.svg',
		show: 'show-password.svg',
	}),
});

export function provideGlobalPasswordOpenerIcon(iconStates: PasswordOpenerIconStates): ApplicationConfig['providers'] {
	return [
		{
			provide: PASSWORD_OPENER_ICON,
			useFactory: (): PasswordOpenerIconStates => iconStates,
		},
	];
}

export function providePasswordOpenerIcon(iconStates: PasswordOpenerIconStates): Provider {
	return {
		provide: PASSWORD_OPENER_ICON,
		useFactory: (): PasswordOpenerIconStates => iconStates,
	};
}
