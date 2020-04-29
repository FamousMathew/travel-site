import throttle from "lodash/throttle"
import debounce from "lodash/debounce"

class RevealOnScroll {

    constructor (els, thresholdPercent) {
        this.thresholdPercent = thresholdPercent
        this.ItemsToReveal = document.querySelectorAll(els)
        this.browserHeight = window.innerHeight
        this.hideInitially()
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this)
        this.events()
       
    }

    events(){

        window.addEventListener("scroll", this.scrollThrottle)
        window.addEventListener("resize", debounce(()=>{
            console.log("Window resized")
            this.browserHeight = window.innerHeight
        },333))
        console.log("events ran")
    }

    calcCaller(){
        
       
        
        this.ItemsToReveal.forEach((el) => {

            if (el.isRevealed == false){
                this.calculateIfScrolled(el)
            }

        })

        console.log("calcCaller ran")
    }

    calculateIfScrolled(el){
       
        if(window.scrollY + this.browserHeight > el.offsetTop){
            console.log("Elements was calculated")
            let scrollPercent = (el.getBoundingClientRect().y / this.browserHeight )*100
            
            if (scrollPercent < this.thresholdPercent){
    
               el.classList.add("reveal-item--is-visible")
               el.isRevealed = true
    
               if(el.isLastItem){
                   window.removeEventListener("scroll", this.scrollThrottle)
               }
            }
        }
    }

    hideInitially(){
        
        this.ItemsToReveal.forEach(el => {
            
            el.classList.add("reveal-item")
            el.isRevealed = false
        
        })

        this.ItemsToReveal[this.ItemsToReveal.length - 1 ].isLastItem = true
    }
}

export default RevealOnScroll