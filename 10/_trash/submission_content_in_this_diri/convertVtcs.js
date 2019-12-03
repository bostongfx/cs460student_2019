function OnStart ()
{
edt = app.CreateCodeEdit("",1,1);
lay = app.CreateLayout("linear");
lay.AddChild(edt);
app.AddLayout(lay)
app.ChooseFile("", "", function (path){
var input = app.ReadFile(path);
var split = input.slice("\n");
for(var i in split)
{
edt.InsertText(split[i]);
}
})

}