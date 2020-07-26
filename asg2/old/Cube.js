class Cube{
   constructor(){
      this.type='circle';
      this.color = [1.0, 1.0, 1.0, 1.0];
      this.matrix = new Matrix4();
   }

   render() {
      var rgba = this.color;
      // var xy = this.position;
      // var size = this.size;

      // Pass the color of a point to u_FragColor variable
      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

      // Pass the matrix to u_ModelMatrix attribute
      gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

      // Front of Cube
      drawTriangle3D([0.0,0.0,0.0, 1.0,1.0,0.0, 1.0,0.0,0.0 ]);
      drawTriangle3D([0.0,0.0,0.0, 0.0,1.0,0.0, 1.0,1.0,0.0 ]);
      // Bottom
      drawTriangle3D([0.0,0.0,0.0, 0.0,0.0,1.0, 1.0,0.0,0.0 ]);
      drawTriangle3D([1.0,0.0,0.0, 1.0,0.0,1.0, 0.0,0.0,1.0 ]);
      // Top
      drawTriangle3D([0.0,1.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
      drawTriangle3D([0.0,1.0,1.0, 0.0,1.0,0.0, 1.0,1.0,1.0 ]);
      // Left
      drawTriangle3D([0.0,0.0,0.0, 0.0,1.0,0.0, 0.0,1.0,1.0 ]);
      drawTriangle3D([0.0,1.0,1.0, 0.0,0.0,0.0, 0.0,0.0,1.0 ]);
      // Right
      drawTriangle3D([1.0,0.0,0.0, 1.0,1.0,0.0, 1.0,1.0,1.0 ]);
      drawTriangle3D([1.0,1.0,1.0, 1.0,0.0,0.0, 1.0,0.0,1.0 ]);
      // Back
      drawTriangle3D([0.0,0.0,1.0, 1.0,1.0,1.0, 1.0,0.0,1.0 ]);
      drawTriangle3D([0.0,0.0,1.0, 0.0,1.0,1.0, 1.0,1.0,1.0 ]);

      gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
      }
}
