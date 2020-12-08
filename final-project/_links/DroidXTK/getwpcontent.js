var message;

function getwpcontent (page)
{
  //Send request to remote server. 
  //var url = "http://droidscript.sgarman.net/message.txt" 
  var url = page;
  SendRequest( url  ); 
} 

//Send an http get request. 
function SendRequest( url ) 
{ 
    var httpRequest = new XMLHttpRequest(); 
    httpRequest.onreadystatechange = function() { HandleReply(httpRequest); };   
    httpRequest.open("GET", url, true); 
    httpRequest.send(null); 
     
    app.ShowProgress( "Loading..." ); 
} 

//Handle the server's reply (a json object). 
function HandleReply( httpRequest ) 
{ 
    if( httpRequest.readyState==4 ) 
    { 
        //If we got a valid response. 
        if( httpRequest.status==200 ) 
        { 
            message = httpRequest.responseText;
            
            app.SendText( message );
           // edt.SetText(message)
          //  app.OpenDrawer( "right" );
            
        } 
        //An error occurred 
        else 
           app.Alert( "Error: " + httpRequest.status + httpRequest.responseText); 
    } 
  app.HideProgress(); 
} 