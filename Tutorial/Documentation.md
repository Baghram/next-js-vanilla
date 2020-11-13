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

<pre><code>Body : {
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
  body: {
    username: String,
    password: String
  }
</code></pre>

### Success Response:

<pre><code>
Code: 200 OK<br/>
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
## Get Profile

### URL

<code>"/api/userdata/profile"</code>

### Method:

<b>GET</b>

### URL Params

Required:


Optional:


### Data Params

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
