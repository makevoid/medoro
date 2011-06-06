# A sample Guardfile
# More info at https://github.com/guard/guard#readme

guard 'livereload' do
  watch(%r{.+\.rb})
  watch(%r{app/.+\.(erb|haml)})
  watch(%r{views/.+\.sass})
  watch(%r{public/.+/.+\.(css|js|html)})
  watch(%r{public/.+\.(css|js|html)})
  watch(%r{config/locales/.+\.yml})
end

guard 'coffeescript', :input => 'public/js'
