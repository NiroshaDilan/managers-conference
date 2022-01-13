import {Routes} from '@angular/router';

import {DashboardComponent} from '../../dashboard/dashboard.component';
import {ApprovedComponent} from '../../approved/approved.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'pre-approval',      component: DashboardComponent },
    { path: 'approved',   component: ApprovedComponent }
];
