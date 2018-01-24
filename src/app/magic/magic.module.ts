import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';

// Components
import {ToolBarComponent} from './toolbar/toolbar.component';
import {MgInputComponent} from './form/input.component';
import {MgButtonComponent} from './button/button.component';
import {MgTabBarComponent} from './tab/tab-bar.component';
import {MgTabComponent} from './tab/tab.component';
import {MgButtonBarComponent} from './button-bar/button-bar.component';
import {MgButtonBarButtonComponent} from './button-bar/button-bar-button.component';
import {MgSelectComponent} from './form/select.component';
import {MgModalViewComponent} from './modal/modal-view.component';
import {MgBasicModalComponent} from './modal/basic-modal.component';
import {MgModalComponent} from './modal/modal.component';
import {MgImageComponent} from './image/image.component';
import {MgCarouselComponent} from './carousel/carousel.component';
import {MgCarouselSlideComponent} from './carousel/carousel-slide.component';
import {MgBlockComponent} from './block/block.component';
import {MgBlockDefaultComponent} from './block/block-default.component';
import {MgBlockReadyComponent} from './block/block-ready.component';
import {MgGalleryComponent} from './gallery/gallery.component';
import {MgEditableComponent} from './form/editable.component';
import {MgFormComponent} from './form/form.component';
import {MgCheckComponent} from './form/check.component';
import {MgRadioComponent} from './form/radio.component';
import {MgPasswordComponent} from './form/password.component';
import {MgInputDetailComponent} from './form/input-detail.component';
import {MgMapComponent} from './map/map.component';
import {MgGoogleMapComponent} from './map/google-map.component';
// import {MgNavComponent} from './navbar/nav.component';
// import {MgNavBarComponent} from './navbar/navbar.component';
// import {MgNavBlockComponent} from './navbar/nav-block.component';
import {MgSpinnerComponent} from './spinner/spinner.component';
import {MgInfoBoxComponent} from './infobox/infobox.component';
import {MgEditableDirective} from './form/editable.directive';
import {MgClippableComponent} from './clippable/clippable.component';
import {MgExpandComponent} from './expand/expand.component';
import {MgSidebarComponent} from './sidebar/sidebar.component';

const components = [
  ToolBarComponent,
  MgButtonBarComponent,
  MgButtonBarButtonComponent,
  MgInputComponent,
  MgButtonComponent,
  MgTabBarComponent,
  MgTabComponent,
  MgSelectComponent,
  MgModalViewComponent,
  MgBasicModalComponent,
  MgModalComponent,
  MgImageComponent,
  MgCarouselComponent,
  MgCarouselSlideComponent,
  MgBlockComponent,
  MgBlockDefaultComponent,
  MgBlockReadyComponent,
  MgGalleryComponent,
  MgEditableComponent,
  MgFormComponent,
  MgCheckComponent,
  MgRadioComponent,
  MgPasswordComponent,
  MgInputDetailComponent,
  MgMapComponent,
  MgGoogleMapComponent,
  // MgNavComponent,
  // MgNavBarComponent,
  // MgNavBlockComponent,
  MgSpinnerComponent,
  MgInfoBoxComponent,
  MgEditableDirective,
  MgClippableComponent,
  MgExpandComponent,
  MgSidebarComponent
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  declarations: components,
  exports: components
})
export class MagicModule {
}
