const container = document.querySelector('#container');

const content = document.createElement('div');
content.classList.add('content');
content.textContent = 'This is the glorious text-content!';

container.appendChild(content);

const paragraph = document.createElement('p');
paragraph.textContent = "Hey I’m red!";
paragraph.style.color = 'red';
container.appendChild(paragraph);

const headerBlue = document.createElement('h3');
headerBlue.textContent = "I’m a blue h3!";
headerBlue.style.color = 'blue';
container.appendChild(headerBlue);

const myDiv = document.createElement('div');
myDiv.style.cssText = 'border-style: solid; border-color: black; background-color: pink;';


const myHeader = document.createElement('h1');
myHeader.textContent = "I’m in a div";
myDiv.appendChild(myHeader);

const paragraphInDiv = document.createElement('p');
paragraphInDiv.textContent = "ME TOO!";
myDiv.appendChild(paragraphInDiv);

container.appendChild(myDiv);