import prisma from './prisma';

export default {
    getAllUsers: async (page: number) => {
        let perPage = 2;
        let offset = 0;
        if (page) {
            offset = (page - 1) * perPage;
        }
        const users = await prisma.user.findMany({
            skip: offset,
            take: perPage,
            select: {
                id: true,
                name: true,
                email: true
            },
            orderBy: {
                id: 'asc'
            },
        });
        return users;
    },
    getUser: async (id: number) => {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        return user;
    },
    addUser: async (name: string, email: string) => {
        return await prisma.user.create({
            data: {name, email}
        });
    },
    updateUser: async (id: number, name?: string, active?: string) => {
        let data: {
            name?: string,
            active?: boolean
        } = {};
    
        if (name) {
            data.name = name;
        }
    
        if (active) {
            switch (active) {
                case 'true':
                case '1':
                    data.active = true;
                    break;
                case 'false':
                case '0':
                    data.active = false;
                    break;
            }
        }
    
        const updatedUser = await prisma.user.update({
            where: {id},
            data
        });

        return updatedUser;
    },
    deleteUser: async (id: number) => {
        return await prisma.user.delete({
            where: {id}
        })
    }
}