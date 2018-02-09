#targetengine "session"

// Declare  variables
var doc;

app.addEventListener('afterOpen', function(theEvent) {
  // Only run once a document is opened. See https://forums.adobe.com/message/5410190
  if (app.layoutWindows.length == 0) return; // Just return when no windows shown avoiding first run...
  doc = app.activeDocument; // get the current doc
});

// Event Listener on first save / save as
app.addEventListener('afterSaveAs', function(theEvent) {
  autoSaveIdml(doc);
});
// Event Listener on save
app.addEventListener('afterSave', function(theEvent) {
  autoSaveIdml(doc);
});

//
function autoSaveIdml(doc) {
  if (!doc.saved) {
    //
    alert('doc was never saved');
    exit();
  }
  var aName = doc.name; // Get doc name
  var newName = aName.substr(0, aName.lastIndexOf(".")) + ".idml"; // replace the .indd or .indt extension to .idml
  // Create a new File Object next to the .indd / .indt
  var theFile = File(File(doc.filePath).fsName + "/" + newName);
  // Export
  doc.exportFile(ExportFormat.INDESIGN_MARKUP, theFile, false);
}
