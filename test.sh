ACCESS_TOKEN=

END_POINT=\
"/v2/campus/35/events?filter\[future\]=true&sort=begin_at"

curl -H "Authorization: Bearer $ACCESS_TOKEN" https://api.intra.42.fr/$END_POINT | jq ".[].name"
