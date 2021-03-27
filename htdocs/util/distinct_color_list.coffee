window.distinct_color_list = []
# https://mokole.com/palette.html
str = """
dimgray
#696969
darkolivegreen
#556b2f
maroon2
#7f0000
darkslateblue
#483d8b
green
#008000
mediumseagreen
#3cb371
darkcyan
#008b8b
peru
#cd853f
yellowgreen
#9acd32
darkblue
#00008b
purple2
#7f007f
maroon3
#b03060
orangered
#ff4500
darkorange
#ff8c00
yellow
#ffff00
chartreuse
#7fff00
blueviolet
#8a2be2
springgreen
#00ff7f
crimson
#dc143c
aqua
#00ffff
deepskyblue
#00bfff
blue
#0000ff
lightcoral
#f08080
lightsteelblue
#b0c4de
fuchsia
#ff00ff
dodgerblue
#1e90ff
deeppink
#ff1493
mediumslateblue
#7b68ee
violet
#ee82ee
moccasin
#ffe4b5
"""
for v in str.split("\n")
  continue if v[0] != "#"
  distinct_color_list.push v
# яркие в начале
distinct_color_list.reverse()
