
const vocabulary2 = [
  {
    vn: "nền, bối cảnh",
    pronounce: "/ˈbækˌɡraʊnd/",
    type: "n.",
    eng: "background",
  },
  { vn: "một cách tồi tệ", pronounce: "/ˈbædli/", type: "adv.", eng: "badly" },
  { vn: "bóng chày", pronounce: "/ˈbeɪsbɔːl/", type: "n.", eng: "baseball" },
  { vn: "dựa vào", pronounce: "/beɪst/", type: "adj.", eng: "based" },
  { vn: "bóng rổ", pronounce: "/ˈbæskɪtbɔːl/", type: "n.", eng: "basketball" },
  { vn: "đánh bại", pronounce: "/biːt/", type: "v.", eng: "beat" },
  { vn: "thịt bò", pronounce: "/biːf/", type: "n.", eng: "beef" },
  { vn: "cư xử", pronounce: "/bɪˈheɪv/", type: "v.", eng: "behave" },
  { vn: "hành vi", pronounce: "/bɪˈheɪvjər/", type: "n.", eng: "behaviour" },
  { vn: "thuộc về", pronounce: "/bɪˈlɔːŋ/", type: "v.", eng: "belong" },
  { vn: "dây đai", pronounce: "/bɛlt/", type: "n.", eng: "belt" },
  { vn: "lợi ích", pronounce: "/ˈbɛnɪfɪt/", type: "n.", eng: "benefit" },
  { vn: "tỷ", pronounce: "/ˈbɪljən/", type: "number", eng: "billion" },
  { vn: "thùng rác", pronounce: "/bɪn/", type: "n.", eng: "bin" },
  { vn: "sinh học", pronounce: "/baɪˈɑːlədʒi/", type: "n.", eng: "biology" },
  { vn: "sự ra đời", pronounce: "/bɜːrθ/", type: "n.", eng: "birth" },
  { vn: "bánh quy", pronounce: "/ˈbɪskɪt/", type: "n.", eng: "biscuit" },
  { vn: "một chút", pronounce: "/bɪt/", type: "n.", eng: "bit" },
  { vn: "trống rỗng", pronounce: "/blæŋk/", type: "adj., n.", eng: "blank" },
  { vn: "máu", pronounce: "/blʌd/", type: "n.", eng: "blood" },
  { vn: "thổi", pronounce: "/bloʊ/", type: "v.", eng: "blow" },
  { vn: "bảng, tấm", pronounce: "/bɔːrd/", type: "n.", eng: "board" },
  { vn: "đun sôi", pronounce: "/bɔɪl/", type: "v.", eng: "boil" },
  { vn: "xương", pronounce: "/boʊn/", type: "n.", eng: "bone" },
  { vn: "đặt chỗ, đặt trước", pronounce: "/bʊk/", type: "v.", eng: "book" },
  { vn: "mượn", pronounce: "/ˈbɑːroʊ/", type: "v.", eng: "borrow" },
  { vn: "sếp", pronounce: "/bɔːs/", type: "n.", eng: "boss" },
  { vn: "đáy", pronounce: "/ˈbɑːtəm/", type: "n., adj.", eng: "bottom" },
  { vn: "tô", pronounce: "/boʊl/", type: "n.", eng: "bowl" },
  { vn: "não", pronounce: "/breɪn/", type: "n.", eng: "brain" },
  { vn: "cầu", pronounce: "/brɪdʒ/", type: "n.", eng: "bridge" },
  { vn: "sáng, rực rỡ", pronounce: "/braɪt/", type: "adj.", eng: "bright" },
  {
    vn: "xuất sắc, tuyệt vời",
    pronounce: "/ˈbrɪljənt/",
    type: "adj.",
    eng: "brilliant",
  },
  { vn: "bị hỏng, vỡ", pronounce: "/ˈbroʊkən/", type: "adj.", eng: "broken" },
  { vn: "chải, cọ", pronounce: "/brʌʃ/", type: "v., n.", eng: "brush" },
  { vn: "đốt cháy", pronounce: "/bɜːrn/", type: "v.", eng: "burn" },
  {
    vn: "doanh nhân",
    pronounce: "/ˈbɪznɪsmæn/",
    type: "n.",
    eng: "businessman",
  },
];

var vocabulary = [
  ...vocabulary2,
  // ...vocabulary2
];
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
function renderVocabulary(vocabulary, hideVn = false, hideEng = false) {
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

      // Fixed Vietnamese text that always stays visible
      var vnSpan = document.createElement("span");
      vnSpan.className = "vn";
      vnSpan.textContent = `${vocabulary[j].vn} (${vocabulary[j].type})`;

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
      } else {
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

// Initialize with unshuffled array
renderVocabulary(currentVocabulary);

// "Show All" button displays both Vietnamese and English without shuffling
document.getElementById("show-all").addEventListener("click", function () {
  renderVocabulary(currentVocabulary, false, false);
});

// "Show Vietnamese" button hides English words, keeping the current order
document.getElementById("show-vn").addEventListener("click", function () {
  renderVocabulary(currentVocabulary, false, true);
});

// "Show English" button hides Vietnamese words, keeping the current order
document.getElementById("show-eng").addEventListener("click", function () {
  renderVocabulary(currentVocabulary, true, false);
});

// "Random vn" button shuffles and displays only Vietnamese words
document
  .getElementById("show-random-vn")
  .addEventListener("click", function () {
    currentVocabulary = shuffleArray([...originalVocabulary]);
    renderVocabulary(currentVocabulary, false, true);
  });

// "Random eng" button shuffles and displays only English words
document
  .getElementById("show-random-eng")
  .addEventListener("click", function () {
    currentVocabulary = shuffleArray([...originalVocabulary]);
    renderVocabulary(currentVocabulary, true, false);
  });
window.onload = function () {
  renderVocabulary(currentVocabulary);
};
