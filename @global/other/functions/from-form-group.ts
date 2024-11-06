import type { FormGroup } from '@angular/forms';
import type { Observable } from 'rxjs';

export function fromFormGroup<T>(form: FormGroup): Observable<T> {
	return form.valueChanges;
}
