guard 'livereload' do
  watch(%r{.+\.rb})
  watch(%r{(models|config|lib)/.+\.(rb|yml)})
  watch(%r{views/.+\.sass})
  watch(%r{public/.+/.+\.(css|js|html)})
  watch(%r{public/.+\.(css|js|html)})
end

guard 'coffeescript', :input => 'public/js'

# More infos at https://github.com/guard/guard#readme