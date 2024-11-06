import { ElementRef, inject, Injectable, signal } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class DropdownService {
	readonly selectedValue = signal<null | string>(null);
	el = inject(ElementRef);
}
