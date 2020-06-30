/**
 * Creates an element with the given parameters and returns it in HTML format.
 * @param {string} param.element - HTML Element
 * @param {string} param.classSelector - HTML Class Name
 * @param {string} param.attribute - HTML Attribute
 * @param {string} param.attributeValue - HTML Attribute Value
 * @return {HTMLElement}
 */
function createElement({element, classSelector, attribute, attributeValue}) {
    const newElement = document.createElement(element);

    // Checks parameters for additional HTML attributes.
    if (classSelector) newElement.className = classSelector;
    if (attribute) newElement.setAttribute(attribute, attributeValue);

    return newElement;
}

// Test Function
console.log(createElement({element: 'div', classSelector: 'class-name'}));