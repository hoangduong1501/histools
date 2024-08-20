const urlApp = window.location.href;
debugger;
if (urlApp.includes("tiepnhanbenhnhan") || urlApp.includes("tiepnhanBANT") || urlApp.includes("tiepnhannhapvien")) {
    var btnExcelImport = document.createElement("button");
    btnExcelImport.innerHTML = '<i class="fa fa-check-square-o" aria-hidden="true"></i> Kiểm tra thẻ BHYT';
    btnExcelImport.className = "btn btn-sm btn-primary";
    btnExcelImport.id = "btnKiemTraTheBHYT";
    btnExcelImport.type = "button";
    btnExcelImport.click = "myFunction";
    document.getElementById("baohiem5nam_label").parentElement.appendChild(btnExcelImport);
}
