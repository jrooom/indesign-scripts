#targetengine "session"

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
