import type { OnInit, Provider, Type } from '@angular/core';
import type { ControlValueAccessor } from '@angular/forms';
import { Directive, forwardRef, inject, Injector, input, signal } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl } from '@angular/forms';
import { EMPTY_FUNCTION } from '@global/other';
import { pure } from '@global/other/decorators/pure';
import { provideProviders } from '@global/other/functions/provide';
import { DEFAULT_INPUT_VALUE } from '@global/other/tokens/default-input-value';

@Directive({
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => Control),
			multi: true,
		},
	],
})
export abstract class Control<T> implements ControlValueAccessor, OnInit {
	readonly value = signal<T | null>(inject(DEFAULT_INPUT_VALUE));
	readonly injector = inject(Injector);
	readonly readOnly = input(false);
	readonly checked = input(false);

	readonly disabled = signal(false);

	protected onChange: (v: T) => void = EMPTY_FUNCTION;
	protected onTouch: () => void = EMPTY_FUNCTION;

	ngOnInit(): void {
		this.parenControl.valueAccessor = this;
	}

	writeValue(obj: T): void {
		this.value.set(obj);
	}

	registerOnChange(fn: (value: T) => void): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: () => void): void {
		this.onTouch = fn;
	}

	@pure()
	protected get parenControl(): NgControl {
		return this.injector.get(NgControl);
	}

	onModelChange(event: T): void {
		this.value.set(event);
		this.onChange(event);
	}
}

export function provideAsControl<T>(control: Type<Control<T>>): Provider {
	return provideProviders(Control, control);
}
