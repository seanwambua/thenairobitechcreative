/// <reference types="@testing-library/cypress" />

import '@testing-library/cypress/add-commands';
import 'cypress-real-events/support';
import { mount } from 'cypress/react';

declare global {
    namespace Cypress {
        interface Chainable {
            mount: typeof mount;
        }
    }
}

Cypress.Commands.add('mount', mount);
