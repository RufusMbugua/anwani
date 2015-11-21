define({ "api": [
  {
    "type": "put",
    "url": "/subscribers/:id/subscription?config=<enable|disable>",
    "title": "Configure Subscriber Subscription",
    "version": "1.0.0",
    "name": "ConfigureSubscription",
    "group": "Subscriber",
    "description": "<p>Configure subscription of a subscriber. Use config values <code>enable</code> or <code>disable</code>.</p> ",
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"subscription\": \"enabled\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "delete",
    "url": "/subscribers/:id",
    "title": "Delete Subscriber",
    "version": "1.0.0",
    "name": "Delete",
    "group": "Subscriber",
    "description": "<p>Delete a subscriber with the given id</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>name of the subscriber</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>subscriber address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>email address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "website",
            "description": "<p>subscriber website</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>secret password</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "logo",
            "description": "<p>subscriber logo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number in international format</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>subscriber id</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  \"email\": \"subscriber@email.com\",\n  \"name\": \"Jumia Online Shop\",\n  \"phone_number\": \"254713510521\",\n  \"website\": \"http://www.jumia.co.ke\",\n  \"address\": \"Moi Avenue, Top House\",\n  \"logo\": \"logo_url\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "get",
    "url": "/subscribers?page=<RESULTS_PAGE>&per_page=<RESULTS_PER_PAGE>",
    "title": "Get subscribers collection",
    "version": "1.0.0",
    "name": "FetchAll",
    "group": "Subscriber",
    "description": "<p>Get a collection of subscribers. The endpoint has pagination out of the box. Use these params to query with pagination: <code>page=&lt;RESULTS_PAGE</code> and <code>per_page=&lt;RESULTS_PER_PAGE&gt;</code>.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>name of the subscriber</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>subscriber address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>email address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "website",
            "description": "<p>subscriber website</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>secret password</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "logo",
            "description": "<p>subscriber logo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number in international format</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>subscriber id</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"total_pages\": 1,\n  \"total_docs_count\": 0,\n  \"docs\": [{\n    \"_id\" : \"556e1174a8952c9521286a60\",\n    \"email\": \"subscriber@email.com\",\n    \"name\": \"Jumia Online Shop\",\n    \"website\": \"http://www.jumia.co.ke\",\n    \"address\": \"Moi Avenue, Top House\",\n    \"phone_number\": \"254713510521\",\n    \"logo\": \"logo_url\"\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "get",
    "url": "/subscribers/:id",
    "title": "Get Subscriber",
    "version": "1.0.0",
    "name": "Get",
    "group": "Subscriber",
    "description": "<p>Get a subscriber with the given id</p> ",
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "post",
    "url": "/subscribers/login",
    "title": "Login a subscriber",
    "version": "1.0.0",
    "name": "Login",
    "group": "Subscriber",
    "description": "<p>Log in a subscriber. The request returns a token used to authentication of the subscriber on subsequent requests. The token is placed as an HTTP header ie <code>Authorization: Bearer &lt;Token-here&gt;</code> otherwise requests are rejected.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>subscriber email address</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>Password/Pin</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"email\": \"subscriber@email.com\",\n  \"password\": \"password\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "token",
            "description": "<p>auth token</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "subscriber",
            "description": "<p>subscriber info</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subscriber._id",
            "description": "<p>subscriber id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subscriber.first_name",
            "description": "<p>first name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subscriber.last_name",
            "description": "<p>last name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subscriber.other_name",
            "description": "<p>other names</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "subscriber.phone_number",
            "description": "<p>phone number</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "subscriber.addresses",
            "description": "<p>addresses</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"token\" : \"ylHUMaVrS0dpcO/+nT+6aAVVGcRJzu=\",\n  \"subscriber\": {\n    \"_id\" : \"556e1174a8952c9521286a60\",\n    \"email\": \"subscriber@email.com\",\n    \"name\": \"Jumia Online Shop\",\n    \"website\": \"http://www.jumia.co.ke\",\n    \"address\": \"Moi Avenue, Top House\",\n    \"logo\": \"logo_url\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "post",
    "url": "/subscribers/logout",
    "title": "Logout a subscriber",
    "version": "1.0.0",
    "name": "Logout",
    "group": "Subscriber",
    "description": "<p>Invalidate a subscribers token</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "logged_out",
            "description": "<p>message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"logged_out\" : true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "post",
    "url": "/subscribers/signup",
    "title": "Create a subscriber",
    "version": "1.0.0",
    "name": "Signup",
    "group": "Subscriber",
    "description": "<p>Create a new subscriber. This Content should be submitted as <code>multipart/form-data</code>.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>name of the subscriber</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>subscriber address</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>email address</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "website",
            "description": "<p>subscriber website</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>secret password</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number in international format</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "logo",
            "description": "<p>subscriber logo</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example, should be submitted as```multipart/form-data```.",
          "content": "{\n  \"email\": \"subscriber@email.com\",\n  \"password\": \"password\",\n  \"name\": \"Jumia Online Shop\",\n  \"website\": \"http://www.jumia.co.ke\",\n  \"address\": \"Moi Avenue, Top House\",\n  \"phone_number\": \"254713510521\",\n  \"logo\": \"<LOGO_DATA>\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>name of the subscriber</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>subscriber address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>email address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "website",
            "description": "<p>subscriber website</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>secret password</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "logo",
            "description": "<p>subscriber logo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>subscriber id</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  \"email\": \"subscriber@email.com\",\n  \"name\": \"Jumia Online Shop\",\n  \"website\": \"http://www.jumia.co.ke\",\n  \"address\": \"Moi Avenue, Top House\",\n  \"logo\": \"logo_url\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "put",
    "url": "/subscribers/:id",
    "title": "Update Subscriber",
    "version": "1.0.0",
    "name": "Update",
    "group": "Subscriber",
    "description": "<p>Update a subscriber with the given id</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "name",
            "description": "<p>name of the subscriber</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "address",
            "description": "<p>subscriber address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "email",
            "description": "<p>email address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "website",
            "description": "<p>subscriber website</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>secret password</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number in international format</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "logo",
            "description": "<p>subscriber logo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>subscriber id</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  \"email\": \"subscriber@email.com\",\n  \"name\": \"Jumia Online Shop\",\n  \"website\": \"http://www.jumia.co.ke\",\n  \"address\": \"Moi Avenue, Top House\",\n  \"phone_number\": \"254713510521\",\n  \"logo\": \"logo_url\"\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "put",
    "url": "/subscribers/:id/logos",
    "title": "Update subscribers logos",
    "version": "1.0.0",
    "name": "UpdateLogo",
    "group": "Subscriber",
    "description": "<p>Update a logo of a given subscriber. This should be submitted as <code>multipart/form-data</code> data format.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "logo",
            "description": "<p>new logo buffer</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example(submitted as ```multipart/form-data```):",
          "content": "{\n   \"logo\": \"<LOGO_BUFFER>\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"updated\": true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "post",
    "url": "/subscribers/password/update",
    "title": "Update subscribers password",
    "version": "1.0.0",
    "name": "UpdatePassword",
    "group": "Subscriber",
    "description": "<p>Update password of a given subscriber.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>new password</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n   \"new_password\" : \"newpassword\"\n   \"old_password\" : \"oldpassword\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"updated\": true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "put",
    "url": "/subscribers/:id/plans",
    "title": "Update subscribers subscription plans",
    "version": "1.0.0",
    "name": "UpdateSubscriptionPlan",
    "group": "Subscriber",
    "description": "<p>Update subscription of a given subscriber</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "plan",
            "description": "<p>subscription plan</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n   \"plan\" : \"pro\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"updated\": true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "get",
    "url": "/subscribers/verify/:token",
    "title": "Verify a user/subscriber",
    "version": "1.0.0",
    "name": "Verify",
    "group": "Subscriber",
    "description": "<p>Verify a user/subscriber</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "verified",
            "description": "<p>verified or not</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"verified\" : true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/subscribers.js",
    "groupTitle": "Subscriber"
  },
  {
    "type": "delete",
    "url": "/users/:id",
    "title": "Delete User",
    "version": "1.0.0",
    "name": "Delete",
    "group": "User",
    "description": "<p>Delete a user with the given id</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "other_name",
            "description": "<p>other names</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "addresses",
            "description": "<p>addresses</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  \"last_name\": \"smith\",\n  \"first_name\": \"john\",\n  \"other_name\": \"cole\",\n  \"phone_number\": \"254711223344\",\n  \"addresses\" : []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users?page=<RESULTS_PAGE>&per_page=<RESULTS_PER_PAGE>",
    "title": "Get users collection",
    "version": "1.0.0",
    "name": "FetchAll",
    "group": "User",
    "description": "<p>Get a collection of users. The endpoint has pagination out of the box. Use these params to query with pagination: <code>page=&lt;RESULTS_PAGE</code> and <code>per_page=&lt;RESULTS_PER_PAGE&gt;</code>.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "other_name",
            "description": "<p>other names</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "addresses",
            "description": "<p>addresses</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"total_pages\": 1,\n  \"total_docs_count\": 0,\n  \"docs\": [{\n    \"_id\" : \"556e1174a8952c9521286a60\",\n    \"last_name\": \"smith\",\n    \"first_name\": \"john\",\n    \"other_name\": \"cole\",\n    \"phone_number\": \"254711223344\",\n    \"addresses\" : []\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id/addresses",
    "title": "Get user's address collection",
    "version": "1.0.0",
    "name": "FetchUserAddresses",
    "group": "User",
    "description": "<p>Get a collection of user's addresses</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>address id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "virtual_code",
            "description": "<p>virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location_pic",
            "description": "<p>location photo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "street_address",
            "description": "<p>street address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>city name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>country name</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "[{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  user: \"556e1174a8952c9521286a60\",\n  short_plus_code: \"MP7H+E2\",\n  long_plus_code: \"6E9AEFMP7H+E2FH\",\n  virtual_code: \"BB35E24B\",\n  location_pic: \"/media/a8952c9521286a60.jpeg\",\n  latitude: 4.567889,\n  longitude: -12.098,\n  street_address: \"\",\n  city: \"nairobi\",\n  country: \"kenya\"\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/users/:id",
    "title": "Get User",
    "version": "1.0.0",
    "name": "Get",
    "group": "User",
    "description": "<p>Get a user with the given id</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "other_name",
            "description": "<p>other names</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "addresses",
            "description": "<p>addresses</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  \"last_name\": \"smith\",\n  \"first_name\": \"john\",\n  \"other_name\": \"cole\",\n  \"phone_number\": \"254711223344\",\n  \"addresses\" : []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/login",
    "title": "Login a user",
    "version": "1.0.0",
    "name": "Login",
    "group": "User",
    "description": "<p>Log in a user. The request returns a token used to authentication of the user on subsequent requests. The token is placed as an HTTP header ie <code>Authorization: Bearer &lt;Token-here&gt;</code> otherwise requests are rejected.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "username",
            "description": "<p>user phoner number</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>Password/Pin</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"phone_number\": \"245757565\",\n  \"password\": \"mypin\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "token",
            "description": "<p>auth token</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>user info</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user._id",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user.first_name",
            "description": "<p>first name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user.last_name",
            "description": "<p>last name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user.other_name",
            "description": "<p>other names</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user.phone_number",
            "description": "<p>phone number</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "user.addresses",
            "description": "<p>addresses</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"token\" : \"ylHUMaVrS0dpcO/+nT+6aAVVGcRJzu=\",\n  \"user\": {\n    \"_id\" : \"556e1174a8952c9521286a60\",\n    \"last_name\": \"smith\",\n    \"first_name\": \"john\",\n    \"other_name\": \"cole\",\n    \"phone_number\": \"254711223344\",\n    \"addresses\" : []\n  }\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/logout",
    "title": "Logout a user",
    "version": "1.0.0",
    "name": "Logout",
    "group": "User",
    "description": "<p>Invalidate a users token</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "logged_out",
            "description": "<p>message</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"logged_out\" : true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/users/signup",
    "title": "Create a user",
    "version": "1.0.0",
    "name": "Signup",
    "group": "User",
    "description": "<p>Create a new user</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "phone_number",
            "description": "<p>Phone number</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "password",
            "description": "<p>Password/Pin</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "other_name",
            "description": "<p>other names</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "security_pass",
            "description": "<p>security question and answer</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "security_pass.question",
            "description": "<p>security question</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "security_pass.answer",
            "description": "<p>security answer</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n  \"phone_number\": \"254711223344\",\n  \"password\": \"pin\",\n  \"last_name\": \"smith\",\n  \"first_name\": \"john\",\n  \"other_name\": \"cole\",\n  \"security_pass\": {\n    \"question\": \"what was your first ever nickname\",\n    \"answer\": \"none\"\n  }\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "other_name",
            "description": "<p>other names</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "addresses",
            "description": "<p>addresses</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  \"last_name\": \"smith\",\n  \"first_name\": \"john\",\n  \"other_name\": \"cole\",\n  \"addresses\" : []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/:id",
    "title": "Update User",
    "version": "1.0.0",
    "name": "Update",
    "group": "User",
    "description": "<p>Update a user with the given id</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "first_name",
            "description": "<p>first name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "last_name",
            "description": "<p>last name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "other_name",
            "description": "<p>other names</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Array</p> ",
            "optional": false,
            "field": "addresses",
            "description": "<p>addresses</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  \"last_name\": \"smith\",\n  \"first_name\": \"john\",\n  \"other_name\": \"cole\",\n  \"phone_number\": \"254711223344\",\n  \"addresses\" : []\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/users/password/update",
    "title": "Update user password/pin",
    "version": "1.0.0",
    "name": "UpdatePassword",
    "group": "User",
    "description": "<p>Update password of a given user.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "security_answer",
            "description": "<p>security question answer</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "security_question",
            "description": "<p>security question</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "phone_number",
            "description": "<p>phone number</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "new_password",
            "description": "<p>new password/pin</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example:",
          "content": "{\n   \"security_question\": \"What was you first ever nickname\",\n   \"security_answer\" : \"john doey\",\n   \"phone_number\" : \"0713510521\"\n   \"new_password\": \"2654\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"updated\": true\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/users.js",
    "groupTitle": "User"
  },
  {
    "type": "put",
    "url": "/addresses/:id/archive",
    "title": "Archive an address",
    "version": "1.0.0",
    "name": "Archive",
    "group": "address",
    "description": "<p>Archive an address with the given id</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>address id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "long_plus_code",
            "description": "<p>long virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "short_plus_code",
            "description": "<p>short virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location_pic",
            "description": "<p>location photo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "virtual_code",
            "description": "<p>masking code for the plus code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "street_address",
            "description": "<p>street address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>city name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>country name</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  user: \"556e1174a8952c9521286a60\",\n  short_plus_code: \"MP7H+E2\",\n  long_plus_code: \"6E9AEFMP7H+E2FH\",\n  location_pic: \"/media/a8952c9521286a60.jpeg\",\n  virtual_code: \"BB35E24B\",\n  latitude: 4.567889,\n  longitude: -12.098,\n  street_address: \"\",\n  city: \"nairobi\",\n  country: \"kenya\",\n  shared: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/addresses.js",
    "groupTitle": "address"
  },
  {
    "type": "post",
    "url": "/addresses/create",
    "title": "Create Address",
    "version": "1.0.0",
    "name": "CreateNew",
    "group": "address",
    "description": "<p>Create an Address. Data should be submitted as <strong>multipart/form-data</strong>.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>id of the user creating the address</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location_pic",
            "description": "<p>location photo</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude coordinate</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude coordinate</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "long_plus_code",
            "description": "<p>long plus code</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "short_plus_code",
            "description": "<p>short plus code</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "street_address",
            "description": "<p>street address</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>city name</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>country name</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "(this is not json data but listing of request fields, all fields should be placed\nas part of the multipart/form-data data):\n{\n     \"user\" : \"556e1174a8952c9521286a60\",\n     location_pic: \"image file\"\n     short_plus_code: \"MP7H+E2\",\n     long_plus_code: \"6E9AEFMP7H+E2FH\",\n     latitude: 4.567889,\n     longitude: -12.098,\n     street_address: \"\",\n     city: \"nairobi\",\n     country: \"kenya\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>address id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "long_plus_code",
            "description": "<p>long virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "short_plus_code",
            "description": "<p>short virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location_pic",
            "description": "<p>location photo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "street_address",
            "description": "<p>street address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "virtual_code",
            "description": "<p>masking code for the plus code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>city name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>country name</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  user: \"556e1174a8952c9521286a60\",\n  short_plus_code: \"MP7H+E2\",\n  long_plus_code: \"6E9AEFMP7H+E2FH\",\n  virtual_code: \"BB35E24B\",\n  location_pic: \"/media/a8952c9521286a60.jpeg\",\n  latitude: 4.567889,\n  longitude: -12.098,\n  street_address: \"\",\n  city: \"nairobi\",\n  country: \"kenya\",\n  shared: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/addresses.js",
    "groupTitle": "address"
  },
  {
    "type": "delete",
    "url": "/addresses/:id",
    "title": "Delete address",
    "version": "1.0.0",
    "name": "Delete",
    "group": "address",
    "description": "<p>Delete a address with the given id</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>address id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "long_plus_code",
            "description": "<p>long virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "short_plus_code",
            "description": "<p>short virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location_pic",
            "description": "<p>location photo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "street_address",
            "description": "<p>street address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>city name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>country name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "virtual_code",
            "description": "<p>masking code for the plus code</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  user: \"556e1174a8952c9521286a60\",\n  short_plus_code: \"MP7H+E2\",\n  virtual_code: \"BB35E24B\",\n  long_plus_code: \"6E9AEFMP7H+E2FH\",\n  location_pic: \"/media/a8952c9521286a60.jpeg\",\n  latitude: 4.567889,\n  longitude: -12.098,\n  street_address: \"\",\n  city: \"nairobi\",\n  country: \"kenya\",\n  shared: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/addresses.js",
    "groupTitle": "address"
  },
  {
    "type": "get",
    "url": "/addresses?page=<RESULTS_PAGE>&per_page=<RESULTS_PER_PAGE>",
    "title": "Get addresses collection",
    "version": "1.0.0",
    "name": "FetchAll",
    "group": "address",
    "description": "<p>Get a collection of addresses. The endpoint has pagination out of the box. Use these params to query with pagination: <code>page=&lt;RESULTS_PAGE</code> and <code>per_page=&lt;RESULTS_PER_PAGE&gt;</code>.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>address id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "long_plus_code",
            "description": "<p>long virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "short_plus_code",
            "description": "<p>short virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location_pic",
            "description": "<p>location photo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "street_address",
            "description": "<p>street address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>city name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>country name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "virtual_code",
            "description": "<p>masking code for the plus code</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"total_pages\": 1,\n  \"total_docs_count\": 0,\n  \"docs\": [{\n     \"_id\" : \"556e1174a8952c9521286a60\",\n    user: \"556e1174a8952c9521286a60\",\n    short_plus_code: \"MP7H+E2\",\n    long_plus_code: \"6E9AEFMP7H+E2FH\",\n    virtual_code: \"BB35E24B\",\n    location_pic: \"/media/a8952c9521286a60.jpeg\",\n    latitude: 4.567889,\n    longitude: -12.098,\n    street_address: \"\",\n    city: \"nairobi\",\n    country: \"kenya\",\n    shared: false\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/addresses.js",
    "groupTitle": "address"
  },
  {
    "type": "get",
    "url": "/addresses/:id",
    "title": "Get address",
    "version": "1.0.0",
    "name": "Get",
    "group": "address",
    "description": "<p>Get a address with the given id</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>address id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "long_plus_code",
            "description": "<p>long virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "short_plus_code",
            "description": "<p>short virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location_pic",
            "description": "<p>location photo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "street_address",
            "description": "<p>street address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>city name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>country name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "virtual_code",
            "description": "<p>masking code for the plus code</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  user: \"556e1174a8952c9521286a60\",\n  short_plus_code: \"MP7H+E2\",\n  virtual_code: \"BB35E24B\",\n  long_plus_code: \"6E9AEFMP7H+E2FH\",\n  location_pic: \"/media/a8952c9521286a60.jpeg\",\n  latitude: 4.567889,\n  longitude: -12.098,\n  street_address: \"\",\n  city: \"nairobi\",\n  country: \"kenya\",\n  shared: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/addresses.js",
    "groupTitle": "address"
  },
  {
    "type": "get",
    "url": "/addresses/search?<QUERY_TYPE>=<QUERY_VALUE>",
    "title": "Search for addresses",
    "version": "1.0.0",
    "name": "Search",
    "group": "address",
    "description": "<p>Search for addresses. The following list contains list query types that can be used:</p> <ul> <li>phone_number: user phone number</li> <li>first_name: user first name</li> <li>last_name: user last name</li> <li>other_name: user other name</li> <li>virtual_code: virtual/masked code</li> <li>latitude: latitude</li> <li>longitude: longitude</li> <li>street_address: street address</li> <li>city: city</li> <li>country: country</li> </ul> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>address id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "long_plus_code",
            "description": "<p>long virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "short_plus_code",
            "description": "<p>short virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location_pic",
            "description": "<p>location photo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "street_address",
            "description": "<p>street address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>city name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>country name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "virtual_code",
            "description": "<p>masking code for the plus code</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "[{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  user: \"556e1174a8952c9521286a60\",\n  short_plus_code: \"MP7H+E2\",\n  long_plus_code: \"6E9AEFMP7H+E2FH\",\n  virtual_code: \"BB35E24B\",\n  location_pic: \"/media/a8952c9521286a60.jpeg\",\n  latitude: 4.567889,\n  longitude: -12.098,\n  street_address: \"\",\n  city: \"nairobi\",\n  country: \"kenya\",\n  shared: true\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/addresses.js",
    "groupTitle": "address"
  },
  {
    "type": "put",
    "url": "/addresses/:id",
    "title": "Update address",
    "version": "1.0.0",
    "name": "Update",
    "group": "address",
    "description": "<p>Update a address with the given id</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>address id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "user",
            "description": "<p>user id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "long_plus_code",
            "description": "<p>long virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "short_plus_code",
            "description": "<p>short virtual code</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "location_pic",
            "description": "<p>location photo</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "latitude",
            "description": "<p>latitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Number</p> ",
            "optional": false,
            "field": "longitude",
            "description": "<p>longitude coordinate</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "street_address",
            "description": "<p>street address</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "city",
            "description": "<p>city name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "country",
            "description": "<p>country name</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "virtual_code",
            "description": "<p>masking code for the plus code</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  user: \"556e1174a8952c9521286a60\",\n  short_plus_code: \"MP7H+E2\",\n  long_plus_code: \"6E9AEFMP7H+E2FH\",\n  location_pic: \"/media/a8952c9521286a60.jpeg\",\n  latitude: 4.567889,\n  virtual_code: \"BB35E24B\",\n  longitude: -12.098,\n  street_address: \"\",\n  city: \"nairobi\",\n  country: \"kenya\",\n  shared: false\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/addresses.js",
    "groupTitle": "address"
  },
  {
    "type": "post",
    "url": "/logs/create",
    "title": "Create Log",
    "version": "1.0.0",
    "name": "CreateNew",
    "group": "log",
    "description": "<p>Create an Log.</p> ",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "source",
            "description": "<p>log source</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>log type</p> "
          },
          {
            "group": "Parameter",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "info",
            "description": "<p>log info</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Request Example",
          "content": "{\n      \"source\": \"android\",\n      \"type\": \"bug\",\n      \"info\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>log id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "solved",
            "description": "<p>solved</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "source",
            "description": "<p>log source</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>log type</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "info",
            "description": "<p>log info</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  \"source\": \"android\",\n  \"type\": \"bug\",\n  \"info\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/logs.js",
    "groupTitle": "log"
  },
  {
    "type": "get",
    "url": "/logs?page=<RESULTS_PAGE>&per_page=<RESULTS_PER_PAGE>",
    "title": "Get logs collection",
    "version": "1.0.0",
    "name": "FetchAll",
    "group": "log",
    "description": "<p>Get a collection of logs. The endpoint has pagination out of the box. Use these params to query with pagination: <code>page=&lt;RESULTS_PAGE</code> and <code>per_page=&lt;RESULTS_PER_PAGE&gt;</code>.</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>log id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "solved",
            "description": "<p>solved</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "source",
            "description": "<p>log source</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>log type</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "info",
            "description": "<p>log info</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"total_pages\": 1,\n  \"total_docs_count\": 0,\n  \"docs\": [{\n     \"_id\" : \"556e1174a8952c9521286a60\",\n     \"solved\": true,\n     \"source\": \"android\",\n     \"type\": \"bug\",\n     \"info\": {...}\n  }]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/logs.js",
    "groupTitle": "log"
  },
  {
    "type": "get",
    "url": "/logs/:id",
    "title": "Get log",
    "version": "1.0.0",
    "name": "Get",
    "group": "log",
    "description": "<p>Get a log with the given id</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>log id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "solved",
            "description": "<p>solved</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "source",
            "description": "<p>log source</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>log type</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "info",
            "description": "<p>log info</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  \"source\": \"android\",\n  \"type\": \"bug\",\n  \"info\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/logs.js",
    "groupTitle": "log"
  },
  {
    "type": "get",
    "url": "/logs/search?<QUERY_TYPE>=<QUERY_VALUE>",
    "title": "Search for logs",
    "version": "1.0.0",
    "name": "Search",
    "group": "log",
    "description": "<p>Search for logs. The types can be mixed and matched i.e <code>/logs/search?solved=true&amp;source=android</code> The following list contains list query types that can be used:</p> <ul> <li>source: android|web|api</li> <li>type: bug|error|crash|activity</li> <li>solved: true|false</li> <li>start_date: ISO_FORMATTED_DATE(&quot;'2015-11-06T11:34:06.929Z'&quot;)</li> </ul> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>log id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "solved",
            "description": "<p>solved</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "source",
            "description": "<p>log source</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>log type</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "info",
            "description": "<p>log info</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "[{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  \"source\": \"android\",\n  \"type\": \"bug\",\n  \"info\": {...}\n}]",
          "type": "json"
        }
      ]
    },
    "filename": "routes/logs.js",
    "groupTitle": "log"
  },
  {
    "type": "put",
    "url": "/logs/:id",
    "title": "Update log",
    "version": "1.0.0",
    "name": "Update",
    "group": "log",
    "description": "<p>Update a log with the given id</p> ",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "_id",
            "description": "<p>log id</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Boolean</p> ",
            "optional": false,
            "field": "solved",
            "description": "<p>solved</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "source",
            "description": "<p>log source</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>String</p> ",
            "optional": false,
            "field": "type",
            "description": "<p>log type</p> "
          },
          {
            "group": "Success 200",
            "type": "<p>Object</p> ",
            "optional": false,
            "field": "info",
            "description": "<p>log info</p> "
          }
        ]
      },
      "examples": [
        {
          "title": "Response Example:",
          "content": "{\n  \"_id\" : \"556e1174a8952c9521286a60\",\n  \"source\": \"android\",\n  \"type\": \"bug\",\n  \"info\": {...}\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/logs.js",
    "groupTitle": "log"
  }
] });