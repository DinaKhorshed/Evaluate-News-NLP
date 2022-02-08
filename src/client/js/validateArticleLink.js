import isURL from "validator/lib/isURL";
function validateArticleLink(url) {
  if (!isURL(url)) {
    return false;
  } else {
    return true;
  }
}

export { validateArticleLink };
