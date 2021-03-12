const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const prevButton = document.querySelector('.carousel__button--left');
const nextButton = document.querySelector('.carousel__button--right');
const bulletContainer= document.querySelector('.quotation-bullet');
const bullets = Array.from(bulletContainer.children);

const slideSize = slides[0].getBoundingClientRect();
const slideWidth = slideSize.width;
// console.log(slideWidth);

// Arrange slides next to one another===============================
const setSlidePosition = (slide, index) =>{
    slide.style.left = slideWidth * index + 'px';
}
slides.forEach(setSlidePosition);


// move to next/previous slide=======================================
const moveToSlide = (track, currentSlide, targetSlide)=>{
    track.style.transform = 'translateX(-'+ targetSlide.style.left +')';
    track.style.backgroundColor ='#ebebeb';
    // remove current slide and add it to target slide
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}


// Update Bullets=====================================================
const updateBullets = (currentBullet, targetBullet)=>{
    currentBullet.classList.remove('current-slide');
    targetBullet.classList.add('current-slide');
}


// Hide/ Show left and right Arrow====================================
const hideShowArrow = (slides, prevButton, nextButton, targetIndex)=>{
    if(targetIndex === 0){
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
    else if(targetIndex === slides.length-1){
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }else{
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}


// when I click right, move slide to right===============================
nextButton.addEventListener('click', e =>{
    // figure out what slide are we now
    const currentSlide = track.querySelector('.current-slide');
    // what is my next slide
    const nextSlide = currentSlide.nextElementSibling;
    // move to next slide Function
    moveToSlide(track, currentSlide, nextSlide);
    // figure out what bullet are we now
    const currentBullet = bulletContainer.querySelector('.current-slide');
    // what is my next bullet
    const nextBullet = currentBullet.nextElementSibling;
    // update Bullets Function
    updateBullets(currentBullet, nextBullet);
    // what is my next index
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    // hide or show Arrow Function
    hideShowArrow(slides, prevButton, nextButton, nextIndex);

    track.style.backgroundColor ='#ebebeb';
});


// when I click left, move slide to left================================
prevButton.addEventListener('click', e =>{
    // figure out what slide are we now
    const currentSlide = track.querySelector('.current-slide');
    // what is my previous slide
    const prevSlide = currentSlide.previousElementSibling;
    // move to previous slide Function
    moveToSlide(track, currentSlide, prevSlide);
    // figure out what bullet are we now
    const currentBullet = bulletContainer.querySelector('.current-slide');
    // what is my previous bullet
    const prevBullet = currentBullet.previousElementSibling;
    // update Bullets Function
    updateBullets(currentBullet, prevBullet);
    // what is my previous index
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    // hide or show Arrow Function
    hideShowArrow(slides, prevButton, nextButton, prevIndex);

    track.style.backgroundColor ='#ebebeb';
})


// when I click on Bullet, move to that slide============================
bulletContainer.addEventListener('click', e =>{
    // what bullet was clicked on
    const targetBullet = e.target.closest('span');

    if(!targetBullet) return;

    // figure out what slide are we now
    const currentSlide = track.querySelector('.current-slide');
    // figure out what bullet are we now
    const currentBullet = bulletContainer.querySelector('.current-slide');
    // what is my target index
    const targetIndex = bullets.findIndex(bullet => bullet === targetBullet);
    // what is my target slide
    const targetSlide = slides[targetIndex];

    // functions
    moveToSlide(track, currentSlide, targetSlide);
    updateBullets(currentBullet, targetBullet);
    hideShowArrow(slides, prevButton, nextButton, targetIndex);
});


// Javascript form validation==================================
const form = document.getElementById('form2');
const username = document.getElementById('userName');
const email = document.getElementById('Email');
const message = document.getElementById('Message');

 

// check input filed isnt empty===============
function isEmpty(inputArr){
    inputArr.forEach(input =>{
        if(input.value === ''){
            showError(input, `${getFieldName(input)} can't be empty`);
        }else{
            showSuccess(input)
        }
    })
}

// check Email Validation====================
function checkEmailValidation(input){
    var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(input.value === ''){
        showError(input, `${getFieldName(input)} can't be empty`);
    }else{
        if(pattern.test(input.value.trim())){
        showSuccess(input);
        }else{
        showError(input, 'Email is not valid');
        }
    }
}

// Get field name=========================
function getFieldName(input){
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// show Error===============================
function showError(input, message){
    const formGroup =input.parentElement;
    formGroup.className ='fgroup error';
    const small = formGroup.querySelector('small');
    small.innerText = message;
}

// show success============================
function showSuccess(input){
    const formGroup = input.parentElement;
    formGroup.className ='fgroup success';
}

// Add eventlistener=======================
form.addEventListener('submit', function(e){
    e.preventDefault();

    isEmpty([username, email, message]);
    checkEmailValidation(email);
})

// ======================================================

