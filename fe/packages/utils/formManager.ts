/* eslint-disable max-len */
import { VALUE_REQUIRED_FORM } from '@packages/components/View/AsyncTable/utils';
import { FormInstance } from 'antd';
import _ from 'lodash';

class FormManagers {
  items: { [x: string]: FormInstance } = {};

  /**
   * Adds new form instances to the form manager's items if they meet specific conditions.
   *
   * @param payload - An object containing form instances to be added, where the keys are form identifiers.
   *
   * The method performs the following steps:
   * 1. Iterates over the keys of the `payload` object.
   * 2. Retrieves the current application state from the store.
   * 3. Extracts the `requiredForm` object from the state, which defines the forms required for the active schema.
   * 4. Checks the user's type (`isPerson` or `isOrganization`) from the `currentUser` object.
   * 5. For each required form:
   *    - Finds the DOM element corresponding to the required form and checks if it contains the form being added.
   *    - If the user is a person and the required form is not marked as required for personal use, skips adding the form.
   *    - If the user is an organization and the required form is not marked as required for organizational use, skips adding the form.
   * 6. If all conditions are met, merges the `payload` into the existing `items` of the form manager.
   */
  add(payload: { [x: string]: FormInstance }, isDuThao?: boolean) {
    if (isDuThao) {
      this.items = {
        ...this.items,
        ...payload,
      };
      return;
    }

    Object.keys(payload).forEach(
      (formKey) => {
        // @ts-expect-error should work
        const { currentSchema } = window;
        const requiredForm = _.get(currentSchema, 'requiredForm', {});

        // @ts-expect-error should exist
        const user = typeof currentUser !== 'undefined' ? currentUser : null;
        const isPerson = user?.isPerson ?? false;
        const isOrganization = user?.isOrganization ?? false;

        Object.keys(requiredForm).forEach((key) => {
          const formWrapper = document.getElementById(key);

          if (formWrapper?.contains(document.getElementById(formKey))) {
            const isRequireForOrg = _.find(requiredForm[key], { value: VALUE_REQUIRED_FORM.ORGANIZATION }).checked;
            const isRequireForPerson = _.find(requiredForm[key], { value: VALUE_REQUIRED_FORM.PERSONAL }).checked;

            if (
              isPerson && !isRequireForPerson
            ) {
              return;
            }

            if (
              isOrganization && !isRequireForOrg
            ) {
              return;
            }

            if (!isRequireForOrg && !isRequireForPerson) return;

            this.items = {
              ...this.items,
              ...payload,
            };
          }
        });
      },
    );
  }

  remove(key: string) {
    delete this.items[key];
  }

  getItem(key: string) {
    const form = this.items[key];

    if (form) return form;
  }
}

export const formManagers = new FormManagers();
