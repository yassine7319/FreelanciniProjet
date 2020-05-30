import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { AuthentificationComponent } from './authentification/authentification.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { ContratComponent } from './contrat/contrat.component';
import { ProfilFreelancerComponent } from './profil-freelancer/profil-freelancer.component';
import { ProfilClientComponent } from './profil-client/profil-client.component';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    AuthentificationComponent,
    AcceuilComponent,
    ContratComponent,
    ProfilFreelancerComponent,
    ProfilClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
