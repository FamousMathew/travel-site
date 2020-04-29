import '../styles/styles.css'
import MobileMenu from './modules/MobileMenu'
import RevealOnScroll from './modules/RevealOnScroll'

if(module.hot){
    module.hot.accept();
}

new RevealOnScroll(".feature", 75);
new RevealOnScroll(".testimonial-item", 60);

let mobileMenu = new MobileMenu();

