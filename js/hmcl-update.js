document.addEventListener("DOMContentLoaded", function () {
  // 获取最新版本号和下载链接
  fetch("https://api.yokinanya.icu/hmcl/stable/latest/json")
    .then((response) => response.json())
    .then((data) => {
      // 填充稳定版下载链接
      document.getElementById("stable-exe").href = data.exe;
      document.getElementById("stable-jar").href = data.jar;
      // 填充稳定版版本号
      document.getElementById("stable-version").textContent = "最新版本：" + data.version;
      document.getElementById("stable-sha1-exe").textContent = "SHA1 (exe)：" + data.exesha1;
      document.getElementById("stable-sha1-jar").textContent = "SHA1 (jar)：" + data.jarsha1;
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  fetch("https://api.yokinanya.icu/hmcl/dev/latest/json")
    .then((response) => response.json())
    .then((data) => {
      // 填充开发版下载链接
      document.getElementById("dev-exe").href = data.exe;
      document.getElementById("dev-jar").href = data.jar;
      // 填充开发版版本号
      document.getElementById("dev-version").textContent = "最新版本：" + data.version;
      document.getElementById("dev-sha1-exe").textContent = "SHA1 (exe)：" + data.exesha1;
      document.getElementById("dev-sha1-jar").textContent = "SHA1 (jar)：" + data.jarsha1;
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});
