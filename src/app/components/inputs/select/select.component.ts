import { AsyncPipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	computed,
	ElementRef,
	HostListener,
	inject,
	Input,
	input,
	signal,
	viewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Control, dropdownAnimation, preventDefault, provideAsControl, rotationAnimation } from '@global/other';
import { containOrAfter } from '@global/other/functions/contain-or-after';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { DropdownService } from '../../dropdown/dropdown.service';

@Component({
	selector: 'app-select',
	standalone: true,
	imports: [DropdownComponent, FormsModule, AsyncPipe],
	templateUrl: './select.component.html',
	styleUrl: './select.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideAsControl(SelectComponent), DropdownService],
	animations: [dropdownAnimation, rotationAnimation],
})
export class SelectComponent extends Control<string> {
	private readonly el = inject(ElementRef).nativeElement;

	@Input() firstSelected: string | null = null;
	readonly dropdown = viewChild.required(DropdownComponent);
	readonly service = inject(DropdownService, { self: true });
	readonly items = input.required<string[]>();
	readonly open = signal<boolean>(false);

	readonly filteredItems = computed(() => {
		return this.items().filter((v) => v.toLowerCase().includes(this.value()?.toString()?.toLowerCase() ?? ''));
	});

	protected setOpen(event: string | null) {
		this.open.set(false);
		this.value.set(event);
	}

	@HostListener('document:click', ['$event'])
	onClick(event: MouseEvent): void {
		preventDefault(event);

		if (containOrAfter(event, this.service.el.nativeElement)) {
			this.value.set(this.service.selectedValue());
		} else if (containOrAfter(event, this.el)) {
			this.firstSelected = null;
			this.value.set(null);
		} else {
			this.open.set(false);
			this.firstSelected = this.items()[0];
			this.value.set(this.firstSelected);
		}
	}

	@HostListener('keydown.escape', ['$event'])
	onEscape(e: KeyboardEvent): void {
		e.preventDefault();
		e.stopPropagation();
		this.open.set(false);
	}

	@HostListener('keydown.arrowUp', ['$event'])
	onArrowUp(e: KeyboardEvent): void {
		preventDefault(e);
		if (this.dropdown()!.index() > 0) {
			this.dropdown()?.index.update((v) => v - 1);
		} else {
			this.dropdown()!.index.set(this.dropdown()!.items().length - 1);
		}
	}

	@HostListener('keydown.enter', ['$event'])
	onEnter(e: KeyboardEvent): void {
		preventDefault(e);

		const el = this.items()[this.dropdown()!.index()];
		this.dropdown()!.element.set(el);
		this.parenControl.control!.setValue(this.value());
	}

	@HostListener('keydown.arrowDown', ['$event'])
	onArrowDown(e: KeyboardEvent): void {
		preventDefault(e);

		if (this.dropdown()!.index() < this.dropdown()!.items().length - 1) {
			this.dropdown()!.index.update((v) => v + 1);
		} else {
			this.dropdown()!.index.set(0);
		}
	}

	openCloseDropDown(): void {
		if (this.open()) {
			this.open.set(false);
		} else {
			this.open.set(true);
		}
	}
}
