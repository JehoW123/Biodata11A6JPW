document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const themeToggle = document.getElementById("themeToggle");
    const backToTop = document.getElementById("backToTop");
    const typingText = document.getElementById("typingText");
    const scrollHint = document.getElementById("scrollHint");

    // =========================
    // THEME TOGGLE
    // =========================
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        body.setAttribute("data-theme", "dark");
        if (themeToggle) themeToggle.textContent = "☀";
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const isDark = body.getAttribute("data-theme") === "dark";
            if (!isDark) {
                body.setAttribute("data-theme", "dark");
                themeToggle.textContent = "☀";
                localStorage.setItem("theme", "dark");
            } else {
                body.removeAttribute("data-theme");
                themeToggle.textContent = "☾";
                localStorage.setItem("theme", "light");
            }
        });
    }

    // =========================
    // SMOOTH SCROLL WITH OFFSET
    // =========================
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute("href");
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offset = 100; // Ubah angka ini sesuai kebutuhan (dalam pixel)
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // =========================
    // REVEAL ON SCROLL
    // =========================
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => revealObserver.observe(el));

    // =========================
    // SCROLL HINT LOGIC
    // =========================
    let scrollTimeout;
    let hasScrolled = false;

    const showScrollHint = () => {
        // Hanya muncul jika masih di Hero dan belum pernah scroll
        if (window.scrollY < 100 && !hasScrolled && scrollHint) {
            scrollHint.classList.add("show");
        }
    };

    const hideScrollHint = () => {
        if (scrollHint) {
            scrollHint.classList.remove("show");
        }
        clearTimeout(scrollTimeout);
    };

    const resetScrollTimer = () => {
        hideScrollHint();
        
        // Jika user scroll ke bawah, tandai sudah pernah scroll
        if (window.scrollY > 100) {
            hasScrolled = true;
        }
        
        // Hanya set timer baru jika masih di hero dan belum scroll
        if (window.scrollY < 100 && !hasScrolled) {
            scrollTimeout = setTimeout(showScrollHint, 3000);
        }
    };

    // Event listeners untuk reset timer
    window.addEventListener("scroll", resetScrollTimer);
    window.addEventListener("mousemove", resetScrollTimer);
    window.addEventListener("touchstart", resetScrollTimer);
    window.addEventListener("click", hideScrollHint);

    // Inisialisasi timer pertama kali (muncul setelah 3 detik)
    scrollTimeout = setTimeout(showScrollHint, 3000);

    // Hide hint ketika user mulai scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            hasScrolled = true;
            hideScrollHint();
        }
    }, { once: false });

    // =========================
    // BACK TO TOP BUTTON
    // =========================
    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });
        
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // =========================
    // TYPEWRITER EFFECT
    // =========================
    if (typingText) {
        const text = typingText.innerText;
        typingText.innerText = "";
        let i = 0;
        
        const typing = () => {
            if (i < text.length) {
                typingText.innerHTML += text.charAt(i);
                i++;
                setTimeout(typing, 35);
            }
        };
        
        // Delay typewriter effect untuk sinkronisasi dengan animasi
        setTimeout(typing, 600);
    }

    // =========================
    // ACTIVE NAV LINK
    // =========================
    const sections = document.querySelectorAll("section[id]");

    const setActiveNav = () => {
        let current = "";
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href") === `#${current}`) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", setActiveNav);

    // =========================
    // FULLSCREEN API
    // =========================
    document.querySelectorAll(".fullscreen-btn").forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            const target = document.getElementById(targetId);
            if (target?.requestFullscreen) {
                target.requestFullscreen();
            }
        });
    });
});