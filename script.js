function focusSearchInput() {
  if (window.innerWidth <= 1200) {
    const foldable = document.querySelector(".foldable");
    const browseIcon = document.querySelector(".browse-icon");

    if (!foldable || !browseIcon) return;

    if (foldable.offsetWidth === 0) {
      foldable.style.width = "300px";
      browseIcon.style.display = "block";
      const input = document.getElementById("searchInput");
      if (input) {
        input.focus();
      }
    } else {
      foldable.style.width = "0";
      browseIcon.style.display = "none";
    }
  }
}

function menuToggle() {
  const menuIcon = document.getElementById("menuIcon");
  const ul = document.querySelector("nav ul");
  const account = document.getElementsByClassName("account")[0];

  if (ul.offsetWidth === 0) {
    ul.classList.add("mini-ul");
    ul.style.display = "block";
    menuIcon.src = "images/menuCancel.svg";
    if (account.offsetWidth === 0) {
      account.classList.add("mini-account");
      account.style.display = "flex";
    }
  } else {
    ul.classList.remove("mini-ul");
    ul.style.display = "none";
    menuIcon.src = "images/menu.svg";
    if (account.classList.contains("mini-account")) {
      account.classList.remove("mini-class");
      account.style.display = "none";
    }
  }
}

// function scrollbar() {
//   const scrollContent = document.querySelector(".scroll-inner");
//   const thumb = document.querySelector(".thumb");

//   function updateThumb() {
//     const contentHeight = scrollContent.scrollHeight;
//     const containerHeight = scrollContent.clientHeight;
//     const scrollTop = scrollContent.scrollTop;

//     const isScrollable = contentHeight > containerHeight;
//     thumb.style.display = isScrollable ? "block" : "none";
//     if (!isScrollable) return;

//     const thumbHeight = (containerHeight / contentHeight) * containerHeight;
//     const thumbTop = (scrollTop / contentHeight) * containerHeight;

//     thumb.style.height = `${thumbHeight}px`;
//     thumb.style.top = `${thumbTop}px`;
//   }

//   scrollContent.addEventListener("scroll", updateThumb);
//   window.addEventListener("resize", updateThumb);
//   updateThumb();

//   // Drag functionality
//   let isDragging = false;
//   let startY, startScrollTop;

//   thumb.addEventListener("mousedown", (e) => {
//     isDragging = true;
//     startY = e.clientY;
//     startScrollTop = scrollContent.scrollTop;
//     document.body.style.userSelect = "none";
//   });

//   document.addEventListener("mousemove", (e) => {
//     if (!isDragging) return;
//     const deltaY = e.clientY - startY;
//     const scrollRatio = scrollContent.scrollHeight / scrollContent.clientHeight;
//     scrollContent.scrollTop = startScrollTop + deltaY * scrollRatio;
//   });

//   document.addEventListener("mouseup", () => {
//     isDragging = false;
//     document.body.style.userSelect = "";
//   });
// }
// scrollbar();

function scrollbar(scrollWrapperSelector) {
  const wrappers = document.querySelectorAll(scrollWrapperSelector);

  wrappers.forEach((wrapper) => {
    const scrollContent = wrapper.querySelector(".scroll-inner");
    const thumb = wrapper.querySelector(".thumb");

    if (!scrollContent || !thumb) {
      console.warn("Missing .scroll-inner or .thumb in one of the wrappers");
      return;
    }

    function updateThumb() {
      const contentHeight = scrollContent.scrollHeight;
      const containerHeight = scrollContent.clientHeight;
      const scrollTop = scrollContent.scrollTop;
      console.log(containerHeight);

      const isScrollable = contentHeight > containerHeight;
      thumb.style.display = isScrollable ? "block" : "none";
      if (!isScrollable) return;

      let thumbHeight = (containerHeight / contentHeight) * containerHeight;
      const thumbTop = (scrollTop / contentHeight) * containerHeight;

      if (containerHeight > 400) {
        thumbHeight = thumbHeight + 40;
      }

      thumb.style.height = `${thumbHeight}px`;
      thumb.style.top = `${thumbTop}px`;
    }

    scrollContent.addEventListener("scroll", updateThumb);
    window.addEventListener("resize", updateThumb);
    updateThumb();

    // Drag functionality
    let isDragging = false;
    let startY, startScrollTop;

    thumb.addEventListener("mousedown", (e) => {
      isDragging = true;
      startY = e.clientY;
      startScrollTop = scrollContent.scrollTop;
      document.body.style.userSelect = "none";
    });

    document.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;
      const scrollRatio = scrollContent.scrollHeight / scrollContent.clientHeight;
      scrollContent.scrollTop = startScrollTop + deltaY * scrollRatio;
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
      document.body.style.userSelect = "";
    });
  });
}

scrollbar(".scroll-wrapper");

function hideDelay(toHover, thumb) {
  const target = document.querySelector(toHover);
  const box = document.querySelector(thumb);
  let hideTimeout;

  target.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout); // cancel hide if re-hovered
    box.classList.add("show");
  });

  target.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      box.classList.remove("show");
    }, 1000);
  });
}
hideDelay(".right", "#main-thumb");
hideDelay(".content", ".thumb");

document.addEventListener("click", function (event) {
  const ul = document.querySelector("nav ul");
  const menuIcon = document.getElementById("menuIcon");
  const account = document.querySelector(".account");
  const searchIcon = document.querySelector(".search-icon");
  const foldable = document.querySelector(".foldable");
  const browseIcon = document.querySelector(".browse-icon");

  const clickedOutsideMenu =
    menuIcon &&
    ul &&
    account &&
    !menuIcon.contains(event.target) &&
    !ul.contains(event.target) &&
    !account.contains(event.target);

  const clickedOutsideSearch =
    searchIcon && foldable && !searchIcon.contains(event.target) && !foldable.contains(event.target);

  if (clickedOutsideMenu) {
    if (ul.classList.contains("mini-ul")) {
      ul.style.display = "none";
      menuIcon.src = "images/menu.svg";
    }

    if (account.classList.contains("mini-account")) {
      account.style.display = "none";
    }
  }

  if (window.innerWidth <= 1200 && clickedOutsideSearch && foldable && browseIcon) {
    foldable.style.width = "0";
    browseIcon.style.display = "none";
  }
});
