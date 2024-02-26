describe("Millenium Falcon", { defaultCommandTimeout: 10000 }, () => {
    it("should complete the team setup and launch the starship", () => {
        cy.visit("/");

        // Click on a button with a <span>Built your team</span>
        cy.contains("span", "Build your team").click();

        // Click on the dropdown button with text "Select 4 crew members"
        cy.contains("button", "Select 4 crew members").click();

        // Click on 4 options from the PeopleDropdown component
        cy.contains("li", "Luke Skywalker").click();
        cy.contains("li", "R2-D2").click();
        cy.contains("li", "Darth Vader").click();
        cy.contains("li", "C-3PO").click();

        // Click a button with a "Next" text
        cy.contains("button", "Next").click();

        // Click on the dropdown button with text "Select 6 passengers"
        cy.contains("button", "Select 6 passengers").click();

        // Click on 6 options from the PeopleDropdown component
        cy.contains("li", "Owen Lars").click();
        cy.contains("li", "Leia Organa").click();
        cy.contains("li", "R5-D4").click();
        cy.contains("li", "Biggs Darklighter").click();
        cy.contains("li", "Obi-Wan Kenobi").click();
        cy.contains("li", "Beru Whitesun lars").click();

        // Click a button with a "Let's take off" text
        cy.contains("button", "Let's take off").click();

        // Click a button with a "Launch" text
        cy.contains("button", "Launch").click();

        // Wait 5 seconds for the countdown
        cy.wait(5000);

        // Wait 4 seconds for the animation
        cy.wait(4000);

        cy.contains("h2", "Great Job!").should("be.visible");
    });

    it("should show an error message if less than 4 crew members are selected", () => {
        cy.visit("/");

        // Click on a button with a <span>Built your team</span>
        cy.contains("span", "Build your team").click();

        // Click on the dropdown button with text "Select 4 crew members"
        cy.contains("button", "Select 4 crew members").click();

        // Click on 3 options from the PeopleDropdown component
        cy.contains("li", "Luke Skywalker").click();
        cy.contains("li", "R2-D2").click();
        cy.contains("li", "Darth Vader").click();

        // Press the Escape key to close the dropdown menu
        cy.get("body").type("{esc}");

        // Click a button with a "Next" text
        cy.contains("button", "Next").click();

        // Check if the error message is displayed
        cy.contains("p", "Please select 4 crew members").should("be.visible");

        // Wait for 3 seconds
        cy.wait(3000);

        // Check if the error message disappears after 3 seconds
        cy.contains("p", "Please select 4 crew members").should("not.exist");
    });

    it("should show an error message if less than 6 passengers are selected", () => {
        cy.visit("/");

        // Click on a button with a <span>Built your team</span>
        cy.contains("span", "Build your team").click();

        // Click on the dropdown button with text "Select 4 crew members"
        cy.contains("button", "Select 4 crew members").click();

        // Click on 4 options from the PeopleDropdown component
        cy.contains("li", "Luke Skywalker").click();
        cy.contains("li", "R2-D2").click();
        cy.contains("li", "Darth Vader").click();
        cy.contains("li", "C-3PO").click();

        // Click a button with a "Next" text
        cy.contains("button", "Next").click();

        // Click on the dropdown button with text "Select 6 passengers"
        cy.contains("button", "Select 6 passengers").click();

        // Click on 4 options from the PeopleDropdown component
        cy.contains("li", "Owen Lars").click();
        cy.contains("li", "Leia Organa").click();
        cy.contains("li", "R5-D4").click();
        cy.contains("li", "Biggs Darklighter").click();

        // Press the Escape key to close the dropdown menu
        cy.get("body").type("{esc}");

        // Click a button with a "Next" text
        cy.contains("button", "Let's take off").click();

        // Check if the error message is displayed
        cy.contains("p", "Please select 6 passengers").should("be.visible");

        // Wait for 3 seconds
        cy.wait(3000);

        // Check if the error message disappears after 3 seconds
        cy.contains("p", "Please select 6 passengers").should("not.exist");
    });

    it("should trigger searching of the dropdown list", () => {
        // Load the URL "/"
        cy.visit("/");

        // Click on a button with a <span>Built your team</span>
        cy.contains("span", "Build your team").click();

        // Click on the dropdown button with text "Select 4 crew members"
        cy.contains("button", "Select 4 crew members").click();

        // Type the letter "e" in the search input field to trigger a search
        cy.get('input[type="search"]').type("e");

        // Check for loaders
        cy.get(".loader").should("have.length", 10);

        // Wait for a while until the loaders disappear
        cy.get(".loader").should("not.exist");

        // Check if a list of 10 "li" tags appears as options
        cy.get(".people-dropdown--list li").should("have.length", 10);
    });
});
