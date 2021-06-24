 // Slider for CSS filter

 const input = document.querySelectorAll('[type="range"]');
 const output = document.querySelectorAll('output');

 function handleUpdate()  {
     const suffix = this.dataset.sizing || '';
     document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix);
     // change value output
     this.nextElementSibling.value = this.value;
 }

    input.forEach(input => input.addEventListener('input', handleUpdate));



// Load img for url btn(next picture)

 const base = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/';
 const season = ['day/', 'morning/', 'night/', 'evening/'];
 const images = ['01.jpg', '02.jpg', '03.jpg', '05.jpg', '06.jpg', '07.jpg', '08.jpg', '09.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg',
     '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg'];
 let i = 0;
 const imgTag = document.querySelector('img');
 const btn = document.querySelector('.btn-next');
 console.log(imgTag)

    function viewBgImage(src) {
        const  img = new Image();
        img.src = src;
        img.onload = () => {
            imgTag.src = `${src}`;

        };
    }
 function getImage() {
     const index = i % images.length;
     const imageSrc = base + getSeasonForHours(season) + images[index];
     viewBgImage(imageSrc);
     i++;
     btn.disabled = true;
     setTimeout(function() { btn.disabled = false }, 1000);
 }
 btn.addEventListener('click', getImage);

        // Choice time
    let date = new Date();
    let hours = date.getHours();

    const getSeasonForHours = (season) => {
        if (hours > 6 && hours <= 12 ) {
            return season[1];
        } else if (hours > 12 && hours <= 18) {
            return season[0];
        } else if (hours > 18 && hours <= 24) {
            return  season[3];
        } else  return  season[2];

    }

// Load local pictures + btn
    const fileInput = document.querySelector('input[type="file"]');
    fileInput.addEventListener('change', (e) => {
        const file = fileInput.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            imgTag.innerHTML = "";
            imgTag.src = reader.result;
            fileInput.value = null;
        }
        reader.readAsDataURL(file);

    })

// Canvas

     const canvas = document.querySelector('canvas');
     const ctx = canvas.getContext('2d');
    function  drawImage() {
        imgTag.setAttribute('crossOrigin', 'anonymous');
        imgTag.onload = function () {
            canvas.width = imgTag.naturalWidth;
            canvas.height = imgTag.naturalHeight;


    // save filter for canvas

            input.forEach((value) => {
                value.addEventListener('input', (e) => {

                    let root = document.querySelector(':root');
                    let rootStyles = getComputedStyle(root);
                    let blur = rootStyles.getPropertyValue(`--blur`);
                    let invert = rootStyles.getPropertyValue(`--invert`);
                    let sepia = rootStyles.getPropertyValue(`--sepia`);
                    let saturate = rootStyles.getPropertyValue(`--saturate`);
                    let hue = rootStyles.getPropertyValue(`--hue`);
                 ctx.filter = `blur(${blur}) invert(${invert})  sepia(${sepia})  saturate(${saturate})  hue-rotate(${hue}) `;
                 console.log(ctx.filter);
                 ctx.drawImage(imgTag, 0, 0);
                })
            })
             ctx.drawImage(imgTag, 0, 0);

        }
    }
drawImage()
 // Reset value btn
 const  ResetValue = () => {
     document.querySelector('.btn-reset').addEventListener('click', (e) => {
         input.forEach( input => {
             document.documentElement.style.setProperty(`--blur`, '0');
             document.documentElement.style.setProperty(`--invert`, '0');
             document.documentElement.style.setProperty(`--sepia`, '0');
             document.documentElement.style.setProperty(`--saturate`, '100%');
             document.documentElement.style.setProperty(`--hue`, '0');
             input.value = input.defaultValue;

         })
         output.forEach(output => {
             output.value = output.defaultValue;
         })

         ctx.filter = 'none';
         ctx.drawImage(imgTag, 0, 0);
     })
 }
 ResetValue();

 // Save picture
    const btnSave = document.querySelector('.btn-save')
    btnSave.addEventListener('click', (e) => {
        const link = document.createElement('a');
        link.download = 'download.jpg';
        link.href = canvas.toDataURL("image/jpeg");
        link.click();
        link.delete;
    })
 //Show full screen
    document.addEventListener('click', (e) => {
        if (!e.target.hasAttribute('data-toggle-fullscreen')) return;
        if (document.fullscreenElement) {
            document.exitFullscreen();
        } else {
            document.documentElement.requestFullscreen();
        }
    })

 //Change active color btn

    const addBtnClickHandler = () => {
        document.querySelector('.btn-container').addEventListener('click', (e) => {
             if (e.target.classList.contains('btn')) {
                 let clickedBtn = e.target;
                 console.log(clickedBtn)
                removeSelectedBtn();
                selectClickedBtn(clickedBtn);

            }
        })
    }
    const  addBtnClickInput = () => {
        document.querySelector('.btn-load').addEventListener('click', (e) => {
            removeSelectedBtn();
            document.querySelector('.btn-load').classList.add('btn-active');
        })
    }
    const removeSelectedBtn = () => {
        let btn = document.querySelectorAll('.btn');
        btn.forEach(btn => {
            btn.classList.remove('btn-active');
        })
    }
    const selectClickedBtn = (clickedBtn) => {
        clickedBtn.classList.add('btn-active');
    }
    addBtnClickHandler();
    addBtnClickInput();


