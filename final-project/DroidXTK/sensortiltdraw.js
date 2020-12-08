app.GetPermission( "location" );
function sens()
{
    loc = app.CreateLocator("GPS,Network");
    loc.SetOnChange(loc_OnChange);
    loc.Start();
    app.ShowPopup("Locating");
}

function loc_OnChange(pos)
{
    var msg = pos.latitude + ", " + pos.longitude;
    alert( msg );
}