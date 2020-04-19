var cantidad = document.getElementById("cantidad");
var boton = document.getElementById("boton");
boton.addEventListener("click",entregarDinero);

class Billete
{
    constructor(v,c)
    {
        this.imagen = new Image();
        this.valor = v;
        this.cantidad = c;
        this.result = resultado;

        this.imagen.src = nomImg[this.valor];
    }
    mostrarTransaccion()
    {
        
        this.result.innerHTML+=this.cantidad+" billetes de "+this.valor;
        for(var i = 0; i < this.cantidad; i++)
        {
            this.result.innerHTML +="  <img src="+this.imagen.src+"/> ";
        }
        this.result.innerHTML+="<br><br>";
     
    }
}
var nomImg = [];
nomImg[50] = "50.jpg";
nomImg[20] = "20.jpg";
nomImg[10] = "10.jpg";

var caja = [];
caja.push(new Billete(50,4));
caja.push(new Billete(20,10));
caja.push(new Billete(10,10));

var totalSaldoAtm = sumaSaldoAtm();
console.log(totalSaldoAtm);

var dinero = 0;
var entregado = [];
var logTransacciones = [];
var papeles;
var div;
var resultado = document.getElementById("resultado");
var montoAtm = document.getElementById("atm");
cantidad.value = "";
montoAtm.innerHTML = "<strong>Tu Bono Universal : </strong>"+ totalSaldoAtm;


function entregarDinero()
{
    entregado = [];
    dinero = parseInt(cantidad.value);
    for(var b of caja)
    {
        if(dinero > 0)
        {
          div= Math.floor(dinero/b.valor);
          if(div > b.cantidad)
            {
                papeles = b.cantidad;
            }
            else
            {
                papeles = div;
            }
       
            entregado.push(new Billete(b.valor,papeles));
            dinero = dinero - (b.valor * papeles);
        }
    }

    
    if (dinero > 0) //la idea es reducir el dinero(solicitado) a 0
    {
        
        resultado.innerHTML = "<p style='color:red'>El cajero no tiene el dinero suficiente :( <br> o el monto no es válido</p>";
    }
    else
    {
        resultado.innerHTML="<strong>Dispensado:</strong><br>";
        var i = 0;
        for(var ent of entregado)
        {
            if(ent.cantidad > 0)
            {
                ent.mostrarTransaccion();
                logTransacciones.push(new Billete(ent.valor,ent.cantidad));
                var debito = caja[i].cantidad - ent.cantidad; 
                caja[i] = (new Billete(ent.valor,debito));
            }
            i++;
        }
        totalSaldoAtm = sumaSaldoAtm();
        montoAtm.innerHTML = "<strong>Tu Bono Universal : </strong>"+ totalSaldoAtm;
        console.log(logTransacciones);
    }

    //se acabo el Dinero
    if(sumaSaldoAtm() == 0){
        swal('Bono Universal', 'Se acabo el bono :(\nHasta la próxima cuarentena :)', 'info')
    }
    
}

function sumaSaldoAtm()
{
    var sumaSaldo = 0;
    for(var saldo of caja)
    {
      sumaSaldo += (saldo.valor*saldo.cantidad);  
    }
    return sumaSaldo;
}



