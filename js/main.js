document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       MOBILE NAVIGATION
    ========================= */

    const mobileMenu = document.getElementById("mobileMenu");
    const mainNavigation = document.getElementById("mainNavigation");
    const siteHeader = document.querySelector(".site-header");

    if (mobileMenu && mainNavigation && siteHeader) {

        mobileMenu.addEventListener("click", function (event) {

            event.stopPropagation();

            siteHeader.classList.toggle("mobile-active");

            const isOpen =
                siteHeader.classList.contains("mobile-active");

            mobileMenu.setAttribute(
                "aria-expanded",
                isOpen
            );

            const icon = mobileMenu.querySelector("i");

            if (icon) {

                if (isOpen) {
                    icon.classList.remove("fa-bars");
                    icon.classList.add("fa-xmark");
                } else {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        /* Close menu after clicking navigation link */

        const navLinks =
            document.querySelectorAll(".nav-link");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                siteHeader.classList.remove(
                    "mobile-active"
                );

                mobileMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    mobileMenu.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", function (event) {

            if (
                siteHeader.classList.contains("mobile-active") &&
                !siteHeader.contains(event.target)
            ) {

                siteHeader.classList.remove(
                    "mobile-active"
                );

                mobileMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    mobileMenu.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });


        /* Reset menu when screen becomes large */

        window.addEventListener("resize", function () {

            if (window.innerWidth > 900) {

                siteHeader.classList.remove(
                    "mobile-active"
                );

                mobileMenu.setAttribute(
                    "aria-expanded",
                    "false"
                );

                const icon =
                    mobileMenu.querySelector("i");

                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }

            }

        });

    }


    /* =========================
       ACTIVE NAVIGATION
    ========================= */

    const currentPage =
        window.location.pathname.split("/").pop();

    const allNavLinks =
        document.querySelectorAll(".nav-link");

    allNavLinks.forEach(function (link) {

        const linkPage =
            link.getAttribute("href");

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {

            link.classList.add("active");

        }

    });


    /* =========================
       SMOOTH SCROLL
    ========================= */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (
                targetId &&
                targetId !== "#"
            ) {

                const target =
                    document.querySelector(targetId);

                if (target) {

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }

        });

    });


    /* =========================
       BACK TO TOP BUTTON
    ========================= */

    const backToTop =
        document.getElementById("backToTop");

    if (backToTop) {

        window.addEventListener("scroll", function () {

            if (window.scrollY > 400) {

                backToTop.classList.add("show");

            } else {

                backToTop.classList.remove("show");

            }

        });

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================
       SCROLL REVEAL
    ========================= */

    const revealElements =
        document.querySelectorAll(
            ".food-card, .feature-card, .review-card, .info-card, .social-card"
        );

    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.15
                }
            );

        revealElements.forEach(function (element) {

            observer.observe(element);

        });

    }


    /* =========================
       CURRENT YEAR
    ========================= */

    const yearElement =
        document.getElementById("currentYear");

    if (yearElement) {

        yearElement.textContent =
            new Date().getFullYear();

    }

});

// ==========================================
// CONTACT FORM
// ==========================================
document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");
    const submitButton = document.getElementById("submitButton");

    if (!contactForm) {
        return;
    }

    contactForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        formMessage.textContent = "";
        formMessage.className = "form-message";

        submitButton.disabled = true;

        const originalButtonText = submitButton.innerHTML;

        submitButton.innerHTML =
            '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

        const formData = new FormData(contactForm);

        const data = {
            name: formData.get("name"),
            phone: formData.get("phone"),
            email: formData.get("email"),
            subject: formData.get("subject"),
            message: formData.get("message")
        };

        try {

            // const response = await fetch("/api/contact", {
            // const response = await fetch("http://localhost:5000/api/contact", {
            const response = await fetch("https://hotel-chandikhol.onrender.com/api/contact", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)

            });

            const contentType =
                response.headers.get("content-type");

            if (!contentType ||
                !contentType.includes("application/json")) {

                throw new Error(
                    `Server returned ${response.status} instead of JSON.`
                );
            }

          const result = await response.json();

            if (!response.ok) {
                throw new Error(
                    result.message || "Something went wrong."
                );
            }

            if (result.success) {

                formMessage.textContent =
                    result.message;

                formMessage.classList.add("success");

                contactForm.reset();

            }

        } catch (error) {

            console.error("Contact form error:", error);

            formMessage.textContent =
                error.message ||
                "Unable to send your message.";

            formMessage.classList.add("error");

        } finally {

            submitButton.disabled = false;

            submitButton.innerHTML =
                originalButtonText;

        }

    });

});