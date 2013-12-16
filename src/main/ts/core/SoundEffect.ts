module ct.core {

    export class SoundEffect {

        private playCount: number;

        constructor(private audioIds: string[]) {
            this.playCount = 0;
        }


        public play(): void {
            // copying this tends to help playback!
            if (this.playCount > 0) {
                window.setTimeout(() => {
                    this.forcePlay();
                }, 100 * this.playCount * Math.random());
            } else {
                this.forcePlay();
            }
        }

        public forcePlay(): void {
            this.playCount++;
            if (this.audioIds.length > 0) {
                var index = Math.floor(Math.random() * this.audioIds.length);
                var audioId = this.audioIds[index];
                var audio = document.getElementById(audioId);
                if (audio != null) {
                    var copy = <HTMLAudioElement>audio.cloneNode(true);
                    copy.addEventListener("ended", () => {
                        this.playCount--;
                    });
                    copy.play();
                }
            }
        }
    }

} 