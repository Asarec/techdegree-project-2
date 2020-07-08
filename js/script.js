const pageHeaderDiv = document.querySelector( '.page-header' );

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
    element: 'h3',
    attribute: 'style',
    attributeValue: 'display: none',
    content: 'No matches found.',
    sibling: pageHeaderDiv,
    position: 'afterend'
});

// Call studentSearchForm on specified event.
studentSearchForm.addEventListener( 'keyup', searchStudents );
studentSearchForm.addEventListener( 'submit', searchStudents );

/**
 * Creates an element with the given parameters and returns it as HTMLElement.
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
 * Prints an error message on no matches found.
 *
 * @param {event} event - The type of event to call the function.
 */
function searchStudents( event ) {
    const studentNames = document.querySelectorAll( '.student-details h3' );
    const matches = [];
    let filterCheck = true;

    // Prevent browser refresh on submit event.
    event.preventDefault();

    // Iterate through each student and compare values to inputSearch.
    studentNames.forEach( student => {
        if ( student.textContent.indexOf( inputSearch.value ) > -1 ) {
            // Remove "display: none" if present.
            student.closest( '.student-item' ).removeAttribute( 'style' );

            // Push successful matches to the matches array.
            matches.push( student );

            // Store inputSearch.value for errorMessage check.
            filterCheck = false;
        } else {
            // Hide student from the list if no match is found.
            student.closest( '.student-item' ).style.display = 'none';
        }
    });

    // Adjust style for last list item shown.
    if ( matches.length ) matches[ matches.length - 1 ].closest('.student-item').setAttribute('style', 'margin: 0; padding: 0; border-bottom: none;');

    // Display errorMessage on condition.
    if ( inputSearch.value.length > 0 && filterCheck ) {
        errorMessage.setAttribute('style', 'text-align: center; font-weight: bold; padding: 20px 0;');
    } else {
        errorMessage.setAttribute('style', 'display: none;');
    }
}