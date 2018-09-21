#!/usr/bin/env python2

import fontforge

import sys

if len(sys.argv) < 4:
    print "Usage: %s <font file> <ascent> <descent>" % sys.argv[0]
    sys.exit(1)

font_file = sys.argv[1]
ascent = int(sys.argv[2])
descent = int(sys.argv[3])

font = fontforge.open(font_file)

font.os2_winascent = ascent
font.os2_windescent = descent

font.hhea_ascent = ascent
font.hhea_descent = -descent

font.generate(font_file, flags=("TeX-table"))
