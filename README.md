# Node.js Payments Project

This Node.js project is a simple implementation for handling payouts, payins, notifications, and callbacks using the dLocal API.

## Features

- **Payouts**: Handle cashout requests using the dLocal API.
- **Payins**: Process secure payments using the dLocal secure payments API.
- **Automatic Signature Calculation**: The project automatically calculates signatures for payins and payouts based on the provided request payloads.
- **Notifications**: Receive and store notifications in a CSV file.

## Configuration

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Configure API Credentials:**

* Open the appropriate route files (**payouts.js**, **payins.js**, **notifications.js**) in the routes directory.
* Update the **login**, **transKey**, and **secretKey** variables with your dLocal API credentials.
3. **Run the Application:**

   ```bash
   npm start
   ```

3. **Endpoints:**

* Payouts: **POST /payouts**
  * Example Body:

    ```json
    {
        "external_id": "#RANDOMALPHANUMERIC:9",
        "document_id": "769237836",
        "document_type": "RUT",
        "beneficiary_name": "Dlocal Chile",
        "beneficiary_lastname": "SPA",
        "country": "CL",
        "bank_code": "39",
        "bank_account": "0213880962",
        "account_type": "C",
        "amount": "100",
        "currency": "CLP",
        "type": "json",
        "purpose": "EPFAMT"
    }
    ```

* Payins: **POST /payins**
    * Example Body:
    ```json
    {
        "amount": "100",
        "currency": "USD",
        "country": "BR",
        "payment_method_id": "PQ",
        "payment_method_flow": "REDIRECT",
        "payer": {
            "name": "Thiago Gabriel",
            "email": "thiago@example.com",
            "document": "53033315550",
            "user_reference": "12345",
            "address": {
                "state": "Rio de Janeiro",
                "city": "Volta Redonda",
                "zip_code": "27275-595",
                "street": "Servidao B-1",
                "number": "1106"
            },
            "ip": "2001:0db8:0000:0000:0000:ff00:0042:8329",
            "device_id": "2fg3d4gf234"
        },
        "order_id": "14124",
        "notification_url": "https://f0cf-179-48-116-200.ngrok-free.app/notifications"
    }
    ```
## Additional Notes
* Ensure Node.js and npm are installed on your machine.
* For testing purposes, use the dLocal sandbox environment.
* Customize the notification logic in **notifications.js**.
* The CSV file (**notifications.csv**) will be created in the project directory.

## Dependencies
* [Express](https://expressjs.com/): Web framework for Node.js.
* [Axios](https://axios-http.com/): HTTP client for making requests.
* [crypto](https://nodejs.org/api/crypto.html): Node.js crypto module for HMAC generation.
* [csv-writer](https://www.npmjs.com/package/csv-writer): CSV writing library.

## License
This project is licensed under the MIT License.