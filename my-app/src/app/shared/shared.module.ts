import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import {
  MdToolbarModule,
  MdSidenavModule,
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCardModule,
  MdCheckboxModule,
  MdChipsModule,
  MdDatepickerModule,
  MdDialogModule,
  MdGridListModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdNativeDateModule,
  MdProgressBarModule,
  MdRadioModule,
  MdSelectModule,
  MdTabsModule,
  MdTooltipModule,
  MdSelectionModule,
  MdSlideToggleModule,
  MaterialModule
} from "@angular/material";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { DirectiveModule } from "../directive/directive.module";
import { ImageListSelectComponent } from "./image-list-select/image-list-select.component";
import { AgeInputComponent } from "./age-input/age-input.component";
import { ChipsListComponent } from "./chips-list/chips-list.component";
import { IdentityInputComponent } from "./identity-input/identity-input.component";
import { AreaListComponent } from "./area-list/area-list.component";
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MdInputModule,
    MdSelectModule,
    MdButtonToggleModule,
    MdCardModule,
    MdButtonModule,
    MdDialogModule,
    MdGridListModule,
    MdListModule,
    MdMenuModule,
    MdIconModule,
    MdProgressBarModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdRadioModule,
    MdAutocompleteModule,
    MdTabsModule,
    MdTooltipModule,
    MdToolbarModule,
    MdSidenavModule,
    MdSlideToggleModule,
    MdSelectionModule,
    DirectiveModule,
    MaterialModule
  ],
  exports: [
    MaterialModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MdInputModule,
    MdSelectModule,
    MdButtonToggleModule,
    MdCardModule,
    MdButtonModule,
    MdDialogModule,
    MdGridListModule,
    MdListModule,
    MdMenuModule,
    MdIconModule,
    MdProgressBarModule,
    MdCheckboxModule,
    MdChipsModule,
    MdDatepickerModule,
    MdNativeDateModule,
    MdRadioModule,
    MdAutocompleteModule,
    MdTabsModule,
    MdTooltipModule,
    MdSelectionModule,
    MdToolbarModule,
    MdSidenavModule,
    MdSlideToggleModule,
    DirectiveModule,
    ImageListSelectComponent,
    AgeInputComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent
  ],
  declarations: [
    ConfirmDialogComponent,
    ImageListSelectComponent,
    AgeInputComponent,
    ChipsListComponent,
    IdentityInputComponent,
    AreaListComponent
  ],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule {}
