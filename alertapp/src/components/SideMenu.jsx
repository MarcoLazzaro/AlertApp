import React, {Component} from 'react';

class SideMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
          visible: false
        };
      }

    render() { 

        return (
            <div className= "sidenav">
                <a onClick={() => this.setState({visible: !this.state.visible})} href="#about">About</a>
                <a href="#services">Services</a>
                <a href="#clients">Clients</a>
                <a href="#contact">Contact</a>
                {this.state.visible && <a href="#lezzo">Lezzo</a>}
            </div> 
        );
    }
}


export default SideMenu;