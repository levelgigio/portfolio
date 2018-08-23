$(document).ready(function () {

    var cb = new Codebird;
    cb.setConsumerKey("MbwMNKaOKYndg9rKYw7qUEjC5",                             
                      "rMvnZ0IaPiQVR1Gk4VZIUcLGElAV9Nl1AkQ3fTUHhKY20jPcdh");

    $("#auth-btn").on("click", function() {
        // handle button click here
        cb.__call(
            "oauth_requestToken",
            {oauth_callback: "oob"},
            function (reply) {
                // stores it
                cb.setToken(reply.oauth_token, reply.oauth_token_secret);

                // gets the authorize screen URL
                cb.__call(
                    "oauth_authorize",
                    {oauth_callback: "http://levelgigio.github.io/"},
                    function (auth_url) {
                        //window.open(auth_url);
                        window.open(auth_url,"MsgWindow",'height=202,width=800');
                    }
                );
            }
        );
        $("#twitter-pin").on('input', () => {
            $("#pin-btn").removeClass("disabled");
        });
    });



    $("#pin-btn").click(function() {
        if(!$("#pin-btn").hasClass("disabled")) {
            cb.__call(
                "oauth_accessToken",
                {oauth_verifier: document.getElementById("twitter-pin").value},
                function (reply,rate,err) {
                    if (err) {
                        console.log("error response or timeout exceeded" + err.error);
                    }
                    if (reply) {
                        // store the authenticated token, which may be different from the request token (!)
                        alert("Autenticou! ou assim espero kk");
                        $("#tweet-btn").removeClass("disabled");
                        cb.setToken(reply.oauth_token, reply.oauth_token_secret);
                    }

                    // if you need to persist the login after page reload,
                    // consider storing the token in a cookie or HTML5 local storage
                }
            );
        }
    });

    $("#tweet-btn").click( function() {
        if(!$("#tweet-btn").hasClass("disabled")) {
            cb.__call(
                "statuses_update",
                {"status": document.getElementById("tweet").value},
                function (reply, rate, err) {
                    if(reply.httpstatus === 200) {
                        alert("Twitou! ou assim espero tambem kk");
                    }
                    console.log(reply);
                });
        }
    });
});