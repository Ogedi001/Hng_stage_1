# Stage One Task - Backend Track

This project sets up a basic web server that exposes an API endpoint to greet a visitor, providing their IP address, location, and the current temperature.

## Endpoint

### [GET] `/api/hello?visitor_name="Mark"`

#### Example Response

```json
{
  "client_ip": "127.0.0.1",
  "location": "New York",
  "greeting": "Hello, Mark! The temperature is 11 degrees Celsius in New York"
}


## Environmental variable
```env
LOCATION_API_KEY=" " #ipgeolocation api
WEATHER_API_KEY=" "  #openweather api
#ENVIRONMENT=production
```

