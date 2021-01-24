import "./hello-world-button.css";

class HelloWorldButton {
  render() {
    const btn = document.createElement("button");
    btn.innerHTML = "Hello world";
    btn.classList.add("hello-world-button");
    const body = document.querySelector("body");
    btn.onclick = function () {
      const p = document.createElement("p");
      p.innerHTML = "Hello world";
      p.classList.add("hello-world-text");
      body.appendChild(p);
    };
    body.appendChild(btn);
  }
}

export default HelloWorldButton;
