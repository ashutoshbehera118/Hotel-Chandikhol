document.addEventListener("DOMContentLoaded", function () {

    const galleryGrid =
        document.getElementById("galleryGrid");

    const galleryFilters =
        document.querySelectorAll(".gallery-filter");

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");

    const lightboxPrev =
        document.getElementById("lightboxPrev");

    const lightboxNext =
        document.getElementById("lightboxNext");


    if (!galleryGrid) {
        return;
    }


    const galleryItems =
        Array.from(
            galleryGrid.querySelectorAll(".gallery-item")
        );


    let visibleItems = [];
    let currentIndex = 0;


    /* =========================
       UPDATE VISIBLE ITEMS
    ========================= */

    function updateVisibleItems() {

        visibleItems =
            galleryItems.filter(function (item) {

                return (
                    item.style.display !== "none"
                );

            });

    }


    /* =========================
       FILTER GALLERY
    ========================= */

    galleryFilters.forEach(function (filter) {

        filter.addEventListener("click", function () {

            galleryFilters.forEach(function (button) {

                button.classList.remove("active");

            });

            filter.classList.add("active");


            const category =
                filter.dataset.filter;


            galleryItems.forEach(function (item) {

                const itemCategory =
                    item.dataset.category;


                if (
                    category === "all" ||
                    itemCategory === category
                ) {

                    item.style.display = "";

                } else {

                    item.style.display = "none";

                }

            });


            updateVisibleItems();

        });

    });


    /* =========================
       OPEN LIGHTBOX
    ========================= */

    galleryItems.forEach(function (item) {

        item.addEventListener("click", function () {

            const image =
                item.querySelector("img");

            if (!image) {
                return;
            }


            updateVisibleItems();


            currentIndex =
                visibleItems.indexOf(item);


            openLightbox(image.src, image.alt);

        });

    });


    function openLightbox(src, alt) {

        if (!lightbox || !lightboxImage) {
            return;
        }


        lightboxImage.src = src;
        lightboxImage.alt = alt || "Gallery image";


        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    }


    /* =========================
       CLOSE LIGHTBOX
    ========================= */

    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove("active");

        document.body.style.overflow = "";

    }


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            function (event) {

                if (event.target === lightbox) {

                    closeLightbox();

                }

            }
        );

    }


    /* =========================
       SHOW IMAGE
    ========================= */

    function showImage(index) {

        if (
            visibleItems.length === 0 ||
            !lightboxImage
        ) {
            return;
        }


        if (index < 0) {

            index =
                visibleItems.length - 1;

        }


        if (
            index >= visibleItems.length
        ) {

            index = 0;

        }


        currentIndex = index;


        const item =
            visibleItems[currentIndex];

        const image =
            item.querySelector("img");


        if (image) {

            lightboxImage.src =
                image.src;

            lightboxImage.alt =
                image.alt || "Gallery image";

        }

    }


    /* =========================
       PREVIOUS
    ========================= */

    if (lightboxPrev) {

        lightboxPrev.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                showImage(
                    currentIndex - 1
                );

            }
        );

    }


    /* =========================
       NEXT
    ========================= */

    if (lightboxNext) {

        lightboxNext.addEventListener(
            "click",
            function (event) {

                event.stopPropagation();

                showImage(
                    currentIndex + 1
                );

            }
        );

    }


    /* =========================
       KEYBOARD CONTROLS
    ========================= */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                !lightbox ||
                !lightbox.classList.contains("active")
            ) {
                return;
            }


            if (event.key === "Escape") {

                closeLightbox();

            }


            if (event.key === "ArrowLeft") {

                showImage(
                    currentIndex - 1
                );

            }


            if (event.key === "ArrowRight") {

                showImage(
                    currentIndex + 1
                );

            }

        }
    );


    updateVisibleItems();

});