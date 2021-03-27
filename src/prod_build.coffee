#!/usr/bin/env iced
### !pragma coverage-skip-block ###
fs = require "fs"
{execSync} = require "child_process"
# patch
process.argv = [
  "skip"
  "skip"
  "--http_port", "0"
]

server = require "./front_server"
build_folder = "../web"
# .git will be ignored
execSync "rm -rf #{build_folder}/*"
# ###################################################################################################
#    static folders
# ###################################################################################################
static_folder_list = [
  "cels"
  "font"
  "img"
]

for folder in static_folder_list
  execSync "cp -r htdocs/#{folder} #{build_folder}/"

# ###################################################################################################
#    htdocs
# ###################################################################################################
res = server.content_htdocs_server.dir_process "/", "htdocs"

script_list = []
for url in res.script_url_list
  content = res.script_content_hash[url]
  # continue if skip_url_hash[url]
  url = url.replace /\.coffee$/, ".js"
  
  # github pages fix
  if url.startsWith "/_"
    url = url.replace "/_", "/1_"
  
  file = "#{build_folder}/#{url}"
  
  script_list.push """
    <script src=".#{url}"></script>
    """#"
  
  parts = file.split("/")
  parts.pop()
  folder = parts.join("/")
  execSync "mkdir -p #{folder}"
  
  fs.writeFileSync file, content

style_list = []
for url in res.style_url_list
  style_list.push res.style_hash[url]
style = style_list.join "\n"

index_html_path = "#{build_folder}/index.html"

fs.writeFileSync index_html_path, """
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="utf-8">
      
      <title>#{server.content_htdocs_server_opt.title}</title>
      <style>#{style}</style>
    </head>
    <body>
      <div id="mount_point"></div>
      #{join_list script_list, '    '}
    </body>
  </html>
  """#"

puts "done"
process.exit()
