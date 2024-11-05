import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AnketeComponent } from './components/ankete/ankete.component';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [RouterOutlet, AnketeComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent {}
