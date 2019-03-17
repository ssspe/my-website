import React, { Component } from 'react';
import logo from '../static/images/logo.svg';
import background from '../static/images/big-background.svg';
import arcade1 from '../static/images/drawing-1.svg';
import arcade1_light from '../static/images/drawing-1-light.svg';
import arcade2 from '../static/images/drawing-2.svg';
import arcade2_light from '../static/images/drawing-2-light.svg';
import arcade3 from '../static/images/drawing-3.svg';
import arcade3_light from '../static/images/drawing-3-light.svg';
import _ from 'lodash';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {loaded: false, which: 0};
      this.light_drawings = {
        0: arcade1_light,
        1: arcade2_light,
        2: arcade3_light
      }

      this.drawings = {
        0: arcade1,
        1: arcade2,
        2: arcade3
      }

      this.padding = 100;
    }

    componentDidUpdate(prevProps, prevState) {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      var image = new Image();
      var which = this.state.which;

      if (this.state.loaded && !prevState.loaded) {
        image.src = this.light_drawings[which];

        image.onload = () => {
          var imgWidth = (image.width * 0.3) * which;
          var padding = this.padding * which;
          var addOn = imgWidth + padding;
          console.log(this.padding);
          ctx.drawImage(image, addOn, 0, image.width * 0.3, image.height * 0.3);
        }
      } else if (!this.state.loaded && prevState.loaded){
        console.log(this.state);
        image.src = this.drawings[which];

        image.onload = () => {
          var imgWidth = (image.width * 0.3) * which;
          var padding = this.padding * which;
          var addOn = imgWidth + padding;
          console.log(this.padding);
          ctx.drawImage(image, addOn, 0, image.width * 0.3, image.height * 0.3);
        }
      }
    }

    componentDidMount() {
      var xPos = 0;
      var yPos = 0;
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');

      var model = [];
      var images = [arcade1, arcade2, arcade3];
      _.each(images, (val, i) => {
          this.drawArcadeMachine(val, i, ctx, (rect) => {
            model.push(rect);
          });
      });

      canvas.addEventListener('mousemove', (e) => {
        const pos = {
          x: e.clientX,
          y: e.clientY
        };
        var bool = false;
        for (var i = 0 ; i < model.length ; i++) {
          if (model[i].contains(pos.x, pos.y)) {
            bool = true;
            this.setState({which: i})
          }
        }
        this.setState({loaded: bool})
      });
    }

    drawArcadeMachine = (source, index, ctx, func) => {
      var image = new Image();
      image.src = source;
      image.onload = () => {
          ctx.drawImage(image,0 + ((image.width*0.3) * index) + (this.padding * index),0,image.width * 0.3, image.height * 0.3);
          var rect = new this.Rectangle(0 + ((image.width*0.3) * index) + (this.padding * index),0,image.width * 0.3, image.height * 0.3);
          func(rect);
      }
    }

    Rectangle(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;

        this.contains = function(x, y) {
            return (x > this.x && x <= (this.x + this.w) &&
                y > this.y && y <= (this.y + this.h));
        }
    }

    render() {
      return(
        <div className="container">
          <img className="backgroundImage" ref="image" src={background} />
          <canvas className="canvas" ref="canvas" width={window.innerWidth} height={window.innerHeight} />
        </div>
      )
    }
}

export default Home;
