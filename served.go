package main // RIVEN/V3/SERVED.GO

import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"os"
)

type Images struct {
	Title  string   `json:"title"`
	Images []string `json:"images"`
}

func LoadImagesJSON(path string) (*Images, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, err
	}
	var imgs Images
	err = json.Unmarshal(data, &imgs)
	if err != nil {
		return nil, err
	}
	return &imgs, nil
}

func serveImages(jsonFile string) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		imgs, err := LoadImagesJSON(jsonFile)
		if err != nil {
			http.Error(w, "Failed to load images", http.StatusInternalServerError)
			return
		}
		tmpl := template.Must(template.ParseFiles("index.html"))
		err = tmpl.Execute(w, imgs)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
		}
	}
}

func main() {
	http.Handle("/static/", http.StripPrefix("/static/", http.FileServer(http.Dir("."))))

	http.HandleFunc("/", serveImages("galleries/images.json")) // Default 

	log.Fatal(http.ListenAndServe("127.0.0.1:8080", nil))
}
