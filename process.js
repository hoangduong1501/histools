const urlApp = window.location.href;

window.addEventListener('load', () => {
  if (urlApp.includes("tiepnhanbenhnhan") || urlApp.includes("tiepnhanBANT") || urlApp.includes("tiepnhannhapvien")) {
    if (localStorage.getItem("authExtention") === null || atob(ocalStorage.getItem("authExtention")).split('|')[0] !== sessionStorage.getItem("userId")) {
      localStorage.removeItem("authExtention");

      var quyenTraCuu = layThongTinNguoiTraCuu();

    //   fetch('https://egw.baohiemxahoi.gov.vn/api/token/take', {
    //     method: "POST",
    //     body: JSON.stringify({ username: dvtt + "_BV" }),
    //   })
    //     .then(response => {
    //       if (response.ok) {
    //         return response.json();
    //       } else {
    //         throw new Error('API request failed');
    //       }
    //     })
    //     .then(data => {
    //       var nhanVien = data.find((item) => item.MA_NHANVIEN_HIS.toString() === sessionStorage.getItem("userId"));
    //       localStorage.setItem("authExtention", btoa(nhanVien.SO_CCCD_NV + '|' + nhanVien.TEN_NHANVIEN));
    //     })
    //     .catch(error => {
    //       console.error(error);
    //     });
    // }





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

const layThongTinNguoiTraCuu = () => {
  fetch(window.location.origin + '/web_his/danhsach_canbo_nhanvien_sudungapiBHXH')
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('API request failed');
      }
    })
    .then(data => {
      var nhanVien = data.find((item) => item.MA_NHANVIEN_HIS.toString() === sessionStorage.getItem("userId"));
      if (nhanVien === null) {
        alert('Tài khoản này không có quyền tra cứu');
        return false;
      } else {
        // localStorage.setItem("authExtention", btoa(nhanVien.SO_CCCD_NV + '|' + nhanVien.TEN_NHANVIEN));
        localStorage.setItem("authExtention", fromBinary(nhanVien.SO_CCCD_NV + '|' + nhanVien.TEN_NHANVIEN));
        debugger;
        return true;
      }
    })
    .catch(error => {
      console.error(error);
    });
};

const fromBinary = (encoded) => {
  const binary = atob(encoded);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return String.fromCharCode(...new Uint16Array(bytes.buffer));
};

const toBinary = (string) => {
  const codeUnits = new Uint16Array(string.length);
  for (let i = 0; i < codeUnits.length; i++) {
    codeUnits[i] = string.charCodeAt(i);
  }
  return btoa(String.fromCharCode(...new Uint8Array(codeUnits.buffer)));
};

