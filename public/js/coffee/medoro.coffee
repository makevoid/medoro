class Gallery
  constructor: (@path) ->
    #console.log "Initializing: #{@path}"
    
  load: ->
    $.getJSON @path, (data) ->
      gallery.loaded(data)
      
  loaded: (data) ->
    this.photos = data
    this.draw 0
    
  startAnimation: ->    
    setTimeout( gallery.next, 6000)
    
  next: -> 
    gallery.draw gallery.current+1
  
  removeFirst: ->
    $("#photos img").first().remove()
  
  removeImage: (img) ->
    img.remove()
  
  fadeIn: ->
    last = $("#photos img").last()
    last.animate {opacity: 1}, 1200, gallery.startAnimation  
    if $("#photos img").length > 1
      first = $("#photos img").first()
      first.animate { opacity: 0, boxShadow: 0 }, 1200, this.removeFirst
  
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