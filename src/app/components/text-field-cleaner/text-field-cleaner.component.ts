import { ChangeDetectionStrategy, Component, output } from '@angular/core';

@Component({
	selector: 'app-text-field-cleaner',
	standalone: true,
	imports: [],
	templateUrl: './text-field-cleaner.component.html',
	styleUrl: './text-field-cleaner.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextFieldCleanerComponent {
	readonly clear = output<void>();
}
