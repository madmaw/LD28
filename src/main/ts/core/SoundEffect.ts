module ct.core {

    export class SoundEffect {

        private playCount: number;
        private inUse: { [_: string]: boolean };

        constructor(private audioIds: string[]) {
            this.playCount = 0;
            this.inUse = {};
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
            if (this.audioIds.length > 0) {
                var index = Math.floor(Math.random() * this.audioIds.length);
                var audioId = this.audioIds[index];
                if (!this.inUse[audioId]) {
                    this.playCount++;
                    this.inUse[audioId] = true;
                    var audio = document.getElementById(audioId);
                    if (audio != null) {
                        //var copy = <HTMLAudioElement>audio.cloneNode(true);
                        var copy = <HTMLAudioElement>audio;
                        copy.addEventListener("ended", () => {
                            this.playCount--;
                            this.inUse[audioId] = false;
                        });
                        copy.play();
                    }
                }
            }
        }
    }

} 