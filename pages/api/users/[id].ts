import type { NextApiHandler } from 'next'
import {Users} from '../../../utils/users';
import prisma from '../../../libs/prisma';
import api from '../../../libs/api';

const handlerGet: NextApiHandler = async (req, res) => {
    const {id} = req.query;
    const user = await api.getUser(parseInt(id as string));
    if(user) {
        res.status(200).json({status: true, user});
        return;
    }
    res.json({error: 'Usuário não localizado'});
}

const handlerPut: NextApiHandler = async (req, res) => {
    const {name, active} = req.body;
    const {id} = req.query;
    const updatedUser = await api.updateUser(parseInt(id as string), name, active);
    if (updatedUser) {
        res.status(200).json({status: true, user: updatedUser});
        return;
    }
    res.json({error: 'Não foi possivel atualizar este usuário'});
}

const handlerDelete: NextApiHandler = async (req, res) => {
    const {id} = req.query;
    const deletedUser = await api.deleteUser(parseInt(id as string)).catch(() => {
        res.json({error: 'Usuário não encontrado.'});
    });
    if (deletedUser) {
        res.status(200).json({status: true});
    }
}

const handler: NextApiHandler = (req, res) => {
    switch (req.method) {
        case 'GET':
            handlerGet(req, res);
            break;
        case 'PUT': 
            handlerPut(req, res);
            break;
        case 'DELETE': 
            handlerDelete(req, res);
            break;
    }
}

export default handler;