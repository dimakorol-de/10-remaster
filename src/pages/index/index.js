import vibrator from '@system.vibrator'

export default {
  private: {
    gameMatrix:,
    emptyIndex: 15,
    isDark: true,
    tileStyle: 0,
    isAnim: true,
    isVib: true,
    bgColor: '#000000',
    textColor: '#FFFFFF',
    btnBgColor: '#222222',
    tileColor: '#1C1C1E',
    animClass: 'anim'
  },
  onCreate() {
    this.shuffle();
    this.updateStyles();
  },
  shuffle() {
    let arr =;
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      let temp = arr[i]; arr[i] = arr[j]; arr[j] = temp;
    }
    this.gameMatrix = arr;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === 0) { this.emptyIndex = i; break; }
    }
  },
  moveTile(index) {
    const r1 = Math.floor(index / 4), c1 = index % 4;
    const r2 = Math.floor(this.emptyIndex / 4), c2 = this.emptyIndex % 4;
    if ((Math.abs(r1 - r2) + Math.abs(c1 - c2)) === 1) {
      let newBoard = [];
      for (let i = 0; i < this.gameMatrix.length; i++) { newBoard.push(this.gameMatrix[i]); }
      newBoard[this.emptyIndex] = newBoard[index]; newBoard[index] = 0;
      this.gameMatrix = newBoard; this.emptyIndex = index;
      this.triggerVibe();
    }
  },
  triggerVibe() {
    if (this.isVib) { try { vibrator.vibrate({ mode: 'short' }); } catch(e){} }
  },
  updateStyles() {
    if (this.isDark) {
      this.bgColor = '#000000'; this.textColor = '#FFFFFF'; this.btnBgColor = '#222222';
      this.tileColor = this.tileStyle === 0 ? '#1C1C1E' : '#007AFF';
    } else {
      this.bgColor = '#FFFFFF'; this.textColor = '#000000'; this.btnBgColor = '#E5E5EA';
      this.tileColor = this.tileStyle === 0 ? '#D1D1D6' : '#34C759';
    }
    this.animClass = this.isAnim ? 'anim' : '';
  },
  toggleTheme() { this.isDark = !this.isDark; this.triggerVibe(); this.updateStyles(); },
  toggleColor() { this.tileStyle = this.tileStyle === 0 ? 1 : 0; this.triggerVibe(); this.updateStyles(); },
  toggleAnim() { this.isAnim = !this.isAnim; this.triggerVibe(); this.updateStyles(); },
  toggleVib() { this.isVib = !this.isVib; this.triggerVibe(); this.updateStyles(); }
}
