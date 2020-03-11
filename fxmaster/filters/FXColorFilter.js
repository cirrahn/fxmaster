export class FXColorFilter extends PIXI.filters.AdjustmentFilter {
    constructor(options) {
        super();
        this.options = options;
        this.enabled = false;
        this.skipFading = false;
    }

    static get label() {
        return "Color";
    }

    play() {
        this.enabled = true;
        if (this.skipFading) {
            this.skipFading = false;
            this.blue = this.options.blue;
            this.red = this.options.red;
            this.green = this.options.green;
            return;
        }
        let anim = {
            ease: Linear.easeNone,
            repeat: 0,
            blue: this.options.blue,
            red: this.options.red,
            green: this.options.green
        }
        this.transition = gsap.to(this, 4, anim);
    }

    configure(opts) {}

    // So we can destroy object afterwards
    stop() {
        return new Promise((resolve, reject) => {
            if (this.skipFading) {
                this.enabled = false;
                resolve();
            }
            let anim = {
                ease: Linear.easeNone,
                repeat: 0,
                blue: 1,
                red: 1,
                green: 1,
                onComplete: () => {
                    this.enabled = false;
                    resolve();
                }
            }
            this.transition = gsap.to(this, 4, anim);
        });
    }
}
