/**
 * processo principal
 * estudo do banco de dados Mongodb(Crud)
 * @autor: Nicoli Santos
 */

// importação do modulo de conexão

//const {console} = require('console')

const {conectar, desconectar} = require('./database')

// importação 
const clientemodel=require('./src/models/cliente.js')

// função p cadastrar um novo cliente 
// !!!!! para trabalhar c banco de dados usar sempre async, await e try-catch
const salvarcliente = async (nomecli, fonecli, cpfcli) => {
    try {
        // setar a estrutura de dados com os valores 
        // !!!! usar os msm nomes da estrutura 
        const novocliente = new clientemodel({
            nomeCliente: nomecli,
            foneCliente: fonecli,
            cpf: cpfcli
        })
        // a linha abaixo salva os dados no banco 
        await novocliente.save()
        console.log("Cliente adicionado com sucesso")
    } catch(error){
        console.log(error)
    }
}

const iniciarsistema = async () => {
    console.clear()
    console.log("Estudo do mongoDb")
    console.log("==================================================== ")
    await conectar()
    //crud 
    await salvarcliente("nicky","11 98432-1234","20099092212")
    await salvarcliente("nickyly","11 98432-1111","200990903284")
    await salvarcliente("nickyyy","11 90032-2222","200990926687")
    await salvarcliente("nikly","11 98432-3333","200990922767")
    await salvarcliente("nickyii","11 98432-4444","2009909299")
    await desconectar()
}

iniciarsistema()