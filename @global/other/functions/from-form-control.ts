import type { FormControl } from '@angular/forms';
import type { Observable } from 'rxjs';

export function fromFormControl<T>(control: FormControl): Observable<T> {
	return control.valueChanges;
}
