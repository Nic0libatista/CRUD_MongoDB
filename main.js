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
        //tratamento personalizado dos erros(exceções)
        if (error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`)
        } else {
            console.log(error)
        }
    }
}

//função listar todos os clientes
const listarclientes = async()=> {
    try{
        const clientes = await clientemodel.find().sort({
            nomeCliente: 1 })
        console.log(clientes)
    }
    catch (error){
            console.log(error)
        }
    }

    ///////////////// função buscar cliente pelo nome
const buscarclientenome = async (nome) => {
    try{
        const clientenome = await clientemodel.find(
            {
                nomeCliente: new RegExp(nome, 'i')
                //ignorar na busca letras maiusculas ou minusculas (i = case insensitive )
                
            }
        ) 
        console.log(clientenome)
    } catch(error){
        console.log(error)
    }
}



 ///////////////// função buscar cliente pelo nome
 const buscarclientecpf = async (cpf) => {
    try{
        const clientecpf = await clientemodel.find(
            {
                cpf: new RegExp(cpf)
                //ignorar na busca letras maiusculas ou minusculas (i = case insensitive )
                
            }
        )
            console.log(clientecpf)
         } catch(error){
        console.log(error)
    }
}

// funçao p editar os dados do cliente
// !!! usar o id do cliente 
const atualizarcliente = async(id,nomecli,fonecli,cpfcli) => {
    try{
        const clienteeditado = await clientemodel.findByIdAndUpdate(id,{
            nomeCliente: nomecli,
            foneCliente: fonecli,
            cpf: cpfcli
        } , {
            new:true,
            runValidators: true
        }
    )
        console.log("dados do cliente alterados com sucesso")
    } catch(error) {
        //tratamento personalizado dos erros(exceções)
        if (error.code = 11000) {
            console.log(`Erro: O CPF ${cpfCli} já está cadastrado`)
        } else {
            console.log(error)
        }
    }
}


// função excluir o cliente
// !!! usar o id do cliente 
const excluircliente = async(id) => {
    try{
        const clientedeletado = await clientemodel.findByIdAndDelete(id)
        console.log("cliente excluido com sucesso")
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
   // await salvarcliente("nicky","11 98432-1234","20099092212")
   // await salvarcliente("nickyly","11 98432-1111","200990903284")
    // await salvarcliente("nickyyy","11 90032-2222","200990926687")
    //await salvarcliente("nikly","11 98432-3333","200990922767")
    // await salvarcliente("nickyii","11 98432-4444","2009909299")

   // await listarclientes()
   // await buscarclientenome("nikly")
   // await buscarclientecpf("200990922767")
    
   // update (id do cliente)
   //await atualizarcliente("67d881ffb3c82557f801cc1e","marcelina","11 99990-6854","200990903284")

    //crud delete (id do cliente)
    await excluircliente("67d881ffb3c82557f801cc1e")
    await desconectar()
}

iniciarsistema()