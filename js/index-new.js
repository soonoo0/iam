var doc = window.document,
    context = doc.querySelector('.js-loop'),
    clones = context.querySelectorAll('.is-clone'),
    disableScroll = false,
    scrollHeight = 0,
    scrollPos = 0,
    clonesHeight = 0,
    sectionHeight = 0,
    i = 0,
    sections = context.querySelectorAll('section'),
    sectionsPosY = [],
    clickedSection,
    isClicked = false,
    OFFSET_X = 30,
    contents = context.querySelectorAll('.menu'),
    SECTION_NUMBER = 6,
    is_animated = false;
var md = new MobileDetect(window.navigator.userAgent);

function detectmob() {
    if( navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ){
        return true;
    }
    else {
        return false;
    }
}
(function init() {
    makeClone();

    var documentHeight = getDocHeight();
    sectionHeight = documentHeight / SECTION_NUMBER;
    var rad = 30 * Math.PI / 180;
    var offsetX = -(sectionHeight * Math.tan(rad) / 2) - OFFSET_X;
    setSectionsPositionY(sectionHeight);
    setSectionsPositionX(offsetX);
    setHeadingsPositionY(sectionHeight);
    setPosYOfSectionContent(sectionHeight);
    setDataAttributeToSection();

    for (var i = 0; i < sections.length; i++) {
        sections[i].addEventListener('click', onSectionCliked)
    }
    $(".fix").click(function (e) {
        onClose(e);
    })
/*  document.getElementsByClassName('fix')[0].addEventListener('click', onClose);
    document.getElementsByClassName('fix')[1].addEventListener('click', onClose);
    document.getElementsByClassName('fix2')[0].addEventListener('click', onClose);
    document.getElementsByClassName('fix3')[0].addEventListener('click', onClose);
    document.getElementsByClassName('fix4')[0].addEventListener('click', onClose);
    document.getElementsByClassName('fix5')[0].addEventListener('click', onClose);
    document.getElementsByClassName('fix6')[0].addEventListener('click', onClose);*/
})();

function makeClone() {
    for (var i = sections.length / 2; i < sections.length; i++) {
        var copy = contents[i - sections.length / 2].cloneNode(true);
        sections[i].appendChild(copy);
    }
    context = doc.querySelector('.js-loop');
    clones = context.querySelectorAll('.is-clone');
    sections = context.querySelectorAll('section');
    contents = context.querySelectorAll('.menu');


}

function onClose(e) {
    if (!is_animated) {
        is_animated = true;
        e.target.style.display = 'none';


        isClicked = false;
        context.removeClass('stop-scrolling');
        sections[clickedSection].style.top = sectionsPosY[clickedSection] + 'px';
        sections[clickedSection].removeClass('expand');
        contents[clickedSection].removeClass('show');
        sections[clickedSection].style.cursor = 'pointer';
        contents[clickedSection].scrollTop = 0;

        sections[clickedSection].childNodes[1].style.display = 'block';
        sections[clickedSection].childNodes[3].style.display = 'none';
        // document.getElementsByClassName('fix')[0].style.display = 'none';

        var documentHeight = getDocHeight();
        var rad = 10 * Math.PI / 180;
        var offsetX = -(documentHeight / 2 * Math.tan(rad));
        setSectionsPositionX(offsetX);
        for (var i = 0; i < sections.length; i++) {
            sections[i].style.top = sectionsPosY[i] + 'px';
        }

        setTimeout(function () {
            is_animated = false;
        }, 700);

    }

    /*    //$(".exit").click(function () {
            $("section").removeClass("big");
            $(".Loop").css("overflow-y", "scroll");
            $(".Loop").css("overflow-x", "hidden");
            $(".Loop").css("cursor", "pointer");
            $("section").css("display", "block");
            $("section > h1").css("display", "block");
            $(".aff").css("display", "block");
            $(".aff-con").css("display", "none");
            $(".com-con").css("display", "none");
            $(".com").css("display", "block");
            $(".bu-con").css("display", "none");
            $(".bu").css("display", "block");
            $(".bu-con").css("display", "none");
            $(".our").css("display", "block");
            $(".our-con").css("display", "none");
            $(".ir").css("display", "block");
            $(".ir-con").css("display", "none");
            $(".news").css("display", "block");
            $(".news-con").css("display", "none");
            $(".exit").css("display", "none");
        //});*/
}

function setPosYOfSectionContent(height) {
    for (var i = 0; i < contents.length; i++) {
        contents[i].style.marginTop = height / 2 + 'px';
    }
}

function onSectionCliked(e) {
    var clicked = e.target;
    if (isClicked === false && !is_animated) {
        is_animated = true;
        isClicked = true;
        sectionsPosY = getSectionsPositionY();
        clickedSection = Number(clicked.dataset.number);
        context.addClass('stop-scrolling');

        var documentHeight = getDocHeight();
        sectionHeight = documentHeight / 6;

        var currentOffsetTop = clicked.offsetTop - getScrollPos();
        var currentOffsetBottom = documentHeight - (currentOffsetTop + sectionHeight);

        clicked.style.top = getScrollPos() + 'px';
        clicked.style.left = 0;
        clicked.addClass('expand');
        contents[clickedSection].addClass('show');

        clicked.style.cursor = 'default';
        clicked.childNodes[1].style.display = 'none';
        clicked.childNodes[3].style.display = 'block';
     /*   document.getElementsByClassName('open-h1')[0].style.display = 'block';
        document.getElementsByClassName('fix')[0].style.display = 'block';*/
        $(".fix").css("display", "block");
        $(".fix2").css("display", "block");
        $(".fix3").css("display", "block");
        $(".fix4").css("display", "block");
        $(".fix5").css("display", "block");
        $(".fix6").css("display", "block");

        for (var i = 0; i < contents.length; i++) {
            var heading = contents[i].querySelector('h1');
            //heading.style.top = 0 + 'px';
            //heading.style.marginLeft = '0px';
            //heading.style.height = height + 'px';
        }
        for (var i = 0; i < contents.length; i++) {
            contents[i].style.marginTop = 0 + 'px';
        }

        var length = sections.length;
        var before, after;
        if (clickedSection < length / 2) {
            for (var i = length - clickedSection + 1; i < length; i++) {
                sections[i].style.top = (sections[i].offsetTop - currentOffsetTop) + 'px';
            }
            for (var i = 0; i < clickedSection; i++) {
                sections[i].style.top = (sections[i].offsetTop - currentOffsetTop) + 'px';
            }

            for (var i = clickedSection + 1; i < length; i++) {
                sections[i].style.top = (sections[i].offsetTop + currentOffsetBottom) + 'px';
            }
        }
        else {
            for (var i = clickedSection - length / 2 + 1; i < clickedSection; i++) {
                sections[i].style.top = (sections[i].offsetTop - currentOffsetTop) + 'px';
            }

            for (var i = 0; i < clickedSection - length / 2 + 1; i++) {
                sections[i].style.top = (sections[i].offsetTop + currentOffsetBottom) + 'px';
            }
            for (var i = clickedSection + 1; i < length; i++) {
                sections[i].style.top = (sections[i].offsetTop + currentOffsetBottom) + 'px';
            }
        }
        setTimeout(function () {
            is_animated = false;
        }, 700);

    }
}

function getSectionsPositionY() {
    var posY = [];
    for (var i = 0; i < sections.length; i++) {
        posY.push(sections[i].offsetTop);
    }
    return posY;
}

function setDataAttributeToSection() {
    for (var i = 0; i < sections.length; i++) {
        sections[i].dataset.clicked = 'false';
        sections[i].dataset.number = i.toString();
    }
}

function setSectionsPositionY(height) {
    for (var i = 0; i < sections.length; i++) {
        sections[i].style.top = height * i + 'px';
    }
}

function setSectionsPositionX(x) {
    if (window.innerWidth >= 1049) {
        for (var i = 0; i < sections.length; i++) {
            sections[i].style.left = 0 + 'px';
        }
    } else {
        for (var i = 0; i < sections.length; i++) {
            sections[i].style.left = -0.0729 + 'px';
        }
    }
}

function setHeadingsPositionY(height) {
    for (var i = 0; i < sections.length; i++) {
        var heading = sections[i].querySelector('h1');
        heading.style.top = height / 4 + 'px';
        //heading.style.height = height + 'px';
    }
}

function getDocHeight() {
    return context.offsetHeight;
}

function getScrollPos() {
    return (context.pageYOffset || context.scrollTop) - (context.clientTop || 0);
}

function setScrollPos(pos) {
    context.scrollTop = pos;
}


function getClonesHeight() {
    clonesHeight = 0;

    for (i = 0; i < clones.length; i += 1) {
        clonesHeight = clonesHeight + clones[i].offsetHeight;
    }

    return clonesHeight;
}

function reCalc() {
    scrollPos = getScrollPos();
    scrollHeight = context.scrollHeight;
    clonesHeight = getClonesHeight();
    var documentHeight = getDocHeight();
    sectionHeight = documentHeight / SECTION_NUMBER;
    var rad = 30 * Math.PI / 180;
    var offsetX = -(sectionHeight * Math.tan(rad) / 2) - OFFSET_X;
    setSectionsPositionY(sectionHeight);
    setSectionsPositionX(offsetX);
    setHeadingsPositionY(sectionHeight);
    setPosYOfSectionContent(sectionHeight);
    setDataAttributeToSection();

    if (scrollPos <= 0) {
        setScrollPos(1); // Scroll 1 pixel to allow upwards scrolling
    }
}

function scrollUpdate() {
    if (!disableScroll) {
        scrollPos = getScrollPos();

        if (scrollPos + context.offsetHeight >= sectionHeight * (sections.length)) {
            // Scroll to the top when you’ve reached the bottom
            setScrollPos(1); // Scroll down 1 pixel to allow upwards scrolling
            disableScroll = true;
        } else if (scrollPos <= 0) {
            // Scroll to the bottom when you reach the top
            setScrollPos(sectionHeight * sections.length / 2);
            disableScroll = true;
        }
    }

    if (disableScroll) {
        // Disable scroll-jumping for a short time to avoid flickering
        window.setTimeout(function () {
            disableScroll = false;
        }, 40);
    }
}
window.requestAnimationFrame(reCalc);

context.addEventListener('scroll', function () {
    window.requestAnimationFrame(scrollUpdate);
}, false);

/*
window.addEventListener('resize', function () {
    if (!md.mobile()) {
        window.requestAnimationFrame(reCalc);
    }
}, false);
*/
