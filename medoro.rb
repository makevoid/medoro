require 'json'
require 'haml'
require 'sass'
require 'sinatra/base'

path = File.expand_path "../", __FILE__
APP_PATH = path
require "#{path}/config/env"

class Medoro < Sinatra::Base
  require "#{APP_PATH}/config/env"


  configure :development do # this way you can use thin, shotgun is so slow...
    set :public, "public"
    #set :static, true
  end

  set :haml, { :format => :html5 }
  enable :sessions
  set :method_override, true

  get "/" do
    haml :index
  end

  get "/photos.json" do
    content_type :json
    photos = Dir.glob("#{APP_PATH}/public/photos/**/*.*").sort
    photos.map do |photo|
      path = "/photos/#{photo.split("/")[-2]}/#{File.basename photo}"
    end.to_json
  end

  #get '/css/main.css' do
  #  sass :main
  #end


end
