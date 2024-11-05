import type { ComponentFixture } from '@angular/core/testing';
import { ChangeDetectionStrategy } from '@angular/core';

import { TestBed } from '@angular/core/testing';

import { FormControlDirective, ReactiveFormsModule } from '@angular/forms';
import { DEFAULT_INPUT_VALUE, provideDefaultInputValue } from '@global/other';
import { StandardInputComponent } from '../components/inputs/standard-input/standard-input.component';

describe('standardInputComponent', () => {
	let component: StandardInputComponent;
	let fixture: ComponentFixture<StandardInputComponent>;
	let formControlDirective: FormControlDirective;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [ReactiveFormsModule, StandardInputComponent],
			providers: [provideDefaultInputValue(null)],
		})
			.overrideComponent(StandardInputComponent, {
				set: { changeDetection: ChangeDetectionStrategy.OnPush },
			})
			.compileComponents();

		fixture = TestBed.createComponent(StandardInputComponent<string | number>);
		component = fixture.componentInstance;
		fixture.detectChanges();

		formControlDirective = TestBed.inject(FormControlDirective);
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should initialize with default input value', () => {
		const defaultValue = TestBed.inject(DEFAULT_INPUT_VALUE);
		expect(component.value()).toBe(defaultValue);
	});

	it('should update form control value through writeValue()', () => {
		const newValue = 'New Value';
		component.writeValue(newValue);
		expect(component.value()).toBe(newValue);
		expect(formControlDirective.control.value).toBe(newValue);
	});

	it('should register onChange callback', () => {
		const onChangeSpy = jasmine.createSpy('onChange');
		component.registerOnChange(onChangeSpy);
		const newValue = 'Another Value';
		component.writeValue(newValue);
		expect(onChangeSpy).toHaveBeenCalledWith(newValue);
	});

	it('should register onTouch callback', () => {
		const onTouchSpy = jasmine.createSpy('onTouch');
		component.registerOnTouched(onTouchSpy);
		component.registerOnTouched(() => {});
		expect(formControlDirective.control.touched).toBeTrue();
	});
});
