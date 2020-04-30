import throttle from "lodash/throttle"

class StickyHeader {

    constructor(){
        this.siteHeader = document.querySelector(".header")
        this.pageSection = document.querySelectorAll(".page-section")
        this.previousScroll = window.scrollY
        this.events()
    }

    events(){
        document.addEventListener("scroll", throttle(() => this.runOnScroll(), 200 ))
    }

    runOnScroll(){
        this.determineScrollDirection()
        if(scrollY > 60){

            this.siteHeader.classList.add("header--dark")

        }

        else{

            this.siteHeader.classList.remove("header--dark")

        }

        this.pageSection.forEach(el => this.calcPagesection(el))
    }

    determineScrollDirection(){

        if(window.scrollY > this.previousScroll){
            this.scrollDirection = 'down'
        }
        else
        {
            this.scrollDirection = 'up'
        }

        this.previousScroll = window.scrollY
    }

    calcPagesection(el){

        if(window.scrollY + window.innerHeight > el.offsetTop && window.scrollY < el.offsetTop + el.offsetHeight)
        {
            let scrollPercent = el.getBoundingClientRect().y / window.innerHeight *100
            if(scrollPercent < 18 && scrollPercent > -0.1 && this.scrollDirection == 'down' || scrollPercent <33 && this.scrollDirection == 'up' ){

                let matchingLink = el.getAttribute("data-matching-link")
                document.querySelectorAll(`.primary__nav a:not( ${matchingLink})`).forEach(el => el.classList.remove("primary__nav--is-current-link"))
                document.querySelector(matchingLink).classList.add("primary__nav--is-current-link")
            }
        }
    }

}

export default StickyHeader