import { animate, state, style, transition, trigger } from '@angular/animations';

export const dropdownAnimation = trigger('dropdown', [
	transition(':enter', [
		style({ opacity: 0, transform: 'translateY(-20px)' }),
		animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
	]),
	transition(':leave', [animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(-20px)' }))]),
]);

export const rotationAnimation = trigger('rotation', [
	state('default', style({ transform: 'rotate(180deg)', overflow: 'hidden' })),
	state('rotated', style({ transform: 'rotate(0deg)', overflow: 'hidden' })),
	transition('default <=> rotated', animate('300ms ease-in-out')),
]);
