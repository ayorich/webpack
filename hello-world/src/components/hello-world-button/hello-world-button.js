import "./hello-world-button.scss";

class HelloWorldButton {
  buttoncssclass = "hello-world-button";

  render() {
    const btn = document.createElement("button");
    btn.innerHTML = "Hello world";
    btn.classList.add(this.buttoncssclass);
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
