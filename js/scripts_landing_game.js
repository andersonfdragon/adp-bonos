function abrirPopUp(){
  $('#PopUp-Bono').modal('show');
}

$(document).ready(function(){
    $("#bono-01").click(function(){
      $('#bono-01').replaceWith('<img src="images/img-bono-adp-activo-01.png" class="img-responsive center-block bono-tipo-01-activo" id="bono-01" type="button" data-toggle="modal" data-target=".bs-example-modal">');
      $('#tx_click_interaccion_bono').replaceWith('<h3 class="tx_lato_light_27_blanco" id="tx_click_interaccion_bono">Bono de 12.000.000</h3>');
      $("#tipo_bono").attr("value", "");
      $("#tipo_bono").attr("value", "12.000.000");
      $('.bs-example-modal').modal('hide');
      $("input[type='checkbox']").attr('checked',':checked');

      $('#bono-02').replaceWith('<img src="images/img-bono-adp.png" class="img-responsive center-block bono-disabled" id="bono-disabled">');
      $('#bono-03').replaceWith('<img src="images/img-bono-adp.png" class="img-responsive center-block bono-disabled" id="bono-disabled">');
    });
});

$(document).ready(function(){
    $("#bono-02").click(function(){
      $('#bono-02').replaceWith('<img src="images/img-bono-adp-activo-02.png" class="img-responsive center-block bono-tipo-02-activo" id="bono-02" type="button" data-toggle="modal" data-target=".bs-example-modal">');
      $('#tx_click_interaccion_bono').replaceWith('<h3 class="tx_lato_light_27_blanco" id="tx_click_interaccion_bono">Bono de 15.000.000</h3>');
      $("#tipo_bono").attr("value", "");
      $("#tipo_bono").attr("value", "15.000.000");
      $('.bs-example-modal').modal('hide');
      $("input[type='checkbox']").attr('checked',':checked');

      $('#bono-01').replaceWith('<img src="images/img-bono-adp.png" class="img-responsive center-block bono-disabled" id="bono-disabled">');
      $('#bono-03').replaceWith('<img src="images/img-bono-adp.png" class="img-responsive center-block bono-disabled" id="bono-disabled">');
    });
});

$(document).ready(function(){
    $("#bono-03").click(function(){
      $('#bono-03').replaceWith('<img src="images/img-bono-adp-activo-03.png" class="img-responsive center-block bono-tipo-03-activo" id="bono-03" type="button" data-toggle="modal" data-target=".bs-example-modal">');
      $('#tx_click_interaccion_bono').replaceWith('<h3 class="tx_lato_light_27_blanco" id="tx_click_interaccion_bono">Bono de 10.000.000</h3>');
      $("#tipo_bono").attr("value", "");
      $("#tipo_bono").attr("value", "10.000.000");
      $('.bs-example-modal').modal('hide');
      $("input[type='checkbox']").attr('checked',':checked');

      $('#bono-01').replaceWith('<img src="images/img-bono-adp.png" class="img-responsive center-block bono-disabled" id="bono-disabled">');
      $('#bono-02').replaceWith('<img src="images/img-bono-adp.png" class="img-responsive center-block bono-disabled" id="bono-disabled">');
    });
});


//FORMULARIO DE CONTACTO - ENVIAR DESDE FORMULARIO CONTACTO PC
$("#contactForm_bono").validator().on("submit", function (event) {
    var valido_form_01 = 0;
    var valido_select_01 = 0;
    var valido_check_01 = 0;

    if (event.isDefaultPrevented("Complete este campo")) {
        // handle the invalid form...
        submitMSG(false, "Complete los campos que faltan.");
    }
    else {
        event.preventDefault();
        submitMSG(true, "");
        valido_form_01 = 1;
    }

    //Opcion de proceso_seleccion
    if (!$('#tipo_casa_bono_opcion').val() ){
        submitMSG_tipo_casa(false, "Seleccione una opción.");
        //console.log(valido_select_01);
    }
    else {
        event.preventDefault();
        submitMSG_tipo_casa(true, "");
        valido_select_01 = 1;
        //console.log(valido_select_01);
    }

    if ($("input[type='checkbox']").is(':checked') === false){
        submitMSG_condiciones_bono(false, "Aún no acepta terminos y condiciones.");
    }
    else {
        event.preventDefault();
        submitMSG_condiciones_bono(true, "");
        valido_check_01 = 1;
    }


    if ((valido_form_01)&&(valido_select_01)&&(valido_check_01) === 1) {
        event.preventDefault();
        submitMSG(true, "");
        submitForm();
    }
    else {
        submitMSG(false, "Complete los campos que faltan");
    }
});


function submitMSG(valid, msg){
    if(valid){
        var msgClasses = "h4 text-center text-warning";
    } else {
        var msgClasses = "h4 text-center text-danger";
    }
    $("#msgSubmit_bono").removeClass().addClass(msgClasses).text(msg);
}

function submitMSG_tipo_casa(valid, msg){
    if(valid){
        var msgClasses = "h4 text-center text-warning";
    } else {
        var msgClasses = "h4 text-center text-danger";
    }
    $("#msgSubmit_tipo_casa").removeClass().addClass(msgClasses).text(msg);
}

function submitMSG_condiciones_bono(valid, msg){
    if(valid){
        var msgClasses = "h4 text-center text-warning";
    } else {
        var msgClasses = "h4 text-center text-danger";
    }
    $("#msgSubmit_condiciones_bono").removeClass().addClass(msgClasses).text(msg);
}

function formSuccess(){
    $("#contactForm_bono")[0].reset();
    submitMSG(true, "Gracias por dejar sus datos, se ha enviado el bono al correo registrado.")
}


function submitForm(){
    // Initiate Variables With Form Content
    var tipo_bono = $("#tipo_bono").val();
    var first_name_bono = $("#first_name_bono").val();
    var telephone_bono = $("#telephone_bono").val();
    var email_bono = $("#email_bono").val();
    var tipo_casa_bono_opcion = ($('select[id=tipo_casa_bono_opcion]').val());

    $.ajax({
        type: "POST",
        url:  "php/process_formulario_landing_game.php",
        data: "tipo_bono=" + tipo_bono +
              "&first_name_bono=" + first_name_bono +
              "&telephone_bono=" + telephone_bono +
              "&email_bono=" + email_bono +
              "&tipo_casa_bono_opcion=" + tipo_casa_bono_opcion,

        success: function(text){
            if (text == "success"){
                formSuccess();
            } else {
                submitMSG(false,text);
            }
        }
    });
}
