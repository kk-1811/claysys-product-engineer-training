function findinterest() {
  var pamount = document.getElementById("principal");
  var rateint = document.getElementById("interest");
  var duration = document.getElementById("time");
  var results = document.getElementById("result");
  var totalf = document.getElementById("total");
  var adinfo = document.getElementById("addinfo");
  var appliedinterest = document.getElementById("applied");

  var prin = Number(pamount.value);
  var newrate = Number(rateint.value);
  var time1 = Number(duration.value);
  if (prin < 500 || prin > 10000) {
    adinfo.textContent = "⚠️ Error: Principal amount must be between $500 and $10,000.";
    results.textContent = "";
    totalf.textContent = "";
    appliedinterest.textContent = "";
    return;
  } else {
    adinfo.textContent = "";
  }

  if (prin <= 1000) {
    newrate = 5;
  } else if (prin > 1000 && prin <= 5000) {
    newrate = 7;
  } else if (prin > 5000 && prin <= 10000) {
    newrate = 10;
  }

  if (time1 > 5) {
    newrate = newrate + 2;
  }

  var interest = (prin * newrate * time1) / 100;
  results.textContent = "Interest: $" + interest.toFixed(2);

  var totalamount = prin + interest;
  totalf.textContent = "Total Amount: $" + totalamount.toFixed(2);

  appliedinterest.textContent = "Applied Interest Rate: " + newrate + "%";
}
