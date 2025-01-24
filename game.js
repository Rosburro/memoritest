let turno = []



$(function(){
    
    const url = new URL(window.location.href)

    const arrPath = JSON.parse(url.searchParams.get("ciao"))
    
    const backside = JSON.parse(url.searchParams.get("backside"))

    const size = [JSON.parse(url.searchParams.get("righe")),JSON.parse(url.searchParams.get("colonne"))]

    console.log("backside: ",backside)

    creaTavoloDiGioco(arrPath, size, backside)


    $(".backside").click(function(){

        
        if(turno.length<2){
            // alert($(this).find("input").val())
            scopriCarta($(this).parent())
            turno.push([Number($(this).parent().find("input").val()),$(this).parent()])
        }
    })

    $("#btnSuccessivo").click(function(){
        if(turno.length==2){
            controllaIndovinato()
        }
    })

    // console.log("matrice dopo: ", matrice)

})


function scopriCarta(cella){
    $(cella).find("img").eq(0).show()
    $(cella).find("img").eq(1).hide()
}

function copriCarta(cella){
    $(cella).find("img").eq(0).hide()
    $(cella).find("img").eq(1).show()
}

function copriCarte(celle){
    for(let i=0;i<celle.length;i++){
        copriCarta(celle[i])
    }
}

function controllaIndovinato(){
    alert(turno[0][0]+","+turno[1][0])

    if(turno[0][0]==turno[1][0]){
        alert("riuscito")
        scomparireCarteSelezionate()
    }else{
        copriCarte([turno[0][1],turno[1][1]])
    }
    turno.length = 0
    $("td").css("color","black")
}

function scomparireCarteSelezionate(){
    $(turno[0][1]).html("")
    $(turno[0][1]).off("click")

    $(turno[1][1]).html("")
    $(turno[1][1]).off("click")
}








function creaTavoloDiGioco(arrPath, size, backside){
    
    const n = size[0]
    const m = size[1]
    const length = arrPath.length
    

    for(let i=0;i<n;i++){
        $("#memori").append("<tr>")
        for(let j=0;j<m;j++){
            // console.log(matrice[i][j])
            let val = null
            do{
                val = Math.floor(Math.random()*length)
            }while(arrPath[val]==null)

            let app = sostituisciEPrendiPath(arrPath, val)

            $("#memori").append(`<td>
                <input hidden disabled value="${val}">
                <img src="${app}" width="300" height="200" style="display:none">
                <img src="${backside}" width="300" height="200" class="backside">
                </td>`)

            if(arrayVuoto(arrPath)){
                i=n
                break
            }
        }
        $("#memori").append("</tr>")
    }

    
}

function sostituisciEPrendiPath(arrPath, index){
    let app = arrPath[index]

    if(app[0]!=null){
        app = app[0]
        arrPath[index][0]=null
    }else{
        app = app[1]
        arrPath[index] = null
    }
    return app
}

function arrayVuoto(arrPath){
    for(let i=0;i<arrPath.length;i++){
        if(arrPath[i]!=null){
            return false
        }
    }
    return true
}