import Controller from "./Controller";
import Model from "./Model";
import Dispatcher from "./Dispatcher";

class App
{
    public controller:Controller;
    public model:Model;
    public dispatcher:Dispatcher;

    constructor()
    {
        this.controller = new Controller();
        this.model = new Model();
        this.dispatcher = new Dispatcher();
    }


}

export const app = new App();