document.addEventListener("DOMContentLoaded", function () {

    const menuGrid =
        document.getElementById("menuGrid");

    const searchInput =
        document.getElementById("menuSearch");

    const categoryButtons =
        document.querySelectorAll(".category-btn");

    const noResults =
        document.getElementById("noResults");


    if (!menuGrid) {
        return;
    }


    const menuItems =
        menuGrid.querySelectorAll(".menu-item");


    let selectedCategory = "all";


    /* =========================
       FILTER MENU
    ========================= */

    function filterMenu() {

        const searchText =
            searchInput
                ? searchInput.value
                    .toLowerCase()
                    .trim()
                : "";

        let visibleItems = 0;


        menuItems.forEach(function (item) {

            const itemCategory =
                (
                    item.dataset.category || ""
                ).toLowerCase();

            const itemName =
                (
                    item.dataset.name ||
                    item.textContent
                ).toLowerCase();


            const categoryMatch =
                selectedCategory === "all" ||
                itemCategory === selectedCategory;


            const searchMatch =
                itemName.includes(searchText);


            if (
                categoryMatch &&
                searchMatch
            ) {

                item.style.display = "";

                visibleItems++;

                setTimeout(function () {
                    item.classList.add("show");
                }, 10);

            } else {

                item.style.display = "none";

                item.classList.remove("show");

            }

        });


        if (noResults) {

            if (visibleItems === 0) {

                noResults.style.display = "block";

            } else {

                noResults.style.display = "none";

            }

        }

    }


    /* =========================
       CATEGORY BUTTONS
    ========================= */

    categoryButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            categoryButtons.forEach(function (btn) {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            selectedCategory =
                (
                    button.dataset.category || "all"
                ).toLowerCase();


            filterMenu();

        });

    });


    /* =========================
       SEARCH
    ========================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                filterMenu();

            }
        );

    }


    /* =========================
       INITIAL FILTER
    ========================= */

    filterMenu();

});