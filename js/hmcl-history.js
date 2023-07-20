document.addEventListener("DOMContentLoaded", function () {
  var stableVersionsTable = document.getElementById("stable-versions");
  var devVersionsTable = document.getElementById("dev-versions");

  function createVersionRow(version, links) {
    var row = document.createElement("tr");

    var versionCell = document.createElement("td");
    versionCell.innerText = version;
    row.appendChild(versionCell);

    var exeCell = document.createElement("td");
    var exeLink = document.createElement("a");
    exeLink.href = links.exe;
    exeLink.innerText = "Download (exe)";
    exeCell.appendChild(exeLink);
    row.appendChild(exeCell);

    var exeSha1Cell = document.createElement("td");
    exeSha1Cell.innerText = links.exesha1;
    row.appendChild(exeSha1Cell);

    var jarCell = document.createElement("td");
    var jarLink = document.createElement("a");
    jarLink.href = links.jar;
    jarLink.innerText = "Download (jar)";
    jarCell.appendChild(jarLink);
    row.appendChild(jarCell);

    var jarSha1Cell = document.createElement("td");
    jarSha1Cell.innerText = links.jarsha1;
    row.appendChild(jarSha1Cell);

    return row;
  }

  function fetchVersions(channel, table) {
    fetch("https://api.yokinanya.icu/hmcl/" + channel + "/history/json")
      .then(function (response) {
        return response.json();
      })
      .then(function (versions) {
        versions.forEach(function (version) {
          fetch(
            "https://api.yokinanya.icu/hmcl/" +
              channel +
              "/" +
              version +
              "/json"
          )
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              var versionRow = createVersionRow(version, data);
              table.appendChild(versionRow);
            })
            .catch(function (error) {
              console.log(error);
            });
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  fetchVersions("stable", stableVersionsTable);
  fetchVersions("dev", devVersionsTable);
});
