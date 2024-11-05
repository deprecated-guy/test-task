import type { OnInit } from '@angular/core';
import { Directive, inject, input } from '@angular/core';
import { INPUT_SETTINGS } from './input-settings';

@Directive({
	selector: '[inputSettings],[textFieldCleaner],[textFieldAutofocus],[textFieldPasswordOpener]',
	standalone: true,
})
export class InputSettingsDirective implements OnInit {
	settings = inject(INPUT_SETTINGS);
	readonly textFieldCleaner = input<boolean>();
	readonly textFieldAutofocus = input<boolean>();
	readonly textFieldPasswordOpener = input<boolean>();

	ngOnInit(): void {
		this.settings = {
			textFieldCleaner: this.textFieldCleaner(),
			textFieldAutofocus: this.textFieldAutofocus(),
			textFieldPasswordOpener: this.textFieldPasswordOpener(),
		};
	}
}