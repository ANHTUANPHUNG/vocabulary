import { vocabulary } from "./vocabulary2.js"; // Import dữ liệu từ vựng
// import { vocabulary } from "./newVocabulary.js"; // Import dữ liệu từ vựng

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

var originalVocabulary = [...vocabulary]; // Original array
var currentVocabulary = [...originalVocabulary]; // Current display array

// Function to render vocabulary
function renderVocabulary(vocabulary, hideVn, hideEng) {
  var container = document.getElementById("vocabulary-container");
  container.innerHTML = ""; // Clear old content

  for (let i = 0; i < vocabulary.length; i += 10) {
    var group = document.createElement("div");
    group.className = "group";
    var title = document.createElement("h2");
    group.appendChild(title);

    for (let j = i; j < i + 10 && j < vocabulary.length; j++) {
      var item = document.createElement("div");
      item.className = "item";
      var vnSpan = document.createElement("span");
      var engSpan = document.createElement("span");
      vnSpan.className = "vn";
      engSpan.className = "eng";
      vnSpan.textContent = `${vocabulary[j].vn} (${vocabulary[j].type})`;
      engSpan.textContent = `${vocabulary[j].eng} (${vocabulary[j].pronounce})`;

      if (hideEng) {
        // If hiding English, show an input field instead with saved user input
        var engInput = document.createElement("input");
        engInput.type = "text";
        engInput.className = "eng-input";
        engInput.value = vocabulary[j].userInput || ""; // Restore saved input

        // Save input whenever the user types
        engInput.addEventListener("input", (e) => {
          vocabulary[j].userInput = e.target.value;
        });

        item.appendChild(vnSpan);
        item.appendChild(engInput);
      } else if (hideVn) {
        var vnInput = document.createElement("input");
        vnInput.type = "text";
        vnInput.className = "vn-input";
        vnInput.value = vocabulary[j].userInput || ""; // Restore saved input

        // Save input whenever the user types
        vnInput.addEventListener("input", (e) => {
          vocabulary[j].userInput = e.target.value;
        });
        item.appendChild(engSpan);
        item.appendChild(vnInput);
      } else if (!hideEng && !hideVn) {
        // Otherwise, show English word directly
        var engSpan = document.createElement("span");
        engSpan.className = `eng ${hideEng ? "hidden" : ""}`;
        engSpan.textContent = `${vocabulary[j].eng} (${vocabulary[j].pronounce})`;
        item.appendChild(vnSpan);
        item.appendChild(engSpan);
      }

      group.appendChild(item);
    }

    container.appendChild(group);
  }
}
var lastClickedButton = null; // Lưu trữ nút vừa được bấm
var isShowingVietnamese = true; // Trạng thái hiện tại: đang hiển thị Vietnamese

// Lắng nghe sự kiện click trên tất cả các nút
document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", function () {
    lastClickedButton = this; // Cập nhật nút vừa được click
  });
});

// Xử lý sự kiện nhấn Enter
document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Ngăn Enter kích hoạt lại nút vừa bấm

    // Xóa trạng thái nút vừa click để Enter không thực hiện hành động trước đó
    lastClickedButton = null;

    // Chuyển đổi giữa hiển thị Vietnamese và English
    isShowingVietnamese = !isShowingVietnamese; // Đảo trạng thái
    if (isShowingVietnamese) {
      renderVocabulary(currentVocabulary, false, true); // Hiển thị chỉ Vietnamese
    } else {
      renderVocabulary(currentVocabulary, true, false); // Hiển thị chỉ English
    }
  }
});

// Các sự kiện click cho từng nút
document.getElementById("show-all").addEventListener("click", function () {
  renderVocabulary(currentVocabulary, false, false);
});

document.getElementById("show-vn").addEventListener("click", function () {
  renderVocabulary(currentVocabulary, false, true);
});

document.getElementById("show-eng").addEventListener("click", function () {
  renderVocabulary(currentVocabulary, true, false);
});

document
  .getElementById("show-random-vn")
  .addEventListener("click", function () {
    currentVocabulary = shuffleArray([...originalVocabulary]);
    renderVocabulary(currentVocabulary, false, true);
  });

document
  .getElementById("show-random-eng")
  .addEventListener("click", function () {
    currentVocabulary = shuffleArray([...originalVocabulary]);
    renderVocabulary(currentVocabulary, true, false);
  });
const characters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
function filterVocabularyBySelectedLetters() {
  const selectedLetters = [];

  // Lấy tất cả các checkbox và kiểm tra xem nó có được chọn hay không
  document
    .querySelectorAll("#character-container input[type='checkbox']")
    .forEach(function (checkbox) {
      if (checkbox.checked) {
        selectedLetters.push(checkbox.id.replace("checkbox-", "")); // Lấy chữ cái từ id của checkbox
      }
    });

  if (selectedLetters.length === 0) {
    // Nếu không có checkbox nào được chọn, hiển thị tất cả từ vựng
    const selectAllCheckbox = document.getElementById("character-all");
    selectAllCheckbox.checked = false;
    currentVocabulary = [];
  } else {
    // Lọc từ vựng theo chữ cái đầu tiên
    currentVocabulary = originalVocabulary.filter(function (item) {
      return selectedLetters.includes(item.eng[0].toLowerCase()); // Kiểm tra chữ cái đầu tiên trong từ tiếng Anh
    });
  }

  // Gọi lại renderVocabulary để hiển thị kết quả đã lọc
  renderVocabulary(currentVocabulary, false, false);
}

function renderCharacters() {
  const container = document.getElementById("character-container"); // Lấy thẻ div chứa
  container.innerHTML = ""; // Làm sạch thẻ div trước khi thêm các phần tử mới
  container.style.borderRadius = "5px";
  container.style.position = "relative";
  container.style.left = "0";
  container.style.top = "5px";
  container.style.height = "200px";
  container.style.overflowY = "auto";
  container.style.border = "1px solid grey";
  container.style.backgroundColor = "white";
  container.style.display = 'none';  

  // Duyệt qua mảng characters và tạo các thẻ div
  characters.forEach(function (character) {
    const charDiv = document.createElement("div"); // Tạo thẻ div mới cho từng chữ cái
    charDiv.style.padding = "10px"; // Thêm khoảng cách bên trong thẻ div
    charDiv.style.backgroundColor = "#f0f0f0"; // Màu nền cho mỗi chữ cái
    charDiv.style.border = "1px solid #ccc"; // Viền cho mỗi chữ cái
    charDiv.style.textAlign = "center";
    const checkbox = document.createElement("input");
    checkbox.checked = false;
    checkbox.type = "checkbox";
    checkbox.id = `checkbox-${character}`; // Thêm id cho checkbox
    checkbox.style.marginRight = "10px"; // Khoảng cách giữa checkbox và chữ cái

    // Tạo chữ cái
    const charText = document.createElement("span");
    charText.textContent = character;
    charDiv.addEventListener("click", function () {
      checkbox.checked = !checkbox.checked;
      filterVocabularyBySelectedLetters(); // Khi checkbox thay đổi, lọc lại từ vựng
    });
    checkbox.addEventListener("click", function () {
      checkbox.checked = !checkbox.checked;
      filterVocabularyBySelectedLetters(); // Khi checkbox thay đổi, lọc lại từ vựng
    });

    const selectAllCheckbox = document.getElementById("character-all");
    const disabled = document.getElementById("disabled");
    disabled.addEventListener("click", function () {
      if (container.style.display === 'none') {
        container.style.display = 'block';  
      } else {
        container.style.display = 'none';
      }
    })
    selectAllCheckbox.addEventListener("click", function () {
     

      const checkboxes = document.querySelectorAll(
        "#character-container input[type='checkbox']"
      );

      checkboxes.forEach(function (checkbox) {
        checkbox.checked = selectAllCheckbox.checked; // Đặt trạng thái của các checkbox con theo checkbox "Chọn tất cả"
      });

      filterVocabularyBySelectedLetters(); // Lọc lại từ vựng sau khi thay đổi trạng thái checkbox
    });
    // Thêm checkbox và chữ cái vào div
    charDiv.appendChild(checkbox);
    charDiv.appendChild(charText);

    // Thêm div vào container
    container.appendChild(charDiv);
  });
}
window.onload = function () {
  renderCharacters();
  renderVocabulary(currentVocabulary);
};
