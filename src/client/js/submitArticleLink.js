function submitArticleLink(event) {
  event.preventDefault();
  let articleLink = document.getElementById("url").value;

  if (Client.validateArticleLink(articleLink) ) {
    getSentiments("http://localhost:8081/getSentiments", {
      url: articleLink,
    }).then((res) => {
      console.log(res.status.code);
      if(res.status.code === "0") {
        if (
          !(
            document.getElementById("subjectivity") &&
            document.getElementById("agreement") &&
            document.getElementById("irony") &&
            document.getElementById("confidence")
          ) 
        ) {
          document.getElementById(
            "results"
          ).innerHTML = `<div class='category' id="agreement">Agreement:</div>
          <div class='category' id="subjectivity">Subjectivity:</div>
          <div class='category' id="confidence">Confidence:</div>
          <div class='category' id="irony">Irony:</div>`;
        }
        document.getElementById(
          "subjectivity"
        ).innerHTML = `<strong> Subjectivity: </strong> ${res.subjectivity}`;
        document.getElementById(
          "agreement"
        ).innerHTML = `<strong> Agreement: </strong> ${res.agreement}`;
        document.getElementById(
          "irony"
        ).innerHTML = `<strong> Irony: </strong> ${res.irony}`;
        document.getElementById(
          "confidence"
        ).innerHTML = `<strong> Confidence: </strong> ${res.confidence}`;
      } else {
        document.getElementById("results").innerHTML = `Something Went Wrong, ${res.status.msg}`;
      }
    }).catch((error) => {
      document.getElementById("results").innerHTML = `Error: ${error}, Reason: ${res.status.msg}`;
    });
  } else {
    document.getElementById("results").innerHTML =
      "<p>Please, Enter a valid URL</p>";
  }
}

const getSentiments = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  try {
    const articleSentiments = await response.json();
    return articleSentiments;
  } catch (error) {
    console.error("error", error);
  }
};
export { submitArticleLink };
