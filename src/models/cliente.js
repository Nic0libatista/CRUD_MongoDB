/**
 * modelo de dados para construçãp das coleçoes(tabelas)
 * Clientes 
 */

//importação dos recursos do framework mongoose
const {model,Schema} =require('mongoose')

// criação da estrutura da coleção clientes
const clienteSchema = new Schema({
    nomeCliente: {type: String},
    foneCliente: {
        type: String},
    cpf: {
        type: String,
        unique: true,
        index: true
    },
    dataCadastro: {
        type:Date,
        default: Date.now
    }
}, {versionKey:false}) // n versionar os dados armazenados

//exportar para o main o modelo de dados
// !!! clientes será o nome da coleção 

module.exports = model('clientes', clienteSchema)