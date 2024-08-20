const urlApp = window.location.href;

window.addEventListener('load', () => {
    alert("Tải xong Dom");
    if (urlApp.includes("tiepnhanbenhnhan") || urlApp.includes("tiepnhanBANT") || urlApp.includes("tiepnhannhapvien")) {
        var btnKiemTraThongTin = document.createElement('button');
        btnKiemTraThongTin.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i> Kiểm tra thẻ BHYT';
        btnKiemTraThongTin.className = "btn btn-sm btn-primary";
        btnKiemTraThongTin.id = "btnKiemTraTheBHYT";
        btnKiemTraThongTin.type = "button";
        btnKiemTraThongTin.click = "myFunction";
        document.getElementById("baohiem5nam_label").parentElement.appendChild(btnKiemTraThongTin);
    }
});

document.getElementById("btnKiemTraThongTin").addEventListener("click", (e) => {
     alert("Đã bật kiểm tra thẻ BHYT");
 });
