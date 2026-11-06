
const photos = [
    {
        src: "/charlie-emil/image/fev/18.jpg",
        date: "2026-02-18",
        memory: "Our first photos in the gallery. Also the first time meeting IRL! A moment I never want to forget. ♡"
    },
    {
        src: "/charlie-emil/image/fev/18(2).jpg",
        date: "2026-02-18",
        memory: "Our first photos in the gallery. Also the first time meeting IRL! A moment I never want to forget. ♡"
    },
    {
        src: "/charlie-emil/image/fev/21.jpg",
        date: "2026-02-21",
        memory: "A little moment together that meant so much to me."
    },
    {
        src: "/charlie-emil/image/fev/21(2).jpg",
        date: "2026-02-21",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/fev/21(3).jpg",
        date: "2026-02-21",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/fev/26.jpg",
        date: "2026-02-26",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/fev/26(2).jpg",
        date: "2026-02-26",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/fev/26(3).jpg",
        date: "2026-02-26",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/mars/2.jpg",
        date: "2026-03-02",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/mars/2(2).jpg",
        date: "2026-03-02",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/mars/2(3).jpg",
        date: "2026-03-02",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/mars/15.jpg",
        date: "2026-03-15",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/mars/16.jpg",
        date: "2026-03-16",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/mars/16(2).jpg",
        date: "2026-03-16",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/mars/16(3).jpg",
        date: "2026-03-16",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/mars/16(4).jpg",
        date: "2026-03-16",
        memory: "Another memory added to our little story. ♡"
    },
    {
        src: "/charlie-emil/image/mars/22.jpg",
        date: "2026-03-22",
        memory: "Another memory added to our little story. ♡"
     },
    {
        src: "/charlie-emil/image/mars/30.jpg",
        date: "2026-03-30",
        memory: "Another memory added to our little story. ♡"
     },
    {
        src: "/charlie-emil/image/mars/30(2).jpg",
        date: "2026-03-30",
        memory: "Another memory added to our little story. ♡"
     },
    {
        src: "/charlie-emil/image/avr/16.jpg",
        date: "2026-04-16",
        memory: "Another memory added to our little story. ♡"
    }
];

const gallery = document.getElementById("gallery");

const viewer = document.getElementById("photo-viewer");
const viewerImage = document.getElementById("viewer-image");
const viewerDate = document.getElementById("viewer-date");
const memoryToggle = document.getElementById("memory-toggle");
const memoryNote = document.getElementById("memory-note");

let currentPhotoIndex = 0;


// FORMAT DATES

function getGalleryLocale() {
    return window.currentLanguage === "fr" ? "fr-CA" : "en-CA";
}

function formatMonth(dateString) {
    const [year, month] = dateString.split("-").map(Number);

    return new Date(year, month - 1, 1).toLocaleDateString(
        getGalleryLocale(),
        {
            month: "long",
            year: "numeric"
        }
    );
}

function formatDate(dateString) {
    const [year, month, day] = dateString.split("-").map(Number);

    return new Date(year, month - 1, day).toLocaleDateString(
        getGalleryLocale(),
        {
            month: "long",
            day: "numeric",
            year: "numeric"
        }
    );
}

function galleryText(key) {
    return window.siteTranslations?.[
        window.currentLanguage || "en"
    ]?.[key] || "";
}


// SORT PHOTOS (NEWEST FIRST)

photos.sort((a, b) => b.date.localeCompare(a.date));


// DISPLAY GALLERY

function renderGallery() {
    gallery.innerHTML = "";

    const groups = {};

    photos.forEach((photo, index) => {
        const month = photo.date.slice(0, 7);

        if (!groups[month]) {
            groups[month] = [];
        }

        groups[month].push({ ...photo, index });
    });

    Object.keys(groups).sort().reverse().forEach(month => {
        const section = document.createElement("section");
        section.className = "month-section";

        const heading = document.createElement("h2");
        heading.textContent = formatMonth(month + "-01");

        const grid = document.createElement("div");
        grid.className = "photo-grid";

        groups[month].forEach(photo => {
            const button = document.createElement("button");
            button.className = "gallery-photo";
            button.setAttribute("aria-label", "Open photo");

            const img = document.createElement("img");
            img.src = photo.src;
            img.alt = "A memory";
            img.loading = "lazy";

            img.onerror = () => {
                console.error("Could not load image:", photo.src);
            };

            button.appendChild(img);

            button.addEventListener("click", () => {
                openPhoto(photo.index);
            });

            grid.appendChild(button);
        });

        section.appendChild(heading);
        section.appendChild(grid);
        gallery.appendChild(section);
    });
}


// OPEN PHOTO

function openPhoto(index) {
    currentPhotoIndex = index;
    updateViewer();

    viewer.classList.add("active");
    document.body.style.overflow = "hidden";
}


// UPDATE FULLSCREEN VIEWER

function updateViewer() {
    const photo = photos[currentPhotoIndex];

    viewerImage.src = photo.src;
    viewerDate.textContent = formatDate(photo.date);

    memoryNote.textContent = photo.memory || "No memory added yet. ♡";
    memoryNote.hidden = true;

    memoryToggle.textContent =
        galleryText("gallery.read") || "♡ Read this memory";
}


// SHOW OR HIDE MEMORY

memoryToggle.addEventListener("click", () => {
    memoryNote.hidden = !memoryNote.hidden;

    memoryToggle.textContent = memoryNote.hidden
        ? (galleryText("gallery.read") || "♡ Read this memory")
        : (galleryText("gallery.hide") || "♡ Hide memory");
});


// PREVIOUS PHOTO

document.getElementById("viewer-prev").addEventListener("click", () => {
    currentPhotoIndex =
        (currentPhotoIndex - 1 + photos.length) % photos.length;

    updateViewer();
});


// NEXT PHOTO

document.getElementById("viewer-next").addEventListener("click", () => {
    currentPhotoIndex =
        (currentPhotoIndex + 1) % photos.length;

    updateViewer();
});


// CLOSE VIEWER

function closeViewer() {
    viewer.classList.remove("active");
    document.body.style.overflow = "";
}

document.getElementById("viewer-close").addEventListener("click", closeViewer);

viewer.addEventListener("click", event => {
    if (event.target === viewer) {
        closeViewer();
    }
});


// KEYBOARD NAVIGATION

document.addEventListener("keydown", event => {
    if (!viewer.classList.contains("active")) return;

    if (event.key === "Escape") {
        closeViewer();
    }

    if (event.key === "ArrowRight") {
        document.getElementById("viewer-next").click();
    }

    if (event.key === "ArrowLeft") {
        document.getElementById("viewer-prev").click();
    }
});


// LANGUAGE CHANGES

document.addEventListener("languageChanged", () => {
    if (viewer.classList.contains("active")) {
        viewerDate.textContent = formatDate(
            photos[currentPhotoIndex].date
        );

        memoryToggle.textContent = memoryNote.hidden
            ? (galleryText("gallery.read") || "♡ Read this memory")
            : (galleryText("gallery.hide") || "♡ Hide memory");
    }

    renderGallery();
});


// START GALLERY

renderGallery();

