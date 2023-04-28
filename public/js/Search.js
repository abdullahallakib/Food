export const mysearchFunction = () => {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  // console.log("🚀 ~ file: index.html:72 ~ myFunction ~ filter:", filter);
  ul = document.getElementById("paginated-list");
  // console.log("🚀 ~ file: index.js:23 ~ myFunction ~ ul:", ul);

  li = ul.querySelectorAll(".box");
  // console.log("🚀 ~ file: index.html:75 ~ myFunction ~ li:", li);

  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("h3")[0];
    // console.log("🚀 ~ file: index.html:79 ~ myFunction ~ a:", a);
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
};
