import { User } from '../assets/user.js';

//função para criação de um usuário
export async function createUser({username, email, password, name}) {
    const newUser = new User({
        username,
        email,
        password,
        name
    });
    return await newUser.save();
}

//funcao para listar usuarios em ordem decrescente pela data de criação
export async function listUsers(query = {}, {sortBy = 'created', sortOrder = 'desc'} = {}) {

    return await User.find(query).sort( { [sortBy]: sortOrder} );
}

//funcao para alterar o usuario com base no id passado
export async function editUser(userId, {username, email, password, name}) {
    return await User.findOneAndUpdate(
        {_id: userId},
        { $set: {username, email, password, name} },
        { new: true }
    );
}

//funcao para buscar e excluir o usuario com base no id fornecido
export async function deleteUser(userId) {
    return await User.findByIdAndDelete({_id: userId});
}