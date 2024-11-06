import { InjectionToken } from '@angular/core';

export const ABILITIES = new InjectionToken<string[]>('ABILITIES', {
	providedIn: 'root',
	factory: abilitiesFactory,
});

function abilitiesFactory(): string[] {
	return [
		'Общение',
		'Вождение',
		'Иностранные языки',
		'Программирование',
		'Бег с припятствиями',
		'Управление вертолетом',
		'Быстрое чтение',
		'Оперное пение',
		'Самозащита',
		'Выделить все',
	];
}
