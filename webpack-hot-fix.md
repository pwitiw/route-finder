### go to node_modules/react-scripts/config/webpack.config.js
### paste the following code 
  ```javascript
       module: {
         rules: [
           {
             test: /\.worker\.js$/,
             use: { loader: 'worker-loader' }
           }
         ]
       }
  ```
  