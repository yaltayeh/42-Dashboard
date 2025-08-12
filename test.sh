ACCESS_TOKEN=7d915cf170ace1a66a7e3c671dfe9d14fabbe8c57f3d8dc08fc6cb0c44c230a3

END_POINT=\
"/v2/projects_users?filter\[campus\]=35"

curl -H "Authorization: Bearer $ACCESS_TOKEN" https://api.intra.42.fr/$END_POINT | jq > projects.json
