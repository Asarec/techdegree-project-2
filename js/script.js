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

// Search Event
studentSearchForm.addEventListener ('submit', (event) => {
    const inputValue = inputSearch.value;
    const studentList = document.querySelectorAll('.student-item');

    // Prevent the browser from refreshing on submit.
    event.preventDefault();

    // Clear search bar after submit.
    inputSearch.value = '';

    for ( let i = 0; i < studentList.length; i++ ) {
        let studentName = studentList[i].children[0].children[1].textContent.split(' ');

        if ( studentName.length === 3 ) {
            studentName.splice(1, 1);
        }

        switch ( inputValue.toUpperCase() ) {
            case ( studentList[i].children[0].children[1].textContent.toUpperCase() ):
            case ( studentName[0].toUpperCase() ):
            case ( studentName[1].toUpperCase() ):
                studentList[i].style.display = 'list-item';
                studentList[i].style.border = 'none';
                studentList[i].style.margin = '0';
                studentList[i].style.padding = '0';
                break;

            case ( '' ):
                studentList[i].style.display = 'list-item';
                studentList[i].style.borderBottom = '1px solid #eaeaea';
                studentList[i].style.margin = '0 0 20px 0';
                studentList[i].style.padding = '0 0 20px 0';
                break;

            default:
                studentList[i].style.display = 'none';
        }
    }
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
