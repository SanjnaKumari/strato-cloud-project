package main

import (
    "encoding/json"
    "net/http"
    "net/http/httptest"
    "testing"
)

func TestUsersHandler_ReturnsUsers(t *testing.T) {
    req := httptest.NewRequest(http.MethodGet, "/api/users", nil)
    w := httptest.NewRecorder()

    usersHandler(w, req)

    res := w.Result()
    defer res.Body.Close()

    if res.StatusCode != http.StatusOK {
        t.Fatalf("Expected status 200 OK, got %d", res.StatusCode)
    }

    var users []User
    if err := json.NewDecoder(res.Body).Decode(&users); err != nil {
        t.Fatalf("Failed to decode response: %v", err)
    }

    if len(users) != 9 {
        t.Errorf("Expected 5 users, got %d", len(users))
    }

    if users[0].Name != "Foo Bar1" {
        t.Errorf("Expected first user to be 'Foo Bar1', got '%s'", users[0].Name)
    }
}