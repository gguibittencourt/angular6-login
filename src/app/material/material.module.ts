import {NgModule} from "@angular/core";
import {CommonModule} from '@angular/common';
import {
	MatButtonModule,
	MatCardModule,
	MatDialogModule,
	MatExpansionModule,
	MatFormFieldModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatNativeDateModule,
	MatSelectModule,
	MatSidenavModule,
	MatTableModule,
	MatTabsModule,
	MatToolbarModule,
	MatStepperModule,
	MatTreeModule, MatCheckboxModule
} from '@angular/material';

@NgModule({
	exports: [
		CommonModule,
		MatButtonModule,
		MatToolbarModule,
		MatNativeDateModule,
		MatIconModule,
		MatSidenavModule,
		MatListModule,
		MatToolbarModule,
		MatCardModule,
		MatSelectModule,
		MatTableModule,
		MatInputModule,
		MatFormFieldModule,
		MatExpansionModule,
		MatDialogModule,
		MatButtonModule,
		MatCheckboxModule,
		MatTabsModule,
		MatStepperModule,
		MatTreeModule
	],
})
export class CustomMaterialModule {
}
