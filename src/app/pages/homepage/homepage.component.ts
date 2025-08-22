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

interface Star {
  id: string; // ✅ changed to string to match template usage
  title: string;
  date: string;
  locked: boolean;
}

interface RomanticParticle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  color: string;
  type: 'orb' | 'lantern';
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent {

  // -------------------- Hearts --------------------
  heartsArray: number[] = [];
  hearts: HeartParticle[] = [];
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D;
  numHearts = 0;
  mouseX = 0;
  mouseY = 0;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    this.heartsArray = Array(20).fill(0);

    // Initialize stars
    this.stars = [
      { id: '1', title: 'First Meeting', date: '2021-05-14', locked: false },
      { id: '2', title: 'First I Love You', date: '2021-08-22', locked: false },
      { id: '3', title: 'Wedding Date', date: '??-??-2026', locked: true }
    ];
  }

  ngAfterViewInit(): void {
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

  // -------------------- Gallery --------------------
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
  openModal(img: string) { this.modalImage = img; }
  closeModal() { this.modalImage = null; }

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
    } else { this.wrongPasscode = true; }
  }

  closePasscodeModal() { this.showPasscodeModal = false; }

  bouncingRow = true;
  startRowBounce() {
    setInterval(() => {
      this.bouncingRow = false;
      (document.querySelector('.cloud-row') as HTMLElement)?.offsetWidth;
      this.bouncingRow = true;
    }, 2500);
  }

  // -------------------- Comments --------------------
  comments = [{ user: 'Luka', text: 'მიყვარხარ ჩემი ცხოვრება!', likes: 69 }];
  newCommentText = '';
  imageLikes = 0;

  addComment() {
    if (this.newCommentText.trim()) {
      this.comments.push({ user: 'You', text: this.newCommentText, likes: 0 });
      this.newCommentText = '';
    }
  }

  likeComment(comment: any) { comment.likes++; }
  likeImage() { this.imageLikes++; }

  currentUsername: string | null = null;
  tempUsername = '';
  showUsernamePrompt = false;

  promptUsernameAndPost() {
    if (!this.currentUsername) this.showUsernamePrompt = true;
    else this.postComment();
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

  deleteComment(index: number) { this.comments.splice(index, 1); }

  // -------------------- STAR MAP --------------------
  stars: Star[] = [];
  selectedStar: Star | null = null;

  showStarPasscodeModal = false;
  enteredStarPasscode = '';

  romanticParticles: RomanticParticle[] = [];
  numParticles = 20; // fewer but bigger glowing hearts
  canvasRomantic!: HTMLCanvasElement;
  ctxRomantic!: CanvasRenderingContext2D;

  private animateRomanticParticles() {
    requestAnimationFrame(() => this.animateRomanticParticles());
    this.ctxRomantic.clearRect(0, 0, this.canvasRomantic.width, this.canvasRomantic.height);

    for (let p of this.romanticParticles) {
      // Floating upwards with gentle sine drift
      p.y -= p.speedY;
      p.x += Math.sin(p.y * 0.01) * 0.5;

      // Wrap around screen
      if (p.y < -50) p.y = this.canvasRomantic.height + 50;
      if (p.x > this.canvasRomantic.width + 50) p.x = -50;
      if (p.x < -50) p.x = this.canvasRomantic.width + 50;

      // Draw heart shape
      this.ctxRomantic.save();
      this.ctxRomantic.translate(p.x, p.y);
      this.ctxRomantic.scale(p.size / 20, p.size / 20);
      this.ctxRomantic.fillStyle = p.color;
      this.ctxRomantic.beginPath();
      this.ctxRomantic.moveTo(0, -10);
      this.ctxRomantic.bezierCurveTo(-12, -20, -20, -5, 0, 10);
      this.ctxRomantic.bezierCurveTo(20, -5, 12, -20, 0, -10);
      this.ctxRomantic.fill();
      this.ctxRomantic.restore();
    }
  }

  // -------------------- CINEMATIC SECTION --------------------
  cinematicActive = false;
  loadingCinematic = false;
  menuCollapsed = false;
  activeSection: string | null = 'firstMet'; // ✅ corrected type
  keycardActive = false;
  enteredKey = '';

  cinematicSections = [
    { id: 'firstMet', title: 'When We First Met', emoji: '🌸', subtitle: '21 November 2024', text: 'The day our journey began…' },
    { id: 'firstLove', title: 'First Time She Said I Love You', emoji: '💌', subtitle: '14 January 2025', text: 'A moment of magic and warmth.' },
    { id: 'marriage', title: 'Marriage', emoji: '💍', subtitle: 'Click Im ready to see the date ', text: '' }
  ];

  openCinematicUI() {
    this.cinematicActive = true;
    this.loadingCinematic = true;
    setTimeout(() => this.loadingCinematic = false, 1500);
  }

  openKeycard(){ this.keycardActive = true; }
  closeKeycard(){ 
    this.keycardActive = false; 
    this.enteredKey = ''; 
  }

  closeCinematicUI() {
    this.cinematicActive = false;
    this.loadingCinematic = false;
  }

  selectSection(id: string) { // ✅ now matches string
    this.activeSection = id;
  }
submitKey() {
  if (this.enteredKey === '69') {
    // The key is correct — do something, e.g., show a message or unlock content
    alert("Key accepted! 💚");
    this.keycardActive = false;
    this.enteredKey = '';
  } else {
    // Wrong key — show error
    alert("Wrong key, try again!");
    this.enteredKey = '';
  }
}
}
