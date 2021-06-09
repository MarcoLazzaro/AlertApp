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
                <a onClick={() => this.setState({visible: !this.state.visible})} href="#settings">Settings</a>
                <a href="#Abaut">About</a>
            </div> 
        );
    }
}


export default SideMenu;


//TODO: Change href to settings