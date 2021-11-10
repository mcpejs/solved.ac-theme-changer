// ==UserScript==
// @name         Solved.ac 테마
// @description  Solved.ac 사이트의 색 테마를 변경하는 스크립트입니다 https://github.com/mcpejs/solved.ac-theme-changer
// @version      1.0
// @author       mcpejs
// @match        https://solved.ac/profile/*
// @icon         https://www.google.com/s2/favicons?domain=solved.ac

// @grant        GM_setValue
// @grant        GM_getValue

// @require     https://code.jquery.com/jquery-3.6.0.slim.min.js

// @require     https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.min.js
// @resource    bootstrapCSS https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css

// @grant       GM_addStyle
// @grant       GM_getResourceURL
// ==/UserScript==

function cssElement(url) {
  var link = document.createElement("link");
  link.href = url;
  link.rel = "stylesheet";
  link.type = "text/css";
  return link;
}
document.head.appendChild(cssElement(GM_getResourceURL("bootstrapCSS")));

const css = `
.modal-header {
  border-bottom: 0 none;
}

.modal-footer {
  border-top: 0 none;
}
`;
GM_addStyle(css);

let solvedac = [
  "rgb(161, 228, 172)",
  "rgb(120, 203, 148)",
  "rgb(78, 177, 124)",
  "rgb(0, 121, 80)",
];

//Color palette from https://github.com/williambelle/github-contribution-color-graph/blob/master/src/js/contentscript.js
let halloween = ["#fdf156", "#ffc722", "#ff9711", "#04001b"];

// Themes from Material design
let amber = ["#ffecb3", "#ffd54f", "#ffb300", "#ff6f00"];
let blue = ["#bbdefb", "#64b5f6", "#1e88e5", "#0d47a1"];
let bluegrey = ["#cfd8dc", "#90a4ae", "#546e7a", "#263238"];
let brown = ["#d7ccc8", "#a1887f", "#6d4c41", "#3e2723"];
let cyan = ["#b2ebf2", "#4dd0e1", "#00acc1", "#006064"];
let deeporange = ["#ffccbc", "#ff8a65", "#f4511e", "#bf360c"];
let deeppurple = ["#d1c4e9", "#9575cd", "#5e35b1", "#311b92"];
let green = ["#c8e6c9", "#81c784", "#43a047", "#1b5e20"];
let grey = ["#e0e0e0", "#9e9e9e", "#616161", "#212121"];
let indigo = ["#c5cae9", "#7986cb", "#3949ab", "#1a237e"];
let lightblue = ["#b3e5fc", "#4fc3f7", "#039be5", "#01579b"];
let lightgreen = ["#dcedc8", "#aed581", "#7cb342", "#33691e"];
let lime = ["#f0f4c3", "#dce775", "#c0ca33", "#827717"];
let orange = ["#ffe0b2", "#ffb74d", "#fb8c00", "#e65100"];
let pink = ["#f8bbd0", "#f06292", "#e91e63", "#880e4f"];
let purple = ["#e1bee7", "#ba68c8", "#8e24aa", "#4a148c"];
let red = ["#ffcdd2", "#e57373", "#e53935", "#b71c1c"];
let teal = ["#b2dfdb", "#4db6ac", "#00897b", "#004d40"];
let yellowMd = ["#fff9c4", "#fff176", "#ffd835", "#f57f17"];

// Theme from Me
let unicorn = ["#6dc5fb", "#f6f68c", "#8affa4", "#f283d1"];
let summer = ["#eae374", "#f9d62e", "#fc913a", "#ff4e50"];
let sunset = ["#fed800", "#ff6f01", "#fd2f24", "#811d5e"];

// Theme from MoonAntonio
let moon = ["#6bcdff", "#00a1f3", "#48009a", "#4f2266"];
let psychedelic = ["#faafe1", "#fb6dcc", "#fa3fbc", "#ff00ab"];
let yellow = ["#d7d7a2", "#d4d462", "#e0e03f", "#ffff00"];

let colors = {
  solvedac: solvedac,
  halloween: halloween,

  amber: amber,
  blue: blue,
  bluegrey: bluegrey,
  brown: brown,
  cyan: cyan,
  deeporange: deeporange,
  deeppurple: deeppurple,
  green: green,
  grey: grey,
  indigo: indigo,
  lightblue: lightblue,
  lightgreen: lightgreen,
  lime: lime,
  orange: orange,
  pink: pink,
  purple: purple,
  red: red,
  teal: teal,
  yellowMd: yellowMd,

  summer: summer,
  unicorn: unicorn,
  sunset: sunset,

  moon: moon,
  psychedelic: psychedelic,
  yellow: yellow,
};

function applyColor(theme) {
  let i = 0;
  for (const color of colors.solvedac) {
    const rects = document.querySelectorAll(`[fill="${color}"]`);
    rects.forEach((e) => e.setAttribute("fill", theme[i]));
    i++;
  }
}

function removeZeroSolved() {
  $('[fill="rgb(221, 223, 224)"]').attr("fill", "rgb(247, 248, 249)");
  //.remove()
}

function injectButton() {
  const colorSettingButton =
    '<a id="setting" style="right: 35px;position: absolute;cursor:pointer">테마 설정</a>';
  document
    .querySelectorAll(".borJCn")[1]
    .insertAdjacentHTML("beforeend", colorSettingButton);
  document.querySelector("#setting").onclick = () =>
    $("#myModal").modal("show");
}

function injectModal() {
  var modalHtml = `
  <div class="modal" id="myModal" tabindex="-1">
    <div class="modal-dialog" style="top:30%">
      <div class="modal-content">
        <div class="modal-body">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" id="removeZeroSolved">
            <label class="form-check-label" for="removeZeroSolved">
            잔디 빈공간 제거
            </label>
          </div>
          <div class="form-group">
            <select class="form-control" id="color">
            </select>
            <a target="blank" href="https://github.com/williambelle/github-contribution-color-graph/blob/master/docs/THEMES.md">여기서</a> 적용 예시를 볼수있어요.
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">취소</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" id="save">저장</button>
        </div>
      </div>
    </div>
  </div>
`;
  $("body").prepend(modalHtml);
  $("#save").click(save);

  const colorEle = $("#color");

  for (const key in colors) {
    colorEle.append(`<option>${key}</option>`);
  }

  $("#removeZeroSolved").prop(
    "checked",
    GM_getValue("removeZeroSolved", false)
  );
  colorEle.val(GM_getValue("color", "solvedac"));
}

function save() {
  GM_setValue("removeZeroSolved", $("#removeZeroSolved").is(":checked"));
  GM_setValue("color", $("#color").val());
  location.reload();
}

function profilePage() {
  injectButton();
  injectModal();
  // $("#myModal").modal("show");

  if (GM_getValue("removeZeroSolved", false)) removeZeroSolved();
  applyColor(colors[GM_getValue("color", "solvedac")]);
}

profilePage();
