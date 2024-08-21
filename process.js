const urlApp = window.location.href;

window.addEventListener('load', () => {
    if (urlApp.includes("tiepnhanbenhnhan") || urlApp.includes("tiepnhanBANT") || urlApp.includes("tiepnhannhapvien")) {
        debugger;
        fetch(window.location.origin + '/web_his/danhsach_canbo_nhanvien_sudungapiBHXH')
        .then(response => {
          debugger;
          if (response.ok) {
            return response.json(); // Parse the response data as JSON
          } else {
            throw new Error('API request failed');
          }
        })
        .then(data => {
          // Process the response data here
          console.log(data); // Example: Logging the data to the console
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

