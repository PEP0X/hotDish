// === Loading ===
$(window).on("load", function () {
  setTimeout(function () {
    $("#loading").fadeOut();
  }, 500);
});

// === Nav Collapse & Arrow Change ===
$(() => {
  const nav = $("nav");
  const arrow = $(".arrow img");
  const navItems = $("nav .nav-content li");

  if (nav.hasClass("collapsed")) {
    arrow.attr("src", "./images/icons/Arrow-Nav-Right.svg");
    $("nav .arrow").addClass("right-[-40px]");
    nav.css({ left: "-250px" }); // Ensure the nav is positioned correctly
    navItems.hide();
  } else {
    arrow.attr("src", "./images/icons/Arrow-Nav-Left.svg");
    $("nav .arrow").addClass("right-[-20px]");
  }

  $(".arrow img").on("click", function () {
    const isCollapsed = nav.hasClass("collapsed");

    if (isCollapsed) {
      navItems.slideDown(700);
      nav.animate({ left: "0" }, 500, function () {
        arrow.attr("src", "./images/icons/Arrow-Nav-Left.svg");
        $("nav .arrow").removeClass("right-[-40px]").addClass("right-[-20px]");
      });
    } else {
      navItems.slideUp(500);
      nav.animate({ left: "-250px" }, 500, function () {
        arrow.attr("src", "./images/icons/Arrow-Nav-Right.svg");
        $("nav .arrow").removeClass("right-[-20px]").addClass("right-[-40px]");
      });
    }

    nav.toggleClass("collapsed");
  });
});
