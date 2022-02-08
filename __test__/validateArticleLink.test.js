import { validateArticleLink } from "../src/client/js/validateArticleLink";
describe("Testing the submit functionality", () => {
  test("Testing the validateArticleLink() function", () => {
    expect(
      validateArticleLink(
        "https://www.ibm.com/cloud/learn/natural-language-processing"
      )
    ).toBeTruthy();
  });
});
