import $ from "jquery";

// blur-scrollbar
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 50) {
    $("#main-header")
      .removeClass("bg-unique-gray")
      .addClass("bg-zinc-900/70 backdrop-blur-xl");
  } else {
    $("#main-header")
      .removeClass("bg-zinc-900/70 backdrop-blur-xl")
      .addClass("bg-unique-gray");
  }
});

// mobile-humburger-menu
$(document).ready(function () {
  function openMenu() {
    $("#mobile-menu")
      .removeClass("hidden translate-x-full")
      .addClass("translate-x-0");

    $("#overlay").removeClass("hidden");
  }

  function closeMenu() {
    $("#mobile-menu").removeClass("translate-x-0").addClass("translate-x-full");

    $("#overlay").addClass("hidden");

    setTimeout(() => {
      $("#mobile-menu").addClass("hidden");
    }, 300);
  }

  $("#menu-btn").on("click", openMenu);
  $("#close-btn").on("click", closeMenu);
  $("#overlay").on("click", closeMenu);

  $("#mobile-menu a").on("click", function () {
    closeMenu();
  });
});

// back-to-top-btn
document.addEventListener("DOMContentLoaded", () => {
  const backToTopBtn = document.getElementById("backToTop");

  if (!backToTopBtn) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.remove("hidden");
      backToTopBtn.classList.add("flex");
    } else {
      backToTopBtn.classList.add("hidden");
      backToTopBtn.classList.remove("flex");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

// count-down-timer
const hourEl = document.getElementById("hour");
const minuteEl = document.getElementById("minute");
const secondEl = document.getElementById("second");

let timeLeft = 59 * 60 * 60;

function updateCountdown() {
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  hourEl.textContent = String(hours).padStart(2, "0");
  minuteEl.textContent = String(minutes).padStart(2, "0");
  secondEl.textContent = String(seconds).padStart(2, "0");

  if (timeLeft <= 0) {
    clearInterval(timer);
    return;
  }

  timeLeft--;
}

updateCountdown();

const timer = setInterval(updateCountdown, 1000);

const API_URL =
  "https://raw.githubusercontent.com/mmhz23/mft-final/main/public/assets/data/data.json";

const renderCollectionCard = (collection, creator, index) => {
  let visibilityClasses = "";

  if (index === 1) {
    visibilityClasses = "hidden md:block";
  } else if (index === 2) {
    visibilityClasses = "hidden xl:block";
  }

  return `
    <div class="${visibilityClasses}">
      <img
        src="${collection.images[0]}"
        alt="${collection.name}"
        class="w-full rounded-rounded-20 object-cover"
      />

      <div class="mt-4 grid grid-cols-3 gap-4">
        <img
          src="${collection.images[1]}"
          alt="${collection.name}"
          class="w-full rounded-rounded-20 object-cover"
        />

        <img
          src="${collection.images[2]}"
          alt="${collection.name}"
          class="w-full rounded-rounded-20 object-cover"
        />

        <div
          class="bg-unique-purple text-unique-white flex items-center justify-center rounded-rounded-20 text-xl font-bold cursor-pointer hover:opacity-70"
        >
          ${collection.total_items}+
        </div>
      </div>

      <div class="mt-4">
        <h3 class="text-unique-white text-2xl font-semibold">
          ${collection.name}
        </h3>

        <div class="mt-2 flex items-center gap-2">
          <img
            src="${creator.image}"
            alt="${creator.name}"
            class="h-6 w-6 rounded-full object-cover"
          />

          <span class="text-gray-300">
            ${creator.name}
          </span>
        </div>
      </div>
    </div>
  `;
};

const renderCollections = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load collections");
    }

    const data = await response.json();

    const container = document.getElementById("trending-collection-container");

    container.innerHTML = data.collections
      .map((collection, index) => {
        const creator = data.creators.find(
          (creator) => creator.id === collection.creator_id,
        );

        return renderCollectionCard(collection, creator, index);
      })
      .join("");
  } catch (error) {
    console.error("Collections error:", error);
  } finally {
    console.log("Collections section finished");
  }
};

renderCollections();

// creator-card-third-section(rankings)

const renderCreatorCard = (creator, index) => {
  return `
    <div
      class="bg-footer-bg cursor-pointer flex h-60 w-full flex-col items-center rounded-rounded-20 p-6 text-center hover:scale-105 hover:opacity-70 hover:shadow-xl"
    >

      <div class="relative">

        <span
          class="text-numbers-white bg-unique-gray absolute -left-8 flex h-7 w-7 items-center justify-center rounded-full text-base"
        >
          ${index + 1}
        </span>

        <img
          src="${creator.image}"
          alt="${creator.name}"
          class="h-30 w-30 object-cover"
        />

      </div>


      <div>

        <h3 class="text-unique-white mb-2 text-xl font-semibold">
          ${creator.name}
        </h3>


        <p class="text-numbers-white">
          Total Sales:
          <span class="text-unique-white">
            ${creator.total_sales} ${creator.currency}
          </span>
        </p>

      </div>

    </div>
  `;
};

const renderCreators = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load creators");
    }

    const data = await response.json();

    const container = document.getElementById("creators-container");

    let visibleCreators = [];

    if (window.innerWidth >= 1280) {
      visibleCreators = data.creators.slice(0, 12);
    } else if (window.innerWidth >= 768) {
      visibleCreators = data.creators.slice(0, 6);
    } else {
      visibleCreators = data.creators.slice(0, 5);
    }

    container.innerHTML = visibleCreators
      .map((creator, index) => renderCreatorCard(creator, index))
      .join("");
  } catch (error) {
    console.error("Creators error:", error);
  } finally {
    console.log("Creators section finished");
  }
};

renderCreators();

window.addEventListener("resize", renderCreators);

// brows-category-forth-section

const renderCategoryCard = (category) => {
  return `
    <div
      class="rounded-rounded-20 bg-footer-bg w-full max-w-40 overflow-hidden transition-transform duration-300 hover:scale-105 md:max-w-44 xl:max-w-60 cup"
    >

      <div class="relative">

        <img
          class="blur-xs w-full"
          src="${category.image}"
          alt="${category.name}"
        />

        <img
          class="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2"
          src="${category.icon}"
          alt="${category.name}"
        />

      </div>
      <div class="p-6 cursor-pointer hover:opacity-70">

        <h3
          class="text-unique-white text-xl leading-[140%] font-semibold"
        >
          ${category.name}
        </h3>

      </div>

    </div>
  `;
};

const renderCategories = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load categories");
    }

    const data = await response.json();

    const container = document.getElementById("categories-container");

    container.innerHTML = data.categories
      .map((category) => renderCategoryCard(category))
      .join("");
  } catch (error) {
    console.error("Categories error:", error);
  } finally {
    console.log("Categories section finished");
  }
};

renderCategories();

const renderNFTs = async () => {
  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("Failed to load NFTs");
    }

    const data = await response.json();

    const container = document.getElementById("discover-nfts-container");

    let visibleNFTs = [];

    if (window.innerWidth >= 1280) {
      visibleNFTs = data.nfts.slice(0, 3);
    } else if (window.innerWidth >= 768) {
      visibleNFTs = data.nfts.slice(0, 2);
    } else {
      visibleNFTs = data.nfts.slice(0, 1);
    }

    container.innerHTML = visibleNFTs
      .map((nft) => {
        const creator = data.creators.find(
          (creator) => creator.id === nft.creator_id,
        );

        return renderNFTCard(nft, creator);
      })
      .join("");
  } catch (error) {
    console.error("NFT render error:", error);
  } finally {
    console.log("NFT section finished");
  }
};

renderNFTs();

window.addEventListener("resize", renderNFTs);

// NFT-cart-fifth-section

const renderNFTCard = (nft, creator, index) => {
  return `
    <div 
      class="
      rounded-rounded-20 
      bg-footer-bg 
      cursor-pointer 
      overflow-hidden 
      transition-transform 
      duration-300 
      hover:scale-105
      "
    >
      <img 
        src="${nft.image}" 
        alt="${nft.name}"
        class="w-full h-auto object-cover"
      />

      <div class="flex flex-col gap-6 p-5">

        <div class="flex flex-col gap-2">

          <h5 class="text-unique-white text-2xl font-semibold">
            ${nft.name}
          </h5>

          <div class="flex items-center gap-3">

            <img 
              src="${creator?.image || "assets/images/placeholder.png"}"
              alt="${creator?.name || "Unknown"}"
              class="h-6 w-6 rounded-full object-cover"
            />

            <span class="text-unique-white text-xs">
              ${creator?.name || "Unknown"}
            </span>
          </div>
        </div>

        <div class="flex items-center justify-between">
          <div class="flex flex-col gap-2">

            <span class="text-numbers-white text-xs">
              Price
            </span>

            <span class="text-unique-white text-base">
              ${nft.price.amount} ${nft.price.currency}
            </span>
          </div>

          <div class="flex flex-col gap-2 text-right">

            <span class="text-numbers-white text-xs">
              Highest Bid
            </span>

            <span class="text-unique-white text-base">
              ${nft.highest_bid.amount} ${nft.highest_bid.currency}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
};

renderNFTs();

window.addEventListener("resize", renderNFTs);

const initNFTSection = async () => {
  try {
    const response = await fetch("data.json");

    if (!response.ok) {
      throw new Error("data.json didnt find");
    }

    const data = await response.json();

    const container = document.getElementById("discover-nfts-container");

    if (container && data.nfts) {
      container.innerHTML = data.nfts
        .slice(0, 3)
        .map((nft) => {
          const creator = data.creators.find((c) => c.id === nft.creator_id);

          return renderNFTCard(nft, creator);
        })
        .join("");
    }
  } catch (error) {
    console.error("failed to load NFT's:", error);
  } finally {
    console.log("this is the end");
  }
};

document.addEventListener("DOMContentLoaded", initNFTSection);
// smooth scroll links
const navbarLinks = document.querySelectorAll('#main-header a[href^="#"]');

navbarLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();

    const href = this.getAttribute("href");

    if (href === "#" || href === "#top") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    const section = document.querySelector(href);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  });
});

// explore
$("#marketplace-link").on("click", function (e) {
  e.preventDefault();
  document.getElementById("marketplace").scrollIntoView({
    behavior: "smooth",
  });
});

$("#rankings-link").on("click", function (e) {
  e.preventDefault();
  document.getElementById("Rankings").scrollIntoView({
    behavior: "smooth",
  });
});

$("#trending-link").on("click", function (e) {
  e.preventDefault();
  document.getElementById("trending-collection").scrollIntoView({
    behavior: "smooth",
  });
});

$("#wallet-link").on("click", function (e) {
  e.preventDefault();
  document.getElementById("Connect-a-wallet").scrollIntoView({
    behavior: "smooth",
  });
});
// explore
