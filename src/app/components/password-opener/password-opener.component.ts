import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { PASSWORD_OPENER_ICON } from '@global/other';
import { ButtonComponent } from '../button/button.component';

@Component({
	selector: 'app-password-opener',
	standalone: true,
	imports: [ButtonComponent],
	templateUrl: './password-opener.component.html',
	styleUrl: './password-opener.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordOpenerComponent {
	readonly states = signal(inject(PASSWORD_OPENER_ICON));
	readonly show = output<boolean>();
	readonly hidden = signal(true);

	readonly icon = computed(() => (!this.hidden() ? this.states().show : this.states().hide));

	onClick(): void {
		this.hidden.update((v) => !v);
		this.show.emit(this.hidden());
	}
}
