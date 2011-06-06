class Gallery
  constructor: (@path) ->
    console.log "Initializing: #{@path}"
    
  load: ->
    console.log "aasdasd"
    $.getJSON @path, (data) ->
      gallery.loaded(data)
      
  loaded: (data) ->
    this.photos = data
    this.draw 0
    
  startAnimation: ->
    if $("#photos img").length > 1
      first = $("#photos img").first()
      first.remove()
    setTimeout( gallery.next, 6000)
    
  next: -> 
    gallery.draw gallery.current+1
  
  removeImage: (img) ->
    img.remove()
  
  fadeIn: ->
    last = $("#photos img").last()
    last.animate {opacity: 1}, 1200, gallery.startAnimation  
  
  draw: (idx) ->
    this.current = idx
    img = "<img src='#{this.photos[this.current]}'>"
    $("#photos").append img
  
    last = $("#photos img").last()
    last.css { opacity: 0 }
    $(img).load ->
      gallery.fadeIn()
    false


gallery = new Gallery "/photos.json"
gallery.load()