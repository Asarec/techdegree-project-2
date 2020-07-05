// Retrieve .page-header div for search function.
const pageHeaderDiv = document.querySelector('.page-header');

// Create elements to append for search.
const studentSearchForm = createElement({
    element: 'form',
    classSelector: 'student-search',
    parent: pageHeaderDiv
});

const inputSearch = createElement({
    element: 'input',
    attribute: 'placeHolder',
    attributeValue: 'Search for students...',
    parent: studentSearchForm
});

const searchButton = createElement({
    element: 'button',
    attribute: 'type',
    attributeValue: 'submit',
    content: 'Search',
    parent: studentSearchForm
});

const errorMessage = createElement({
    element: 'h2',
    attribute: 'style',
    attributeValue: 'display: none;',
    content: 'No matches found.',
    sibling: pageHeaderDiv,
    position: 'afterend'
});

// Call function through event listener.
studentSearchForm.addEventListener('keyup', searchStudents);
studentSearchForm.addEventListener('submit', searchStudents);

/**
 * Creates an element with the given parameters and returns it in HTML format.
 *
 * @param {string} param.element
 * @param {string} param.classSelector
 * @param {DOMString} param.attribute
 * @param {DOMString} param.attributeValue
 * @param {HTMLElement} param.parent
 * @param {HTMLElement} param.sibling
 * @param {DOMString} param.position
 * @returns {HTMLElement}
 */
function createElement({ element, classSelector, attribute, attributeValue, content, parent, sibling, position }) {
    const newElement = document.createElement(element);

    // Check parameters for additional HTML attributes.
    if ( classSelector ) newElement.className = classSelector;
    if ( attribute ) newElement.setAttribute( attribute, attributeValue );
    if ( content ) newElement.textContent = content;
    if ( parent ) parent.appendChild( newElement );
    if ( sibling ) sibling.insertAdjacentElement( position, newElement );

    return newElement;
}

/**
 * Filters through the list of students.
 *
 * @param {event} event - The type of event to fire the function.
 */
function searchStudents( event ) {
    const studentNames = document.querySelectorAll('.student-details h3');
    const matches = [];

    // Prevent browser refresh on submit.
    event.preventDefault();

    // Iterate through each student and compare values to inputSearch.
    studentNames.forEach( student => {
        if ( student.textContent.indexOf( inputSearch.value ) > -1 ) {
            // Identify Successful Matches
            student.closest('.student-item').setAttribute('data-match', 'true');

            // Remove "display: none" if present.
            student.closest('.student-item').removeAttribute('style');

            // Push successful matches to the empty array.
            matches.push(student);
        } else {
            // Remove "data-match" if present.
            student.closest('.student-item').removeAttribute('data-match');

            // Hide student from the list if no match is found.
            student.closest('.student-item').style.display = 'none';
        }
    });
}