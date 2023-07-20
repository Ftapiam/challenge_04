function showHighscores() {
  //get info saved in localstore
  var results = JSON.parse(window.localStorage.getItem('result')) || [];
  results.sort(function (a, b) {
    return b.score - a.score;
  });
//assign results to list
  for (var i = 0; i < results.length; i += 1) {
    var liTag = document.createElement('li');
    liTag.textContent = results[i].initials + ' - ' + results[i].score;
    var olEl = document.getElementById('result');
    olEl.appendChild(liTag);
  }
}
//function to delete info
function clearList() {
  window.localStorage.removeItem('result');
  window.location.reload();
}
document.getElementById('clear').onclick = clearList;

showHighscores();
