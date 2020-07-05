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

// Call function through event listener.
studentSearchForm.addEventListener('keyup', searchStudents);
studentSearchForm.addEventListener('submit', searchStudents);

/**
 * Creates an element with the given parameters and returns it in HTML format.
 *
 * @param {string} param.element
 * @param {string} param.classSelector
 * @param {string} param.attribute
 * @param {string} param.attributeValue
 * @param {HTMLElement} param.parent
 * @returns {HTMLElement}
 */
function createElement({ element, classSelector, attribute, attributeValue, content, parent }) {
    const newElement = document.createElement(element);

    // Check parameters for additional HTML attributes.
    if ( classSelector ) newElement.className = classSelector;
    if ( attribute ) newElement.setAttribute( attribute, attributeValue );
    if ( content ) newElement.textContent = content;
    if ( parent ) parent.appendChild( newElement );

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
            student.closest('.student-item').removeAttribute('style');

            matches.push();
        } else {
            student.closest('.student-item').removeAttribute('data-match');
            student.closest('.student-item').style.display = 'none';
        }
    });
}