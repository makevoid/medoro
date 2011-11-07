(function() {
  var Gallery;
  Gallery = (function() {
    function Gallery(path) {
      this.path = path;
      this.photos = [];
      this.current = 0;
    }
    Gallery.prototype.load = function() {
      var self;
      self = this;
      return $.getJSON(this.path, function(data) {
        return self.loaded(data);
      });
    };
    Gallery.prototype.loaded = function(data) {
      this.photos = data;
      this.draw();
      return this.current += 1;
    };
    Gallery.prototype.startAnimation = function() {
      var self;
      self = this;
      return setTimeout(function() {
        return self.next();
      }, 10);
    };
    Gallery.prototype.next = function() {
      if (this.current < this.photos.length) {
        return this.draw(true);
      } else {
        this.current = 0;
        return this.draw(true);
      }
    };
    Gallery.prototype.removeFirst = function() {
      return $("#photos img").first().remove();
    };
    Gallery.prototype.removeImage = function(img) {
      return img.remove();
    };
    Gallery.prototype.fadeIn = function() {
      var first, last, self;
      self = this;
      last = $("#photos img").last();
      last.animate({
        opacity: 1
      }, 1200, function() {
        return self.startAnimation();
      });
      if ($("#photos img").length > 1) {
        first = $("#photos img").first();
        return first.animate({
          opacity: 0,
          boxShadow: 0
        }, 1200, this.removeFirst);
      }
    };
    Gallery.prototype.draw = function(incr) {
      var img, img_path, last, self;
      img_path = this.photos[this.current];
      if (incr) {
        this.current += 1;
      }
      img = "<img src='" + img_path + "'>";
      $("#photos").append(img);
      last = $("#photos img").last();
      last.css({
        opacity: 0
      });
      self = this;
      $(img).load(function() {
        return self.fadeIn();
      });
      return false;
    };
    return Gallery;
  })();
  window.gallery = new Gallery("/photos.json");
  gallery.load();
}).call(this);
