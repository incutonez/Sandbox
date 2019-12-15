if (-not (Test-Path node_modules)) {
  npm install
}
Start-Process -NoNewWindow node -ArgumentList 'server.js'
Start-Process -NoNewWindow -WorkingDirectory .\jef-box\ sencha -ArgumentList 'app watch','--port 7777'
Start-Process -NoNewWindow -WorkingDirectory .\jef-box\ sencha -ArgumentList 'app watch','--port 8888','phone'