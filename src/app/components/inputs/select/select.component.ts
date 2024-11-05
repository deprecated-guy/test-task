import { ChangeDetectionStrategy, Component, HostListener, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Control, dropdownAnimation, provideAsControl, rotationAnimation } from '@global/other';
import { DropdownComponent } from '../../dropdown/dropdown.component';

@Component({
	selector: 'app-select',
	standalone: true,
	imports: [DropdownComponent, FormsModule],
	templateUrl: './select.component.html',
	styleUrl: './select.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideAsControl(SelectComponent)],
	animations: [dropdownAnimation, rotationAnimation],
})
export class SelectComponent extends Control<string> {
	readonly items = input.required<string[]>();
	readonly open = signal<boolean>(false);

	protected setOpen(event: string | null) {
		this.open.set(false);
		this.value.set(event);
	}

	@HostListener('keydown.escape', ['$event'])
	onEscape(e: KeyboardEvent): void {
		e.preventDefault();
		e.stopPropagation();
		this.open.set(false);
	}

	openCloseDropDown(): void {
		if (this.open()) {
			this.open.set(false);
		} else {
			this.open.set(true);
		}
	}
}
