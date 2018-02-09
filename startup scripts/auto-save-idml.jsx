#targetengine "session"

// Declare doc
var doc;

app.addEventListener('afterOpen', function(theEvent) {
  // Only run once a document is opened. See https://forums.adobe.com/message/5410190
  if(app.layoutWindows.length == 0) return; // Just return when no windows shown avoiding first run...
  // $.writeln('opening');
  doc = app.activeDocument; // get the current doc
  // $.writeln(doc.name);
});

// event Listener on first save
app.addEventListener('afterSaveAs', function(theEvent) {
  autoSaveIdml(doc);
});
// now to the event listener
app.addEventListener('afterSave', function(theEvent) {
  autoSaveIdml(doc);
});



function autoSaveIdml(doc) {
  // $.writeln('saving'); // just to see whats going on
  if (!doc.saved) {
    // catch those possible mistakes
    alert('doc was never saved');
    exit();
  }
  var aName = doc.name; // get the name
  var newName = aName.substr(0, aName.lastIndexOf(".")) + ".idml"; // replace the indd/indt to idml
  // crate a new File Object next to the indd
  var theFile = File(File(doc.filePath).fsName + "/" + newName);
  // export
  doc.exportFile(ExportFormat.INDESIGN_MARKUP, theFile, false);
}
