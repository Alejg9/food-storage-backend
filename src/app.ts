import express, { Application } from 'express';
import morgan from 'morgan';
import GroupsRoutes from './routes/groups';
import UserRoutes from './routes/users';
import AuthRoutes from './routes/auth';
import InviteRoutes from './routes/invite';
import ProductRoutes from './routes/products';
import UsersAndGroupsRoutes from './routes/usersAndGroups';

export class App {
    private app: Application;

    
    constructor(private port?: number | string) {
        this.app = express();

        this.settings();

        this.middlewares();
    }

    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(morgan('dev'));

        this.app.use(GroupsRoutes);
        this.app.use(UserRoutes);
        this.app.use(AuthRoutes);
        this.app.use(InviteRoutes);
        this.app.use(ProductRoutes);
        this.app.use(UsersAndGroupsRoutes);
    }

    async listen() {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }
}