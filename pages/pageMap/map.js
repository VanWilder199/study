const  addTagsClickHandler = () => {
    document.querySelector('.navigation').addEventListener('mouseover', (e) => {
        if (e.target.classList.contains('navigation__link')){
            if(!e.target.classList.contains('defaultTag')) {


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

const  selectDefaultTag = () => {
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
console.log(selectButtonAll)
const ButtonVisitPage = () => {
    selectButtonAll.forEach(tag => {
        tag.addEventListener('click', (e) => {
            if (e.target.classList.contains('promo__buttons')){
                window.location='../zoos/panda/panda.html';
            }
            if (e.target.classList.contains('button__chooseYourFavourite')){
                window.location='../pageMap/map.html';
            }

        })
    })
}

ButtonVisitPage();