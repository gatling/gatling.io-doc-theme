import Cookies from "js-cookie";

const HS_INITIAL_OPT_IN = "__hs_initial_opt_in";
const HS_OPT_OUT = "__hs_opt_out";

const COOKIE_CONFIRMATION = "hs-eu-cookie-confirmation";
const CONFIRMATION_BUTTON = "hs-eu-confirmation-button";
const DECLINE_BUTTON = "hs-eu-decline-button";

const cookieConfirmation = document.getElementById(COOKIE_CONFIRMATION);

if (typeof Cookies.get(HS_OPT_OUT) === "undefined" && cookieConfirmation) {
  cookieConfirmation.removeAttribute("style");

  let cookieOptions = [];
  cookieOptions["domain"] = window.location.hostname;
  cookieOptions["sameSite"] = "lax";
  cookieOptions["expires"] = 30;

  document
    .getElementById(CONFIRMATION_BUTTON)
    .addEventListener("click", function () {
      Cookies.set(HS_INITIAL_OPT_IN, "true", cookieOptions);
      Cookies.set(HS_OPT_OUT, "no", cookieOptions);
      cookieConfirmation.parentNode.removeChild(cookieConfirmation);
    });

  document
    .getElementById(DECLINE_BUTTON)
    .addEventListener("click", function () {
      Cookies.set(HS_OPT_OUT, "yes", cookieOptions);
      cookieConfirmation.parentNode.removeChild(cookieConfirmation);
    });
}
