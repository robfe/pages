function UpdateTemplate() {
  var s = decodeURIComponent(document.location.hash) || "???";
  s = s.replace(/ /g, "-").replace(/^#/, "").replace(/[^\w-]/g, "");
  document.title=s;

  for (var i = 0, a = document.querySelectorAll("textarea"); i < a.length; i++) {
    let p = a.item(i);
    p.value = p.template.replace(/\{ticket\}/g, s);
  }
  
  for (var i = 0, a = document.querySelectorAll("[data-href-placeholder]"); i < a.length; i++) {
    var p = a.item(i);
    p.href = p.getAttribute("data-href-placeholder").replace(/\{ticket\}/g, s);
  }
}

var textBox = document.getElementById("ticket");

textBox.value = decodeURIComponent(document.location.hash.replace(/^#/, ""));

textBox.addEventListener("input", function(e) {
  document.location.hash = encodeURIComponent(e.target.value);
});

for (var i = 0, a = document.querySelectorAll("textarea"); i < a.length; i++) {
  let p = a.item(i);
  p.onclick = () => p.select();
  p.template = p.value;
  if(i == 0){
    setTimeout(()=>{
      p.focus();
      p.select();
    }, 50);
  }
}

UpdateTemplate();
window.onhashchange = UpdateTemplate;