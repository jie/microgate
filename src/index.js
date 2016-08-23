import argh from 'argh';
import {
    Application
}
from "./application";

let application = new Application('0.0.0.0', 8000)
application.startUp()
