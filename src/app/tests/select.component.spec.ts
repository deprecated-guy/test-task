import type { ComponentFixture } from '@angular/core/testing';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DropdownComponent } from '../components/dropdown/dropdown.component';
import { SelectComponent } from '../components/inputs/select/select.component';

describe('selectComponent', () => {
	let component: SelectComponent;
	let fixture: ComponentFixture<SelectComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [SelectComponent, DropdownComponent, FormsModule],
		}).compileComponents();

		fixture = TestBed.createComponent(SelectComponent);
		component = fixture.componentInstance;
		fixture.componentRef.setInput('items', ['Option 1', 'Option 2', 'Option 3']);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should open dropdown when select is clicked', () => {
		const selectContainer = fixture.debugElement.query(By.css('.select-container'));
		selectContainer.triggerEventHandler('click', null);
		fixture.detectChanges();
		expect(component.open()).toBeTrue();

		const dropdown = fixture.debugElement.query(By.directive(DropdownComponent));
		expect(dropdown).toBeTruthy();
	});

	it('should toggle dropdown when icon is clicked', () => {
		const icon = fixture.debugElement.query(By.css('.icon'));
		icon.triggerEventHandler('click', null);
		fixture.detectChanges();
		expect(component.open()).toBeTrue();

		icon.triggerEventHandler('click', null);
		fixture.detectChanges();
		expect(component.open()).toBeFalse();
	});

	it('should handle keyboard escape to close dropdown', () => {
		component.open.set(true);
		fixture.detectChanges();
		expect(component.open()).toBeTrue();

		const event = new KeyboardEvent('keydown', { key: 'Escape' });
		fixture.debugElement.triggerEventHandler('keydown.escape', event);
		fixture.detectChanges();

		expect(component.open()).toBeFalse();
	});

	it('should not toggle dropdown when disabled', () => {
		component.disabled.set(true);
		fixture.detectChanges();

		const selectContainer = fixture.debugElement.query(By.css('.select-container'));
		selectContainer.triggerEventHandler('click', null);
		fixture.detectChanges();
		expect(component.open()).toBeFalse();
	});

	it('should handle keyboard navigation and selection', fakeAsync(() => {
		// Открываем дропдаун
		component.open.set(true);
		fixture.detectChanges();
		expect(component.open()).toBeTrue();

		const hostElement = fixture.debugElement.nativeElement;

		// Нажимаем ArrowDown
		const eventDown = new KeyboardEvent('keydown', { key: 'ArrowDown' });
		hostElement.dispatchEvent(eventDown);
		fixture.detectChanges();
		tick();

		// Нажимаем Enter
		const eventEnter = new KeyboardEvent('keydown', { key: 'Enter' });
		hostElement.dispatchEvent(eventEnter);
		fixture.detectChanges();
		tick();
		expect(component.open()).toBeFalse();
		expect(component.value()).toBe('Option 2');
	}));

	it('should implement ControlValueAccessor correctly', fakeAsync(() => {
		component.writeValue('Option 3');
		fixture.detectChanges();
		tick();
		expect(component.value()).toBe('Option 3');

		const onChangeSpy = jasmine.createSpy('onChange');
		component.registerOnChange(onChangeSpy);

		fixture.detectChanges();
		tick();
		expect(onChangeSpy).toHaveBeenCalledWith('Option 1');

		const onTouchedSpy = jasmine.createSpy('onTouched');
		component.registerOnTouched(onTouchedSpy);

		component.open.set(false);
		fixture.detectChanges();
		tick();
		expect(onTouchedSpy).toHaveBeenCalled();
	}));
});
