import { ModuleWithProviders, NgModule } from '@angular/core'
import { AngularTranslatePipe } from './angular-translate.pipe'
import { AngularTranslateService } from './angular-translate.service'

@NgModule({
  declarations: [AngularTranslatePipe],
  exports: [AngularTranslatePipe]
})
export class AngularTranslateModule {
  static forRoot (translations: any): ModuleWithProviders<AngularTranslateModule> {
    return {
      ngModule: AngularTranslateModule,
      providers: [
        { provide: AngularTranslateService, useValue: translations }
      ]
    }
  }
}
