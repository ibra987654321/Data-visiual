try {
  let firebaseConfig = {
    apiKey: "AIzaSyCDKnyo99uF6A6MzZXWK0KyjwF43dF_0Vs",
    authDomain: "autcersing.firebaseapp.com",
    projectId: "autcersing",
    storageBucket: "autcersing.appspot.com",
    messagingSenderId: "681985000411",
    appId: "1:681985000411:web:beba6032a56df7f0655dfe",
    measurementId: "G-H078HMFN3Y",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics().logEvent("notification_received");

  let rootRef = firebase.database().ref().child("Assets");
  // ====Functions=====
  function getId(tag) {
    return document.getElementById(tag);
  }

  let playersRef = firebase.database().ref();

  playersRef.orderByChild("date").on("child_added", function (data) {
    let users = data.val();
    let html = ``;
    let name = Object.entries(users).map((i) => i[1]);
    html = `<table id="table">  
              <thead>
                <td> Имя</td>
                <td> Email</td>
                <td> Номер</td>
                <td> Вид услуг</td>
                <td> Дата заявки</td>
              </thead>`;
    name.forEach(function (item, i, arr) {
      html += `
        <tr>
          <td> ${item.name}</td>
          <td> ${item.email}</td>
          <td> ${item.number}</td>
          <td> ${item.service}</td>
          <td> ${item.date}</td>
        </tr>
      `;
    });
    html += "</table>";
    getId("name").innerHTML = html;
  });
} catch (error) {}
function fnExcelReport() {
  var tab_text = "<table border='2px'><tr bgcolor='#87AFC6'>";
  var textRange;
  var j = 0;
  tab = document.getElementById("table"); // id of table

  for (j = 0; j < tab.rows.length; j++) {
    tab_text = tab_text + tab.rows[j].innerHTML + "</tr>";
    //tab_text=tab_text+"</tr>";
  }

  tab_text = tab_text + "</table>";
  tab_text = tab_text.replace(/<A[^>]*>|<\/A>/g, ""); //remove if u want links in your table
  tab_text = tab_text.replace(/<img[^>]*>/gi, ""); // remove if u want images in your table
  tab_text = tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

  var ua = window.navigator.userAgent;
  var msie = ua.indexOf("MSIE ");
  if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {
    // If Internet Explorer
    txtArea1.document.open("txt/html", "replace");
    txtArea1.document.write(tab_text);
    txtArea1.document.close();
    txtArea1.focus();
    sa = txtArea1.document.execCommand(
      "SaveAs",
      true,
      "Say Thanks to Sumit.xls"
    );
  } //other browser not tested on IE 11
  else
    sa = window.open(
      "data:application/vnd.ms-excel," + encodeURIComponent(tab_text)
    );

  return sa;
}
