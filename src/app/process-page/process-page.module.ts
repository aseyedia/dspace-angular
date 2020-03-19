import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProcessPageRoutingModule } from './process-page-routing.module';
import { ProcessDataService } from './processes/process-data.service';
import { ScriptDataService } from './scripts/script-data.service';
import { NewProcessComponent } from './new/new-process.component';
import { ScriptsSelectComponent } from './new/scripts-select/scripts-select.component';
import { ScriptHelpComponent } from './new/script-help/script-help.component';

@NgModule({
  imports: [
    ProcessPageRoutingModule,
    SharedModule,
  ],
  declarations: [
    NewProcessComponent,
    ScriptsSelectComponent,
    ScriptHelpComponent
  ],
  entryComponents: [
  ],
  providers: [
    ProcessDataService,
    ScriptDataService
  ]
})

export class ProcessPageModule {

}
