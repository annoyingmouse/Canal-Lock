class WVCanalLock extends HTMLElement {

  constructor() {
    super()
    this.shadow = this.attachShadow({
      mode: 'open'
    })
    this.speed = 20
    this.boatX = 30
    this.boatY = 130
    this.moving = false
  }

  get svg() {
    return `
      <svg height="400"
           version="1.1"
           width="900"
           xmlns="http://www.w3.org/2000/svg"
           style="overflow: hidden; position: relative; left: -0.400002px;">
        <rect x="0" y="140" width="220" height="220" fill="#cccccc" stroke="none"></rect>
        <rect x="220" y="140" width="220" height="220" fill="#cccccc" stroke="none" id="water" data-level="high"></rect>
        <rect x="440" y="200" width="220" height="160" fill="#cccccc" stroke="none"></rect>
        <path fill="#32369b" stroke="none" d="M30,130L50,130L50,110L160,110L160,130L180,130L170,140L40,140" id="boat" data-position="left"></path>
        <g>
          <rect x="210" y="130" width="20" height="190" fill="#6faede" stroke="none" id="leftSluice" data-status="closed"></rect>
          <rect x="210" y="320" width="20" height="40" fill="#6faede" stroke="none"></rect>
        </g>              
        <g>    
          <rect x="430" y="130" width="20" height="190" fill="#329a9b" stroke="none" id="rightSluice" data-status="closed"></rect>
          <rect x="430" y="320" width="20" height="40" fill="#329a9b" stroke="none"></rect>
        </g>
        <rect x="220" y="135" width="0" height="225" fill="#6faede" stroke="none" id="leftGate" data-status="closed"></rect>
        <rect x="440" y="135" width="0" height="225" fill="#329a9b" stroke="none" id="rightGate" data-status="closed"></rect>
        <g onclick="this.getRootNode().host.closeLeftSluice()">
          <rect x="730" y="300" width="60" height="60" fill="#6faede" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M760,310L760,350" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M740,330L760,350L780,330" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="730" y="300" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="closeLeftSluice"></rect>
        </g>
        <g onclick="this.getRootNode().host.closeRightSluice()">
          <rect x="840" y="300" width="60" height="60" fill="#329a9b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M870,310L870,350" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M850,330L870,350L890,330" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="840" y="300" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="closeRightSluice"></rect>
        </g>
        <g onclick="this.getRootNode().host.openLeftSluice()">
          <rect x="730" y="230" width="60" height="60" fill="#6faede" stroke="none"></rect>
          <g>
          <path fill="none" stroke="#000000" d="M760,240L760,280" stroke-width="5px" stroke-linecap="round"></path>
          <path fill="none" stroke="#000000" d="M740,260L760,240L780,260" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="730" y="230" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="openLeftSluice"></rect>
        </g>
        <g onclick="this.getRootNode().host.openRightSluice()">
          <rect x="840" y="230" width="60" height="60" fill="#329a9b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M870,240L870,280" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M850,260L870,240L890,260" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="840" y="230" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="openRightSluice"></rect>
        </g>
        <g onclick="this.getRootNode().host.closeLeftGate()">
          <rect x="730" y="160" width="60" height="60" fill="#6faede" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M740,190L780,190" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M760,170L740,190L760,210" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="730" y="160" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="closeLeftGate"></rect>
        </g>
        <g onclick="this.getRootNode().host.closeRightGate()">
          <rect x="840" y="160" width="60" height="60" fill="#329a9b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M850,190L890,190" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M870,170L850,190L870,210" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="840" y="160" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="closeRightGate"></rect>
        </g>
        <g onclick="this.getRootNode().host.openLeftGate()">
          <rect x="730" y="90" width="60" height="60" fill="#6faede" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M740,120L780,120" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M760,100L780,120L760,140" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="730" y="90" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="openLeftGate"></rect>
        </g>
        <g onclick="this.getRootNode().host.openRightGate()">
          <rect x="840" y="90" width="60" height="60" fill="#329a9b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#000000" d="M850,120L890,120" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#000000" d="M870,100L890,120L870,140" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="840" y="90" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="openRightGate"></rect>
        </g>
        <g onclick="this.getRootNode().host.moveLeft()">
          <rect x="730" y="20" width="60" height="60" fill="#32369b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#ffffff" d="M740,50L780,50" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#ffffff" d="M760,30L740,50L760,70" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="730" y="20" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="moveLeft"></rect>
        </g>
        <g onclick="this.getRootNode().host.moveRight()">
          <rect x="840" y="20" width="60" height="60" fill="#32369b" stroke="none"></rect>
          <g>
            <path fill="none" stroke="#ffffff" d="M850,50L890,50" stroke-width="5px" stroke-linecap="round"></path>
            <path fill="none" stroke="#ffffff" d="M870,30L890,50L870,70" stroke-width="5px" stroke-linecap="round"></path>
          </g>
          <rect x="840" y="20" width="60" height="60" fill="#ffffff" stroke="none" fill-opacity="0.5" id="moveRight"></rect>
        </g>
      </svg>
    `
  }

  incrementX(from, to) {
    if(from < to){
      this.boatX = from + 1
      setTimeout(() => {
        this.incrementX(this.boatX, to)
        this.boat.setAttribute('d', `M ${this.boatX}, ${this.boatY} L ${this.boatX + 20}, ${this.boatY} L ${this.boatX + 20}, ${this.boatY - 20} L ${this.boatX + 130}, ${this.boatY - 20} L ${this.boatX + 130}, ${this.boatY} L ${this.boatX + 150}, ${this.boatY} L ${this.boatX + 140}, ${this.boatY + 10} L ${this.boatX + 10}, ${this.boatY + 10}`)
      }, this.speed)
    } else {
      this.moving = false
    }
  }

  decrementX(from, to) {
    if(from > to) {
      this.boatX = from - 1
      setTimeout(() => {
        this.decrementX(this.boatX, to)
        this.boat.setAttribute('d', `M ${this.boatX}, ${this.boatY} L ${this.boatX + 20}, ${this.boatY} L ${this.boatX + 20}, ${this.boatY - 20} L ${this.boatX + 130}, ${this.boatY - 20} L ${this.boatX + 130}, ${this.boatY} L ${this.boatX + 150}, ${this.boatY} L ${this.boatX + 140}, ${this.boatY + 10} L ${this.boatX + 10}, ${this.boatY + 10}`)
      }, this.speed)
    } else {
      this.moving = false
    }
  }

  moveRight() {
    if(!this.moving) {
      if (this.boatX === 30 && this.leftGate.width.baseVal.value === 60) {
        this.moving = true
        this.incrementX(this.boatX, 250)
        this.boat.dataset.position = 'middle'
      }
      if (this.boatX === 250 && this.rightGate.width.baseVal.value === 60) {
        this.moving = true
        this.incrementX(this.boatX, 470)
        this.boat.dataset.position = 'right'
      }
    }
  }

  moveLeft() {
    if(!this.moving) {
      if (this.boatX === 250 && this.leftGate.width.baseVal.value === 60) {
        this.moving = true
        this.decrementX(this.boatX, 30)
      }
      if (this.boatX === 470 && this.rightGate.width.baseVal.value === 60) {
        this.moving = true
        this.decrementX(this.boatX, 250)
      }
    }
  }

  increaseWidth(target, to) {
    if(target.width.baseVal.value < to) {
      target.width.baseVal.value = target.width.baseVal.value + 1
      setTimeout(() => {
        this.increaseWidth(target, to)
      }, this.speed)
    } else {
      this.moving = false
    }
  }

  decreaseWidth(target, to) {
    if(target.width.baseVal.value > to) {
      target.width.baseVal.value = target.width.baseVal.value - 1
      setTimeout(() => {
        this.decreaseWidth(target, to)
      }, this.speed)
    } else {
      this.moving = false
    }
  }

  increaseHeight(target, to) {
    if(target.height.baseVal.value < to) {
      target.height.baseVal.value = target.height.baseVal.value + 1
      setTimeout(() => {
        this.increaseHeight(target, to)
      }, this.speed)
    } else {
      this.moving = false
    }
  }

  decreaseHeight(target, to) {
    if(target.height.baseVal.value > to) {
      target.height.baseVal.value = target.height.baseVal.value - 1
      setTimeout(() => {
        this.decreaseHeight(target, to)
      }, this.speed)
    } else {
      this.moving = false
    }
  }

  openRightGate() {
    if(!this.moving) {
      this.moving = true
      this.increaseWidth(this.rightGate, 60)
    }
  }

  closeRightGate() {
    if(!this.moving) {
      this.moving = true
      this.decreaseWidth(this.rightGate, 0)
    }
  }

  openLeftGate() {
    if(!this.moving) {
      this.moving = true
      this.increaseWidth(this.leftGate, 60)
    }
  }

  closeLeftGate() {
    if(!this.moving) {
      this.moving = true
      this.decreaseWidth(this.leftGate, 0)
    }
  }

  openRightSluice() {
    if(!this.moving) {
      this.moving = true
      this.decreaseHeight(this.rightSluice, 160)
      if(this.water.height.baseVal.value === 220) {
        this.dropWater()
      }
    }
  }

  closeRightSluice() {
    if(!this.moving) {
      this.moving = true
      this.increaseHeight(this.rightSluice, 190)
    }
  }

  raiseWater() {
    if(this.water.height.baseVal.value < 220) {
      this.moving = true
      this.water.height.baseVal.value = this.water.height.baseVal.value + 1
      this.water.y.baseVal.value = this.water.y.baseVal.value - 1
      setTimeout(() => {
        this.raiseWater()
      }, this.speed)
    } else {
      this.moving = false
    }
  }

  dropWater() {
    if(this.water.height.baseVal.value > 160) {
      this.moving = true
      this.water.height.baseVal.value = this.water.height.baseVal.value - 1
      this.water.y.baseVal.value = this.water.y.baseVal.value + 1
      setTimeout(() => {
        this.dropWater()
      }, this.speed)
    } else {
      this.moving = false
    }
  }

  openLeftSluice() {
    if(!this.moving) {
      this.moving = true
      this.decreaseHeight(this.leftSluice, 160)
      if(this.water.height.baseVal.value === 160 && this.rightSluice.height.baseVal.value === 190) {
        this.raiseWater()
      }
    }
  }

  closeLeftSluice() {
    if(!this.moving) {
      this.moving = true
      this.increaseHeight(this.leftSluice, 190)
    }
  }


  connectedCallback() {
    this.render()
    this.boat = this.shadow.querySelector('#boat')
    this.leftGate = this.shadow.querySelector('#leftGate')
    this.rightGate = this.shadow.querySelector('#rightGate')
    this.leftSluice = this.shadow.querySelector('#leftSluice')
    this.rightSluice = this.shadow.querySelector('#rightSluice')
    this.water = this.shadow.querySelector('#water')
  }

  render() {
    this.shadow.innerHTML = `${this.svg}`
  }
}

window.customElements.define('wc-canal-lock', WVCanalLock)