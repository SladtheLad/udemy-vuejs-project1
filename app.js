new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame() {
      this.gameIsRunning = true
      this.playerHealth = 100
      this.monsterHealth = 100
      this.turns = []
    },
    attack() {
      const damage = this.calculateDamage(3, 10)
      this.monsterHealth -= damage
      this.turns.unshift({
        isPlayer: true,
        text: `Player hits Monster for ${damage}`
      })
      if (this.checkWin()) {
        return
      }

      this.monsterAttacks()
    },
    specialAttack() {
      const crit = this.calculateDamage(10, 20)
      this.monsterHealth -= crit
      this.turns.unshift({
        isPlayer: true,
        text: `Player critical hits Monster for ${crit}`
      })
      if (this.checkWin()) {
        return
      }
      this.monsterAttacks()
    },
    heal() {
      const heal = this.calculateHeal(3, 10)
      if (this.playerHealth <= 90) {
        this.playerHealth += heal
      } else {
        this.playerHealth = 100
      }
      this.turns.unshift({
        isPlayer: true,
        text: `Player heals for ${heal}`
      })
      this.monsterAttacks()
    },
    giveUp() {
      this.gameIsRunning = false
    },
    monsterAttacks() {
      const damage = this.calculateDamage(5, 12)
      this.playerHealth -= damage
      this.turns.unshift({
        isPlayer: false,
        text: `Monster hits Player for ${damage}`
      })
      this.checkWin()
    },
    calculateDamage(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    calculateHeal(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You Won! New Game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return
      } else if (this.playerHealth <= 0) {
        if (confirm('You Lost! New Game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false
        }
        return true
      }
      return false
    }
  }
})