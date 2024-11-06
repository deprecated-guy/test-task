import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Control, provideAsControl } from '@global/other';

@Component({
	selector: 'app-checkbox-labeled',
	standalone: true,
	imports: [],
	templateUrl: './checkbox-labeled.component.html',
	styleUrl: './checkbox-labeled.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideAsControl(CheckboxLabeledComponent)],
})
export class CheckboxLabeledComponent extends Control<boolean> {
	protected onClick(): void {
		const newValue = !this.value();

		this.value.set(newValue);
		this.parenControl.control?.setValue(this.value());
	}
}
