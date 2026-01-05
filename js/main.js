// ==============================
// NAV LINK INTERACTIONS
// ==============================
const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach((link) => {
  let shakeTween; // store wobble animation

  // --- HOVER IN ---
  link.addEventListener("mouseenter", () => {
    gsap.to(link, {
      scale: 1.2,
      duration: 0.4,
      ease: "power1.inOut",
    });

    // slow wobble
    shakeTween = gsap.to(link, {
      rotation: 3,
      duration: 0.15,
      repeat: -1,
      yoyo: true,
      ease: "power1.inOut",
    });
  });

  // --- MAGNETIC MOVEMENT ---
  link.addEventListener("mousemove", (e) => {
    const rect = link.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(link, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  });

  // --- HOVER OUT ---
  link.addEventListener("mouseleave", () => {
    if (shakeTween) shakeTween.kill();
    gsap.to(link, {
      scale: 1,
      rotation: 0,
      x: 0,
      y: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
  });

  // --- CLICK (PRESS) ---
  link.addEventListener("mousedown", () => {
    gsap.to(link, {
      scale: 0.9,
      rotation: -2,
      duration: 0.2,
      ease: "power1.inOut",
    });
  });

  // --- RELEASE ---
  link.addEventListener("mouseup", () => {
    gsap.to(link, {
      scale: 1.2,
      rotation: 3,
      duration: 0.3,
      ease: "elastic.out(1, 0.4)",
    });
  });
});

// ==============================
// SVG PATH DRAW ANIMATION
// ==============================
const paths = document.querySelectorAll("#hero-svg path");

paths.forEach((path, i) => {
  const length = path.getTotalLength();

  // set up dash
  path.style.strokeDasharray = length;
  path.style.strokeDashoffset = length;

  // draw on load
  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 0.7,
    delay: i * 0.3,
    ease: "power2.out",
    onComplete: () => {
      // erase on scroll
      gsap.to(path, {
        strokeDashoffset: length,
        ease: "none",
        scrollTrigger: {
          trigger: "#projects",
          start: "top 90%",
          end: "top 30%",
          scrub: true,
        },
      });
    },
  });
});

// ==============================
// CONTACT LINK SCROLL
// ==============================
const contactLink = document.querySelector(".contact-link");
if (contactLink) {
  contactLink.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  });
}

// ==============================
// CUSTOM CURSOR
// ==============================
const cursor = document.querySelector(".custom-cursor");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = e.clientX + "px";
  cursor.style.top = e.clientY + "px";
});

const interactiveElements = document.querySelectorAll("a, button, .nav-link");

interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1.8)";
    cursor.style.backgroundColor = "rgba(0,0,0,0.1)";
    cursor.style.borderColor = "#f7f5e9";
  });

  el.addEventListener("mouseleave", () => {
    cursor.style.transform = "translate(-50%, -50%) scale(1)";
    cursor.style.backgroundColor = "transparent";
    cursor.style.borderColor = "#242424";
  });
});

const bg = document.getElementById("gradient-bg");

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

let currentX = mouseX;
let currentY = mouseY;

// Lower = more smear/lag, higher = snappier
const smoothing = 0.06;

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

function animate() {
  // Ease towards target (mouse)
  currentX += (mouseX - currentX) * smoothing;
  currentY += (mouseY - currentY) * smoothing;

  // Update gradient center
  bg.style.background = `
      radial-gradient(
        circle at ${currentX}px ${currentY}px,
        rgba(244, 78, 28, 0.35),
        rgba(28, 34, 58, 1) 60%
      )
    `;

  requestAnimationFrame(animate);
}