import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginConsumerComponent } from "./components/login-consumer/login-consumer.component";
import { ConsumerStartComponent } from "./components/consumer-start/consumer-start.component";
import { FacturComponent } from "./components/factur/factur.component";


const routes: Routes = [
    {path: 'login', component: LoginConsumerComponent },
    {path: 'customer-start', component: ConsumerStartComponent },
    {path: 'facture', component: FacturComponent },

]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConsumerRoutingModule {}