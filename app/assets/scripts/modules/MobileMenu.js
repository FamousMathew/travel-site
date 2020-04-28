class MobileMenu {
    constructor() {

        this.MenuIcon = document.querySelector(".mobile-nav")
        this.MenuContent = document.querySelector(".header__menu-content")
        this.MenuBackground = document.querySelector(".header--is-visible")
        this.events()

      

    }

    events(){
        this.MenuIcon.addEventListener("click", () => this.toggleTheMenu() )
    }

    toggleTheMenu(){
       this.MenuContent.classList.toggle("header__menu-content--is-visible")
       this.MenuIcon.classList.toggle("mobile-nav--close-x")
    }
}

export default MobileMenu