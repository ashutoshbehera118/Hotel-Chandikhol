document.addEventListener("DOMContentLoaded", function () {

    const reviewForm =
        document.getElementById("reviewForm");

    const ratingStars =
        document.querySelectorAll(".rating-star");

    const ratingInput =
        document.getElementById("rating");

    const reviewMessage =
        document.getElementById("reviewMessage");


    /* =========================
       STAR RATING
    ========================= */

    let selectedRating = 0;


    ratingStars.forEach(function (star) {

        star.addEventListener("mouseenter", function () {

            const rating =
                Number(star.dataset.rating);


            ratingStars.forEach(function (item) {

                const itemRating =
                    Number(item.dataset.rating);


                if (itemRating <= rating) {

                    item.classList.add("selected");

                } else {

                    item.classList.remove("selected");

                }

            });

        });


        star.addEventListener("click", function () {

            selectedRating =
                Number(star.dataset.rating);


            if (ratingInput) {

                ratingInput.value =
                    selectedRating;

            }

        });

    });


    const ratingContainer =
        document.querySelector(".rating-stars");


    if (ratingContainer) {

        ratingContainer.addEventListener(
            "mouseleave",
            function () {

                ratingStars.forEach(function (star) {

                    const rating =
                        Number(star.dataset.rating);


                    if (
                        rating <= selectedRating
                    ) {

                        star.classList.add(
                            "selected"
                        );

                    } else {

                        star.classList.remove(
                            "selected"
                        );

                    }

                });

            }
        );

    }


    /* =========================
       REVIEW FORM
    ========================= */

    if (reviewForm) {

        reviewForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                const nameInput =
                    document.getElementById("reviewName");

                const emailInput =
                    document.getElementById("reviewEmail");

                const messageInput =
                    document.getElementById("reviewText");


                const name =
                    nameInput
                        ? nameInput.value.trim()
                        : "";


                const email =
                    emailInput
                        ? emailInput.value.trim()
                        : "";


                const message =
                    messageInput
                        ? messageInput.value.trim()
                        : "";


                /* Validation */

                if (name === "") {

                    alert(
                        "Please enter your name."
                    );

                    return;

                }


                if (email === "") {

                    alert(
                        "Please enter your email."
                    );

                    return;

                }


                if (selectedRating === 0) {

                    alert(
                        "Please select a star rating."
                    );

                    return;

                }


                if (message === "") {

                    alert(
                        "Please write your review."
                    );

                    return;

                }


                /* Success */

                if (reviewMessage) {

                    reviewMessage.textContent =
                        "Thank you for your review!";

                    reviewMessage.classList.add(
                        "success"
                    );

                } else {

                    alert(
                        "Thank you for your review!"
                    );

                }


                reviewForm.reset();


                selectedRating = 0;


                ratingStars.forEach(function (star) {

                    star.classList.remove(
                        "selected"
                    );

                });


                if (ratingInput) {

                    ratingInput.value = "";

                }

            }
        );

    }

});