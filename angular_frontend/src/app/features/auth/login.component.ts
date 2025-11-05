import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  form = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  submitting = false;

  submit() {
    if (this.form.invalid) return;
    this.submitting = true;
    const { username, password } = this.form.value as { username: string; password: string };
    // Mock login now; will switch to API later
    const runLater = (fn: () => void, ms: number) => {
      const g: any = typeof globalThis !== 'undefined' ? (globalThis as any) : null;
      if (g && typeof g.setTimeout === 'function') {
        return g.setTimeout(fn, ms);
      }
      // SSR fallback: run immediately
      fn();
      return 0;
    };
    runLater(() => {
      this.auth.login(username, password);
      this.submitting = false;
    }, 300);
  }
}
