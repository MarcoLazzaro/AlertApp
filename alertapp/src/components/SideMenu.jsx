import React, {Component} from 'react'

class SideMenu extends Component {
    state = {  }
    render() { 
        return (
            <div className="sidenav">
                <a href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#clients">Clients</a>
                <a href="#contact">Contact</a>
            </div> 
        );
    }
}
 
export default SideMenu;