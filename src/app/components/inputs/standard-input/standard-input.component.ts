import type { ElementRef } from '@angular/core';
import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, input, signal, viewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Control, provideAsControl } from '@global/other/abstract/control';
import { ButtonComponent } from '../../button/button.component';
import { PasswordOpenerComponent } from '../../password-opener/password-opener.component';
import { TextFieldCleanerComponent } from '../../text-field-cleaner/text-field-cleaner.component';
import { InputSettingsDirective } from '../input-settings.directive';

@Component({
	selector: 'app-standard-input',
	standalone: true,
	imports: [
		ReactiveFormsModule,
		FormsModule,
		JsonPipe,
		ButtonComponent,
		TextFieldCleanerComponent,
		PasswordOpenerComponent,
	],
	templateUrl: './standard-input.component.html',
	styleUrls: ['./standard-input.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [provideAsControl(StandardInputComponent)],
})
export class StandardInputComponent<T = number | string> extends Control<T> {
	readonly type = input<'text' | 'email' | 'password' | 'number'>('text');
	readonly settings = signal(inject(InputSettingsDirective));
	readonly nativeInput = viewChild<ElementRef<HTMLInputElement>>('nativeInput');

	readonly cleaner = computed(() => this.settings().settings.textFieldCleaner);
	readonly autofocus = computed(() => this.settings().settings.textFieldAutofocus);
	readonly passwordOpener = computed(() => this.settings().settings.textFieldPasswordOpener);

	readonly isNotSpaceOrEmptyString = computed(() => {
		const value = this.value();
		if (typeof value === 'string') {
			return value.length > 0 || value !== '' || value !== ' ';
		}
		return false;
	});

	override ngOnInit() {
		super.ngOnInit();

		if (this.autofocus()) {
			this.nativeInput()?.nativeElement.focus();
		}
	}

	onFocusOut(): void {
		if (this.value() === '' || this.value() === ' ' || this.value() === null) {
			this.onTouch();
		}
	}

	onModelChange(e: T): void {
		this.onChange(e);
		this.value.set(e);
	}

	add(): void {
		const splicedValue = Number(this.value()) + 1;
		this.value.set(splicedValue as T);
	}

	remove(): void {
		const splicedValue = Number(this.value()) - 1;
		this.value.set(splicedValue as T);
	}

	onClear(): void {
		this.value.set(null);
		this.parenControl.control?.setValue(null);
		this.parenControl.control?.markAsUntouched();
		this.nativeInput()?.nativeElement.focus();
	}

	showHidePassword(e: boolean): void {
		this.nativeInput()!.nativeElement.type = e ? 'text' : 'password';
	}
}
