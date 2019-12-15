npm install
Start-Process -NoNewWindow node -ArgumentList 'app.js'
Start-Process -NoNewWindow -WorkingDirectory .\jef-box\ sencha -ArgumentList 'app watch','--port 7777'
Start-Process -NoNewWindow -WorkingDirectory .\jef-box\ sencha -ArgumentList 'app watch','--port 8888','phone'