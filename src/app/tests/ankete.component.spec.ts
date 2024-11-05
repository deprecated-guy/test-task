import type { ComponentFixture } from '@angular/core/testing';
import { TestBed } from '@angular/core/testing';

import { AnketeComponent } from '../components/ankete/ankete.component';

describe('anketeComponent', () => {
	let component: AnketeComponent;
	let fixture: ComponentFixture<AnketeComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AnketeComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(AnketeComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
