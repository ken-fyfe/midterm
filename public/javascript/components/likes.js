$(() => {
   
    window.likes = {};
  
    const $likes = $("#likes");
    let currentNumber = null;
    function updateLikes(num) {
      currentNumber = num;
      $likes.find("#mapLikes").remove();
      let likeLinks;
      if (!num) {
        likeLinks = ``;
      } else {
        likeLinks = `<div id="mapLikes">
          ${num}
      </div>`;
      }
  
      $likes.append(likeLinks);
    }
    window.likes.update = updateLikes;
  
    
  });
  