import { Component, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';



interface HeartParticle {
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
  color: string;
}



@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  
 heartsArray: number[] = [];

  ngOnInit(): void {
    // Create 20 floating hearts
    this.heartsArray = Array(20).fill(0);
  }
  hearts: HeartParticle[] = [];
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  numHearts = 0;

  mouseX = 0;
  mouseY = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    // Only run in the browser
    if (isPlatformBrowser(this.platformId)) {
      this.canvas = document.getElementById('heart-cloud') as HTMLCanvasElement;
      this.ctx = this.canvas.getContext('2d')!;
      this.resizeCanvas();
      this.initHearts();
      this.animate();
      
    }
  }

  @HostListener('window:resize')
  resizeCanvas() {
    if (isPlatformBrowser(this.platformId)) {
      this.canvas.width = window.innerWidth;
      this.canvas.height = window.innerHeight;
    }
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
  }

  initHearts() {
    for (let i = 0; i < this.numHearts; i++) {
      this.hearts.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: 5 + Math.random() * 10,
        speed: 0.2 + Math.random() * 0.6,
        angle: Math.random() * 2 * Math.PI,
        color: `rgba(255, ${Math.floor(105 + Math.random() * 150)}, 180, ${0.3 + Math.random() * 0.5})`
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let heart of this.hearts) {
      const dx = (this.mouseX - heart.x) * 0.0005;
      const dy = (this.mouseY - heart.y) * 0.0005;

      heart.x += Math.cos(heart.angle) * heart.speed + dx;
      heart.y += Math.sin(heart.angle) * heart.speed + dy;
      heart.angle += 0.01;

      if (heart.x > this.canvas.width + 50) heart.x = -50;
      if (heart.x < -50) heart.x = this.canvas.width + 50;
      if (heart.y > this.canvas.height + 50) heart.y = -50;
      if (heart.y < -50) heart.y = this.canvas.height + 50;

      this.ctx.save();
      this.ctx.translate(heart.x, heart.y);
      this.ctx.rotate(heart.angle);
      this.ctx.fillStyle = heart.color;
      this.ctx.font = `${heart.size}px Arial`;
      this.ctx.fillText('💚', 0, 0);
      this.ctx.restore();
    }
  }
  images = [
  'https://i.ibb.co/rK8XqMnC/image.png',
  'https://i.ibb.co/273Hp2dh/image.png',
  'https://i.ibb.co/LzKvDZBK/image.png',
  'https://i.ibb.co/Dg1kwNXv/image.png',
  'https://i.ibb.co/h1WC9smt/image.png',
  'https://i.ibb.co/TBp6PZZV/image.png',
  'https://i.ibb.co/93Vk9M4t/image-2025-08-15-032824384.png',
  'https://i.ibb.co/0jSrwHys/image.png'
];

modalImage: string | null = null;

openModal(img: string) {
  this.modalImage = img;
}

closeModal() {
  this.modalImage = null;
}
 showPasscodeModal = false;
  selectedImage: string | null = null;
  enteredPasscode = '';
  correctPasscode = '69';
  wrongPasscode = false;
   requestPasscode(img: string) {
    this.selectedImage = img;
    this.enteredPasscode = '';
    this.wrongPasscode = false;
    this.showPasscodeModal = true;
  }

  unlockImage() {
    if (this.enteredPasscode === this.correctPasscode && this.selectedImage) {
      this.modalImage = this.selectedImage;
      this.showPasscodeModal = false;
    } else {
      this.wrongPasscode = true;
    }
  }

  closePasscodeModal() {
    this.showPasscodeModal = false;
  }

    bouncingRow = true;
startRowBounce() {
    setInterval(() => {
      this.bouncingRow = false; // remove class first to reset animation
      (document.querySelector('.cloud-row') as HTMLElement)?.offsetWidth;

      this.bouncingRow = true;  // add class again to trigger bounce
    }, 20); // every 2.5s
  }



  comments = [
  { user: 'Luka', text: 'მიყვარხარ ჩემი ცხოგრება!', likes: 69 },
];
newCommentText = '';
imageLikes = 0;

addComment() {
  if(this.newCommentText.trim()) {
    this.comments.push({ user: 'You', text: this.newCommentText, likes: 0 });
    this.newCommentText = '';
  }
}

likeComment(comment: any) {
  comment.likes++;
}

likeImage() {
  this.imageLikes++;
}



currentUsername: string | null = null;
tempUsername = '';
showUsernamePrompt = false;

promptUsernameAndPost() {
  if (!this.currentUsername) {
    this.showUsernamePrompt = true;
  } else {
    this.postComment();
  }
}

confirmUsername() {
  if (this.tempUsername.trim() !== '') {
    this.currentUsername = this.tempUsername.trim();
    this.tempUsername = '';
    this.showUsernamePrompt = false;
    this.postComment();
  }
}

postComment() {
  if (this.newCommentText.trim() === '') return;
  this.comments.push({ user: this.currentUsername!, text: this.newCommentText.trim(), likes: 0 });
  this.newCommentText = '';
}



deleteComment(index: number) {
  this.comments.splice(index, 1);
}









}