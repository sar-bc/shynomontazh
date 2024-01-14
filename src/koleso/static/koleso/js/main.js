
let time_all = new Array();
let time_busy = new Array();
let client = new Array();
let time_btn_press = "";
let knopka_btn = "";
$(document).ready(function () {

    $("#form").submit(function (e) {
        e.preventDefault();
        let form = document.getElementById('form');
        let name = form.elements['name'].value;
        let phone = form.elements['phone'].value;
        let date = form.elements['date'].value;
        // let step = form.elements['step'].value;
        // console.log("step:"+step);
        // console.log(name);
        // console.log(phone);
        // console.log(date);
        // console.log(time_btn_press);

        let form_data = $(this).serialize();

        form_data = form_data + "&time=" + time_btn_press;
        // console.log(form_data);


        if (confirm(name + ', подтвердите вашу запись\n' + time_btn_press + ' ' + date)) {
            // Save it!
            console.log('Saved.');
            $.post("/api/client/", form_data, function (data2) {
                console.log(data2);
                if (data2.message == "sucsess") {
                    let div = document.getElementById("client");
                    if(div){
                    let tbody = document.getElementById("tab_client").getElementsByTagName("tbody")[0];
                    tbody.innerHTML ="";
                    client = data2.client;
                    }
                    time_all = new Array();
                    time_busy = new Array();
                    for (let i = 0; i < data2.time_all.length; i++) {
                        time_all[i] = data2.time_all[i];
                    }
                    for (let j = 0; j < data2.time_busy.length; j++) {
                        time_busy[j] = data2.time_busy[j];
                    }
                    //console.log(data2.time_all);
                    //console.log(data2.time_busy);

                    //////////////////////////
                    table_update(time_all, time_busy);
                    //////////////////////////
                    if(div){
                    //////////////////////////////////
                    let table_client = document.getElementById("tab_client");
                    if (table_client) {
                        for (let i = 0; i < client.length; i++) {
                            addRow_client(`${client[i].id}`, `${client[i].time}`, `${client[i].name}`, `${client[i].phone}`, `${client[i].avto}`);
                        }
                    }
                    /////////////////////////////////
                    }
                    let name_f = document.getElementById("name");
                    let phone_f = document.getElementById("phone");
                    let avto_f = document.getElementById("avto");
                    /////////////////////////
                    let div_mess = document.getElementById("message");
                    div_mess.style.display = "block";
                    div_mess.style.color = "green";
                    div_mess.innerHTML = "Запись сохранена.";
                    name_f.value = "";
                    phone_f.value = "+7(___)___-__-__";
                    avto_f.value = "";
                    knopka_btn = 0;
                    setTimeout(function () {
                        div_mess.style.display = "none";
                        //location.reload();
                    }, 3000);
                } else if (data2.message == "is_busy") {
                    time_all = new Array();
                    time_busy = new Array();
                    for (let i = 0; i < data2.time_all.length; i++) {
                        time_all[i] = data2.time_all[i];
                    }
                    for (let j = 0; j < data2.time_busy.length; j++) {
                        time_busy[j] = data2.time_busy[j];
                    }
                    //////////////////////////
                    table_update(time_all, time_busy);
                    //////////////////////////
                    let name_f = document.getElementById("name");
                    let phone_f = document.getElementById("phone");
                    let avto_f = document.getElementById("avto");
                    /////////////////////////
                    let div_mess = document.getElementById("message");
                    div_mess.style.display = "block";
                    div_mess.style.color = "red";
                    div_mess.innerHTML = "Это время уже заняли, выбирите другое";
                    name_f.value = "";
                    phone_f.value = "+7(___)___-__-__";
                    avto_f.value = "";
                    knopka_btn = 0;
                    setTimeout(function () {
                        div_mess.style.display = "none";
                        //location.reload();
                    }, 3000);


                } else {
                    time_all = new Array();
                    time_busy = new Array();
                    for (let i = 0; i < data2.time_all.length; i++) {
                        time_all[i] = data2.time_all[i];
                    }
                    for (let j = 0; j < data2.time_busy.length; j++) {
                        time_busy[j] = data2.time_busy[j];
                    }
                    //////////////////////////
                    table_update(time_all, time_busy);
                    //////////////////////////
                    //////////////////////////
                    let name_f = document.getElementById("name");
                    let phone_f = document.getElementById("phone");
                    /////////////////////////
                    let div_mess = document.getElementById("message");
                    div_mess.style.display = "block";
                    div_mess.style.color = "red";
                    div_mess.innerHTML = "Ошибка записи.";
                    //name_f.value = "";
                    //phone_f.value = "";
                    knopka_btn = 0;


                    setTimeout(function () {
                        div_mess.style.display = "none";
                        window.location.reload();
                    }, 3000);
                }
            });
        } else {
            // Do nothing!
            console.log('not saved.');
        }




    });


    console.log("main.js");
    let calendar = document.getElementById("date");
    if (calendar) {
        //запрашиваем с сервера по дате время
        $.get("/api/client/", function (get_data) {
            console.log(get_data);
            client = get_data.client;
            calendar.value = get_data.date;//устанавливаем текущую дату 
            calendar.min = get_data.date;//минимальная дата текущая
            calendar.max = get_data.date_max;//максимальная дата
            time_all = new Array();
            time_busy = new Array();
            for (let i = 0; i < get_data.time_all.length; i++) {
                time_all[i] = get_data.time_all[i];
            }
            for (let j = 0; j < get_data.time_busy.length; j++) {
                time_busy[j] = get_data.time_busy[j];
            }
            //console.log(time_all);
            //console.log(time_busy);
            //////////////////////////
            table_update(time_all, time_busy);
            //////////////////////////
            let div = document.getElementById("client");
            if(div){
            //////////////////////////////////
            let table_client = document.getElementById("tab_client");
            if (table_client) {
                for (let i = 0; i < client.length; i++) {
                    addRow_client(`${client[i].id}`, `${client[i].time}`, `${client[i].name}`, `${client[i].phone}`, `${client[i].avto}`);
                }
            }
            /////////////////////////////////
                }
        });

        //=====================================
        let btn_ref = document.getElementById("ref");
        if (btn_ref) {
            btn_ref.addEventListener("click", function () {
            console.log("Refresh");
            let dat = document.getElementById("date");
            
            //запрашиваем с сервера по дате время
        $.get("/api/client/" + `${dat.value}`+"/", function (get_data) {
            console.log(get_data);
            let div = document.getElementById("client");
                    if(div){
                    let tbody = document.getElementById("tab_client").getElementsByTagName("tbody")[0];
                    tbody.innerHTML ="";
                    client = get_data.client;
                    }
            calendar.value = get_data.date;//устанавливаем текущую дату 
            calendar.min = get_data.date;//минимальная дата текущая
            calendar.max = get_data.date_max;//максимальная дата
            time_all = new Array();
            time_busy = new Array();
            for (let i = 0; i < get_data.time_all.length; i++) {
                time_all[i] = get_data.time_all[i];
            }
            for (let j = 0; j < get_data.time_busy.length; j++) {
                time_busy[j] = get_data.time_busy[j];
            }
            //console.log(time_all);
            //console.log(time_busy);
            //////////////////////////
            table_update(time_all, time_busy);
            //////////////////////////
        
            if(div){
            //////////////////////////////////
            let table_client = document.getElementById("tab_client");
            
            if (table_client) {
                for (let i = 0; i < client.length; i++) {
                    addRow_client(`${client[i].id}`, `${client[i].time}`, `${client[i].name}`, `${client[i].phone}`, `${client[i].avto}`);
                }
            }
            /////////////////////////////////
                }
        });

            });

        }

        //====================================


    }//calendar


});//$(document).ready
//==================================================
function click_btn(knopka, time) {
    if (knopka_btn.length > 3) {
        //console.log("была до этого кнопка " + knopka_btn);
        let btn_prev = document.getElementById(knopka_btn);
        btn_prev.style.color = "#fff";
    }
    knopka_btn = knopka;
    //console.log("press btn " + knopka);
    let btn = document.getElementById(knopka);
    btn.style.color = "green";
    time_btn_press = time;
    //console.log(time_btn_press);
}
//=================================================

//==========================================================
let time_arr = new Array();
function handleDateChange(event) {
    const selectedDate = event.target.value;
    //console.log(`Выбранная дата и время: ${selectedDate}`);

    $.get("/api/client/" + `${selectedDate}`+"/", function (data) {
        //console.log(data);
        let div = document.getElementById("client");
                    if(div){
                    let tbody = document.getElementById("tab_client").getElementsByTagName("tbody")[0];
                    tbody.innerHTML ="";
                    client = data.client;
                    }
        let time_all = new Array();
        let time_busy = new Array();
        for (let i = 0; i < data.time_all.length; i++) {
            time_all[i] = data.time_all[i];
        }
        for (let i = 0; i < data.time_busy.length; i++) {
            time_busy[i] = data.time_busy[i];
        }
        //console.log(time_all);
        //console.log(time_busy);
        //////////////////////////
        table_update(time_all, time_busy);
        //////////////////////////
        
            if(div){
            //////////////////////////////////
            let table_client = document.getElementById("tab_client");
            if (table_client) {
                for (let i = 0; i < client.length; i++) {
                    addRow_client(`${client[i].id}`, `${client[i].time}`, `${client[i].name}`, `${client[i].phone}`, `${client[i].avto}`);
                }
            }
            /////////////////////////////////
                }
    });

}
//==========================================================
function table_update(all, busy) {
    let count = 0;
    let table = document.getElementById("table_time");
    let rows = table.rows;
    //изменяем данные
    //rows[1].cells[1].innerHTML ='<input type="button" name="" class="btn btn-secondary" disabled value="10:30">';

    for (let i = 0; i < 6; i++) {

        for (let j = 0; j < 4; j++) {

            if (count < 23) {
                if (busy.indexOf(all[count]) > -1) {

                    rows[i].cells[j].innerHTML = "<input type='button' name='time' class='btn btn-secondary'  disabled value='" + all[count] + "'></input>";
                }
                else {
                    rows[i].cells[j].innerHTML = "<input id = 'btn" + count + "' onclick=click_btn('btn" + count + "','" + all[count] + "'); type='button' name='time' class='btn btn-dark time_btn' value='" + all[count] + "'></input>";

                }
                count++;
            }

        }//for2j

    }//for1 i
}
//==========================================================
function addRow_client(id, time, name, phone, avto) {
    let tbody = document.getElementById("tab_client").getElementsByTagName("tbody")[0];
    // tbody.innerHTML ="";
    let row = document.createElement("tr");
    row.setAttribute("id", id)
    row.setAttribute("onclick", "del_client("+id+")");

    //row.addEventListener("click",del_client(id));
    let td1 = document.createElement("td");
    td1.setAttribute("id",`t_${id}`);
    td1.innerHTML = time;

    let td2 = document.createElement("td");
    td2.innerHTML = name;

    let td3 = document.createElement("td");
    td3.innerHTML = phone;

    let td4 = document.createElement("td");
    td4.innerHTML = avto;

    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);


    tbody.appendChild(row);
}
//==============================================================
function del_client(id){
    //console.log("del=",id);
    let td = document.getElementById(`t_${id}`);
    let date = document.getElementById("date");
    //console.log(date.value);
    //console.log(td.textContent);
    if (confirm("Удалить запись " + td.textContent + "?")){
        //console.log("Удаляем...")


        $.get("/api/client/del/" + `${date.value}` + `/${id}`, function (data) {
            //console.log(data);
            let div = document.getElementById("client");
                        if(div){
                        let tbody = document.getElementById("tab_client").getElementsByTagName("tbody")[0];
                        tbody.innerHTML ="";
                        client = data.client;
                        }
            let time_all = new Array();
            let time_busy = new Array();
            for (let i = 0; i < data.time_all.length; i++) {
                time_all[i] = data.time_all[i];
            }
            for (let i = 0; i < data.time_busy.length; i++) {
                time_busy[i] = data.time_busy[i];
            }
            //console.log(time_all);
            //console.log(time_busy);
            //////////////////////////
            table_update(time_all, time_busy);
            //////////////////////////
            
                if(div){
                //////////////////////////////////
                let table_client = document.getElementById("tab_client");
                if (table_client) {
                    for (let i = 0; i < client.length; i++) {
                        addRow_client(`${client[i].id}`, `${client[i].time}`, `${client[i].name}`, `${client[i].phone}`, `${client[i].avto}`);
                    }
                }
                /////////////////////////////////
                    }
        });




    }
}
//=========================================================
// function setCursorPosition(pos, e) {
//     e.focus();
//     if (e.setSelectionRange) e.setSelectionRange(pos, pos);
//     else if (e.createTextRange) {
//     var range = e.createTextRange();
//     range.collapse(true);
//     range.moveEnd("character", pos);
//     range.moveStart("character", pos);
//     range.select()
//     }
// }

// function mask(e) {
//     //console.log('mask',e);
//     var matrix = this.placeholder,// .defaultValue
//         i = 0,
//         def = matrix.replace(/\D/g, ""),
//         val = this.value.replace(/\D/g, "");
//     def.length >= val.length && (val = def);
//     matrix = matrix.replace(/[_\d]/g, function(a) {
//     return val.charAt(i++) || "_"
//     });
//     this.value = matrix;
//     i = matrix.lastIndexOf(val.substr(-1));
//     i < matrix.length && matrix != this.placeholder ? i++ : i = matrix.indexOf("_");
//     setCursorPosition(i, this)
// }
// window.addEventListener("DOMContentLoaded", function() {
//     var input = document.querySelector("#online_phone");
//     input.addEventListener("input", mask, false);
//     // input.focus();
//     setCursorPosition(3, input);
// });
//==========================================================
