import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'expenses',
        pathMatch: 'full',
      },
      {
        path: 'notes',
        loadChildren: () =>
          import('../notes/notes.module').then((m) => m.NotesModule),
      },
      // {
      //   path: 'tasks',
      //   loadChildren: () =>
      //     import('../tasks/tasks.module').then((m) => m.TasksModule),
      // },
      {
        path: 'categories',
        loadChildren: () =>
          import('../categories/categories.module').then(
            (m) => m.CategoriesModule
          ),
      },
      {
        path: 'account',
        loadChildren: () =>
          import('../account-settings/account-settings.module').then(
            (m) => m.AccountSettingsModule
          ),
      },
      {
        path: 'labels',
        loadChildren: () =>
          import('../label-management/label-management.module').then(
            (m) => m.LabelManagementModule
          ),
      },
      {
        path: 'expenses',
        loadChildren: () =>
          import('../expenses-management/expenses-management.module').then(
            (m) => m.ExpensesManagementModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
