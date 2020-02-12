const toggleAllMaps =  function(arrow) {
  // swap up arrow and down arrow images
  let swapImage;
  ($(arrow).attr('src') === $(arrow).attr('up-arrows')) ? swapImage = 'down-arrows' : swapImage = 'up-arrows';
  $(arrow).attr('src', $(arrow).attr(swapImage));
  // toggle the all maps region
  $('#all_maps').toggle();
};
