import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';

type ButtonType = 'icon-button' | 'input-button' | 'flat' | 'default';
type TriangleDirection = 'up' | 'bottom';

@Component({
	selector: 'a[appButton], button[appButton]',
	standalone: true,
	imports: [],
	templateUrl: './button.component.html',
	styleUrl: './button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[attr.data-appearance]': 'appearance()',
		'[attr.data-direction]': 'direction()',
	},
})
export class ButtonComponent {
	readonly icon = input<string | null>(null);
	readonly iconType = input<'colored' | 'transparent'>('transparent');
	readonly appearance = input<ButtonType>('default');
	readonly direction = input<TriangleDirection | null>(null);

	readonly computedIcon = computed(() => {
		if (this.appearance() === 'input-button') {
			const direction = this.direction();
			if (direction === 'up') {
				return 'triangle-top.svg';
			} else if (direction === 'bottom') {
				return 'triangle-down.svg';
			}
		}
		return `url(${this.icon()})`;
	});
}
