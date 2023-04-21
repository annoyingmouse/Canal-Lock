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

  moveLeft() {
    if(
      !this.moving
      &&
      (
        this.boat.dataset.position === 'middle'
        ||
        this.boat.dataset.position === 'right'
      )
      &&
      (
        (
          this.boat.dataset.position === 'middle'
          &&
          this.leftGate.dataset.status === 'open'
        )
        ||
        (
          this.boat.dataset.position === 'right'
          &&
          this.rightGate.dataset.status === 'open'
        )
      )
    ) {
      this.moving = true
      const target = this.boat.dataset.position === 'middle' ? 30 : 250
      let counter = 0
      while(this.boatX >= target) {
        ((i, c) => {
          setTimeout(() => {
            this.boat.setAttribute('d', `M ${i}, ${this.boatY} L ${i + 20}, ${this.boatY} L ${i + 20}, ${this.boatY - 20} L ${i + 130}, ${this.boatY - 20} L ${i + 130}, ${this.boatY} L ${i + 150}, ${this.boatY} L ${i + 140}, ${this.boatY + 10} L ${i + 10}, ${this.boatY + 10}`)
            if(i === target) {
              this.moving = false
              this.boat.dataset.position = 'middle'
            }
          }, this.speed * c)
        })(this.boatX--, counter++)
      }
    }
  }
  moveRight() {
    if(
      !this.moving
      &&
      (
        this.boat.dataset.position === 'left'
        ||
        this.boat.dataset.position === 'middle'
      )
      &&
      (
        (
          this.boat.dataset.position === 'left'
          &&
          this.leftGate.dataset.status === 'open'
        )
        ||
        (
          this.boat.dataset.position === 'middle'
          &&
          this.rightGate.dataset.status === 'open'
        )
      )
    ) {
      this.moving = true
      const target = this.boat.dataset.position === 'left' ? 250 : 470
      let counter = 0
      while(this.boatX <= target) {
        ((i, c) => {
          setTimeout(() => {
            this.boat.setAttribute('d', `M ${i}, ${this.boatY} L ${i + 20}, ${this.boatY} L ${i + 20}, ${this.boatY - 20} L ${i + 130}, ${this.boatY - 20} L ${i + 130}, ${this.boatY} L ${i + 150}, ${this.boatY} L ${i + 140}, ${this.boatY + 10} L ${i + 10}, ${this.boatY + 10}`)
            if(i === target) {
              this.moving = false
              this.boatX = i
              this.boat.dataset.position = target === 250 ? 'middle' : 'right'
            }
          }, this.speed * c)
        })(this.boatX++, counter++)
      }
    }
  }

  openLeftGate() {
    if(
      !this.moving
      &&
      this.water.dataset.level === 'high'
      &&
      this.leftGate.dataset.status === 'closed'
      &&
      this.rightGate.dataset.status === 'closed'
      &&
      this.leftSluice.dataset.status === 'closed'
      &&
      this.rightSluice.dataset.status === 'closed'
    ) {
      this.moving = true
      const target = 60
      let gateWidth = this.leftGate.width.baseVal.value
      let counter = 0
      while(gateWidth <= target) {
        ((i, c) => {
          setTimeout(() => {
            this.leftGate.width.baseVal.value = i
            if(i === target) {
              this.moving = false
              this.leftGate.dataset.status = 'open'
            }
          }, this.speed * c)
        })(gateWidth++, counter++)
      }
    }
  }
  closeLeftGate() {
    if(
      !this.moving
      &&
      this.water.dataset.level === 'high'
      &&
      this.leftGate.dataset.status === 'open'
      &&
      this.rightGate.dataset.status === 'closed'
      &&
      this.leftSluice.dataset.status === 'closed'
      &&
      this.rightSluice.dataset.status === 'closed'
    ) {
      this.moving = true
      const target = 0
      let gateWidth = this.leftGate.width.baseVal.value
      let counter = 0
      while(gateWidth >= target) {
        ((i, c) => {
          setTimeout(() => {
            this.leftGate.width.baseVal.value = i
            if(i === target) {
              this.moving = false
              this.leftGate.dataset.status = 'closed'
            }
          }, this.speed * c)
        })(gateWidth--, counter++)
      }
    }
  }

  openRightGate() {
    if(
      !this.moving
      &&
      this.water.dataset.level === 'low'
      &&
      this.leftGate.dataset.status === 'closed'
      &&
      this.rightGate.dataset.status === 'closed'
      &&
      this.leftSluice.dataset.status === 'closed'
      &&
      this.rightSluice.dataset.status === 'closed'
    ) {
      this.moving = true
      const target = 60
      let gateWidth = this.rightGate.width.baseVal.value
      let counter = 0
      while(gateWidth <= target) {
        ((i, c) => {
          setTimeout(() => {
            this.rightGate.width.baseVal.value = i
            if(i === target) {
              this.moving = false
              this.rightGate.dataset.status = 'open'
            }
          }, this.speed * c)
        })(gateWidth++, counter++)
      }
    }
  }
  closeRightGate() {
    if(
      !this.moving
      &&
      this.water.dataset.level === 'low'
      &&
      this.rightGate.dataset.status === 'open'
      &&
      this.leftGate.dataset.status === 'closed'
      &&
      this.leftSluice.dataset.status === 'closed'
      &&
      this.rightSluice.dataset.status === 'closed'
    ) {
      this.moving = true
      const target = 0
      let gateWidth = this.rightGate.width.baseVal.value
      let counter = 0
      while(gateWidth >= target) {
        ((i, c) => {
          setTimeout(() => {
            this.rightGate.width.baseVal.value = i
            if(i === target) {
              this.moving = false
              this.rightGate.dataset.status = 'closed'
            }
          }, this.speed * c)
        })(gateWidth--, counter++)
      }
    }
  }

  openLeftSluice() {
    if(
      !this.moving
      &&
      this.leftGate.dataset.status === 'closed'
      &&
      this.rightGate.dataset.status === 'closed'
      &&
      this.leftSluice.dataset.status === 'closed'
      &&
      this.rightSluice.dataset.status === 'closed'
    ) {
      const sluiceTarget = 160
      const waterYTarget = 140
      const waterHeightTarget = 220
      const boatYTarget = 130
      this.moving = true
      let sluiceHeight = this.leftSluice.height.baseVal.value
      let waterY = this.water.y.baseVal.value
      let waterHeight = this.water.height.baseVal.value
      let boatY = this.boatY
      let counter = 0
      while(
        sluiceHeight >= sluiceTarget
        ||
        waterY >= waterYTarget
        ||
        waterHeight <= waterHeightTarget
        ||
        boatY >= boatYTarget
      ) {
        ((
          sluiceHeight,
          waterY,
          waterHeight,
          boatY,
          counter
        ) => {
          setTimeout(() => {
            if(this.leftSluice.dataset.status !== 'open') {
              this.leftSluice.height.baseVal.value = sluiceHeight
            }
            if(this.boat.dataset.position === 'middle' && boatY !== boatYTarget) {
              this.boat.setAttribute('d', `M ${this.boatX}, ${boatY} L ${this.boatX + 20}, ${boatY} L ${this.boatX + 20}, ${boatY - 20} L ${this.boatX + 130}, ${boatY - 20} L ${this.boatX + 130}, ${boatY} L ${this.boatX + 150}, ${boatY} L ${this.boatX + 140}, ${boatY + 10} L ${this.boatX + 10}, ${boatY + 10}`)
            } else {
              if(this.boat.dataset.position === 'middle') {
                this.boatY = boatY
              }
            }
            if(this.water.dataset.level !== 'high') {
              this.water.y.baseVal.value = waterY
            }
            if(this.water.dataset.level !== 'high') {
              this.water.height.baseVal.value = waterHeight
            }
            if(
              this.leftSluice.height.baseVal.value === sluiceTarget
              &&
              this.water.y.baseVal.value === waterYTarget
              &&
              this.water.height.baseVal.value === waterHeightTarget
            ) {
              this.moving = false
            }
            if(sluiceHeight === sluiceTarget) {
              this.leftSluice.dataset.status = 'open'
            }
            if(waterY === waterYTarget && waterHeight === waterHeightTarget){
              this.water.dataset.level = 'high'
            }
          }, this.speed * counter)
        })(
          sluiceHeight--,
          waterY--,
          waterHeight++,
          boatY--,
          counter++
        )
      }
    }
  }
  closeLeftSluice() {
    if(
      !this.moving
      &&
      this.leftSluice.dataset.status === 'open'
    ) {
      this.moving = true
      const target = 190
      let sluiceHeight = this.leftSluice.height.baseVal.value
      let counter = 0
      while(sluiceHeight <= target) {
        ((i, c) => {
          setTimeout(() => {
            this.leftSluice.height.baseVal.value = i
            if(i === target) {
              this.moving = false
              this.leftSluice.dataset.status = 'closed'
            }
          }, this.speed * c)
        })(sluiceHeight++, counter++)
      }
    }
  }

  openRightSluice() {
    if(
      !this.moving
      &&
      this.leftGate.dataset.status === 'closed'
      &&
      this.rightGate.dataset.status === 'closed'
      &&
      this.leftSluice.dataset.status === 'closed'
      &&
      this.rightSluice.dataset.status === 'closed'
    ) {
      const sluiceTarget = 160
      const waterYTarget = 200
      const waterHeightTarget = 160
      const boatYTarget = 190
      this.moving = true
      let sluiceHeight = this.rightSluice.height.baseVal.value
      let waterY = this.water.y.baseVal.value
      let waterHeight = this.water.height.baseVal.value
      let boatY = this.boatY
      let counter = 0
      while(
        sluiceHeight >= sluiceTarget
        ||
        waterY <= waterYTarget
        ||
        waterHeight >= waterHeightTarget
        ||
        boatY <= boatYTarget
      ) {
        ((
          sluiceHeight,
          waterY,
          waterHeight,
          boatY,
          counter
        ) => {
          setTimeout(() => {
            if(this.rightSluice.dataset.status !== 'open') {
              this.rightSluice.height.baseVal.value = sluiceHeight
            }
            if(this.boat.dataset.position === 'middle' && boatY !== boatYTarget) {
              this.boat.setAttribute('d', `M ${this.boatX}, ${boatY} L ${this.boatX + 20}, ${boatY} L ${this.boatX + 20}, ${boatY - 20} L ${this.boatX + 130}, ${boatY - 20} L ${this.boatX + 130}, ${boatY} L ${this.boatX + 150}, ${boatY} L ${this.boatX + 140}, ${boatY + 10} L ${this.boatX + 10}, ${boatY + 10}`)
            } else {
              if(this.boat.dataset.position === 'middle') {
                this.boatY = boatY
              }
            }
            if(this.water.dataset.level !== 'low') {
              this.water.y.baseVal.value = waterY
            }
            if(this.water.dataset.level !== 'low') {
              this.water.height.baseVal.value = waterHeight
            }
            if(
              this.rightSluice.height.baseVal.value === sluiceTarget
              &&
              this.water.y.baseVal.value === waterYTarget
              &&
              this.water.height.baseVal.value === waterHeightTarget
            ) {
              this.moving = false
            }
            if(sluiceHeight === sluiceTarget) {
              this.rightSluice.dataset.status = 'open'
            }
            if(waterY === waterYTarget && waterHeight === waterHeightTarget && boatY === boatYTarget){
              this.water.dataset.level = 'low'
            }
          }, this.speed * counter)
        })(
          sluiceHeight--,
          waterY++,
          waterHeight--,
          boatY++,
          counter++
        )
      }
    }
  }
  closeRightSluice() {
    if(
      !this.moving
      &&
      this.rightSluice.dataset.status === 'open'
    ) {
      this.moving = true
      const target = 190
      let sluiceHeight = this.rightSluice.height.baseVal.value
      let counter = 0
      while(sluiceHeight <= target) {
        ((i, c) => {
          setTimeout(() => {
            this.rightSluice.height.baseVal.value = i
            if(i === target) {
              this.moving = false
              this.rightSluice.dataset.status = 'closed'
            }
          }, this.speed * c)
        })(sluiceHeight++, counter++)
      }
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