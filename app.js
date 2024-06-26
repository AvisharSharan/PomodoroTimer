new Vue({
  el: '#app',
  data() {
    return {
      pomodoroDuration: 1500,
      breakDuration: 300,
      newPomodoroDuration: 25,
      newBreakDuration: 5,
      modalVisible: false,
      timer: 1500,
      timerRunning: false,
      timerInterval: null,
      sessionCounter: 0,
      progressBarWidth: 100,
      mode: 'pomodoro',
      showDuration: true,
      showTheme: false,
      settingsSection: 'duration',
      backgroundPresets: [
        {url: 'static/images/japanese_cafe.jpeg', name: 'Japanese Cafe'},
        {url: 'static/images/purple_clouds_pixel.jpeg', name: 'Purple Clouds'}
      ],
      selectedBackground: 'static/images/japanese_cafe.jpeg',
    };
  },
  methods: {
    openModal() {
      this.modalVisible = true;
    },
    closeModal() {
      this.modalVisible = false;
    },
    applyChanges() {
      this.timer = this.newPomodoroDuration * 60;
      this.pomodoroDuration = this.newPomodoroDuration * 60;
      this.breakDuration = this.newBreakDuration * 60;
      this.applyBackgroundImage();
      this.resetTimer();
      this.closeModal();
    },
    toggleTimer() {
      if (this.timerRunning) {
        clearInterval(this.timerInterval);
      } else {
        this.timerInterval = setInterval(() => {
          if (this.timer > 0) {
            this.timer--;
            this.updateProgressBar();
          } else {
            clearInterval(this.timerInterval);
            this.resetTimer();
            const audio = new Audio('static/audio/timeup.wav');
            audio.play();
            this.sessionCounter++;
            console.log(sessionCounter); // debug line
          }
        }, 1000);
      }
      this.timerRunning = !this.timerRunning;
    },
    resetTimer() {
      clearInterval(this.timerInterval);
      this.timer = (this.mode==='pomodoro' ? this.pomodoroDuration : this.breakDuration);
      this.timerRunning = false;
      this.progressBarWidth = 100;
    },
    formatTime(time) {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    },
    updateProgressBar() {
      const progress = ((this.timer * 100) / (this.mode==='pomodoro' ? this.pomodoroDuration : this.breakDuration)).toFixed(2);
      this.progressBarWidth = progress;
    },
    togglePomodoro() {
      if (this.mode !== 'pomodoro') {
        this.mode = 'pomodoro';
        this.timer = this.pomodoroDuration;
      }
    },
    toggleBreak() {
      if (this.mode !== 'break') {
        this.mode = 'break';
        this.timer = this.breakDuration;
      }
    },
    mounted(){
      this.timer = this.pomodoroDuration;
    },
    showDurationSettings() {
      this.settingsSection = 'duration';
      this.showDuration = true;
      this.showTheme = false;
    },
    showThemeSettings() {
      this.settingsSection = 'theme';
      this.showDuration = false;
      this.showTheme = true;
    },
    applyBackgroundImage() {
      document.body.style.backgroundImage = `url('${this.selectedBackground}')`
    },
  }
});
