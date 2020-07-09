const studentList = document.querySelectorAll( '.student-item' );
const itemsPerPage = 10;

pagination(studentList, 1);
paginationLinks(studentList);

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
