import qrcode
img = qrcode.make('"'"'https://connectedwarriors.org'"'"')
img.save('assets/donate-qr.png')
