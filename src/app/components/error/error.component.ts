import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { Control, dropdownAnimation, provideAsControl } from '@global/other';

@Component({
	selector: 'app-error',
	standalone: true,
	imports: [],
	templateUrl: './error.component.html',
	styleUrl: './error.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [dropdownAnimation],
	providers: [provideAsControl(ErrorComponent)],
})
export class ErrorComponent extends Control<null> {
	readonly errors = input<string[] | null>(null);
}
