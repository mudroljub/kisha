import Splash from './Splash.js'
import {ctx} from './canvas.js'

const MIN_VISINA_KAPI = 3
const MAX_VISINA_KAPI = 10
const PROSECNA_VISINA = (MIN_VISINA_KAPI + MAX_VISINA_KAPI) / 2
const PROSECNA_BRZINA = 5.8

let windX = 0
let lastMouseX = 0  // inicirati mish.prosloX da ne bude 0

document.addEventListener('mousemove', handleWind)

export default class Raindrop {

  constructor() {
    this.visina = Math.random() * (MAX_VISINA_KAPI - MIN_VISINA_KAPI) + MIN_VISINA_KAPI
    const odstupanjeVisine = this.visina - PROSECNA_VISINA
    this.speed = PROSECNA_BRZINA + odstupanjeVisine / 5
    this.reset()
  }

  reset() {
    const sirinaEkrana = window.innerWidth || window.outerWidth // innerWidth vraca 0 prvi put
    this.x = Math.floor(Math.random() * (sirinaEkrana * 2) - sirinaEkrana / 2)
    this.y = -10
  }

  update() {
    this.y += this.speed
    this.x += windX
    if (this.y > window.innerHeight) {
      this.prskanje = new Splash(this.x, this.y)
      this.reset()
    }
    if (this.prskanje) this.prskanje.update()
  }

  render() {
    ctx.fillRect(this.x, this.y, 1, this.visina)
    if (this.prskanje) this.prskanje.render()
  }
}

function handleWind(e) {
  windX = (e.clientX - lastMouseX) / 10
  lastMouseX = e.clientX
}