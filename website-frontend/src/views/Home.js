import React, { Component } from 'react';
import logo from '../static/images/logo.svg';
import background from '../static/images/background.jpg';

class Home extends Component {
    constructor(props) {
      super(props);
      this.state = {loaded: false};
    }
    componentDidMount() {
      var xPos = 0;
      var yPos = 0;
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d');
      ctx.canvas.width  = window.innerWidth;
      ctx.canvas.height = window.innerHeight;

      // draw circles


      var imageObj1 = new Image();
      imageObj1.src = background;
      imageObj1.onload = function() {
              ctx.drawImage(imageObj1,xPos,yPos);
      }
      var model = [];
      model.push(new this.Rectangle(0,0,150,window.innerHeight));
      model.push(new this.Rectangle(window.innerWidth - 150,0,150,window.innerHeight));

      canvas.addEventListener('mousemove', (e) => {
        const pos = {
          x: e.clientX,
          y: e.clientY
        };

        for (var i = 0 ; i < model.length ; i++) {
         if (model[i].contains(pos.x, pos.y))
          console.log("Intersects");
        }
      });
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
        <div>
          <canvas ref="canvas" width={640} height={425} />
        </div>
      )
    }
}

export default Home;
