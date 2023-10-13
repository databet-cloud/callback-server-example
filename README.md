# DataBet Callback server Example

This repository provides boilerplate code as an introduction to help you build your own betting application callback
server using for [DataBet Sportsbook](https://docs.data.bet/betting/).

## Documentation

- [Betting Integration](https://docs.data.bet/betting-integration/)
- [Authorization](https://docs.data.bet/betting-integration-auth/)

## Getting Started

### Prerequisites

To run this project, you need to have
[Node.js 18+ and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installed on your system.

### Project structure

- `src/index.ts` - application entrypoint with configured `dummy` callback server that outputs requests to the logs.
- `src/models` - API models are based on [Swagger specification](https://docs.data.bet/betting/bet/#swagger) 
- `src/callback-server` - a boilerplate code that includes common functionality for a callback server, such as 
middleware designed to convert JSON requests from `snake_case` to `src/models` based on `camelCase`, errors etc.
- `/src/callback-server/bet` - interface and registrar for the Bet [Callback server](https://docs.data.bet/betting/bet#swagger).

### Setting up the Project

#### 1. Clone the Repository and Install Dependencies

```bash
git clone https://github.com/databet-cloud/callback-server-example
cd callback-server-example
npm install
```

#### 2. Setting up Environment Variables
1. Create a file named `.env` in the root directory of this project
2. Copy the contents of the `.env.dist` file and paste them into the `.env` file.
3. Replace the values of the variables in the `.env` file with appropriate values:
- `CALLBACK_SERVER_PREFIX`: this prefix can be helpful when configuring callback endpoints within an existing web server.
- `PORT`: web server port

```dotenv
CALLBACK_SERVER_PREFIX=/databet
PORT=3000
```
4. Save the `.env` file.

#### 3. Build and Start the Server

```bash
npm run build
npm run start
```

You'll see logs that web server has successfully started.

```text
Server is running on 3000
Callback server prefix: /databet
```

#### 4. Test your Callback Server

Let's test [bet/place](https://docs.data.bet/betting/bet#swagger) callback using cURL using example from the 
documentation.

```bash
curl -v -X 'POST' \
  'http://127.0.0.1:3000/databet/bet/place' \
  -H 'Foreign-Params: {"some_token": "some_token_value", "internal_player_id": "123"}' \
  -H 'Content-Type: application/json' \
  -d '{
  "request_id": "550e8400-e29b-41d4-a716-446655440000",
  "bet_id": "AAAAAAAAAAAAAAAAAaVSZ1rf1k0BuhAAAOAdRQAY",
  "bet_player_id": "00000000-0000-0000-0000-000000076416",
  "bet_type": 1,
  "bet_stake": "5",
  "bet_freebet_id": "AAAAAAAAAAAAAAAAAAhBWFubtg4APLcAALEs5AAi",
  "bet_insurance_id": "129965e5-4279-4a85-a454-89f58192799d",
  "bet_odds": [
    {
      "odd_id": "1",
      "odd_ratio": "1.6",
      "odd_status": 1,
      "match_id": "1:1",
      "match_status": 1,
      "market_id": "1",
      "odd_updated_at": "2005-08-15T15:50:01Z",
      "meta": {
        "sport_event_info_provider_id": "1",
        "sport_event_info_sport_id": "football",
        "sport_event_info_tournament_id": "gt:1",
        "sport_event_info_market_type": "1",
        "sport_event_info_state": "live"
      }
    }
  ],
  "bet_system_sizes": [
    1
  ],
  "bet_created_at": "2005-08-15T15:52:01Z",
  "competitors": [
    {
      "id": "gin:2207d629-321f-4e15-9617-b926d1601b6d",
      "type": 1
    }
  ]
}'
```

The web server's logs should contain text like the following:
```text
Received POST request to /databet/bet/place
{
  requestId: '550e8400-e29b-41d4-a716-446655440000',
  ...
}
```

**Note:** Feel free to use other request examples based on [Swagger specification](https://docs.data.bet/betting/bet/#swagger)

#### 5. Add business logic for callback server.

**Note:** Please be advised that some of the following code is provided as an example and may differ in the actual
server implementation.

Let's pretend that you already have a business logic layer that performs actions with bets and all what we need is to
develop a controller layer that transforms callback request onto business layer and handles business layer response in a
correct way.

```typescript
const bettingService = NewBettingService()

registerBetEndpoints(databetRouter, {
    betPlace: (req: BetRequest): CallbackError | null => {
        const betResponse = bettingService.placeBet(req)
        
        switch (betResponse.error.code) {
            case 'inusufficient_funds':
                return createNotEnoughBalanceError(betResponse.error.actualBalance)
            case 'not_authorized':
                return createCredentialsExpiredError()
            default:
                return null
        }

        return null
    },
    // ...
})
```

## What's Next?

Configure your [SPA](https://github.com/databet-cloud/spa-example) and test your integration.  Explore any additional 
APIs you need to realize the **Betting Application of Your Dreams**!