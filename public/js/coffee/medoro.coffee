class Gallery
  constructor: (@path) ->
    @photos = []
    @current = 0
    #console.log "Initializing: #{@path}"
    
  load: ->
    self = this
    $.getJSON @path, (data) ->
      self.loaded(data)
      
  loaded: (data) ->
    @photos = data
    this.draw()
    @current += 1
    
  startAnimation: ->    
    self = this
    setTimeout( -> 
      self.next()
    , 5000)
    
  next: ->   
    # console.log @current, @photos.length 
    if @current < @photos.length 
      this.draw(true)
    else
      @current = 0
      this.draw(true)
    
  removeFirst: ->
    $("#photos img").first().remove()
  
  removeImage: (img) ->
    img.remove()
  
  fadeIn: ->  
    self = this
    last = $("#photos img").last()
    last.animate {opacity: 1}, 1200, -> self.startAnimation()
    if $("#photos img").length > 1
      first = $("#photos img").first()
      first.animate { opacity: 0, boxShadow: 0 }, 1200, this.removeFirst
  
  draw: (incr) ->
    img_path = @photos[@current]
    @current += 1 if incr
    # console.log img_path
    img = "<img src='#{img_path}'>"
    $("#photos").append img
  
    last = $("#photos img").last()
    last.css { opacity: 0 }
    self = this
    $(img).load ->
      self.fadeIn()
    false


window.gallery = new Gallery "/photos.json"
gallery.load()