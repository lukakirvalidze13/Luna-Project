import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  ngOnInit() {
    // Client-only animation setup
    if (typeof window !== 'undefined') {
      this.animateHearts();
    }
  }

  animateHearts() {
    // hearts already animated via CSS keyframes
  }
}
