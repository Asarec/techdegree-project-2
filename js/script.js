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
