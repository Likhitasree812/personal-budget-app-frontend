describe("Login feature testing", () => {
  it("should display homepage", () => {
    cy.visit("/");
    cy.contains(
      "A Personal Budget app helpful to easily manage your budgets and expenses"
    ).should("exist");
  });

  it("Should open login page", () => {
    cy.visit("/");
    cy.get(".login").click();
    cy.wait(500);
    cy.contains("Please sign in").should("exist");
  });

  const executeLogin = () => {
    cy.visit("/login");
    cy.contains("Please sign in").should("exist");
    cy.get("#email").type("latla@uncc.edu");
    cy.get("#password").type("likhita");
    cy.get(".signin").click();
    cy.wait(200);
  };

  it("Should be able to login using test credentials", () => {
    executeLogin();
    cy.contains("Dashboard").should("exist");
    cy.contains("Add Budget").should("exist");
    cy.contains("Add Expense").should("exist");
  });

  it("Once logged in should be able to logout", () => {
    executeLogin();
    cy.get(".logout").click();
    cy.wait(200);
    cy.contains("Please sign in").should("exist");
  });
});
