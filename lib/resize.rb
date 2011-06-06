path = File.expand_path "../../", __FILE__

Dir.glob("#{path}/public/photos/*/*.*").sort.reverse.each do |p|
  cmd = "sips #{p} --resampleHeightWidthMax 1200 #{p}"
  p cmd
  `#{cmd}`
end
