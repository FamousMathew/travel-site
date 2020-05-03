import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'
import StickyHeader from './modules/StickyHeader'
import Modal from './modules/Modal'

new Modal();

if(module.hot){
    module.hot.accept();
}

let stickyHeader = new StickyHeader

new RevealOnScroll(".feature", 75);
new RevealOnScroll(".testimonial-item", 60);


let mobileMenu = new MobileMenu();

