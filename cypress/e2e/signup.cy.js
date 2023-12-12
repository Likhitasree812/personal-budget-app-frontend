describe("Sign up feature testing", () => {
    it("Should open sign up page", () => {
      cy.visit("/");
      cy.get(".signup").click();
      cy.wait(500);
      cy.contains("Please sign up").should("exist");
    });
  
    it("Should be able to signup using test credentials", () => {
      cy.visit("/signup");
      cy.contains("Please sign up").should("exist");
      cy.get("#username").type("rapo");
      cy.get("#email").type("ram@gmail.com");
      cy.get("#password").type("ram");
      cy.get("#signupbutton").click();
      cy.wait(200);
      cy.contains("Please sign in").should("exist");
    });
  });