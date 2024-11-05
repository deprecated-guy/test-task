import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Control, provideAsControl } from '@global/other';

@Component({
	selector: 'app-checkbox, input[type=checkbox][appCheckbox]',
	standalone: true,
	imports: [],
	templateUrl: './checkbox.component.html',
	styleUrl: './checkbox.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideAsControl(CheckboxComponent)],
	host: {
		'[class.checked]': 'value()',
		'(click)': 'onClick()',
	},
})
export class CheckboxComponent extends Control<boolean> {
	protected onClick(): void {
		const newValue = !this.value();

		this.value.set(newValue);
	}
}
