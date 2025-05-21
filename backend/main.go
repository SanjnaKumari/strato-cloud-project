package main

import (
	"encoding/json"
	"net/http"
)

type User struct {
	Name            string `json:"name"`
	CreatedAt       string `json:"createdAt"`
	PasswordChanged string `json:"passwordChanged"`
	LastAccess      string `json:"lastAccess"`
	MfaEnabled      bool   `json:"mfaEnabled"`
}

func usersHandler(w http.ResponseWriter, r *http.Request) {
	users := []User{
		{"Foo Bar1", "2020-10-01", "2021-10-01", "2025-01-04", true},
		{"Foo1 Bar1", "2019-09-20", "2019-09-22", "2025-02-08", false},
		{"Foo2 Bar2", "2022-02-03", "2022-02-03", "2025-02-12", false},
		{"Foo3 Bar3", "2023-03-07", "2023-03-10", "2022-01-03", true},
		{"Foo Bar4", "2018-04-08", "2020-04-12", "2022-10-04", false},
		{"Sanjnaaaaa", "2022-01-01", "2022-01-01", "2025-05-01", true}, // Password > 365 only
		{"User2", "2022-01-01", "2022-01-01", "2025-04-15", false},     // Password > 365 only
		{"Test2", "2023-10-01", "2025-04-15", "2022-01-01", true},      // Access > 90 only
		{"Test12", "2020-01-01", "2021-01-01", "2022-01-01", false},    // Both > threshold
	}
	w.Header().Set("Access-Control-Allow-Origin", "*") // <- Add this
	w.Header().Set("Cache-Control", "no-store")        // ⬅️ Add this
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(users)
}

func main() {
	http.HandleFunc("/api/users", usersHandler)
	http.ListenAndServe(":8080", nil)
}
