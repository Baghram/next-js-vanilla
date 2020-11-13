# Documentation
______________________________________________________________________________________

## Login

### URL

<code>"/api/userdata/login"</code>

### Method:

<b>POST</b>

### URL Params

Required:


Optional:


### Data Params

<pre><code>
  Body : {
   username : String,
   password : String
  }</code></pre>

### Success Response:

<pre><code>Code: 200 OK
Content: { 
 message : "login success",
 token   : String
 }</code></pre>


### Error Response:
<pre>
<code>Code: 400 Bad Request

Content: {
   message: "login failed"
}
</code>
</pre>

Notes:
token is jwt
______________________________________________________________________________________
## GET User

### URL

<code>"/api/userdata/user"</code>

### Method:

<b>GET</b>

### URL Params

Required:


Optional:


### Data Params
<pre>
<code>
  headers: {
    token: String
  }
</code>
</pre>

### Success Response:

<pre><code>
Code: 200 OK<br/>
Content: {
  "data": [
            {
              "id": 11,
              "username": "test@haha.com",
              "Profile": []
            }
      ]
  }</code></pre>


### Error Response:
<pre>
<code>Code: 400 Bad Request<br/>

Content: {
  message: Error
}
</code>
</pre>


Notes:

______________________________________________________________________________________
## Create User

### URL

<code>"/api/userdata/user"</code>

### Method:

<b>POST</b>

### URL Params

Required:


Optional:


### Data Params
<pre><code>
  headers: {
    token: String 
  }
  body: {
    username: String,
    password: String
  }
</code></pre>

### Success Response:

<pre><code>
Code: 201  Created<br/>
Content:{
          "message": "create success"
        }</code></pre>


### Error Response:
<pre>
<code>Code: 400 Bad Request<br/>

Content: {
    "message": "user already exist"
}
</code>
</pre>


Notes:

______________________________________________________________________________________
## Update User

### URL

<code>"/api/userdata/user"</code>

### Method:

<b>PUT</b>

### URL Params

Required:


Optional:


### Data Params
<pre><code>
  headers: {
  token: String
}
  body: {
    username: String,
    password: String,
    id: Integer
  }
</code></pre>

### Success Response:

<pre><code>
Code: 200 OK<br/>
Content:{
          "message": "update success"
        }</code></pre>


### Error Response:
<pre>
<code>Code: 400 Bad Request<br/>

Content: {
    "message": "update failed"
}
</code>
</pre>


Notes:

______________________________________________________________________________________
## Delete User

### URL

<code>"/api/userdata/user"</code>

### Method:

<b>DELETE</b>

### URL Params

Required:


Optional:


### Data Params
<pre><code>
  headers: {
    token: String
  }
  body: {
    id: Integer
  }
</code></pre>

### Success Response:

<pre><code>
Code: 200 OK<br/>
Content:{
          "message": "delete success"
        }</code></pre>


### Error Response:
<pre>
<code>Code: 400 Bad Request<br/>

Content: {
    "message": "delete failed"
}
</code>
</pre>


Notes:
______________________________________________________________________________________
## Get Profile(get many profile)

### URL

<code>"/api/userdata/profile"</code>

### Method:

<b>GET</b>

### URL Params

Required:


Optional:


### Data Params
<pre>
<code>
headers: {
  token: string
}
</code>
</pre>

### Success Response:

<pre><code>
Code: 200 OK<br/>
Content:{
    "message": "get Profile Success",
    "data": {
        "id": 11,
        "username": "test@haha.com",
        "Profile": [
            {
                "id": 15,
                "handphone": "sssdddd",
                "alamat": "tralalal",
                "avatar": "uploads/avatar/2020/11/avatar_11.jpeg",
                "userid": 11,
                "avatartype": "image/jpeg"
            }
        ]
    }
}</code></pre>


### Error Response:
<pre>
<code>Code: 400 Bad Request<br/>

Content: {
    "message": "delete failed"
}
</code>
</pre>


Notes:
  ______________________________________________________________________________________
  ## Create Profile

  ### URL

  <code>"/api/userdata/profile"</code>

  ### Method:

  <b>POST</b>

  ### URL Params

  Required:


  Optional:


  ### Data Params
  <pre>
  <code>
  headers: {
    token: string
  },
  body: {
    handphone: String,
    alamat: String,
    avatar: Files(image),
    ,

  }
  </code>
  </pre>

  ### Success Response:

  <pre><code>
  Code: 201 Created<br/>
  {
      "message": "add profile success!!",
      "data": {
          "id": 19,
          "handphone": "sssdddd",
          "alamat": "tralalal",
          "avatar": "uploads/avatar/2020/11/avatar_11.jpeg",
          "userid": 11,
          "avatartype": "image/jpeg"
      }
  }
  </code></pre>


  ### Error Response:
  <pre>
  <code>Code: 400 Bad Request<br/>

  Content: {
      "error": String
  }
  </code>
  </pre>


  Notes:
  ______________________________________________________________________________________
  ## Update Profile

  ### URL

  <code>"/api/userdata/profile"</code>

  ### Method:

  <b>PUT</b>

  ### URL Params

  Required:


  Optional:


  ### Data Params
  <pre>
  <code>
  headers: {
    token: string
  },
  body: {
    handphone: String,
    alamat: String,
    avatar: Files(image),
    id: Integer,

  }
  </code>
  </pre>

  ### Success Response:

  <pre><code>
  Code: 200 OK<br/>
  
  Content:{
    "message": "update profile success"
  }
  </code></pre>


  ### Error Response:
  <pre>
  <code>Code: 400 Bad Request<br/>

  Content: {
      "error": String
  }
  </code>
  </pre>


  Notes:
______________________________________________________________________________________
  ## Delete Profile

  ### URL

  <code>"/api/userdata/profile"</code>

  ### Method:

  <b>DELETE</b>

  ### URL Params

  Required:


  Optional:


  ### Data Params
  <pre>
  <code>
  headers: {
    token: string
  },
  body: {
    id: Integer,

  }
  </code>
  </pre>

  ### Success Response:

  <pre><code>
  Code: 200 OK<br/>
  
  Content:{
    "message": "delete success"
}
  </code></pre>


  ### Error Response:
  <pre>
  <code>Code: 400 Bad Request<br/>

  Content: {
      "error": String
  }
  </code>
  </pre>


  Notes:
