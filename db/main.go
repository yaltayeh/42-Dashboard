package main

import (
	"io"
	"log"
	"net/http"
	"net/url"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/core"
)

const baseUrl string = "https://api.intra.42.fr/"

func fetch_data(access_token, endpoint, params string) (string, int, error) {

	fullURL := baseUrl + endpoint + "?" + params

	req, err := http.NewRequest("GET", fullURL, nil)
	if err != nil {
		log.Fatal("Error creating request:", err)
	}

	// Add headers
	req.Header.Add("Authorization", "Bearer "+access_token)
	req.Header.Add("Accept", "application/json")

	// Send the request
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return "", -1, err
	}
	defer resp.Body.Close()

	// Read the response body
	bodyBytes, err := io.ReadAll(resp.Body)
	if err != nil {
		return  "", -1, err
	}

	// Handle response (optional)
	data := string(bodyBytes)

	return data, resp.StatusCode, nil
}

func post_data(app *pocketbase.PocketBase, key string, data string) error {
	collection, err := app.FindCollectionByNameOrId("data")
	if err != nil {
		return err
	}
	record, err := app.FindFirstRecordByFilter(collection, "key="+key)
	if err != nil {
		record = core.NewRecord(collection)
	}

	record.Set("key", key)
	record.Set("data", data)

	err = app.Save(record)
	return err
}

func fetch_events(app *pocketbase.PocketBase, access_token string) {
	endpoint := "/v2/campus/35/events"

	params := url.Values{}
	params.Add("sort", "begin_at")
	params.Add("filter[future]", "true")

	data, status, err := fetch_data(access_token, endpoint, params.Encode())
	if (err != nil) {
		return ;
	}

	if (status == 200) {
		post_data(app, "Events", data)
	}
}

func main() {
	app := pocketbase.New()

	app.Cron().MustAdd("fetch_data", "*/1 * * * *", func() {
		access_token := "ac2472f322f838ab0f30a80d62161980f7060a8f4eb740b090790073dd349d08"
		fetch_events(app, access_token)
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
