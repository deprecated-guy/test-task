import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, input, model, signal } from '@angular/core';
import { DropdownService } from './dropdown.service';

@Component({
	selector: 'app-dropdown',
	standalone: true,
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent implements OnInit {
	readonly items = input.required<string[]>();
	readonly index = signal(0);
	private readonly service = inject(DropdownService);
	readonly el = inject<ElementRef<HTMLElement>>(ElementRef);

	readonly element = model<string | null>(null);

	readonly selectedElement = computed(() => {
		if (this.element()) {
			return this.element();
		} else {
			return this.items()[this.index()];
		}
	});

	ngOnInit(): void {
		this.service.el = this.el;
	}

	selectValue(el: string) {
		this.element.set(el);
		this.service.selectedValue.set(el);
	}
}
