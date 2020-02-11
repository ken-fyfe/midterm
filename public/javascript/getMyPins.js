$((mymap) => {
  const getMyPins = function() {
    console.log("This is getMyPins");
    return $.ajax({
      url: "/api/users/pins",
    });
  };
  getMyPins().then(pinArray => {
    console.log(pinArray.pins);
    for (let pin in pinArray.pins) {
      console.log('pin: ', pin);
      const mapLong = pinArray.pins[pin].longitude;
      const mapLat = pinArray.pins[pin].longitude;
      const mapTitle = pinArray.pins[pin].title;
      const mapDesc = pinArray.pins[pin].description;
      L.marker([mapLong, mapLat])
       .addTo(mymap)
       .bindPopup(`<b>${mapTitle}</b><br />${mapDesc}`).openPopup();
    }
  });
  // L.marker([51.5, -0.09]).addTo(mymap)
  // 	.bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
});
