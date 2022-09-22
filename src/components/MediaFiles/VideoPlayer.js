import React, { Component } from 'react';
import { Player, ControlBar } from 'video-react';

export default class VideoPlayer extends Component {
    constructor(props, context) {
      super(props, context);
      this.src = props.src;
    }

    render() {
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