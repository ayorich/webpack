import "./navigation-bar.scss";
class NavigationBar {
  render(navigationItems) {
    const listItems = navigationItems.map((navItem) => {
      return `
    <li>
<a href="${navItem.url}">${navItem.title}</a>
    </li>
    `;
    });

    const ul = document.createElement("ul");
    ul.innerHTML = listItems.join("");
    ul.classList.add("navigation-bar");
    document.querySelector("body").appendChild(ul);
  }
}

export default NavigationBar;
