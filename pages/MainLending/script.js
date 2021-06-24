const addTagsClickHandler = () => {
    document.querySelector('.navigation').addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('navigation__link')) {
            if (!e.target.classList.contains('defaultTag')) {


                let clickedTag = e.target;
                removeDefaultTags();
                removeSelectedTags();
                selectClickedTag(clickedTag);
            }

        } else {
            removeSelectedTags()
            selectDefaultTag();
        }
    })
}


const removeSelectedTags = () => {
    let tags = document.querySelectorAll('.navigation__link ');
    tags.forEach(tag => {
        tag.classList.remove('navigation_active');
    })
}

const selectClickedTag = (clickedTag) => {
    clickedTag.classList.add('navigation_active');
}

const selectDefaultTag = () => {
    const defaultTag = document.querySelector('.defaultTag');
    defaultTag.classList.add('default');
}

const removeDefaultTags = () => {
    let tags = document.querySelectorAll('.navigation__link ');
    tags.forEach(tag => {
        tag.classList.remove('default')

    })
}

addTagsClickHandler();
const selectButtonAll = document.querySelectorAll('button');
const ButtonVisitPage = () => {
    selectButtonAll.forEach(tag => {
        tag.addEventListener('click', (e) => {
            if (e.target.classList.contains('promo__buttons')) {
                window.location = '../zoos/panda/panda.html';
            }
            if (e.target.classList.contains('button__chooseYourFavourite')) {
                window.location = '../pageMap/map.html';
            }

        })
    })
}

ButtonVisitPage();



const gap = 40;
const carouselReviewsSecond = document.getElementById("carouselSecond");
const carousel = document.getElementById("carousel"),
    content = document.getElementById("content"),
    contentSecond = document.getElementById("contentSecond"),
    next = document.getElementById("next"),
    prev = document.getElementById("prev");
const item = document.querySelector('.item');

next.addEventListener("click", e => {
    carousel.scrollBy(width + gap, 0);
    if (carousel.scrollWidth !== 0) {
        prev.style.opacity = "100%";
    }
    if (content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.opacity = "100%";
    }
    carouselReviewsSecond.scrollBy(widthSecond + gap, 0);
    if (carouselReviewsSecond.scrollWidth !== 0) {
        prev.style.opacity = "100%";
    }
    if (contentSecond.scrollWidth - widthSecond - gap <= carouselReviewsSecond.scrollLeft + widthSecond) {
        next.style.opacity = "100%";
    }
});
prev.addEventListener("click", e => {
    carousel.scrollBy(-(width + gap), 0);
    if (carousel.scrollLeft - width - gap <= 0) {
        prev.style.opacity = "50%";
    }
    if (!content.scrollWidth - width - gap <= carousel.scrollLeft + width) {
        next.style.opacity = "100%";
    }
    carouselReviewsSecond.scrollBy(-(widthSecond + gap), 0);
    if (carouselReviewsSecond.scrollLeft - width - gap <= 0) {
        prev.style.opacity = "50%";
    }
    if (!contentSecond.scrollWidth - widthSecond - gap <= carouselReviewsSecond.scrollLeft + widthSecond) {
        next.style.opacity = "100%";
    }
});

let width = item.offsetWidth;
let widthSecond = item.offsetWidth;
window.addEventListener("resize", e => (width = carousel.offsetWidth));
window.addEventListener("resize", e => (width = carouselReviewsSecond.offsetWidth));




//Ant-Carusel

function Ant(crslId) {

    let id = document.getElementById(crslId);
    if(id) {
        this.crslRoot = id
    }
    else {
        this.crslRoot = document.querySelector('.ant-carousel')
    };

    // Carousel objects
    this.crslList = this.crslRoot.querySelector('.ant-carousel-list');
    this.crslElements = this.crslList.querySelectorAll('.ant-carousel-element');
    this.crslElemFirst = this.crslList.querySelector('.ant-carousel-element');
    this.leftArrow = this.crslRoot.querySelector('.ant-carousel-arrow-left');
    this.left = this.crslRoot.querySelector('.ant-carousel-arrowLeft');
    this.rightArrow = this.crslRoot.querySelector('.ant-carousel-arrow-right');
    this.indicatorDots = this.crslRoot.querySelector('div.ant-carousel-dots');
    this.btnOnly = this.crslRoot.querySelectorAll('.btnOnly')
    this.cards = this.crslRoot.querySelectorAll('.cards__content');

    // Initialization
    this.options = Ant.defaults;
    Ant.initialize(this)
};

Ant.defaults = {

    // Default options for the carousel
    elemVisible: 2, // Кол-во отображаемых элементов в карусели
    loop: true,     // Бесконечное зацикливание карусели
    auto: true,     // Автоматическая прокрутка
    interval: 15000, // Интервал между прокруткой элементов (мс)
    speed: 500,     // Скорость анимации (мс)
    touch: true,    // Прокрутка  прикосновением
    arrows: true,   // Прокрутка стрелками
    dots: true      // Индикаторные точки
};

Ant.prototype.elemPrev = function(num) {
    num = num || 1;


    this.currentElement -= num;
    if(this.currentElement < 0) this.currentElement = this.dotsVisible-1;


    if(!this.options.loop) {  // сдвиг вправо без цикла
        this.currentOffset += this.elemWidth*num;
        this.crslList.style.marginLeft = this.currentOffset + 'px';
        if(this.currentElement == 0) {
            this.leftArrow.style.display = 'none'; this.touchPrev = false
            this.left.style.display = 'none'; this.touchPrev = false
        }
        this.rightArrow.style.display = 'block'; this.touchNext = true
    }
    else {                    // сдвиг вправо с циклом
        let elm, buf, this$ = this;
        for(let i=0; i<num; i++) {
            elm = this.crslList.lastElementChild;
            buf = elm.cloneNode(true);
            this.crslList.insertBefore(buf, this.crslList.firstElementChild);
            this.crslList.removeChild(elm)
        };
        this.crslList.style.marginLeft = '-' + this.elemWidth*num + 'px';
        let compStyle = window.getComputedStyle(this.crslList).marginLeft;
        this.crslList.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
        this.crslList.style.marginLeft = '0px';
        setTimeout(function() {
            this$.crslList.style.cssText = 'transition:none;'
        }, this.options.speed)
    }
};

Ant.prototype.elemNext = function(num) {
    num = num || 1;


    this.currentElement += num;
    if(this.currentElement >= this.dotsVisible) this.currentElement = 0;


    if(!this.options.loop) {  // сдвиг влево без цикла
        this.currentOffset -= this.elemWidth*num;
        this.crslList.style.marginLeft = this.currentOffset + 'px';
        this.leftArrow.style.display = 'block'; this.touchPrev = true
        this.left.style.display = 'block'; this.touchPrev = true
    }
    else {                    // сдвиг влево с циклом
        let elm, buf, this$ = this;
        this.crslList.style.cssText = 'transition:margin '+this.options.speed+'ms ease;';
        this.crslList.style.marginLeft = '-' + this.elemWidth*num + 'px';
        setTimeout(function() {
            this$.crslList.style.cssText = 'transition:none;';
            for(let i=0; i<num; i++) {
                elm = this$.crslList.firstElementChild;
                buf = elm.cloneNode(true); this$.crslList.appendChild(buf);
                this$.crslList.removeChild(elm)
            };
            this$.crslList.style.marginLeft = '0px'
        }, this.options.speed)
    }
};



Ant.initialize = function(that) {

    // Constants
    that.elemCount = that.crslElements.length; // Количество элементов
    that.dotsVisible = that.elemCount;         // Число видимых точек
    let elemStyle = window.getComputedStyle(that.crslElemFirst);
    that.elemWidth = that.crslElemFirst.offsetWidth +  // Ширина элемента (без margin)
        parseInt(elemStyle.marginLeft) + parseInt(elemStyle.marginRight);

    // Variables
    that.currentElement = 0; that.currentOffset = 0;
    that.crslElements = 0;
    that.touchPrev = true; that.touchNext = true;
    let xTouch, yTouch, xDiff, yDiff, stTime, mvTime;
    let bgTime = getTime();

    // Functions
    function getTime() {
        return new Date().getTime();
    };
    function setAutoScroll() {
        that.autoScroll = setInterval(function() {
            let fnTime = getTime();
            if(fnTime - bgTime + 10 > that.options.interval) {
                bgTime = fnTime; that.elemNext()
            }
        }, that.options.interval)
    };

    // Start initialization
    if(that.elemCount <= that.options.elemVisible) {   // Отключить навигацию
        that.options.auto = false; that.options.touch = false;
        that.options.arrows = false; that.options.dots = false;
        that.leftArrow.style.display = 'none'; that.rightArrow.style.display = 'none'
        that.left.style.display = 'none'; that.rightArrow.style.display = 'none'
    };

    if(!that.options.loop) {       // если нет цикла - уточнить количество точек
        that.dotsVisible = that.elemCount - that.options.elemVisible + 1;
        that.leftArrow.style.display = 'none';  // отключить левую стрелку
        that.left.style.display = 'none';  // отключить левую стрелку
        that.touchPrev = false;    // отключить прокрутку прикосновением вправо
        that.options.auto = false; // отключить автопркрутку
    }
    else if(that.options.auto) {   // инициализация автопрокруки
        setAutoScroll();
        // Остановка прокрутки при наведении мыши на элемент
        that.crslElement = document.querySelectorAll('.cards__content');
        that.crslElement.forEach((elem) => {
        elem.addEventListener('click', function() {
                clearTimeout(that.autoScroll)
                setInterval(function () { setAutoScroll()}, 45000) ;
            }, false);
        })

        // that.crslList.addEventListener('mouseleave', setAutoScroll, false)
    }



    if(that.options.touch) {   // инициализация прокрутки прикосновением
        that.crslList.addEventListener('touchstart', function(e) {
            xTouch = parseInt(e.touches[0].clientX);
            yTouch = parseInt(e.touches[0].clientY);
            stTime = getTime()
        }, false);
        that.crslList.addEventListener('touchmove', function(e) {
            if(!xTouch || !yTouch) return;
            xDiff = xTouch - parseInt(e.touches[0].clientX);
            yDiff = yTouch - parseInt(e.touches[0].clientY);
            mvTime = getTime();
            if(Math.abs(xDiff) > 15 && Math.abs(xDiff) > Math.abs(yDiff) && mvTime - stTime < 75) {
                stTime = 0;
                if(that.touchNext && xDiff > 0) {
                    bgTime = mvTime; that.elemNext()
                }
                else if(that.touchPrev && xDiff < 0) {
                    bgTime = mvTime; that.elemPrev()
                }
            }
        }, false)
    };

    if(that.options.arrows) {  // инициализация стрелок
        if(!that.options.loop) that.crslList.style.cssText =
            'transition:margin '+that.options.speed+'ms ease;';
        that.leftArrow.addEventListener('click', function() {
            let fnTime = getTime();
            if(fnTime - bgTime > that.options.speed) {
                bgTime = fnTime; that.elemPrev()
                clearTimeout(that.autoScroll)
                setInterval(function () { setAutoScroll()}, 45000) ;
            }
        }, false);
        that.rightArrow.addEventListener('click', function() {
            let fnTime = getTime();
            if(fnTime - bgTime > that.options.speed) {
                bgTime = fnTime; that.elemNext()
                clearTimeout(that.autoScroll)
                setInterval(function () { setAutoScroll()}, 45000) ;
            }
        }, false)

    }
    else {
        that.leftArrow.style.display = 'none';
        that.rightArrow.style.display = 'none'
    };




};

new Ant();




 class Modal {
    constructor(classes) {
        this.classes = classes;
        this.modal = '';
        this.modalContent = '';
        this.modalCloseBtn = '';
        this.overlay = '';
    }

    buildModal(content) {
        //Overlay
        this.overlay = this.createDomNode(this.overlay, 'div', 'overlay', 'overlay_model' );

        //Modal
        this.modal = this.createDomNode(this.modal, 'div', 'modal', this.classes);

        //Modal content
        this.modalContent = this.createDomNode(this.modalContent, 'div', 'modal__content');

        //Close Button
        this.modalCloseBtn = this.createDomNode(this.modalCloseBtn, 'button', 'modal__close-icon');
        this.modalCloseBtn.innerHTML = '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">\n' +
            '<path fill-rule="evenodd" clip-rule="evenodd" d="M29.5599 2.56066C30.1457 1.97487 30.1457 1.02512 29.5599 0.439337C28.9741 -0.146448 28.0243 -0.146445 27.4386 0.439343L14.9997 12.8783L2.56112 0.439648C1.97534 -0.14614 1.02559 -0.146143 0.4398 0.439642C-0.145987 1.02543 -0.14599 1.97517 0.439795 2.56096L12.8784 14.9996L0.439337 27.4387C-0.146448 28.0245 -0.146445 28.9743 0.439343 29.56C1.02513 30.1458 1.97488 30.1458 2.56066 29.56L14.9997 17.1209L27.439 29.5603C28.0248 30.1461 28.9745 30.1461 29.5603 29.5604C30.1461 28.9746 30.1461 28.0248 29.5603 27.439L17.121 14.9996L29.5599 2.56066Z" fill="white"/>\n' +
            '</svg>';

        this.setContent(content);

        this.appendModalElements();

        //Bind Events
        this.bindEvents();

        //Open Modal
        this.openModal();



    }

    createDomNode(node, element, ...classes) {
        node = document.createElement(element);
        node.classList.add(...classes);
        return node
    };

    setContent(content) {
        if(typeof  content ==='string') {
            this.modalContent.innerHTML = content;
        } else {
            this.modalContent.innerHTML = '';
            this.modalContent.appendChild(content);
        }
    }

    appendModalElements() {
        this.modal.append(this.modalCloseBtn);
        this.modal.append(this.modalContent);
        this.overlay.append(this.modal);
    }

    bindEvents() {
        this.modalCloseBtn.addEventListener('click', this.closeModal);
        this.overlay.addEventListener('click', this.closeModal);
    }

    openModal() {
        document.body.append(this.overlay);
    }

    closeModal(e) {
        let classes = e.target.classList;
        if(classes.contains('overlay') || classes.contains('modal__close-icon')) {
            document.querySelectorAll('.overlay').forEach(el => {
                el.remove();
            })
        }
    }

}


 class PopUpFirst extends Modal {
    constructor (classes, ) {
        super(classes);
        this.urlToImage = '../../assets/images/popUpFirst.png';
        this.title = 'together we care, save and protect!';
        this.subtitle = 'Your most generous gift not only cares for countless animals, but it also offers hope and a vital lifeline to the world’s most endangered wildlife relying on us to survive.';
        this.content = ['$20', '$30', '$50', '$80', '$100', 'other amount'];
        this.overlay = ''
        this.id = ['0', '1', '2', '3', '4', '5'];
    }

    //PopUp generator
    generateContent() {
        let template = '';
        let popUp = document.createElement('div');
        popUp.className = 'donateNow';

        template += `<div class="popUp__content">`

        this.urlToImage &&
        (template += `<img class="popUp-modal__img" src=${this.urlToImage} alt="img">`)

        this.title &&
        (template += `<h3 class="popUp__title">${this.title}</h3>`)

        this.subtitle &&
        (template += `<p class="popUp__subtitle">${this.subtitle}</p>`)

        template += `<div class="popUp__button">`


            template += `<button id="First"  class="pop__btn-inner" >${this.content[0]} </button>`
            template += `<button id="Second"  class="pop__btn-inner" >${this.content[1]} </button>`
            template += `<button id="Third"  class="pop__btn-inner" >${this.content[2]} </button>`
            template += `<button id="Fourth"  class="pop__btn-inner" >${this.content[3]} </button>`
            template += `<button id="Fifth"  class="pop__btn-inner" >${this.content[4]} </button>`
            template += `<button id="Sixth"  class="pop__btn-inner" >${this.content[5]} </button>`





        template += `</div>`

        template += `</div>`

        popUp.innerHTML = template;
        return popUp;
    }

    renderModal() {
        let content = this.generateContent();
        super.buildModal(content);
    }

}



const cliclHandletoDonation = () => {
    const first = document.getElementById('First');
    const second = document.getElementById('Second');
    const third = document.getElementById('Third');
    const fourth = document.getElementById('Fourth');
    const fifth = document.getElementById('Fifth');
    const sixth = document.getElementById('Sixth');
    first.addEventListener('click', event => {
        const donation = new Donation('donation');
                      donation.renderModal();
        const allBtnSecond = document.querySelectorAll('.donation__btn-inner')
        allBtnSecond[1].classList.add('btn__active')
    });
    second.addEventListener('click', event => {
        const donation = new Donation('donation');
        donation.renderModal();
        const allBtnSecond = document.querySelectorAll('.donation__btn-inner')
        allBtnSecond[2].classList.add('btn__active')
    });
    third.addEventListener('click', event => {
        const donation = new Donation('donation');
        donation.renderModal();
        const allBtnSecond = document.querySelectorAll('.donation__btn-inner')
        allBtnSecond[3].classList.add('btn__active')
    });
    fourth.addEventListener('click', event => {
        const donation = new Donation('donation');
        donation.renderModal();
        const allBtnSecond = document.querySelectorAll('.donation__btn-inner')
        allBtnSecond[4].classList.add('btn__active')
    });
    fifth.addEventListener('click', event => {
        const donation = new Donation('donation');
        donation.renderModal();
        const allBtnSecond = document.querySelectorAll('.donation__btn-inner')
        allBtnSecond[5].classList.add('btn__active')
    });
    sixth.addEventListener('click', event => {
        const donation = new Donation('donation');
        donation.renderModal();
        const allBtnSecond = document.getElementById('valueEnd')
        allBtnSecond.focus()
        allBtnSecond.classList.add('btn__activeOther')
    });



}




window.onload = function () {
    addDonateNowHandler();
    addDonationStep();
    addDonationStepTwo();
    addDonationStepThree();
    hideWindow();
    hideWindowStepThree();
    activeBtn();


}




const  addDonateNowHandler = () => {
    document.querySelectorAll('.donateNow').forEach(elem => {
        elem.addEventListener('click', (e) => {
            const pop = new PopUpFirst('popUp');
            pop.renderModal();
            document.querySelector('.overlay, .overlay_model').classList.add('popUpF')
            cliclHandletoDonation();

        })
    })


}


const addDonationStep = () => {

    document.querySelector('.input__form .input-quickDonateBtn__btn').addEventListener('click', (e) => {
        const donation = new Donation('donation');
        donation.renderModal();
        document.querySelector('.donation__btn-inner').classList.add('btn__active');
        let valueInput = document.getElementById('value').value;
        if(valueInput > 0) {
            document.getElementById('valueEnd').value = valueInput;
            document.querySelector('.donation__btn-inner').classList.remove('btn__active');
            document.querySelector('.donation__btnOther ').classList.add('btn__active');
        }



    })
}




class Donation extends Modal {

    constructor (classes ) {
        super(classes);
        this.content = ['$10', '$20', '$30', '$50', '$80', '$100'];

    }

    //PopUp generator
    generateContent() {
        let template = '';
        let donation = document.createElement('div');
        donation.className = 'donation';

        template += `<div class="donation__content">`

        template += `<header class="donation__header"><p class="donation__title">make your donation</p></header>`

        template += `<p class="donation__subcribe">donation information:`

        template += `<span class="donation__line"> </span>`

        template += `</p>`

        template += `<div class="donation__firstRow">`

        template += `<p class="donation__firstRow-text"><span class="donation_star">*</span> Choose your donation amount:</p>`
        template += `<form class="donation__flex">`
        this.content.map(tag => {
            template += `<input type="button" class="donation__btn-inner" value="${tag}">`


        })

        template += `</form>`

        template += `</div>`

        template += `<div class="donation__secondRow">`

        template += `<form class="donation__otheramount">`

        template += `<input class="donation__btnOther " type="button" value="Other amount">`

        template += ` <input id="valueEnd" type="number"  onKeyDown="if(this.value.length==4) return false" class="donation__otherInput" >`

        template +=  `</form>`

        template += `</div>`

        template += `<div class="donation__thirdRow">`

        template += `<form class="donation__choose">`

        template += `<input class="donation__btnOther" type="button"  value="for special pet"> `

        template += `<select class="donation__select" name="list" id="petList">
                  <option value="" disabled selected hidden>Choose your favourite</option>
                  <option value="1">Lukas the Panda</option>
                  <option value="2">Andy the Lemur</option>
                  <option value="3">Glen the Gorilla</option>
                  <option value="4">Sam & Lora the eagles</option>
                     </select>`
        template +=  `</form>`
        template += `<div class="donation__fouthRow">`
        template += `<input class="checkbox" type="checkbox">`
        template += `<p>Make this a monthly recurring gift </p>`
        template += `</div>`

        template += `</div>`

        template += `<div class="donation__fifthRow"> `
        template += `<div class="donation__cir"> `

        template += `<span class="donation__circle donation_active"> </span>
                     <span class="donation__circle"> </span>
                     <span class="donation__circle"> </span>`
        template += `</div>`

        template += `<button class="donation__btn btn_first">next</button>`

        template += `</div>`



        template += `</div>`

        donation.innerHTML = template;
        return donation;
    }

    renderModal() {
        let content = this.generateContent();
        this.buildModal(content);

    }


}


class DonationStepTwo extends Modal {


    //PopUp generator
    generateContent() {
        let template = '';
        let donation = document.createElement('div');
        donation.className = 'donationStepTwo';

        template += `<div class="donationStepTwo__content">`

        template += `<header class="donation__header"><p class="donation__title">make your donation</p></header>`

        template += `<p class="donation__subcribe">Billing Information::`

        template += `<span class="donation__line stepTwo__line"> </span>`

        template += `</p>`

        template += `<div class="donationStepTwo__firstRow">`

        template += `<p class="donation__firstRow-text"><span class="donation_star">*</span>Your Name</p>`
        template += `<form >`

        template += `<input id="inputFirst" type="text" class="donationStepTwo__text" placeholder="First and last name">`
        template += `<div >`
        template += `<p class="donation__firstRow-text"><span class="donation_star">*</span>Your Email Address</p>`
        template += `<input id="inputSecond" type="text" class="donationStepTwo__text"  placeholder="Enter you email" required>`
        template += `</div >`
        template += `</form>`
        template += `<p class="donationStepTwo__subcribe">You will receive emails from the Online Zoo, including updates and news on the latest discoveries and translations. You can unsubscribe at any time.</p>`
        template += `</div>`


        template += `<div class="donation__fifthRow donationStepTwo__fifthRow"> `
        template += `<div class="donation__cir"> `

        template += `<span class="donation__circle donation_active"> </span>
                     <span class="donation__circle donation_active"> </span>
                     <span class="donation__circle"> </span>`
        template += `</div>`

        template += `<button  class="donation__back">Back</button>`

        template += `<button class="donation__btn btnNextThree" >next</button>`

        template += `</div>`


        template += `</div>`

        donation.innerHTML = template;

        return donation;
    }

    addClass() {
        this.overlay.classList.add('donationStepBack');
    }

    renderModal() {
        let content = this.generateContent();
        super.buildModal(content);
        this.addClass();
        // checkFormBtnNonActive()

    }

}

const hideWindow = () => {
    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('donation__back')) {
            const back = document.querySelector('.donationStepBack');
            back.style.display = 'none';
        }


    })
}

const  hideWindowStepThree = () => {
    document.addEventListener('click', (e) => {
        if(e.target.classList.contains('donation__backThree')) {
            const back = document.querySelector('.donationStepBackThree');
            back.style.display = 'none';
        }
    })

}
const  activeBtn = () => {
     document.addEventListener('click', (e) => {
         if (e.target.classList.contains('donation__btn-inner')) {
             let target = e.target
             target.classList.add('btn__active');
              const allBtn = document.querySelectorAll('.donation__btn-inner');
              allBtn.forEach(el => {
                    el.classList.remove('btn__active')
              })
             target.classList.add('btn__active');

         }
     })
}



const addDonationStepTwo = () => {
    document.addEventListener('click', (e) => {
        const back =  document.body.lastChild;
        if (e.target.classList.contains('btn_first') ) {

            backtwo = document.querySelector('.donationStepBack')
            if(back.classList.contains('donationStepBack')) {
                backtwo.style.display = 'flex';

            } else  {
                const donationTwo = new DonationStepTwo('donation');
                donationTwo.renderModal();

            }
            }

        })
}





class DonationStepThree extends Modal {
    constructor (classes, ) {
        super(classes);

    }

    //PopUp generator
    generateContent() {
        let template = '';
        let donation = document.createElement('div');
        donation.className = 'donationStepTwo';

        template += `<div class="donationStepTwo__content">`

        template += `<header class="donation__header"><p class="donation__title">make your donation</p></header>`

        template += `<p class="donation__subcribe">Payment Information:`

        template += `<span class="donation__line stepTwo__line"> </span>`

        template += `</p>`

        template += `<div class="donationStepTwo__firstRow">`

        template += `<p class="donation__firstRow-text "><span class="donation_star">*</span> Credit Card Number</p>`
        template += `<form class="donationStepThree__flex">`
        template += `<input id="inputFirstFinal" type="number" onKeyDown="if(this.value.length==16) return false;"  class="donationStepThree__card">`
        template += `<div class="donation_cvv">`
        template += `<p class="donation__firstRow-text padding"><span class="donation_star">*</span> CVV Number</p>`
        template += `<input id="inputSecondFinal" type="number" onKeyDown="if(this.value.length==3) return false;"  class="donationStepThree__cvv" ">`
        template += `</div>`
        template += `</form>`
        template += `</div>`

        template += `<div class="donation__padding "> `
        template += `<p class="donation__firstRow-text"><span class="donation_star">*</span>Expiration Date</p>`
        template += `<form class="donationStepTwo__flex">`
        template += `<select class="donation__select" name="list" id="month">
                  <option value="" disabled selected hidden>Month</option>
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                  <option value="4">04</option>
                  <option value="5">05</option>
                  <option value="6">06</option>
                  <option value="7">07</option>
                  <option value="8">08</option>
                  <option value="9">09</option>
                  <option value="10">10</option>
                  <option value="11">11</option>
                  <option value="12">12</option>
                     </select>`
        template += `<select class="donation__select" name="list" id="year">
                  <option value="" disabled selected hidden>Year</option>
                  <option value="1">21</option>
                  <option value="2">22</option>
                  <option value="3">23</option>
                  <option value="4">24</option>
                  <option value="5">25</option>
                  <option value="6">26</option>
             
                     </select>`
        template += `</form>`

        template += `</div>`


        template += `<div class="donation__fifthRow donationStepTwo__fifthRow"> `
        template += `<div class="donation__cir"> `

        template += `<span class="donation__circle donation_active"> </span>
                     <span class="donation__circle donation_active"> </span>
                     <span class="donation__circle donation_active"> </span>`
        template += `</div>`

        template += `<button class="donation__backThree">Back</button>`

        template += `<button class="donation__btn btnFinally" disabled>complete donation</button>`

        template += `</div>`



        template += `</div>`

        donation.innerHTML = template;
        return donation;
    }
    addClass() {
        this.overlay.classList.add('donationStepBackThree');
    }

    renderModal() {
        let content = this.generateContent();
        super.buildModal(content);
        this.addClass();
        checkFormBtnNonActiveFinal();
    }


}

const addDonationStepThree = () => {

    document.addEventListener('click', (e) => {
        const back =  document.body.lastChild;
        if(e.target.classList.contains('btnNextThree')) {
            backtwo = document.querySelector('.donationStepBackThree')
            if(back.classList.contains('donationStepBackThree')) {
                backtwo.style.display = 'flex';
            } else {
                const donationThree = new DonationStepThree('donation');
                donationThree.renderModal();
            }

        }

    })
}


// const  checkFormBtnNonActive = () => {
//      let stop = setInterval(function () {
//
//          const inputFirst = document.getElementById('inputFirst')
//          const inputSecond = document.getElementById('inputSecond')
//          if (inputFirst.value.length > 0 && inputSecond.value.length > 0 ) {
//
//              const btn = document.querySelector('.btnNextThree');
//              btn.removeAttribute('disabled');
//              clearInterval(stop)
//          }
//      }, 1000)
//
// }

const  checkFormBtnNonActiveFinal = () => {
    let stop = setInterval(function () {
        const inputFirst = document.getElementById('inputFirstFinal')
        const inputSecond = document.getElementById('inputSecondFinal')
        const inputThird = document.getElementById('month')
        const inputFourth = document.getElementById('year')

        if (inputFirst.value.length > 15 && inputSecond.value.length > 2
             && inputThird.value.length > 0 && inputFourth.value.length > 0 ) {

            const btn = document.querySelector('.btnFinally');
            btn.removeAttribute('disabled');
            document.addEventListener('click', (e) => {
                if(e.target.classList.contains('btnFinally')) {
                    alert('Thank you for your donation')

                        document.querySelectorAll('.overlay').forEach(el => {
                            el.remove();
                        })

                }
            })

            clearInterval(stop)
        }
    }, 500)

}

