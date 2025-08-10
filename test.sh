ACCESS_TOKEN=

END_POINT=\
/v2/achievements/39/users

curl -H "Authorization: Bearer $ACCESS_TOKEN" https://api.intra.42.fr/$END_POINT | jq
