// import "./index.scss";
// import "bootstrap";
// import "bootstrap/dist/css/bootstrap.min.css";
import { library, dom } from "@fortawesome/fontawesome-svg-core";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import HelloWorldButton from "./components/hello-world-button/hello-world-button.js";
import Heading from "./components/heading/heading.js";

library.add(faSpinner);
dom.watch();

const heading = new Heading();
heading.render("hello world");
const helloWorldButton = new HelloWorldButton();
helloWorldButton.render();
