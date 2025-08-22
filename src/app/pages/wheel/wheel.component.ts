import { isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, Inject, PLATFORM_ID, ViewChild, HostListener} from '@angular/core';


@Component({
  selector: 'app-wheel',
  templateUrl: './wheel.component.html',
  styleUrl: './wheel.component.css'
})
export class WheelComponent {

dares: string[] = [
  "💋 Kiss partner passionately anywhere",
  "👙 Play with partner's breasts for 30 sec",
  "🍑 Spank partner's butt gently",
  "🤫 Whisper a sexual fantasy into ear",
  "🖐 Touch partner's inner thighs",
  "💦 Trace fingers along partner’s erogenous zones",
  "👅 Kiss a secret erogenous spot",
  "💃 Perform a seductive dance",
  "💆 Give a sensual full-body massage",
  "🫦 Tease partner with lips and tongue",
  "🩱 Remove a piece of clothing",
  "🔥 Bite partner’s neck or shoulders gently",
  "🫀 Whisper something dirty to turn them on",
  "🍫 Feed partner sensually with tongue",
  "🤭 Lick or kiss partner’s nipples",
  "🖤 Play with partner’s genitals through clothes",
  "💖 Grab and squeeze partner’s chest",
  "🥵 Share a sexual fantasy you want to try",
  "💋 Kiss and nibble ears or neck",
  "🌙 Explore partner’s sides and back intimately",
  "🍑 Grind gently against partner for 30 sec",
  "👅 Lick partner’s neck or collarbone",
  "💦 Run fingers through partner’s hair and down back",
  "🔥 Tease partner’s inner thighs with lips",
  "🖐 Touch and caress partner’s butt cheeks",
  "💃 Perform a slow lap dance",
  "👙 Remove a piece of lingerie or underwear",
  "💖 Kiss partner’s stomach slowly",
  "🫦 Lick fingertips and touch partner",
  "🥵 Whisper naughty instructions for them to follow"
];

  reels: any[] = [];
  currentDare: string | null = null;
  spinning = false;

  ngOnInit(): void {
    // Initialize 3 reels with shuffled emojis
    const emojis = ['💋','🤫','🤝','💌','💃','💆','👀','🤗','💖','🥰'];
    this.reels = Array.from({ length: 3 }, () => ({
      symbols: [...emojis].sort(() => Math.random() - 0.5),
      transform: 'translateY(0px)'
    }));
  }

  spin() {
    if (this.spinning) return;
    this.spinning = true;
    this.currentDare = null;

    const duration = 2500; // ms
    const startTime = performance.now();

    // Random final index for each reel
    const reelsSpin = this.reels.map(reel => {
      const total = reel.symbols.length;
      const spins = 5 + Math.floor(Math.random() * 5);
      const finalIndex = Math.floor(Math.random() * total);
      return { reel, spins, finalIndex, total };
    });

    const animate = (time: number) => {
      const t = Math.min((time - startTime) / duration, 1);
      const ease = this.easeOutCubic(t);

      reelsSpin.forEach(r => {
        const symbolHeight = 120;
        const shift = (r.spins + r.finalIndex * ease) * symbolHeight;
        r.reel.transform = `translateY(-${shift}px)`;
      });

      if (t < 1) {
        requestAnimationFrame(animate);
      } else {
        reelsSpin.forEach(r => {
          const symbolHeight = 120;
          r.reel.transform = `translateY(-${r.finalIndex * symbolHeight}px)`;
        });

        // Pick a random dare to display above
        const dareIndex = Math.floor(Math.random() * this.dares.length);
        this.currentDare = this.dares[dareIndex];
        this.spinning = false;
      }
    };

    requestAnimationFrame(animate);
  }

  easeOutCubic(t: number) {
    return 1 - Math.pow(1 - t, 3);
  }
  
}