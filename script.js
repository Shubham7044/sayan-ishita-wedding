
document.addEventListener("DOMContentLoaded", () => {

    /* OPENING INVITATION */

    const openingScreen = document.getElementById("openingScreen");
    const openButton = document.getElementById("openInvitation");

    document.body.classList.add("no-scroll");

    if (openButton && openingScreen) {

        openButton.addEventListener("click", () => {

            openingScreen.classList.add("hidden");
            document.body.classList.remove("no-scroll");

            setTimeout(() => {
                openingScreen.style.display = "none";
            }, 1300);

        });

    }


    /* SCROLL PROGRESS */

    const progressBar = document.getElementById("scrollProgress");

    function updateProgress() {

        const scrollHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = scrollHeight > 0
            ? (window.scrollY / scrollHeight) * 100
            : 0;

        if (progressBar) {
            progressBar.style.width = `${progress}%`;
        }

    }

    window.addEventListener("scroll", updateProgress, {
        passive: true
    });

    updateProgress();


    /* SCROLL REVEAL ANIMATIONS */

    const revealElements = document.querySelectorAll(".reveal");

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if ("IntersectionObserver" in window && !prefersReducedMotion) {

        const revealObserver = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        revealObserver.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -35px 0px"
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    /* SMOOTH INTERNAL NAVIGATION */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: prefersReducedMotion ? "auto" : "smooth",
                    block: "start"
                });

            }

        });

    });


    /* RECEPTION COUNTDOWN */

    // Reception: 11 December 2026, 6:00 PM.
    // Change 18:00:00 if the actual reception time is different.

    const eventDate = new Date(
        "December 11, 2026 18:00:00"
    ).getTime();

    const daysElement = document.getElementById("days");
    const hoursElement = document.getElementById("hours");
    const minutesElement = document.getElementById("minutes");
    const secondsElement = document.getElementById("seconds");

    function updateCountdown() {

        const now = Date.now();
        const distance = eventDate - now;

        if (distance <= 0) {

            if (daysElement) daysElement.textContent = "000";
            if (hoursElement) hoursElement.textContent = "00";
            if (minutesElement) minutesElement.textContent = "00";
            if (secondsElement) secondsElement.textContent = "00";

            return;

        }

        const days = Math.floor(
            distance / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (distance / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (distance / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (distance / 1000) % 60
        );

        if (daysElement) {
            daysElement.textContent = String(days).padStart(3, "0");
        }

        if (hoursElement) {
            hoursElement.textContent = String(hours).padStart(2, "0");
        }

        if (minutesElement) {
            minutesElement.textContent = String(minutes).padStart(2, "0");
        }

        if (secondsElement) {
            secondsElement.textContent = String(seconds).padStart(2, "0");
        }

    }

    updateCountdown();

    setInterval(updateCountdown, 1000);


    /* BACKGROUND MUSIC */

    const music = document.getElementById("weddingMusic");
    const musicButton = document.getElementById("musicButton");

    let musicPlaying = false;

    if (music && musicButton) {

        musicButton.addEventListener("click", async () => {

            if (!musicPlaying) {

                try {

                    await music.play();

                    musicPlaying = true;

                    musicButton.classList.add("playing");

                    musicButton.setAttribute(
                        "aria-label",
                        "Pause background music"
                    );

                    musicButton.title = "Pause music";

                } catch (error) {

                    console.error("Music playback failed:", error);

                }

            } else {

                music.pause();

                musicPlaying = false;

                musicButton.classList.remove("playing");

                musicButton.setAttribute(
                    "aria-label",
                    "Play background music"
                );

                musicButton.title = "Play music";

            }

        });

    }


    /* FALLING ROSE PETALS */

    if (!prefersReducedMotion) {

        const petalSymbols = ["✿", "❀", "❁", "✧"];

        function createPetal() {

            const petal = document.createElement("span");

            petal.className = "rose-petal";

            petal.textContent = petalSymbols[
                Math.floor(Math.random() * petalSymbols.length)
            ];

            petal.style.left = Math.random() * 100 + "vw";

            petal.style.fontSize =
                (10 + Math.random() * 13) + "px";

            petal.style.animationDuration =
                (9 + Math.random() * 8) + "s";

            document.body.appendChild(petal);

            setTimeout(() => {
                petal.remove();
            }, 18000);

        }

        setInterval(createPetal, 1300);

    }


    /* PHOTO HOVER TILT */

    const desktopHover = window.matchMedia(
        "(hover: hover) and (pointer: fine)"
    ).matches;

    if (desktopHover && !prefersReducedMotion) {

        document.querySelectorAll(
            ".photo-border, .story-frame"
        ).forEach(frame => {

            frame.addEventListener("mousemove", event => {

                const rect = frame.getBoundingClientRect();

                const x = (event.clientX - rect.left) / rect.width;
                const y = (event.clientY - rect.top) / rect.height;

                const rotateY = (x - 0.5) * 2;
                const rotateX = (0.5 - y) * 2;

                frame.style.transform =
                    `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

            });

            frame.addEventListener("mouseleave", () => {

                frame.style.transform = "";

            });

        });

    }


    /* BILINGUAL WHATSAPP RSVP */

    const rsvpButton = document.getElementById("rsvpButton");

    if (rsvpButton) {

        const rsvpMessage = `🌸 নমস্কার Sayan & Ishita! 💕

আপনাদের শুভ বিবাহ ও সংবর্ধনার আনন্দে সামিল হতে পেরে আমি অত্যন্ত আনন্দিত।

১১ ডিসেম্বর ২০২৬-এর সংবর্ধনা অনুষ্ঠানে আপনাদের সঙ্গে এই বিশেষ দিনটি উদযাপন করতে আমি অবশ্যই উপস্থিত থাকব।

নতুন জীবনের জন্য রইল অনেক ভালোবাসা, শুভেচ্ছা ও আশীর্বাদ। ❤️🙏

━━━━━━━━━━━━━━━━━━━━

🌸 Greetings, Sayan & Ishita! 💕

I am truly delighted to be a part of the celebration of your wedding and reception.

I am happy to confirm that I will be attending your reception on 11 December 2026 and celebrating this special occasion with you.

Wishing you both a lifetime of love, happiness, togetherness and beautiful memories. ❤️🙏`;

        rsvpButton.addEventListener("click", event => {

            event.preventDefault();

            const whatsappURL =
                "https://wa.me/919679148292?text=" +
                encodeURIComponent(rsvpMessage);

            window.open(
                whatsappURL,
                "_blank",
                "noopener,noreferrer"
            );

        });

    }


    /* IMAGE ERROR CHECK */

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {

            console.error(
                "Could not load image:",
                image.src
            );

        });

    });

});
