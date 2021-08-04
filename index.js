const fikaBox = {
  init: function () {
    const galleriesObj = {};

    // find all wp block galleries
    const galleries = Array.from(
      document.querySelectorAll(".wp-block-gallery")
    );

    if (galleries) {
      // loop over every gallery
      for (let i = 0; i < galleries.length; i++) {
        let galleryID = "gallery" + i;

        // find item links in gallery
        const galleryItems = Array.from(
          galleries[i].querySelectorAll(".blocks-gallery-item a")
        );

        if (galleryItems) {
          // save gallery items to gallery obj
          galleriesObj[galleryID] = {
            total: galleryItems.length - 1,
            current: 0,
          };

          // loop over gallery links in gallery
          for (let j = 0; j < galleryItems.length; j++) {
            // set gallery id to link
            galleryItems[j].setAttribute("data-lightbox", galleryID);

            // set gallery item index to link
            galleryItems[j].setAttribute("data-index", j);

            // click event for links
            galleryItems[j].addEventListener("click", function (e) {
              e.preventDefault();

              // get current gallery id
              const currentGalleryID = this.getAttribute("data-lightbox");

              // get current gallery item index
              const currentItemIndex = Number(this.getAttribute("data-index"));

              // set current gallery item index to gallery obj
              galleriesObj[currentGalleryID].current = currentItemIndex;

              // target child img element
              const thumb = this.querySelector("img");

              // get media url if thumb exists
              if (thumb) {
                const mediaLink = thumb.getAttribute("data-full-url")
                  ? thumb.getAttribute("data-full-url")
                  : "";

                const currentImg = new Image();
                currentImg.src = mediaLink;

                currentImg.addEventListener("load", function () {
                  const isPortrait =
                    currentImg.height > currentImg.width ? true : false;

                  // create img wrapper
                  const wrapper = document.createElement("div");
                  const overlay = document.createElement("div");

                  overlay.style.position = "fixed";
                  overlay.style.top = "0";
                  overlay.style.bottom = "0";
                  overlay.style.left = "0";
                  overlay.style.right = "0";
                  overlay.style.zIndex = "999999";
                  overlay.style.backgroundColor = "#000";

                  // setup up wrapper styling
                  wrapper.style.position = "absolute";
                  wrapper.style.top = "50%";
                  wrapper.style.left = "50%";
                  wrapper.style.zIndex = "10";
                  wrapper.style.transform = "translate(-50%, -50%)";

                  // set img styling
                  if (isPortrait) {
                    wrapper.style.width = "auto";
                    wrapper.style.height = "90%";

                    currentImg.style.maxWidth = "none";
                    currentImg.style.width = "auto";
                    currentImg.style.height = "100%";
                  } else {
                    wrapper.style.width = "90%";
                    wrapper.style.height = "auto";

                    currentImg.style.maxWidth = "100%";
                    currentImg.style.height = "auto";
                  }

                  // append
                  wrapper.appendChild(currentImg);
                  overlay.appendChild(wrapper);
                  document.body.appendChild(overlay);

                  overlay.addEventListener("click", function () {
                    document.body.removeChild(this);
                  });

                  console.log(wrapper);
                });
              }
            });
          }
        }
      }
    }
  },
};
