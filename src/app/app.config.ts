import { ApplicationConfig, ValueProvider } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';


const SNACK_BAR_CONFIG: ValueProvider = {
  //Constante que vai padroniza o nosso snackbar do material (aqui e um provider ,tipo do flutter)
  provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
  useValue: {
    duration: 3000,
    horizontalPosition: 'right',
    verticalPosition: 'top',
  } as MatSnackBarConfig //-> Alias para podermos ver os parametros acima /\
}

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideAnimationsAsync(),
  provideHttpClient(), //-> Para utilizarmos o http precisamos injetalo aqui
    SNACK_BAR_CONFIG
  ]
};
