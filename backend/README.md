# Postman Documentation for Flask Application

## 1. Signup

**URL:** `/signup`  
**Method:** `POST`

**Headers:**
- `Authorization`: `Bearer {id_token}`

**Response:**
- **Success:** 
  ```json
  {
    "message": "Sign-up successful",
    "uid": "{uid}",
    "role": "{role}"
  }
  ```
- **Error:** 
  ```json
  {
    "error": "Invalid token"
  }
  ```

## 2. Signin

**URL:** `/signin`  
**Method:** `POST`

**Headers:**
- `Authorization`: `Bearer {id_token}`

**Response:**
- **Success:** 
  ```json
  {
    "message": "Sign-in successful",
    "uid": "{uid}",
    "role": "{role}"
  }
  ```
- **Error:** 
  ```json
  {
    "error": "Invalid token"
  }
  ```

## 3. Save Games State

**URL:** `/save_games_state`  
**Method:** `GET`

**Response:**
- **Success:** 
  ```html
  Games states saved.
  ```
- **Error:** 
  ```html
  Error: Could not save games state.
  ```

## 4. Load Games State

**URL:** `/load_games_state`  
**Method:** `GET`

**Response:**
- **Success:** 
  ```html
  Games states loaded.
  ```
- **Error:** 
  ```html
  Error: Could not load games state.
  ```

## 5. Submit

**URL:** `/submit`  
**Method:** `POST`

**Request Body:**
```json
{
  "DATA": {
    "week": 1,
    "suppliers": {
      "supplier1": 10,
      "supplier2": 20
    },
    "customers": {
      "customer1": 15,
      "customer2": 25
    }
  }
}
```

**Response:**
- **Success:** 
  ```html
  This will not change the user view
  ```

## 6. Get Station Status

**URL:** `/get_station_status`  
**Method:** `GET`

**Query Parameters:**
- `game`: `{game_name}`
- `station`: `{station_name}`

**Response:**
- **Success:** 
  ```json
  {
    "current_week": 1,
    "server_time": 1625674834.123,
    "script": "",
    "turn_start_time": 1625671234.123,
    "game_done": false,
    "players_completed_turn": 3,
    "connected_stations": 4,
    "connection_state": 1625674834.123,
    "cost_inventory": "$1000",
    "cost_backorder": "$200",
    "cost_transport": "$300",
    "total_cost": "$1500",
    "fulfilment_rate": "90%",
    "truck_utilization": "80%",
    "inventory": 50,
    "backorder": 10,
    "incomming_order": 20,
    "incomming_delivery": 30,
    "order_min": "5",
    "order_max": "50",
    "ship_min": "5",
    "ship_max": "50",
    "ordering_limits": "<table>...</table>",
    "shipping_limits": "<table>...</table>"
  }
  ```

## 7. Get Game Status

**URL:** `/get_game_status`  
**Method:** `GET`

**Query Parameters:**
- `game`: `{game_name}`

**Response:**
- **Success:** 
  ```json
    {
      "week": 1,
      "waitingfor": ["Player1", "Player2"],
      "disconnected": ["Player3"],
      "data": {
        "cost_inventory_sum": {"Station1": [1000], "Station2": [1500]},
        "cost_backorder_sum": {"Station1": [500], "Station2": [750]},
        "cost_transport_sum": {"Station1": [750], "Station2": [1000]},
        "cost_total_sum": {"Station1": [2250], "Station2": [3250]},
        "fulfilment_avg": {"Station1": [0.95], "Station2": [0.90]},
        "green_score_avg": {"Station1": [0.8], "Station2": [0.75]},
        "cost": {"Station1": [2250], "Station2": [3250]},
        "fulfilment": {"Station1": [0.95], "Station2": [0.90]},
        "green_score": {"Station1": [0.8], "Station2": [0.75]},
        "shipments": {"Station1": [10], "Station2": [15]},
        "extra-shipments": {"Station1": [1], "Station2": [2]},
        "backorder": {"Station1": [5], "Station2": [10]},
        "inventory": {"Station1": [100], "Station2": [150]},
        "orders": {"Station1": [50], "Station2": [75]},
        "deliveries": {"Station1": [40], "Station2": [60]}
      }
    }
  ```

## 8. Get Games Status

**URL:** `/get_games_status`  
**Method:** `GET`

**Query Parameters:**
- `games_list`: `game1,game2,game3`

**Response:**
- **Success:** 
  ```json
  {
    "game1": {
      "week": 1,
      "waiting": "<table>...</table>",
      "disconnected": "<table>...</table>",
      "inventory": 100,
      "backorder": 50,
      "trucks": 20,
      "cost": 1500,
      "fulfilment": 0.9,
      "greenscore": 0.8,
      "totalcost": [100, 200, 300],
      "avgfulfilment": [0.9, 0.85, 0.88],
      "avggreenscore": [0.8, 0.75, 0.78]
    },
    "game2": {
      "week": 2,
      "waiting": "<table>...</table>",
      "disconnected": "<table>...</table>",
      "inventory": 120,
      "backorder": 60,
      "trucks": 25,
      "cost": 1600,
      "fulfilment": 0.85,
      "greenscore": 0.75,
      "totalcost": [110, 210, 310],
      "avgfulfilment": [0.88, 0.86, 0.87],
      "avggreenscore": [0.78, 0.76, 0.77]
    }
  }
  ```

## 9. Change Game Settings

**URL:** `/change_game_settings`  
**Method:** `POST`

**Request Body:**
```json
{
  "team_name": "game_name",
  "demands": [
    {
      "demand": "10,20,30"
    }
  ],
  "stations": [
    {
      "order_max": "50,60,70",
      "order_min": "5,10,15",
      "ship_max": "30,40,50",
      "ship_min": "3,4,5"
    }
  ],
  "script": [
    {
      "week": 1
    }
  ]
}
```

**Response:**
- **Success:** 
  ```json
  {
    "result": true,
    "msg": "Game setup saved."
  }
  ```
- **Error:** 
  ```json
  {
    "result": false,
    "msg": "Couldn't save game setup. Error: Exception of type {ExceptionType} occurred. Arguments:{ExceptionArgs}."
  }
  ```

## 10. Edit Game Setup

**URL:** `/edit_game_setup`  
**Method:** `GET` or `POST`

**Query Parameters (GET):**
- `action`: `edit` or `create`

**Request Body (POST):**
```json
{
  "selected_game": "game_name"
}
```

**Response (GET):**
- **Success:** 
  ```html
  <!-- Renders the edit game setup page -->
  ```

## 11. Import Game File

**URL:** `/import_game_file`  
**Method:** `POST`

**Form Data:**
- `importfilename`: `{file}` (JSON file containing game data)

**Response:**
- **Success:** 
  ```html
  game_name: Game successfully added.
  ```
- **Error:** 
  ```html
  Error message (e.g., Template not found or is not a JSON file.)
  ```

## 12. Export Game File

**URL:** `/export_game_file`  
**Method:** `GET`

**Query Parameters:

**
- `game_name`: `{game_name}`

**Response:**
- **Success:** 
  ```json
  {
    "team_name": "game_name",
    "demands": [
      {
        "demand": [10, 20, 30]
      }
    ],
    "stations": [
      {
        "order_max": [50, 60, 70],
        "order_min": [5, 10, 15],
        "ship_max": [30, 40, 50],
        "ship_min": [3, 4, 5]
      }
    ],
    "script": [
      {
        "week": 1
      }
    ]
  }
  ```

## 13. Show Game Setup

**URL:** `/show_game_setup`  
**Method:** `GET`

**Query Parameters:**
- `game_name`: `{game_name}`

**Response:**
- **Success:** 
  ```html
  <!-- Renders the game setup page with configuration details -->
  ```

## 14. Copy Game

**URL:** `/copy_game`  
**Method:** `POST`

**Query Parameters:**
- `org`: `{original_game_name}`

**Form Data:**
- `dst`: `{new_game_name}`

**Response:**
- **Success:** 
  ```html
  new_game_name: Game successfully copied.
  ```
- **Error:** 
  ```html
  Error message (e.g., destination game already exists.)
  ```

## 15. Rename Game

**URL:** `/rename_game`  
**Method:** `POST`

**Query Parameters:**
- `org`: `{original_game_name}`

**Form Data:**
- `new_name`: `{new_game_name}`

**Response:**
- **Success:** 
  ```html
  new_game_name: Game successfully renamed.
  ```
- **Error:** 
  ```html
  Error message (e.g., destination game already exists.)
  ```

## 16. Delete Game

**URL:** `/delete_game`  
**Method:** `GET`

**Query Parameters:**
- `game_name`: `{game_name}`
- `next`: `{next_page}` (default: `advanced_menu`)

**Response:**
- **Success:** 
  ```html
  game_name: Game deleted.
  ```
- **Error:** 
  ```html
  Error: Game not found.
  ```

## 17. Reset Game

**URL:** `/reset_game`  
**Method:** `GET` or `POST`

**Query Parameters (GET):**
- `game_name`: `{game_name}`

**Response:**
- **Success:** 
  ```html
  game_name: Game successfully reset.
  ```
- **Error:** 
  ```html
  Error message (e.g., Game is no longer valid.)
  ```

## Game Setup/Settings Routes Documentation

#### 1. **Edit Game Setup**

**URL:** `/edit_game_setup`  
**Method:** `GET` or `POST`

**Query Parameters (GET):**
- `action`: `edit` or `create`

**Request Body (POST):**
```json
{
  "selected_game": "game_name"
}
```

**Response (GET):**
- **Success:** 
  ```html
  <!-- Renders the edit game setup page with a form to edit game settings -->
  ```

#### 2. **Change Game Settings**

**URL:** `/change_game_settings`  
**Method:** `POST`

**Request Body:**
```json
{
  "team_name": "game_name",
  "admin_password": "admin_pass",
  "play_password": "play_pass",
  "weeks": 10,
  "expiry": 30,
  "turn_time": 60,
  "quick_backorder_recovery": "true",
  "auto_order_method": "method_name",
  "demands": [
    {
      "name": "demand1",
      "demand": "10,20,30"
    }
  ],
  "stations": [
    {
      "name": "station1",
      "player_name": "player1",
      "auto_decide_ship_qty": true,
      "auto_decide_order_qty": true,
      "holding_cost": 10,
      "backorder_cost": 20,
      "transport_cost": 30,
      "transport_size": 5,
      "delay_shipping": 2,
      "delay_ordering": 2,
      "initial_queue_quantity": 5,
      "initial_inventory": 10,
      "safety_stock": 5,
      "order_min": "5,10,15",
      "order_max": "20,30,40",
      "ship_min": "5,10,15",
      "ship_max": "20,30,40"
    }
  ],
  "connections": [
    {
      "supp": "supplier1",
      "cust": "customer1"
    }
  ],
  "script": [
    {
      "week": 1,
      "msg": "Start of game"
    }
  ]
}
```

**Response:**
- **Success:** 
  ```json
  {
    "result": true,
    "msg": "Game setup saved."
  }
  ```
- **Error:** 
  ```json
  {
    "result": false,
    "msg": "Couldn't save game setup. Error: Exception of type {ExceptionType} occurred. Arguments:{ExceptionArgs}."
  }
  ```

#### 3. **Import Game File**

**URL:** `/import_game_file`  
**Method:** `POST`

**Form Data:**
- `importfilename`: `{file}` (JSON file containing game data)

**Response:**
- **Success:** 
  ```html
  game_name: Game successfully added.
  ```
- **Error:** 
  ```html
  Error message (e.g., Template not found or is not a JSON file.)
  ```

#### 4. **Export Game File**

**URL:** `/export_game_file`  
**Method:** `GET`

**Query Parameters:**
- `game_name`: `{game_name}`

**Response:**
- **Success:** 
  ```json
  {
    "team_name": "game_name",
    "demands": [
      {
        "demand": [10, 20, 30]
      }
    ],
    "stations": [
      {
        "order_max": [50, 60, 70],
        "order_min": [5, 10, 15],
        "ship_max": [30, 40, 50],
        "ship_min": [3, 4, 5]
      }
    ],
    "script": [
      {
        "week": 1
      }
    ]
  }
  ```

#### 5. **Show Game Setup**

**URL:** `/show_game_setup`  
**Method:** `GET`

**Query Parameters:**
- `game_name`: `{game_name}`

**Response:**
- **Success:** 
  ```html
  <!-- Renders the game setup page with configuration details -->
  ```

#### 6. **Copy Game**

**URL:** `/copy_game`  
**Method:** `POST`

**Query Parameters:**
- `org`: `{original_game_name}`

**Form Data:**
- `dst`: `{new_game_name}`

**Response:**
- **Success:** 
  ```html
  new_game_name: Game successfully copied.
  ```
- **Error:** 
  ```html
  Error message (e.g., destination game already exists.)
  ```

#### 7. **Rename Game**

**URL:** `/rename_game`  
**Method:** `POST`

**Query Parameters:**
- `org`: `{original_game_name}`

**Form Data:**
- `new_name`: `{new_game_name}`

**Response:**
- **Success:** 
  ```html
  new_game_name: Game successfully renamed.
  ```
- **Error:**
  ```html
  Error message (e.g., destination game already exists.)
  ```

#### 8. **Delete Game**

**URL:** `/delete_game`  
**Method:** `GET`

**Query Parameters:**
- `game_name`: `{game_name}`
- `next`: `{next_page}` (default: `advanced_menu`)

**Response:**
- **Success:** 
  ```html
  game_name: Game deleted.
  ```
- **Error:** 
  ```html
  Error: Game not found.
  ```
---