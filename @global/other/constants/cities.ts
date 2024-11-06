import type { Signal } from '@angular/core';
import { InjectionToken, signal } from '@angular/core';

export const CITIES = new InjectionToken<Signal<string[]>>('CITIES', {
	providedIn: 'root',
	factory: () => citiesFactory(),
});

function citiesFactory(): Signal<string[]> {
	return signal([
		'Не важно',
		'Москва',
		'Санкт-Петербург',
		'Новосибирск',
		'Екатеринбург',
		'Казань',
		'Нижний Новгород',
		'Челябинск',
		'Самара',
		'Омск',
		'Ростов-на-Дону',
		'Уфа',
		'Красноярск',
		'Воронеж',
		'Пермь',
		'Волгоград',
		'Саратов',
		'Тюмень',
		'Тольятти',
		'Ижевск',
		'Барнаул',
		'Ульяновск',
		'Иркутск',
		'Хабаровск',
		'Ярославль',
		'Владивосток',
		'Махачкала',
		'Томск',
		'Оренбург',
		'Кемерово',
		'Новокузнецк',
		'Рязань',
		'Астрахань',
		'Пенза',
		'Липецк',
		'Тула',
		'Калининград',
		'Курск',
		'Чебоксары',
		'Брянск',
		'Иваново',
		'Тверь',
		'Ставрополь',
		'Белгород',
		'Сочи',
		'Нижний Тагил',
		'Архангельск',
		'Владимир',
		'Сургут',
		'Чита',
		'Смоленск',
		'Калуга',
	]);
}