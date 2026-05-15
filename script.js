/* =========================================
   CURSOR LIGHT EFFECT
========================================= */

const cursorLight = document.querySelector('.cursor-light');

document.addEventListener('mousemove', (e) => {

    cursorLight.style.left = e.clientX + 'px';
    cursorLight.style.top = e.clientY + 'px';

});


/* =========================================
   MATRIX SYSTEM
========================================= */

const canvas = document.getElementById('matrixCanvas');
const ctx = canvas.getContext('2d');

/* =========================
   CANVAS SIZE
========================= */

function resizeCanvas() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener('resize', resizeCanvas);


/* =========================
   MATRIX SETTINGS
========================= */

const chars =
'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ';

const fontSize = 16;

let columns = Math.floor(window.innerWidth / fontSize);

let drops = [];

/* =========================
   CREATE DROPS
========================= */

function initDrops() {

    drops = [];

    columns = Math.floor(window.innerWidth / fontSize);

    for (let i = 0; i < columns; i++) {

        drops[i] = Math.random() * -100;

    }

}

initDrops();

window.addEventListener('resize', initDrops);


/* =========================================
   MOUSE GLOW INTERACTION
========================================= */

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

window.addEventListener('mousemove', (e) => {

    mouseX = e.clientX;
    mouseY = e.clientY;

});


/* =========================================
   DRAW MATRIX
========================================= */

function drawMatrix() {

    /* TRAIL EFFECT */

    ctx.fillStyle = 'rgba(2, 3, 10, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {

        const text =
            chars.charAt(
                Math.floor(Math.random() * chars.length)
            );

        const x = i * fontSize;
        const y = drops[i] * fontSize;

        /* DISTANCE FROM CURSOR */

        const dx = x - mouseX;
        const dy = y - mouseY;

        const distance = Math.sqrt(dx * dx + dy * dy);

        /* LIGHT AREA */

        const lightRadius = 240;

        if (distance < lightRadius) {

            const intensity =
                1 - distance / lightRadius;

            /* BRIGHT PURPLE */

            ctx.fillStyle =
                `rgba(140, 110, 255, ${0.15 + intensity})`;

        } else {

            /* DARK MATRIX */

            ctx.fillStyle =
                'rgba(90, 100, 170, 0.12)';
        }

        ctx.fillText(text, x, y);

        /* RESET DROP */

        if (
            y > canvas.height &&
            Math.random() > 0.985
        ) {

            drops[i] = 0;

        }

        drops[i]++;

    }

}


/* =========================================
   MATRIX LOOP
========================================= */

setInterval(drawMatrix, 35);


/* =========================================
   HERO LOGO PARALLAX
========================================= */

const heroLogo = document.querySelector('.hero-logo');

document.addEventListener('mousemove', (e) => {

    const x =
        (window.innerWidth / 2 - e.clientX) / 45;

    const y =
        (window.innerHeight / 2 - e.clientY) / 45;

    heroLogo.style.transform =
        `translate(${x}px, ${y}px)`;

});


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements = document.querySelectorAll(
    '.about-card, .service-card, .why-card, .contact-box'
);

const revealObserver = new IntersectionObserver(

    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = '1';

                entry.target.style.transform =
                    'translateY(0px)';

            }

        });

    },

    {
        threshold: 0.15
    }

);

revealElements.forEach((el) => {

    el.style.opacity = '0';
    el.style.transform = 'translateY(60px)';
    el.style.transition =
        'all 1s cubic-bezier(.16,.84,.44,1)';

    revealObserver.observe(el);

});


/* =========================================
   NAVBAR BLUR ON SCROLL
========================================= */

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {

    if (window.scrollY > 50) {

        navbar.style.background =
            'rgba(2,3,10,.88)';

        navbar.style.borderBottom =
            '1px solid rgba(255,255,255,.08)';

    } else {

        navbar.style.background =
            'rgba(2,3,10,.65)';

        navbar.style.borderBottom =
            '1px solid rgba(255,255,255,.05)';
    }

});


/* =========================================
   SERVICE CARD HOVER GLOW
========================================= */

const serviceCards =
    document.querySelectorAll('.service-card');

serviceCards.forEach((card) => {

    card.addEventListener('mousemove', (e) => {

        const rect =
            card.getBoundingClientRect();

        const x =
            e.clientX - rect.left;

        const y =
            e.clientY - rect.top;

        card.style.background =
            `
            radial-gradient(
                circle at ${x}px ${y}px,
                rgba(122,104,255,.14),
                rgba(255,255,255,1) 45%
            )
        `;

    });

    card.addEventListener('mouseleave', () => {

        card.style.background = '#ffffff';

    });

});


/* =========================================
   BUTTON MAGNETIC EFFECT
========================================= */

const buttons = document.querySelectorAll(
    '.primary-btn, .nav-btn'
);

buttons.forEach((btn) => {

    btn.addEventListener('mousemove', (e) => {

        const rect = btn.getBoundingClientRect();

        const x =
            e.clientX - rect.left - rect.width / 2;

        const y =
            e.clientY - rect.top - rect.height / 2;

        btn.style.transform =
            `translate(${x * 0.12}px, ${y * 0.12}px)`;

    });

    btn.addEventListener('mouseleave', () => {

        btn.style.transform = 'translate(0px,0px)';

    });

});


/* =========================================
   HERO LIGHT PULSE
========================================= */

const heroGlow =
    document.querySelector('.hero-glow');

let glowScale = 1;
let glowDirection = 1;

function animateGlow() {

    glowScale += 0.0015 * glowDirection;

    if (glowScale >= 1.08) {

        glowDirection = -1;

    }

    if (glowScale <= 1) {

        glowDirection = 1;

    }

    heroGlow.style.transform =
        `scale(${glowScale})`;

    requestAnimationFrame(animateGlow);

}

animateGlow();