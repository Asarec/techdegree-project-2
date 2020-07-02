/** Selected Queries */
const pageHeaderDiv = document.querySelector('.page-header');

/** Created Elements */
const studentSearchForm = createElement({element: 'form', classSelector: 'student-search'});
const inputSearch = createElement({element: 'input', attribute: 'placeholder', attributeValue: 'Search for students...'});
const searchButton = createElement({element: 'button', attribute: 'type', attributeValue: 'submit', content: 'Search'});

/** Appending Childs */
pageHeaderDiv.appendChild(studentSearchForm);
studentSearchForm.appendChild(inputSearch);
studentSearchForm.appendChild(searchButton);

/**
 * Event listener for studentSearchForm
 * @param {KeyboardEvent: keyup}
 * @listens keyup - Fires event when a key is released.
 */
studentSearchForm.addEventListener ('keyup', () => {
    const studentNames = document.querySelectorAll('.student-details');
    const successfulMatches = [];

    // Cycle through each student and compare key input with indexes of student string.
    studentNames.forEach( student => {
        if ( student.children[1].textContent.indexOf( inputSearch.value ) > -1 ) {
            student.parentNode.setAttribute('style', 'display: list-item; border-bottom: 1px solid #eaeaea');

            // Push successful matches to an array.
            successfulMatches.push(student);
        } else {
            student.parentNode.setAttribute('style', 'display: none');
        }
    });

    // Style last list item.
    successfulMatches[successfulMatches.length - 1].parentNode.setAttribute('style', 'display: list-item; border: none; margin: 0; padding: 0');
})

/**
 * Creates an element with the given parameters and returns it in HTML format.
 * @param {string} param.element - HTML Element
 * @param {string} param.classSelector - HTML Class Name
 * @param {string} param.attribute - HTML Attribute
 * @param {string} param.attributeValue - HTML Attribute Value
 * @return {HTMLElement}
 */
function createElement({element, classSelector, attribute, attributeValue, content}) {
    const newElement = document.createElement(element);

    // Checks parameters for additional HTML attributes.
    if ( classSelector ) newElement.className = classSelector;
    if ( attribute ) newElement.setAttribute(attribute, attributeValue);
    if ( content ) newElement.textContent = content;

    return newElement;
}
