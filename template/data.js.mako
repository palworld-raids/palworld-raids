<% import json %>
var data = JSON.parse("${json.dumps(records).replace("\"", "\\\"")}")