const studentList = document.querySelectorAll( '.student-item' );
const itemsPerPage = 10;

// Call default page results.
pagination(studentList, 1);

// Call pagination links.
paginationLinks(studentList);

// Call student search form.
searchForm();

/**
 * Hide student items except for the results displayed on a given page.
 *
 * @param {Array} list - Array of students to show.
 * @param {Number} page - Indicates page number.
 */
function pagination( list, page ) {
    const startIndex = ( page * itemsPerPage ) - itemsPerPage;
    const endIndex = page * itemsPerPage;

    // Show and hide based on start and end indexes.
    for ( let i = 0; i < list.length; i++ ) {
        i >= startIndex && i < endIndex ? list[i].removeAttribute( 'style' ) : list[i].style.display = 'none';
    }
}

/**
 * Create and append the pagination links to the DOM.
 * @param {NodeList} list - List of students.
 */
function paginationLinks( list ) {
    const pageDiv = studentList[0].closest( '.page' );

    const paginationDiv = createElement({
        element: 'div',
        classSelector: 'pagination',
        parent: pageDiv
    });

    const pageList = createElement({
        element: 'ul',
        parent: paginationDiv
    });

    // Create and append li and a elements.
    for ( let i = 1; i <= Math.ceil( list.length / itemsPerPage ); i++ ) {
        const li = createElement({
            element: 'li',
            parent: pageList
        });

        const a = createElement({
            element: 'a',
            attribute: 'href',
            attributeValue: '#',
            content: i,
            parent: li
        });
    }

    // Initial Active Link
    document.querySelector('.pagination a').className = 'active';

    // Call anchor element events.
    linkEvent();
}

/**
 * Events for clicking on pagination links.
 */
function linkEvent() {
    const pageLinks = document.querySelectorAll('.pagination a');

    // Iterate through the links and addEventListener.
    pageLinks.forEach( link => {
        link.addEventListener( 'click', ( event ) => {
            // Prevent browser refresh.
            event.preventDefault();

            // Iterate through the links and remove active class.
            for ( let i = 0; i < pageLinks.length; i++ ) {
                pageLinks[i].removeAttribute( 'class' );
            }

            // Add .active class to clicked link.
            link.className = 'active';

            // Call page results using link text content.
            pagination( studentList, link.textContent );
        });
    });
}

/**
 * Create and append the search form.
 * addEventListeners to the newly created form.
 */
function searchForm() {
    const form = createElement({
        element: 'form',
        classSelector: 'student-search',
        parent: studentList[0].closest( '.page' ).firstElementChild
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
        attribute: 'style',
        attributeValue: 'display: none;',
        content: 'No matches found.',
        sibling: document.querySelector('.page-header'),
        position: 'afterend'
    });

    // addEventListeners to the search form.
    document.querySelector('.student-search').addEventListener('keyup', searchStudents);
    document.querySelector('.student-search').addEventListener('submit', searchStudents);
}

function searchStudents( event ) {
    const studentNames = document.querySelectorAll( '.student-details h3' );
    const input = document.querySelector( '.student-search input' );
    const matches = [];
    let filterCheck = true;

    // Prevent browser refresh on submit event.
    event.preventDefault();

    // Iterate through each student and compare values to the input.
    studentNames.forEach( student => {
        if ( student.textContent.indexOf( input.value ) > -1 ) {
            // Remove "display: none" if present.
            student.closest( '.student-item' ).removeAttribute( 'style' );

            // Push successful matches to the matches array.
            matches.push( student );

            // Change boolean value to ensure errorMessage does not print.
            filterCheck = false;
        } else {
            // Hide student from the list if no match is found.
            student.closest( '.student-item' ).style.display = 'none';
        }
    });

    // Display errorMessage on condition.
    if ( input.value.length > 0 && filterCheck ) {
        document.querySelector('.page > h3').setAttribute( 'style', 'text-align: center; font-weight: bold; padding: 20px 0;' );
    } else {
        document.querySelector('.page > h3').setAttribute( 'style', 'display: none;' );
    }
}

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
    const newElement = document.createElement( element );

    // Check parameters for additional HTML attributes.
    if ( classSelector ) newElement.className = classSelector;
    if ( attribute ) newElement.setAttribute( attribute, attributeValue );
    if ( content ) newElement.textContent = content;
    if ( parent ) parent.appendChild( newElement );
    if ( sibling ) sibling.insertAdjacentElement( position, newElement );

    return newElement;
}
