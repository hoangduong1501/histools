const urlApp = window.location.href;

window.addEventListener('load', () => {
  if (urlApp.includes("tiepnhanbenhnhan") || urlApp.includes("tiepnhanBANT") || urlApp.includes("tiepnhannhapvien")) {

    fetch(window.location.origin + '/web_his/danhsach_canbo_nhanvien_sudungapiBHXH')
      .then(response => {
        if (response.ok) {
          return response.json(); // Parse the response data as JSON
        } else {
          throw new Error('API request failed');
        }
      })
      .then(data => {
        debugger;
        for (var index = 0; index < data.length; index++) {
          debugger;
          if (data[index].MA_NHANVIEN_HIS === sessionStorage.getItem("userId")) {
            debugger
          }
        }
        console.log(data);
      })
      .catch(error => {
        // Handle any errors here
        console.error(error); // Example: Logging the error to the console
      });



    var btnKiemTraThongTin = document.createElement('button');
    btnKiemTraThongTin.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i> Kiểm tra thẻ BHYT';
    btnKiemTraThongTin.className = "btn btn-sm btn-primary";
    btnKiemTraThongTin.id = "btnKiemTraThongTin";
    btnKiemTraThongTin.type = "button";
    btnKiemTraThongTin.click = "myFunction";
    document.getElementById("baohiem5nam_label").parentElement.appendChild(btnKiemTraThongTin);
  }

  document.getElementById("btnKiemTraThongTin").addEventListener("click", (e) => {
    alert("Đã bật kiểm tra thẻ BHYT");
  });
});

