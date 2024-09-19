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
          "username": "70000_BV",
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
          "hoTenCb": "Nguyễn Thị Thanh Hà",
          "cccdCb": "012345678910"
        }
      },
      "Response": {

      }
    };

    const vTrangThai_KetQua = {
      "ThongTin_DangNhap_BHXH": {
        "TrangThai": null,
        "LanGoi": 0,
      },
      "ThongTin_QuyenTraCuu_BHXH": {
        "TrangThai": null,
        "QuyenTraCuu": false,
        "LanGoi": 0,
      },
      "ThongTin_TraCuu_BHXH": {
        "TrangThai": null,
        "LanGoi": 0,
        "LayToken": {
          "TrangThai": null,
          "LanGoi": 0,
        },
      },
      "ThongTin_LayToken_BHXH": {
        "TrangThai": null,
        "LanGoi": 0,
      },
    };

    //Tạo dữ liệu cho Body Request
    const FormBody = (pDataParam) => {
      var contentFormBody = [];
      for (var property in pDataParam) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(pDataParam[property]);
        contentFormBody.push(encodedKey + "=" + encodedValue);
      }
      contentFormBody = contentFormBody.join("&");
      return contentFormBody;
    };

    //Mã hóa mật khẩu khi đăng nhập lấy token BHYT theo MD5
    const genMD5 = (d) => { var r = M(V(Y(X(d), 8 * d.length))); return r.toLowerCase() }; function M(d) { for (var _, m = "0123456789ABCDEF", f = "", r = 0; r < d.length; r++)_ = d.charCodeAt(r), f += m.charAt(_ >>> 4 & 15) + m.charAt(15 & _); return f } function X(d) { for (var _ = Array(d.length >> 2), m = 0; m < _.length; m++)_[m] = 0; for (m = 0; m < 8 * d.length; m += 8)_[m >> 5] |= (255 & d.charCodeAt(m / 8)) << m % 32; return _ } function V(d) { for (var _ = "", m = 0; m < 32 * d.length; m += 8)_ += String.fromCharCode(d[m >> 5] >>> m % 32 & 255); return _ } function Y(d, _) { d[_ >> 5] |= 128 << _ % 32, d[14 + (_ + 64 >>> 9 << 4)] = _; for (var m = 1732584193, f = -271733879, r = -1732584194, i = 271733878, n = 0; n < d.length; n += 16) { var h = m, t = f, g = r, e = i; f = md5_ii(f = md5_ii(f = md5_ii(f = md5_ii(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_hh(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_gg(f = md5_ff(f = md5_ff(f = md5_ff(f = md5_ff(f, r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 0], 7, -680876936), f, r, d[n + 1], 12, -389564586), m, f, d[n + 2], 17, 606105819), i, m, d[n + 3], 22, -1044525330), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 4], 7, -176418897), f, r, d[n + 5], 12, 1200080426), m, f, d[n + 6], 17, -1473231341), i, m, d[n + 7], 22, -45705983), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 8], 7, 1770035416), f, r, d[n + 9], 12, -1958414417), m, f, d[n + 10], 17, -42063), i, m, d[n + 11], 22, -1990404162), r = md5_ff(r, i = md5_ff(i, m = md5_ff(m, f, r, i, d[n + 12], 7, 1804603682), f, r, d[n + 13], 12, -40341101), m, f, d[n + 14], 17, -1502002290), i, m, d[n + 15], 22, 1236535329), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 1], 5, -165796510), f, r, d[n + 6], 9, -1069501632), m, f, d[n + 11], 14, 643717713), i, m, d[n + 0], 20, -373897302), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 5], 5, -701558691), f, r, d[n + 10], 9, 38016083), m, f, d[n + 15], 14, -660478335), i, m, d[n + 4], 20, -405537848), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 9], 5, 568446438), f, r, d[n + 14], 9, -1019803690), m, f, d[n + 3], 14, -187363961), i, m, d[n + 8], 20, 1163531501), r = md5_gg(r, i = md5_gg(i, m = md5_gg(m, f, r, i, d[n + 13], 5, -1444681467), f, r, d[n + 2], 9, -51403784), m, f, d[n + 7], 14, 1735328473), i, m, d[n + 12], 20, -1926607734), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 5], 4, -378558), f, r, d[n + 8], 11, -2022574463), m, f, d[n + 11], 16, 1839030562), i, m, d[n + 14], 23, -35309556), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 1], 4, -1530992060), f, r, d[n + 4], 11, 1272893353), m, f, d[n + 7], 16, -155497632), i, m, d[n + 10], 23, -1094730640), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 13], 4, 681279174), f, r, d[n + 0], 11, -358537222), m, f, d[n + 3], 16, -722521979), i, m, d[n + 6], 23, 76029189), r = md5_hh(r, i = md5_hh(i, m = md5_hh(m, f, r, i, d[n + 9], 4, -640364487), f, r, d[n + 12], 11, -421815835), m, f, d[n + 15], 16, 530742520), i, m, d[n + 2], 23, -995338651), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 0], 6, -198630844), f, r, d[n + 7], 10, 1126891415), m, f, d[n + 14], 15, -1416354905), i, m, d[n + 5], 21, -57434055), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 12], 6, 1700485571), f, r, d[n + 3], 10, -1894986606), m, f, d[n + 10], 15, -1051523), i, m, d[n + 1], 21, -2054922799), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 8], 6, 1873313359), f, r, d[n + 15], 10, -30611744), m, f, d[n + 6], 15, -1560198380), i, m, d[n + 13], 21, 1309151649), r = md5_ii(r, i = md5_ii(i, m = md5_ii(m, f, r, i, d[n + 4], 6, -145523070), f, r, d[n + 11], 10, -1120210379), m, f, d[n + 2], 15, 718787259), i, m, d[n + 9], 21, -343485551), m = safe_add(m, h), f = safe_add(f, t), r = safe_add(r, g), i = safe_add(i, e) } return Array(m, f, r, i) } function md5_cmn(d, _, m, f, r, i) { return safe_add(bit_rol(safe_add(safe_add(_, d), safe_add(f, i)), r), m) } function md5_ff(d, _, m, f, r, i, n) { return md5_cmn(_ & m | ~_ & f, d, _, r, i, n) } function md5_gg(d, _, m, f, r, i, n) { return md5_cmn(_ & f | m & ~f, d, _, r, i, n) } function md5_hh(d, _, m, f, r, i, n) { return md5_cmn(_ ^ m ^ f, d, _, r, i, n) } function md5_ii(d, _, m, f, r, i, n) { return md5_cmn(m ^ (_ | ~f), d, _, r, i, n) } function safe_add(d, _) { var m = (65535 & d) + (65535 & _); return (d >> 16) + (_ >> 16) + (m >> 16) << 16 | 65535 & m } function bit_rol(d, _) { return d << _ | d >>> 32 - _ };


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
          var vNhanVien = data.find((item) => item.MA_NHANVIEN_HIS.toString() === sessionStorage.getItem("userId"));
          if (vNhanVien === undefined || vNhanVien === null) {
            vTrangThai_KetQua.ThongTin_QuyenTraCuu_BHXH.QuyenTraCuu = false;
          } else {
            vTrangThai_KetQua.ThongTin_QuyenTraCuu_BHXH.QuyenTraCuu = true;
            vThongTin_KiemTraThe.Request.Body.hoTenCb = vNhanVien.TEN_NHANVIEN;
            vThongTin_KiemTraThe.Request.Body.cccdCb = vNhanVien.SO_CCCD_NV;
          }
          return true;
        })
        .catch(error => {
          console.error(error);
          return false;
        });
    }

    //Kiểm tra tài khoản người dùng có quyền đăng nhập
    if (!vTrangThai_KetQua.ThongTin_QuyenTraCuu_BHXH.QuyenTraCuu) {
      jAlert("Tài khoản của bạn không có quyền tra cứu hoặc chưa được cấu hình trên HIS!", 'Thông báo');
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
            vThongTin_LayToken.Request.Body.username = vThongTin_KiemTraThe.Request.Params.username = data.THAM_SO_TAI_KHOAN;
            vThongTin_LayToken.Request.Body.password = vThongTin_KiemTraThe.Request.Params.password = genMD5(data.THAM_SO_MAT_KHAU);
            return true;
          })
          .catch(error => {
            console.error(error);
            return false;
          });
      }
      // #endregion

      // #region Lấy thông tin token tài khoản đăng nhập gdbhyt.baohiemxahoi.gov.vn
      //Trường hợp gọi request thất bại sẽ gọi lại. Tối đa 3 lần
      //Thông tin lấy từ api BHXH
      while (vTrangThai_KetQua.ThongTin_LayToken_BHXH.LanGoi < 3) {
        vTrangThai_KetQua.ThongTin_LayToken_BHXH.TrangThai = await fetch(vLienKet_API.laytoken_bhxh, {
          method: "POST",
          body: FormBody(vThongTin_LayToken.Request.Body),
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
        })
          .then(response => {
            if (response.ok) {
              vTrangThai_KetQua.ThongTin_LayToken_BHXH.LanGoi = 3;
              return response.json();
            } else {
              vTrangThai_KetQua.ThongTin_LayToken_BHXH.LanGoi++;
              throw new Error('API request failed');
            }
          })
          .then(data => {
            vThongTin_LayToken.Response = data;
            vThongTin_KiemTraThe.Request.Params.id_token = data.APIKey.id_token;
            vThongTin_KiemTraThe.Request.Params.token = data.APIKey.access_token;
            return true;
          })
          .catch(error => {
            console.error(error + "\n Lỗi gọi API lấy token BHXH " + vLienKet_API.laytoken_bhxh);
            return false;
          });
      }
      // #endregion

      //Thêm nút tra cứu
      var btnKiemTraThongTin = document.createElement('button');
      btnKiemTraThongTin.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i> Kiểm tra thẻ BHYT';
      btnKiemTraThongTin.className = "btn btn-sm btn-primary";
      btnKiemTraThongTin.id = "btnKiemTraThongTin";
      btnKiemTraThongTin.type = "button";
      btnKiemTraThongTin.click = "myFunction";
      document.getElementById("baohiem5nam_label").parentElement.appendChild(btnKiemTraThongTin);

      //thêm div để hiển thị nội dung thông tin thẻ khi tra cứu
      document.getElementById("thongtin").childNodes[1].innerHTML = '<div id="thongTinKhiemTraThe"></div>' + document.getElementById("formtiepnhan").innerHTML

      //Thêm hành động click cho nút Kiểm tra thẻ BHYT
      document.getElementById("btnKiemTraThongTin").addEventListener("click", async (e) => {

        //Làm trống thông tin kiểm tra thẻ trước đó
        while (document.getElementById("thongTinKhiemTraThe").hasChildNodes()) {
          document.getElementById("thongTinKhiemTraThe").removeChild(document.getElementById("thongTinKhiemTraThe").firstChild);
        }

        document.getElementById("btnKiemTraThongTin").disabled = true;

        vTrangThai_KetQua.ThongTin_TraCuu_BHXH.LanGoi = 0;
        vThongTin_KiemTraThe.Request.Body.maThe = document.getElementById("sobhyt").value;
        vThongTin_KiemTraThe.Request.Body.hoTen = document.getElementById("hoten").value;
        vThongTin_KiemTraThe.Request.Body.ngaySinh = document.getElementById("namsinh").value;

        var vUrlKiemTraBHYT = vLienKet_API.kiemtra_bhyt + "?" + (
          Object.keys(vThongTin_KiemTraThe.Request.Params)[0] + "=" + vThongTin_KiemTraThe.Request.Params.username + "&" +
          Object.keys(vThongTin_KiemTraThe.Request.Params)[1] + "=" + vThongTin_KiemTraThe.Request.Params.password + "&" +
          Object.keys(vThongTin_KiemTraThe.Request.Params)[2] + "=" + vThongTin_KiemTraThe.Request.Params.token + "&" +
          Object.keys(vThongTin_KiemTraThe.Request.Params)[3] + "=" + vThongTin_KiemTraThe.Request.Params.id_token
        );

        while (vTrangThai_KetQua.ThongTin_TraCuu_BHXH.LanGoi < 3) {
          vTrangThai_KetQua.ThongTin_TraCuu_BHXH.TrangThai = await fetch(vUrlKiemTraBHYT, {
            method: "POST",
            body: FormBody(vThongTin_KiemTraThe.Request.Body),
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
          })
            .then(response => {
              if (response.ok) {
                vTrangThai_KetQua.ThongTin_TraCuu_BHXH.LanGoi = 3;
                return response.json();
              } else {
                vTrangThai_KetQua.ThongTin_TraCuu_BHXH.LanGoi++;
                throw new Error('API request failed');
              }
            })
            .then(async (data) => {
              if (data.maKetQua === "401") {
                vTrangThai_KetQua.ThongTin_TraCuu_BHXH.LayToken.LanGoi = 0;
                //#region Lấy lại token khi hết hạn hoặc sai thông tin
                while (vTrangThai_KetQua.ThongTin_TraCuu_BHXH.LayToken.LanGoi < 3) {
                  vTrangThai_KetQua.ThongTin_TraCuu_BHXH.LayToken.TrangThai = await fetch(vLienKet_API.laytoken_bhxh, {
                    method: "POST",
                    body: FormBody(vThongTin_LayToken.Request.Body),
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                    }
                  })
                    .then(response => {
                      if (response.ok) {
                        vTrangThai_KetQua.ThongTin_TraCuu_BHXH.LayToken.LanGoi = 3;
                        return response.json();
                      } else {
                        vTrangThai_KetQua.ThongTin_TraCuu_BHXH.LayToken.LanGoi++;
                        throw new Error('API request failed');
                      }
                    })
                    .then(data => {
                      vThongTin_LayToken.Response = data;
                      vThongTin_KiemTraThe.Request.Params.id_token = data.APIKey.id_token;
                      vThongTin_KiemTraThe.Request.Params.token = data.APIKey.access_token;
                      return true;
                    })
                    .catch(error => {
                      console.error(error + "\n Lỗi gọi API lấy lại token BHXH " + vLienKet_API.laytoken_bhxh);
                      return false;
                    });
                }
                //#endregion

                //Kiểm tra trạng thái lấy lại token
                if (vTrangThai_KetQua.ThongTin_LayToken_BHXH.LayToken.TrangThai) {
                  vTrangThai_KetQua.ThongTin_TraCuu_BHXH.LanGoi = 0; // Đặt lại giá trị để kiểm tra lại thông tin tiếp tục thực hiện gọi kiểm tra dữ liệu
                } else {
                  //Thông báo lỗi và dừng quá trình kiểm tra
                  jAlert("Lỗi xác thực giám định!", 'Thông báo');
                  vTrangThai_KetQua.ThongTin_TraCuu_BHXH.LanGoi = 3;
                  return false;
                }
              }
              else if (data.maKetQua === "000") {
                //Thực hiện các thao tác hiển thị thông tin lấy từ cổng giám định              
                var thongTinDinhDanhBHYT = document.createElement('h4');
                thongTinDinhDanhBHYT.style.color = "darkblue";
                thongTinDinhDanhBHYT.style.paddingLeft = "20";
                thongTinDinhDanhBHYT.style.paddingRight = "20";
                thongTinDinhDanhBHYT.style.margin = "10 0 2 0";
                thongTinDinhDanhBHYT.innerHTML = data.ghiChu;
                document.getElementById("thongTinKhiemTraThe").appendChild(thongTinDinhDanhBHYT);

                var thongTinVaoVienGanNhat = document.createElement('h4');
                thongTinVaoVienGanNhat.style.color = "green";
                thongTinVaoVienGanNhat.style.paddingLeft = "20";
                thongTinVaoVienGanNhat.style.paddingRight = "20";
                thongTinVaoVienGanNhat.style.margin = "2 0 2 0";
                thongTinVaoVienGanNhat.innerHTML = 'Thời gian khám gần nhất vào viện: <span style="color: darkred"> '
                  + data.dsLichSuKCB2018[0].ngayVao.substring(6, 8) + '/' + data.dsLichSuKCB2018[0].ngayVao.substring(4, 6) + '/' + data.dsLichSuKCB2018[0].ngayVao.substring(0, 4) + ' ' + data.dsLichSuKCB2018[0].ngayVao.substring(8, 10) + ':' + data.dsLichSuKCB2018[0].ngayVao.substring(10, 12)
                  + '</span> ra viện:  <span style="color: darkred">'
                  + data.dsLichSuKCB2018[0].ngayRa.substring(6, 8) + '/' + data.dsLichSuKCB2018[0].ngayRa.substring(4, 6) + '/' + data.dsLichSuKCB2018[0].ngayRa.substring(0, 4) + ' ' + data.dsLichSuKCB2018[0].ngayRa.substring(8, 10) + ':' + data.dsLichSuKCB2018[0].ngayRa.substring(10, 12)
                  + '</span> tại cơ sở :  <span style="color: darkred">'
                  + data.dsLichSuKCB2018[0].maCSKCB
                  + '</span>';
                document.getElementById("thongTinKhiemTraThe").appendChild(thongTinVaoVienGanNhat);
                
                var thongTinLichSuKham = document.createElement('u');
                thongTinLichSuKham.style.color = "darkblue";
                thongTinLichSuKham.style.paddingLeft = "20";
                thongTinLichSuKham.style.paddingRight = "20";
                thongTinLichSuKham.style.margin = "10 0 2 0";
                thongTinLichSuKham.innerText = '<i class="fa fa-history" aria-hidden="true"></i> Xem lịch sử khám bệnh tại đây';
                
                document.getElementById("thongTinKhiemTraThe").appendChild(thongTinLichSuKham);

                var thongTinLichSuKiemTraThe = document.createElement('u');
                thongTinLichSuKiemTraThe.style.color = "darkblue";
                thongTinLichSuKiemTraThe.style.paddingLeft = "20";
                thongTinLichSuKiemTraThe.style.paddingRight = "20";
                thongTinLichSuKiemTraThe.style.margin = "10 0 2 0";
                thongTinLichSuKiemTraThe.innerText = '<i class="fa fa-info" aria-hidden="true"></i> Xem lịch sử tra cứu thông tin thẻ tại đây';
                document.getElementById("thongTinKhiemTraThe").appendChild(thongTinLichSuKiemTraThe);

                debugger;
                document.getElementById("btnKiemTraThongTin").disabled = false;

              } else {
                console.log("Lỗi ngoại lệ trả về: " + data);
                document.getElementById("btnKiemTraThongTin").disabled = false;
              }
              return true;
            })
            .catch(error => {
              debugger;
              console.error(error + "\n Lỗi gọi API lấy token BHXH " + vLienKet_API.laytoken_bhxh);
              document.getElementById("btnKiemTraThongTin").disabled = false;
              return false;
            });
        }
      });

    }

    //#region Nháp
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
    //#endregion
  }
  else if (urlApp.includes("kiemtrabangke") || urlApp.includes("kiemtrabangkebannt") || urlApp.includes("kiemtrabangkenoitru")) {
    console.log(urlApp);
  } else {
    console.log(urlApp);
  }
});

//Các hàm chưa dùng tới
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

