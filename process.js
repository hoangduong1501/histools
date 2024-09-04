const urlApp = window.location.href;

window.addEventListener('load', async () => {
  if (urlApp.includes("tiepnhanbenhnhan") || urlApp.includes("tiepnhanBANT") || urlApp.includes("tiepnhannhapvien")) {
    const vNhanVienHienTai = sessionStorage.getItem("userId");

    const vLienKet_API = {
      "laytoken_bhxh": "https://egw.baohiemxahoi.gov.vn/api/token/take",
      "kiemtra_bhyt": "https://egw.baohiemxahoi.gov.vn/api/egw/KQNhanLichSuKCB2024",
      "nhanvien_kiemtrathe": window.location.origin + "/web_his/danhsach_canbo_nhanvien_sudungapiBHXH",
      "thongtin_dangnhap": window.location.origin + "/web_his/api/cau-hinh-bhxh"
    };

    const vThongTin_LayToken = {
      "Request": {
        "Body": {
          "username": "70001_BV",
          "password": "fe9ca431e20f79d84ff26458860d097d"
        }
      },
      "Response": {
        "maKetQua": "200",
        "APIKey": {
          "access_token": "VzBoOUFvYU56NkluWlhZM3h1K2JtS2JXUUloUVhoU0ErN1hYODFNQjAwQT06NzAwMDFfQlY6MTMzNjkzOTMzODg1NDU0MTQ1",
          "id_token": "06af04d0-3ef2-4636-aeaf-1c17802d0846",
          "token_type": "Bearer",
          "username": "70001_BV",
          "expires_in": "2024-08-29T08:33:08.5454145Z"
        }
      }
    };

    const vThongTin_KiemTraThe = {
      "Request": {
        "Params": {
          "username": "70001_BV",
          "password": "fe9ca431e20f79d84ff26458860d097d",
          "token": "",
          "id_token": ""
        },
        "Body": {
          "maThe": "7020937133",
          "hoTen": "TRAN VAN TAI",
          "ngaySinh": "29/03/2002",
          "hoTenCb": "Nguyễn Thị Huê",
          "cccdCb": "024186018123"
        }
      },
      "Response": {

      }
    };

    const vTrangThai_KetQua = {
      "ThongTin_DangNhap_BHXH": {
        "TrangThai": null,
        "LanGoi": 0
      },
      "ThongTin_QuyenTraCuu_BHXH": {
        "TrangThai": null,
        "QuyenTraCuu": false,
        "LanGoi": 0
      },
      "ThongTin_TraCuu_BHXH": {
        "TrangThai": null,
        "LanGoi": 0
      },
      "ThongTin_LayToken_BHXH": {
        "TrangThai": null,
        "LanGoi": 0
      },
    };

    var vPhien_DangNhap = {
      "access_token": "VzBoOUFvYU56NkluWlhZM3h1K2JtS2JXUUloUVhoU0ErN1hYODFNQjAwQT06NzAwMDFfQlY6MTMzNjkzOTMzODg1NDU0MTQ1",
      "id_token": "06af04d0-3ef2-4636-aeaf-1c17802d0846",
      "token_type": "Bearer",
      "username": "70001_BV",
      "expires_in": "2024-08-29T08:33:08.5454145Z",
      "hoTenCb": "Nguyễn Thị Huê",
      "cccdCb": "024186018123",
      "userId": "123456"
    };

    //Kiểm tra thông tin nhân viên có trong danh sách đăng ký tra cứu thông tin thẻ BHYT
    while (vTrangThai_KetQua.ThongTin_QuyenTraCuu_BHXH.LanGoi < 3) {
      vTrangThai_KetQua.ThongTin_QuyenTraCuu_BHXH.TrangThai = await fetch(vLienKet_API.nhanvien_kiemtrathe)
        .then(response => {
          if (response.ok) {
            vTrangThai_KetQua.ThongTin_QuyenTraCuu_BHXH.LanGoi = 3;
            return response.json();
          } else {
            vTrangThai_KetQua.ThongTin_QuyenTraCuu_BHXH.LanGoi++;
            throw new Error('API request failed');
          }
        })
        .then(data => {
          debugger;
          var vNhanVien = data.find((item) => item.MA_NHANVIEN_HIS.toString() === sessionStorage.getItem("userId"));
          if (vNhanVien === undefined || vNhanVien === null) {
            vTrangThai_KetQua.ThongTin_QuyenTraCuu_BHXH.QuyenTraCuu = false;
          } else {
            vTrangThai_KetQua.ThongTin_QuyenTraCuu_BHXH.QuyenTraCuu = true;
          }
          return true;
        })
        .catch(error => {
          console.error(error);
          return false;
        });
    }

    if (!vTrangThai_KetQua.ThongTin_QuyenTraCuu_BHXH.QuyenTraCuu) {
      alert("Tài khoản không có quyền tra cứu hoặc chưa được cấu hình trên HIS!");
    } else {
      // #region Lấy thông tin tài khoản đăng nhập gdbhyt.baohiemxahoi.gov.vn
      //Trường hợp gọi request thất bại sẽ gọi lại. Tối đa 3 lần
      //Thông tin lấy từ api His
      while (vTrangThai_KetQua.ThongTin_DangNhap_BHXH.LanGoi < 3) {
        vTrangThai_KetQua.ThongTin_DangNhap_BHXH.TrangThai = await fetch(vLienKet_API.thongtin_dangnhap)
          .then(response => {
            if (response.ok) {
              vTrangThai_KetQua.ThongTin_DangNhap_BHXH.LanGoi = 3;
              return response.json();
            } else {
              vTrangThai_KetQua.ThongTin_DangNhap_BHXH.LanGoi++;
              throw new Error('API request failed');
            }
          })
          .then(data => {
            vThongTin_LayToken.Request.Body.username = vThongTin_KiemTraThe.Request.Body.username = data.THAM_SO_TAI_KHOAN;
            vThongTin_LayToken.Request.Body.password = vThongTin_KiemTraThe.Request.Body.password = data.THAM_SO_MAT_KHAU;
            return true;
          })
          .catch(error => {
            console.error(error);
            return false;
          });
      }
      // #endregion


    }

    // vPhien_DangNhap = JSON.parse(fromBinary(localStorage.getItem("his_search_session")));

    // if (vPhien_DangNhap.username.replace("_BV", "") !== dvtt) {
    //   localStorage.removeItem("his_search_session");
    //   var strPhien_DangNhap = JSON.stringify(vPhien_DangNhap);
    //   var binPhien_DangNhap = toBinary(strPhien_DangNhap);
    //   localStorage.setItem("his_search_session", binPhien_DangNhap);
    // }




    // const vPhienLamViec = fromBinary(localStorage.getItem("his_search_session"));
    // debugger;
    // if (localStorage.getItem("his_search_session") !== undefined && (vPhienLamViec.split("ʘɷʘ")[1])) {
    //   localStorage.removeItem("authExtention");
    // }

    // var strPhien_DangNhap = JSON.stringify(vPhien_DangNhap);
    // var binPhien_DangNhap = toBinary(strPhien_DangNhap);
    // localStorage.setItem("his_search_session", binPhien_DangNhap);





    // var thongTinNhanVien = await fetch(window.location.origin + '/web_his/danhsach_canbo_nhanvien_sudungapiBHXH')
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error('API request failed');
    //     }
    //   })
    //   .then(data => {
    //     var nhanVien = data.find((item) => item.MA_NHANVIEN_HIS.toString() === sessionStorage.getItem("userId"));
    //     if (nhanVien === undefined) {
    //       console.log('Tài khoản này không có quyền tra cứu, Kiểm tra lại thông tin nhân viên');
    //       return false;
    //     } else {
    //       localStorage.setItem("authExtention", toBinary(nhanVien.SO_CCCD_NV + '|' + nhanVien.TEN_NHANVIEN));
    //       return true;
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    // var thongTinDangNhap = await fetch(window.location.origin + '/web_his/api/cau-hinh-bhxh')
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     } else {
    //       throw new Error('API request failed');
    //     }
    //   })
    //   .then(data => {
    //     if (nhanVien === undefined) {
    //       debugger;
    //       return false;
    //     } else {
    //       debugger;
    //       return true;
    //     }
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });

    // if (thongTinNhanVien) {
    //   alert("Nhân viên có quyền tra cứu");
    // } else {
    //   alert("Nhân viên không có quyền tra cứu");
    // }


    // if (localStorage.getItem("authExtention") === null || fromBinary(localStorage.getItem("authExtention")).split('|')[0] !== sessionStorage.getItem("userId")) {
    //   localStorage.removeItem("authExtention");

    //   var quyenTraCuu = await layThongTinNguoiTraCuu();
    //   if (quyenTraCuu) {
    //     debugger
    //   } else {
    //     debugger;
    //   }

    //   var btnKiemTraThongTin = document.createElement('button');
    //   btnKiemTraThongTin.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i> Kiểm tra thẻ BHYT';
    //   btnKiemTraThongTin.className = "btn btn-sm btn-primary";
    //   btnKiemTraThongTin.id = "btnKiemTraThongTin";
    //   btnKiemTraThongTin.type = "button";
    //   btnKiemTraThongTin.click = "myFunction";
    //   document.getElementById("baohiem5nam_label").parentElement.appendChild(btnKiemTraThongTin);
    // }

    // document.getElementById("btnKiemTraThongTin").addEventListener("click", (e) => {
    //   alert("Đã bật kiểm tra thẻ BHYT");
    // });
  }
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
      if (nhanVien === undefined) {
        alert('Tài khoản này không có quyền tra cứu');
        return false;
      } else {
        localStorage.setItem("authExtention", toBinary(nhanVien.SO_CCCD_NV + '|' + nhanVien.TEN_NHANVIEN));
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

