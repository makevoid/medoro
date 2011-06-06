(function() {
  var Gallery, gallery;
  Gallery = (function() {
    function Gallery(path) {
      this.path = path;
      console.log("Initializing: " + this.path);
    }
    Gallery.prototype.load = function() {
      console.log("aasdasd");
      return $.getJSON(this.path, function(data) {
        return gallery.loaded(data);
      });
    };
    Gallery.prototype.loaded = function(data) {
      this.photos = data;
      return this.draw(0);
    };
    Gallery.prototype.startAnimation = function() {
      var first;
      if ($("#photos img").length > 1) {
        first = $("#photos img").first();
        first.remove();
      }
      return setTimeout(gallery.next, 6000);
    };
    Gallery.prototype.next = function() {
      return gallery.draw(gallery.current + 1);
    };
    Gallery.prototype.removeImage = function(img) {
      return img.remove();
    };
    Gallery.prototype.fadeIn = function() {
      var last;
      last = $("#photos img").last();
      return last.animate({
        opacity: 1
      }, 1200, gallery.startAnimation);
    };
    Gallery.prototype.draw = function(idx) {
      var img;
      this.current = idx;
      img = "<img src='" + this.photos[this.current] + "'>";
      $("#photos").append(img);
      $(img).load(function() {
        var last;
        last = $("#photos img").last();
        last.css({
          opacity: 0
        });
        return gallery.fadeIn();
      });
      return false;
    };
    return Gallery;
  })();
  gallery = new Gallery("/photos.json");
  gallery.load();
}).call(this);
