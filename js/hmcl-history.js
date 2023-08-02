document.addEventListener("DOMContentLoaded", function () {
  var stableVersionsTable = document.getElementById("stable-versions");
  var devVersionsTable = document.getElementById("dev-versions");

  function createVersionRow(version, links, channel) {
    var row = document.createElement("tr");

    var versionCell = document.createElement("td");
    versionCell.innerText = version;
    row.appendChild(versionCell);

    var sha1Cell = document.createElement("td");
    sha1Cell.innerText = "exe：" + links.exesha1 + " \n " + "jar：" + links.jarsha1;
    row.appendChild(sha1Cell);1

    var exeCell = document.createElement("td");
    var exeLink = document.createElement("a");
    exeLink.href = links.exe;
    exeLink.innerText = "hmcl-" + channel + "-" + version + ".exe";
    exeCell.appendChild(exeLink);
    row.appendChild(exeCell);

    var jarCell = document.createElement("td");
    var jarLink = document.createElement("a");
    jarLink.href = links.jar;
    jarLink.innerText = "hmcl-" + channel + "-" + version + ".jar";
    jarCell.appendChild(jarLink);
    row.appendChild(jarCell);

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
              var versionRow = createVersionRow(version, data, channel);
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
