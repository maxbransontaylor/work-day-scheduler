var loadItems = function () {
  $(".time-block").each(function () {
    var hour = $(this).attr("id");
    var text = localStorage.getItem(hour);
    $(this).children(".content").text(text);
  });
};
var saveItem = function (event) {
  var text = $(event.target).prev().text().trim();
  //why won't closest("p") work?
  var time = $(event.target).parent().attr("id");
  localStorage.setItem(time, text);
};
var editItem = function (event) {
  var text = $(this).text();
  var textarea = $("<textarea>").addClass("textarea col-10").val(text);
  $(this).replaceWith(textarea);
  textarea.trigger("focus");
};
$(".time-block").on("blur", "textarea", function () {
  var text = $(this).val().trim();
  var newP = $("<p>").addClass("content col-10").text(text);
  $(this).replaceWith(newP);
  timeStuff();
});
var timeStuff = function () {
  $("#currentDay").text(moment().format("dddd, MMMM Do"));
  $(".content").each(function () {
    var hourSlot = $(this).parent().attr("id");
    var currentTime = moment().hour();
    $(this).removeClass("past present future");
    if (hourSlot < currentTime) {
      $(this).addClass("past");
    } else if (hourSlot == currentTime) {
      $(this).addClass("present");
    } else if (hourSlot > currentTime) {
      $(this).addClass("future");
    }
  });
};
$("body").on("click", ".saveBtn", saveItem);
$("body").on("click", ".content", editItem);
$("#currentDay").text(moment().format("dddd, MMMM Do"));
loadItems();
timeStuff();
