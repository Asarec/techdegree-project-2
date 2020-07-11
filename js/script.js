const studentList = document.querySelectorAll('.student-item');
const itemsPerPage = 10;

// Call first page results.
displayedResults( studentList, 1 );

// Call and display pagination links.
paginationLinks( studentList );

// Call and display search form.
searchForm();

/**
 * Hide or show students based on active pagination link.
 *
 * @param {NodeList | Array} list - Array of students to show.
 * @param {Number} page - Indicates active page number.
 */
function displayedResults( list, page ) {
    const startIndex = ( page * itemsPerPage ) - itemsPerPage;
    const endIndex = page * itemsPerPage;

    // Show and hide students based on start and end indexes.
    for ( let i = 0; i < list.length; i++ ) {
        i >= startIndex && i < endIndex ? list[i].removeAttribute('style') : list[i].style.display = 'none';
    }

    // Adjust last item style to fit design.
    list[endIndex].setAttribute('style', 'margin: 0; padding: 0; border: none;');
}

/**
 * Creates and append pagination links based on the length of the list.
 *
 * @param {NodeList | Array} list
 */
function paginationLinks( list ) {
    const pageDiv = document.querySelector('.page');

    const paginationDiv = createElement({
        element: 'div',
        classSelector: 'pagination',
        parent: pageDiv
    });

    const ul = createElement({
        element: 'ul',
        parent: paginationDiv
    });

    // Creates and append li and a elements.
    for ( let i = 1; i <= Math.ceil( list.length / itemsPerPage ); i++ ) {
        const li = createElement({
            element: 'li',
            parent: ul
        });

        const a = createElement({
            element: 'a',
            attribute: 'href',
            attributeValue: '#',
            content: i,
            parent: li
        });
    }

    // Add active class to initial pagination link and check for null.
    if ( document.querySelector('.pagination a') !== null ) document.querySelector('.pagination a').className = 'active';

    // Call events for pagination links.
    linkEvent( list );
}

/**
 * Generates an event on clicking pagination links.
 *
 * @param {NodeList | Array} list
 */
function linkEvent( list ) {
    const paginationLinks = document.querySelectorAll('.pagination a');

    // Iterate through the links and addEventListener.
    paginationLinks.forEach( link => {
        link.addEventListener('click', ( event ) => {
            // Prevent browser refresh.
            event.preventDefault();

            // Iterate through the links and remove active class.
            for ( let i = 0; i < paginationLinks.length; i++ ) {
                paginationLinks[i].removeAttribute('class');
            }

            // Add active class to clicked link.
            link.className = 'active';

            // Call page results using the link textContent.
            displayedResults( list, link.textContent );
        });
    });
}

/**
 * Creates and appends the student search form.
 * Calls searchStudent function through multiple event listeners.
 */
function searchForm() {
    const pageHeaderDiv = document.querySelector('.page-header');

    const form = createElement({
        element: 'form',
        classSelector: 'student-search',
        parent: pageHeaderDiv
    });

    const input = createElement({
        element: 'input',
        attribute: 'placeholder',
        attributeValue: 'Search for students...',
        parent: form
    });

    const button = createElement({
        element: 'button',
        attribute: 'type',
        attributeValue: 'submit',
        content: 'Search',
        parent: form
    });

    const errorMessage = createElement({
        element: 'h3',
        classSelector: 'js-searchError',
        attribute: 'style',
        attributeValue: 'display: none;',
        content: 'No matches found.',
        sibling: pageHeaderDiv.parentNode.firstElementChild,
        position: 'afterend'
    });

    // addEventListener to student-search form.
    form.addEventListener('keyup', searchStudents);
    form.addEventListener('submit', searchStudents);
}

function searchStudents( event ) {
    const searchInput = document.querySelector('.student-search input');
    const matches = [];

    // Prevent browser refresh on submit.
    event.preventDefault();

    // Iterate through each student's name and compare the value to the search input.
    studentList.forEach( student => {
        if ( student.children[0].children[1].textContent.indexOf( searchInput.value ) > -1 ) {
            // Remove "display: none" if present.
            student.removeAttribute('style');

            // Push successful match to an array.
            matches.push( student );
        } else {
            // Hide student from the list if no match is found.
            student.style.display = 'none';
        }
    });

    // Ensure that results change on letter input.
    if ( searchInput.value.length === 0 ) {
        // Remove current pagination links.
        if ( document.querySelector('.pagination') !== null ) document.querySelector('.pagination').remove();

        // Hide error message.
        document.querySelector('.js-searchError').setAttribute('style', 'display: none;');

        // Display default initial results.
        paginationLinks( studentList );
        displayedResults( studentList, 1 );
    } else if ( matches.length && searchInput.value.length > 0 ) {
        // Remove current pagination links.
        if ( document.querySelector('.pagination') !== null ) document.querySelector('.pagination').remove();

        // Hide error message.
        document.querySelector('.js-searchError').setAttribute('style', 'display: none;');

        // Display pagination links and matching results.
        paginationLinks( matches );
        displayedResults( matches, 1 );
    } else {
        // Remove current pagination links.
        document.querySelector('.pagination').remove();

        // Show error message.
        document.querySelector('.js-searchError').setAttribute('style', 'text-align: center; padding: 20px 0; font-weight: bold;');
    }
}

/**
 * Creates an element with the given parameters and returns it as an HTMLElement.
 *
 * @param {string} param.element
 * @param {string} param.classSelector
 * @param {DOMString} param.attribute
 * @param {DOMString} param.attributeValue
 * @param {HTMLElement} param.parent
 * @param {HTMLElement} param.sibling
 * @param {DOMString} param.position
 *
 * @returns {HTMLElement}
 */
function createElement({ element, classSelector, attribute, attributeValue, content, parent, sibling, position }) {
    const newElement = document.createElement( element );

    // Check parameters for additional HTML attributes and position.
    if ( classSelector ) newElement.className = classSelector;
    if ( attribute ) newElement.setAttribute( attribute, attributeValue );
    if ( content ) newElement.textContent = content;
    if ( parent ) parent.appendChild( newElement );
    if ( sibling ) sibling.insertAdjacentElement( position, newElement );

    return newElement;
}
