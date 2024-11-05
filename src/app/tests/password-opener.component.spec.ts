import type { DebugElement } from '@angular/core';
import type { ComponentFixture } from '@angular/core/testing';
import type { PasswordOpenerIconStates } from '@global/other';
import { TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { PASSWORD_OPENER_ICON } from '@global/other';
import { ButtonComponent } from '../components/button/button.component';
import { PasswordOpenerComponent } from '../components/password-opener/password-opener.component';

describe('passwordOpenerComponent', () => {
	let component: PasswordOpenerComponent;
	let fixture: ComponentFixture<PasswordOpenerComponent>;
	let mockPasswordOpenerIcon: PasswordOpenerIconStates;

	beforeEach(async () => {
		mockPasswordOpenerIcon = {
			show: 'show-password.svg',
			hide: 'hide-password.svg',
		};

		await TestBed.configureTestingModule({
			imports: [PasswordOpenerComponent, ButtonComponent, FormsModule],
			providers: [{ provide: PASSWORD_OPENER_ICON, useValue: mockPasswordOpenerIcon }],
		}).compileComponents();

		fixture = TestBed.createComponent(PasswordOpenerComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should display the hide icon by default', () => {
		const imgDe: DebugElement = fixture.debugElement.query(By.css('button img'));
		expect(imgDe).toBeTruthy();
		const img: HTMLImageElement = imgDe.nativeElement;
		expect(img.src).toContain(mockPasswordOpenerIcon.hide);
	});

	it('should toggle hidden state and emit show event when clicked', () => {
		spyOn(component.show, 'emit');

		const buttonDe: DebugElement = fixture.debugElement.query(By.css('button'));
		buttonDe.triggerEventHandler('click', null);
		fixture.detectChanges();

		expect(component.hidden()).toBeFalse();
		expect(component.show.emit).toHaveBeenCalledWith(false);

		const imgDe: DebugElement = fixture.debugElement.query(By.css('button img'));
		const img: HTMLImageElement = imgDe.nativeElement;
		expect(img.src).toContain(mockPasswordOpenerIcon.show);

		buttonDe.triggerEventHandler('click', null);
		fixture.detectChanges();

		expect(component.hidden()).toBeTrue();
		expect(component.show.emit).toHaveBeenCalledWith(true);
		expect(img.src).toContain(mockPasswordOpenerIcon.hide);
	});

	it('should display correct icon based on hidden state', () => {
		const imgDe: DebugElement = fixture.debugElement.query(By.css('button img'));
		const img: HTMLImageElement = imgDe.nativeElement;

		expect(img.src).toContain(mockPasswordOpenerIcon.hide);

		component.hidden.set(false);
		fixture.detectChanges();
		expect(img.src).toContain(mockPasswordOpenerIcon.show);

		component.hidden.set(true);
		fixture.detectChanges();
		expect(img.src).toContain(mockPasswordOpenerIcon.hide);
	});
});
