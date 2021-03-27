#!/usr/bin/env iced
### !pragma coverage-skip-block ###
config= require "./config"
argv  = require("minimist")(process.argv.slice(2))

argv.port ?= config.front_port
argv.ws_port ?= argv.port+10000

{
  master_registry
  Webcom_bundle
} = require "webcom/lib/client_configurator"
require "webcom-client-plugin-base/src/hotreload"
require "webcom-client-plugin-base/src/react"
# require "webcom-client-plugin-base/src/net"
# require "webcom-client-plugin-base/src/wsrs"
require "webcom-client-plugin-base/src/keyboard"
delivery = require "webcom"


bundle = new Webcom_bundle master_registry
bundle.plugin_add "Webcom hotreload"
# bundle.plugin_add "Webcom net"
bundle.plugin_add "Webcom react"
# bundle.plugin_add "ws request service"
bundle.plugin_add "keymap"
bundle.plugin_add "keyboard scheme"
bundle.feature_hash.hotreload = true

@content_htdocs_server = delivery.start @content_htdocs_server_opt = {
  htdocs : "htdocs"
  hotreload  : !!argv.watch
  title : "pspw consensus sim"
  bundle
  port    : argv.port
  ws_port : argv.ws_port
  watch_root  : true
  allow_hard_stop : true
  engine : {
    HACK_remove_module_exports : true
    # HACK_onChange : true
  }
  # vendor : "react"
  vendor : "react_min"
  gz : true
  watcher_ignore : (event, full_path)->
    return true if full_path.startsWith "src"
    false
}
