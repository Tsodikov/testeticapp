import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';

export default class VideoPlayer extends Component {
    constructor(props, context) {
      super(props, context);
      this.src = props.src;
    }
  
    // componentDidMount() {
    //   this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    // }

    render() {
        console.log('asdkjfa skdjfjadsf kasdjfajsdf ksadfj kasdjf asdjf')
        return (
            <Player
                ref={player => {
                    this.player = player;
                }}
                autoPlay>
            <source src={this.src} />
            <ControlBar autoHide={false} />
            </Player>
        )
    }
}