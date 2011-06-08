(function() {
  var Gallery, gallery;
  Gallery = (function() {
    function Gallery(path) {
      this.path = path;
    }
    Gallery.prototype.load = function() {
      return $.getJSON(this.path, function(data) {
        return gallery.loaded(data);
      });
    };
    Gallery.prototype.loaded = function(data) {
      this.photos = data;
      return this.draw(0);
    };
    Gallery.prototype.startAnimation = function() {
      return setTimeout(gallery.next, 6000);
    };
    Gallery.prototype.next = function() {
      return gallery.draw(gallery.current + 1);
    };
    Gallery.prototype.removeFirst = function() {
      return $("#photos img").first().remove();
    };
    Gallery.prototype.removeImage = function(img) {
      return img.remove();
    };
    Gallery.prototype.fadeIn = function() {
      var first, last;
      last = $("#photos img").last();
      last.animate({
        opacity: 1
      }, 1200, gallery.startAnimation);
      if ($("#photos img").length > 1) {
        first = $("#photos img").first();
        return first.animate({
          opacity: 0,
          boxShadow: 0
        }, 1200, this.removeFirst);
      }
    };
    Gallery.prototype.draw = function(idx) {
      var img, last;
      this.current = idx;
      img = "<img src='" + this.photos[this.current] + "'>";
      $("#photos").append(img);
      last = $("#photos img").last();
      last.css({
        opacity: 0
      });
      $(img).load(function() {
        return gallery.fadeIn();
      });
      return false;
    };
    return Gallery;
  })();
  gallery = new Gallery("/photos.json");
  gallery.load();
}).call(this);
