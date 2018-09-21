#!/usr/bin/env ruby

require 'json'
require 'rubygems'
require 'ttfunk'

def metrics_for_file(filename)
  file = TTFunk::File.open(filename)

  max_height = 0
  max_depth = 0

  file.cmap.unicode[0].code_map.sort.each do |u, g|
    glyph = file.glyph_outlines.for(g)
    if glyph
      max_height = [max_height, glyph.y_max].max
      max_depth = [-glyph.y_min, max_depth].max
    end

  end

  return [max_height, max_depth]
end

if ARGV.length < 1
  puts "Usage: %s <directory of fonts>" % $0
  exit(false)
end

font_dir = File.join(File.dirname(__FILE__), ARGV[0])
glob = File.join(font_dir, "*.ttf")

Dir.glob(glob).each do |file_name|
  ascent, descent = metrics_for_file(file_name)

  system("./modify_ascent_descent.py", file_name, ascent.to_s, descent.to_s)
end

