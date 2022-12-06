/**
 * Returns a postocde lookup module.
 * @param {Object} window  Global window object
 */
function createPostcodeLookup(window) {
    // Define an empty JSON object to temporarily store matched address results.
    // eslint-disable-next-line no-unused-vars
    let tmpAddressSearchResultsJson = {};

    function isSelectedValueInteger(str) {
        const num = Number(str);
        if (Number.isInteger(num)) {
            return true;
        }

        return false;
    }

    function mapSelectionToAddressFormInputs() {
        const selectedValue = this.options[this.selectedIndex].value;
        if (!isSelectedValueInteger(selectedValue)) {
            return;
        }
        const dataset = 'DPA';
        const result = tmpAddressSearchResultsJson[selectedValue][dataset];

        // Clear the form.
        const elements = window.document.querySelectorAll("form input[type='text']");
        elements.forEach(el => {
            const addressInput = el;
            addressInput.value = '';
        });

        // The following is based on the rules for generating multi-line addresses which are
        // documented in Chapter 9 of the AddressBase Premium Getting Started Guide:
        // https://www.ordnancesurvey.co.uk/documents/product-support/getting-started/addressbase-premium-getting-started-guide.pdf

        // Define constants for DPA address components (blank if NULL).
        const dpaOrganisationName = result.ORGANISATION_NAME || '';
        const dpaSubBuildingName = result.SUB_BUILDING_NAME || '';
        const dpaBuildingName = result.BUILDING_NAME || '';
        const dpaBuildingNumber = result.BUILDING_NUMBER || '';
        let dpaPOBoxNumber = result.PO_BOX_NUMBER || '';
        const dpaDependentThoroughfareName = result.DEPENDENT_THOROUGHFARE_NAME || '';
        const dpaThoroughfareName = result.THOROUGHFARE_NAME || '';
        const dpaDependentLocality = result.DEPENDENT_LOCALITY || '';
        const dpaPostTown = result.POST_TOWN;
        const dpaPostcode = result.POSTCODE;
        const dpaCounty = result.LOCAL_CUSTODIAN_CODE_DESCRIPTION;

        // Add a "PO BOX " prefix to the PO Box Number integer.
        if (dpaPOBoxNumber !== '') {
            dpaPOBoxNumber = `PO BOX ${dpaPOBoxNumber}`;
        }

        // Remove empty values from the array
        const thoroughfareLocality = [
            dpaDependentThoroughfareName,
            dpaThoroughfareName,
            dpaDependentLocality
        ].filter(item => item);

        const premises = [];
        if (dpaSubBuildingName !== '') {
            premises.push(dpaSubBuildingName);
        }

        let premisesThoroughfareLocality = '';
        // Define a regular expression to test for a letter suffix (e.g. '11A') or number
        // range (e.g. '110-114'). Combine the first values from the premises and thoroughfare
        const regex = /(^[0-9]+[a-zA-Z]$)|(^[0-9]+-[0-9]+$)/;
        if (regex.test(dpaBuildingName)) {
            // add to thouroughfare
            premisesThoroughfareLocality = `${dpaBuildingName} ${thoroughfareLocality[0]}`;
            thoroughfareLocality.shift();
        } else {
            premises.push(dpaBuildingName);
        }

        if (dpaBuildingNumber !== '') {
            premisesThoroughfareLocality = `${dpaBuildingNumber} ${thoroughfareLocality[0]}`;
            thoroughfareLocality.shift();
        }

        let addressLines = [];

        // Push the Organisation Name and PO Box Number to the address array.
        addressLines.push(dpaPOBoxNumber, dpaOrganisationName);

        // Merge the structured premises and thoroughfare components into the address array.
        addressLines = addressLines.concat(premises);
        addressLines = addressLines.concat(premisesThoroughfareLocality);
        addressLines = addressLines.concat(thoroughfareLocality);

        // Remove any duplicates and blanks from the address array.
        addressLines = [...new Set(addressLines)];
        addressLines = addressLines.filter(item => item);

        const [selectionLine1, selectionLine2, selectionLine3] = addressLines;

        const addressLine1 = window.document.querySelector('[id *= "street"]');
        addressLine1.value = selectionLine1;

        const addressLine2 = window.document.querySelector('[id *= "street-2"]');
        addressLine2.value = selectionLine2 || '';

        const addressLine3 = window.document.querySelector('[id *= "street-3"]');
        addressLine3.value = selectionLine3 || '';

        const addressTown = window.document.querySelector('[id *= "town-or-city"]');
        addressTown.value = dpaPostTown;

        const addressCounty = window.document.querySelector('[id *= "county"]');
        addressCounty.value = dpaCounty;

        const addressPostcode = window.document.querySelector('[id *= "postcode"]');
        addressPostcode.value = dpaPostcode;
    }

    let selectElementResults;

    function addSearchResultsToSelectElement(data) {
        const options = window.document.querySelectorAll('#address-search-results-dropdown option');
        options.forEach(option => option.remove());

        // Update the JSON object with the data results.
        tmpAddressSearchResultsJson = data.results;
        const option = window.document.createElement('option');
        option.text =
            data.header.totalresults === 1
                ? '1 address found'
                : `${data.header.totalresults} addresses found`;
        selectElementResults.add(option);

        // See also {@link https://apidocs.os.uk/reference/os-places-dpa-output}
        const dataset = 'DPA';
        // Loop through the data results; adding the address string as a new option
        // to the results drop-down list.
        data.results.forEach(function addElements(val, i) {
            const opt = window.document.createElement('option');
            opt.value = i;
            opt.text = val[dataset].ADDRESS;
            selectElementResults.add(opt);
        });

        // Display the hidden search results div
        const searchResultsDiv = window.document.getElementById('address-search-results');
        searchResultsDiv.style.display = 'block';
        selectElementResults.focus();
    }

    let addressSearchDiv;

    function displayFieldErrors() {
        const errorInnerSpan = window.document.createElement('span');
        errorInnerSpan.setAttribute('class', 'govuk-visually-hidden');
        const errorInnerSpanText = window.document.createTextNode('Error:');
        errorInnerSpan.appendChild(errorInnerSpanText);

        const errorOuterSpan = window.document.createElement('span');
        errorOuterSpan.setAttribute('id', 'address-search-input-error');
        errorOuterSpan.setAttribute('class', 'govuk-error-message');
        const errorOuterSpanText = window.document.createTextNode('Enter a valid postcode');
        errorOuterSpan.appendChild(errorOuterSpanText);
        errorOuterSpan.appendChild(errorInnerSpan);

        const addressSearchInput = window.document.getElementById('address-search-input');
        addressSearchInput.setAttribute(
            'class',
            'govuk-input govuk-input--error govuk-input--width-10'
        );
        addressSearchInput.setAttribute('aria-describedby', 'address-search-input-error');

        addressSearchInput.insertAdjacentElement('beforebegin', errorOuterSpan);

        addressSearchDiv.setAttribute('class', 'govuk-form-group govuk-form-group--error');
        addressSearchDiv.className = 'govuk-form-group govuk-form-group--error';
    }

    function displayErrorSummary() {
        const errorAnchor = window.document.createElement('a');
        const link = window.document.createTextNode('Enter a valid postcode');
        errorAnchor.appendChild(link);
        errorAnchor.href = '#address-search-input';

        const error = window.document.createElement('li');
        error.appendChild(errorAnchor);

        const errorList = window.document.createElement('ul');
        errorList.setAttribute('class', 'govuk-list govuk-error-summary__list');
        errorList.appendChild(error);

        const errorSummaryBody = window.document.createElement('div');
        errorSummaryBody.appendChild(errorList);

        const errorHeading = window.document.createElement('h2');
        errorHeading.setAttribute('class', 'govuk-error-summary__title');
        errorHeading.setAttribute('id', 'error-summary-title');
        const errorHeadingText = window.document.createTextNode('There is a problem');
        errorHeading.appendChild(errorHeadingText);

        const errorSummary = window.document.createElement('div');
        errorSummary.setAttribute('class', 'govuk-error-summary');
        errorSummary.setAttribute('aria-labelledby', 'error-summary-title');
        errorSummary.setAttribute('role', 'alert');
        errorSummary.setAttribute('tabindex', '-1');
        errorSummary.setAttribute('data-module', 'govuk-error-summary');

        errorSummary.appendChild(errorHeading);
        errorSummary.appendChild(errorSummaryBody);

        const form = window.document.querySelector('form');
        form.insertAdjacentElement('afterbegin', errorSummary);
    }

    function removeErrorMessages() {
        const errorSummary = window.document.querySelector('.govuk-error-summary');
        if (errorSummary) {
            errorSummary.remove();
        } else {
            return;
        }

        const errorSpans = window.document.querySelectorAll('.govuk-error-message');
        errorSpans.forEach(errorSpan => {
            errorSpan.remove();
        });

        const errorInputs = window.document.querySelectorAll('.govuk-input--error');
        errorInputs.forEach(errorInput => {
            const inputClass = errorInput.getAttribute('class');
            errorInput.setAttribute('class', inputClass.replace('govuk-input--error', ''));
            errorInput.removeAttribute('aria-describedby');
        });

        const errorDivs = window.document.querySelectorAll('.govuk-form-group--error');
        errorDivs.forEach(errorDiv => {
            errorDiv.setAttribute('class', 'govuk-form-group');
        });
    }

    function displayErrors() {
        displayErrorSummary();
        displayFieldErrors();
    }

    async function addressSearch() {
        removeErrorMessages(window);
        const addressSearchInput = window.document.getElementById('address-search-input').value;

        // test for a valid postcode
        if (addressSearchInput === '') {
            displayErrors();
            return;
        }

        const response = await fetch(`/address-finder/postcode?postcode=${addressSearchInput}`);
        if (!response.ok) {
            // throw new Error(`HTTP error! status: ${response.status}`);
            // TODO proper error handling
            const msg = 'TBC API Error Status error handling.';
            throw msg;
        }

        const data = await response.json();

        // TODO add proper error handling for no results found
        if (data.header.totalresults === 0 || !data.results) {
            const msg = 'TBC No matching results found.';
            throw msg;
        }

        addSearchResultsToSelectElement(data);
    }

    function createContentElements() {
        const descriptionDiv = window.document.createElement('div');
        descriptionDiv.appendChild(
            window.document.createTextNode(
                'Enter a UK postcode to search for your address, or fill out the fields manually.'
            )
        );
        descriptionDiv.setAttribute('id', 'fill-out-the-fields-manually-hint');
        descriptionDiv.setAttribute('class', 'govuk-hint');
        window.document
            .querySelector('.govuk-form-group')
            .insertAdjacentElement('beforeBegin', descriptionDiv);
    }

    function createPostcodeSearchElements() {
        const addressSearchLabelContent = window.document.createTextNode('Postcode');

        const addressSearchLabel = window.document.createElement('label');
        addressSearchLabel.appendChild(addressSearchLabelContent);
        addressSearchLabel.setAttribute('class', 'govuk-label');
        addressSearchLabel.setAttribute('for', 'address-search-input');

        const addressSearchInput = window.document.createElement('input');
        addressSearchInput.setAttribute('class', 'govuk-input govuk-input--width-10');
        addressSearchInput.setAttribute('id', 'address-search-input');
        addressSearchInput.setAttribute('name', 'address-search-input');
        addressSearchInput.setAttribute('type', 'search');
        addressSearchInput.setAttribute('autocomplete', 'postal-code');

        addressSearchInput.addEventListener('keypress', function(event) {
            if (event.code === 'Enter') {
                event.preventDefault();
                window.document.getElementById('search-button').click();
            }
        });

        addressSearchDiv = window.document.createElement('div');
        addressSearchDiv.setAttribute('id', 'address-search');
        addressSearchDiv.setAttribute('class', 'govuk-form-group');
        addressSearchDiv.appendChild(addressSearchLabel);
        addressSearchDiv.appendChild(addressSearchInput);

        window.document
            .getElementById('fill-out-the-fields-manually-hint')
            .insertAdjacentElement('afterend', addressSearchDiv);
    }

    function createFindAddressButton() {
        const searchButton = window.document.createElement('button');
        searchButton.setAttribute('id', 'search-button');
        searchButton.setAttribute('class', 'govuk-button govuk-button--secondary');
        searchButton.setAttribute('data-module', 'govuk-button');
        searchButton.setAttribute('type', 'button');
        searchButton.appendChild(window.document.createTextNode('Find Address'));
        window.document
            .getElementById('address-search')
            .insertAdjacentElement('afterend', searchButton);

        searchButton.addEventListener('click', addressSearch);
    }

    function createSearchResultsElements() {
        // CREATE INITALLY HIDDEN SEARCH RESULTS SELECT ELEMENT
        const addressSearchResultsLabel = window.document.createElement('label');
        addressSearchResultsLabel.appendChild(window.document.createTextNode('Select an address'));
        addressSearchResultsLabel.setAttribute('class', 'govuk-label');
        addressSearchResultsLabel.setAttribute('for', 'address-search-results-dropdown');

        const searchResults = window.document.createElement('select');
        searchResults.setAttribute('class', 'govuk-select');
        searchResults.setAttribute('id', 'address-search-results-dropdown');
        searchResults.setAttribute('name', 'address-search-results-dropdown');
        searchResults.appendChild(addressSearchResultsLabel);

        const searchResultsDiv = window.document.createElement('div');
        searchResultsDiv.setAttribute('class', 'govuk-form-group');
        searchResultsDiv.setAttribute('id', 'address-search-results');
        searchResultsDiv.setAttribute('name', 'address-search-results');
        searchResultsDiv.setAttribute('role', 'region');
        searchResultsDiv.setAttribute('aria-live', 'polite');
        searchResultsDiv.appendChild(addressSearchResultsLabel);
        searchResultsDiv.appendChild(searchResults);
        searchResultsDiv.style.display = 'none';

        window.document
            .getElementById('search-button')
            .insertAdjacentElement('afterend', searchResultsDiv);

        searchResults.addEventListener('change', mapSelectionToAddressFormInputs);

        selectElementResults = window.document.getElementById('address-search-results-dropdown');
    }

    function addRemovePostcodeInputTextOnSubmitHandler() {
        const form = window.document.getElementsByTagName('form')[0];
        form.addEventListener('submit', () => {
            window.document.getElementById('address-search-input').removeAttribute('name');
            window.document
                .getElementById('address-search-results-dropdown')
                .removeAttribute('name');
        });
    }

    function init() {
        // CHECK FOR EXISTENCE OF REQUIRED ADDRESS FIELDS
        if (window.document.querySelector('[id *= "q-applicant-building-and-street"]') == null) {
            return;
        }
        createContentElements();
        createPostcodeSearchElements();
        createFindAddressButton();
        createSearchResultsElements();
        addRemovePostcodeInputTextOnSubmitHandler();
    }

    return Object.freeze({
        init
    });
}

export default createPostcodeLookup;
