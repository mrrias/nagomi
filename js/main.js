/* ========================================
   NAGOMI
   MAIN JAVASCRIPT
======================================== */

document.addEventListener("DOMContentLoaded", () => {
  /* ========================================
     ELEMENTS
  ======================================== */
  const menuButton = document.getElementById("menuButton");
  const menuClose = document.getElementById("menuClose");
  const sideMenu = document.getElementById("sideMenu");
  const menuOverlay = document.getElementById("menuOverlay");

  // Multi Pop-Up Selectors
  const topicCards = document.querySelectorAll(".topic-card");
  const closeButtons = document.querySelectorAll(".close-btn");
  const popupOverlays = document.querySelectorAll(".popup-overlay");

  /* ========================================
     HELPER: BODY SCROLL CONTROL
  ======================================== */
  function updateBodyScroll() {
    const isMenuOpen = sideMenu && sideMenu.classList.contains("active");

    // Check if ANY popup overlay currently displayed/visible
    const isAnyPopupOpen = Array.from(popupOverlays).some(
      (overlay) => overlay.style.display === "flex",
    );

    // Re-enable scrolling only if BOTH menu and all pop-ups are closed
    if (!isMenuOpen && !isAnyPopupOpen) {
      document.body.style.overflow = "";
    } else {
      document.body.style.overflow = "hidden";
    }
  }

  /* ========================================
     OPEN / CLOSE MENU
  ======================================== */
  function openMenu() {
    if (sideMenu) sideMenu.classList.add("active");
    if (menuOverlay) menuOverlay.classList.add("active");
    if (menuButton) menuButton.setAttribute("aria-expanded", "true");
    updateBodyScroll();
  }

  function closeMenu() {
    if (sideMenu) sideMenu.classList.remove("active");
    if (menuOverlay) menuOverlay.classList.remove("active");
    if (menuButton) menuButton.setAttribute("aria-expanded", "false");
    updateBodyScroll();
  }

  /* ========================================
     POP-UP DIRECT DISPLAY FUNCTIONS
  ======================================== */
  function openPopup(popupOverlay) {
    if (popupOverlay) {
      popupOverlay.style.display = "flex";
      setTimeout(() => {
        popupOverlay.style.opacity = "1";
        popupOverlay.style.pointerEvents = "auto";
      }, 10);
      updateBodyScroll();
    }
  }

  function closePopup(popupOverlay) {
    if (popupOverlay) {
      popupOverlay.style.opacity = "0";
      popupOverlay.style.pointerEvents = "none";

      setTimeout(() => {
        popupOverlay.style.display = "none";
        updateBodyScroll(); // Reset scroll after overlay display becomes hidden
      }, 300); // Matches smooth transition timing
    }
  }

  function closeAllPopups() {
    popupOverlays.forEach((overlay) => {
      if (overlay.style.display === "flex") {
        closePopup(overlay);
      }
    });
  }

  /* ========================================
     EVENTS (MENU)
  ======================================== */
  if (menuButton) menuButton.addEventListener("click", openMenu);
  if (menuClose) menuClose.addEventListener("click", closeMenu);
  if (menuOverlay) menuOverlay.addEventListener("click", closeMenu);

  const menuLinks = document.querySelectorAll(".menu-link");
  menuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  /* ========================================
     EVENTS (POP-UPS)
  ======================================== */
  // Open popup dynamically based on card href (#popup-id)
  topicCards.forEach((card) => {
    card.addEventListener("click", (event) => {
      const targetId = card.getAttribute("href");

      // Check if href is an anchor link targeting a popup ID
      if (targetId && targetId.startsWith("#") && targetId.length > 1) {
        event.preventDefault();
        const targetOverlay = document.querySelector(targetId);
        if (targetOverlay) {
          openPopup(targetOverlay);
        }
      }
    });
  });

  // Close popup when clicking any close button
  closeButtons.forEach((btn) => {
    btn.addEventListener("click", (event) => {
      event.preventDefault();
      const popupOverlay = btn.closest(".popup-overlay");
      if (popupOverlay) {
        closePopup(popupOverlay);
      }
    });
  });

  // Close popup when clicking outside the box (dark background)
  popupOverlays.forEach((overlay) => {
    overlay.addEventListener("click", (event) => {
      if (event.target === overlay) {
        closePopup(overlay);
      }
    });
  });

  /* ========================================
     ESCAPE KEY GLOBAL LISTENER
  ======================================== */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeAllPopups();

      // Close side menu if active
      if (sideMenu && sideMenu.classList.contains("active")) {
        closeMenu();
      }
    }
  });
});
