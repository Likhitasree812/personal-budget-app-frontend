describe("Sign up page visualization", () => {
  it("colors are consistent", () => {
    cy.visit("/signup");
    cy.eyesOpen({
      appName: "personal_budget",
      testName: "Sign up visual screen testing",
      browser: { width: 800, height: 600 },
    });
    cy.eyesCheckWindow("Sign Up screen");
    cy.eyesClose();
  });
});
