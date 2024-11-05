import { ChangeDetectionStrategy, Component, computed, HostListener, input, model, signal } from '@angular/core';

@Component({
	selector: 'app-dropdown',
	standalone: true,
	imports: [],
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DropdownComponent {
	readonly items = input.required<string[]>();
	readonly index = signal(0);

	readonly element = model<string | null>(null);

	readonly selectedElement = computed(() => {
		if (this.element()) {
			return this.element();
		} else {
			return this.items()[this.index()];
		}
	});

	@HostListener('document:keydown', ['$event'])
	protected onKeydown(event: KeyboardEvent) {
		const lastIndex = this.items().findIndex((ind) => ind === this.items()[this.items().length - 1]);
		if (event.key === 'ArrowUp') {
			if (this.index() !== 0) {
				this.index.update((ind) => ind - 1);
			} else {
				this.index.set(lastIndex);
			}
		} else if (event.key === 'ArrowDown') {
			if (this.index() < lastIndex) {
				this.index.update((ind) => ind + 1);
			} else {
				this.index.set(0);
			}
		} else if (event.key === 'Enter') {
			this.element.set(this.items()[this.index()]);
		}
	}
}
